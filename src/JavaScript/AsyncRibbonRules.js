var CRM = CRM || {};
CRM.RibbonRules = (function () {
    "use strict";

    async function isAllowed(primaryControl) {
        var formContext = primaryControl;
        var id = formContext.data.entity.getId();

        if (!id) return false;

        try {
            var result = await Xrm.WebApi.retrieveRecord(
                "account",
                id.replace(/[{}]/g, ""),
                "?$select=new_locked,statecode"
            );

            return result.statecode === 0 && result.new_locked !== true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    return {
        isAllowed: isAllowed
    };
})();