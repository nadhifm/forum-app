/**
 * skenario testing
 *
 * - RegisterModal component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterModal from './RegisterModal';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterModal show hide={() => {}} register={() => {}} isLoading={false} />);
    const nameInput = await screen.getByPlaceholderText('nama');

    await userEvent.type(nameInput, 'test@test.com');

    expect(nameInput).toHaveValue('test@test.com');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterModal show hide={() => {}} register={() => {}} isLoading={false} />);
    const emailInput = await screen.getByPlaceholderText('name@example.com');

    await userEvent.type(emailInput, 'test@test.com');

    expect(emailInput).toHaveValue('test@test.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterModal show hide={() => {}} register={() => {}} isLoading={false} />);
    const passwordInput = await screen.getByPlaceholderText('password');

    await userEvent.type(passwordInput, 'passwordtest');

    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterModal show hide={() => {}} register={mockRegister} isLoading={false} />);
    const nameInput = await screen.getByPlaceholderText('nama');
    await userEvent.type(nameInput, 'nameTest');
    const emailInput = await screen.getByPlaceholderText('name@example.com');
    await userEvent.type(emailInput, 'test@test.com');
    const passwordInput = await screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'passwordtest');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    await userEvent.click(registerButton);

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'nameTest',
      email: 'test@test.com',
      password: 'passwordtest',
    });
  });
});
