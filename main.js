const devicesData = {
    device1: {
        humidity: 28.4,
        nitrogen: 3,
        phospor: 4.0,
        kalium: 8,
        temperature: 20.2,
        ph: 5.83,
        conductivity: 42,
        history: [
            { timestamp: '2024-11-12 14:50', humidity: 27, nitrogen: 2, phospor: 3, kalium: 6, temperature: 19.5, ph: 5.5, conductivity: 40 },
            { timestamp: '2024-11-12 14:55', humidity: 28, nitrogen: 3, phospor: 4, kalium: 7, temperature: 20.1, ph: 5.7, conductivity: 42 },
            { timestamp: '2024-11-12 15:00', humidity: 28.4, nitrogen: 3.5, phospor: 4.5, kalium: 8, temperature: 20.2, ph: 5.8, conductivity: 43 }
        ]
    },
    device2: {
        humidity: 32.1,
        nitrogen: 5,
        phospor: 6.0,
        kalium: 10,
        temperature: 21.5,
        ph: 6.5,
        conductivity: 50,
        history: [
            { timestamp: '2024-11-12 14:50', humidity: 30, nitrogen: 4, phospor: 5, kalium: 8, temperature: 21.0, ph: 6.0, conductivity: 48 },
            { timestamp: '2024-11-12 14:55', humidity: 31, nitrogen: 5, phospor: 6, kalium: 9, temperature: 21.2, ph: 6.3, conductivity: 50 },
            { timestamp: '2024-11-12 15:00', humidity: 32, nitrogen: 5.5, phospor: 6.5, kalium: 10, temperature: 21.5, ph: 6.5, conductivity: 52 }
        ]
    }
};

let selectedDevice = 'device1';
let chartInstance;

function displayLatestData() {
    const device = devicesData[selectedDevice];
    document.getElementById('humidityValue').textContent = `${device.humidity}%`;
    document.getElementById('nitrogenValue').textContent = `${device.nitrogen} mg/kg`;
    document.getElementById('phosporValue').textContent = `${device.phospor}`;
    document.getElementById('kaliumValue').textContent = `${device.kalium} mg/kg`;
    document.getElementById('temperatureValue').textContent = `${device.temperature}°C`;
    document.getElementById('phValue').textContent = `${device.ph}`;
    document.getElementById('conductivityValue').textContent = `${device.conductivity}`;
}

function updateSensorChart() {
    const selectedSensor = document.getElementById('sensorSelect').value;
    const deviceData = devicesData[selectedDevice];
    const labels = deviceData.history.map(item => item.timestamp);
    const sensorData = deviceData.history.map(item => item[selectedSensor]);

    if (chartInstance) chartInstance.destroy();
    const ctx = document.getElementById('sensorChart').getContext('2d');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: selectedSensor,
                data: sensorData,
                borderColor: '#ED1C24',  // Warna merah pekat untuk garis
                backgroundColor: 'rgba(237, 28, 36, 0.1)',  // Warna merah transparan untuk area fill
                borderWidth: 3,  // Ketebalan garis
                pointBackgroundColor: '#ED1C24',  // Warna titik data
                pointBorderColor: '#fff',
                pointRadius: 5,  // Ukuran titik data
                pointHoverRadius: 7,  // Ukuran titik saat di-hover
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ED1C24',
                fill: true,
                tension: 0.3  // Membuat garis lebih halus
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#fff'
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Waktu',
                        color: '#fff'
                    },
                    ticks: {
                        color: '#fff'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Nilai',
                        color: '#fff'
                    },
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            }
        }
    });
}


function updateDeviceData() {
    selectedDevice = document.getElementById('deviceSelect').value;
    displayLatestData();
    updateSensorChart();
}

document.addEventListener('DOMContentLoaded', function () {
    updateDeviceData();
});
