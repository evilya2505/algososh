import React  from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import sorting from "./sorting-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";

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
  const arrayRef = React.useRef<Array<TNumberType>>([]);
  const [isSorting, setIsSorting] = React.useState<boolean>(false);
  const [changingNumbers, setChangingNumbers] = React.useState<Array<string>>(
    []
  );
  const [isDescending, setIsDescending] = React.useState<boolean>(false);
  const [isCreatingArrat, setIsCreatingArrat] = React.useState<boolean>(false);

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

  const selectionSort = React.useCallback(async () => {
    const newArray = [...arrayRef.current]; 
    const n = newArray.length;

    for (
      let currentElementIndex = 0;
      currentElementIndex < n - 1;
      currentElementIndex++
    ) {
      let indexToCompare = currentElementIndex;

      for (let i = currentElementIndex + 1; i < n; i++) {
        setChangingNumbers([newArray[currentElementIndex].id, newArray[i].id]);
        await delay();

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
        arrayRef.current = [...newArray];
        setArray([...newArray]);
      }
    }
    for (let i = 0; i < arrayRef.current.length; i++) {
      if (!arrayRef.current[i].isSorted) arrayRef.current[i].isSorted = true;
    }

    setArray([...arrayRef.current]);

    setIsSorting(false);
  }, [isDescending]);
  
  const bubbleSort = React.useCallback(async () => {
    const newArray = [...arrayRef.current]; 
    const n = newArray.length;
    let swapped;

    do {
      swapped = false;

      for (let i = 0; i < n - 1; i++) {
        setChangingNumbers([newArray[i].id, newArray[i + 1].id]);

        await delay();

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
        arrayRef.current = [...newArray];
        setArray([...newArray]);
      }
    } while (swapped);

    for (let i = 0; i < arrayRef.current.length; i++) {
      if (!arrayRef.current[i].isSorted) arrayRef.current[i].isSorted = true;
    }

    setArray([...arrayRef.current]);
    setIsSorting(false);
  }, [isDescending]);

  const handleNewArrayButton = () => {
    setIsCreatingArrat(true);
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
    arrayRef.current = [...tempObjectsArray];
    setArray([...tempObjectsArray]);
    setIsCreatingArrat(false);
  };

  const handleAscendingClick = () => {
    setIsDescending(false);
    setIsSorting(true);
  };

  const handleDescendingClick = () => {
    setIsDescending(true);
    setIsSorting(true);
  };

  React.useEffect(() => {
    if (isSorting) {
      if (isFirstChecked) {
        selectionSort();
      } else if (isSecondChecked) {
        bubbleSort();
      }
    }
  }, [isSorting, isFirstChecked, isSecondChecked, bubbleSort, selectionSort]);

  React.useEffect(() => {
    handleNewArrayButton();
  }, [])

  async function delay() {
    return new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
  }

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
              disabled={isSorting}
            />
            <RadioInput
              label="Пузырек"
              isChecked={isSecondChecked}
              onChange={handleRadios}
              name="2"
              disabled={isSorting}
            />
          </div>

          <div className={sorting.sortingButtons}>
            <Button onClick={handleAscendingClick} text="По возрастанию" sorting={Direction.Ascending} type="button" isLoader={isSorting && !isDescending} disabled={isSorting}/>
            <Button onClick={handleDescendingClick} text="По убыванию" sorting={Direction.Descending} type="button" isLoader={isSorting && isDescending} disabled={isSorting}/>
          </div>
        </div>

        <Button onClick={handleNewArrayButton} text="Новый массив" type="button" isLoader={isCreatingArrat} disabled={isSorting || isCreatingArrat}/>

      </div>

      <section className={sorting.resultsSection}>
        <ul className={sorting.numbers}>
          {array.map((obj, index) => {
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
