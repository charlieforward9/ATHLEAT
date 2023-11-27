import { post } from "aws-amplify/api";
import { IntegrationService } from "../IntegrationService";
import { AuthBody, DataBody } from "../types";

export class StravaService extends IntegrationService {
  constructor() {
    super("strava");
  }

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

  async fetch(body: DataBody): Promise<any> {
    const restOperation = post({
      path: "fetchStravaAPI",
      apiName: "/fetchStrava",
      options: {
        body: {
          id: body.id,
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
