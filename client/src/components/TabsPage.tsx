import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { Col, Row, Spin, Tabs } from "antd";
import ItemCard, { Item } from "./ItemCard";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartView from "./CartView";
const { TabPane } = Tabs;

const QUERY_ALL_MENUS = gql`
  query GetAllMenus {
    menus {
      id
      name
    }
  }
`;
const QUERY_MENU = gql`
  query GetMenu($menuId: ID!) {
    menu(id: $menuId) {
      id
      name
      categories {
        id
        name
        items {
          id
          img
          name
          price
          decription
          options {
            id
            name
            selected
            price
          }
        }
      }
    }
  }
`;
function TabsPage() {
  const [currentTab, setCurrentTab] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const {
    data: allMenus,
    loading,
    error: usersError,
  } = useQuery(QUERY_ALL_MENUS);
  const [
    fetchMenu,
    { data: menuData, loading: menuContentLoading, error: menuError },
  ] = useLazyQuery(QUERY_MENU);

  useEffect(() => {
    fetchMenu({ variables: { menuId: 1 } });
  }, []);

  return allMenus?.menus.length > 0 ? (
    <Tabs
      defaultActiveKey="1"
      activeKey={`${currentTab}`}
      type="card"
      size="small"
      onChange={(val) => {
        fetchMenu({ variables: { menuId: val } });
        setCurrentTab(Number(val));
      }}
    >
      {allMenus?.menus.map((menu: any) => (
        <TabPane tab={menu.name} key={menu.id}>
          {menuData?.menu &&
            menuData?.menu.categories.map((cat: any, index: number) => (
              <div className="p-2" key={index}>
                <Row gutter={[24, 0]}>
                  <Col span={24}>
                    <h1 className="text-lg">{cat.name}</h1>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[24, 12]}>
                      {cat.items &&
                        cat.items?.map((item: Item) => (
                          <Col xs={12} sm={12} md={6} key={item.id}>
                            <ItemCard
                              id={item.id}
                              img={item.img}
                              name={item.name}
                              price={item.price}
                              decription={item.decription}
                              options={item.options}
                              menuId={Number(currentTab)}
                            />
                          </Col>
                        ))}
                    </Row>
                  </Col>
                </Row>
              </div>
            ))}
          <button
            className="fixed bottom-3 right-4   z-40 bg-slate-500 p-4 rounded text-white "
            onClick={() => setShowCart(true)}
            data-test="show-cart-button"
          >
            <ShoppingCartOutlined className="text-xl" />
            <div className="absolute -top-2 -right-2 bg-slate-500 border border-white  w-6 h-6 rounded-full">
              2
            </div>
          </button>
          <CartView
            showCart={showCart}
            setShowCart={setShowCart}
            menuId={currentTab}
          />
        </TabPane>
      ))}
    </Tabs>
  ) : (
    <Spin className="grid items-center w-full h-full" />
  );
}

export default TabsPage;
