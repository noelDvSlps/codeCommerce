import React from "react";
const items = [];
for (let i = 1; i <= 10; i++) {
  items.push(i);
}
const Option = ({ handleInputData, selected, name }) =>
  items.map((val) => (
    <option
      key={val}
      onChange={handleInputData}
      name={name + val}
      value={val}
      selected={selected === val ? true : false}
    >
      {" "}
      {val}
    </option>
  ));

export default Option;
