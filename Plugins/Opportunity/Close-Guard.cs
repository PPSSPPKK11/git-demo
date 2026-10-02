using System;
using System.Collections.Generic;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Dynamics365CeEngineering.Plugins
{
    public sealed class OpportunityCloseGuard : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(
                typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(
                typeof(IOrganizationServiceFactory));

            if (!context.InputParameters.Contains("Target"))
                return;

            var target = context.InputParameters["Target"] as Entity;
            if (target == null || target.LogicalName != "opportunity")
                return;

            var state = target.GetAttributeValue<OptionSetValue>("statecode");
            if (state == null || (state.Value != 1 && state.Value != 2))
                return;

            var service = factory.CreateOrganizationService(context.UserId);
            var opportunityId = target.Id;

            if (ExistsActive(service, "new_payment", "new_opportunityid", opportunityId))
            {
                throw new InvalidPluginExecutionException(
                    "The Opportunity cannot be closed while an active Payment exists.");
            }

            var blockers = new List<string>();

            if (ExistsActive(service, "quote", "opportunityid", opportunityId))
                blockers.Add("Quote");

            if (ExistsActive(service, "salesorder", "opportunityid", opportunityId))
                blockers.Add("Order");

            if (ExistsActive(service, "invoice", "opportunityid", opportunityId))
                blockers.Add("Invoice");

            if (blockers.Count > 0)
            {
                throw new InvalidPluginExecutionException(
                    "Active related records exist: " +
                    string.Join(", ", blockers) +
                    ". Review them before closing the Opportunity.");
            }
        }

        private static bool ExistsActive(
            IOrganizationService service,
            string entityName,
            string lookupName,
            Guid opportunityId)
        {
            var query = new QueryExpression(entityName)
            {
                ColumnSet = new ColumnSet(false),
                TopCount = 1
            };

            query.Criteria.AddCondition(
                lookupName,
                ConditionOperator.Equal,
                opportunityId);

            query.Criteria.AddCondition(
                "statecode",
                ConditionOperator.Equal,
                0);

            return service.RetrieveMultiple(query).Entities.Count > 0;
        }
    }
}