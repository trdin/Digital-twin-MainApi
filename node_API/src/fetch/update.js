const mjob = require('./mjob');

module.exports = {
    update: function () {
        console.log('in update')
        mjob.update()
    }
}
