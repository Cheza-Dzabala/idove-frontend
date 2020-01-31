import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Axios from '../../../../helpers/Axios';
import { unsuccessfulRegister } from './data.mock';

import Register from '../Register';
import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() })

describe('====> Test Register Component', () => {
  let container;
  let nativeInputValueSetter;

  beforeEach(() => {
    act(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<MemoryRouter>
        <Register isActive={true} />
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

  it('- Should render errors on unsuccessful Register', async () => {
    const promise = Promise.resolve()
    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.reject({
      status: 401,
      response: {
        data: unsuccessfulRegister
      }
    }));

    const email = document.querySelector("[data-test=email]");
    const first_name = document.querySelector("[data-test=first_name]");
    const last_name = document.querySelector("[data-test=last_name]");
    const password = document.querySelector("[data-test=password]");
    const password2 = document.querySelector("[data-test=password2]");
    const username = document.querySelector("[data-test=username]");
    const button = document.querySelector("[data-test=submitButton]");

    nativeInputValueSetter.call(email, 'myusername');
    nativeInputValueSetter.call(username, 'mypass.com');
    nativeInputValueSetter.call(password, 'mypasscom');
    nativeInputValueSetter.call(password2, 'mypasscom');
    nativeInputValueSetter.call(first_name, 'Fred');
    nativeInputValueSetter.call(last_name, 'Flinstone');

    act(() => {
      first_name.dispatchEvent(new Event('input', { bubbles: true }))
    });

    act(() => {
      last_name.dispatchEvent(new Event('input', { bubbles: true }))
    });

    act(() => {
      email.dispatchEvent(new Event('input', { bubbles: true }))
    });

    act(() => {
      username.dispatchEvent(new Event('input', { bubbles: true }))
    })

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
    expect(notificationMessage.textContent).toEqual('×This username does not exist')
  });


  it('- Should Register with email', async () => {
    const promise = Promise.resolve();

    act(() => {
      Axios.post = jest.fn()
      Axios.post.mockImplementation(() => Promise.resolve({
        status: 200,
        data: "Successfully Created Account, please check you email"
      }));

      const email = document.querySelector("[data-test=email]");
      const password = document.querySelector("[data-test=password]");
      const button = document.querySelector("[data-test=submitButton]");

      nativeInputValueSetter.call(email, 'myemail@mail.com');
      nativeInputValueSetter.call(password, 'mypass.com');

      email.dispatchEvent(new Event('input', { bubbles: true }))
      password.dispatchEvent(new Event('input', { bubbles: true }))
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });

    await act(() => promise)
    const notificationMessage = document.querySelector("[data-test=notificationMessage]");
    expect(notificationMessage.textContent).toEqual('×Successfully Created Account, please check you email')
  });
});
