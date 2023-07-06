function authenticateWithSpotify(
  clientID: string,
  clientSecret: string,
): AuthenticationObject {
  const authObj = {
    access_token: 'tokenToken',
    token_type: 'Bearer',
    expires_in: 200,
  };

  return authObj;
}

export { authenticateWithSpotify };
