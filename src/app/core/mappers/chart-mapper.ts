import { MapperInterface } from '../interfaces/mapper-interface';

export class ChartMapper implements MapperInterface<any> {

    fromJson(json: any): { datasets: any[], labels: [] } {
        const labels = json[0].values;
        const datasets = [];
        for (let i = 1; i < json.length; i++) {
            const randomColor = this.getRandomColor();
            datasets.push(
                {
                    label: json[i].name,
                    data: json[i].values, // Represnts measure data
                    fill: false,
                    borderColor: randomColor,
                    backgroundColor: randomColor,
                }
            );
        }
        return { datasets, labels };
    }

    private getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    fromList(json: any): any[] {
        return [];
    }


}
