import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const MyChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>(null);

    useEffect(() => {
        let newChartInstance: Chart | null = null;

        if (chartRef.current) {
            if (chartInstance) {
                chartInstance.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                newChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
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
            }
        }

        setChartInstance(newChartInstance);
    }, []);

    return <canvas ref={chartRef} className="my-4 w-100" id="myChart" width="900" height="380"></canvas>;
};

export default MyChart;
