import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import React from "react";

const QUERY_CART = gql`
  query GetAllMenus {
  query GetCart($id: ID!) {
    cart(id: $id) {
      id
      name
      img
      price
      description
    }
  }
  }
`;
function Cart() {
  const { data: cart, loading, error: usersError } = useQuery(QUERY_CART);
  return (
    <div className="flex flex-col">
      {cart.map((item: any) => (
        <div className="flex align-middle">
          <img src={item.img} alt="" />
          <div className="flex flex-col">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
          <h3>{item.price}</h3>
        </div>
      ))}
      <button className="w-100 mt-6">Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
