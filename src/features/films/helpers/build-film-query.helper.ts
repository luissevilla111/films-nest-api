import { FilmFiltersDto } from '../dto/filter.dto';

export function buildFilmQuery(filters: FilmFiltersDto): any {
  const { isWatched, recommendatedBy, owner, genres } = filters;
  const query: any = {};

  if (isWatched !== undefined) {
    query.isWatched = isWatched;
  }

  if (recommendatedBy !== undefined) {
    query.recommendatedBy = recommendatedBy;
  }

  if (owner !== undefined) {
    query.owner = owner;
  }

  if (genres?.length) {
    query.genres = { $in: genres };
  }

  return query;
}
