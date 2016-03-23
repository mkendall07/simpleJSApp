/** @module simpleJsApp */

// if simpleJsApp already exists in global dodcument scope, use it, if not, create the object
window.simpleJsApp = (window.simpleJsApp || {});
window.simpleJsApp.que = window.simpleJsApp.que || [];

/**
 * Command queue that functions will execute once prebid.js is loaded
 * @param  {function} cmd Annoymous function to execute
 * @alias module:simpleJsApp.que.push
 */
simpleJsApp.que.push = function (cmd) {
  if (typeof cmd === 'function') {
    try {
      cmd.call();
    } catch (e) {
      console.log('Error processing command :' + e.message);
    }
  } else {
    utils.logError('Commands written into simpleJsApp.que.push must wrapped in a function');
  }
};

simpleJsApp.echoMyContent = function(content){
  return content;
};

function processQue() {
  for (var i = 0; i < simpleJsApp.que.length; i++) {
    if (typeof simpleJsApp.que[i].called === 'undefined') {
      try {
        simpleJsApp.que[i].call();
        simpleJsApp.que[i].called = true;
      }
      catch (e) {
        console.log('Error processing command :', 'prebid.js', e);
      }
    }
  }
}

/*
 *   Main method entry point method
 */
function init() {
  //do something
}

processQue();
