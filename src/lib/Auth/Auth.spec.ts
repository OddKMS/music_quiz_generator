import { describe, expect, it, vi } from 'vitest';
import { Authenticator } from './Auth';

const mockAuthenticator = Authenticator();
global.fetch = vi.fn();

describe('The Authenticator', () => {
  it('should contain an authentication function', () => {
    expect(mockAuthenticator).toHaveProperty('authenticate');
  });
});

describe('The authentication function', () => {
  it('should return an authentication object', () => {
    const auth = mockAuthenticator.authenticate();

    expect(typeof auth).toBe('object');
  });
});

describe('The returned Authentication object', () => {
  it('should contain an access token', () => {
    const auth = mockAuthenticator.authenticate();

    expect(auth).toHaveProperty('access_token');
  });
});
