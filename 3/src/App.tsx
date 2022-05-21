// Имортируем реакт и хуки useState и useEffect
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
//Импортируем стили
import './App.css';
// Импортируем компонент который будет отображать прогноз погоды
import Temperature from './TemperatureData'


// Интерфейс требуется для описания hourly, которе приходит к нам через запрос https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m
interface ApiDataHourly {
  //temperature_2m: number[] описывает что в этот парметр приходит набор чисел
  temperature_2m: number[];
  // А сюда набор строк
  time: string[];
}

interface ApiData {
  // Здесь мы просто используем вышеописанный интерфейс
  hourly: ApiDataHourly;
}

function App() {
  //Создаем стейт data, так же его сеттер - setData. При объявлении useState< ТИП > засовываем ему тип ApiData, ничего ему не прописываем
  const [data, setData] = useState<ApiData>();
  // useEffect используется для работы с жизненным циклом компонента. В данном случае dependencyList (т.е массив в конце вызова функции useEffect) пустой, т.е эта функция отработает один раз
  // В тот момент, когда компонент зарендерится
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=54.3&longitude=48.4&hourly=temperature_2m')
    //Получаем data и переводим в json
      .then((data) => data.json())
      //Полученную инфу закидываем в стейт data
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  //Если нам ничего не пришло, то мы ничего не показываем
  if (data === undefined)
    return null;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* Из массива data берем параметр hourly, из него параметр time, делаем по нему map (т.е цикл), в котором нам потребуется только index */}
        {data.hourly.time.map((_, index) => {
          return (
            //здесь мы рендерим компонент TempData, в качестве ключа (key) прокидываем index. new Date создает дату с типом date, при вызове мы прокидываем туда текущее время по индексу
            // В температуру кладем текущую температуру так же по индексу
            // Т.е на каждое полученное время (data.hourly.time) мы рендерим (т.е отображаем) компонент который мы импортировали выше
            <Temperature key={index} date={new Date(data.hourly.time[index])} temp={data.hourly.temperature_2m[index]} />
          );
        })}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;