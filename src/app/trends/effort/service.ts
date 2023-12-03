import { TrendService } from "../service";
import {
  ActivityData,
  ChartData,
  EffortData,
  MoodData,
  NutrientData,
  Trend,
} from "../types";
import { APIResponseEvent } from "@/app/types";
import { eventsByUserID } from "@/graphql/queries";
import { cookiesClient } from "@/utils/amplifyServerUtils";

export class IntakeService extends TrendService {
  constructor() {
    super(Trend.Effort);
  }

  async getData(startDate: Date, endDate: Date): Promise<APIResponseEvent[]> {
    const userID = localStorage.getItem("currentUserID");
    if (!userID) {
      throw new Error("No user logged in");
    }
    const query = await cookiesClient.graphql({
      query: eventsByUserID,
      variables: {
        userID: userID,
        filter: {
          date: {
            between: [startDate.toISOString(), endDate.toISOString()],
          },
        },
      },
    });
    return query.data.eventsByUserID.items;
  }

  transformData(events: APIResponseEvent[]): ChartData<Trend.Effort> {
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
