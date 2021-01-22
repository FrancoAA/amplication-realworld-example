import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { UserTitle } from "../user/UserTitle";
import { Article } from "../api/article/Article";

type Data = Article[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "author",
    title: "author",
    sortable: false,
  },
  {
    name: "body",
    title: "body",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "description",
    title: "description",
    sortable: false,
  },
  {
    name: "favoritesCount",
    title: "favoritesCount",
    sortable: false,
  },
  {
    name: "slug",
    title: "slug",
    sortable: false,
  },
  {
    name: "test",
    title: "test",
    sortable: false,
  },
  {
    name: "title",
    title: "title",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const ArticleList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/articles",
    async () => {
      const response = await api.get("/api/articles");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Articles"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/articles/new"}>
            <Button>Create Article </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Article) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/articles"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.author?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.body}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.description}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.favoritesCount}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.slug}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.test}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.title}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
