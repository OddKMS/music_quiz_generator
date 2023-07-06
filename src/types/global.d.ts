declare type Authenticator = () => {
  authenticate: () => AuthenticationObject;
};

declare type AuthenticationObject = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
