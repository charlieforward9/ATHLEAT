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
import { EventsByUserIDQueryVariables } from "@/API";
import { safelyParseJSON } from "@/utils/parser";

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

    let combinedItems: APIResponseEvent[] = [];
    let nextToken: string | null | undefined = null;
    do {
      let variables: EventsByUserIDQueryVariables = {
        userID: userID,
        filter: {
          date: {
            between: [startDate.toISOString(), endDate.toISOString()],
          },
        },
        nextToken: nextToken,
      };
      let query = await this.client.graphql({
        query: eventsByUserID,
        variables,
      });
      nextToken = query.data.eventsByUserID.nextToken;
      combinedItems = combinedItems.concat(query.data.eventsByUserID.items);
    } while (nextToken);

    return combinedItems;
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
    sortedEvents.forEach((e) => {
      let eventDetails = safelyParseJSON(e.eventJSON!);
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

      //Push last day
      if (tempDataset) {
        tempDataset.forEach((e) => {
          data.labels.push(today);
          data.datasets.push(e);
        });
      }
    });
    return data;
  }
}
