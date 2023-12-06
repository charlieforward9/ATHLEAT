import { V6Client } from "@aws-amplify/api-graphql";
import { eventsByUserID } from "@/graphql/queries";
import {
  APIResponseEvent,
  ActivityEventJson,
  MoodEventJson,
  NutrientEventJson,
} from "@/app/types";
import { EventsByUserIDQueryVariables } from "@/API";
import { TimelineData, TimelineEvent } from "./types";

export class TimelineService {
  private client: V6Client<never>;
  constructor(client: V6Client<never>) {
    this.client = client;
  }

  async getData(date: Date): Promise<APIResponseEvent[]> {
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
            eq: date.toISOString().split("T")[0],
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

  transformData(events: APIResponseEvent[]) {
    const sortedEvents = events.sort((a, b) => (a.date < b.date ? -1 : 1));
    let startDate = sortedEvents.length ? sortedEvents[0].date : "2023-11-01",
      timelineEvents: TimelineEvent<"Activity" | "Nutrient" | "Mood">[] = [],
      isSameDay = true;

    sortedEvents.forEach((e) => {
      let eventDetails = JSON.parse(JSON.parse(e.eventJSON!));
      if (e.type == "Activity") {
        const details = eventDetails as ActivityEventJson;
        const activityEvent: TimelineEvent<"Activity"> = {
          type: "Activity",
          color: "#FF6384",
          details: details,
        };
        timelineEvents.push(activityEvent);
      } else if (e.type == "Nutrient") {
        const details = eventDetails as NutrientEventJson;
        const activityEvent: TimelineEvent<"Nutrient"> = {
          type: "Nutrient",
          color: "#36A2EB",
          details: details,
        };
        timelineEvents.push(activityEvent);
      } else if (e.type == "Mood") {
        const details = eventDetails as MoodEventJson;
        const activityEvent: TimelineEvent<"Mood"> = {
          type: "Mood",
          color: "#FFCE56",
          details: details,
        };
        timelineEvents.push(activityEvent);
      } else {
        console.log("Unknown event type: " + e.type);
      }
    });
    const data: TimelineData = {
      date: sortedEvents.length ? sortedEvents[0].date : "2000-01-01",
      events: timelineEvents,
    };

    return data;
  }
}
