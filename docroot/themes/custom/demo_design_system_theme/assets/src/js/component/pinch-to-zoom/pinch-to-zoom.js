//common variables
let myScroll;
const pinchToZoomSelector = 'js-pinch-to-zoom';

const isPassive = () => {
  let supportsPassiveOption = false;
  try {
    addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassiveOption = true;
      }
    }));
  }
  catch (e) {
    console.log(`Pinch to zoom component error: ${e}`);
  }
  return supportsPassiveOption;
};


/**
 * @description IScroll library as external dependency
 * @parms {IScroll} -> zoomMax (minimum 1, maximum 4)
 */
const pinchToZoomConfig = () => myScroll =
  new IScroll(`#${pinchToZoomSelector}`, { // jshint ignore:line
    zoom: true,
    zoomMax: 3,
    scrollX: true,
    scrollY: true,
    mouseWheel: true,
    wheelAction: 'zoom',
    click: true,
  });


const oddEvenClicksPointerEvents = (pinchToZoomContainer, evenStyle = 'none', oddStyle = 'all') =>
  pinchToZoomContainer.style.pointerEvents === evenStyle ?
    pinchToZoomContainer.style.pointerEvents = oddStyle :
    pinchToZoomContainer.style.pointerEvents = evenStyle;

//Event Listeners
/**
 * @description onDocumentReady eventListener
 */
document.addEventListener("DOMContentLoaded", function() {
  pinchToZoomConfig();

  const pinchToZoomContainer = document.getElementById(pinchToZoomSelector);

  (function onDocumentReadySetPointerEvent() {
    pinchToZoomContainer.style.pointerEvents = 'none';
  })();

  (function enableDisableZoom() {
    const resetZoomButton = document.getElementById('js-reset-zoom');

    resetZoomButton.addEventListener('click', function() {
      myScroll.zoom(0, 0, 1);
      oddEvenClicksPointerEvents(pinchToZoomContainer);
    });
  })();

});

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, isPassive() ? {
  capture: false,
  passive: false
} : false);
//End Event Listeners
