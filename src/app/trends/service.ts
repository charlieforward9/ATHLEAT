import { APIResponseEvent } from "../types";
import { ChartData, Trend } from "./types";

export abstract class TrendService {
  constructor(trend: Trend) {
    this.trend = trend;
  }
  public trend: Trend;

  abstract getData(startDate: Date, endDate: Date): Promise<APIResponseEvent[]>;
  abstract transformData(events: APIResponseEvent[]): ChartData<Trend>;
}
