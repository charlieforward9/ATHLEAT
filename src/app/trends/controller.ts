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
  constructor(trend: Trend, filters: FilterMap, service: TrendService) {
    this.trend = trend;
    this.filters = filters;
    this.service = service;
  }
  public trend: Trend;
  public filters: FilterMap;
  public service: TrendService;

  abstract useTrendManager(
    startDate: Date,
    endDate: Date
  ): Promise<ControllerManager>;

  //TODO: Trigger a call to the Database with the new start and end times
  toggleFilterSelection<K extends keyof FilterMap>(
    type: K,
    filter: Filters[K]
  ): void {
    const existingFilter = this.filters[type][filter];
    if (existingFilter) {
      existingFilter.selected = existingFilter.selected ? false : true;
      this.filters[type][filter] = existingFilter;
    } else {
      console.log("Something went wrong");
    }
  }
}
