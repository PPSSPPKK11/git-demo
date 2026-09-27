var CRM = CRM || {};
CRM.Context = (function () {
    "use strict";

    function getGlobal() {
        return Xrm.Utility.getGlobalContext();
    }

    function getUserId() {
        return getGlobal().userSettings.userId.replace(/[{}]/g, "");
    }

    function getUserName() {
        return getGlobal().userSettings.userName;
    }

    function getClient() {
        return getGlobal().client.getClient();
    }

    function hasRole(roleName) {
        var roles = getGlobal().userSettings.roles;
        var found = false;

        roles.forEach(function (role) {
            if (role.name === roleName) found = true;
        });

        return found;
    }

    return {
        getGlobal: getGlobal,
        getUserId: getUserId,
        getUserName: getUserName,
        getClient: getClient,
        hasRole: hasRole
    };
})();