using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace EnterpriseCrm.Plugins.Opportunity
{
    /// <summary>
    /// Demonstrates secure service usage, entity references and QueryExpression.
    /// Register PostOperation/Create.
    /// </summary>
    public sealed class OpportunityPostCreate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            var target = context.InputParameters["Target"] as Entity;
            if (target == null || target.LogicalName != "opportunity") return;

            var service = factory.CreateOrganizationService(context.UserId);
            var opportunityId = target.Id;

            var opportunity = service.Retrieve(
                "opportunity",
                opportunityId,
                new ColumnSet("name", "customerid", "estimatedvalue"));

            tracing.Trace("Opportunity loaded: {0}", opportunity.GetAttributeValue<string>("name"));

            // Keep post-operation logic small; move complex operations to async processing
            // where eventual consistency is acceptable.
        }
    }
}