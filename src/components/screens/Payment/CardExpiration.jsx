import React from "react";

const getValues = (type) => {
  const values = [];
  values.push(type)
  for (
    let i = type === "month" ? 1 : 23;
    i <= (type === "month" ? 12 : 99);
    i++
  ) {
    values.push(i.toString().length === 1 ? "0" + i : i);
  }
  return values;
};

let types = ["month", "year"];

const CardExpiration = ({ errorM, ...props }) => (
  <label name = "test" style={{fontSize: "12px"}}>
   
    <span>Expiration Date:</span>
    {types.map((type, index) => (
      <span  key={index} style={{marginLeft: "-8px"}}>
        <select 
        name="expiry" 
        type={type}
        id={type}
        onChange={props.onChange}
        onBlur ={props.onBlur}
        style={{
            border: errorM && "1px solid red",
            backgroundColor: errorM  && "#fae2e3",
            fontSize: "12px",
            width: "50px"
        }}
       
        
        >
          {getValues(type).map((v) => (
            <option
              key={v}
              value={v}
              >
              {v}
            </option>
          ))}
        </select>
        
      </span>
    ))}
    <span style={{color: "red", fontSize: "14px", marginLeft: "10px"}}>{errorM} </span>
  </label>
);

export default CardExpiration;
