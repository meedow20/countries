import React from 'react';
import {render, screen} from '@testing-library/react';
import {Countries} from './Countries';

test('renders learn react link', () => {
    render(<Countries/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});