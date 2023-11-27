import { post } from "aws-amplify/api";
import { IntegrationService } from "../IntegrationService";
import { AuthBody, DataBody } from "../types";

export class ChatgptService extends IntegrationService {
  constructor() {
    super("chatgpt");
  }

  async authenticate(body: AuthBody): Promise<any> {
    //TODO: implement
    // const restOperation = post({
    //   path: "authChatgptAPI",
    //   apiName: "/authenticateChatgpt",
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

  async fetch(body: DataBody): Promise<any> {
    //TODO: implement
    //     const restOperation = post({
    //       path: "fetchChatgptAPI",
    //       apiName: "/fetchChatgpt",
    //       options: {
    //         body: {
    //           id: body.id,
    //         },
    //       },
    //     });
    //     const response = await restOperation.response;
    //     if (response.statusCode === 200) {
    //       return response.body;
    //     } else {
    //       throw new Error("Failed to fetch data with code: " + response.statusCode);
    //     }
  }
}
