using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Dynamics365CeEngineering.Plugins.Opportunity
{
    /// <summary>
    /// Example of a small synchronous validation plugin.
    /// The step should be registered only for the ownerid attribute.
    /// </summary>
    public sealed class ValidateOpportunityOwner : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context =
                (IPluginExecutionContext)serviceProvider.GetService(
                    typeof(IPluginExecutionContext));

            if (!context.InputParameters.Contains("Target") ||
                !(context.InputParameters["Target"] is Entity))
            {
                return;
            }

            var target = (Entity)context.InputParameters["Target"];
            if (target.LogicalName != "opportunity" ||
                !target.Contains("ownerid"))
            {
                return;
            }

            var owner = target.GetAttributeValue<EntityReference>("ownerid");
            if (owner == null)
            {
                throw new InvalidPluginExecutionException(
                    "An opportunity must have an owner.");
            }

            if (owner.LogicalName == "systemuser")
            {
                var factory =
                    (IOrganizationServiceFactory)serviceProvider.GetService(
                        typeof(IOrganizationServiceFactory));

                var service = factory.CreateOrganizationService(context.UserId);
                var user = service.Retrieve(
                    "systemuser",
                    owner.Id,
                    new ColumnSet("isdisabled"));

                if (user.GetAttributeValue<bool>("isdisabled"))
                {
                    throw new InvalidPluginExecutionException(
                        "The selected owner is disabled.");
                }
            }
        }
    }
}