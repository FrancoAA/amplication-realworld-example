import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Comment } from "../api/comment/Comment";

type Props = { id: string };

export const CommentTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Comment,
    AxiosError,
    [string, string]
  >(["get-/api/comments", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/comments"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/comments"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
