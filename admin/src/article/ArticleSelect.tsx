import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Article } from "../api/article/Article";

type Data = Article[];

type Props = Omit<SelectFieldProps, "options">;

export const ArticleSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/articles",
    async () => {
      const response = await api.get("/api/articles");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.title && item.title.length ? item.title : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
