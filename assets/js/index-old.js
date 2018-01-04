const machineEl = document.createElement('machine')
const wheelCount = 1;
const fib = [1,1,1,1,1,1,1,1,1,1]
const wheels = Array(wheelCount)

const fromStorage = window.localStorage.getItem('ywc-random');
let item;
if (fromStorage) {
  item = fromStorage.split(',');
} else {
  item = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  window.localStorage.setItem('ywc-random', item.join(','));
}

console.log(item);

createSlots(item)

// reset
function reset(item) {
  if (Item.indexOf(item) !== -1 ) {
    Item.splice(Item.indexOf(item), 1 );
    fib.pop()
    console.log(fib.length, Item.length)
    $('machine').html('')
    createSlots(Item)
  }
}

// create slot
function createSlots(itemList){
  const slideCount = fib.reduce((a,b)=> a + b, 0);
  const slideAngle = 360 / slideCount;
  const defAngle = fib.length % 2 === 0 ? 180 : 360
  
  const play = function(){
    let wheelsEls = $('wheel')
    wheelsEls.addClass('active')

    var cssSelector = anime({
      targets: 'machine',
      scale: 1.5,
      duration: 10000,
      delay: 2000,
      easing: 'linear'
    });
    for (let i = 0; i < wheels.length; i++){
      let degreesToMove = Math.floor( Math.random() * slideCount + slideCount) * slideAngle; 
      wheelsEls[i].rotation -= degreesToMove;
      wheelsEls[i].setAttribute('style', 'transform: translateZ(-82vmax) rotateY('+wheelsEls[i].rotation+'deg)  ');
      checkChoosen(wheelsEls[i].rotation)
    }
    console.log('elem', wheelsEls);
  };

  document.body.addEventListener('click', play)

  for (let wheel of wheels) {
    let wheelEl = document.createElement('wheel')
    wheelEl.rotation = 0;
    wheel = new Array(slideCount)
    machineEl.appendChild(wheelEl)
    let enjiIndex = 0;
    let slideIndex = 0
    for (let enji of itemList){
      let enjiCount = fib[enjiIndex]
      enjiIndex++
      while (enjiCount > 0){
        let slideEl = document.createElement('slide')
        slideEl.classList.add('enji')
        slideEl.setAttribute("style", "transform: rotateY(" + (slideIndex * slideAngle - defAngle) + "deg) translateZ(80vmax) ;")
        slideEl.setAttribute("data-deg", slideIndex * slideAngle - defAngle)
        slideEl.setAttribute("data-team", enji)
        slideEl.textContent = enji;
        wheelEl.appendChild(slideEl);
        enjiCount--
        slideIndex++
      }
    }
  }

  const checkChoosen = function(deg, defAngle) {
    const angle = defAngle === 180 ? 360 : 180;
    const data = $('slide').map((index,item) => {
      const raw = $(item).data('deg')
      if ( deg % (angle * -1) === +raw) {
        console.log('a', $(item).data('team'))
        return $(item).data('team')
      } else {
        console.log('none')
      }
    })
  }
  
  $('body').append(machineEl)
}


