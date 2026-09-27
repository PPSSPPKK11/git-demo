var CRM = CRM || {};
CRM.Command = (function () {
    "use strict";

    async function lockRecord(primaryControl) {
        var formContext = primaryControl;
        var id = formContext.data.entity.getId();

        if (!id) return;

        await Xrm.WebApi.updateRecord("account", id.replace(/[{}]/g, ""), {
            "new_locked": true
        });

        CRM.Field.setDisabled(formContext, "name", true);
        formContext.ui.refreshRibbon(false);
    }

    async function unlockRecord(primaryControl) {
        var formContext = primaryControl;
        var id = formContext.data.entity.getId();

        if (!id) return;

        await Xrm.WebApi.updateRecord("account", id.replace(/[{}]/g, ""), {
            "new_locked": false
        });

        CRM.Field.setDisabled(formContext, "name", false);
        formContext.ui.refreshRibbon(false);
    }

    function canLock(primaryControl) {
        var formContext = primaryControl;
        var locked = formContext.getAttribute("new_locked");
        return !!locked && locked.getValue() !== true;
    }

    function canUnlock(primaryControl) {
        var formContext = primaryControl;
        var locked = formContext.getAttribute("new_locked");
        return !!locked && locked.getValue() === true;
    }

    return {
        lockRecord: lockRecord,
        unlockRecord: unlockRecord,
        canLock: canLock,
        canUnlock: canUnlock
    };
})();