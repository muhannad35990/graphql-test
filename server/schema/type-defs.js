const { gql } = require("apollo-server");

const typeDefs = gql`
  type Option {
    id: ID!
    name: String
    selected: Boolean
    price: Float
  }

  type Item {
    id: ID!
    img: String!
    name: String!
    price: Float!
    decription: String
    options: [Option]
  }

  type CartItem {
    id: ID!
    count: Int!
    item: Item
  }

  type MenuCart {
    menuId: ID!
    name: String!
    items: [CartItem!]!
  }

  type Category {
    id: ID!
    name: String!
    items: [Item!]!
  }

  type Menu {
    id: ID!
    name: String!
    categories: [Category!]!
  }

  type Query {
    menus: [Menu!]
    menu(id: ID!): Menu!
    carts: [MenuCart!]
    cart(id: ID!): MenuCart!
  }

  input optionInput {
    id: Int
  }
  input ItemInput {
    id: Int!
    img: String!
    name: String!
    price: Float!
    decription: String
    options: [optionInput]
  }

  input CartItemInput {
    count: Int!
    item: ItemInput
  }

  input addToCartInput {
    menuId: Int!
    items: [CartItemInput]
  }

  type Mutation {
    addToCart(input: addToCartInput): MenuCart!
  }
`;

module.exports = { typeDefs };
