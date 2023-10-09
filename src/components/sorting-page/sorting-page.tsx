import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import sorting from "./sorting-page.module.css";
import stroke from "../../images/Stroke.png";
import union from "../../images/Union.png";
import { v4 as uuidv4 } from "uuid";

function randomArr() {
  const length = Math.floor(Math.random() * (17 - 3 + 1) + 3);
  const arr = [];

  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * (100 + 1)));
  }

  return arr;
}

type TNumberType = {
  number: number;
  id: string;
  isChanging: boolean;
  isSorted: boolean;
};

export const SortingPage: React.FC = () => {
  const [isFirstChecked, setIsFirstChecked] = React.useState<boolean>(true);
  const [isSecondChecked, setIsSecondChecked] = React.useState<boolean>(false);
  const [array, setArray] = React.useState<Array<TNumberType>>([]);
  const [isSorting, setIsSorting] = React.useState<boolean>(false);
  const [changingNumbers, setChangingNumbers] = React.useState<Array<string>>(
    []
  );
  const [isDescending, setIsDescending] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isSorting) {
      if (isFirstChecked) {
        selectionSort();
      } else if (isSecondChecked) {
        bubbleSort();
      }
    }
  }, [isSorting]);

  const handleRadios = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "1":
        setIsFirstChecked(true);
        setIsSecondChecked(false);
        break;
      case "2":
        setIsSecondChecked(true);
        setIsFirstChecked(false);
        break;
      default:
        break;
    }
  };
  const selectionSort = async () => {
    const newArray = [...array];
    const n = newArray.length;

    for (
      let currentElementIndex = 0;
      currentElementIndex < n - 1;
      currentElementIndex++
    ) {
      let indexToCompare = currentElementIndex;

      for (let i = currentElementIndex + 1; i < n; i++) {
        setChangingNumbers([newArray[currentElementIndex].id, newArray[i].id]);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isDescending) {
          if (newArray[i].number > newArray[indexToCompare].number) {
            indexToCompare = i;
          }
        } else {
          if (newArray[i].number < newArray[indexToCompare].number) {
            indexToCompare = i;
          }
        }
      }

      setChangingNumbers([]);
      newArray[indexToCompare].isSorted = true;

      if (indexToCompare !== currentElementIndex) {
        const temp = newArray[indexToCompare];
        newArray[indexToCompare] = newArray[currentElementIndex];
        newArray[currentElementIndex] = temp;
        setArray([...newArray]);
      }
    }

    setIsSorting(false);
  };

  const bubbleSort = async () => {
    const newArray = [...array];
    const n = newArray.length;
    let swapped;

    do {
      swapped = false;

      for (let i = 0; i < n - 1; i++) {
        setChangingNumbers([newArray[i].id, newArray[i + 1].id]);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isDescending) {
          if (newArray[i].number < newArray[i + 1].number) {
            const temp = newArray[i];
            newArray[i] = newArray[i + 1];
            newArray[i + 1] = temp;
            swapped = true;
          }
        } else {
          if (newArray[i].number > newArray[i + 1].number) {
            const temp = newArray[i];
            newArray[i] = newArray[i + 1];
            newArray[i + 1] = temp;
            swapped = true;
          }
        }

        setChangingNumbers([]);
        setArray([...newArray]);
      }
    } while (swapped);

    setIsSorting(false);
  };

  const handleNewArrayButton = () => {
    const tempNumbersArray: Array<number> = randomArr();
    const tempObjectsArray: Array<TNumberType> = [];
    for (let i: number = 0; i < tempNumbersArray.length; i++) {
      tempObjectsArray.push({
        number: tempNumbersArray[i],
        id: uuidv4(),
        isChanging: false,
        isSorted: false,
      });
    }
    setArray(tempObjectsArray);
  };

  const handleAscendingClick = () => {
    setIsDescending(false);
    setIsSorting(true);
  };

  const handleDescendingClick = () => {
    setIsDescending(true);
    setIsSorting(true);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sorting.header}>
        <div className={sorting.leftSection}>
          <div className={sorting.radios}>
            <RadioInput
              label="Выбор"
              isChecked={isFirstChecked}
              onChange={handleRadios}
              name="1"
            />
            <RadioInput
              label="Пузырек"
              isChecked={isSecondChecked}
              onChange={handleRadios}
              name="2"
            />
          </div>

          <div className={sorting.sortingButtons}>
            <button
              type="button"
              className={sorting.button}
              onClick={handleAscendingClick}
              disabled={isSorting}
            >
              <img
                className={sorting.buttonIcon}
                src={union}
                alt="По возрастанию"
              />
              <p className={sorting.buttonText}>По возрастанию</p>
            </button>
            <button
              type="button"
              className={sorting.button}
              onClick={handleDescendingClick}
              disabled={isSorting}
            >
              <img
                className={sorting.buttonIcon}
                src={stroke}
                alt="По убыванию"
              />
              <p className={sorting.buttonText}>По убыванию</p>
            </button>
          </div>
        </div>

        <button
          type="button"
          className={sorting.button}
          onClick={handleNewArrayButton}
          disabled={isSorting}
        >
          Новый массив
        </button>
      </div>

      <section className={sorting.resultsSection}>
        <ul className={sorting.numbers}>
          {array.map((obj, index) => {
            console.log(
              changingNumbers.includes(obj.id),
              changingNumbers,
              obj.id
            );
            return (
              <li key={index} className={sorting.number}>
                <div
                  className={`${sorting.column} ${
                    changingNumbers.includes(obj.id) && sorting.changing
                  } ${obj.isSorted && sorting.modified}`}
                  style={{ height: `${(obj.number * 340) / 100}px` }}
                />
                <p>{obj.number}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
