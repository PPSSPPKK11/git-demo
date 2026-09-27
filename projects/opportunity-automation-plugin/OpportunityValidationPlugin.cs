using System;
using Microsoft.Xrm.Sdk;

namespace Portfolio.Dynamics365.Plugins
{
    public sealed class OpportunityValidationPlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            if (context == null || tracing == null || !context.InputParameters.Contains("Target")) return;
            if (!(context.InputParameters["Target"] is Entity target)) return;
            if (!string.Equals(target.LogicalName, "opportunity", StringComparison.OrdinalIgnoreCase)) return;

            if (context.Depth > 1)
            {
                tracing.Trace("Skipping recursive execution. Depth: {0}", context.Depth);
                return;
            }

            if (target.Attributes.Contains("estimatedvalue") &&
                target["estimatedvalue"] is Money value &&
                value.Value < 0)
            {
                throw new InvalidPluginExecutionException("Estimated value cannot be negative.");
            }
        }
    }
}