import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import mockStore from '../../../tests/utilities/mockStore';
import findByTestAttribute from '../../../tests/utilities/findByTestAttribute';

import Main from '../Main';

configure({ adapter: new Adapter() })


const componentSetUp = (state) => {
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store} >
      <Main />
    </Provider>
  );
  return wrapper;
}

describe('<=== MAIN COMPONENT TEST ===>', () => {
  let component;
  let loginLink;
  let registerLink;
  let loginPage;
  let registerPage;
  beforeEach(() => {
    component = componentSetUp({});
  });

  it('- Should render correctly, with login page showing', (done) => {
    registerPage = findByTestAttribute(component, 'registerTab')
    loginPage = findByTestAttribute(component, 'loginTab');
    expect(registerPage.first().prop('isActive')).toBeFalsy();
    expect(loginPage.first().prop('isActive')).toBeTruthy();
    done();
  });

  it('- Should render registration page correctly', (done) => {
    registerLink = findByTestAttribute(component, 'registerLink');
    registerLink.simulate('click');
    registerPage = findByTestAttribute(component, 'registerTab');
    loginPage = findByTestAttribute(component, 'loginTab');
    expect(registerPage.first().prop('isActive')).toBeTruthy();
    expect(loginPage.first().prop('isActive')).toBeFalsy();
    done();
  });

  it('- Should re-render login tab correctly, with login page showing', (done) => {
    loginLink = findByTestAttribute(component, 'loginLink');
    loginLink.simulate('click');
    registerPage = findByTestAttribute(component, 'registerTab');
    loginPage = findByTestAttribute(component, 'loginTab');
    expect(registerPage.first().prop('isActive')).toBeFalsy();
    expect(loginPage.first().prop('isActive')).toBeTruthy();
    done();
  });
});