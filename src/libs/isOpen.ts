export async function isOpen() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const promise = (await window.lockfile.isOpen()) as boolean;
  return promise;
}
