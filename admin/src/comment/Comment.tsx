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
import { ArticleSelect } from "../article/ArticleSelect";
import { UserSelect } from "../user/UserSelect";
import { Comment as TComment } from "../api/comment/Comment";
import { CommentUpdateInput } from "../api/comment/CommentUpdateInput";

export const Comment = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/comments/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TComment,
    AxiosError,
    [string, string]
  >(["get-/api/comments", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/comments"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TComment, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/comments"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//comments");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TComment, AxiosError, CommentUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/comments"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: CommentUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["article", "author", "body"]),
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
                title={`${"Comment"} ${
                  data?.id && data?.id.length ? data.id : data?.id
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
              <ArticleSelect label="Article" name="article.id" />
            </div>
            <div>
              <UserSelect label="author" name="author.id" />
            </div>
            <div>
              <TextField label="body" name="body" textarea />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
