const { gql } = require("apollo-server");

const typeDefs = gql`
  type Options {
    AddChicken: Boolean
    AddTofu: Boolean
    AddShrimp: Boolean
    AddHoneyRoastedPork: Boolean
    ExtraChicken: Boolean
    ExtraTofu: Boolean
    ExtraShrimp: Boolean
    ExtraPork: Boolean
    NoProtein: Boolean
    NoUtensils: Boolean
    SpecialInstructions: String
  }

  type Item {
    id: ID!
    img: String!
    name: String!
    price: Float!
    decription: String
    options: Options
  }

  type MenuCart {
    name: String
    items: [Item!]!
  }

  type Category {
    name: String!
    items: [Item!]!
  }

  type Menu {
    name: String!
    categories: [Category!]!
  }

  type Query {
    menus(id: ID!): [Menu!]!
    cart(id: ID!): MenuCart!
  }

  input AddToCart {
    item: Item!
  }

  type Mutation {
    addToCart(input: AddToCart!): Item
  }
`;

module.exports = { typeDefs };
