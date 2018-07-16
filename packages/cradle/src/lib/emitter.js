export default function () {
  let state; // this is unnecessary, but helpful for debugging
  let listeners = [];
  let oneListeners = [];

  return {
    update: nextState => {
      state = nextState;
      listeners.forEach(l => l(state));
      oneListeners.forEach(l => l(state));
      oneListeners = [];
    },
    on: listener => listeners.push(listener),
    once: listener => oneListeners.push(listener),
    off: listener => listeners.filter(l => l !== listener),
    clear: () => listeners = [],
    state,
  };
}
