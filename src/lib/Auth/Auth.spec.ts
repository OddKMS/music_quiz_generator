import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { createFetchResponse } from '#helpers';
import { authenticate, getClientID, getClientSecret } from '#lib/Auth';

beforeAll(() => {
  global.fetch = vi.fn();
  vi.mock('fs');
});

beforeEach(() => {
  vi.stubEnv('SPOTIFY_CLIENT_ID', 'testClientId');
  vi.stubEnv('SPOTIFY_CLIENT_SECRET', 'testClientSecret');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('The authentication function', async () => {
  it('should return an authentication object', () => {
    const authObj = authenticate();

    expect(typeof authObj).toBe('object');
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

      const authObj = await authenticate();

      expect(authObj).toHaveProperty('access_token');
    });
  });
});

describe('The getClientID function', () => {
  it('should return the ClientID', () => {
    const clientId = getClientID();

    expect(clientId).not.toBeNull();
    expect(clientId).toBeTypeOf('string');
    expect(clientId).toBe('testClientId');
  });

  it('should throw an error if the env variable is not set', () => {
    vi.unstubAllEnvs();

    expect(getClientID).toThrow();
  });

  describe('The ClientID not set error', () => {
    it('should explain that the env variable is not set', () => {
      vi.unstubAllEnvs();

      expect(getClientID).toThrow('Client ID is not set, check config.');
    });
  });
});

describe('The getClientSecret function', () => {
  it('should return the ClientSecret', async () => {
    const clientSecret = getClientSecret();

    expect(clientSecret).not.toBeNull();
    expect(clientSecret).toBeTypeOf('string');
    expect(clientSecret).toBe('testClientSecret');
  });

  it('should throw an error if the env variable is not set', async () => {
    vi.unstubAllEnvs();

    expect(getClientSecret).toThrow();
  });

  describe('The ClientSecret not set error', () => {
    it('should explain that the env variable is not set', async () => {
      vi.unstubAllEnvs();

      expect(getClientSecret).toThrow(
        'Client Secret is not set, check config.',
      );
    });
  });
});
