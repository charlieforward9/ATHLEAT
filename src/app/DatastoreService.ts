import { DataStore } from "aws-amplify/datastore";
import { Hub } from "aws-amplify/utils";

export class DatastoreService {
  static async refreshDatastore(): Promise<void> {
    return new Promise(async (resolve) => {
      await DataStore.stop();
      await DataStore.clear();
      await DataStore.start();
      Hub.listen("datastore", async (hubData) => {
        const { event, data } = hubData.payload;
        if (event === "ready") {
          resolve();
        }
      });
    });
  }
}
