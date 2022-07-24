const { MenuList, cartList } = require("../FakeData");
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
    carts() {
      return cartList;
    },
    cart: (parent, args) => {
      const id = args.id;
      const cart = _.find(cartList, { menuId: Number(id) });
      return cart;
    },
  },
  Mutation: {
    addToCart: (parent, args) => {
      const item = args.input;
      const lastId = cartList[cartList.length - 1].id;
      item.id = lastId + 1;
      cartList.push(item);
      return item;
    },
  },
};

module.exports = { resolvers };
