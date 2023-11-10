const SHORT_DELAY_IN_MS = 500;
const expected = [
  { id: 0, number: 1 },
  { id: 1, number: 1 },
  { id: 2, number: 2 },
  { id: 3, number: 3 },
];
const startString = "3";

describe("Проверка корректности работы страницы с последовательностью Фибоначчи", function () {
  before(function () {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("Проверка, что кнопка заблокирована", function () {
    cy.get("input").should("be.empty");
    cy.get("button[type='submit']").should("be.disabled");
  });

  it("Проверяет, что числа генерируются верно", () => {
    cy.visit("http://localhost:3000/fibonacci");

    cy.get("input").type(startString);
    cy.get("button[type='submit']").should("not.be.disabled");
    cy.get("button[type='submit']").click();
    cy.wait(SHORT_DELAY_IN_MS);

    // проверка после добавления первого элемента
    cy.get("[data-testid=circle_li]").should("have.length", 1);
    cy.get(
      'p[class*="text_type_circle text_color_input circle_letter__"]'
    ).each(($letter, index) => {
      cy.get($letter).contains(expected[index].number);
    });

    cy.get('p[class*="circle_index__"]').each(($index, index) => {
      cy.get($index).contains(expected[index].id);
    });

    cy.get("[data-testid=circle]").each(($circle, index) => {
      cy.get($circle).should("have.css", "border-color", "rgb(0, 50, 255)");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    // проверка после добавления второго элемента

    cy.get("[data-testid=circle_li]").should("have.length", 2);
    cy.get(
      'p[class*="text_type_circle text_color_input circle_letter__"]'
    ).each(($letter, index) => {
      cy.get($letter).contains(expected[index].number);
    });

    cy.get('p[class*="circle_index__"]').each(($index, index) => {
      cy.get($index).contains(expected[index].id);
    });

    cy.get("[data-testid=circle]").each(($circle, index) => {
      cy.get($circle).should("have.css", "border-color", "rgb(0, 50, 255)");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    // проверка после добавления третьего элемента

    cy.get("[data-testid=circle_li]").should("have.length", 3);
    cy.get(
      'p[class*="text_type_circle text_color_input circle_letter__"]'
    ).each(($letter, index) => {
      cy.get($letter).contains(expected[index].number);
    });

    cy.get('p[class*="circle_index__"]').each(($index, index) => {
      cy.get($index).contains(expected[index].id);
    });

    cy.get("[data-testid=circle]").each(($circle, index) => {
      cy.get($circle).should("have.css", "border-color", "rgb(0, 50, 255)");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    // проверка после добавления четвертого элемента

    cy.get("[data-testid=circle_li]").should("have.length", 4);
    cy.get(
      'p[class*="text_type_circle text_color_input circle_letter__"]'
    ).each(($letter, index) => {
      cy.get($letter).contains(expected[index].number);
    });

    cy.get('p[class*="circle_index__"]').each(($index, index) => {
      cy.get($index).contains(expected[index].id);
    });

    cy.get("[data-testid=circle]").each(($circle, index) => {
      cy.get($circle).should("have.css", "border-color", "rgb(0, 50, 255)");
    });
  });
});
