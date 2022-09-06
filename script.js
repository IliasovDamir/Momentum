
//----------------------Languages-----------------------------------------------------//
let language = 'en';

function selectLang() {
  if (language === 'ru') {
    document.querySelector('.ru').classList.remove('opacity05')
    document.querySelector('.en').classList.add('opacity05')   
    document.querySelector('.name').placeholder = '[Введите имя]'
    document.getElementById('todo').innerHTML = 'Список дел'
    removeToggleUl[0].innerHTML = 'Плеер'
    removeToggleUl[1].innerHTML = 'Погода'
    removeToggleUl[2].innerHTML = 'Дата'
    removeToggleUl[3].innerHTML = 'Время'
    removeToggleUl[4].innerHTML = 'Приветствие'
    removeToggleUl[5].innerHTML = 'Цитата дня'    
  }
  else {
    document.querySelector('.en').classList.remove('opacity05')
    document.querySelector('.ru').classList.add('opacity05')    
    document.querySelector('.name').placeholder = '[Enter name]'
    document.getElementById('todo').innerHTML = 'TODO'    
    removeToggleUl[0].innerHTML = 'Player'
    removeToggleUl[1].innerHTML = 'Weather'
    removeToggleUl[2].innerHTML = 'Date'
    removeToggleUl[3].innerHTML = 'Time'
    removeToggleUl[4].innerHTML = 'Greeting'
    removeToggleUl[5].innerHTML = 'Quote'    
  }
}

document.querySelector('.ru').addEventListener('click', () => {
  language = 'ru'
  selectLang()
  getWeather()
  getQuotes()
})

document.querySelector('.en').addEventListener('click', () => {
  language = 'en'
  selectLang()
  getWeather()
  getQuotes()
})

//----------------------Date + Time-----------------------------------------------------//
const time = document.querySelector('.time');
const d = document.querySelector('.date');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const options = { month: 'long', day: 'numeric', weekday: 'long' };
  let currentDate;
  if (language === 'ru') {
    currentDate = date.toLocaleDateString('ru-RU', options)
  } else {
    currentDate = date.toLocaleDateString('en-GB', options);
  }
  time.textContent = currentTime;
  d.textContent = currentDate;

  setTimeout(showTime, 1000);
}
showTime();

//----------------------Greeting-----------------------------------------------------//
const greeting = document.querySelector('.greeting');
let timeOfDay = '';

function showGreeting() {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 0 && hours < 6) { timeOfDay = 'night' }
  else if (hours >= 6 && hours < 12) { timeOfDay = 'morning' }
  else if (hours >= 12 && hours < 18) { timeOfDay = 'afternoon' }
  else { timeOfDay = 'evening' }

  let greetingText;
  if (language === 'ru' && timeOfDay === 'night') {
    greetingText = 'Доброй ночи,'
  }
  else if (language === 'ru' && timeOfDay === 'morning') {
    greetingText = 'Доброе утро,'
  }
  else if (language === 'ru' && timeOfDay === 'afternoon') {
    greetingText = 'Добрый день,'
  }
  else if (language === 'ru' && timeOfDay === 'evening') {
    greetingText = 'Добрый вечер,'
  }
  else { greetingText = `Good ${timeOfDay},` }

  greeting.textContent = greetingText;
  setTimeout(showGreeting, 0);
}
showGreeting()


const name = document.querySelector('.name');

//----------------------Weather-----------------------------------------------------//
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=cd3a1bf3f6770040cdeb6de1828f978a&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === 429) {
    weatherDescription.textContent = `${data.message}`
  } else if (data.cod === '404' || data.cod === '400') {
    weatherError.classList.remove('display-none');
    weatherError.textContent = `City not found`;
    weatherIcon.classList.add('display-none');
    weatherDescription.classList.add('display-none');
    temperature.classList.add('display-none');
    wind.classList.add('display-none');
    humidity.classList.add('display-none');
  }
  else if (data.cod === 200) {
    weatherError.classList.add('display-none');
    weatherIcon.classList.remove('display-none');
    weatherDescription.classList.remove('display-none');
    temperature.classList.remove('display-none');
    wind.classList.remove('display-none');
    humidity.classList.remove('display-none');

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (language === 'ru') {
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
      humidity.textContent = `Влажность: ${data.main.humidity}%`;
    }
    else {
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
    }

  }
  //setTimeout(getWeather, 0);  
}
getWeather()


function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}
document.addEventListener('click', getWeather);
city.addEventListener('keypress', setCity);

//----------------------Quote-----------------------------------------------------//
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() {
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  if (language === 'ru') {
    let quoteNum = Math.floor(Math.random() * (data[1].length - 1 + 1) + 1);
    if (quoteNum > data[1].length) {
      quoteNum = 0;
    }
    quote.textContent = `${data[1][quoteNum].text}`;
    author.textContent = data[1][quoteNum].author;
  }
  else {
    let quoteNum = Math.floor(Math.random() * (data[0].length - 1 + 1) + 1);
    if (quoteNum > data[0].length) {
      quoteNum = 0;
    }
    quote.textContent = `${data[0][quoteNum].text}`;
    author.textContent = data[0][quoteNum].author;
  }
  changeQuote.addEventListener('click', getQuotes)
}
getQuotes();

//----------------------Slider-----------------------------------------------------//

//---Api
const github = document.getElementById('b0')
const unsplash = document.getElementById('b1')
const unsplashInput = document.querySelector('.unsplash-input')
let apiCurrent = 'github'

let theme = timeOfDay

github.addEventListener('click', () => {
  github.classList.toggle('checkbox-active')
  unsplash.classList.toggle('checkbox-active')  
  apiCurrent = 'github'
  setBg()
})
unsplash.addEventListener('click', () => {
  github.classList.toggle('checkbox-active')
  unsplash.classList.toggle('checkbox-active')  
  apiCurrent = 'unsplash'
  if (unsplashInput.value) {
    theme = unsplashInput.value
  }
  setBg()
})

unsplashInput.addEventListener('keypress', changeTheme)

function changeTheme (e) {
  if (e.code === 'Enter') {
    setBg()
    unsplashInput.blur()
  }
}


let body = document.querySelector('body');
let randomNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
let bgNum;

function getRandomNum() {
  bgNum = randomNum.toString().padStart(2, "0");
  return bgNum;
}
getRandomNum()


function setBg() {
  const img = new Image()
  if (apiCurrent === 'github') {    
    img.src = `https://raw.githubusercontent.com/IliasovDamir/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    
  } else {   
    fetch(
      `https://api.unsplash.com/photos/random?query=${theme}&orientation=landscape&client_id=gTlFlQjxrGdZ5KuLtkM_zZqOjlKZNSSELsoVDQT4aEg`
    )
      .then((response) => response.json())
      .then((data) => {
        img.src = data.urls.regular;
      })
  }
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`
  };  
}
setBg()

function getSlidePrev() {
  randomNum--;
  if (randomNum < 1) { randomNum = 20 }
  getRandomNum()
  setBg()
}

function getSlideNext() {
  randomNum++
  if (randomNum > 20) { randomNum = 1 }
  getRandomNum()
  setBg()
}
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)

// local storage//

// function setLocalStorageSettings() {//   
//   localStorage.setItem('apiCurrent', apiCurrent);
// }
// window.addEventListener('beforeunload', setLocalStorageSettings)


// function getLocalStorageSettings() {//   
//   if (localStorage.getItem('apiCurrent')) {
//     apiCurrent = localStorage.getItem('apiCurrent');
//   }
//   setBg()
// }
// window.addEventListener('load', getLocalStorageSettings)


//----------------------Audio-----------------------------------------------------//
const audio = new Audio();
const playPrev = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const nameSongs = document.querySelector('.name-songs');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const volume = document.querySelector('.volume');
const range = document.querySelector('.range');
const hideExpand = document.querySelector('.hide-expand');
const playerControlPlus = document.querySelector('.player-control-plus');
document.querySelector('.range').onclick = audioVolume;
let isPlay = false;

import playList from "./playList.js";
let playNumber = 0;

play.addEventListener('click', () => {
  play.classList.toggle('pause');
  if (isPlay === false) { isPlay = true }
  else { isPlay = false }
  playAudio()  
});
playPrev.addEventListener('click', playPrevv);
playNext.addEventListener('click', playNextt);
audio.addEventListener('ended', playNextt);

audio.src = playList[playNumber].src;

function playAudio() {    
  nameSongs.innerHTML = playList[playNumber].title   
  document.querySelector('.full-time').innerHTML = playList[playNumber].duration
  // document.querySelector('.pre-time').innerHTML = '0' + (currentTime / 100).toFixed(2)
  if (isPlay === true) { audio.play() }
  else { audio.pause() }
  playNumberColor()  
}

function playNumberColor() {
  if (isPlay === true) {
    document.querySelectorAll('.play-list li')[playNumber].classList.add('opacity');
    document.querySelectorAll('.play-list li')[playNumber].classList.add('item');
    for (let i = 0; i < playList.length; i++) {
      if (i !== playNumber) {
        document.querySelectorAll('.play-list li')[i].classList.remove('opacity');
        document.querySelectorAll('.play-list li')[i].classList.remove('item');
      }
    }
  } else {document.querySelectorAll('.play-list li')[playNumber].classList.remove('item');}   
}

function playPrevv() {
  playNumber--;
  if (playNumber < 0) {
    playNumber = playList.length - 1;
  }
  audio.src = playList[playNumber].src
  playAudio()
}

function playNextt() {
  playNumber++;
  if (playNumber > playList.length - 1) {
    playNumber = 0;
  }
  audio.src = playList[playNumber].src
  playAudio()
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement  
  const progressPercent = (currentTime / duration) * 100  
  progress.style.width = `${progressPercent}%`
  document.querySelector('.pre-time').innerHTML = '0' + (currentTime / 100).toFixed(2)
  
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration
  audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

function audioVolume() {
  let v = this.value;
  audio.volume = v / 100;
  if (v === '0') { volume.classList.add('mute') }
  else { volume.classList.remove('mute') }
}

volume.addEventListener('click', () => {
  volume.classList.toggle('mute');
  if (audio.volume > 0) {
    audio.volume = 0
    range.value = '0'
  }
  else {
    audio.volume = 0.4
    range.value = '40'
  }
  audioVolume()
})


let currentPlayNum
const songsItem = document.querySelectorAll('.play-list li')
console.log(songsItem)
for (let i = 0; i < songsItem.length; i++) {  
  songsItem[i].onclick = function () {
    playNumber = i
    if (isPlay === false) { 
      isPlay = true 
      currentPlayNum = i
      play.classList.toggle('pause')
      document.querySelectorAll('.play-list li')[i].classList.toggle('item')                  
    }
    else if (isPlay === true)  {
      if (currentPlayNum === i) {
        isPlay = false;
        play.classList.toggle('pause')
        document.querySelectorAll('.play-list li')[i].classList.toggle('item')              
      } else {
        currentPlayNum = i
      }
    }    
    audio.src = playList[currentPlayNum].src
    playAudio()       
  }  
}

hideExpand.addEventListener('click', () => {
  hideExpand.classList.toggle('hide')
  nameSongs.classList.toggle('margin')
  playerControlPlus.classList.toggle('margin')
  volume.classList.toggle('margin-top')
  range.classList.toggle('margin-top')
});


//----------------------TODO-----------------------------------------------------//

const todoInput = document.querySelector('.todo-input')
const todoUl = document.querySelector('.todo-ul')
const todoAddBtn = document.querySelector('.todo-add-btn')


document.getElementById('todo').addEventListener('click', () => {
  document.querySelector('.todo-container').classList.toggle('margin-left')  
})

document.querySelector('main').addEventListener('click', () => {
  document.querySelector('.todo-container').classList.remove('margin-left')  
})
document.querySelector('header').addEventListener('click', () => {
  document.querySelector('.todo-container').classList.remove('margin-left')  
})

todoAddBtn.addEventListener('click', addTask) 

let tasks = [];

// localStorage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(function (task) {
  renderTask (task)
})

function renderTask (task) {
  const cssClass = task.done ? "todo-p todo-li-done" : "todo-p";

  const taskHTML = `<li id="${task.id}" class="todo-li">
                      <p class="${cssClass}">${task.text}</p>
                      <div class="todo-btn-wrapper">
                        <button type="button" class="todo-done-btn" data-action="done">&#10004</button>
                        <button type="button" class="todo-delete-btn" data-action="delete">&#10006</button>
                      </div>            
                    </li>`;

  todoUl.insertAdjacentHTML("beforeend", taskHTML)
}

function saveTodoLocalStorage () {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// 

function addTask (event) {
  const taskText = todoInput.value

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
  }

  tasks.push(newTask)
  console.log(tasks)

  const cssClass = newTask.done ? "todo-p todo-li-done" : "todo-p";

  if (taskText) {
    event.preventDefault()
 
    const taskHTML = `<li id="${newTask.id}" class="todo-li">
                        <p class="${cssClass}">${newTask.text}</p>
                        <div class="todo-btn-wrapper">
                          <button type="button" class="todo-done-btn" data-action="done">&#10004</button>
                          <button type="button" class="todo-delete-btn" data-action="delete">&#10006</button>
                        </div>            
                      </li>`;
  
    todoUl.insertAdjacentHTML("beforeend", taskHTML)  
  
    todoInput.value = ""
    todoInput.focus()
  }
  saveTodoLocalStorage ()
}

todoUl.addEventListener('click', deleteTask)

function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {

        const parenNode = event.target.closest('.todo-li')
        const id = Number(parenNode.id)

        const index = tasks.findIndex((task) => task.id === id)

        tasks.splice(index, 1)
        parenNode.remove()
    }
    saveTodoLocalStorage ()
}

todoUl.addEventListener('click', doneTask)

function doneTask(event) {
  if (event.target.dataset.action === 'done') {
      const parenNode = event.target.closest('.todo-li')
      const todoTitle = parenNode.querySelector('.todo-p')
      todoTitle.classList.toggle('todo-li-done')

      const id = Number(parenNode.id)

      const task = tasks.find( (task) => task.id === id)

      // таже стрелочная функция только расписанная
      // const task = tasks.find(function (task) {
      //   if (task.id === id) {
      //     return true
      //   }
      // })

      task.done = !task.done
  }
  saveTodoLocalStorage ()
}



//----------------------SETTINGS-----------------------------------------------------//

const removeToggleUl = document.querySelectorAll(".remove-toggle-ul li");

removeToggleUl[0].addEventListener('click', () => {
  document.querySelector('.player').classList.toggle('visibility-hidden')
  removeToggleUl[0].classList.toggle('opacity05')
  setLocalStorageSettings()
})

removeToggleUl[1].addEventListener('click', () => {
  document.querySelector('.weather').classList.toggle('visibility-hidden')
  removeToggleUl[1].classList.toggle('opacity05')
  setLocalStorageSettings()
})

removeToggleUl[2].addEventListener('click', () => {
  document.querySelector('.date').classList.toggle('visibility-hidden')
  removeToggleUl[2].classList.toggle('opacity05')
  setLocalStorageSettings()
})

removeToggleUl[3].addEventListener('click', () => {
  document.querySelector('.time').classList.toggle('visibility-hidden')
  removeToggleUl[3].classList.toggle('opacity05')
  setLocalStorageSettings()
})

removeToggleUl[4].addEventListener('click', () => {
  document.querySelector('.greeting-container').classList.toggle('visibility-hidden')
  removeToggleUl[4].classList.toggle('opacity05')
  setLocalStorageSettings()
})

removeToggleUl[5].addEventListener('click', () => {
  document.querySelector('.change-quote').classList.toggle('visibility-hidden')
  document.querySelector('.quote').classList.toggle('visibility-hidden')
  document.querySelector('.author').classList.toggle('visibility-hidden')
  removeToggleUl[5].classList.toggle('opacity05')
  setLocalStorageSettings()
})

function expandSettings() {
  document.querySelector('.settings-container').classList.toggle('settings-container-expand') 
}
document.querySelector('.settings').addEventListener('click', expandSettings)

document.querySelector('main').addEventListener('click', () => {
  document.querySelector('.settings-container').classList.remove('settings-container-expand')  
})
document.querySelector('header').addEventListener('click', () => {
  document.querySelector('.settings-container').classList.remove('settings-container-expand')  
})


//----------------------LocalStorage-----------------------------------------------------//
function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('language', language)    
}
window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
  
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language');
    selectLang()
    showGreeting()
    getQuotes()
    getWeather()
  }
  
}
window.addEventListener('load', getLocalStorage)

console.log(city)
