import {
  StarOutlined,
  AppstoreOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MainMenu() {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: <AppstoreOutlined />,
          label: <NavLink to="/">Главная</NavLink>,
        },
        {
          key: "2",
          icon: <HeartOutlined />,
          label: <NavLink to="/liked">Вам понравилось</NavLink>,
        },
        {
          key: "3",
          icon: <StarOutlined />,
          label: <NavLink to="/favourite">Избранное</NavLink>,
        },
      ]}
    />
  );
}

export default MainMenu;
