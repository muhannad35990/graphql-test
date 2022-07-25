import { shallow } from "enzyme";
import Cart from "../components/Cart";

describe("<Cart />", () => {
  it("Cart render without crashing", () => {
    const wrapper = shallow(<Cart />);
    expect(wrapper).toBeTruthy();
  });
});
