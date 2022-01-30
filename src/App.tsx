import React, { useEffect, useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import calculate from "./functions/calculate";

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

  const [fee, setFee] = useState<number | null>(null);

  // console.log(fee);

  useEffect(() => {
    setFee(calculate(value));
  }, [value]);

  return (
    <div>
      <h1> Wolt Delivery Fee Calculator </h1>
      <InputForm data={value} setValue={setValue} />
      {fee !== null ? (
        <h3>Calculated fee: {fee} €</h3>
      ) : (
        <h3> Enter valid values to calculate fees </h3>
      )}
    </div>
  );
};

export default App;
