import React from "react";
import renderer from "react-test-renderer";
import { Button } from "./button";

const onClickMock = jest.fn();

describe("Button Component", () => {
  it("рендер кнопки с текстом", () => {
    const tree = renderer
      .create(<Button text="Нажми меня" onClick={onClickMock} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер кнопки без текста", () => {
    const tree = renderer.create(<Button onClick={onClickMock} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер заблокированной кнопки", () => {
    const tree = renderer
      .create(
        <Button text="Заблокировано" disabled={true} onClick={onClickMock} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер кнопки с индикацией загрузки", () => {
    const tree = renderer
      .create(
        <Button text="Загрузка..." isLoader={true} onClick={onClickMock} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("корректный вызов колбека при клике на кнопку", () => {
    const tree = renderer.create(
      <Button text="Нажми меня" onClick={onClickMock} />
    ).root;

    // Находим кнопку в снэпшоте
    const button = tree.findByType("button");

    // Эмулируем клик на кнопку
    button.props.onClick();

    // Проверяем, что колбек был вызван
    expect(onClickMock).toHaveBeenCalled();
  });
});
