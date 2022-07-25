import { Col, InputNumber, Modal, Row } from "antd";
import React, { FC, useState } from "react";

interface ModelProps {
  showDetails: boolean;
  setShowDetails: any;
  name: string;
  decription: string;
  options: any;
}
const CartView: FC<ModelProps> = ({
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
          <h1 className="font-bold">Cart</h1>
        </Col>
        <Col xs={24} sm={12} md={6}></Col>
      </Row>
    </Modal>
  );
};

export default CartView;
