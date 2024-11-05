export function isPostMethod(method: string) {
  const postMethods = new Set(["runGetMethod", "sendBoc", "sendBocReturnHash", "sendQuery"]);
  return postMethods.has(method);
}

export function appendSearchParam(url: string, params: Record<string, string>): string {
  const urlObj = new URL(url);

  for (const [k, v] of Object.entries(params)) {
    if (v == null) continue;
    urlObj.searchParams.append(k, v);
  }
  return urlObj.toString();
}
