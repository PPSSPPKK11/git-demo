using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Dynamics365CeEngineering.Plugins.Shared;

namespace Dynamics365CeEngineering.Tests
{
    [TestClass]
    public class IdempotencyKeyTests
    {
        [TestMethod]
        public void SameInputsProduceSameKey()
        {
            var id = Guid.Parse("11111111-1111-1111-1111-111111111111");

            var first = IdempotencyKey.From("WelcomeJourney", id, "v1");
            var second = IdempotencyKey.From("WelcomeJourney", id, "v1");

            Assert.AreEqual(first, second);
        }

        [TestMethod]
        public void DifferentVersionsProduceDifferentKeys()
        {
            var id = Guid.Parse("11111111-1111-1111-1111-111111111111");

            var first = IdempotencyKey.From("WelcomeJourney", id, "v1");
            var second = IdempotencyKey.From("WelcomeJourney", id, "v2");

            Assert.AreNotEqual(first, second);
        }
    }
}