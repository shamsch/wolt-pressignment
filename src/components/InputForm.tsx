import React, { useState } from "react";

import { IState as IProps } from "../App";

//react date-picker imported
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import App from "../App";

const InputField: React.FC<IProps> = ({ data: value, setValue }) => {
  const [input, setInput] = useState<IProps["data"]>({
    cartValue: 0,
    deliveryDistance: 0,
    amountOfItems: 0,
    dateAndTime: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({...input, [e.target.name]: e.target.value})
  };

  return (
    <form>
      <span>Cart Value</span>
      <input
        type="number"
        value={input.cartValue}
        onChange={handleChange}
        name="cartValue"
      />
      <span> € </span> <br />

      <span>Delivery distance</span>
      <input
        type="number"
        value={input.deliveryDistance}
        onChange={handleChange}
        name="deliveryDistance"
      />
      <span> m </span> <br />

      <span>Amount of items</span>
      <input
        type="number"
        value={input.amountOfItems}
        onChange={handleChange}
        name="amountOfItems"
      />
      <br />

      <span>Date and time</span>
      <DatePicker
        selected={value.dateAndTime}
        onChange={(e) => {
          //because e can also be null and it results in type error
          if (e) {
            setInput({ ...input, dateAndTime: e });
          }
        }}
        showTimeSelect
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        name="dateAndTime"
      />
    </form>
  );
};

export default InputField;
