using System;
using Microsoft.Xrm.Sdk;

namespace EnterpriseCrm.Plugins.Shared
{
    public static class PluginExecution
    {
        public static Entity Target(IPluginExecutionContext context, string logicalName)
        {
            if (!context.InputParameters.Contains("Target")) return null;
            var entity = context.InputParameters["Target"] as Entity;
            if (entity == null || !string.Equals(entity.LogicalName, logicalName, StringComparison.OrdinalIgnoreCase))
                return null;
            return entity;
        }

        public static void GuardRecursion(IPluginExecutionContext context, int maxDepth = 1)
        {
            if (context.Depth > maxDepth)
                throw new InvalidPluginExecutionException("Plugin execution stopped to prevent recursion.");
        }
    }
}