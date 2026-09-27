using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Dynamics365CeEngineering.Plugins.Product
{
    public sealed class HeatOutcomeProductProcessor : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(
                typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(
                typeof(IOrganizationServiceFactory));
            var tracing = (ITracingService)serviceProvider.GetService(
                typeof(ITracingService));

            var target = context.InputParameters.Contains("Target")
                ? context.InputParameters["Target"] as Entity
                : null;

            if (target == null || target.LogicalName != "new_heatsource")
            {
                return;
            }

            var outcome = target.GetAttributeValue<OptionSetValue>("new_heatoutcome");
            if (outcome == null)
            {
                return;
            }

            var service = factory.CreateOrganizationService(context.UserId);
            var query = new QueryExpression("product")
            {
                ColumnSet = new ColumnSet(
                    "productid",
                    "name",
                    "productnumber",
                    "new_heatoutcome",
                    "new_companycode",
                    "new_productsize"),
                PageInfo = new PagingInfo
                {
                    Count = 5000,
                    PageNumber = 1
                }
            };

            query.Criteria.AddCondition("statecode", ConditionOperator.Equal, 0);
            query.Criteria.AddCondition(
                "new_heatoutcome",
                ConditionOperator.Equal,
                outcome.Value);

            var processed = 0;

            while (true)
            {
                var page = service.RetrieveMultiple(query);

                foreach (var product in page.Entities)
                {
                    // Keep the actual write operation idempotent.
                    // Do not introduce ExecuteMultiple/parallel work here.
                    tracing.Trace("Processing product {0}", product.Id);
                    processed++;
                }

                if (!page.MoreRecords)
                {
                    break;
                }

                query.PageInfo.PageNumber++;
                query.PageInfo.PagingCookie = page.PagingCookie;
            }

            tracing.Trace("Processed {0} products.", processed);
        }
    }
}