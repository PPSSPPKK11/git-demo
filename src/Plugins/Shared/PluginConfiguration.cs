using System;
using System.Collections.Generic;

namespace Dynamics365CeEngineering.Plugins.Shared
{
    /// <summary>
    /// Small parser for unsecure step configuration.
    /// Example:
    ///   AllowedTypes=Air Source Heat Pump;Solar;Battery
    ///   MaxAgeMonths=6
    ///
    /// Secrets should not be placed in source control. Secure configuration is
    /// supplied through the step registration and is intentionally handled separately.
    /// </summary>
    public sealed class PluginConfiguration
    {
        private readonly Dictionary<string, string> values =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        public PluginConfiguration(string rawConfiguration)
        {
            if (string.IsNullOrWhiteSpace(rawConfiguration))
            {
                return;
            }

            foreach (var token in rawConfiguration.Split(';'))
            {
                var pair = token.Split(new[] { '=' }, 2);
                if (pair.Length != 2)
                {
                    continue;
                }

                values[pair[0].Trim()] = pair[1].Trim();
            }
        }

        public string Get(string key, string defaultValue = null)
        {
            string value;
            return values.TryGetValue(key, out value) ? value : defaultValue;
        }

        public int GetInt(string key, int defaultValue)
        {
            int value;
            return int.TryParse(Get(key), out value) ? value : defaultValue;
        }

        public IReadOnlyCollection<string> GetList(string key)
        {
            var value = Get(key);
            if (string.IsNullOrWhiteSpace(value))
            {
                return Array.Empty<string>();
            }

            return value.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        }
    }
}