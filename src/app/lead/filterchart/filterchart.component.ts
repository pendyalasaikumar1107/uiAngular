import { Component, Input, OnInit, DoCheck } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-filterchart',
  templateUrl: './filterchart.component.html',
  styleUrls: ['./filterchart.component.css']
})
export class FilterchartComponent implements OnInit,DoCheck {

  @Input() dataArr;
  totalHired;
  text;
constructor() { 
}

ngDoCheck(): void {
  //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //Add 'implements DoCheck' to the class.
  this.totalHired = this.dataArr;
//   console.log("leng",this.dataArr,"Hired",this.totalHired);
  this.text = this.dataArr[1];
}
ngOnInit(): void {
  setTimeout(()=>{
      var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
              labels: ['Total Profiles', 'Hired', 'Not Hired','Waiting'],
              datasets: [{
                  label: this.totalHired[3]+ 'Filter',
                  data: [this.totalHired[0],this.totalHired[1],this.totalHired[2],this.totalHired[4]],
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