export default class Stack<T> {
  private items: T[] = [];

  // Добавляет элемент на вершину стека
  push(item: T): void {
    this.items.push(item);
  }

  // Удаляет и возвращает элемент с вершины стека
  pop(): T | undefined {
    return this.items.pop();
  }

  // Возвращает элемент с вершины стека без удаления
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // Проверяет, пуст ли стек
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Возвращает размер стека
  getSize(): number {
    return this.items.length;
  }

  // Очищает стек
  clear(): void {
    this.items = [];
  }

  getStack(): T[] {
    return this.items;
  }
}
