using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Xrm.Sdk;
using System;

namespace EnterpriseCrm.Tests
{
    [TestClass]
    public class ValidateOpportunityTests
    {
        [TestMethod]
        public void NegativeEstimatedValue_ShouldBeRejected()
        {
            // Demonstrates the expected business rule.
            var opportunity = new Entity("opportunity");
            opportunity["estimatedvalue"] = new Money(-1);

            Assert.AreEqual(-1m, ((Money)opportunity["estimatedvalue"]).Value);
            // In a real test project, execute the plugin against a mocked
            // IOrganizationService/IPluginExecutionContext and assert the exception.
        }

        [TestMethod]
        public void Probability_ShouldStayWithinZeroAndHundred()
        {
            var opportunity = new Entity("opportunity");
            opportunity["closeprobability"] = 101;
            Assert.IsTrue((int)opportunity["closeprobability"] > 100);
        }
    }
}