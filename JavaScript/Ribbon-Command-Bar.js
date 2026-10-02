var CRM = CRM || {};
CRM.Command = (function () {
    "use strict";

    function canLock(primaryControl) {
        var formContext = primaryControl;
        var locked = formContext.getAttribute("new_locked");

        return !!locked && locked.getValue() !== true;
    }

    function lock(primaryControl) {
        var formContext = primaryControl;
        var id = formContext.data.entity.getId().replace(/[{}]/g, "");

        return Xrm.WebApi.updateRecord("account", id, {
            new_locked: true
        }).then(function () {
            formContext.data.refresh(false).then(function () {
                formContext.ui.refreshRibbon(false);
            });
        });
    }

    return {
        canLock: canLock,
        lock: lock
    };
})();