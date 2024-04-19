const SHORT_DELAY_IN_MS = 500;
const expected = [
  { id: 0, element: "3" },
  { id: 1, element: "0" },
  { id: 2, element: "34" },
  { id: 3, element: "8" },
  { id: 4, element: "1" },
];
const expectedAddToTail = [
  { id: 0, element: "0" },
  { id: 1, element: "34" },
  { id: 2, element: "8" },
  { id: 3, element: "1" },
  { id: 4, element: "3" },
];
const expectedAddByIndex = [
  { id: 0, element: "0" },
  { id: 1, element: "34" },
  { id: 2, element: "3" },
  { id: 3, element: "8" },
  { id: 4, element: "1" },
];

const expectedDeleteByIndex = [
  { id: 0, element: "0" },
  { id: 1, element: "34" },
  { id: 2, element: "1" },
];
const expectedDeleteFromTail = [
  { id: 0, element: "0" },
  { id: 1, element: "34" },
  { id: 2, element: "8" },
];
const expectedDeleteFromHead = [
  { id: 0, element: "34" },
  { id: 1, element: "8" },
  { id: 2, element: "1" },
];
const defaultList = [
  { id: 0, element: "0" },
  { id: 1, element: "34" },
  { id: 2, element: "8" },
  { id: 3, element: "1" },
];
const startString = "abc";
const elementToAdd = "3";

describe("Проверка корректности работы страницы Связный список", function () {
  before(function () {
    cy.visit("http://localhost:3000/list");
  });

  it("Проверка, что кнопка заблокирована", function () {
    // очищаем связный список
    for (let i = 0; i < 4; i++) {
      cy.get('button[class*="list-page_buttonDeleteFromTail__"]').click();
    }

    // инпуты ввода значения и индекса пусты
    cy.get("input[name='value']").should("be.empty");
    cy.get("input[name='index']").should("be.empty");

    // проверяем что кнопки удаления disabled
    cy.get('button[class*="list-page_buttonDeleteFromHead__"]').should(
      "be.disabled"
    );
    cy.get('button[class*="list-page_buttonDeleteFromTail__"]').should(
      "be.disabled"
    );
    cy.get('button[class*="list-page_buttonDeleteByIndex__"]').should(
      "be.disabled"
    );

    // проверяем что кнопки добавления disabled
    cy.get('button[class*="list-page_buttonAddToHead__"]').should(
      "be.disabled"
    );

    cy.get('button[class*="list-page_buttonAddToTail__"]').should(
      "be.disabled"
    );

    cy.get('button[class*="list-page_buttonAddByIndex__"]').should(
      "be.disabled"
    );
  });

  it("Корректность отрисовки дефолтного списка", () => {
    cy.visit("http://localhost:3000/list");

    // Проверка количества элементов
    cy.get("[data-testid=circle]").should("have.length", defaultList.length);

    for (let j = 0; j < defaultList.length; j++) {
      // Проверка текста элемента
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(j)
        .contains(defaultList[j].element);

      // Проверка текста tail
      if (j === defaultList.length - 1) {
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
      cy.get('p[class*="circle_index__"]').eq(j).contains(defaultList[j].id);

      // Проверка цвета border

      cy.get("[data-testid=circle]")
        .eq(j)
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }
  });

  it("Проверяет добавление элемента в head", () => {
    cy.visit("http://localhost:3000/list");

    // добавляем элемент в head
    cy.get("input[name='value']").type(elementToAdd);
    cy.get('button[class*="list-page_buttonAddToHead__"]').click();

    // проверяем что появился круг и пропал head над первым элементом
    cy.get('div[class*="list-page_smallStackItem"]')
      .should("have.length", 1)
      .contains(elementToAdd);

    cy.get('div[class*="circle_head__"]').eq(0).should("not.contain", "head");
    // проверяем, что после добавления круг стал зеленым, а затем синим
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    // Проверка количества элементов
    cy.get("[data-testid=circle]").should("have.length", expected.length);

    // проверка корректности отображаемых данных
    for (let j = 0; j < expected.length; j++) {
      // Проверка текста элемента
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(j)
        .contains(expected[j].element);

      // Проверка текста tail
      if (j === expected.length - 1) {
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
      cy.get('p[class*="circle_index__"]').eq(j).contains(expected[j].id);

      // Проверка цвета border

      cy.get("[data-testid=circle]")
        .eq(j)
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }
  });

  it("Проверяет добавление элемента в tail", () => {
    cy.visit("http://localhost:3000/list");

    // добавляем элемент в head
    cy.get("input[name='value']").type(elementToAdd);
    cy.get('button[class*="list-page_buttonAddToTail__"]').click();

    // проверяем что появился круг
    cy.get('div[class*="list-page_smallStackItem"]')
      .should("have.length", 1)
      .contains(elementToAdd);

    // проверяем, что после добавления круг стал зеленым, а затем синим
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[data-testid=circle]")
      .eq(expectedAddToTail.length - 1)
      .should("have.css", "border-color", "rgb(127, 224, 81)");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[data-testid=circle]")
      .eq(expectedAddToTail.length - 1)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    // Проверка количества элементов
    cy.get("[data-testid=circle]").should(
      "have.length",
      expectedAddToTail.length
    );

    // проверка корректности отображаемых данных
    for (let j = 0; j < expectedAddToTail.length; j++) {
      // Проверка текста элемента
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(j)
        .contains(expectedAddToTail[j].element);

      // Проверка текста tail
      if (j === expectedAddToTail.length - 1) {
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
      cy.get('p[class*="circle_index__"]')
        .eq(j)
        .contains(expectedAddToTail[j].id);

      // Проверка цвета border

      cy.get("[data-testid=circle]")
        .eq(j)
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }
  });

  it("Проверяет добавление элемента по индексу", () => {
    cy.visit("http://localhost:3000/list");

    // добавляем элемент в head
    cy.get("input[name='value']").type(elementToAdd);
    cy.get("input[name='index']").type(2);
    cy.get('button[class*="list-page_buttonAddByIndex__"]').click();

    for (let i = 0; i < 2; i++) {
      // проверка что на странице только один маленький круг и содержит верный (добавляемый) элемент
      cy.get('div[class*="list-page_smallStackItem"]')
        .should("have.length", 1)
        .contains(elementToAdd);

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[data-testid=circle]")
        .eq(i)
        .then(($circle) => {
          // Здесь можно проверить данные на элементе $circle
          expect($circle).to.have.css("border-color", "rgb(210, 82, 225)");
        });
    }

    cy.get("[data-testid=circle]")
      .eq(2)
      .should("have.css", "border-color", "rgb(127, 224, 81)");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[data-testid=circle]")
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    // проверка корректности отображаемых данных
    for (let j = 0; j < expectedAddByIndex.length; j++) {
      // Проверка текста элемента
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(j)
        .contains(expectedAddByIndex[j].element);

      // Проверка текста tail
      if (j === expectedAddByIndex.length - 1) {
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
      cy.get('p[class*="circle_index__"]')
        .eq(j)
        .contains(expectedAddByIndex[j].id);

      // Проверка цвета border
      cy.get("[data-testid=circle]")
        .eq(j)
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }
  });

  it("Проверяет правильность удаления элемента из tail", () => {
    cy.visit("http://localhost:3000/list");

    // нажимаем кнопку удаления
    cy.get('button[class*="list-page_buttonDeleteFromTail__"]').click();

    // проверяем что появился маленький круг и что первый круг пуст
    cy.get('div[class*="list-page_smallStackItem"]')
      .should("have.length", 1)
      .contains(defaultList[defaultList.length - 1].element);

    cy.get("[data-testid=circle]")
      .eq(defaultList.length - 1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .should("exist")
      .should("not.have.text");

    cy.wait(SHORT_DELAY_IN_MS);
    // Проверка количества элементов
    cy.get("[data-testid=circle]").should(
      "have.length",
      expectedDeleteFromTail.length
    );

    // проверка корректности отображаемых данных
    for (let j = 0; j < expectedDeleteFromHead.length; j++) {
      // Проверка текста элемента
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(j)
        .contains(expectedDeleteFromTail[j].element);

      // Проверка текста tail
      if (j === expectedDeleteFromTail.length - 1) {
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
      cy.get('p[class*="circle_index__"]')
        .eq(j)
        .contains(expectedDeleteFromTail[j].id);

      // Проверка цвета border

      cy.get("[data-testid=circle]")
        .eq(j)
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }
  });

  it("Проверяет правильность удаления элемента из head", () => {
    cy.visit("http://localhost:3000/list");

    // нажимаем кнопку удаления
    cy.get('button[class*="list-page_buttonDeleteFromHead__"]').click();

    // проверяем что появился маленький круг и что первый круг пуст
    cy.get('div[class*="list-page_smallStackItem"]')
      .should("have.length", 1)
      .contains(defaultList[0].element);

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .should("exist")
      .should("not.have.text");

    cy.wait(SHORT_DELAY_IN_MS);
    // Проверка количества элементов
    cy.get("[data-testid=circle]").should(
      "have.length",
      expectedDeleteFromHead.length
    );

    // проверка корректности отображаемых данных
    for (let j = 0; j < expectedDeleteFromHead.length; j++) {
      // Проверка текста элемента
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(j)
        .contains(expectedDeleteFromHead[j].element);

      // Проверка текста tail
      if (j === expectedDeleteFromHead.length - 1) {
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
      cy.get('p[class*="circle_index__"]')
        .eq(j)
        .contains(expectedDeleteFromHead[j].id);

      // Проверка цвета border

      cy.get("[data-testid=circle]")
        .eq(j)
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }
  });

  it("Проверяет удаления элемента по индексу", () => {
    cy.visit("http://localhost:3000/list");

    // удаляем элемент
    cy.get("input[name='index']").type(2);
    cy.get('button[class*="list-page_buttonDeleteByIndex__"]').click();
    // cy.pause();

    for (let i = 0; i < 3; i++) {
      cy.get("[data-testid=circle]")
        .eq(i)
        .then(($circle) => {
          // Здесь можно проверить данные на элементе $circle
          expect($circle).to.have.css("border-color", "rgb(210, 82, 225)");
        });

      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(i)
        .contains(defaultList[i].element);

      cy.wait(SHORT_DELAY_IN_MS);
    }

    // проверяем что появился круг
    cy.get('div[class*="list-page_smallStackItem"]')
      .should("have.length", 1)
      .contains(defaultList[2].element);

    // проверка корректности отображаемых данных
    for (let j = 0; j < expectedDeleteByIndex.length; j++) {
      // Проверка текста элемента
      cy.get('p[class*="text_type_circle text_color_input circle_letter__"]')
        .eq(j)
        .contains(expectedDeleteByIndex[j].element);

      // Проверка текста tail
      if (j === expectedDeleteByIndex.length - 1) {
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
      cy.get('p[class*="circle_index__"]')
        .eq(j)
        .contains(expectedDeleteByIndex[j].id);

      // Проверка цвета border
      cy.get("[data-testid=circle]")
        .eq(j)
        .should("have.css", "border-color", "rgb(0, 50, 255)");
    }
  });
});
