import { post } from "aws-amplify/api";
import { IntegrationService } from "../IntegrationService";
import { AuthBody, DataBody, NutritionBody } from "../types";

export class ChatgptService extends IntegrationService {
  constructor() {
    super("chatgpt");
  }

  async authenticate(body: AuthBody): Promise<any> {
    //TODO: implement
    // const restOperation = post({
    //   path: "intakeChatgptapi",
    //   apiName: "/intakeChatgpt",
    //   options: {
    //     body: {
    //       id: body.id,
    //       stravaCode: body.code,
    //     },
    //   },
    // });
    // const response = await restOperation.response;
    // if (response.statusCode === 200) {
    //   return response.body;
    // } else {
    //   throw new Error("Failed to fetch data with code: " + response.statusCode);
    // }
  }
   /**
   * ChatGPT Nutrition Parsing
   * @param body {NutritionBody} id: the userID, food: food description from NutritionForm, date: meal date from NutritionForm, time: meal time from NutritionForm
   * @returns if this returns, meal has been parsed and the appropriate macronutrients have been added to the DynamoDB Event table as a NutritionEvent
   */
  async fetch(body: NutritionBody): Promise<any> {
      const restOperation = post({
        path: "intakeChatgptapi",
        apiName: "/intakeChatgpt",
        options: {
          body: {
            id: body.id,
            food: body.food,
            date: body.date,
            time: body.time
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
