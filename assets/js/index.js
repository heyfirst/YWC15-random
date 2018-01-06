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
  items = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
  updateStorage();
}

function updateStorage() {
  storage.setItem(LOCAL_STORAGE_KEY, items.join(','));
}

// create Wheel
function createWheel() {
  const wheelEl = document.createElement('wheel')
  return wheelEl
}

function random() {
  return Math.floor(Math.random() * ((items.length - 1) - 0 + 1)) + 0
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const beginRandom = (isFirst = false) => {
  hideRandomButton();
  let randIdx;
  console.log(items);
  if (isFirst && items.length === 10) {
    randIdx = 9;
  } else {
    randIdx = random();
  }
  const getSpinDegree = getSpin(randIdx, false);
  const wheel = $('wheel')[0];
  setWheelRotate(wheel, -getSpinDegree);
  let swapCount = 0;
  const maximunCount = randomRange(3, 10);
  let currentTransSpeed = 15;
  setTransforSpeed(currentTransSpeed);

  const interval = setInterval(() => {
    // const shouldReverse = randomRange(0, 5) >= 3;
    // if (shouldReverse) {
    //   swapCount += 1;
    //   currentTransSpeed += 1;
    //   setTransforSpeed(currentTransSpeed);
    //   const getNewDegree = getSpin(randIdx, swapCount % 2 === 1);
    //   setWheelRotate(wheel, swapCount % 2 === 0 ? getNewDegree : -getNewDegree);
    // }
    if (swapCount === maximunCount) {
      clearInterval(interval);
      currentTransSpeed += 15;
      setTransforSpeed(currentTransSpeed);
    }
    if (currentTransSpeed > 16) {
      setTransforSpeed(15);
      currentTransSpeed = 15;
    }
  }, 1000);
  
  $(wheel).bind(
    "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
    function(){
      console.log(randIdx)
      showResetButton(randIdx);
      console.log($('.team-'+ items[randIdx]))
    }
  );
}

function setTransforSpeed(s) {
  console.log($('wheel')[0]);
  $('wheel').css('transition-duration', `${s}s`);
}

function getTargetDegree(index, isReverse) {
  return isReverse ? - slides[Object.keys(slides)[index]] : - 360 + slides[Object.keys(slides)[index]];
}

function getSpin(idx, isReverse) {
  const amountRounds = randomRange(3 , 6);
  const degree = 360 * amountRounds

  return isReverse ? degree : -degree + getTargetDegree(idx, isReverse);
}

function setWheelRotate(wheel, degree) {
  // const style = `transform: `;
  // wheel.setAttribute('style', style)
  $('wheel').css('transform', `translateZ(-84vmax) rotateY(${degree}deg)`);
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
  slideEl.innerHTML = `<div><img class="team team-${team}" src="./assets/img/${team}.png" /></div>`
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
  const anglePerSlide = 360 / items.length
  items.forEach((item, index) => {
    const slide = createSlide(index, anglePerSlide, item)
    wheel.appendChild(slide);
  })
  const machineEl = $('#root')[0];
  machineEl.appendChild(wheel);
  hideResetButton();
  showRandomButton(isFirst);
}

function clear(removedIdx) {
  const root = $('#root')[0];
  root.removeChild(root.childNodes[0]);
  items = [
    ...items.slice(0, removedIdx),
    ...items.slice(removedIdx + 1),
  ];
  updateStorage();
  slides = {};
}

// Main code
(() => {
  initiate(true);
})()