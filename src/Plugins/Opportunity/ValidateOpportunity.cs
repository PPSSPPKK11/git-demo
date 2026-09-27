using Microsoft.Xrm.Sdk;
using EnterpriseCrm.Plugins.Shared;

namespace EnterpriseCrm.Plugins.Opportunity
{
    /// <summary>
    /// Production-style validation pattern. Register on Opportunity Create and
    /// Update with filtering attributes: estimatedvalue, closeprobability.
    /// </summary>
    public sealed class ValidateOpportunity : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            var target = PluginExecution.Target(context, "opportunity");
            if (target == null) return;

            PluginExecution.GuardRecursion(context);

            tracing.Trace("ValidateOpportunity started. Message={0}, Stage={1}, Depth={2}",
                context.MessageName, context.Stage, context.Depth);

            if (target.Contains("estimatedvalue") &&
                target["estimatedvalue"] is Money money &&
                money.Value < 0)
            {
                throw new InvalidPluginExecutionException("Estimated Revenue cannot be negative.");
            }

            if (target.Contains("closeprobability"))
            {
                var probability = target.GetAttributeValue<int?>("closeprobability");
                if (probability.HasValue && (probability.Value < 0 || probability.Value > 100))
                    throw new InvalidPluginExecutionException("Close probability must be between 0 and 100.");
            }

            tracing.Trace("ValidateOpportunity completed successfully.");
        }
    }
}