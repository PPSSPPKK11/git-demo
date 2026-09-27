var CRM = CRM || {};
CRM.Bpf = (function () {
    "use strict";

    function getActiveProcess(formContext) {
        return formContext.data.process
            ? formContext.data.process.getActiveProcess()
            : null;
    }

    function getActiveStage(formContext) {
        return formContext.data.process
            ? formContext.data.process.getActiveStage()
            : null;
    }

    function moveNext(formContext) {
        return formContext.data.process.moveNext();
    }

    function setStageStatus(formContext, status) {
        return formContext.data.process.setStatus(status);
    }

    return {
        getActiveProcess: getActiveProcess,
        getActiveStage: getActiveStage,
        moveNext: moveNext,
        setStageStatus: setStageStatus
    };
})();