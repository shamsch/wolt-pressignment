import React, { useState } from "react";

import {IState as IProps} from "../App"

//react date-picker imported 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import App from "../App";



const InputField:React.FC<IProps> = ({data:value}) => {
  const [date, setDate]=useState<Date>(new Date())

  console.log(date)
  return (
    <form>
      <span>Cart Value</span>
      <input></input> <span>€</span> <br/>
      <span>Delivery distance</span>
      <input></input> <span>m</span> <br/>
      <span>Amount of items</span>
      <input></input><br/>
      <span>Date and time</span>
      <DatePicker
        selected={value?.dateAndTime}
        onChange={(x:Date)=>setDate(x)}
        showTimeSelect
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </form>
  );
}

export default InputField;