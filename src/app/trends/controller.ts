import { FilterMap, FilterOptions, Trend } from "./types";

export abstract class TrendController {
  constructor(trend: Trend) {
    this.trend = trend;
    this.filters = this.getAllFilters();
    this.selectedFilters = this.getDefaultFilters();
  }
  public trend: Trend;
  public filters: FilterOptions[];
  public selectedFilters: FilterMap[];

  abstract getAllFilters(): FilterOptions[];
  abstract getDefaultFilters(): FilterMap[];

  abstract setFilter(filterMap: FilterMap): void;
}
