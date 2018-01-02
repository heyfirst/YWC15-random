const machineEl = document.createElement('machine')
const wheelCount = 1;
const fib = [1,1,1,1,1,1,1,1,1,1]
const slideCount = fib.reduce((a,b)=> a + b, 0);
const slideAngle = 360 / slideCount;
const wheels = Array(wheelCount)

createSlots(["A", "B", "C", "D", "E", "F", "G", "H", "i", "J"])

function createSlots(emojis){
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
      let degreesToMove = Math.floor( (Math.random() + 3) * slideCount + slideCount) * slideAngle; 
      wheelsEls[i].rotation -= degreesToMove;
      wheelsEls[i].setAttribute('style', 'transform: translateZ(-82vmax) rotateY('+wheelsEls[i].rotation+'deg)  ');
    }
  };

  document.body.addEventListener('click', play)

  for (let wheel of wheels) {
    let wheelEl = document.createElement('wheel')
    wheelEl.rotation = 0;
    wheel = new Array(slideCount)
    machineEl.appendChild(wheelEl)
    let emojiIndex = 0;
    let slideIndex = 0
    for (let emoji of emojis){
      let emojiCount = fib[emojiIndex]
      emojiIndex++
      while (emojiCount > 0){
        let slideEl = document.createElement('slide')
        slideEl.classList.add('emoji')
        slideEl.setAttribute("style", "transform: rotateY(" + (slideIndex * slideAngle - 180) + "deg) translateZ(80vmax) ;")
        slideEl.textContent = emoji;
        wheelEl.appendChild(slideEl);
        emojiCount--
        slideIndex++
      }
    }
  }
  
  $('body').append(machineEl)
}


