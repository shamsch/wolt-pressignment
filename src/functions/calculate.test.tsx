import calculate from "./calculate";

describe("Simple base fare and difference to minimum case", () => {
  test("Testing with 0s and negative", () => {
    //first testing with all 0s, result null
    expect(
      calculate({
        cartValue: 0,
        deliveryDistance: 0,
        amountOfItems: 0,
        dateAndTime: new Date(),
      })
    ).toBe(null);

    //testing with some negatives, result null
    expect(
      calculate({
        cartValue: -50,
        deliveryDistance: 0,
        amountOfItems: 10,
        dateAndTime: new Date(),
      })
    ).toBe(null);
  });

  test("Testing base fare case", () => {
    //base fare case, less than 100 on the cart, should just be base
    expect(
      calculate({
        cartValue: 15,
        deliveryDistance: 1000,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(2);
  });

  test("Testing difference to minimum", () => {
    //difference to minimum, so 10-5=5 and with base 2, it's 7 euro
    expect(
      calculate({
        cartValue: 5,
        deliveryDistance: 50,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(7);
  });
});

describe("Testing delivery with different delivery distance", () => {
  test("When the delivery distance is >1000 meter", () => {
    //with distance 1499m, only 1 extra 500 meter so +1 euro with base
    expect(
      calculate({
        cartValue: 10,
        deliveryDistance: 1499,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(3);

    //with distance 1500m, still only 1 extra 500m so +1 euro with base
    expect(
      calculate({
        cartValue: 10,
        deliveryDistance: 1500,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(3);

    //with distance 1501m, now 2 extra 500m so +2 euro with base
    expect(
      calculate({
        cartValue: 10,
        deliveryDistance: 1501,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(4);
  });
});

describe("Testing additional 50 cent charge for items 5 or more", () => {
  test("Testing with 4 items", () => {
    //with 4 items, should just be the base
    expect(
      calculate({
        cartValue: 10,
        deliveryDistance: 1000,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(2);
  });

  test("Testing base 5 items", () => {
    //with 5 items 1*.50=.50 with base 2 equals 2.5
    expect(
      calculate({
        cartValue: 10,
        deliveryDistance: 1000,
        amountOfItems: 5,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(2.5);
  });

  test("Testing with 10 items", () => {
    //with 10 items 6*.50=3 with base 2 equals 5
    expect(
      calculate({
        cartValue: 10,
        deliveryDistance: 1000,
        amountOfItems: 10,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(5);
  });
});

describe("Testing if the fee can exceed 15 euro", () => {
  test("Testing with high values", () => {
    //should be >15 if unchecked
    expect(
      calculate({
        cartValue: 99,
        deliveryDistance: 10000,
        amountOfItems: 100,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(15);
  });
});

describe("Testing when cart value is equal or more than 100e", () => {
  test("Testing with 100e on the cart", () => {
    //should be 0 as the cart value is 100
    expect(
      calculate({
        cartValue: 100,
        deliveryDistance: 100,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(0);
  });

  test("Testing with more than 100e on the cart", () => {
    //should be 0 as the cart value is 200
    expect(
      calculate({
        cartValue: 100,
        deliveryDistance: 200,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-01T12:00:00.000+02:00"), //January 1 2022 12:00 Saturday in Helsinki
      })
    ).toBe(0);
  });
});

describe("Testing Friday rush hours", () => {
  test("Testing at Friday rush hour", () => {
    //Friday 17:00 Helsinki-> 15:00 UTC, base*1.1=2.2
    expect(
      calculate({
        cartValue: 99,
        deliveryDistance: 100,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-28T17:00:00.000+02:00"), //January 28 2022 17:00 Saturday in Helsinki
      })
    ).toBe(2.2);
  });

  test("Testing before Friday rush hour", () => {
    //Friday 16:59 Helsinki-> 14:50 UTC, only base fee so 2
    expect(
      calculate({
        cartValue: 99,
        deliveryDistance: 100,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-28T16:59:00.000+02:00"), //January 28 2022 16:59 Saturday in Helsinki
      })
    ).toBe(2);
  });

  test("Testing after Friday rush hour", () => {
    //Friday 21:01 Helsinki-> 19:01 UTC, only base fee so 2
    expect(
      calculate({
        cartValue: 99,
        deliveryDistance: 100,
        amountOfItems: 4,
        dateAndTime: new Date("2022-01-28T21:01:00.000+02:00"), //January 28 2022 21:01 Saturday in Helsinki
      })
    ).toBe(2);
  });
});
