# BPF Debugging Notes

One recurring issue was a Business Process Flow that appeared to exist in the backend but was not available in the process switcher in one environment.

The useful troubleshooting path was to compare deployment state before changing JavaScript.

## Checklist

1. Confirm the BPF is activated.
2. Check whether the BPF is included in the solution imported into the affected environment.
3. Verify the target table is enabled for the BPF.
4. Compare process order and security visibility between environments.
5. Check assignment to the expected app/table context.
6. Compare the process record and solution components between Dev and Test.
7. Check whether a newer version replaced the expected process.
8. Only after the process is available, investigate stage-navigation code.

## Client sanity checks

~~~javascript
var process = formContext.data.process.getActiveProcess();
var stage = formContext.data.process.getActiveStage();

console.log("Active process:", process ? process.getName() : "none");
console.log("Active stage:", stage ? stage.getName() : "none");
~~~

The key lesson: when an artifact exists in backend data but is missing from the UI, treat it first as an environment, deployment, security or process-configuration problem.