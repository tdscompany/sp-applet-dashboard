import React from 'react';
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "./hChart.css";

const Chart = ({pac, end, enq, endi, title}) => {
    return (
        
        <div className="chartWrapper">
            <p className="chartTitle">{title}</p>
            <Bar 
            data={{
                labels: ['', '', '', ''],
                datasets: [{
                    label: '',
                    data: [pac, end, enq, endi],
                    barThickness: 18,
                    backgroundColor: [
                        '#51C0A5',
                        '#51C0A58F',
                        '#51C0A54A',
                        '#51C0A51F'
                    ],


                    
                    borderWidth: 0,
                    datalabels: {
                        
                    },
                    borderRadius: 6,
                }]
            }}
            options={{
                
                indexAxis: 'y',
                plugins:{
                     
                    legend:{
                        display:false
                    },
                    datalabels: {
                        display: true,
                        color: "black",
                        anchor: "end",
                        offset: "-40",
                        align: "end",
                        clamp: true,
                      }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false,
                            drawTicks:false,
                            drawOnChartArea: false
                            
                        }
                    },
                    x: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false,
                            
                            
                        }
                    }
                }
            }}

            height={60}
            width={220}
            plugins={[ChartDataLabels]}
            />
            </div>
    )
};

export default Chart;