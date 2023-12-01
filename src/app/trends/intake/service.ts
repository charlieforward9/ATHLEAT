import { DataStore } from "aws-amplify/datastore";
import { Event } from "@/models";
import { TrendService } from "../service";
import { ActivityData, ChartData, NutrientData, Trend } from "../types";

export class IntakeService extends TrendService {
  constructor() {
    super(Trend.Intake);
  }

  async getData(startDate: Date, endDate: Date): Promise<Event[]> {
    return await DataStore.query(Event, (e) =>
      e.and((e) => [
        e.date.ge(startDate.toISOString()),
        e.date.le(endDate.toISOString()),
        e.or((e) => [e.type.eq("Activity"), e.type.eq("Nutrient")]),
      ])
    );
  }

  transformData(events: Event[]): ChartData<Trend.Intake> {
    const data: ChartData<Trend.Intake> = {
      trend: Trend.Intake,
      labels: [],
      datasets: [],
    };
    let startDate = events[0].date ?? "2023-11-01",
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
        data.labels.push(startDate);
        data.datasets.push({
          activity: totalActivities,
          nutrient: totalNutrients,
        });
        startDate = e.date;
      }
      if (e.type == "Activity") {
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
      } else if (e.type == "Nutrient") {
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
