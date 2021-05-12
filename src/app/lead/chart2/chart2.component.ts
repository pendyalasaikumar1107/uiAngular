import { ChangeDetectionStrategy, Component, DoCheck, Input, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChartComponent2 implements OnInit,DoCheck {
    @Input() dataArr1;
    totalHired;
  constructor() { 
}

ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.totalHired = this.dataArr1;
    // console.log("leng",this.dataArr,"Hired",this.totalHired);
}
ngOnInit(): void {
    setTimeout(()=>{
        var myChart = new Chart("myChart2", {
            type: 'bar',
            data: {
                labels: ['Total Not Hired', 'Too Junior', 'Competency Gap','Skills Mismatched','Not Available','Associate not willing to Join'],
                datasets: [{
                    label: 'Rejection Summary',
                    data: [this.totalHired[0],this.totalHired[1],this.totalHired[2],this.totalHired[3],this.totalHired[4],this.totalHired[5]],
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
    },2000) 
  }

}
