import { Event } from "@/models";
import {
  ChartData,
  ControllerManager,
  FilterMap,
  Filters,
  Trend,
} from "./types";
import { TrendService } from "./service";

export abstract class TrendController {
  constructor(trend: Trend, filters: FilterMap) {
    this.trend = trend;
    this.filters = filters;
  }
  public trend: Trend;
  public filters: FilterMap;

  abstract useTrendManager(
    startDate: Date,
    endDate: Date
  ): Promise<ControllerManager<Trend>>;

  toggleFilterSelection<K extends keyof FilterMap>(
    type: K,
    filter: Filters[K]
  ): void {
    if (type == "Temporal") {
      //TODO: Trigger a call to the Database with the new start and end times
    }
    const existingFilter = this.filters[type][filter];
    if (existingFilter) {
      existingFilter.selected = existingFilter.selected ? false : true;
      this.filters[type][filter] = existingFilter;
    } else {
      console.log("Something went wrong");
    }
  }
}
