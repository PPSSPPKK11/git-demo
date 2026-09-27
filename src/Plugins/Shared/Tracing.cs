using System;
using Microsoft.Xrm.Sdk;

namespace EnterpriseCrm.Plugins.Shared
{
    public static class Tracing
    {
        public static void Start(
            ITracingService tracing,
            IPluginExecutionContext context,
            string pluginName)
        {
            tracing.Trace(
                "[{0}] Start | Message={1} | Entity={2} | Stage={3} | Mode={4} | Depth={5} | Correlation={6}",
                pluginName,
                context.MessageName,
                context.PrimaryEntityName,
                context.Stage,
                context.Mode,
                context.Depth,
                context.CorrelationId);
        }

        public static void Error(
            ITracingService tracing,
            string pluginName,
            Exception exception)
        {
            tracing.Trace(
                "[{0}] Error | Type={1} | Message={2}",
                pluginName,
                exception.GetType().FullName,
                exception.Message);
        }
    }
}