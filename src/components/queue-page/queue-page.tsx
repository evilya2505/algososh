import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queue from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import Queue from "./queue";
import { TAIL, HEAD } from "../../constants/element-captions";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

const queueVar = new Queue<number>(7);

export const QueuePage: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [queueItems, setQueueItems] = React.useState<Array<number | undefined>>(
    queueVar.getQueue()
  );
  const [currentIndex, setCurrentIndex] = React.useState<number | undefined>(
    undefined
  );
  const [isAddingElement, setIsAddingElement] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isDeletingElement, setIsDeletingElement] =
    React.useState<boolean>(false);
  const [isClearing, setIsClearing] = React.useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function handleAddButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsAddingElement(true);
    setIsLoading(true);
    queueVar.enqueue(parseInt(input));
    setCurrentIndex(queueVar.tailIndex());
    setQueueItems([...queueVar.getQueue()]);

    await delay();

    setCurrentIndex(undefined);
    setIsAddingElement(false);
    setIsLoading(false);
  }

  async function handleDeleteButton() {
    setIsDeletingElement(true);
    setIsLoading(true);
    setCurrentIndex(queueVar.peekIndex());

    await delay();

    queueVar.dequeue();
    setQueueItems([...queueVar.getQueue()]);
    setCurrentIndex(undefined);
    setIsDeletingElement(false);
    setIsLoading(false);
  }

  async function handleClearButton() {
    setIsClearing(true);
    setIsLoading(true);
    await delay();

    queueVar.clear();
    setQueueItems([...queueVar.getQueue()]);
    setIsClearing(false);
    setIsLoading(false);
  }

  async function delay() {
    return new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
  }
  return (
    <SolutionLayout title="Очередь">
      <div className={queue.header}>
        <form className={queue.form} onSubmit={handleAddButton}>
          <fieldset className={queue.fieldset}>
            <Input
              extraClass={queue.input}
              placeholder="Введите значение"
              type="text"
              isLimitText={true}
              maxLength={4}
              onChange={handleChange}
              value={input}
            />
            <Button
              extraClass={queue.button}
              text="Добавить"
              type="submit"
              isLoader={isAddingElement}
              disabled={
                isLoading || queueItems[queueItems.length - 1] !== undefined
              }
            />
          </fieldset>
          <Button
            extraClass={queue.button}
            onClick={handleDeleteButton}
            text="Удалить"
            type="button"
            isLoader={isDeletingElement}
            disabled={isLoading}
          />
          <Button
            extraClass={queue.button}
            onClick={handleClearButton}
            text="Очистить"
            type="button"
            isLoader={isClearing}
            disabled={isLoading}
          />
        </form>
      </div>

      <section className={queue.resultsSection}>
        <ul className={queue.queue}>
          {queueItems.map((number, index) => {
            let state: ElementStates = ElementStates.Default;
            if (currentIndex === index ? true : false)
              state = ElementStates.Changing;
            try {
              return (
                <li className={queue.queueItem} key={index}>
                  <Circle
                    letter={number?.toString()}
                    state={state}
                    tail={queueVar.tailIndex() === index ? TAIL : null}
                    head={queueVar.peekIndex() === index ? HEAD : null}
                    index={index}
                  />
                </li>
              );
            } catch {
              return (
                <li className={queue.queueItem} key={index}>
                  <Circle letter="" index={index} />
                </li>
              );
            }
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
