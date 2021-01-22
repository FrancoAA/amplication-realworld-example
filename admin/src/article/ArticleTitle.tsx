import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Article } from "../api/article/Article";

type Props = { id: string };

export const ArticleTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Article,
    AxiosError,
    [string, string]
  >(["get-/api/articles", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/articles"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/articles"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
