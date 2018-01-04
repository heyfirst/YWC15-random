const LOCAL_STORAGE_KEY = 'ywc-15-random'
// Create Machine Element

const storage = window.localStorage
const saved = storage.getItem(LOCAL_STORAGE_KEY)

let items;

// if has save in localStorage
if (saved) {
  items = saved.split(',');
} else {
  items = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  storage.setItem(LOCAL_STORAGE_KEY, items.join(','))
}

// create Wheel
function createWheel() {
  const wheelEl = document.createElement('wheel')
  return wheelEl
}

function random() {
  return Math.floor(Math.random() * ((items.length - 1) - 0 + 1)) + 0
}

const beginRandom = (idx) => {
  hideButton();
  $('#action-btn').prop('onclick',null).off('click');
  const getRandIdx = random();
  const getSpinDegree = getSpin(getRandIdx);
  const wheel = $('wheel')[0];
  setWheelRotate(wheel, getSpinDegree);
  $(wheel).bind(
    "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
    function(){
      showButton();
    }
  );
}

const slides = {};

function getTargetDegree(index) {
  return slides[Object.keys(slides)[index]] 
}

function getSpin(idx) {
  const amountRounds = 3
  const degree = 360 * amountRounds

  return degree + getTargetDegree(idx)
}

function setWheelRotate(wheel, degree) {
  const style = `transform: translateZ(-82vmax) rotateY(-${degree}deg)`;
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


function showButton() {
  $('#rand-button').show();
}

function hideButton() {
  $('#rand-button').hide();
}

function initiate() {
  const wheel = createWheel()
  const anglePerSlide = 360 / items.length
  items.forEach((item, index) => {
    const slide = createSlide(index, anglePerSlide, item)
    wheel.appendChild(slide);
  })
  const machineEl = $('#root')[0];
  machineEl.appendChild(wheel);
  $('#action-btn').click(() => beginRandom());
  // $('#action-btn')[0].addEventListener('click', beginRandom);
}

function clear(removedIdx) {
  $('#action-btn')[0].removeEventListener('click', beginRandom);
  const root = $('#root')[0];
  root.removeChild(root.childNodes[0]);
  items = [
    ...items.slice(0, removedIdx),
    ...items.slice(removedIdx + 1),
  ];
}

// Main code
(() => {
  initiate();
})()