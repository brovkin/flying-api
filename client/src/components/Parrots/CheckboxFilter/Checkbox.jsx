import React, { useState } from 'react';

const Checkbox = ({ name, label, filterHandle }) => {
  const [active, setActive] = useState(false);
  const handleChange = (e) => {
    filterHandle(name, e.target.checked);
  };

  return (
    <label htmlFor={name}>
      {label}
      <input id={name} type="checkbox" onChange={handleChange} />
    </label>
  );
};

export default Checkbox;
