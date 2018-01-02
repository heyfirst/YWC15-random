const machineEl = document.createElement('machine')
const wheelCount = 1;
const fib = [1,1,1,1,1,1,1,1,1,1]
const wheels = Array(wheelCount)

let Item = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

createSlots(Item)

function reset(item) {
  if (Item.indexOf(item) !== -1 ) {
    Item.splice(Item.indexOf(item), 1 );
    fib.pop()
    console.log(fib.length, Item.length)
    $('machine').html('')
    createSlots(Item)
  }
}

function createSlots(itemList){
  const slideCount = fib.reduce((a,b)=> a + b, 0);
  const slideAngle = 360 / slideCount;
  const defAngle = fib.length % 2 === 0 ? 180 : 360
  
  const play = function(){
    let wheelsEls = $('wheel')
    wheelsEls.addClass('active')

    var cssSelector = anime({
      targets: 'machine',
      scale: 1.6,
      duration: 10000,
      delay: 2000,
      easing: 'linear'
    });

    for (let i = 0; i < wheels.length; i++){
      let degreesToMove = Math.floor( 2 * slideCount + slideCount) * slideAngle; 
      wheelsEls[i].rotation -= degreesToMove;
      wheelsEls[i].setAttribute('style', 'transform: translateZ(-82vmax) rotateY('+wheelsEls[i].rotation+'deg)  ');
      checkChoosen(wheelsEls[i].rotation)
    }
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

  const checkChoosen = function(deg) {
    const data = $('slide').map((index,item) => {
      const raw = $(item).data('deg')
      if ( ((deg % -360 ) + 180 + 36) % 180 === +raw) {
        console.log($(item).data('team'))
        return $(item).data('team')
      } else {
        console.log('none')
      }
    })
  }
  
  $('body').append(machineEl)
}


