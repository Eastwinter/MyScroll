/**
 * Created by shuyi.wu on 2015/4/1.
 */
/**
 * use: polyfill standard requestAnimationFrame and cancelAnimationFrame
 */
import * as vendorPrefix from './vendorPrefix';
var win = window;
var lastTime = 0;
/**
 * get standard requestAnimationFrame
 */
win.requestAnimationFrame = win.requestAnimationFrame ||
win[vendorPrefix.js + 'RequestAnimationFrame'];
/**
 * get standard cancelAnimationFrame
 */
win.cancelAnimationFrame = win.cancelAnimationFrame ||
win[vendorPrefix.js + 'CancelAnimationFrame'] ||
win[vendorPrefix.js + 'CancelRequestAnimationFrame'];
/**
 * polyfill requestAnimationFrame
 * @param callback
 * @returns {number}
 */
var polyfillRequestAnimationFrame = function requestAnimationFrame(callback) {
    'use strict';
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = win.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
    lastTime = currTime + timeToCall;
    return id;
};
/**
 * polyfill cancelAnimationFrame
 * @param id {number} requestAnimationFrame id
 */
var polyfillCancelAnimationFrame = function cancelAnimationFrame(id) {
    'use strict';
    clearTimeout(id);
};

if (!win.requestAnimationFrame) {
    win.requestAnimationFrame = polyfillRequestAnimationFrame;
}
if (!win.cancelAnimationFrame) {
    win.cancelAnimationFrame = polyfillCancelAnimationFrame;
}
/**
 * abbreviation
 */
win.requestAnimFrame = win.requestAnimationFrame;