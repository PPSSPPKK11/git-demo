var CRM = CRM || {};
CRM.CommandBarContext = (function () {
    "use strict";

    function normalizeId(id) {
        return (id || "").replace(/[{}]/g, "");
    }

    function canEdit(primaryControl) {
        if (!primaryControl || !primaryControl.data) {
            return false;
        }

        var formType = primaryControl.ui.getFormType();
        return formType === 2 || formType === 1;
    }

    function hasSelection(selectedControl) {
        return selectedControl &&
            selectedControl.getGrid &&
            selectedControl.getGrid().getSelectedRows().getLength() > 0;
    }

    async function openRecord(primaryControl) {
        if (!primaryControl || !primaryControl.data || !primaryControl.data.entity) {
            return;
        }

        var entityName = primaryControl.data.entity.getEntityName();
        var id = normalizeId(primaryControl.data.entity.getId());

        if (!id) {
            return;
        }

        await Xrm.Navigation.openForm({
            entityName: entityName,
            entityId: id
        });
    }

    function refresh(primaryControl) {
        if (primaryControl && primaryControl.ui) {
            primaryControl.ui.refreshRibbon(false);
        }
    }

    return {
        canEdit: canEdit,
        hasSelection: hasSelection,
        openRecord: openRecord,
        refresh: refresh
    };
}());