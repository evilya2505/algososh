import { bubbleSortTest, selectionSortTest } from "./sorting-page";

const arrayForSelectionSortTestOne = [
  { number: 1, id: 0, isChanging: false, isSorted: false },
];
const arrayForSelectionSortTestTwo = [
  { number: 5, id: 0, isChanging: false, isSorted: false },
  { number: 3, id: 1, isChanging: false, isSorted: false },
  { number: 2, id: 2, isChanging: false, isSorted: false },
  { number: 6, id: 3, isChanging: false, isSorted: false },
];

describe("Сортировка", () => {
  it("Сортировка пузырьком пустого массива", async () => {
    const res = await bubbleSortTest([], false);
    expect(res).toStrictEqual([]);
  });

  it("Сортировка пузырьком массива из одного элемента", async () => {
    const res = await bubbleSortTest([1], false);
    expect(res).toStrictEqual([1]);
  });

  it("Сортировка пузырьком массива из нескольких элементов", async () => {
    const res = await bubbleSortTest([5, 3, 2, 6], false);
    expect(res).toStrictEqual([2, 3, 5, 6]);
  });

  it("Сортировка выбором пустого массива", async () => {
    const res = await selectionSortTest([], false);
    expect(res).toStrictEqual([]);
  });

  it("Сортировка выбором массива из одного элемента", async () => {
    const res = await selectionSortTest(arrayForSelectionSortTestOne, false);
    expect(res).toStrictEqual(
      arrayForSelectionSortTestOne.slice().sort((a, b) => a.number - b.number)
    );
  });

  it("Сортировка выбором массива из нескольких элементов", async () => {
    const res = await selectionSortTest(arrayForSelectionSortTestTwo, false);
    expect(res).toStrictEqual(
      arrayForSelectionSortTestTwo.slice().sort((a, b) => a.number - b.number)
    );
  });
});
