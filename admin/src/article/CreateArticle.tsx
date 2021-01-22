import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { Article } from "../api/article/Article";
import { ArticleCreateInput } from "../api/article/ArticleCreateInput";

const INITIAL_VALUES = {} as ArticleCreateInput;

export const CreateArticle = (): React.ReactElement => {
  useBreadcrumbs("/articles/new", "Create Article");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Article,
    AxiosError,
    ArticleCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/articles", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/articles"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ArticleCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Article"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
