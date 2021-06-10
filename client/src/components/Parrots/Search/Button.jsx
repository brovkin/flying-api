import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { parrotsSelector } from '../../../selectors/parrots';

const Button = ({ name, label, onClick }) => {
  const { filterBy } = useSelector(parrotsSelector);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (filterBy.includes(name)) {
      setActive(true);
    }
  }, [filterBy]);

  const handleClick = (e) => {
    const currentCond = !active;
    setActive(currentCond);
    onClick(e, currentCond);
  };

  return (
    <button
      type="button"
      className={`btn btn-outline-primary${active ? ' active' : ''}`}
      name={name}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
