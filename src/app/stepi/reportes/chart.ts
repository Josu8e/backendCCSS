import { ChartEvent, ChartType } from 'ng-chartist';
import * as Chartist from 'chartist';

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
    plugins?: any;
}