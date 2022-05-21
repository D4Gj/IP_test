import * as React from 'react';


//Интерфейс пропсов которые приходят в компонент, те по сути параметры
interface Props {
    //дата с типом Date
    date: Date;
    //температура с типом number, просто число
    temp: number;
}

// Определяем функцию TempData, присваеваем тип props к Props (к интерфейсу)
function TempData(props: Props) {
    // Из функции возвращаем jsx, т.е что-то типа верстки
    return (
        <div>
            {/* date нужно перевести в строку чтобы нормально отобразить поэтому вызываем у нее функцию toLocaleDateString() */}
            <div>{props.date.toLocaleDateString()}<br/>{props.date.toLocaleTimeString()}</div>
            <div>{props.temp}</div>
        </div>);
}

export default TempData;