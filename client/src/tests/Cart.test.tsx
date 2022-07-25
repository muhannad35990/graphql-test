import { shallow } from "enzyme";
import Cart from "../components/Cart";

const setup = (props = {}) => {
  return shallow(<Cart {...props} />);
};
describe("<Cart />", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup();
  });

  it("Cart render without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
});
