var CRM = CRM || {};
CRM.Navigation = (function () {
    "use strict";

    async function openRecord(entityName, id) {
        return Xrm.Navigation.openForm({
            entityName: entityName,
            entityId: id.replace(/[{}]/g, "")
        });
    }

    async function openCreate(entityName, parameters) {
        return Xrm.Navigation.openForm({
            entityName: entityName,
            useQuickCreateForm: true,
            data: parameters || {}
        });
    }

    async function confirm(title, text) {
        var result = await Xrm.Navigation.openConfirmDialog({
            title: title,
            text: text,
            confirmButtonLabel: "Continue",
            cancelButtonLabel: "Cancel"
        });

        return result.confirmed === true;
    }

    async function alert(title, text) {
        return Xrm.Navigation.openAlertDialog({
            title: title,
            text: text
        });
    }

    return {
        openRecord: openRecord,
        openCreate: openCreate,
        confirm: confirm,
        alert: alert
    };
})();