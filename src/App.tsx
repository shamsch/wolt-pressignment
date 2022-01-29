import React, { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";

export interface IState {
  data: {
    cartValue: number;
    deliveryDistance: number;
    amountOfItems: number;
    dateAndTime: Date;
  };
  setValue: React.Dispatch<
    React.SetStateAction<IState["data"]>>;
}

function App() {
  const [value, setValue] = useState<IState["data"]>({
    cartValue: 0,
    deliveryDistance: 0,
    amountOfItems: 0,
    dateAndTime: new Date(),
  });

  return (
    <div>
      <h1> Wolt delivery </h1>
      <InputForm data={value} setValue={setValue}/>
    </div>
  );
}

export default App;
