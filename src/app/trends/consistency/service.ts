import { TrendService } from "../service";
import { ActivityData, ChartData, NutrientData, Trend } from "../types";
import { cookiesClient } from "@/utils/amplifyServerUtils";
import { eventsByUserID } from "@/graphql/queries";
import { APIResponseEvent } from "@/app/types";

export class ConsistencyService extends TrendService {
  constructor() {
    super(Trend.Consistency);
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
      },
    });

    return query.data.eventsByUserID.items;
  }

  transformData(events: APIResponseEvent[]): ChartData<Trend.Consistency> {
    const data: ChartData<Trend.Consistency> = {
      trend: Trend.Consistency,
      labels: [],
      datasets: [],
    };
    let startDate = events[0].date,
      totalActivities: Partial<ActivityData> = {
        duration: 0,
        calories: 0,
        distance: 0,
      },
      totalNutrients: Partial<NutrientData> = {
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      };
    events.map((e) => {
      let eventDetails = JSON.parse(e.eventJSON!);

      let isSameDay = e.date == startDate;
      if (!isSameDay) {
        data.labels.push(startDate);
        data.datasets.push({
          activity: totalActivities,
          nutrient: totalNutrients,
        });
        startDate = e.date;
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
