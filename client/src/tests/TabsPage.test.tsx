import { shallow } from "enzyme";
import TabsPage from "../components/TabsPage";
import { findByTestAttr } from "./testUtils";

const setup = (props = {}, state: any = null) => {
  const wrapper = shallow(<TabsPage {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe("<Cart />", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup();
  });

  it("TabsPage render without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

  it("show cart button rendering", () => {
    const cartBtn = findByTestAttr(wrapper, "show-cart-button");
    expect(cartBtn).toBeTruthy();
  });

  it("show cart modal", () => {
    const show: boolean = false;
    const wrapper = setup({}, { show });
    const cartBtn = findByTestAttr(wrapper, "show-cart-button");
    cartBtn.simulate("click");
    const initialShowState = wrapper.state("show");
    expect(initialShowState).toBe(true);
  });
});
