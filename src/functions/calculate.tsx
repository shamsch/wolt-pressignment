import { IState } from "../App";


const calculate = (value: IState["data"]): number | null => {
    const { amountOfItems, dateAndTime, cartValue, deliveryDistance } = value;

    //terminate if amount of item or cart value or delivery distance is zero
    //although this wasn't explicitly mentioned but I applied my own discretion here

    if (!amountOfItems || !cartValue || !deliveryDistance) {
      return null;
    }

    let tempFee: number = 0;

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
    if (tempFee > 15) {
      tempFee = 15;
    }

    //free when the order value is >=100 euro
    if (cartValue >= 100) {
      tempFee = 0;
    }

    //for testing and changing state
    return tempFee;
  };

  export default calculate; 