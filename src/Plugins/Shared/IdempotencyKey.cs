using System;
using System.Security.Cryptography;
using System.Text;

namespace Dynamics365CeEngineering.Plugins.Shared
{
    public static class IdempotencyKey
    {
        public static string From(string operation, Guid recordId, string version)
        {
            var input = string.Format(
                "{0}|{1:D}|{2}",
                operation,
                recordId,
                version);

            using (var sha = SHA256.Create())
            {
                var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(input));
                return BitConverter.ToString(bytes)
                    .Replace("-", string.Empty)
                    .ToLowerInvariant();
            }
        }
    }
}