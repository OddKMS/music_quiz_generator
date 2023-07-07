declare type Authenticator = () => {
  authenticate: () => Promise<AuthenticationObject>;
};

declare type AuthenticationObject = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
