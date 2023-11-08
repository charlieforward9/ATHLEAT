import { Trend } from "./types";
import { Event } from "@/models";

export abstract class TrendService {
  constructor(trend: Trend) {
    this.trend = trend;
  }
  public trend: Trend;

  abstract getData(startDate: Date, endDate: Date): Promise<Event[]>;
}
