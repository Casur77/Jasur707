document.getElementById('updateBtn').addEventListener('click', function() {
    const trainingMode = document.getElementById('trainingMode').value;
    const trainingFrequency = document.getElementById('trainingFrequency').value;
    const exercisesPerDay = document.getElementById('exercisesPerDay').value;

    const tableBody = document.getElementById('trainingTable');
    tableBody.innerHTML = '';

    if (trainingMode === '4weeks') {
        for (let week = 1; week <= 4; week++) {
            for (let day = 1; day <= trainingFrequency; day++) {
                let row = `
                    <tr>
                        <td>Неделя ${week}, День ${day}</td>
                        <td><input type="text" placeholder="Пример: 2x2, 3x3"></td>
                        <td><input type="number" placeholder="Вес"></td>
                        <td><input type="number" disabled placeholder="Сумма"></td>
                    </tr>`;
                tableBody.innerHTML += row;
            }
        }
    } else {
        for (let day = 1; day <= exercisesPerDay; day++) {
            let row = `
                <tr>
                    <td>День ${day}</td>
                    <td><input type="text" placeholder="Пример: 2x2, 3x3"></td>
                    <td><input type="number" placeholder="Вес"></td>
                    <td><input type="number" disabled placeholder="Сумма"></td>
                </tr>`;
            tableBody.innerHTML += row;
        }
    }
});

document.getElementById('trainingTable').addEventListener('input', function(event) {
    if (event.target.type === 'text') {
        let inputText = event.target.value;
        let totalReps = 0;

        let sets = inputText.split(',');
        sets.forEach(set => {
            let match = set.trim().match(/(\d+)x(\d+)/);
            if (match) {
                totalReps += parseInt(match[1]) * parseInt(match[2]);
            }
        });

        let row = event.target.closest('tr');
        let totalRepsInput = row.querySelector('td:nth-child(4) input');
        totalRepsInput.value = totalReps;
    }
});

document.getElementById('downloadCsvBtn').addEventListener('click', function() {
    const table = document.getElementById('trainingTable');
    const rows = table.getElementsByTagName('tr');
    let csvContent = 