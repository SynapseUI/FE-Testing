import React from 'react';

const AdvancedFilter = ({ searchValue, handleChangeValue }) => (
  <form className="filter-container">
    <input
      data-testid="filter-input-id"
      type="text"
      name="id"
      value={searchValue.id}
      onChange={e => handleChangeValue(e)}
      placeholder="userID"
      className="filter-input"
    />
    <input
      data-testid="filter-input-name"
      type="text"
      name="name"
      value={searchValue.name}
      onChange={e => handleChangeValue(e)}
      placeholder="name"
      className="filter-input"
    />
  </form>
);

export default AdvancedFilter;