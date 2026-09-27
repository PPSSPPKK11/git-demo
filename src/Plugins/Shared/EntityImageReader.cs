using Microsoft.Xrm.Sdk;

namespace Dynamics365CeEngineering.Plugins.Shared
{
    public static class EntityImageReader
    {
        public static Entity GetPreImage(IPluginExecutionContext context, string alias)
        {
            if (context == null || string.IsNullOrWhiteSpace(alias))
            {
                return null;
            }

            Entity image;
            return context.PreEntityImages.TryGetValue(alias, out image) ? image : null;
        }

        public static Entity GetPostImage(IPluginExecutionContext context, string alias)
        {
            if (context == null || string.IsNullOrWhiteSpace(alias))
            {
                return null;
            }

            Entity image;
            return context.PostEntityImages.TryGetValue(alias, out image) ? image : null;
        }

        public static T GetChangedValue<T>(
            IPluginExecutionContext context,
            Entity target,
            string preImageAlias,
            string attributeName)
        {
            if (target != null && target.Contains(attributeName))
            {
                return target.GetAttributeValue<T>(attributeName);
            }

            var preImage = GetPreImage(context, preImageAlias);
            return preImage == null ? default(T) : preImage.GetAttributeValue<T>(attributeName);
        }
    }
}