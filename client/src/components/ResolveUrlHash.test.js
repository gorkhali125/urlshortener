import React from 'react';
import { shallow } from 'enzyme';

import ResolveUrlHash from './ResolveUrlHash';

it('should fetch a URL based on shortUrl', async () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    const ResolveUrlProps = {
      match: {
        params: {
          shortUrl:'BfOqgtvM'
        }
      },
      history:{
        push: () => {}
      }
    }
    const ResolveUrl = shallow(<ResolveUrlHash {...ResolveUrlProps} />);
    expect(fetchSpy).toBeCalled();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
});