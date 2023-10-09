import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import list from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import LinkedList from "./list";
import arrow from "../../images/ChevronRight.svg";
import { TAIL, HEAD } from "../../constants/element-captions";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

const linkedList = new LinkedList<number>();

export const ListPage: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [index, setIndex] = React.useState<string>("");
  const [listItems, setListItems] = React.useState<number[]>([]);
  const [currentIndexToAdd, setCurrentIndexToAdd] = React.useState<
    number | undefined
  >(undefined);
  const [currentIndexToDelete, setCurrentIndexToDelete] = React.useState<
    number | undefined
  >(undefined);
  const [nextNumber, setNextNumber] = React.useState<number | undefined>(
    undefined
  );
  const [justAddedItemIndex, setJustAddedItemIndex] = React.useState<
    number | undefined
  >(undefined);
  const [currentIndexesToChange, setCurrentIndexesToChange] = React.useState<
    number[]
  >([]);
  const [isAddingToHead, setIsAddingToHead] = React.useState<boolean>(false);
  const [isAddingToTail, setIsAddingToTai] = React.useState<boolean>(false);
  const [isDeletingFromHead, setIsDeletingFromHead] =
    React.useState<boolean>(false);
  const [isDeletingFromTail, setIsDeletingFromTail] =
    React.useState<boolean>(false);
  const [isDeletingByIndex, setIsDeletingByIndex] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isAddingByIndex, setIsAddingByIndex] = React.useState<boolean>(false);

  React.useEffect(() => {
    linkedList.append(0);
    linkedList.append(34);
    linkedList.append(8);
    linkedList.append(1);

    setListItems([...linkedList.getList()]);

    return () => {
      linkedList.clear();
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "value":
        setInput(e.target.value);
        break;
      case "index":
        setIndex(e.target.value);
        break;
      default:
        break;
    }
  }

  async function handleAddToHeadButton() {
    setIsAddingToHead(true);
    setIsLoading(true);
    setCurrentIndexToAdd(0);
    setNextNumber(parseInt(input));

    await delay();

    linkedList.prepend(parseInt(input));
    setListItems([...linkedList.getList()]);
    setCurrentIndexToAdd(undefined);
    setNextNumber(undefined);
    setJustAddedItemIndex(0);

    await delay();

    setJustAddedItemIndex(undefined);
    setIsAddingToHead(false);
    setIsLoading(false);
  }

  async function handleAddToTailButton() {
    setIsAddingToTai(true);
    setIsLoading(true);
    setCurrentIndexToAdd(linkedList.size() - 1);
    setNextNumber(parseInt(input));

    await delay();

    linkedList.append(parseInt(input));
    setListItems([...linkedList.getList()]);
    setCurrentIndexToAdd(undefined);
    setNextNumber(undefined);
    setJustAddedItemIndex(linkedList.size() - 1);

    await delay();

    setJustAddedItemIndex(undefined);
    setIsAddingToTai(false);
    setIsLoading(false);
  }

  async function handleDeleteFromHeadButton() {
    setIsDeletingFromHead(true);
    setIsLoading(true);
    setCurrentIndexToDelete(0);

    await delay();

    linkedList.remove(0);
    setListItems([...linkedList.getList()]);
    setCurrentIndexToDelete(undefined);
    setIsDeletingFromHead(false);
    setIsLoading(false);
  }
  async function handleDeleteFromTailButton() {
    setIsDeletingFromTail(true);
    setIsLoading(true);
    setCurrentIndexToDelete(linkedList.size() - 1);

    await delay();

    linkedList.remove(linkedList.size() - 1);
    setListItems([...linkedList.getList()]);
    setCurrentIndexToDelete(undefined);
    setIsDeletingFromTail(false);
    setIsLoading(false);
  }

  async function handleAddByIndexButton() {
    setIsAddingByIndex(true);
    setIsLoading(true);
    const indexesToAdd = [];

    setCurrentIndexToAdd(0);

    for (let i = 0; i < parseInt(index); i++) {
      setNextNumber(parseInt(input));

      await delay();

      if (i !== parseInt(index) - 1) setCurrentIndexToAdd(i + 1);
      indexesToAdd.push(i);
      setCurrentIndexesToChange([...indexesToAdd, i]);
      await delay();
    }

    setCurrentIndexToAdd(undefined);
    setNextNumber(undefined);
    setCurrentIndexesToChange([]);

    linkedList.insert(parseInt(input), parseInt(index));
    setListItems([...linkedList.getList()]);

    setJustAddedItemIndex(parseInt(index));

    await delay();

    setJustAddedItemIndex(undefined);
    setIsAddingByIndex(false);
    setIsLoading(false);
  }

  async function handleDeleteByIndexButton() {
    setIsDeletingByIndex(true);
    setIsLoading(true);
    const indexesToDelete = [];

    for (let i = 0; i < parseInt(index) + 1; i++) {
      indexesToDelete.push(i);
      setCurrentIndexesToChange([...indexesToDelete, i]);
      await delay();
    }
    indexesToDelete.pop();
    setCurrentIndexesToChange([...indexesToDelete]);
    setCurrentIndexToDelete(parseInt(index));

    await delay();

    setCurrentIndexesToChange([]);
    setCurrentIndexToDelete(undefined);

    linkedList.remove(parseInt(index));
    setListItems([...linkedList.getList()]);
    setIsDeletingByIndex(false);
    setIsLoading(false);
  }

  async function delay() {
    return new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={list.header}>
        <form className={list.form}>
          <fieldset className={list.fieldset}>
            <Input
              name="value"
              extraClass={list.input}
              placeholder="Введите значение"
              type="text"
              isLimitText={true}
              maxLength={4}
              onChange={handleChange}
              value={input}
            />
            <Button
              extraClass={list.button}
              onClick={handleAddToHeadButton}
              text="Добавить в head"
              type="button"
              isLoader={isAddingToHead}
              disabled={isLoading || listItems.length === 8 || input === ""}
            />
            <Button
              extraClass={list.button}
              onClick={handleAddToTailButton}
              text="Добавить в tail"
              type="button"
              isLoader={isAddingToTail}
              disabled={isLoading || listItems.length === 8 || input === ""}
            />
            <Button
              extraClass={list.button}
              onClick={handleDeleteFromHeadButton}
              text="Удалить из head"
              type="button"
              isLoader={isDeletingFromHead}
              disabled={isLoading || listItems.length === 0}
            />
            <Button
              extraClass={list.button}
              onClick={handleDeleteFromTailButton}
              text="Удалить из tail"
              type="button"
              isLoader={isDeletingFromTail}
              disabled={isLoading || listItems.length === 0}
            />
          </fieldset>
          <fieldset className={list.fieldset}>
            <Input
              name="index"
              extraClass={list.input}
              placeholder="Введите индекс"
              type="number"
              onChange={handleChange}
              value={index}
            />
            <Button
              extraClass={list.button}
              onClick={handleAddByIndexButton}
              text="Добавить по индексу"
              type="button"
              isLoader={isAddingByIndex}
              disabled={
                isLoading ||
                listItems.length === 8 ||
                index === "" ||
                input === ""
              }
            />
            <Button
              extraClass={list.button}
              onClick={handleDeleteByIndexButton}
              text="Удалить по индексу"
              type="button"
              isLoader={isDeletingByIndex}
              disabled={isLoading || index === "" || listItems.length === 0}
            />
          </fieldset>
        </form>
      </div>

      <section className={list.resultsSection}>
        <ul className={list.stack}>
          {listItems.map((number, index) => {
            let state: ElementStates = ElementStates.Default;
            if (justAddedItemIndex === index) state = ElementStates.Modified;
            if (currentIndexesToChange?.includes(index))
              state = ElementStates.Changing;
            return (
              <>
                <li className={list.stackItem} key={index}>
                  {currentIndexToAdd === index && (
                    <Circle
                      extraClass={list.smallStackItem}
                      letter={nextNumber?.toString()}
                      state={ElementStates.Changing}
                      isSmall={true}
                    />
                  )}

                  <Circle
                    extraClass={list.bigStackItem}
                    letter={
                      currentIndexToDelete !== index ? number?.toString() : ""
                    }
                    tail={
                      linkedList.getTailIndex() === index &&
                      currentIndexToDelete !== index
                        ? TAIL
                        : null
                    }
                    head={
                      linkedList.getHeadIndex() === index &&
                      currentIndexToAdd !== index
                        ? HEAD
                        : null
                    }
                    state={state}
                    index={index}
                  />

                  {index !== listItems.length - 1 && (
                    <img alt="стрелка" className={list.arrow} src={arrow} />
                  )}

                  {currentIndexToDelete === index && (
                    <Circle
                      extraClass={list.smallStackItemBottom}
                      letter={number?.toString()}
                      state={ElementStates.Changing}
                      isSmall={true}
                    />
                  )}
                </li>
              </>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
