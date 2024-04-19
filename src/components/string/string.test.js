import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StringComponent } from "./string";
import { DELAY_IN_MS } from "../../constants/delays";

// jest.setTimeout(20000);

describe("Тестирование компонента StringComponent", () => {
  it("Корректно разворачивает строку с четным количеством символов", async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Введите текст");
    const reverseButton = screen.getByText("Развернуть");

    fireEvent.change(input, { target: { value: "abcd" } });
    fireEvent.click(reverseButton);

    // Ожидаем, что строка развернется и отобразится правильно
    await waitFor(
      () => {
        const circles = screen.queryAllByTestId("circle_li");
        const letters = circles.map((circle) => circle.textContent);

        expect(letters.join("")).toBe("dcba");
      },
      { timeout: DELAY_IN_MS * "abcd".length }
    );
  });

  it("Корректно разворачивает строку с нечетным количеством символов", async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Введите текст");
    const reverseButton = screen.getByText("Развернуть");
    fireEvent.change(input, { target: { value: "abcde" } });
    fireEvent.click(reverseButton);

    await waitFor(
      () => {
        const circles = screen.queryAllByTestId("circle_li");
        const letters = circles.map((circle) => circle.textContent);

        expect(letters.join("")).toBe("edcba");
      },
      { timeout: DELAY_IN_MS * "abcde".length }
    );
  });

  it("Корректно разворачивает строку с одним символом", async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Введите текст");
    const reverseButton = screen.getByText("Развернуть");
    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.click(reverseButton);

    await waitFor(
      () => {
        const circles = screen.queryAllByTestId("circle_li");
        const letters = circles.map((circle) => circle.textContent);

        expect(letters.join("")).toBe("a");
      },
      { timeout: DELAY_IN_MS * "a".length }
    );
  });

  it("Корректно разворачивает пустую строку", async () => {
    render(
      <MemoryRouter>
        <StringComponent />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Введите текст");
    const reverseButton = screen.getByText("Развернуть");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(reverseButton);

    await waitFor(() => {
      const circles = screen.queryAllByTestId("circle_li");
      const letters = circles.map((circle) => circle.textContent);

      expect(letters.join("")).toBe("");
    });
  });
});
