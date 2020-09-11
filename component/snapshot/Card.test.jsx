import React from 'react';
import { render } from '@testing-library/react';
import UserCard from './Card';


const exampleUser = {
  name: 'Zoe Lee',
  age: 25,
  gender: 'Female',
  country: 'Korea'
};

it('matches snapshot', () => {
  const { asFragment } = render(<UserCard user={exampleUser} />);

  expect(asFragment()).toMatchSnapshot();
});
