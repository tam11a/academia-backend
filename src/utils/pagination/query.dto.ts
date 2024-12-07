import { ApiQueryOptions } from '@nestjs/swagger';

export type IPaginationQuery = {
  search: string;
  limit: number;
  page: number;
  sort: string;
};

// Query

export const SearchQuery: ApiQueryOptions = {
  name: 'search',
  type: 'string',
  required: false,
};

export const LimitQuery: ApiQueryOptions = {
  name: 'limit',
  type: 'number',
  required: false,
  description: 'Number of items per page, default is 10',
};

export const PageQuery: ApiQueryOptions = {
  name: 'page',
  type: 'number',
  required: false,
  description: 'Page number, starting from 0',
};

export const SortQuery: ApiQueryOptions = {
  name: 'sort',
  type: 'string',
  required: false,
};
