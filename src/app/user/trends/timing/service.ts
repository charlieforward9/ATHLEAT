import { V6Client } from "@aws-amplify/api-graphql";
import { APIResponseEvent } from "@/app/types";
import { eventsByUserID } from "@/graphql/queries";
import { TrendService } from "../service";
import { ChartData, Trend } from "../types";
import { EventsByUserIDQueryVariables } from "@/API";

export class TimingService extends TrendService {
  private client: V6Client<never>;
  constructor(client: V6Client<never>) {
    super(Trend.Timing);
    this.client = client;
  }

  async getData(startDate: Date, endDate: Date): Promise<APIResponseEvent[]> {
    const userID = localStorage.getItem("currentUserID");
    if (!userID) {
      throw new Error("No user logged in");
    }
    let nextToken: string | null | undefined = null;
    let combinedItems: APIResponseEvent[] = [];
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

  transformData(events: APIResponseEvent[]): ChartData<Trend.Timing> {
    const data: ChartData<Trend.Timing> = {
      trend: Trend.Timing,
      labels: [],
      datasets: [],
    };
    events
      .sort((a, b) => (a.date < b.date ? -1 : 1))
      .forEach((e) => {
        let eventDetails = JSON.parse(JSON.parse(e.eventJSON!));
        data.labels.push(e.time);
        data.datasets.push({
          type: e.type,
          caloricVolume: eventDetails.calories,
        });
      });
    return data;
  }
}
