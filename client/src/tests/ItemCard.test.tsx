import { shallow } from "enzyme";
import ItemCard from "../components/ItemCard";

describe("<ItemCart />", () => {
  it("ItemCard render without crashing", () => {
    const wrapper = shallow(<ItemCard />);
    expect(wrapper).toBeTruthy();
  });
});
