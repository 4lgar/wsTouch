import WsTouch from './wsTouch.js';

const canevas = document.getElementById('sketchpad');

var wsTouch = new WsTouch("192.168.1.117", 8001, canevas);