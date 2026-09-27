var CRM = CRM || {};
CRM.OpportunityClose = (function () {
    "use strict";

    async function inspectAndClose(primaryControl) {
        var formContext = primaryControl;
        var id = formContext.data.entity.getId();

        if (!id) {
            await Xrm.Navigation.openAlertDialog({
                title: "Opportunity",
                text: "Save the Opportunity before closing it."
            });
            return;
        }

        id = id.replace(/[{}]/g, "");

        var result = await Xrm.WebApi.retrieveMultipleRecords(
            "quote",
            "?$select=quoteid&$filter=_opportunityid_value eq " + id +
            " and statecode eq 0&$top=1");

        var hasQuote = result.entities.length > 0;

        if (hasQuote) {
            var confirmation = await Xrm.Navigation.openConfirmDialog({
                title: "Active related records",
                text: "An active Quote exists for this Opportunity. " +
                      "Review/cancel the related record before closing."
            });

            if (!confirmation.confirmed) return;
        }

        // The server-side plugin remains authoritative. This command is UX,
        // not a security boundary.
        await Xrm.Navigation.openForm({
            entityName: "opportunity",
            entityId: id,
            openInNewWindow: false
        });
    }

    return {
        inspectAndClose: inspectAndClose
    };
})();