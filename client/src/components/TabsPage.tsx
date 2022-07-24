import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { Row, Tabs } from "antd";
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
        <TabPane tab="RECOMENDED" key="1">
          <Row justify="center" gutter={[24, 0]}></Row>
        </TabPane>
        <TabPane tab="SMALL BITES" key="1">
          <Row justify="center" gutter={[24, 0]}></Row>
        </TabPane>
        <TabPane tab="MAINS" key="1">
          <Row justify="center" gutter={[24, 0]}></Row>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabsPage;
