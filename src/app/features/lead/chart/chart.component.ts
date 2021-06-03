import { ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChartComponent implements OnInit,DoCheck,OnChanges {
    @Input() dataArr;
    totalHired;
    // text;
  constructor() { 
}

ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
}
ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.

    // this.totalHired = this.dataArr;

    // console.log("leng",this.dataArr,"Hired",this.totalHired);
    // this.text = this.dataArr[1];
}
ngOnInit(): void {
    setTimeout(()=>{
        this.totalHired = this.dataArr;
    // console.log("leng",this.dataArr,"Hired",this.totalHired);
    var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: ['Total Profiles', 'Hired', 'Not Hired','Waiting'],
            datasets: [{
                label: 'Evaluation Summary',
                data: [this.totalHired[0],this.totalHired[1],this.totalHired[2],this.totalHired[3]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    },500) 
  }

}
