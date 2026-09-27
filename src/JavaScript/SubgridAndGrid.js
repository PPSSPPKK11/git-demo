var CRM = CRM || {};
CRM.Grid = (function () {
    "use strict";

    function refreshSubgrid(formContext, gridName) {
        var grid = formContext.getControl(gridName);
        if (grid) grid.refresh();
    }

    function getSelectedIds(gridContext) {
        var rows = gridContext.getGrid().getSelectedRows();
        var ids = [];

        rows.forEach(function (row) {
            var id = row.getData().getEntity().getId().replace(/[{}]/g, "");
            ids.push(id);
        });

        return ids;
    }

    function disableBulkActionWhenNoSelection(primaryControl) {
        var gridContext = primaryControl;
        if (!gridContext || !gridContext.getGrid) return false;
        return gridContext.getGrid().getSelectedRows().getLength() > 0;
    }

    return {
        refreshSubgrid: refreshSubgrid,
        getSelectedIds: getSelectedIds,
        disableBulkActionWhenNoSelection: disableBulkActionWhenNoSelection
    };
})();