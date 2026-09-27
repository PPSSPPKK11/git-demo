var CRM = CRM || {};
CRM.UI = (function () {
    "use strict";

    function showTab(formContext, tabName, visible) {
        var tab = formContext.ui.tabs.get(tabName);
        if (tab) tab.setVisible(visible);
    }

    function showSection(formContext, tabName, sectionName, visible) {
        var tab = formContext.ui.tabs.get(tabName);
        if (!tab) return;

        var section = tab.sections.get(sectionName);
        if (section) section.setVisible(visible);
    }

    function focusTab(formContext, tabName) {
        var tab = formContext.ui.tabs.get(tabName);
        if (tab) tab.setFocus();
    }

    function setControlNotification(formContext, controlName, message, id) {
        var control = formContext.getControl(controlName);
        if (control) control.setNotification(message, id);
    }

    function clearControlNotification(formContext, controlName, id) {
        var control = formContext.getControl(controlName);
        if (control) control.clearNotification(id);
    }

    return {
        showTab: showTab,
        showSection: showSection,
        focusTab: focusTab,
        setControlNotification: setControlNotification,
        clearControlNotification: clearControlNotification
    };
})();