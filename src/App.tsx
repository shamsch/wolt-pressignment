import React, { useEffect, useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";

export interface IState {
  data: {
    cartValue: number;
    deliveryDistance: number;
    amountOfItems: number;
    dateAndTime: Date;
  };
  setValue: React.Dispatch<React.SetStateAction<IState["data"]>>;
}

const App = () => {
  const [value, setValue] = useState<IState["data"]>({
    cartValue: 0,
    deliveryDistance: 0,
    amountOfItems: 0,
    dateAndTime: new Date(),
  });

  const [fee, setFee] = useState<number>(0);

  const calculate = (value: IState["data"]) => {
    const { amountOfItems, dateAndTime, cartValue, deliveryDistance } = value;
    //terminate if there is nothing in this order
    if (!amountOfItems) {
      return;
    }

    let tempFee = 0;

    // based on cart value
    if (cartValue < 10) {
      tempFee += 10 - cartValue;
    }

    //based on distance
    //base fee
    tempFee += 2;
    //based on extra dist
    if (deliveryDistance > 1000) {
      const extraDistance = deliveryDistance - 1000;
      const distanceFactor = Math.ceil(extraDistance / 500);
      tempFee += distanceFactor;
    }

    //based on number of items
    if (amountOfItems >= 5) {
      const extraItems = amountOfItems - 4;
      tempFee += 0.5 * extraItems;
    }

    //exceptional rules
    
    //if it's friday rush utc 15:00-19:00
    if (
      dateAndTime.getUTCDay() === 5 &&
      dateAndTime.getUTCHours() >= 15 &&
      dateAndTime.getUTCHours() <= 17
    ) {
      tempFee = tempFee * 1.1;
    }

    //if after all calculation it's more than 15 euro, make it 15
    if(tempFee>15){
      tempFee=15;
    }

    //free when the order value is >=100 euro
    if (cartValue >= 100) {
      tempFee = 0;
    }

    //finally update fee state
    setFee(tempFee);
  };

  console.log(fee);

  useEffect(()=>{
    calculate(value)
  },[value])

  return (
    <div>
      <h1> Wolt Delivery Fee Calculator </h1>
      <InputForm data={value} setValue={setValue} />
    </div>
  );
};

export default App;
