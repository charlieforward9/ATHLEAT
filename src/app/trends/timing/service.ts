import { APIResponseEvent } from "@/app/types";
import { eventsByUserID } from "@/graphql/queries";
import { cookiesClient } from "@/utils/amplifyServerUtils";
import { TrendService } from "../service";
import { ChartData, Trend } from "../types";

export class TimingService extends TrendService {
  constructor() {
    super(Trend.Timing);
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

  transformData(events: APIResponseEvent[]): ChartData<Trend.Timing> {
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
