import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createFetchResponse } from '@helpers';
import Authenticator from '@lib/Auth';

const mockAuthenticator = Authenticator();

describe('The Authenticator', () => {
  it('should contain an authentication function', async () => {
    expect(mockAuthenticator).toHaveProperty('authenticate');
  });
});

describe('The authentication function', async () => {
  it('should return an authentication object', () => {
    const auth = mockAuthenticator.authenticate();

    expect(typeof auth).toBe('object');
  });
});

describe('The returned Authentication object', () => {
  it('should contain an access token', async () => {
    const authResponse = {
      access_token: '',
      token_type: '',
      expires_in: 0,
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(createFetchResponse(authResponse));

    const auth = await mockAuthenticator.authenticate();

    expect(auth).toHaveProperty('access_token');
  });
});

beforeEach(() => {
  vi.clearAllMocks;
  global.fetch = vi.fn();
});
