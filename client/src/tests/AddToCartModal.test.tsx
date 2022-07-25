import { shallow } from "enzyme";

import { findByTestAttr } from "./testUtils";

import AddToCartModal from "../components/AddToCartModal";

const setup = (props = {}, state: any = null) => {
  const wrapper = shallow(<AddToCartModal {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe("Add to cart Modal", () => {
  let addToCartComponent: any;

  beforeEach(() => {
    addToCartComponent = setup();
  });

  it("render input counter", () => {
    const wrapper = findByTestAttr(addToCartComponent, "input-counter");
    expect(wrapper.length).toBe(1);
  });

  it("add button", () => {
    const wrapper = findByTestAttr(addToCartComponent, "add-button");
    expect(wrapper.length).toBe(1);
  });

  it("minus button", () => {
    const wrapper = findByTestAttr(addToCartComponent, "minus-button");
    expect(wrapper.length).toBe(1);
  });

  it("counter start at 1", () => {
    const wrapper = findByTestAttr(addToCartComponent, "input-counter");
    const initialCounterState = wrapper.state("count");
    expect(initialCounterState).toBe(1);
  });

  it("clicking button increments counter display", () => {
    const counter: any = 7;
    const wrapper = setup({}, { counter });
    const addButton = findByTestAttr(addToCartComponent, "add-button");
    addButton.simulate("click");
    const counterDisplay = findByTestAttr(addToCartComponent, "input-counter");
    expect(counterDisplay.get(0).value).to.equal(counter + 1);
  });

  it("clicking button decerement counter display", () => {
    const counter: any = 7;
    const wrapper = setup({}, { counter });
    const addButton = findByTestAttr(addToCartComponent, "minus-button");
    addButton.simulate("click");
    const counterDisplay = findByTestAttr(addToCartComponent, "input-counter");
    expect(counterDisplay.get(0).value).to.equal(counter - 1);
  });
});
