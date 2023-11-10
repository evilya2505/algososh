const DELAY_IN_MS = 1000;
const expectedString = "dcba";
const startString = "abcd";

describe("Проверка корректности работы страницы с рекурсией", function () {
  before(function () {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Проверка, что кнопка заблокирована", function () {
    cy.get("input").should("be.empty");
    cy.get("button[type='submit']").should("be.disabled");
  });

  it("Проверяет, что строка разворачивается корректно", () => {
    cy.visit("http://localhost:3000/recursion");

    cy.get("input").type(startString);
    cy.get("button[type='submit']").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.wait(DELAY_IN_MS * startString.length);

    cy.get("[data-testid=circle_li]").should("have.length", 4);
    cy.get(
      'p[class*="text_type_circle text_color_input circle_letter__"]'
    ).each(($circle, index) => {
      cy.get($circle).contains(expectedString[index]);
    });
  });

  it("Проверяет, что анимация работает корректно", () => {
    cy.visit("http://localhost:3000/recursion");

    cy.get('input[placeholder="Введите текст"]').type(startString);
    cy.get("button[type='submit']").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    // проверка изначального состояния

    cy.get("[data-testid=circle]")
      .should("have.length", 4)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get(
      'p[class*="text_type_circle text_color_input circle_letter__"]'
    ).each(($circle, index) => {
      cy.get($circle).contains(startString[index]);
    });

    cy.wait(DELAY_IN_MS);

    // проверка состояния после первого цикла

    const firstCycleColorsArray = [
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
    ];

    const firstCycleLetters = "abcd";

    cy.get("[data-testid=circle]").each(($circle, index) => {
      const expectedColor = firstCycleColorsArray[index];
      cy.get($circle).should("have.css", "border-color", expectedColor);
    });

    cy.get(
      'p[class*="text_type_circle text_color_input circle_letter__"]'
    ).each(($circle, index) => {
      cy.get($circle).contains(firstCycleLetters[index]);
    });

    cy.wait(DELAY_IN_MS);

    // проверка состояния после второго цикла

    const secondCycleColorsArray = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];

    const secondCycleLetters = "dbca";

    cy.get("[data-testid=circle]").each(($circle, index) => {
      const expectedColor = secondCycleColorsArray[index];
      cy.get($circle).should("have.css", "border-color", expectedColor);
    });
    cy.get(
      'p[class*="text_type_circle text_color_input circle_letter__"]'
    ).each(($circle, index) => {
      cy.get($circle).contains(secondCycleLetters[index]);
    });
    cy.wait(DELAY_IN_MS);

    // проверка состояния после третьего цикла

    const thirdCycleColorsArray = [
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
    ];
    const thirdCycleLetters = "dcba";

    cy.get("[data-testid=circle]").each(($circle, index) => {
      const expectedColor = thirdCycleColorsArray[index];
      cy.get($circle).should("have.css", "border-color", expectedColor);
    });
    cy.get(
      'p[class*="text_type_circle text_color_input circle_letter__"]'
    ).each(($circle, index) => {
      cy.get($circle).contains(thirdCycleLetters[index]);
    });
  });
});
