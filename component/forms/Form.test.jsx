import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import AdvancedFilter from './Form';

describe('AdvancedFilter component', () => {
  const mockChangeValue = jest.fn();
  const stubbedSearchValue = {
    id: '',
    name: ''
  };

  // Testing initial values
  it('shows all required input fields with empty values', () => {
    const { getByTestId } = render(
      <AdvancedFilter
        searchValue={stubbedSearchValue}
        handleChangeValue={mockChangeValue}
      />
    );

    expect(getByTestId('filter-input-id').value).toBe('');
    expect(getByTestId('filter-input-name').value).toBe('');
  });

  // Simulating events
  it('triggers event handler on input change of name', () => {
    const changedSearchValue = { ...stubbedSearchValue, name: 'Zoe' };
    const { getByTestId, rerender } = render(
      <AdvancedFilter
        searchValue={stubbedSearchValue}
        handleChangeValue={mockChangeValue}
      />
    );

    act(() => {
      fireEvent.change(getByTestId('filter-input-name'), {
        target: { value: 'Zoe' },
      });
    });

    rerender(
      <AdvancedFilter
        searchValue={changedSearchValue}
        handleChangeValue={mockChangeValue}
      />
    );

    expect(getByTestId('filter-input-name').value).toBe('Zoe');
    expect(mockChangeValue).toBeCalledTimes(1);
  });
});
