using Microsoft.Xrm.Sdk;

namespace Dynamics365CeEngineering.Plugins.Shared
{
    public static class PreImageChangeDetector
    {
        public static bool HasChanged<T>(
            Entity target,
            Entity preImage,
            string attributeName)
        {
            var newValue = target == null
                ? default(T)
                : target.GetAttributeValue<T>(attributeName);

            var oldValue = preImage == null
                ? default(T)
                : preImage.GetAttributeValue<T>(attributeName);

            if (newValue == null && oldValue == null)
            {
                return false;
            }

            if (newValue == null || oldValue == null)
            {
                return true;
            }

            return !newValue.Equals(oldValue);
        }
    }
}