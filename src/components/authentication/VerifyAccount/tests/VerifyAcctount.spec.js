import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Axios from '../../../../helpers/Axios';

import VerifyAccount from '../VerifyAccount';
import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() })

describe('====> Verify Account', () => {
  let container;
  let nativeInputValueSetter;

  beforeEach(() => {
    act(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<MemoryRouter>
        <VerifyAccount />
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

  it('- Should show error when verification fails', async (done) => {
    const promise = Promise.resolve()

    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.reject({
      status: 400,
      response: {
        data: {
          detail: "Your passcode is invalid."
        }
      }
    }));

    const email = document.querySelector("[data-test=email]");
    const passcode = document.querySelector("[data-test=passcode]");
    const button = document.querySelector("[data-test=submitButton]");

    nativeInputValueSetter.call(passcode, '1234');
    nativeInputValueSetter.call(email, 'flinstone@bedrock.com');

    act(() => {
      email.dispatchEvent(new Event('input', { bubbles: true }))
    });

    act(() => {
      email.dispatchEvent(new Event('input', { bubbles: true }));
    })

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    await act(() => promise)

    const notificationMessage = document.querySelector("[data-test=notificationMessage]");

    expect(notificationMessage.textContent).toEqual('×Your passcode is invalid.')
    done()
  });

  it('- Should Redirect on success', async () => {
    const promise = Promise.resolve()

    Axios.post = jest.fn()
    Axios.post.mockImplementation(() => Promise.resolve({
      status: 200,
      data: {
        username: 'Cheza',
        email: 'cheza@gmail.com',
        id: 1,
        token: 'kslkldsjldskjdlksmlksdnl'
      }
    }));


    const email = document.querySelector("[data-test=email]");
    const passcode = document.querySelector("[data-test=passcode]");
    const button = document.querySelector("[data-test=submitButton]");

    nativeInputValueSetter.call(passcode, '1234');
    nativeInputValueSetter.call(email, 'flinstone@bedrock.com');

    act(() => {
      email.dispatchEvent(new Event('input', { bubbles: true }))
    });

    act(() => {
      passcode.dispatchEvent(new Event('input', { bubbles: true }));
    })

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    await act(() => promise)

    expect(document.querySelector("[data-test=form]")).toBeFalsy()
  });

});
