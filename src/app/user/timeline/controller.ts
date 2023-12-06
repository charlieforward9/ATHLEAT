import { V6Client } from "@aws-amplify/api-graphql";
import { TimelineService } from "./service";
import { TimelineData } from "./types";

export class TimelineController {
  private service: TimelineService;
  constructor(client: V6Client<never>) {
    this.service = new TimelineService(client);
  }

  async useTimelineManager(date: Date): Promise<TimelineData> {
    return this.service.transformData(await this.service.getData(date));
  }
}
