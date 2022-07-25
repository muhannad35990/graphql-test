import { Col, Modal, Row, Spin } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

interface ModelProps {
  showDetails?: boolean;
  setShowDetails?: any;
  name?: string;
  decription?: string;
  options?: any;
  price?: number;
  menuId?: number;
  id?: number;
  img?: string;
}

const ADD_TO_CART_MUTAION = gql`
  mutation AddToCart($input: addToCartInput!) {
    addToCart(input: $input) {
      items {
        count
        item {
          id
          img
          name
          price
          decription
        }
      }
    }
  }
`;

const AddToCartModal: FC<ModelProps> = ({
  showDetails,
  setShowDetails,
  name,
  decription,
  options,
  price,
  menuId,
  id,
  img,
}) => {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [totalOptionPrices, setTotalOptionPrices] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART_MUTAION);

  useEffect(() => {
    if (loading) setIsSending(true);
    else {
      setIsSending(false);
      setShowDetails(false);
    }
  }, [loading]);

  useEffect(() => {
    if (loading)
      Modal.error({
        title: "Error",
        content: error?.message,
      });
  }, [error]);

  useEffect(() => {
    if (price) setTotal(count * price + totalOptionPrices);
  }, [count, totalOptionPrices]);

  const handleCheckboxOption = (option: any) => {
    if (selectedOptions.some((e: any) => e.id === option.id)) {
      setSelectedOptions((prev: any) =>
        prev.filter((item: any) => item.id !== option.id)
      );
      option.price && setTotalOptionPrices((prev) => prev - option.price);
    } else {
      setSelectedOptions((prev: any) => [...prev, { id: Number(option.id) }]);
      option.price && setTotalOptionPrices((prev) => prev + option.price);
    }
  };

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
      <>
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
                    <div
                      className={`flex  align-middle  border-b py-1 ${
                        option.name !== "SpecialInstructions"
                          ? "justify-between items-center"
                          : "flex-col justify-start align-none"
                      } `}
                    >
                      <h5 className="text-left">{option.name}</h5>
                      <div className={`flex items-center `}>
                        {option.price && (
                          <h5 className="m-0 mr-2 ">${option.price}</h5>
                        )}
                        {option.name !== "SpecialInstructions" ? (
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxOption(option)}
                          />
                        ) : (
                          <textarea rows={3} className="w-full border " />
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
                  data-test="minus-button"
                >
                  -
                </button>
                <input
                  type="text"
                  className="border-none outline-none w-8 text-center text-xl font-semibold"
                  value={count}
                  data-test="input-counter"
                />
                <button
                  className="border-none text-lg text-gray-600"
                  onClick={() => setCount((prev) => prev + 1)}
                  data-test="add-button"
                >
                  +
                </button>
              </div>
              <button
                className={`rounded py-1 px-3 ${
                  selectedOptions.length > 0
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }  font-bold`}
                onClick={(e) => {
                  setIsSending(true);
                  addToCart({
                    variables: {
                      input: {
                        menuId: menuId,
                        items: [
                          {
                            count: count,
                            item: {
                              id: Number(id),
                              img: img,
                              name: name,
                              price: price,
                              decription: decription,
                              options: selectedOptions,
                            },
                          },
                        ],
                      },
                    },
                  });
                }}
              >
                {isSending ? <Spin /> : `Add To Cart($${total})`}
              </button>
            </div>
          </Col>
        </Row>
      </>
    </Modal>
  );
};

export default AddToCartModal;
