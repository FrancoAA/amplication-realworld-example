import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="Tags" to="/tags" />
      <NavigationItem name="Comments" to="/comments" />
      <NavigationItem name="Articles" to="/articles" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
