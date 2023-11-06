import { AthleatEvent } from "../types";
import { FilterMap, FilterOptions, Trend } from "./types";

export abstract class TrendService {
  constructor(trend: Trend) {
    this.trend = trend;
  }
  public trend: Trend;

  abstract getData(filters: FilterMap[]): AthleatEvent[];
}
