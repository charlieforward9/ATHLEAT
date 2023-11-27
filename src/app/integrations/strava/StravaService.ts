import { post } from "aws-amplify/api";
import { IntegrationService } from "../IntegrationService";
import { AuthBody, DataBody } from "../types";
import { DatastoreService } from "@/app/DatastoreService";

export class StravaService extends IntegrationService {
  constructor() {
    super("strava");
  }

  /**
   * Strava Authentication
   * @param body {AuthBody} id: the userID, code: the code strava returns on successful authentication
   * @returns if this returns, it worked
   */
  async authenticate(body: AuthBody): Promise<any> {
    const restOperation = post({
      path: "authStravaAPI",
      apiName: "/authenticateStrava",
      options: {
        body: {
          id: body.id,
          stravaCode: body.code,
        },
      },
    });
    const response = await restOperation.response;
    if (response.statusCode === 200) {
      return response.body;
    } else {
      throw new Error("Failed to fetch data with code: " + response.statusCode);
    }
  }

  /**
   * Strava Data Fetching
   * @param body {DataBody} id: the userID, message: not-necessary for this integration
   * @returns if this returns, we can get updated data from the database (DatastoreService refreshes Datastore to get the freshest batch of data from the database)
   */
  async fetch(body: DataBody): Promise<any> {
    const restOperation = post({
      path: "fetchStravaAPI",
      apiName: "/fetchStrava",
      options: {
        body: {
          user_id: body.id,
        },
      },
    });
    const response = await restOperation.response;
    if (response.statusCode === 200) {
      await DatastoreService.refreshDatastore();
      return response.body;
    } else {
      throw new Error("Failed to fetch data with code: " + response.statusCode);
    }
  }
}
