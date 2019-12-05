const init = require('./MySQL/seeds/onStart');

init();

module.exports = { init: init };