import { Col, Modal, Row } from "antd";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import React, { FC, useEffect, useState } from "react";

interface ModelProps {
  showCart: boolean;
  setShowCart: any;
  menuId: number;
}

const QUERY_CART = gql`
  query GetCart($menuId: ID!) {
    cart(id: $menuId) {
      items {
        count
        item {
          img
          name
          price
          decription
        }
      }
    }
  }
`;

const CartView: FC<ModelProps> = ({ showCart, setShowCart, menuId }) => {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);

  const [fetchCart, { data: cartData, loading, error }] =
    useLazyQuery(QUERY_CART);
  useEffect(() => {
    fetchCart({ variables: { menuId: menuId } });
  }, []);

  return (
    <Modal
      visible={showCart}
      title="Cart"
      centered
      footer={null}
      onCancel={() => setShowCart(false)}
      destroyOnClose={true}
      maskClosable={false}
    >
      <Row justify="center" gutter={[24, 0]}>
        <Col span={24}>
          <h1 className="font-bold">Cart</h1>
        </Col>
        <Col xs={24}>
          {cartData?.cart ? (
            cartData.cart.items.map((cartItem: any) => (
              <div className="flex justify-between">
                <div className="flex ">
                  <div className="relative rounded">
                    <img
                      src={cartItem.item.img}
                      alt="img"
                      className="relative w-16 h-16 object-contain mr-2 rounded"
                    />
                    <div className="absolute top-1/3 -left-3 bg-slate-500    w-6 h-6 rounded-full  content-center ">
                      <h5 className="text-white m-auto w-100 ml-1">
                        {cartItem.count}x
                      </h5>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{cartItem.item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {cartItem.item.decription}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-lg">
                    ${cartItem.item.price}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <h5>NO DATA</h5>
          )}
        </Col>
        <Col xs={24}>
          <button className=" w-full mt-6 bg-blue-500 text-center text-white p-2 rounded mx-auto">
            Proceed to Checkout
          </button>
        </Col>
      </Row>
    </Modal>
  );
};

export default CartView;
