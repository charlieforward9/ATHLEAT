import React, { useState, useEffect } from 'react';

import { TrendController } from "../trends/controller";
import { ActivityFilter, Filter, NutrientFilter } from '../trends/types';

interface PanelProps {
    onDateRangeChange: (startDate: string, endDate: string) => void;
    trendController: TrendController;
    onFilterChange: (filter: string, activity: boolean) => void;
    defaultFilters: {activity: string, nutrition: string};
}

const getActivityFilters = (trendController: TrendController) => {
    const filters:string[] = [];
    if (trendController.filters.Activity?.Calories) {
        filters.push('Calories');
    }
    if (trendController.filters.Activity?.Distance) {
        filters.push('Distance');
    }
    if (trendController.filters.Activity?.Duration) {
        filters.push('Duration');
    }
    if (trendController.filters.Activity?.Pace) {
        filters.push('Pace');
    }
    if (trendController.filters.Activity?.Type) {
        filters.push('Type');
    }

    return filters;
}

const getNutritionFilters = (trendController: TrendController) => {
    const filters:string[] = [];
    trendController.filters.Nutrient
    if (trendController.filters.Nutrient?.Calories) {
        filters.push('Calories');
    }
    if (trendController.filters.Nutrient?.Carbs) {
        filters.push('Carbs');
    }
    if (trendController.filters.Nutrient?.Fat) {
        filters.push('Fat');
    }
    if (trendController.filters.Nutrient?.Protein) {
        filters.push('Protein');
    }

    return filters;
}

const FilterPanel: React.FC<PanelProps> = (props) => {

    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [activityFilter, setActivityFilter] = useState<string>(props.defaultFilters.activity);
    const [nutritionFilter, setNutritionFilter] = useState<string>(props.defaultFilters.nutrition);

    const handleStartDateChange = (date: string) => {
        setStartDate(date);
        props.onDateRangeChange(date, endDate);
    };

    const handleEndDateChange = (date: string) => {
        setEndDate(date);
        props.onDateRangeChange(startDate, date);
    };

    const handleFilterChange = (filter: string, activity: boolean) => {
        if (activity)
            setActivityFilter(filter);
        else
            setNutritionFilter(filter);

        props.onFilterChange(filter, activity);
    }

    useEffect(() => {
        // Set the initial start date to 1 year ago
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        setStartDate(oneYearAgo.toISOString().split('T')[0]);
        
        // Set the initial end date to today
        const today = new Date();
        setEndDate(today.toISOString().split('T')[0]);
    
        // Call the onDateRangeChange callback with initial values
        props.onDateRangeChange(oneYearAgo.toISOString().split('T')[0], today.toISOString().split('T')[0]);
    }, []);

    const activityFilters = getActivityFilters(props.trendController);
    const nutritionFilters = getNutritionFilters(props.trendController);
  
    return (
        <div>
            <section>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                        type="date"
                        value={startDate}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                </div>
                <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                        type="date"
                        value={endDate}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                </div>
            </section>
            <section>
                <div className='flex flex-col'>
                Activity Filters
                {activityFilters.map((filterName) => (
                    <div key={filterName} className="flex items-center mb-2">
                        <div
                            onClick={() => handleFilterChange(filterName, true)}
                            className={`mr-2 w-4 h-4 rounded-full border cursor-pointer ${
                                activityFilter === filterName ? 'bg-blue-500' : 'border-gray-300'
                            }`}
                            >
                            {activityFilter === filterName && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                        <span>{filterName}</span>
                    </div>
                ))}
                </div>
            </section>
            <section>
                <div className='flex flex-col'>
                Nutrition Filters
                {nutritionFilters.map((filterName) => (
                    <div key={filterName} className="flex items-center mb-2">
                        <div
                            onClick={() => handleFilterChange(filterName, false)}
                            className={`mr-2 w-4 h-4 rounded-full border cursor-pointer ${
                                nutritionFilter === filterName ? 'bg-blue-500' : 'border-gray-300'
                            }`}
                            >
                            {nutritionFilter === filterName && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                        <span>{filterName}</span>
                    </div>
                ))}
                </div>
            </section>
        </div>
        
    );
        
};

export default FilterPanel;
