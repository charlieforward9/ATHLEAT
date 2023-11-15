import { Event } from "@/models";
import { DataStore } from "aws-amplify";
import { TrendService } from "../service";
import {
  ActivityData,
  ChartData,
  IntakeData,
  NutrientData,
  Trend,
} from "../types";
import { start } from "repl";

// type Event = {
//   id: string!;
//   type: string!;
//   date: string!;
//   time: string!;
//   json: string!;
// };

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

  transformData(events: Event[]): ChartData<Trend.Intake>[] {
    const data: ChartData<Trend.Intake>[] = [];
    let startDate = events[0].date,
      totalActivities: Partial<ActivityData> = {
        duration: 0,
        calories: 0,
        distance: 0,
        pace: 0,
      },
      totalNutrients: Partial<NutrientData> = {
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      };
    events.map((e) => {
      let eventDetails = JSON.parse(e.eventJSON!);

      //Get the date of the event
      //If it matches the current date, add it to the current dataset
      let isSameDay = e.date == startDate;
      if (!isSameDay) {
        data.push({
          trend: Trend.Intake,
          labels: [startDate],
          datasets: [
            {
              activity: totalActivities,
              nutrient: totalNutrients,
            },
          ],
        });
        startDate = e.date;
      }
      if (e.typeOfEvent == "Activity") {
        const details = eventDetails as ActivityData;
        totalActivities.duration! = isSameDay
          ? totalActivities.duration! + details.duration
          : details.duration;
        totalActivities.calories! = isSameDay
          ? totalActivities.calories! + details.calories
          : details.calories;
        totalActivities.distance! = isSameDay
          ? totalActivities.distance! + details.distance
          : details.distance;
        totalActivities.pace! = isSameDay
          ? totalActivities.pace! + details.pace
          : details.pace;
      } else if (e.typeOfEvent == "Nutrient") {
        const details = eventDetails as NutrientData;
        totalNutrients.calories! = isSameDay
          ? totalNutrients.calories! + details.calories
          : details.calories;
        totalNutrients.carbs! = isSameDay
          ? totalNutrients.carbs! + details.carbs
          : details.carbs;
        totalNutrients.fat! = isSameDay
          ? totalNutrients.fat! + details.fat
          : details.fat;
        totalNutrients.protein! = isSameDay
          ? totalNutrients.protein! + details.protein
          : details.protein;
      }
    });
    return data;
  }
}
