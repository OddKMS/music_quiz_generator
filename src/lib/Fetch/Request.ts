export async function request<TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> {
  const response = await fetch(url, config);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
}
