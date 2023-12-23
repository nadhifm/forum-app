/**
 * skenario testing
 *
 * - LoginModal component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginModal from './LoginModal';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LoginModal show hide={() => {}} login={() => {}} isLoading={false} />);
    const emailInput = await screen.getByPlaceholderText('name@example.com');

    await userEvent.type(emailInput, 'test@test.com');

    expect(emailInput).toHaveValue('test@test.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginModal show hide={() => {}} login={() => {}} isLoading={false} />);
    const passwordInput = await screen.getByPlaceholderText('password');

    await userEvent.type(passwordInput, 'passwordtest');

    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginModal show hide={() => {}} login={mockLogin} isLoading={false} />);
    const emailInput = await screen.getByPlaceholderText('name@example.com');
    await userEvent.type(emailInput, 'test@test.com');
    const passwordInput = await screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'passwordtest',
    });
  });
});
