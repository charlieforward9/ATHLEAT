import { V6Client } from "@aws-amplify/api-graphql";
import { TrendService } from "../service";
import { ActivityData, ChartData, NutrientData, Trend } from "../types";
import { APIResponseEvent } from "@/app/types";
import { eventsByUserID } from "@/graphql/queries";
import { EventsByUserIDQueryVariables } from "@/API";

export class IntakeService extends TrendService {
  private client: V6Client<never>;
  constructor(client: V6Client<never>) {
    super(Trend.Intake);
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
          or: [
            {
              type: {
                eq: "Activity",
              },
            },
            {
              type: {
                eq: "Nutrient",
              },
            },
          ],
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

  transformData(events: APIResponseEvent[]): ChartData<Trend.Intake> {
    const data: ChartData<Trend.Intake> = {
      trend: Trend.Intake,
      labels: [],
      datasets: [],
    };
    const sortedEvents = events.sort((a, b) => (a.date < b.date ? -1 : 1));
    let totalActivities: Partial<ActivityData> = {
        duration: 0,
        calories: 0,
        distance: 0,
        pace: 0,
      },
      totalNutrients: Partial<NutrientData> = {
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      },
      startDate = sortedEvents.length ? sortedEvents[0].date : "2023-11-01";
    sortedEvents.forEach((e) => {
      let eventDetails = JSON.parse(JSON.parse(e.eventJSON!));

      //Get the date of the event
      //If it matches the current date, add it to the current dataset
      let isSameDay = e.date == startDate;
      if (!isSameDay) {
        data.labels.push(startDate);
        data.datasets.push({
          activity: totalActivities,
          nutrient: totalNutrients,
        });
        startDate = e.date;
        totalActivities = {
          duration: 0,
          calories: 0,
          distance: 0,
          pace: 0,
        };
        totalNutrients = {
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0,
        };
      }
      if (e.type == "Activity") {
        const details = eventDetails as ActivityData;
        totalActivities.duration! = isSameDay
          ? totalActivities.duration! + details.duration
          : details.duration;
        totalActivities.calories! = isSameDay
          ? totalActivities.calories! + details.calories
          : details.calories;
        totalActivities.distance! = isSameDay
          ? totalActivities.distance! + details.distance
          : details.distance;
        totalActivities.pace! = isSameDay
          ? totalActivities.pace! + details.pace
          : details.pace;
      } else if (e.type == "Nutrient") {
        const details = eventDetails as NutrientData;
        totalNutrients.calories! = isSameDay
          ? totalNutrients.calories! + details.calories
          : details.calories;
        totalNutrients.carbs! = isSameDay
          ? totalNutrients.carbs! + details.carbs
          : details.carbs;
        totalNutrients.fat! = isSameDay
          ? totalNutrients.fat! + details.fat
          : details.fat;
        totalNutrients.protein! = isSameDay
          ? totalNutrients.protein! + details.protein
          : details.protein;
      }
    });
    return data;
  }
}
