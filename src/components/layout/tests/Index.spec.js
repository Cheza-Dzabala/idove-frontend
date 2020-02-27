import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './../../home/index';
import Index from './../index';
import * as AuthHelpers from '../../../helpers/AuthHelpers';
import findByTestAttribute from '../../../tests/utilities/findByTestAttribute';

configure({ adapter: new Adapter() })
const props = {
  hasBackground: false,
}
const setUp = () => {
  AuthHelpers.userData = jest.fn().mockImplementation(() => {
    return {
      username: 'cheza',
      email: 'chezad@live.com',
    }
  })

  const wrapper = mount(<Index >
    <Home
      {...props}
    />
  </Index>);
  return wrapper;
}
describe('====> ', () => {

  let hamburger;
  let openChat;

  it('- Should show error when verification fails', async (done) => {
    const wrapper = setUp();
    hamburger = findByTestAttribute(wrapper, 'hamburger')
    openChat = findByTestAttribute(wrapper, 'openChat')
    expect(hamburger.length).toEqual(1)
    expect(openChat.length).toEqual(1)
    hamburger.simulate('click')
    openChat.simulate('click')
    hamburger = findByTestAttribute(wrapper, 'hamburger')
    const hamburgerClose = findByTestAttribute(wrapper, 'hamburger-close')
    const closeChat = findByTestAttribute(wrapper, 'closeChat')
    expect(hamburgerClose.length).toEqual(1)
    expect(closeChat.length).toEqual(1)
    done()
  });

});
