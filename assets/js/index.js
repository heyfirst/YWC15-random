const LOCAL_STORAGE_KEY = 'ywc-15-random'
// Create Machine Element

const storage = window.localStorage
const saved = storage.getItem(LOCAL_STORAGE_KEY)

let items;
let slides = {};

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

const beginRandom = (isFirst = false) => {
  hideRandomButton();
  let randIdx;
  if (isFirst && items.length === 10) {
    randIdx = 9;
  } else {
    randIdx = random();
  }
  const getSpinDegree = getSpin(randIdx);
  const wheel = $('wheel')[0];
  setWheelRotate(wheel, getSpinDegree);
  $(wheel).bind(
    "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
    function(){
      showResetButton(randIdx);
    }
  );
}

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


function showRandomButton(isFirst) {
  $('#action-btn').show();
  $('#action-btn').click(() => beginRandom(isFirst));
}

function hideRandomButton() {
  $('#action-btn').hide();
  $('#action-btn').prop('onclick',null).off('click');
}

function showResetButton(removeIdx) {
  $('#reset-btn').show();
  $('#reset-btn').click(() => {
    clear(removeIdx);
    initiate();
  });
}

function hideResetButton() {
  $('#reset-btn').hide();
  $('#reset-btn').prop('onclick',null).off('click');
}

function initiate(isFirst = false) {
  const wheel = createWheel()
  console.log(items);
  const anglePerSlide = 360 / items.length
  items.forEach((item, index) => {
    const slide = createSlide(index, anglePerSlide, item)
    wheel.appendChild(slide);
  })
  const machineEl = $('#root')[0];
  machineEl.appendChild(wheel);
  hideResetButton();
  showRandomButton(isFirst);
  console.log(slides, items);
  // $('#action-btn')[0].addEventListener('click', beginRandom);
}

function clear(removedIdx) {
  const root = $('#root')[0];
  root.removeChild(root.childNodes[0]);
  console.log(removedIdx);
  items = [
    ...items.slice(0, removedIdx),
    ...items.slice(removedIdx + 1),
  ];
  slides = {};
}

// Main code
(() => {
  initiate(true);
})()