import { shallow } from "enzyme";
import ItemCard from "../components/ItemCard";
import { findByTestAttr } from "./testUtils";

const setup = (props = {}, state: any = null) => {
  const wrapper = shallow(<ItemCard {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe("<ItemCard />", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup();
  });

  it("ItemCard render without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

  it("show details button rendering", () => {
    const detailsBtn = findByTestAttr(wrapper, "show-details-button");
    expect(detailsBtn).toBeTruthy();
  });

  it("show Add To cart modal", () => {
    const show: boolean = false;
    const wrapper = setup({}, { show });
    const addCartBtn = findByTestAttr(wrapper, "show-details-button");
    addCartBtn.simulate("click");
    const initialShowState = wrapper.state("show");
    expect(initialShowState).toBe(true);
  });
});
