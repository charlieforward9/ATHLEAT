import { API, DataStore } from "aws-amplify";
import { TrendService } from "../service";
import { Trend } from "../types";
import { Event } from "@/models";

export class IntakeService extends TrendService {
  constructor() {
    super(Trend.Intake);
  }

  //TODO: Add the ability to filter data by date range to the model
  async getData(startDate: Date, endDate: Date): Promise<Event[]> {
    return await DataStore.query(
      Event,
      (e) => e.typeOfEvent.eq("Activity") || e.typeOfEvent.eq("Nutrient")
    );
  }
}
