import { TrendController } from "../controller";
import {
  ActivityFilter,
  NutrientFilter,
  TemporalFilter,
  Trend,
  ChartData,
} from "../types";
import { Event } from "@/models";

export class IntakeController extends TrendController {
  constructor() {
    super(Trend.Intake, {
      Temporal: {
        [TemporalFilter.Start]: {
          filter: TemporalFilter.Start,
          selected: false,
        },
        [TemporalFilter.End]: { filter: TemporalFilter.End, selected: false },
        [TemporalFilter.Time]: { filter: TemporalFilter.Time, selected: false },
      },
      Activity: {
        [ActivityFilter.Duration]: {
          filter: ActivityFilter.Duration,
          selected: false,
        },
        [ActivityFilter.Calories]: {
          filter: ActivityFilter.Calories,
          selected: true,
        },
        [ActivityFilter.Distance]: {
          filter: ActivityFilter.Distance,
          selected: false,
        },
        [ActivityFilter.Pace]: { filter: ActivityFilter.Pace, selected: false },
      },
      Nutrient: {
        [NutrientFilter.Food]: { filter: NutrientFilter.Food, selected: false },
        [NutrientFilter.Quantity]: {
          filter: NutrientFilter.Quantity,
          selected: false,
        },
        [NutrientFilter.Calories]: {
          filter: NutrientFilter.Calories,
          selected: true,
        },
        [NutrientFilter.Carbs]: {
          filter: NutrientFilter.Carbs,
          selected: false,
        },
        [NutrientFilter.Fat]: { filter: NutrientFilter.Fat, selected: false },
        [NutrientFilter.Protein]: {
          filter: NutrientFilter.Protein,
          selected: false,
        },
      },
      Mood: {},
    });
  }

  //TODO: Filter data down to only the data that matches the filters and will be charted
  filterData(data: Event[]): ChartData<Trend.Intake> {
    const chartData: ChartData<Trend.Intake> = {
      trend: Trend.Intake,
      labels: [],
      datasets: [],
    };
    // data.forEach((event) => {
    //   // TODO: Parse the eventJSON into a usable format
    //   // if (event.typeOfEvent === "Activity") {
    //   //        eventData = JSON.parse(event.eventJSON);
    //   //     } else if (event.typeOfEvent === "Nutrient") {
    //   //       eventData = JSON.parse(event.eventJSON);
    //   //     }
    //   for (const [dataType, filters] of Object.entries(this.filters)) {
    //     if (dataType === "Activity") {
    //       for (const [filter, filterData] of Object.entries(filters)) {
    //         if (filter === "Calories" && filterData.selected) {
    //         }
    //         if (filter === "Duration" && filterData.selected) {
    //         }
    //         if (filter === "Distance" && filterData.selected) {
    //         }
    //         if (filter === "Pace" && filterData.selected) {
    //         }
    //       }
    //     }
    //     if (dataType === "Nutrient") {
    //       for (const [filter, filterData] of Object.entries(filters)) {
    //         if (filter === "Quantity" && filterData.selected) {
    //         }
    //         if (filter === "Calories" && filterData.selected) {
    //         }
    //         if (filter === "Carbs" && filterData.selected) {
    //         }
    //         if (filter === "Fat" && filterData.selected) {
    //         }
    //         if (filter === "Protein" && filterData.selected) {
    //         }
    //       }
    //     }
    //   }
    // });

    return chartData;
  }
}
const intakeController = new IntakeController();
intakeController.toggleFilterSelection("Activity", ActivityFilter.Calories);
