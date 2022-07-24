import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { Col, Row, Tabs } from "antd";
import ItemCard, { Item } from "./ItemCard";
const { TabPane } = Tabs;

const QUERY_ALL_MENUS = gql`
  query GetAllMenus {
    menus {
      id
      name
      categories
    }
  }
`;
const QUERY_MENU = gql`
  query GetMenu($menuId: ID!) {
    menu(id: $menuId) {
      id
      name
      categories
    }
  }
`;
function TabsPage() {
  const {
    data: allMenus,
    loading,
    error: usersError,
  } = useQuery(QUERY_ALL_MENUS);

  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" size="small">
        {allMenus.map((menu: any) => (
          <TabPane tab={menu.name} key={menu.id}>
            {menu.categories.map((cat: any) => (
              <Row justify="center" gutter={[24, 0]}>
                <Col span={24}>{cat.name}</Col>
                {cat.items.map((item: Item) => (
                  <Col span={8}>
                    <ItemCard
                      id={item.id}
                      img={item.img}
                      name={item.name}
                      price={item.price}
                      decription={item.decription}
                      options={item.options}
                    />
                  </Col>
                ))}
              </Row>
            ))}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default TabsPage;
