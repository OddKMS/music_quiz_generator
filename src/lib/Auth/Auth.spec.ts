import { beforeAll, describe, expect, it, vi } from 'vitest';
import { createFetchResponse } from '@helpers';
import { authenticate, getClientID, getClientSecret } from '@lib/Auth';

beforeAll(() => {
  global.fetch = vi.fn();
  vi.mock('fs');
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
  it('should return the ClientID', async () => {
    const fs = await import('fs');
    fs.readFileSync = vi.fn().mockReturnValueOnce('testClientId');

    const clientId = getClientID();

    expect(clientId).not.toBeNull();
    expect(clientId).toBeTypeOf('string');
    expect(clientId).toBe('testClientId');
  });

  it('should throw an error if the file does not exist', async () => {
    const fs = await import('fs');
    fs.readFileSync = vi.fn().mockImplementationOnce(() => {
      throw new Error();
    });

    expect(getClientID).toThrow();
  });

  describe('The ClientID file missing error', () => {
    it('should explain that the file is missing', async () => {
      const fs = await import('fs');
      fs.readFileSync = vi.fn().mockImplementationOnce(() => {
        throw new Error('ENOENT');
      });

      expect(getClientID).toThrow('ClientID File could not be found.');
    });
  });
});

describe('The getClientSecret function', () => {
  it('should return the ClientSecret', async () => {
    const fs = await import('fs');
    fs.readFileSync = vi.fn().mockReturnValueOnce('testClientSecret');

    const clientSecret = getClientSecret();

    expect(clientSecret).not.toBeNull();
    expect(clientSecret).toBeTypeOf('string');
    expect(clientSecret).toBe('testClientSecret');
  });

  it('should throw an error if the file does not exist', async () => {
    const fs = await import('fs');
    fs.readFileSync = vi.fn().mockImplementationOnce(() => {
      throw new Error();
    });

    expect(getClientSecret).toThrow();
  });

  describe('The ClientSecret file missing error', () => {
    it('should explain that the file is missing', async () => {
      const fs = await import('fs');
      fs.readFileSync = vi.fn().mockImplementationOnce(() => {
        throw new Error('ENOENT');
      });

      expect(getClientSecret).toThrow('Client Secret File could not be found.');
    });
  });
});
