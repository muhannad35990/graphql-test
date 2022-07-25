import { Col, InputNumber, Modal, Row } from "antd";
import React, { FC, useState } from "react";

interface ModelProps {
  showDetails: boolean;
  setShowDetails: any;
  name: string;
  decription: string;
  options: any;
}
const AddToCartModal: FC<ModelProps> = ({
  showDetails,
  setShowDetails,
  name,
  decription,
  options,
}) => {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);
  return (
    <Modal
      visible={showDetails}
      title={name}
      centered
      footer={null}
      onCancel={() => setShowDetails(false)}
      destroyOnClose={true}
      maskClosable={false}
    >
      <Row justify="center" gutter={[24, 0]}>
        <Col span={24}>
          <p>{decription}</p>
          <div className="flex justify-between">
            <h3>Protein options</h3>
            <h4 className="bg-red-600 text-xs uppercase text-white p-1 rounded">
              Select at least 1
            </h4>
          </div>
          <div className="flex flex-col mt-3">
            {options &&
              options.map((option: any) => {
                return (
                  <div className="flex align-middle justify-between border-b py-1">
                    <h5>{option.name}</h5>
                    <div className="flex items-center ">
                      {option.price ? (
                        <>
                          <h5 className="m-0 mr-2">${option.price}</h5>
                          <input type="checkbox" />
                        </>
                      ) : (
                        <input type="text" className="w-full" />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
        <Col span={24}>
          <div className="flex justify-between mt-6">
            <div className="flex items-center border rounded p-2 font-semibold">
              <button
                className="border-none text-lg text-gray-600"
                onClick={() => count > 1 && setCount((prev) => prev - 1)}
              >
                -
              </button>
              <input
                type="text"
                className="border-none outline-none w-8 text-center text-xl font-semibold"
                value={count}
              />
              <button
                className="border-none text-lg text-gray-600"
                onClick={() => setCount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="rounded py-1 px-3 bg-gray-300 text-gray-600 font-bold">
              Add To Cart(${total})
            </button>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddToCartModal;
