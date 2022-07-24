const { gql } = require("apollo-server");

const typeDefs = gql`
  type Options {
    AddChicken: {selected:Boolean,price:Int}
    AddTofu: {selected:Boolean,price:Int}
    AddShrimp: {selected:Boolean,price:Int}
    AddHoneyRoastedPork: {selected:Boolean,price:Int}
    ExtraChicken: {selected:Boolean,price:Int}
    ExtraTofu: {selected:Boolean,price:Int}
    ExtraShrimp: {selected:Boolean,price:Int}
    ExtraPork: {selected:Boolean,price:Int}
    NoProtein: {selected:Boolean,price:Int}
    NoUtensils: {selected:Boolean,price:Int}
    SpecialInstructions: String
  }

  type Item {
    id: ID!
    img: String!
    name: String!
    price: Int!
    decription: String
    options: Options
  }

  type MenuCart {
    id: ID!
    name: String
    items: [Item!]!
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
