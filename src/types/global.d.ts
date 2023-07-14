declare type Authenticator = () => {
  authenticate: () => Promise<AuthenticationObject>;
};

declare type AuthenticationObject = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

namespace NodeJS {
  interface ProcessEnv {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
  }
}
