//Ссылка на форму инпутов
const form = document.getElementById('processForm');

form.addEventListener('submit', (e) => {
    //Отключаем перезагрузку страницы при нажатии
    e.preventDefault();
    const formData = new FormData(form);
    const data = formData.get('room');
    fetch('https://time.ulstu.ru/api/1.0/timetable?filter=' + data)
        .then((data) => data.json())
        .then((data) => {
            //Очистка таблицы с помощью айди
            document.querySelectorAll('#app > *').forEach(d => d.remove())
            for (const w of data.response.weeks) {
                renderWeek(w);
            }
        })
});
form.addEventListener('reset', (e) => {
    e.preventDefault();
    Swal.fire(
        'Успешно очищено',
        'да-да ура ура',
        'success'
    );
    document.querySelectorAll('#app > *').forEach(d => d.remove())
});

function renderWeek(week) {
    const table = document.createElement('table');
    for (const day of week.days) {
        renderDay(day, table);
    }
    document.getElementById('app').append(table);
}

function renderDay(day, table) {
    const row = document.createElement('tr');
    for (const lesson of day.lessons) {
        renderLesson(lesson, row);
    }
    table.append(row);
}

function renderLesson(lesson, row) {
    const cell = document.createElement('td');
    if (lesson.length > 0) {
        cell.innerHTML = lesson.map(d => [d.group, d.room, d.nameOfLesson, d.teacher]).join(',');
        cell.style = 'background-color: greenyellow';
    } else {
        cell.innerHTML = '/----/';
        cell.style = 'background-color: red';
    }
    row.append(cell);
}

