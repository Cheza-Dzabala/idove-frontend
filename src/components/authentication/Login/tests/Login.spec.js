import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Axios from '../../../../helpers/Axios';
import * as regexTest from '../../../../helpers/regexTests';
import { successfulLogin, unsuccessfulLogin } from './data.mock';

import Login from '../Login';
import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() })

describe('====> Test Login Component', () => {
  let container;
  let nativeInputValueSetter;

  beforeEach(() => {
    act(() => {
      nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<MemoryRouter>
        <Login isActive={true} />
      </MemoryRouter>, container);
    })
  });

  afterEach(() => {
    act(() => {
      document.body.removeChild(container);
      container = null;
    })
  })

  it('- Should render errors on unsuccessful login', async () => {
    const promise = Promise.resolve()

    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.reject({
      status: 401,
      response: {
        data: unsuccessfulLogin
      }
    }));


    const email = document.querySelector("[data-test=email]");
    const password = document.querySelector("[data-test=password]");
    const button = document.querySelector("[data-test=submitButton]");

    nativeInputValueSetter.call(email, 'myusername@name.com');
    nativeInputValueSetter.call(password, 'mypass.com');

    act(() => {
      email.dispatchEvent(new Event('input', { bubbles: true }))
      password.dispatchEvent(new Event('input', { bubbles: true }))
    });

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    await act(() => promise)

    const notificationMessage = document.querySelector("[data-test=notificationMessage]");

    expect(notificationMessage.textContent).toEqual('×This username does not exist')
  });


  it('- Should login with username', async () => {
    const promise = Promise.resolve()
    const email = document.querySelector("[data-test=email]");
    const password = document.querySelector("[data-test=password]");
    const button = document.querySelector("[data-test=submitButton]");

    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.resolve({
      status: 200,
      data: successfulLogin
    }));
    nativeInputValueSetter.call(email, 'fredflinestone');
    nativeInputValueSetter.call(password, 'mypass.com');

    act(() => {
      email.dispatchEvent(new Event('input', { bubbles: true }))
      password.dispatchEvent(new Event('input', { bubbles: true }))
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });

    await act(() => promise)
    expect(document.querySelector("[data-test=form]")).toBeFalsy()
  });



  it('- Should login with email', async () => {
    const promise = Promise.resolve()

    const email = document.querySelector("[data-test=email]");
    const password = document.querySelector("[data-test=password]");
    const button = document.querySelector("[data-test=submitButton]");

    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.resolve({
      status: 200,
      data: successfulLogin
    }));

    regexTest.validateEmail = jest.fn().mockImplementation(() => true);

    act(() => {

      nativeInputValueSetter.call(email, 'myemail@gmail.com');
      nativeInputValueSetter.call(password, 'mypass.com');
      email.dispatchEvent(new Event('input', { bubbles: true }))
      password.dispatchEvent(new Event('input', { bubbles: true }))
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });

    await act(() => promise)
    expect(document.querySelector("[data-test=form]")).toBeFalsy()
  });


  it('- Should show password reset Modal & Success when valid', async () => {
    const promise = Promise.resolve()

    const forgotPassword = document.querySelector("[data-test=forgotPassword]");

    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.resolve({
      status: 200,
      data: {
        detail: "Please check your email"
      }
    }));

    act(() => {
      forgotPassword.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });

    await act(() => promise)
    const email = document.querySelector("[data-test=reset-modal-email]");
    const submitButton = document.querySelector("[data-test=reset-modal-submitButton]");
    const resetModal = document.querySelector("[data-test=reset-modal]");

    expect(resetModal).toBeTruthy();
    expect(email).toBeTruthy();
    expect(submitButton).toBeTruthy();

    nativeInputValueSetter.call(email, 'myemail@gmail.com');

    act(() => {
      email.dispatchEvent(new Event('input', { bubbles: true }))
      submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });

    await act(() => promise)

    await act(() => promise)

    const notificationMessage = document.querySelector("[data-test=notificationMessage]");

    expect(notificationMessage.textContent).toEqual('×Successfully requested a password reset code. Please check your email')
  });

  it('- Should show password reset Modal & Error when inValid', async () => {
    const promise = Promise.resolve()

    const forgotPassword = document.querySelector("[data-test=forgotPassword]");

    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.reject({
      status: 400,
      response: {
        data: {
          detail: "This email does not exist on the system"
        }
      }
    }));

    act(() => {
      forgotPassword.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });

    await act(() => promise)
    const email = document.querySelector("[data-test=reset-modal-email]");
    const submitButton = document.querySelector("[data-test=reset-modal-submitButton]");
    const resetModal = document.querySelector("[data-test=reset-modal]");

    expect(resetModal).toBeTruthy();
    expect(email).toBeTruthy();
    expect(submitButton).toBeTruthy();

    nativeInputValueSetter.call(email, 'myemail@gmail.com');

    act(() => {
      email.dispatchEvent(new Event('input', { bubbles: true }))
      submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });

    await act(() => promise)

    await act(() => promise)

    const notificationMessage = document.querySelector("[data-test=notificationMessage]");

    expect(notificationMessage.textContent).toEqual('×This email does not exist on the system')
  });


});
