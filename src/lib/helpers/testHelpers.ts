function createFetchResponse(
  data: object,
  ok: boolean = true,
  statusText?: string,
) {
  return new Promise<Response>((resolve) => {
    return resolve({
      ok,
      json: () => new Promise<any>((resolve) => resolve(data)),
      statusText,
    } as Response);
  });
}

export { createFetchResponse };
