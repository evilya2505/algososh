import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queue from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import Queue from "./queue";
import { TAIL, HEAD } from "../../constants/element-captions";
const queueVar = new Queue<number>(7);

export const QueuePage: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [queueItems, setQueueItems] = React.useState<Array<number | undefined>>(
    queueVar.getQueue()
  );
  const [currentIndex, setCurrentIndex] = React.useState<number | undefined>(
    undefined
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function handleAddButton() {
    queueVar.enqueue(parseInt(input));
    setCurrentIndex(queueVar.tailIndex());
    setQueueItems([...queueVar.getQueue()]);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setCurrentIndex(undefined);
  }

  async function handleDeleteButton() {
    setCurrentIndex(queueVar.peekIndex());

    await new Promise((resolve) => setTimeout(resolve, 500));

    queueVar.dequeue();
    setQueueItems([...queueVar.getQueue()]);
    setCurrentIndex(undefined);
  }

  async function handleClearButton() {
    await new Promise((resolve) => setTimeout(resolve, 500));

    queueVar.clear();
    setQueueItems([...queueVar.getQueue()]);
  }
  return (
    <SolutionLayout title="Очередь">
      <div className={queue.header}>
        <div className={queue.leftSection}>
          <form className={queue.form}>
            <fieldset className={queue.fieldset}>
              <input
                onChange={handleChange}
                value={input}
                type="text"
                name="string"
                className={queue.input}
                placeholder="Введите значение"
                maxLength={4}
              />
              <button
                onClick={handleAddButton}
                type="button"
                className={queue.button}
              >
                Добавить
              </button>
            </fieldset>
            <label className={queue.label}>Максимум — 4 символа</label>
          </form>

          <button
            onClick={handleDeleteButton}
            type="button"
            className={queue.button}
          >
            Удалить
          </button>
        </div>
        <button
          onClick={handleClearButton}
          type="button"
          className={queue.button}
        >
          Очистить
        </button>
      </div>

      <section className={queue.resultsSection}>
        <ul className={queue.stack}>
          {queueItems.map((number, index) => {
            console.log(queueVar.tailIndex(), queueVar.peekIndex());
            try {
              return (
                <li className={queue.stackItem} key={index}>
                  <Circle
                    letter={number?.toString()}
                    isChanging={currentIndex == index ? true : false}
                    tail={queueVar.tailIndex() == index ? TAIL : null}
                    head={queueVar.peekIndex() == index ? HEAD : null}
                    index={index}
                  />
                </li>
              );
            } catch {
              return (
                <li className={queue.stackItem} key={index}>
                  <Circle letter="" />
                  <p className={queue.index}>{index}</p>
                </li>
              );
            }
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
