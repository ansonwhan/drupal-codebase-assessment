"use strict";

var myScroll;
var pinchToZoomSelector = 'js-pinch-to-zoom';

var isPassive = function isPassive() {
  var supportsPassiveOption = false;

  try {
    addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassiveOption = true;
      }
    }));
  } catch (e) {
    console.log("Pinch to zoom component error: ".concat(e));
  }

  return supportsPassiveOption;
};

var pinchToZoomConfig = function pinchToZoomConfig() {
  return myScroll = new IScroll("#".concat(pinchToZoomSelector), {
    zoom: true,
    zoomMax: 3,
    scrollX: true,
    scrollY: true,
    mouseWheel: true,
    wheelAction: 'zoom',
    click: true
  });
};

var oddEvenClicksPointerEvents = function oddEvenClicksPointerEvents(pinchToZoomContainer) {
  var evenStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  var oddStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'all';
  return pinchToZoomContainer.style.pointerEvents === evenStyle ? pinchToZoomContainer.style.pointerEvents = oddStyle : pinchToZoomContainer.style.pointerEvents = evenStyle;
};

document.addEventListener("DOMContentLoaded", function () {
  pinchToZoomConfig();
  var pinchToZoomContainer = document.getElementById(pinchToZoomSelector);

  (function onDocumentReadySetPointerEvent() {
    pinchToZoomContainer.style.pointerEvents = 'none';
  })();

  (function enableDisableZoom() {
    var resetZoomButton = document.getElementById('js-reset-zoom');
    resetZoomButton.addEventListener('click', function () {
      myScroll.zoom(0, 0, 1);
      oddEvenClicksPointerEvents(pinchToZoomContainer);
    });
  })();
});
document.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, isPassive() ? {
  capture: false,
  passive: false
} : false);
