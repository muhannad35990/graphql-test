const { MenuList, cart } = require("../FakeData");
const _ = require("lodash");
const resolvers = {
  Query: {
    menus() {
      return MenuList;
    },
    menu: (parent, args) => {
      const id = args.id;
      const menu = _.find(MenuList, { id: Number(id) });
      return menu;
    },
    cart: (parent, args) => {
      const id = args.id;
      const selectedCart = _.find(cart, { id: Number(id) });
      return selectedCart;
    },
  },
  Mutation: {
    addtoCart: (parent, args) => {
      const item = args.input;
      const lastId = MenuList[MenuList.length - 1].id;
      item.id = lastId + 1;
      MenuList.push(item);
      return item;
    },
  },
};

module.exports = { resolvers };
