import { afterEach, describe, expect, it, vi } from 'vitest';
import { Authenticator } from './auth';

vi.mock('./auth', () => {
  const authenticateWithSpotify = vi.fn(() => {
    const authObj = { access_token: 'tokenToken' };

    return authObj;
  });

  const authenticate = vi.fn(() => {
    const auth = authenticateWithSpotify();

    return auth;
  });

  return {
    Authenticator: vi.fn(() => {
      return authenticate;
    }),
  };
});

const mockAuthenticator = Authenticator;

describe('The Authenticator', () => {
  it('should contain an authentication function', () => {
    expect(mockAuthenticator()).toHaveProperty('authenticate');
  });
});

describe('The authentication function', () => {
  it('should return an authentication object', () => {
    const auth = mockAuthenticator().authenticate();

    expect(auth).toBeTypeOf('object');
  });

  it('should make a POST request', () => {
    const authSpy = vi.spyOn(mockAuthenticator(), 'authenticateWithSpotify');

    expect(authSpy).toHaveBeenCalled();
  });
});

describe('The returned Authentication object', () => {
  it('should contain an access token', () => {
    const auth = mockAuthenticator().authenticate();

    expect(auth).toHaveProperty('access_token');
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
