const SHORT_DELAY_IN_MS = 500;
const expected = [
  { id: 0, element: "a" },
  { id: 1, element: "b" },
  { id: 2, element: "c" },
];
const startString = "abc";

describe("Проверка корректности работы страницы стека", function () {
  before(function () {
    cy.visit("http://localhost:3000/stack");
  });

  it("Проверка, что кнопка заблокирована", function () {
    cy.get("input").should("be.empty");
    cy.get("button[type='submit']").should("be.disabled");
  });

  it("Проверяет, что анимация при добавлении элементов в стек работает верно", () => {
    cy.visit("http://localhost:3000/stack");

    for (let i = 0; i < startString.length; i++) {
      cy.get("input").type(startString[i]);
      cy.get("button[type='submit']").click();

      for (let j = 0; j <= i; j++) {
        // Проверка количества элементов
        cy.get("[data-testid=circle_li]").should("have.length", i + 1);

        // Проверка текста элемента
        cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
          .eq(j)
          .contains(expected[j].element);

        // Проверка текста top
        if (j === i) {
          cy.get('p[class*="stack-page_index__"]').eq(j).contains("top");
        } else {
          cy.get('p[class*="stack-page_index__"]')
            .eq(j)
            .should("not.contain", "top");
        }

        // Проверка индекса элемента
        cy.get('p[class*="circle_index__"]').eq(j).contains(expected[j].id);

        // Проверка цвета border
        if (j === i) {
          cy.get("[data-testid=circle]")
            .eq(j)
            .should("have.css", "border-color", "rgb(210, 82, 225)");

          cy.wait(SHORT_DELAY_IN_MS);

          cy.get("[data-testid=circle]")
            .eq(j)
            .should("have.css", "border-color", "rgb(0, 50, 255)");
        } else {
          cy.get("[data-testid=circle]")
            .eq(j)
            .should("have.css", "border-color", "rgb(0, 50, 255)");
        }
      }
    }
  });

  it("Проверяет, правильности удаления элемента из стека", () => {
    cy.visit("http://localhost:3000/stack");

    // заполнение стека
    for (let i = 0; i < startString.length; i++) {
      cy.get("input").type(startString[i]);
      cy.get("button[type='submit']").click();
    }

    // нажимаем кнопку удаления
    cy.get('button[class*="stack-page_buttonDelete__"]').click();

    // проверяем что border последнего (удаляемого) элемента поменял цвет
    cy.get("[data-testid=circle]")
      .eq(startString.length - 1)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.wait(SHORT_DELAY_IN_MS);

    // проверяем что количество элементов уменьшилось на 1
    cy.get("[data-testid=circle_li]").should(
      "have.length",
      startString.length - 1
    );

    // проверяем целостность остальных данных
    for (let j = 0; j < startString.length - 1; j++) {
      // Проверка текста элемента
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(j)
        .contains(expected[j].element);

      // Проверка текста top
      if (j === startString.length - 2) {
        cy.get('p[class*="stack-page_index__"]').eq(j).contains("top");
      } else {
        cy.get('p[class*="stack-page_index__"]')
          .eq(j)
          .should("not.contain", "top");
      }

      // Проверка индекса элемента
      cy.get('p[class*="circle_index__"]').eq(j).contains(expected[j].id);

      // Проверка цвета border
      cy.get("[data-testid=circle]")
        .eq(j)
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }
  });

  it("Проверка поведения кнопки Очистить", function () {
    cy.visit("http://localhost:3000/stack");

    // заполнение стека
    for (let i = 0; i < startString.length; i++) {
      cy.get("input").type(startString[i]);
      cy.get("button[type='submit']").click();
    }

    // нажимаем кнопку очищения
    cy.get('button[class*="stack-page_buttonClear__"]').click();

    cy.wait(SHORT_DELAY_IN_MS);

    // проверка, что элементов нет
    cy.get("[data-testid=circle_li]").should("have.length", 0);
  });
});
