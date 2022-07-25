import { PlusOutlined } from "@ant-design/icons";
import React, { FC, useState } from "react";
import AddToCartModal from "./AddToCartModal";

interface Option {
  id: number;
  name: string;
  selected: boolean;
  price: number;
}

export interface Item {
  id?: number;
  img?: string;
  name?: string;
  price?: number;
  decription?: string;
  options?: [Option];
  menuId?: number;
}

const ItemCard: FC<Item> = ({
  id,
  img,
  name,
  price,
  decription,
  options,
  menuId,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        style={{ backgroundImage: `url('${img}')` }}
        className="object-contain h-64 rounded md:w-44 sm:w-1 relative   bg-cover bg-no-repeat bg-center m-1 shadow"
      >
        <button
          onClick={() => setShowDetails(true)}
          className="absolute top-2 right-3 text-md text-black bg-white grid items-center p-1 rounded-full"
          data-test="show-details-button"
        >
          <PlusOutlined />
        </button>

        <div className="absolute bottom-0 left-0 p-2   w-44">
          <h5 className="text-white">{price}$</h5>
          <h3 className="text-white">{name}</h3>
        </div>
      </div>
      <AddToCartModal
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        name={name}
        decription={decription}
        options={options}
        price={price}
        menuId={menuId}
        id={id}
        img={img}
      />
    </>
  );
};

export default ItemCard;
