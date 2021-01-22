import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { Article as TArticle } from "../api/article/Article";
import { ArticleUpdateInput } from "../api/article/ArticleUpdateInput";

export const Article = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/articles/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TArticle,
    AxiosError,
    [string, string]
  >(["get-/api/articles", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/articles"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TArticle, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/articles"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//articles");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TArticle, AxiosError, ArticleUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/articles"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ArticleUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.title);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "author",
        "body",
        "description",
        "favoritesCount",
        "slug",
        "test",
        "title",
      ]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Article"} ${
                  data?.title && data?.title.length ? data.title : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <UserSelect label="author" name="author.id" />
            </div>
            <div>
              <TextField label="body" name="body" textarea />
            </div>
            <div>
              <TextField label="description" name="description" />
            </div>
            <div>
              <TextField
                type="number"
                step={1}
                label="favoritesCount"
                name="favoritesCount"
              />
            </div>
            <div>
              <TextField label="slug" name="slug" />
            </div>
            <div>
              <TextField label="test" name="test" />
            </div>
            <div>
              <TextField label="title" name="title" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
