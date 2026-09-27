var CRM = CRM || {};
CRM.LookupValue = (function () {
    "use strict";

    function get(formContext, attributeName) {
        var attribute = formContext.getAttribute(attributeName);
        var value = attribute ? attribute.getValue() : null;

        if (!value || !value.length) return null;

        return {
            id: value[0].id.replace(/[{}]/g, ""),
            name: value[0].name,
            entityType: value[0].entityType
        };
    }

    function set(formContext, attributeName, id, name, entityType) {
        var attribute = formContext.getAttribute(attributeName);
        if (!attribute) return;

        attribute.setValue([{
            id: id.replace(/[{}]/g, ""),
            name: name,
            entityType: entityType
        }]);
    }

    function clear(formContext, attributeName) {
        var attribute = formContext.getAttribute(attributeName);
        if (attribute) attribute.setValue(null);
    }

    return {
        get: get,
        set: set,
        clear: clear
    };
})();