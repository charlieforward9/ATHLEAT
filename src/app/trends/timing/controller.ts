import { TrendController } from "../controller";
import {
  ActivityFilter,
  NutrientFilter,
  TemporalFilter,
  Trend,
  ControllerManager,
} from "../types";
import { TimingService } from "./service";

export class TimingController extends TrendController {
  private service: TimingService;
  constructor() {
    super(Trend.Intake, {
      Temporal: {
        [TemporalFilter.Start]: {
          filter: TemporalFilter.Start,
          selected: true,
        },
        [TemporalFilter.End]: { filter: TemporalFilter.End, selected: true },
        [TemporalFilter.Time]: { filter: TemporalFilter.Time, selected: false },
      },
      Activity: {
        [ActivityFilter.Calories]: {
          filter: ActivityFilter.Calories,
          selected: true,
        },
      },
      Nutrient: {
        [NutrientFilter.Calories]: {
          filter: NutrientFilter.Calories,
          selected: true,
        },
      },
      Mood: {},
    });
    this.service = new TimingService();
  }

  async useTrendManager(
    startDate: Date,
    endDate: Date
  ): Promise<ControllerManager<Trend.Timing>> {
    return {
      filters: this.filters,
      chartData: this.service.transformData(
        await this.service.getData(startDate, endDate)
      ),
    };
  }
}
