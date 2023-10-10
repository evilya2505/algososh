import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import fibbonacci from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

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

  function handleFibonacciButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNumbersArray([]);

    const inputNumber = parseInt(stringInput, 10);

    setIsLoading(true);

    const sequence: TNumberType[] = [];
    for (let i = 0; i <= inputNumber; i++) {
      sequence.push({
        number: calculateFibonacci(i),
        id: uuidv4(),
      });
    }

    const totalDelay = SHORT_DELAY_IN_MS * sequence.length;

    sequence.forEach((item, index) => {
      setTimeout(() => {
        setNumbersArray((prevNumbers) => [...prevNumbers, item]);
      }, SHORT_DELAY_IN_MS * (index + 1));
    });

    setTimeout(() => {
      setIsLoading(false);
    }, totalDelay);
  }

  function calculateFibonacci(n: number): number {
    if (n === 0) {
      return 1;
    } else if (n === 1) {
      return 1;
    } else {
      let prev1 = 1;
      let prev2 = 1;
      let current = 0;

      for (let i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
      }

      return current;
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={fibbonacci.form} onSubmit={handleFibonacciButton}>
        <fieldset className={fibbonacci.fieldset}>
          <Input
            extraClass={fibbonacci.input}
            placeholder="Введите текст"
            type="number"
            isLimitText={true}
            min={1}
            max={19}
            onChange={handleChange}
            value={stringInput}
          />
          <Button
            text="Рассчитать"
            type="submit"
            isLoader={isLoading}
            disabled={isLoading || stringInput === "" || parseInt(stringInput) > 19 || parseInt(stringInput) < 1}
          />
        </fieldset>
      </form>
      <section className={fibbonacci.resultSection}>
        <ul className={fibbonacci.letters}>
          {numbersArray.map((numberObj, index) => (
            <li className={fibbonacci.letter} key={numberObj.id}>
              <Circle letter={numberObj.number.toString()} index={index} />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
