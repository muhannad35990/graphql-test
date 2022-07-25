import { shallow } from "enzyme";
import TabsPage from "../components/TabsPage";

describe("<TabsPage />", () => {
  it("TabsPage render without crashing", () => {
    const wrapper = shallow(<TabsPage />);
    expect(wrapper).toBeTruthy();
  });
});
