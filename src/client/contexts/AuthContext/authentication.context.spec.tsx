import { AuthContext } from '#contexts';
import { createFetchResponse } from '#libTestUtils';
import { render, waitFor } from '#clientTestUtils';
import { beforeEach, describe, expect, it, vi, vitest } from 'vitest';
import React, { useContext, useState } from 'react';
import * as authenticator from '#lib/Auth';
import { act } from 'react-dom/test-utils';
import Module from 'module';
import { AuthenticationProvider } from './authentication.context';
import { isExpression } from 'typescript';
import { addMinutes } from 'date-fns';

const mockAuthResponse = {
  access_token: 'test token',
  token_type: 'best token',
  expires_in: 200,
};

vi.mock('#lib/Auth', () => ({
  authenticate: vi.fn(async () => {
    return (await createFetchResponse(mockAuthResponse)).json();
  }),
}));

vi.mock('react', async () => {
  const reactMock: Module = await vi.importActual('react');
  return {
    ...reactMock,
  };
});

describe('The authentication context', () => {
  it('should provide the expected token and details', async () => {
    const { getByTestId } = await act(async () => {
      return renderTestComponent();
    });

    expect(getByTestId('access-token')).toHaveTextContent(
      mockAuthResponse.access_token,
    );
    expect(getByTestId('access-token')).not.toHaveTextContent(
      'beep beep im a jeep',
    );
    expect(getByTestId('token-type')).toHaveTextContent(
      mockAuthResponse.token_type,
    );
    expect(getByTestId('expires-in')).toHaveTextContent(
      mockAuthResponse.expires_in.toString(),
    );
  });

  it('should make a call to the authenticate function', async () => {
    const spy = vi.spyOn(authenticator, 'authenticate');

    renderTestComponent();

    expect(spy).toHaveBeenCalledOnce();
  });
});

const TestAuthenticationComponent = () => {
  const { appAuth } = useContext(AuthContext);
  return (
    <>
      <p data-testid="access-token">{appAuth?.access_token}</p>
      <p data-testid="token-type">{appAuth?.token_type}</p>
      <p data-testid="expires-in">{appAuth?.expires_in}</p>
    </>
  );
};

const renderTestComponent = () => {
  return render(
    <AuthenticationProvider>
      <TestAuthenticationComponent />
    </AuthenticationProvider>,
  );
};
