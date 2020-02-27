import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import PageNotFound from '../PageNotFound';
import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() })

describe('====> Page Not Found', () => {
  let container;
  beforeEach(() => {
    act(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<MemoryRouter>
        <PageNotFound />
      </MemoryRouter>, container);
    })
  });

  afterEach(() => {
    act(() => {
      document.body.removeChild(container);
      container = null;
    })
  })

  it('- Should show error when verification fails', async (done) => {
    const pageNotFound = document.querySelector("[data-test=not-found]");
    expect(pageNotFound).toBeTruthy()
    done()
  });
});
