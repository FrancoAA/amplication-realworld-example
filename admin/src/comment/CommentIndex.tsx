import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CommentList } from "./CommentList";
import { CreateComment } from "./CreateComment";
import { Comment } from "./Comment";

export const CommentIndex = (): React.ReactElement => {
  useBreadcrumbs("/comments/", "Comments");

  return (
    <Switch>
      <PrivateRoute exact path={"/comments/"} component={CommentList} />
      <PrivateRoute path={"/comments/new"} component={CreateComment} />
      <PrivateRoute path={"/comments/:id"} component={Comment} />
    </Switch>
  );
};
