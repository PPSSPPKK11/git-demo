using System;
using System.Collections.Generic;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace EnterpriseCrm.Plugins.Opportunity
{
    /// <summary>
    /// Application service used by a confirmed close operation.
    /// The implementation is intentionally isolated from the plugin entry point
    /// so the business logic can be unit tested.
    /// </summary>
    public sealed class OpportunityCloseService
    {
        private readonly IOrganizationService service;
        private readonly ITracingService tracing;

        public OpportunityCloseService(
            IOrganizationService service,
            ITracingService tracing)
        {
            this.service = service;
            this.tracing = tracing;
        }

        public CloseAssessment Assess(Guid opportunityId)
        {
            var assessment = new CloseAssessment();

            assessment.ActiveQuotes = Find(
                "quote", "opportunityid", opportunityId, "statecode", 0);

            assessment.ActiveOrders = Find(
                "salesorder", "opportunityid", opportunityId, "statecode", 0);

            assessment.ActiveInvoices = Find(
                "invoice", "opportunityid", opportunityId, "statecode", 0);

            assessment.ActivePayments = Find(
                "new_payment", "new_opportunityid", opportunityId, "statecode", 0);

            return assessment;
        }

        public void DeclinePayments(IEnumerable<Entity> payments)
        {
            foreach (var payment in payments)
            {
                tracing.Trace("Declining payment {0}", payment.Id);

                // Replace status values with the solution's actual payment
                // state/status configuration.
                var update = new Entity("new_payment", payment.Id);
                update["statecode"] = new OptionSetValue(1);
                service.Update(update);
            }
        }

        private List<Entity> Find(
            string entityName,
            string lookup,
            Guid opportunityId,
            string state,
            int stateValue)
        {
            var query = new QueryExpression(entityName)
            {
                ColumnSet = new ColumnSet(false)
            };

            query.Criteria.AddCondition(lookup, ConditionOperator.Equal, opportunityId);
            query.Criteria.AddCondition(state, ConditionOperator.Equal, stateValue);

            return new List<Entity>(service.RetrieveMultiple(query).Entities);
        }
    }

    public sealed class CloseAssessment
    {
        public List<Entity> ActiveQuotes { get; set; } = new List<Entity>();
        public List<Entity> ActiveOrders { get; set; } = new List<Entity>();
        public List<Entity> ActiveInvoices { get; set; } = new List<Entity>();
        public List<Entity> ActivePayments { get; set; } = new List<Entity>();

        public bool HasCommercialRecords =>
            ActiveQuotes.Count > 0 ||
            ActiveOrders.Count > 0 ||
            ActiveInvoices.Count > 0;

        public bool HasPayments => ActivePayments.Count > 0;
    }
}