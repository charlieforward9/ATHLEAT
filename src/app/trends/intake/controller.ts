import { ActivityEventJson, DataType, NutrientEventJson } from "@/app/types";
import { TrendController } from "../controller";
import {
  ActivityFilter,
  Filter,
  FilterOptions,
  MoodFilter,
  NutrientFilter,
  TemporalFilter,
  Trend,
} from "../types";
import { Event } from "@/models";

export class IntakeController extends TrendController {
  constructor() {
    super(Trend.Intake);
  }

  getTrendFilters() {
    const filters: FilterOptions = {
      temporalFilters: [
        TemporalFilter.Start,
        TemporalFilter.End,
        TemporalFilter.Time,
      ],
      activityFilters: [
        ActivityFilter.Type,
        ActivityFilter.Duration,
        ActivityFilter.Calories,
        ActivityFilter.Distance,
        ActivityFilter.Pace,
      ],
      nutrientFilters: [
        NutrientFilter.Food,
        NutrientFilter.Quantity,
        NutrientFilter.Calories,
        NutrientFilter.Carbs,
        NutrientFilter.Fat,
        NutrientFilter.Protein,
      ],
    };
    return filters;
  }

  getDefaultFilters() {
    const filters: Map<DataType, Filter> = new Map();
    filters.set(DataType.Activity, {
      filter: ActivityFilter.Calories,
      value: "",
    });
    filters.set(DataType.Nutrient, {
      filter: NutrientFilter.Calories,
      value: "",
    });
    return filters;
  }

  //TODO: Filter data down to only the data that matches the filters and will be charted
  // filterData(data: Event[]): Event[] {
  //   data.filter((event) => {
  //     var eventData: ActivityEventJson | NutrientEventJson;
  //     if (event.typeOfEvent === "Activity") {
  //        eventData = JSON.parse(event.eventJSON);
  //     } else if (event.typeOfEvent === "Nutrient") {
  //       eventData = JSON.parse(event.eventJSON);
  //     }
  //     this.selectedFilters.forEach((filter, dataType) => {
  //       if(dataType === DataType.Activity) {
  //         if (filter.filter === ActivityFilter.Calories) {
  //           if (eventData.calories > ) {
  //             return false;
  //           }
  //         }
  //       }

  //     });
  //   });
  // }
}
