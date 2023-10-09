import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stack from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import Stack from "./stack";

const stackVar = new Stack<number>();

export const StackPage: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [stackItems, setStackItems] = React.useState<number[]>(
    stackVar.getStack()
  );
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function handleAddButton() {
    stackVar.push(parseInt(input));
    setCurrentIndex(stackVar.getSize() - 1);
    setStackItems([...stackVar.getStack()]);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setCurrentIndex(null);
  }

  async function handleDeleteButton() {
    setCurrentIndex(stackVar.getSize() - 1);

    await new Promise((resolve) => setTimeout(resolve, 500));

    stackVar.pop();
    setStackItems([...stackVar.getStack()]);
    setCurrentIndex(null);
  }

  async function handleClearButton() {
    stackVar.clear();

    await new Promise((resolve) => setTimeout(resolve, 500));

    setStackItems([...stackVar.getStack()]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={stack.header}>
        <div className={stack.leftSection}>
          <form className={stack.form}>
            <fieldset className={stack.fieldset}>
              <input
                onChange={handleChange}
                value={input}
                type="text"
                name="string"
                className={stack.input}
                placeholder="Введите текст"
                maxLength={4}
              />
              <button
                onClick={handleAddButton}
                type="button"
                className={stack.button}
              >
                Добавить
              </button>
            </fieldset>
            <label className={stack.label}>Максимум — 4 символа</label>
          </form>

          <button
            onClick={handleDeleteButton}
            type="button"
            className={stack.button}
          >
            Удалить
          </button>
        </div>
        <button
          onClick={handleClearButton}
          type="button"
          className={stack.button}
        >
          Очистить
        </button>
      </div>

      <section className={stack.resultsSection}>
        <ul className={stack.stack}>
          {stackItems.map((number, index) => {
            return (
              <li className={stack.stackItem} key={index}>
                <p className={stack.index}>
                  {index == stackVar.getSize() - 1 ? "top" : ""}
                </p>
                <Circle
                  letter={number.toString()}
                  isChanging={currentIndex == index ? true : false}
                />
                <p className={stack.index}>{index}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
