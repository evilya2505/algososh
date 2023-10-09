import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import string from "./string.module.css";
import { Circle } from "../ui/circle/circle";

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

  useEffect(() => {
    if (isChanging) {
      animateStringReverse();
    }
  }, [isChanging]);

  function handleReverseButton() {
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

  function animateStringReverse() {
    const newLettersArray = [...lettersArray];
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

        setLettersArray([...newLettersArray]);
      } else {
        const tempLettersArray = [...lettersArray];
        for (let i: number = 0; i < tempLettersArray.length; i++) {
          tempLettersArray[i].isSorted = true;
        }
        setLettersArray([...tempLettersArray]);
        clearInterval(interval);
        setIsChanging(false);
      }
    }, 1000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStringInput(e.target.value);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={string.form}>
        <fieldset className={string.fieldset}>
          <input
            onChange={handleChange}
            value={stringInput}
            type="text"
            name="string"
            className={string.input}
          />
          <button
            onClick={handleReverseButton}
            type="button"
            className={string.button}
            disabled={isChanging}
          >
            {isChanging ? "..." : "Развернуть"}
          </button>
        </fieldset>
        <label className={string.label}>Максимум 11 символов</label>
      </form>

      <section className={string.resultSection}>
        <ul className={string.letters}>
          {lettersArray.map((letterObj: TLetterType, index: number) => {
            return (
              <li className={string.letter} key={letterObj.id}>
                <Circle
                  letter={letterObj.letter}
                  isChanging={currentIndex.includes(index)}
                  isSorted={letterObj.isSorted}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
