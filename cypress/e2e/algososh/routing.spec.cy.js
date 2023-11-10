describe("Корректная работа переходов по страницам", function () {
  it("Доступность страницы Строка", function () {
    cy.visit(`http://localhost:3000/recursion`);
  });

  it("Доступность страницы Последовательность Фибоначчи", function () {
    cy.visit(`http://localhost:3000/fibonacci`);
  });

  it("Доступность страницы Сортировка массива", function () {
    cy.visit(`http://localhost:3000/sorting`);
  });

  it("Доступность страницы Стек", function () {
    cy.visit(`http://localhost:3000/stack`);
  });

  it("Доступность страницы Очередь", function () {
    cy.visit(`http://localhost:3000/queue`);
  });

  it("Доступность страницы Связный список", function () {
    cy.visit(`http://localhost:3000/list`);
  });
});
