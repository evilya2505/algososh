const SHORT_DELAY_IN_MS = 500;
const expected = [
  [
    { id: 0, element: "a" },
    { id: 1, element: "" },
    { id: 2, element: "" },
  ],
  [
    { id: 0, element: "a" },
    { id: 1, element: "b" },
    { id: 2, element: "" },
  ],
  [
    { id: 0, element: "a" },
    { id: 1, element: "b" },
    { id: 2, element: "c" },
  ],
];

const startString = "abc";

describe("Проверка корректности работы страницы очереди", function () {
  before(function () {
    cy.visit("http://localhost:3000/queue");
  });

  it("Проверка, что кнопка заблокирована", function () {
    cy.get("input").should("be.empty");
    cy.get("button[type='submit']").should("be.disabled");
  });

  it("Проверяет, что анимация при добавлении элементов в очередь работает верно", () => {
    cy.visit("http://localhost:3000/queue");

    for (let i = 0; i < startString.length; i++) {
      cy.get("input").type(startString[i]);
      cy.get("button[type='submit']").click();

      for (let j = 0; j <= i; j++) {
        // Проверка текста элемента
        cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
          .eq(j)
          .contains(expected[i][j].element);

        // Проверка текста tail
        if (j === i) {
          cy.get('div[class*="circle_tail60__"]').eq(j).contains("tail");
        } else {
          cy.get('div[class*="circle_tail60__"]')
            .eq(j)
            .should("not.contain", "tail");
        }

        // Проверка текста head
        if (j === 0) {
          cy.get('div[class*="circle_head__"]').eq(j).contains("head");
        } else {
          cy.get('div[class*="circle_head__"]')
            .eq(j)
            .should("not.contain", "head");
        }

        // Проверка индекса элемента
        cy.get('p[class*="circle_index__"]').eq(j).contains(expected[i][j].id);

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

  it("Проверяет, правильности удаления элемента из очереди", () => {
    cy.visit("http://localhost:3000/queue");

    // заполнение очереди
    for (let i = 0; i < startString.length; i++) {
      cy.get("input").type(startString[i]);
      cy.get("button[type='submit']").click();
    }

    // нажимаем кнопку удаления
    cy.get('button[class*="queue-page_buttonDelete__"]').click();

    // проверяем что border первого (удаляемого) элемента поменял цвет
    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
      .eq(0)
      .should("exist")
      .should("not.have.text");

    // проверяем целостность остальных данных
    for (let j = 1; j < startString.length; j++) {
      // Проверка текста элемента
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(j)
        .contains(expected[2][j].element);

      // Проверка текста tail
      if (j === startString.length - 1) {
        cy.get('div[class*="circle_tail60__"]').eq(j).contains("tail");
      } else {
        cy.get('div[class*="circle_tail60__"]')
          .eq(j)
          .should("not.contain", "tail");
      }

      // Проверка текста head
      if (j === 1) {
        cy.get('div[class*="circle_head__"]').eq(j).contains("head");
      } else {
        cy.get('div[class*="circle_head__"]')
          .eq(j)
          .should("not.contain", "head");
      }
      // Проверка индекса элемента
      cy.get('p[class*="circle_index__"]').eq(j).contains(expected[2][j].id);

      // Проверка цвета border
      cy.get("[data-testid=circle]")
        .eq(j)
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }
  });

  it("Проверка поведения кнопки Очистить", function () {
    cy.visit("http://localhost:3000/queue");

    // заполнение очереди
    for (let i = 0; i < startString.length; i++) {
      cy.get("input").type(startString[i]);
      cy.get("button[type='submit']").click();
    }

    // нажимаем кнопку очищения
    cy.get('button[class*="queue-page_buttonClear__"]').click();

    cy.wait(SHORT_DELAY_IN_MS);

    // проверка, что элементов нет
    for (let i = 0; i < startString.length; i++) {
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(i)
        .should("exist")
        .should("not.have.text");
    }
  });
});
