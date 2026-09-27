using System;
using System.Collections.Generic;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace EnterpriseCrm.Plugins.Opportunity
{
    /// <summary>
    /// Prevents closing an Opportunity when active Payments exist.
    /// For active Quotes/Orders/Invoices, the UI confirmation command should
    /// request a second, explicitly-confirmed close operation.
    ///
    /// Register:
    /// Update | opportunity | PreOperation | statecode,statuscode
    /// </summary>
    public sealed class OpportunityCloseGuard : IPlugin
    {
        private const int Won = 1;
        private const int Lost = 2;

        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(
                typeof(IPluginExecutionContext));
            var tracing = (ITracingService)serviceProvider.GetService(
                typeof(ITracingService));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(
                typeof(IOrganizationServiceFactory));

            if (!context.InputParameters.Contains("Target")) return;

            var target = context.InputParameters["Target"] as Entity;
            if (target == null || target.LogicalName != "opportunity") return;

            if (!target.Contains("statecode")) return;

            var requestedState = target.GetAttributeValue<OptionSetValue>("statecode");
            if (requestedState == null || (requestedState.Value != Won && requestedState.Value != Lost))
                return;

            var opportunityId = target.Id;
            var service = factory.CreateOrganizationService(context.UserId);

            tracing.Trace("Opportunity close guard. State={0}, Opportunity={1}",
                requestedState.Value, opportunityId);

            var paymentExists = ExistsActivePayment(service, opportunityId);
            if (paymentExists)
            {
                throw new InvalidPluginExecutionException(
                    "The Opportunity cannot be closed because an active payment exists. " +
                    "Resolve or decline the payment before closing the Opportunity.");
            }

            var blockers = GetActiveCommercialRecords(service, opportunityId);

            if (blockers.Count > 0)
            {
                // The first pass is intentionally blocked. A command-bar action can
                // show the exact warning and then submit a confirmed close operation.
                throw new InvalidPluginExecutionException(
                    "Active related records exist: " + string.Join(", ", blockers) +
                    ". Review/cancel them before closing the Opportunity.");
            }
        }

        private static bool ExistsActivePayment(IOrganizationService service, Guid opportunityId)
        {
            var query = new QueryExpression("new_payment")
            {
                ColumnSet = new ColumnSet(false),
                TopCount = 1
            };

            query.Criteria.AddCondition("new_opportunityid", ConditionOperator.Equal, opportunityId);
            query.Criteria.AddCondition("statecode", ConditionOperator.Equal, 0);

            return service.RetrieveMultiple(query).Entities.Count > 0;
        }

        private static List<string> GetActiveCommercialRecords(
            IOrganizationService service, Guid opportunityId)
        {
            var blockers = new List<string>();

            if (Exists(service, "quote", "opportunityid", opportunityId, 0))
                blockers.Add("Quote");

            if (Exists(service, "salesorder", "opportunityid", opportunityId, 0))
                blockers.Add("Order");

            if (Exists(service, "invoice", "opportunityid", opportunityId, 0))
                blockers.Add("Invoice");

            return blockers;
        }

        private static bool Exists(
            IOrganizationService service,
            string entityName,
            string lookupName,
            Guid opportunityId,
            int activeState)
        {
            var query = new QueryExpression(entityName)
            {
                ColumnSet = new ColumnSet(false),
                TopCount = 1
            };

            query.Criteria.AddCondition(lookupName, ConditionOperator.Equal, opportunityId);
            query.Criteria.AddCondition("statecode", ConditionOperator.Equal, activeState);

            return service.RetrieveMultiple(query).Entities.Count > 0;
        }
    }
}