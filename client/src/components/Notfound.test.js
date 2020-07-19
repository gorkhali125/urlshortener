import React from 'react';
import { render } from '@testing-library/react';

import Notfound from './Notfound';

it('renders 404 not found page', () => {
    const { getByText } = render(<Notfound />);
    const element = getByText(/OOPS!!/i);
    expect(element).toBeInTheDocument();
});