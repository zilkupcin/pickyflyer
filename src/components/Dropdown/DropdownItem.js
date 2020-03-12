import React from "react";

const DropdownItem = ({ item, inputName, onItemClick }) => {
  const handleOnMouseDown = () => {
    onItemClick({
      inputName: inputName,
      value: item.code
    });
  };

  return (
    <li
      className="dropdown__item"
      onMouseDown={handleOnMouseDown}
      key={item.code}
    >
      {item.name}
    </li>
  );
};

export default DropdownItem;
