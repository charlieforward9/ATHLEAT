import { post } from "aws-amplify/api";
import { IntegrationService } from "../IntegrationService";
import { AuthBody, FetchBody } from "../types";
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
      path: "/authenticateStrava",
      apiName: "authStravaAPI",
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
   * @param body {FetchBody} id: the userID
   * @returns if this returns, we can get updated data from the database
   */
  async fetch(body: FetchBody): Promise<any> {
    const restOperation = post({
      path: "/fetchStrava",
      apiName: "fetchStravaAPI",
      options: {
        body: {
          user_id: body.id,
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
}
