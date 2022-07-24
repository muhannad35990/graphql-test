import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Col, InputNumber, Modal, Row } from "antd";
import { gql } from "apollo-server-core";
import React, { FC, useState } from "react";

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($input: Item!) {
    addToCart(input: $input) {
      id
      name
    }
  }
`;

interface Option {
  name: string;
  selected: boolean;
  price: number;
}

export interface Item {
  id: number;
  img: String;
  name: String;
  price: number;
  decription: String;
  options: [Option];
}

const ItemCard: FC<Item> = ({ id, img, name, price, decription, options }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [total, setTotal] = useState(0);
  const [addtoCart, {}] = useMutation(ADD_TO_CART_MUTATION);

  return (
    <>
      ``
      <div className={`bg-[url('${img}')] w-20 rounded`}>
        <PlusCircleOutlined onClick={() => setShowDetails(true)} />
        <h3>{name}</h3>
        <h5>{price}$</h5>
      </div>
      <Modal
        visible={showDetails}
        title="name"
        centered
        footer={null}
        onCancel={() => setShowDetails(false)}
        destroyOnClose={true}
        maskClosable={false}
      >
        <Row justify="center" gutter={[24, 0]}>
          <Col span={24}>
            <h1>{name}</h1>
            <p>{decription}</p>
            <div className="flex justify-between">
              <h3>Protein options</h3>
              <h4>Select at least 1</h4>
            </div>
            <div className="flex flex-col">
              {options.map((option) => {
                return (
                  <div className="flex align-middle justify-between">
                    <h5>{option.name}</h5>
                    <div>
                      <h5>{option.price}</h5>
                      {option.selected && <input type="checkbox" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col span={24}>
            <InputNumber min={1} max={10} />
            <button>Add To Cart(${total})</button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ItemCard;
