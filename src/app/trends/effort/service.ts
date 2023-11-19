import { Event } from "@/models";
import { DataStore } from "aws-amplify";
import { TrendService } from "../service";
import {
  ActivityData,
  ChartData,
  EffortData,
  MoodData,
  NutrientData,
  Trend,
} from "../types";

export class IntakeService extends TrendService {
  constructor() {
    super(Trend.Effort);
  }

  async getData(startDate: Date, endDate: Date): Promise<Event[]> {
    return await DataStore.query(Event, (e) =>
      e.and((e) => [
        e.date.ge(startDate.toISOString()),
        e.date.le(endDate.toISOString()),
      ])
    );
  }

  transformData(events: Event[]): ChartData<Trend.Effort> {
    const data: ChartData<Trend.Effort> = {
      trend: Trend.Effort,
      labels: [],
      datasets: [],
    };
    let today: string = events[0].date,
      prevNutrition: NutrientData[] = [],
      currNutrition: NutrientData[] = [],
      mood: MoodData[] = [],
      tempDataset: EffortData[] | undefined;

    events.map((e) => {
      let eventDetails = JSON.parse(e.eventJSON!);
      let isSameDay = e.date == today;
      if (!isSameDay) {
        if (tempDataset) {
          tempDataset.forEach((e) => {
            data.labels.push(today);
            data.datasets.push(e);
          });
        }
        today = e.date;
        prevNutrition = currNutrition;
        currNutrition = [];
        mood = [];
        tempDataset = undefined;
      }
      if (e.type == "Activity") {
        if (tempDataset == undefined) {
          tempDataset = [
            {
              activity: eventDetails as ActivityData,
              previousDayNutrition: prevNutrition,
              currentDayNutrition: currNutrition,
              mood: mood,
            },
          ];
        } else {
          tempDataset.push({
            activity: eventDetails as ActivityData,
            previousDayNutrition: prevNutrition,
            currentDayNutrition: currNutrition,
            mood: mood,
          });
        }
      } else if (e.type == "Nutrient") {
        if (tempDataset == undefined) {
          currNutrition.push(eventDetails as NutrientData);
        } else {
          tempDataset.forEach((e) =>
            e.currentDayNutrition.push(eventDetails as NutrientData)
          );
        }
      } else if (e.type == "Mood") {
        if (tempDataset == undefined) {
          mood.push(eventDetails as MoodData);
        } else {
          tempDataset.forEach((e) => e.mood.push(eventDetails as MoodData));
        }
      } else {
        console.log("Error: Event type not recognized");
      }
    });
    return data;
  }
}
