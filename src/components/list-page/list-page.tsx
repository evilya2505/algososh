import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import list from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import LinkedList from "./list";
import arrow from "../../images/ChevronRight.svg";
import { TAIL, HEAD } from "../../constants/element-captions";
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

  React.useEffect(() => {
    linkedList.append(0);
    linkedList.append(34);
    linkedList.append(8);
    linkedList.append(1);
    console.log(linkedList.toArray());
    setListItems([...linkedList.toArray()]);
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
    setCurrentIndexToAdd(0);
    setNextNumber(parseInt(input));

    await new Promise((resolve) => setTimeout(resolve, 500));

    linkedList.prepend(parseInt(input));
    setListItems([...linkedList.toArray()]);
    setCurrentIndexToAdd(undefined);
    setNextNumber(undefined);
    setJustAddedItemIndex(0);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setJustAddedItemIndex(undefined);
  }

  async function handleAddToTailButton() {
    setCurrentIndexToAdd(linkedList.size() - 1);
    setNextNumber(parseInt(input));

    await new Promise((resolve) => setTimeout(resolve, 500));

    linkedList.append(parseInt(input));
    setListItems([...linkedList.toArray()]);
    setCurrentIndexToAdd(undefined);
    setNextNumber(undefined);
    setJustAddedItemIndex(linkedList.size() - 1);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setJustAddedItemIndex(undefined);
  }

  async function handleDeleteFromHeadButton() {
    setCurrentIndexToDelete(0);

    await new Promise((resolve) => setTimeout(resolve, 500));

    linkedList.remove(0);
    setListItems([...linkedList.toArray()]);
    setCurrentIndexToDelete(undefined);
  }
  async function handleDeleteFromTailButton() {
    setCurrentIndexToDelete(linkedList.size() - 1);

    await new Promise((resolve) => setTimeout(resolve, 500));

    linkedList.remove(linkedList.size() - 1);
    setListItems([...linkedList.toArray()]);
    setCurrentIndexToDelete(undefined);
  }

  async function handleAddByIndexButton() {
    const indexesToAdd = [];

    setCurrentIndexToAdd(0);

    for (let i = 0; i < parseInt(index); i++) {
      setNextNumber(parseInt(input));

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (i !== parseInt(index) - 1) setCurrentIndexToAdd(i + 1);
      indexesToAdd.push(i);
      setCurrentIndexesToChange([...indexesToAdd, i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setCurrentIndexToAdd(undefined);
    setNextNumber(undefined);
    setCurrentIndexesToChange([]);

    linkedList.insert(parseInt(input), parseInt(index));
    setListItems([...linkedList.toArray()]);

    setJustAddedItemIndex(parseInt(index));

    await new Promise((resolve) => setTimeout(resolve, 500));

    setJustAddedItemIndex(undefined);
  }

  async function handleDeleteByIndexButton() {
    const indexesToDelete = [];

    for (let i = 0; i < parseInt(index) + 1; i++) {
      indexesToDelete.push(i);
      setCurrentIndexesToChange([...indexesToDelete, i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    indexesToDelete.pop();
    setCurrentIndexesToChange([...indexesToDelete]);
    setCurrentIndexToDelete(parseInt(index));

    await new Promise((resolve) => setTimeout(resolve, 500));

    setCurrentIndexesToChange([]);
    setCurrentIndexToDelete(undefined);

    linkedList.remove(parseInt(index));
    setListItems([...linkedList.toArray()]);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={list.header}>
        <form className={list.form}>
          <fieldset className={list.fieldset}>
            <input
              onChange={handleChange}
              value={input}
              type="text"
              name="value"
              className={list.input}
              placeholder="Введите значение"
              maxLength={4}
            />
            <button
              onClick={handleAddToHeadButton}
              type="button"
              className={list.button}
            >
              Добавить в head
            </button>
            <button
              onClick={handleAddToTailButton}
              type="button"
              className={list.button}
            >
              Добавить в tail
            </button>
            <button
              onClick={handleDeleteFromHeadButton}
              type="button"
              className={list.button}
            >
              Удалить из head
            </button>
            <button
              onClick={handleDeleteFromTailButton}
              type="button"
              className={list.button}
            >
              Удалить из tail
            </button>
          </fieldset>
          <label className={list.label}>Максимум — 4 символа</label>
          <fieldset className={list.fieldset}>
            <input
              onChange={handleChange}
              value={index}
              type="text"
              name="index"
              className={list.input}
              placeholder="Введите индекс"
              maxLength={4}
            />
            <button
              onClick={handleAddByIndexButton}
              type="button"
              className={list.button}
            >
              Добавить по индексу
            </button>
            <button
              onClick={handleDeleteByIndexButton}
              type="button"
              className={list.button}
            >
              Удалить по индексу
            </button>
          </fieldset>
        </form>
      </div>

      <section className={list.resultsSection}>
        <ul className={list.stack}>
          {listItems.map((number, index) => {
            return (
              <>
                <li className={list.stackItem} key={index}>
                  {currentIndexToAdd == index && (
                    <Circle
                      extraClass={list.smallStackItem}
                      letter={nextNumber?.toString()}
                      isChanging={true}
                      isSmall={true}
                    />
                  )}

                  <Circle
                    extraClass={list.bigStackItem}
                    letter={
                      currentIndexToDelete != index ? number?.toString() : ""
                    }
                    tail={
                      linkedList.getTailIndex() == index &&
                      currentIndexToDelete != index
                        ? TAIL
                        : null
                    }
                    head={
                      linkedList.getHeadIndex() == index &&
                      currentIndexToAdd != index
                        ? HEAD
                        : null
                    }
                    isSorted={justAddedItemIndex == index ? true : false}
                    isChanging={currentIndexesToChange?.includes(index)}
                    index={index}
                  />

                  {index !== listItems.length - 1 && (
                    <img className={list.arrow} src={arrow} />
                  )}

                  {currentIndexToDelete == index && (
                    <Circle
                      extraClass={list.smallStackItemBottom}
                      letter={number?.toString()}
                      isChanging={true}
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
