import { DataStore } from "aws-amplify";
import { Event } from "@/models";
import { TrendService } from "../service";
import { ChartData, Trend } from "../types";

export class TimingService extends TrendService {
  constructor() {
    super(Trend.Timing);
  }

  async getData(startDate: Date, endDate: Date): Promise<Event[]> {
    return await DataStore.query(Event, (e) =>
      e.and((e) => [
        e.date.ge(startDate.toISOString()),
        e.date.le(endDate.toISOString()),
        e.or((e) => [e.type.eq("Activity"), e.type.eq("Nutrient")]),
      ])
    );
  }

  transformData(events: Event[]): ChartData<Trend.Timing> {
    const data: ChartData<Trend.Timing> = {
      trend: Trend.Timing,
      labels: [],
      datasets: [],
    };
    events.map((e) => {
      let eventDetails = JSON.parse(e.eventJSON!);
      data.labels.push(e.time);
      data.datasets.push({
        type: e.type,
        caloricVolume: eventDetails.calories,
      });
    });
    return data;
  }
}
