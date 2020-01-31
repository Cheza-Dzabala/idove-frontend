import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Axios from '../../../../helpers/Axios';

import ResetPassword from '../ResetPassword';
import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() })

describe('====> Password Reset Component', () => {
  let container;
  let nativeInputValueSetter;

  beforeEach(() => {
    act(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<MemoryRouter>
        <ResetPassword isActive={true} />
      </MemoryRouter>, container);
      nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    })
  });

  afterEach(() => {
    act(() => {
      document.body.removeChild(container);
      container = null;
    })
  })

  it('- Should show error when passwords dont match', async () => {
    const promise = Promise.resolve()

    const password = document.querySelector("[data-test=password]");
    const password2 = document.querySelector("[data-test=password-confirm]");
    const button = document.querySelector("[data-test=submitButton]");


    nativeInputValueSetter.call(password, 'mypasscom');
    nativeInputValueSetter.call(password2, 'mypasscom2');

    act(() => {
      password.dispatchEvent(new Event('input', { bubbles: true }))
    });

    act(() => {
      password2.dispatchEvent(new Event('input', { bubbles: true }));
    })

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    await act(() => promise)

    const notificationMessage = document.querySelector("[data-test=notificationMessage]");

    expect(notificationMessage.textContent).toEqual('×Passwords Do Not Match')
  });

  it('- Should show success when passwords match', async () => {
    const promise = Promise.resolve()
    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.resolve({
      status: 200,
      response: {}
    }));

    const password = document.querySelector("[data-test=password]");
    const password2 = document.querySelector("[data-test=password-confirm]");
    const button = document.querySelector("[data-test=submitButton]");


    nativeInputValueSetter.call(password, 'mypasscom');
    nativeInputValueSetter.call(password2, 'mypasscom');

    act(() => {
      password.dispatchEvent(new Event('input', { bubbles: true }))
    });

    act(() => {
      password2.dispatchEvent(new Event('input', { bubbles: true }));
    })

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    await act(() => promise)

    const notificationMessage = document.querySelector("[data-test=notificationMessage]");

    expect(notificationMessage.textContent).toEqual('×Successfully changed your password. You may proceed to log in.')
  });


  it('- Should show reject when server returns an error', async () => {
    const promise = Promise.resolve()
    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.reject({
      status: 400,
      response: {
        data: {
          details: "Your password is too close to your username."
        }
      }
    }));

    const password = document.querySelector("[data-test=password]");
    const password2 = document.querySelector("[data-test=password-confirm]");
    const button = document.querySelector("[data-test=submitButton]");


    nativeInputValueSetter.call(password, 'mypasscom');
    nativeInputValueSetter.call(password2, 'mypasscom');

    act(() => {
      password.dispatchEvent(new Event('input', { bubbles: true }))
    });

    act(() => {
      password2.dispatchEvent(new Event('input', { bubbles: true }));
    })

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    await act(() => promise)

    const notificationMessage = document.querySelector("[data-test=notificationMessage]");

    expect(notificationMessage.textContent).toEqual('×Your password is too close to your username.')
  });

});
