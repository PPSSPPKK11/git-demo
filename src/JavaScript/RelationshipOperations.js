var CRM = CRM || {};
CRM.Relationship = (function () {
    "use strict";

    async function associate(entityName, entityId, relationship, relatedEntityName, relatedId) {
        var target = {
            entityType: relatedEntityName,
            id: relatedId.replace(/[{}]/g, "")
        };

        return Xrm.WebApi.online.associate(
            entityName,
            entityId.replace(/[{}]/g, ""),
            relationship,
            target);
    }

    async function disassociate(entityName, entityId, relationship, relatedEntityName, relatedId) {
        return Xrm.WebApi.online.disassociate(
            entityName,
            entityId.replace(/[{}]/g, ""),
            relationship,
            {
                entityType: relatedEntityName,
                id: relatedId.replace(/[{}]/g, "")
            });
    }

    return {
        associate: associate,
        disassociate: disassociate
    };
})();