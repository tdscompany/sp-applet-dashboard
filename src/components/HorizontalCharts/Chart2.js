import React from 'react';
import {Bar} from 'react-chartjs-2';

import "./hChart.css";

const Chart2 = ({pac, end, enq, endi}) => {
    return (
        
        <div className="chartWrapper">
            <p className="chartTitle">Jornada 2</p>
            <Bar 
            data={{
                labels: ['', '', '', ''],
                datasets: [{
                    label: '',
                    data: [pac[1], end[1], enq[1], endi[1]],
                    barThickness: 14,
                    backgroundColor: [
                        '#51C0A5',
                        '#51C0A58F',
                        '#51C0A54A',
                        '#51C0A51F'
                    ],


                    
                    borderWidth: 1,
                    datalabels: {
                        
                    }
                }]
            }}
            options={{
                
                indexAxis: 'y',
                plugins:{
                     
                    legend:{
                        display:false
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

            />
            </div>
    )
};

export default Chart2;