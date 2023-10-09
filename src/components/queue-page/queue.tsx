export default class Queue<T> {
  private size: number = 0;
  private items: Array<T | undefined> = [];

  constructor(size: number) {
    this.size = size;
    this.items = Array(this.size);
  }

  // Добавляет элемент в конец очереди
  enqueue(item: T): void {
    for (let i = 0; i < this.getSize(); i++) {
      if (this.items[i] == undefined) {
        this.items[i] = item;

        break;
      }
    }
  }

  // Удаляет и возвращает элемент из начала очереди
  dequeue(): T | undefined {
    let result = undefined;

    for (let i = 0; i < this.getSize(); i++) {
      if (this.items[i] !== undefined) {
        result = this.items[i];
        this.items[i] = undefined;
        break;
      }
    }

    return result;
  }

  // Возвращает элемент из начала очереди без удаления
  peekIndex(): number | undefined {
    let result = undefined;
    for (let i = 0; i < this.getSize(); i++) {
      if (this.items[i] !== undefined) {
        result = i;
        break;
      }
    }
    return result;
  }

  tailIndex(): number | undefined {
    let result = undefined;
    for (let i = 0; i < this.getSize(); i++) {
      if (this.items[i] !== undefined) {
        result = i;
      }
    }
    return result;
  }

  // Возвращает размер очереди
  getSize(): number {
    return this.items.length;
  }

  // Очищает очередь
  clear(): void {
    for (let i = 0; i < this.getSize(); i++) this.items[i] = undefined;
  }

  // Возвращает массив элементов очереди
  getQueue(): Array<T | undefined> {
    return this.items;
  }
}
