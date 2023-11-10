import React from "react";
import renderer from "react-test-renderer";
import { Circle } from "./circle";

describe("Компонент Circle", () => {
  it("рендер элемента без буквы", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента с буквами", () => {
    const tree = renderer.create(<Circle letter="A" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента с head", () => {
    const tree = renderer.create(<Circle head="H" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента с react-элементом в head", () => {
    const tree = renderer
      .create(<Circle head={<div>React Element</div>} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента с tail", () => {
    const tree = renderer.create(<Circle tail="T" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента с react-элементом в tail", () => {
    const tree = renderer
      .create(<Circle tail={<div>React Element</div>} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента с index", () => {
    const tree = renderer.create(<Circle index={5} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента с пропом isSmall === true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента в состоянии default", () => {
    const tree = renderer.create(<Circle state="default" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента в состоянии changing", () => {
    const tree = renderer.create(<Circle state="changing" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("рендер элемента в состоянии modified", () => {
    const tree = renderer.create(<Circle state="modified" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
