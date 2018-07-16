export function dispatch(dispatchKey, payloadKey, dispatchers, obj) {
  return dispatchers[obj[dispatchKey]](obj[payloadKey]);
}


export function createDispatcher(dispatchKey, payloadKey, dispatchers) {
  return obj => dispatch(dispatchKey, payloadKey, dispatchers, obj);
}
