using Microsoft.VisualStudio.TestTools.UnitTesting;
using Dynamics365CeEngineering.Plugins.Shared;

namespace Dynamics365CeEngineering.Tests
{
    [TestClass]
    public class PluginConfigurationTests
    {
        [TestMethod]
        public void ParsesKeyValueConfiguration()
        {
            var config = new PluginConfiguration(
                "MaxAgeMonths=6;AllowedTypes=Air Source Heat Pump,Solar");

            Assert.AreEqual(6, config.GetInt("MaxAgeMonths", 0));
            Assert.AreEqual("Air Source Heat Pump,Solar", config.Get("AllowedTypes"));
        }

        [TestMethod]
        public void MissingConfigurationUsesDefault()
        {
            var config = new PluginConfiguration(null);

            Assert.AreEqual(12, config.GetInt("MaxAgeMonths", 12));
        }
    }
}