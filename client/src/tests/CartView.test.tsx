import { shallow } from "enzyme";
import CartView from "../components/CartView";
import { findByTestAttr } from "./testUtils";

const setup = (props = {}) => {
  return shallow(<CartView {...props} />);
};

describe("<CartView />", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup();
  });

  it("CartView render without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

  it("checkout button rendering", () => {
    const checkoutBtn = findByTestAttr(wrapper, "checkout-button");
    expect(checkoutBtn).toBeTruthy();
  });
});
