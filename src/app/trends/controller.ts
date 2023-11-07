import { DataType } from "../types";
import { Filter, FilterMap, FilterOptions, Trend } from "./types";

export abstract class TrendController {
  constructor(trend: Trend) {
    this.trend = trend;
    this.filters = this.getTrendFilters();
    this.selectedFilters = this.getDefaultFilters();
  }
  public trend: Trend;
  public filters: FilterOptions;
  public selectedFilters: FilterMap;

  abstract getTrendFilters(): FilterOptions;
  abstract getDefaultFilters(): FilterMap;

  setFilter(data: DataType, filter: Filter): void {
    this.selectedFilters.set(data, filter);
  }
}
