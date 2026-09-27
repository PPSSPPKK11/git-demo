var CRM = CRM || {};
CRM.LookupView = (function () {
    "use strict";

    function addActiveProductsView(executionContext) {
        var formContext = executionContext.getFormContext();
        var control = formContext.getControl("new_productid");
        if (!control) return;

        var viewId = "00000000-0000-0000-0000-000000000101";
        var entityName = "product";
        var viewDisplayName = "Active Products - Portfolio";

        var fetch =
            "<fetch>" +
            "<entity name='product'>" +
            "<attribute name='name' />" +
            "<attribute name='productnumber' />" +
            "<attribute name='price' />" +
            "<filter type='and'>" +
            "<condition attribute='statecode' operator='eq' value='0' />" +
            "</filter>" +
            "</entity>" +
            "</fetch>";

        var layout =
            "<grid name='resultset' object='1024' jump='name' select='1' preview='0'>" +
            "<row name='result' id='productid'>" +
            "<cell name='name' width='250' />" +
            "<cell name='productnumber' width='150' />" +
            "<cell name='price' width='120' />" +
            "</row>" +
            "</grid>";

        control.addCustomView(viewId, entityName, viewDisplayName, fetch, layout, true);
    }

    return {
        addActiveProductsView: addActiveProductsView
    };
})();