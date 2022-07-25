import { shallow } from "enzyme";
import CartView from "../components/CartView";

describe("<CartView />", () => {
  it("CartView render without crashing", () => {
    const wrapper = shallow(<CartView />);
    expect(wrapper).toBeTruthy();
  });
});
