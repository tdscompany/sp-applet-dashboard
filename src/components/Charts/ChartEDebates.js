import React from 'react';
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "./chart.css";

const ChartEDebates = ({props}) => {
    return (
        <div className="chartWrapper">
            <Bar 
            data={{
                labels: ['', '', '', '', ''],
                datasets: [{
                    label: '',
                    data: [props[0], props[1], props[2], props[3], props[4]],
                    barThickness: 20,
                    backgroundColor: [
                        '#125AB8',
                        '#7AB4DB',
                        '#A6CDE7',
                        '#DBEBF5',
                        '#DBEBF5'
                    ],
                    
                    borderWidth: 0,
                    borderRadius: 6,
                }]
            }}
            options={{
                plugins:{
                    legend:{
                        display:false
                    },
                    datalabels: {
                        display: true,
                        color: "white",
                        anchor: "end",
                        offset: "-40",
                        align: "end",
                        clamp: true,
                        rotation: 90
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
                        grid: {
                            display: false
                            
                        }
                    }
                }
            }}

            height={150}
            width={100}
            plugins={[ChartDataLabels]}
            />
            </div>
    )
};

export default ChartEDebates;