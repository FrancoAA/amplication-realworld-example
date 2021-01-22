import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ArticleList } from "./ArticleList";
import { CreateArticle } from "./CreateArticle";
import { Article } from "./Article";

export const ArticleIndex = (): React.ReactElement => {
  useBreadcrumbs("/articles/", "Articles");

  return (
    <Switch>
      <PrivateRoute exact path={"/articles/"} component={ArticleList} />
      <PrivateRoute path={"/articles/new"} component={CreateArticle} />
      <PrivateRoute path={"/articles/:id"} component={Article} />
    </Switch>
  );
};
