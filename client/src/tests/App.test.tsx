import App from "../App";
import { shallow } from "enzyme";

describe("<App />", () => {
  it("App render without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeTruthy();
  });
});
