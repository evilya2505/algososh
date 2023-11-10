describe("Проверка работоспособности приложения", function () {
  it("Приложение успешно поднимается", function () {
    cy.visit("http://localhost:3000");
  });
});
