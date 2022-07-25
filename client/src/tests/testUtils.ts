export const findByTestAttr = (wrapper: any, val: any) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const simulateOnChage = (wrapper: any, name: string, val: any) => {
  return wrapper.simulate("change", {
    target: {
      name: { name },
      value: [val],
    },
  });
};
