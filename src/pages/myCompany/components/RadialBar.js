import React from "react";
import ReactApexChart from "react-apexcharts";

export default function RadialBar() {

    const data = {
          
        series: [76, 67, 61, 90],
        options: {
          chart: {
            height: 390,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                }
              }
            }
          },
          colors: ['#366dfb', '#0876a1', '#002c67', '#4abc96'],
          labels: ['Sponsor goals', 'Possible cust.', 'Current cust.', 'Finishings'],
          legend: {
            show: true,
            floating: true,
            fontSize: '13px',
            position: 'left',
            offsetX: -35,
            offsetY: 0,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 0
            },
            formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
              vertical: 1
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                  show: false
              }
            }
          }]
        },
      
      
      };

    return(
        
        <div id="chart" style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <ReactApexChart options={data.options} series={data.series} type="radialBar" height={'100%'}/>
        </div>  
    )
}