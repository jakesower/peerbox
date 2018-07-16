export default function (timeoutInMs, timedPromise) {
  return new Promise((resolve, reject) => {
    window.setTimeout(reject('timed out'), timeoutInMs);
    timedPromise.then(resolve).catch(reject);
  });
}
