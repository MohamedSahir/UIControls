import { Component,  ViewChild ,ElementRef,OnInit, Inject,OnChanges } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ChartsModule, Color} from 'ng2-charts';
import{EnergyService} from '../app/services/wind.service';
import{IEnergy} from './Energy';


import 'chart.js/src/chart';
declare var options:any;
declare var Chart :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EnergyService]

})


export class AppComponent implements OnInit,OnChanges  {
  //@ViewChild('layout') canvasRef;
//  @ViewChild("layout") layout: ElementRef; 
  @ViewChild('mycanvas')canvas:ElementRef; 

  public options:any;
  public errorMsg :string ="10" ;
 
  public numbers :number[] =[];


  public  errornumber:number;
  // texts:string="'/n</br>'fjgidfjgidgh" ;
 public numberss :IEnergy[];dataType:any[];









//public doughnutChartData:number[] ;
constructor(private _energyService:EnergyService){}


ngOnChanges(){




}


   ngOnInit(){
    console.log("ngInit hooked");
    // var x= this._energyService.getEnergy().subscribe(
    //    (numberss)=> console.log(numberss=this.numberss),
    //   err=> this.errorMsg =<any>err);





    // for (let i = 0; i < this.numberss.length; i++) {
      
    //       console.log(this.numberss);
    //        this.numbers= this.numberss[i].EnergyValue[0];
    
    //     }
    
      // let ctx = this.canvas.nativeElement.getContext("2d");
      // console.log(ctx);
      // let me = this;
      // this.options = {
      //   circumference: Math.PI,
      //   rotation :  Math.PI,
      //   animation:{ onComplete: function() {
      //      me.doit(ctx);
      //    }}
      // }
    }






    ngAfterViewInit() {






      this._energyService.getEnergy().subscribe((response) => {this.numberss = response;
        this.errornumber = response[0].EnergyValue;
       // this.errornumber = 10;

       this.doughnutChartOptions ={elements: {
        center: {
         // text: this.errornumber + "%" +"Energy produced by the Wind", 
          text:this.errornumber +"% <br>Energy produced <br> by Wind Today" ,
          //fontColor: '#fff',
          //fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        
        }
      }
    };

        
         

        console.log("hooked");
        console.log(response[0].EnergyValue);
        for(let item of response){
        this.numbers.push(item.EnergyValue);   
        }
           }),(err)=> {this.errorMsg =<any>err};

this.ng2(this.errornumber);

    // Chart.pluginService.register({
    //   afterDraw: function (chart) {
    //     if (chart.config.options.elements.center) {
    //       var helpers = Chart.helpers;
    //       var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    //       var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    //       var ctx = chart.chart.ctx;
    //       ctx.save();
    //       var fontSize = helpers.getValueOrDefault(chart.config.options.elements.center.fontSize, Chart.defaults.global.defaultFontSize);
    //       var fontStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontStyle, Chart.defaults.global.defaultFontStyle);
    //       var fontFamily = helpers.getValueOrDefault(chart.config.options.elements.center.fontFamily, Chart.defaults.global.defaultFontFamily);
    //       var font = helpers.fontString(fontSize, fontStyle, fontFamily);
    //       ctx.font = font;
    //       ctx.fillStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontColor, Chart.defaults.global.defaultFontColor);
    //       ctx.textAlign = 'center';
    //       ctx.textBaseline = 'middle';
    //       ctx.fillText(chart.config.options.elements.center.text, centerX, centerY);
    //       ctx.restore();
    //     }
    //   },
    // })

    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;        
          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          // var fontStyle = centerConfig.fontStyle || 'Arial';  
          var fontStyle = 'bold italic Arial'; 
          var txt = centerConfig.text;      
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          // ctx.font = "22px" + fontStyle;
          
          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
  
          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);
  
          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);
  
          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
         // ctx.font =  fontSizeToUse+"px" + fontStyle;
          //ctx.font ="10px italic Arial";
         // console.log(ctx.font);
         ctx.fillStyle = color;
    












          // var img = new Image();
          // // img.src = 'https://developers.google.com/maps/images/lhimages/api/icon_streetviewimageapi.svg';

          // // var fillPattern = ctx.createPattern(img, 'repeat');



          // var words = txt.split(' ');
          // var line = '';
          // for(var n = 0; n < words.length; n++) {
          //   var testLine = line + words[n] + ' ';
          //   var metrics = stringWidth;
          //   var testWidth = metrics.width;
          //   if (testWidth > stringWidth && n > 0) {
          //     ctx.fillText(line, centerX, centerY);
          //     line = words[n] + ' ';
          //     centerY += elementHeight;
          //   }
          //   else {
          //     line = testLine;
          //   }
          // }

      




          // console.log(centerX);
          // if(centerX<376){
          //           var array = txt.split("<br>");
          //           for (var i = 0; i < array.length; i++) {
          //           ctx.fillText(array[i], centerX,centerY);
          //           centerY += 23;
          
          //           }
          //         }
          //           else{       
          //             var array = txt.split("<br>");
          //             for (var i = 0; i < array.length; i++) {
          //             ctx.fillText(array[i], centerX,centerY);
          //             centerY += 43;
          //           }
          
          
          //          }       
          //         }
          //       }








   //ctx.fillText(txt, centerX, centerY);
         
       
         // ctx.font = "200"+"px" + "bold Arial";
         var array = txt.split("<br>");
         for (var i = 0; i < array.length; i++) {
          // console.log(array);    
          if(i===0)
          {
            if(centerX<376)
            {  
              var centerXX = ((chart.chartArea.left + chart.chartArea.right) / 2);
              var centerYY = ((chart.chartArea.top + chart.chartArea.bottom) / 2.3);
              ctx.font ="30pt  Arial";
              ctx.fillText(array[0],centerXX,centerYY);                  
            centerY += 23;          
            }       
           else
           {
           var centerXX = ((chart.chartArea.left + chart.chartArea.right) / 2);
           var centerYY = ((chart.chartArea.top + chart.chartArea.bottom) / 2.3);
           ctx.font ="30pt Arial";
           ctx.fillText(array[0],centerXX,centerYY);
           centerYY += 53;           
          }
          }
          
          else if(i!=0){
            if(centerX<376)
            {      
              alert("x");
              // var centerXXX = ((chart.chartArea.left + chart.chartArea.right) / 2);
              // var centerYYY = ((chart.chartArea.top + chart.chartArea.bottom) / 1.7); 
              ctx.font = "10pt bold arial",  
              ctx.fillText(array[i], centerX,centerY);
          
              centerY += 20;          
            } 
            else{
              console.log(centerX);
              ctx.font = "20pt bold arial",
              ctx.fillText(array[i],centerX,centerY);
               centerY += 60;
               }

            }
         // ctx.font ="20px italic Arial";
         //  var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
         //  var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2.1);
        
           //ctx.fillText(array[i], centerX,centerY);
        }













       
















          //wrapText(ctx, txt, centerX, centerY, widthRatio, elementHeight);

          // console.log(txt);
          // var lines = txt.split("\n");
          // for (var i = 0; i < lines.length; ++i) {
          
        
          // }

        //  var text = txt;
          
        //  // text.replace('E', '<br/><br/>');

        //   txt= text.replace(/\n/g, " " ).split( " " ) ;
        //   console.log(txt);
      
        // ctx.fillText(txt, centerX, centerY);
        



          //Draw text in center
          //ctx.fillText(txt, centerX, centerY);
        }
      }
    });

 
   









  
     // let context = canvas.getContext('2d');
    // let can = this.layout.nativeElement;
    // let ctx = can.getContext('2d');
    //   ctx.fillStyle = "blue";
    //   ctx.font = "20pt Verdana";
    //   ctx.textAlign = "center";
    //   ctx.textBaseline = "middle";
    //  let step = 0;
    //  let steps = can.height + 50;
  
  }

    // let canvas = this.layout.nativeElement;
    // // let context = canvas.getContext('2d');

    // //  var x = canvas.width / 2;
    // // var y = canvas.height / 2;
    // let context: CanvasRenderingContext2D = this.layout.nativeElement.getContext("2d");
    // var x = canvas.width / 2;
    // var y = canvas.height / 2;
    
    // context.font = '90pt Calibri';
    // context.textAlign = 'center';
    // context.fillStyle = 'blue';
    // context.fillText('Hello Worldetrereygerhg!', x, y);
    

// Method 2



 // end of AfterViewInit



  // doit(ctx) {
  //   alert("triggered");
  //        var width = this.canvas.nativeElement.clientWidth,
  //          height = this.canvas.nativeElement.clientHeight;

  //      var fontSize = (height / 250).toFixed(2);
  //      ctx.font = fontSize + "em Verdana";
  //      ctx.textBaseline = "middle";
  //      ctx.fillStyle = "blue";

  //          var text = "Pass Rate 82%",
  //          textX = Math.round((width - ctx.measureText(text).width) / 2),
  //          textY = height -10;

  //      ctx.fillText(text, textX, textY);
  //      ctx.restore();
  //  }
public doughnutChartOptions: any = {
    cutoutPercentage:65,
    responsive: true,
    animaiton: {
     animateRotate: true,
     animateScale: true,
     animationDuration: 111,
     rotation:1000,
     duration:8000
    },
     elements: {
       center: {
        // text: this.errornumber + "%" +"Energy produced by the Wind", 
         text:this.errornumber +"% <br>Energy produced <br> by Wind Today" ,
         //fontColor: '#fff',
         //fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        
         fontFamily:"'Arial'",
         //fontSize: ,
         fontStyle: 'Bold Italic'
       }
     }
   };
   public pieChartLabels:string[] = ['Wind Energy', 'Total Energy', 'Nuclear Energy'];
   public pieChartData:number[] =[300, 500, 10];
   public pieChartType:string = 'pie';
  
   public chartClicked(e:any):void {
    
   }
  
   public chartHovered(e:any):void {
   
   }


  ng2(numberss){
// widget 2

alert("2");




  }



  public doughnutChartLabels:string[] = ['Wind Energy'];
  public doughnutChartData:number[] = this.numbers;
  
  //public doughnutChartData:number[] ;
  
  public doughnutChartType:string = 'doughnut';
public doughnutChartColors: any[] = [
    { 
      backgroundColor: ["rgb(242, 163, 106)", "rgba(255,255,255,.3)"],
      //borderColor: 'black'
     }  
     
  ];
// events
public chartClicked1(e:any):void {
  console.log(e);
}
public chartHovered1(e:any):void {
  console.log(e);
}
}

