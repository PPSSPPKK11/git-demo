using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace EnterpriseCrm.Plugins.Opportunity
{
    /// <summary>
    /// Demonstrates the confirmed-close orchestration pattern.
    ///
    /// The command layer performs UX confirmation. This server-side service
    /// performs authoritative checks and related-record changes.
    ///
    /// Status values are deliberately represented as configurable constants
    /// because status codes differ by table/solution.
    /// </summary>
    public sealed class OpportunityCloseCoordinator
    {
        private readonly IOrganizationService service;
        private readonly ITracingService tracing;

        public OpportunityCloseCoordinator(
            IOrganizationService service,
            ITracingService tracing)
        {
            this.service = service;
            this.tracing = tracing;
        }

        public void ValidateAndPrepare(Guid opportunityId)
        {
            var payments = FindActive(
                "new_payment",
                "new_opportunityid",
                opportunityId);

            if (payments.Entities.Count > 0)
            {
                // Business option: decline payment and then stop the close.
                // If this method runs inside the same synchronous transaction,
                // throwing afterwards rolls the payment change back as well.
                foreach (var payment in payments.Entities)
                {
                    DeclinePayment(payment.Id);
                }

                throw new InvalidPluginExecutionException(
                    "An active payment was found and the close was cancelled. " +
                    "The payment decline is part of the same transaction.");
            }

            // Active commercial records can be cancelled by a separately
            // confirmed close operation. The exact state/status pair must be
            // obtained from the target solution metadata.
            CancelActiveQuotes(opportunityId);
            CancelActiveOrders(opportunityId);
            CancelActiveInvoices(opportunityId);

            tracing.Trace(
                "Related commercial records prepared for Opportunity {0}.",
                opportunityId);
        }

        private void DeclinePayment(Guid paymentId)
        {
            var update = new Entity("new_payment", paymentId);

            // Placeholder status configuration. Keep all solution-specific
            // values in one configuration class in a real implementation.
            update["statecode"] = new OptionSetValue(1);

            service.Update(update);
        }

        private void CancelActiveQuotes(Guid opportunityId)
        {
            foreach (var row in FindActive("quote", "opportunityid", opportunityId).Entities)
            {
                var update = new Entity("quote", row.Id);
                update["statecode"] = new OptionSetValue(1);
                service.Update(update);
            }
        }

        private void CancelActiveOrders(Guid opportunityId)
        {
            foreach (var row in FindActive("salesorder", "opportunityid", opportunityId).Entities)
            {
                var update = new Entity("salesorder", row.Id);
                update["statecode"] = new OptionSetValue(1);
                service.Update(update);
            }
        }

        private void CancelActiveInvoices(Guid opportunityId)
        {
            foreach (var row in FindActive("invoice", "opportunityid", opportunityId).Entities)
            {
                var update = new Entity("invoice", row.Id);
                update["statecode"] = new OptionSetValue(1);
                service.Update(update);
            }
        }

        private EntityCollection FindActive(
            string entityName,
            string lookupName,
            Guid opportunityId)
        {
            var query = new QueryExpression(entityName)
            {
                ColumnSet = new ColumnSet(false)
            };

            query.Criteria.AddCondition(
                lookupName,
                ConditionOperator.Equal,
                opportunityId);

            query.Criteria.AddCondition(
                "statecode",
                ConditionOperator.Equal,
                0);

            return service.RetrieveMultiple(query);
        }
    }
}