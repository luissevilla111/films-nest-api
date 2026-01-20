import { FilmFiltersDto } from '../dto/filter.dto';

export function buildFilmSort(filters: FilmFiltersDto): any {
  const { sort, order } = filters;
  const sortQuery: any = {};
  if (sort) {
    sortQuery[sort] = order === 'asc' ? 1 : -1;
  }
  return sortQuery;
}
