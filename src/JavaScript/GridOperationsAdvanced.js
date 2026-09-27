var CRM = CRM || {};
CRM.GridOperationsAdvanced = (function () {
    "use strict";

    function getGrid(executionContext, subgridName) {
        var formContext = executionContext.getFormContext();
        var control = formContext.getControl(subgridName);

        if (!control || typeof control.getGrid !== "function") {
            return null;
        }

        return control.getGrid();
    }

    function getSelectedIds(executionContext, subgridName) {
        var grid = getGrid(executionContext, subgridName);
        if (!grid) {
            return [];
        }

        var rows = grid.getSelectedRows();
        var ids = [];

        rows.forEach(function (row) {
            var id = row.getData().getEntity().getId();
            if (id) {
                ids.push(id.replace(/[{}]/g, ""));
            }
        });

        return ids;
    }

    function refresh(executionContext, subgridName) {
        var formContext = executionContext.getFormContext();
        var control = formContext.getControl(subgridName);

        if (control && typeof control.refresh === "function") {
            control.refresh();
        }
    }

    function requireSelection(executionContext, subgridName) {
        var ids = getSelectedIds(executionContext, subgridName);

        if (!ids.length) {
            Xrm.Navigation.openAlertDialog({
                text: "Select at least one row before running this command."
            });
            return false;
        }

        return true;
    }

    return {
        getSelectedIds: getSelectedIds,
        refresh: refresh,
        requireSelection: requireSelection
    };
}());