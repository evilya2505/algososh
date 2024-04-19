class ListNode<T> {
  data: T;
  next: ListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export default class LinkedList<T> {
  private head: ListNode<T> | null = null;

  // Добавляет элемент в конец списка
  append(data: T): void {
    const newNode = new ListNode(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
  }

  // Добавляет элемент в начало списка
  prepend(data: T): void {
    const newNode = new ListNode(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Вставляет элемент в указанную позицию
  insert(data: T, index: number): void {
    if (index < 0) {
      throw new Error("Индекс должен быть неотрицательным");
    }

    const newNode = new ListNode(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    let currentIndex = 0;

    while (current && currentIndex < index - 1) {
      current = current.next;
      currentIndex++;
    }

    if (!current) {
      throw new Error("Индекс находится за пределами списка");
    }

    newNode.next = current.next;
    current.next = newNode;
  }

  // Удаляет элемент из указанной позиции
  remove(index: number): void {
    if (index < 0) {
      throw new Error("Индекс должен быть неотрицательным");
    }

    if (index === 0) {
      if (this.head) {
        this.head = this.head.next;
        return;
      } else {
        throw new Error("Список пуст");
      }
    }

    let current = this.head;
    let currentIndex = 0;

    while (current && currentIndex < index - 1) {
      current = current.next;
      currentIndex++;
    }

    if (!current || !current.next) {
      throw new Error("Индекс находится за пределами списка");
    }

    current.next = current.next.next;
  }

  // Возвращает размер списка
  size(): number {
    let current = this.head;
    let count = 0;

    while (current) {
      count++;
      current = current.next;
    }

    return count;
  }

  getList(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  // Возвращает индекс последнего элемента
  getTailIndex(): number | null {
    let current = this.head;
    let currentIndex = 0;
    let tailIndex: number | null = null;

    while (current) {
      tailIndex = currentIndex;
      current = current.next;
      currentIndex++;
    }

    return tailIndex;
  }

  // Возвращает индекс первого элемента
  getHeadIndex(): number | null {
    if (this.head === null) {
      return null;
    }
    return 0;
  }

  // Очищает список
  clear(): void {
    this.head = null;
  }
}
