/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
  describe,
  beforeEach,
  afterEach,
  it,
  vi,
  expect,
} from 'vitest';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';
import { showLoadingBarActionCreator } from '../loadingBar/action';
import { hideRegisterModalActionCreator } from '../registerModal/action';
import { showLoginModalActionCreator } from '../loginModal/action';

const fakeUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('"name" is not allowed to be empty');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    delete api._register;
  });

  it('should dispatch action correctly when register success', async () => {
    api.register = () => Promise.resolve(fakeUserResponse);
    const dispatch = vi.fn();

    await asyncRegisterUser({ name: 'name', email: 'name@example.com', password: 'password' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoadingBarActionCreator(35));
    expect(dispatch).toHaveBeenCalledWith(showLoadingBarActionCreator(70));
    expect(dispatch).toHaveBeenCalledWith(hideRegisterModalActionCreator());
    expect(dispatch).toHaveBeenCalledWith(showLoginModalActionCreator());
    expect(dispatch).toHaveBeenCalledWith(showLoadingBarActionCreator(100));
  });

  it('should dispatch action and call alert correctly when register failed', async () => {
    api.register = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncRegisterUser({ name: '', email: 'name@example.com', password: 'password' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoadingBarActionCreator(35));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(showLoadingBarActionCreator(100));
  });
});
