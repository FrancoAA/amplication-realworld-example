import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Tag } from "../api/tag/Tag";

type Data = Tag[];

type Props = Omit<SelectFieldProps, "options">;

export const TagSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/tags", async () => {
    const response = await api.get("/api/tags");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.name && item.name.length ? item.name : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
