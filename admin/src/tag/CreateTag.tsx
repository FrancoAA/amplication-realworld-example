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
import { Tag } from "../api/tag/Tag";
import { TagCreateInput } from "../api/tag/TagCreateInput";

const INITIAL_VALUES = {} as TagCreateInput;

export const CreateTag = (): React.ReactElement => {
  useBreadcrumbs("/tags/new", "Create Tags");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Tag,
    AxiosError,
    TagCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/tags", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/tags"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TagCreateInput) => {
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
            <FormHeader title={"Create Tags"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
