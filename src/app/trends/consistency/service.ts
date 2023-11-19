import { DataStore } from "aws-amplify";
import { Event } from "@/models";
import { TrendService } from "../service";
import { ActivityData, ChartData, NutrientData, Trend } from "../types";

export class TimingService extends TrendService {
  constructor() {
    super(Trend.Consistency);
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

  transformData(events: Event[]): ChartData<Trend.Consistency> {
    const data: ChartData<Trend.Consistency> = {
      trend: Trend.Consistency,
      labels: [],
      datasets: [],
    };
    let startDate = events[0].date,
      totalActivities: Partial<ActivityData> = {
        duration: 0,
        calories: 0,
        distance: 0,
      },
      totalNutrients: Partial<NutrientData> = {
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      };
    events.map((e) => {
      let eventDetails = JSON.parse(e.eventJSON!);

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
