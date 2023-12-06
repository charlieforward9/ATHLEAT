import { V6Client } from "@aws-amplify/api-graphql";
import { TrendController } from "../controller";
import { ConsistencyService } from "./service";
import {
  ActivityFilter,
  NutrientFilter,
  TemporalFilter,
  Trend,
  ControllerManager,
  MoodFilter,
} from "../types";

export class ConsistencyController extends TrendController {
  private service: ConsistencyService;
  constructor(client: V6Client<never>) {
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
      Mood: {
        [MoodFilter.Index]: { filter: MoodFilter.Index, selected: false },
      },
    });
    this.service = new ConsistencyService(client);
  }

  async useTrendManager(
    startDate: Date,
    endDate: Date
  ): Promise<ControllerManager<Trend.Consistency>> {
    return {
      filters: this.filters,
      chartData: this.service.transformData(
        await this.service.getData(startDate, endDate)
      ),
    };
  }
}
