const LOCAL_STORAGE_KEY = 'ywc-15-random'
// Create Machine Element
const machineEl = document.createElement('machine')

const storage = window.localStorage
const saved = storage.getItem(LOCAL_STORAGE_KEY)

let items

// if has save in localStorage
if (saved) {
  items = saved.split(',');
} else {
  items = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  storage.setItem(LOCAL_STORAGE_KEY, items.join(','))
}

// Create wheel
// Generate slides
  // Set angle
  // Set rotatation
// Append element to body

// create Wheel
function createWheel() {
  const wheelEl = document.createElement('wheel')
  return wheelEl
}

function random() {
  return Math.floor(Math.random() * ((items.length - 1) - 0 + 1)) + 0
}

function beginRandom() {
  // const slideNodes = $('wheel')[0].children;
  // for (let i = 0 ; i < slideNodes.length ; i += 1) {
  //   console.log(slideNodes[i].getAttribute('data-deg'));

  //   const style = `transform: rotateY(${degree}deg)
  //   translateZ(80vmax);`;
  //   slideNodes[i].setAttribute('style', style)
  // }
}

const slides = {};

function getTargetDegree(index) {
  return slides[Object.keys(slides)[index]] 
}

function getSpin() {
  const amountRounds = 3
  const degree = 360 * amountRounds

  return degree + getTargetDegree(random())
}

function setWheelRotate(wheel, degree) {
  const style = `transform: rotateY(${-degree}deg)
  translateZ(-82vmax);`

  wheel.setAttribute('style', style)
}

// Create Slide
function createSlide(index, angle, team) {
  let slideEl = document.createElement('slide')
  const degree = index * angle

  slideEl.classList.add('character')

  Object.assign(slides, {
    [team]: degree,
  })

  const style = `transform: rotateY(${degree}deg)
  translateZ(80vmax);`

  // Set slide element attribute
  slideEl.setAttribute('style', style)
  slideEl.setAttribute('data-deg', degree)
  slideEl.setAttribute('data-team', team)
  // Set slide text context
  slideEl.textContent = team
  return slideEl
}

// Main code
(() => {
  const wheel = createWheel()
  // console.log(random())
  const anglePerSlide = 360 / items.length

  items.forEach((item, index) => {
    const slide = createSlide(index, anglePerSlide, item)
    wheel.appendChild(slide);
  })

  machineEl.appendChild(wheel)

  setWheelRotate(wheel, getSpin())

  document.body.appendChild(machineEl)
  document.body.addEventListener('click', beginRandom)
})()