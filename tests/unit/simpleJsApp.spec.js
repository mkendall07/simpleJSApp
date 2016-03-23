
describe('simple js app tests', function() {
    var assert,constants;

    before(function() {
        assert = require('chai').assert;
        constants = require('../../src/constants.json');
        require('../../src/simpleJsApp');

    });


    it('simpleJsApp processes commands', function() {

        var content = 'foobar';
        var result = null;

        simpleJsApp.que.push(function(){
          result = simpleJsApp.echoMyContent(content);
        });




        assert.equal(content,result);

    });
});
