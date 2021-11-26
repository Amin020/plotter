import { MapperInterface } from '../interfaces/mapper-interface';

export class ChartMapper implements MapperInterface<any> {

    fromJson(json: any): { datasets: any[], labels: [] } {
        const labels = json[0].values;
        const datasets = [
            {
                label: json[1].name,
                data: json[1].values, // Represnts measure data
                fill: false,
                borderColor: 'rgb(48, 128, 208)',
                backgroundColor: 'rgb(48, 128, 208)',
            },
        ];
        return { datasets, labels };
    }

    fromList(json: any): any[] {
        return [];
    }


}
