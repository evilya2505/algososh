import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import fibbonacci from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { v4 as uuidv4 } from "uuid";

type TNumberType = {
  number: number;
  id: string;
};

export const FibonacciPage: React.FC = () => {
  const [stringInput, setStringInput] = useState<string>("");
  const [numbersArray, setNumbersArray] = useState<Array<TNumberType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStringInput(e.target.value);
  }

  function handleFibonacciButton() {
    setNumbersArray([]);

    const inputNumber = parseInt(stringInput, 10);

    if (!isNaN(inputNumber) && inputNumber >= 0 && inputNumber <= 19) {
      setIsLoading(true);

      const sequence: TNumberType[] = [];
      for (let i = 0; i <= inputNumber; i++) {
        sequence.push({
          number: calculateFibonacci(i),
          id: uuidv4(),
        });
      }

      const delay = 500;
      const totalDelay = 500 * sequence.length;
      sequence.forEach((item, index) => {
        setTimeout(() => {
          setNumbersArray((prevNumbers) => [...prevNumbers, item]);
        }, delay * (index + 1));
      });

      setTimeout(() => {
        setIsLoading(false);
      }, totalDelay);
    } else {
      setNumbersArray([]);
    }
  }

  function calculateFibonacci(n: number): number {
    if (n <= 1) {
      return n;
    } else {
      return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={fibbonacci.form}>
        <fieldset className={fibbonacci.fieldset}>
          <input
            onChange={handleChange}
            value={stringInput}
            type="number"
            name="string"
            className={fibbonacci.input}
            placeholder="Введите число (макс. 19)"
            min="0"
            max="19"
          />
          <button
            onClick={handleFibonacciButton}
            type="button"
            className={fibbonacci.button}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Рассчитать"}
          </button>
        </fieldset>
        <label className={fibbonacci.label}>Максимальное число — 19</label>
      </form>
      <section className={fibbonacci.resultSection}>
        <ul className={fibbonacci.letters}>
          {numbersArray.map((numberObj, index) => (
            <li className={fibbonacci.letter} key={numberObj.id}>
              <Circle letter={numberObj.number.toString()} />
              <p className={fibbonacci.index}>{index}</p>
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
