import { V6Client } from "@aws-amplify/api-graphql";
import { TrendService } from "../service";
import { APIResponseEvent } from "@/app/types";
import { eventsByUserID } from "@/graphql/queries";
import {
  ActivityData,
  ChartData,
  EffortData,
  MoodData,
  NutrientData,
  Trend,
} from "../types";

export class IntakeService extends TrendService {
  private client: V6Client<never>;
  constructor(client: V6Client<never>) {
    super(Trend.Effort);
    this.client = client;
  }

  async getData(startDate: Date, endDate: Date): Promise<APIResponseEvent[]> {
    const userID = localStorage.getItem("currentUserID");
    if (!userID) {
      throw new Error("No user logged in");
    }
    const query = await this.client.graphql({
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
    const sortedEvents = events.sort((a, b) => (a.date < b.date ? -1 : 1));
    let today = sortedEvents.length ? sortedEvents[0].date : "2023-11-01",
      prevNutrition: NutrientData[] = [],
      currNutrition: NutrientData[] = [],
      mood: MoodData[] = [],
      tempDataset: EffortData[] | undefined;
    sortedEvents.map((e) => {
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
