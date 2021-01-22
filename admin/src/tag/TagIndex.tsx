import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TagList } from "./TagList";
import { CreateTag } from "./CreateTag";
import { Tag } from "./Tag";

export const TagIndex = (): React.ReactElement => {
  useBreadcrumbs("/tags/", "Tags");

  return (
    <Switch>
      <PrivateRoute exact path={"/tags/"} component={TagList} />
      <PrivateRoute path={"/tags/new"} component={CreateTag} />
      <PrivateRoute path={"/tags/:id"} component={Tag} />
    </Switch>
  );
};
