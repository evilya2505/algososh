import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import string from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

type TLetterType = {
  letter: string;
  id: number;
  isSorted: boolean;
};

export const StringComponent: React.FC = () => {
  const [stringInput, setStringInput] = useState<string>("");
  const [lettersArray, setLettersArray] = useState<Array<TLetterType>>([]);
  const [currentIndex, setCurrentIndex] = useState<Array<number>>([]);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  function handleReverseButton(e: any) {
    e.preventDefault();

    if (stringInput.length > 0 && !isChanging) {
      let tempArray: Array<string> = stringInput.split("");
      let tempLettersArray: Array<TLetterType> = [];
      for (let i: number = 0; i < tempArray.length; i++) {
        tempLettersArray.push({ letter: tempArray[i], id: i, isSorted: false });
      }

      setLettersArray(tempLettersArray);
      setCurrentIndex([]);
      setIsChanging(true);
    }
  }

  const animateStringReverse = React.useCallback(() => {
    setLettersArray((prevLettersArray) => {
      const newLettersArray = [...prevLettersArray];
      let left = 0;
      let right = newLettersArray.length - 1;

      const interval = setInterval(() => {
        if (left < right) {
          setCurrentIndex([left, right]);

          const temp = newLettersArray[left];
          newLettersArray[left] = newLettersArray[right];
          newLettersArray[right] = temp;

          if (left !== 0 && right !== newLettersArray.length - 1) {
            if (left === 0) {
              newLettersArray[right + 1].isSorted = true;
            }

            if (right === newLettersArray.length - 1) {
              newLettersArray[left - 1].isSorted = true;
            } else {
              newLettersArray[left - 1].isSorted = true;
              newLettersArray[right + 1].isSorted = true;
            }
          }

          left++;
          right--;
        } else {
          const tempLettersArray = [...newLettersArray];
          for (let i: number = 0; i < tempLettersArray.length; i++) {
            tempLettersArray[i].isSorted = true;
          }
          clearInterval(interval);
          setIsChanging(false);
        }
      }, DELAY_IN_MS);

      return newLettersArray;
    });
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStringInput(e.target.value);
  }

  useEffect(() => {
    if (isChanging) {
      animateStringReverse();
    }
  }, [isChanging, animateStringReverse]);

  return (
    <SolutionLayout title="Строка">
      <form className={string.form} onSubmit={handleReverseButton}>
        <fieldset className={string.fieldset}>
          <Input
            extraClass={string.input}
            placeholder="Введите текст"
            type="text"
            isLimitText={true}
            maxLength={11}
            onChange={handleChange}
            value={stringInput}
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={isChanging}
            disabled={isChanging || stringInput === ""}
          />
        </fieldset>
      </form>

      <section className={string.resultSection}>
        <ul className={string.letters}>
          {lettersArray.map((letterObj: TLetterType, index: number) => {
            let state: ElementStates = ElementStates.Default;
            if (currentIndex.includes(index)) state = ElementStates.Changing;
            if (letterObj.isSorted) state = ElementStates.Modified;

            return (
              <li
                data-testid="circle_li"
                className={string.letter}
                key={letterObj.id}
              >
                <Circle state={state} letter={letterObj.letter} />
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
