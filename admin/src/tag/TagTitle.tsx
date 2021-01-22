import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Tag } from "../api/tag/Tag";

type Props = { id: string };

export const TagTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Tag,
    AxiosError,
    [string, string]
  >(["get-/api/tags", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/tags"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/tags"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
