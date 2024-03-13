const keysPressed = {};
//‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾//
 //         ANIMATIONS            //
//________________________________//
// Define SVG frames for walking in different directions
const svgFramesUp = [
    document.getElementById('mainPlayerWalkUpF1'),
    document.getElementById('mainPlayerWalkUpF2'),
    document.getElementById('mainPlayerWalkUpF3')
  ];
  
  const svgFramesDown = [
    document.getElementById('mainPlayerWalkDownF1'),
    document.getElementById('mainPlayerWalkDownF2'),
    document.getElementById('mainPlayerWalkDownF3')
  ];
  
  const svgFramesLeft = [
    document.getElementById('mainPlayerWalkLeftF1'),
    document.getElementById('mainPlayerWalkLeftF2'),
    document.getElementById('mainPlayerWalkLeftF3')
  ];
  
  const svgFramesRight = [
    document.getElementById('mainPlayerWalkRightF1'),
    document.getElementById('mainPlayerWalkRightF2'),
    document.getElementById('mainPlayerWalkRightF3')
  ];
  
  // Define SVG frame for shooting
  const svgFrameShooting = document.getElementById('mainPlayerShoot');
  
  let currentFrames = [svgFramesDown[0]]; // Initial direction frame (walking down)
  let currentIndex = 0;
  let isWalking = false;
  let isShooting = false;
  let animationTimeout;
  let opacityTrigger = true;

  if(opacityTrigger===true){
    resetOpacity();
    // Set the opacity of the first frame in playerWalkDown to 1
    if (svgFramesDown[0]) {
        svgFramesDown[0].style.opacity = 1;
      }  }
  
  function startAnimation(frames) {
    resetOpacity();
    isWalking = true;
    currentFrames = frames;
    animateFrames();
  }
  
  function startShootingAnimation() {
    resetOpacity();
    isShooting = true;
    currentFrames = [svgFrameShooting];
    animateFrames();
  }
  
  function stopAnimation() {
    isWalking = false;
    isShooting = false;
    currentIndex = 0;
    clearTimeout(animationTimeout);
  }
  
  function resetOpacity() {
    // Reset the opacity for all frames
    const allFrames = [...svgFramesUp, ...svgFramesDown, ...svgFramesLeft, ...svgFramesRight, svgFrameShooting];
    for (const frame of allFrames) {
      if (frame) {
        frame.style.opacity = 0;
      }
    }
  }
  
  function animateFrames() {
    if (isWalking || isShooting) {
      for (let i = 0; i < currentFrames.length; i++) {
        if (currentFrames[i]) {
          currentFrames[i].style.opacity = i === currentIndex ? 1 : 0;
        }
      }
  
      currentIndex = (currentIndex + 1) % currentFrames.length;
  
      // Adjust the delay (in milliseconds) to control the speed of the animation
      animationTimeout = setTimeout(animateFrames, 500); // Example: 500ms delay
    }
  }
  
  // Your existing keydown and keyup event listeners...
  document.addEventListener('keydown', function (event) {
    keysPressed[event.key] = true;
  
    switch (event.key) {
      case 'ArrowUp':
        console.log('walking up');
        startAnimation(svgFramesUp);
        break;
      case 'ArrowDown':
        console.log('walking down');
        startAnimation(svgFramesDown);
        break;
      case 'ArrowLeft':
        console.log('walking left');
        startAnimation(svgFramesLeft);
        break;
      case 'ArrowRight':
        console.log('walking right');
        startAnimation(svgFramesRight);
        break;
      case 'Space': // Assuming 'Space' key triggers shooting
        console.log('shooting');
        startShootingAnimation();
        break;
    }
  });
  
  document.addEventListener('keyup', function (event) {
    keysPressed[event.key] = false;
  
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      stopAnimation();
    }
  });

  export { keysPressed }