import React from "react";
import DropdownItem from "./DropdownItem";

const Dropdown = ({ onItemClick, items, inputName, isActive }) => {
  if (!isActive) return null;

  return (
    <ul className={"dropdown dropdown--is-active"}>
      {items.map(item => {
        return (
          <DropdownItem
            item={item}
            onItemClick={onItemClick}
            inputName={inputName}
            key={item.code}
          />
        );
      })}
    </ul>
  );
};

export default Dropdown;
