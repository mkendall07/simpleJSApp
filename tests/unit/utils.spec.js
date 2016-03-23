
describe('utils tests', function() {

    var obj_string = 's',
    obj_number = 1,
    obj_object = {},
    obj_array = [],
    obj_function = function(){};

    var type_string = 'String',
    type_number = 'Number',
    type_object = 'Object',
    type_array = 'Array',
    type_function = 'Function';

    before(function() {
        utils = require('../../src/utils.js');
        assert = require('chai').assert;
    });

    describe('utils.isA', function() {

        it('should return true with string object', function() {
            var output = utils.isA(obj_string,type_string);
            assert.deepEqual(output,true);
        });

        it('should return false with object', function() {
            var output = utils.isA(obj_object,type_string);
            assert.deepEqual(output,false);
        });

        it('should return true with object', function() {
            var output = utils.isA(obj_object,type_object);
            assert.deepEqual(output,true);
        });

        it('should return false with array object', function() {
            var output = utils.isA(obj_array,type_object);
            assert.deepEqual(output,false);
        });

        it('should return true with array object', function() {
            var output = utils.isA(obj_array,type_array);
            assert.deepEqual(output,true);
        });

        it('should return false with array object', function() {
            var output = utils.isA(obj_array,type_function);
            assert.deepEqual(output,false);
        });

        it('should return true with function', function() {
            var output = utils.isA(obj_function,type_function);
            assert.deepEqual(output,true);
        });

        it('should return false with number', function() {
            var output = utils.isA(obj_function,type_number);
            assert.deepEqual(output,false);
        });

        it('should return true with number', function() {
            var output = utils.isA(obj_number,type_number);
            assert.deepEqual(output,true);
        });
    });

    describe('utils.isFn', function() {
        it('should return true with input function',function(){
            var output = utils.isFn(obj_function);
            assert.deepEqual(output,true);
        });

        it('should return false with input string',function(){
            var output = utils.isFn(obj_string);
            assert.deepEqual(output,false);
        });

        it('should return false with input number',function(){
            var output = utils.isFn(obj_number);
            assert.deepEqual(output,false);
        });

        it('should return false with input Array',function(){
            var output = utils.isFn(obj_array);
            assert.deepEqual(output,false);
        });

         it('should return false with input object',function(){
            var output = utils.isFn(obj_object);
            assert.deepEqual(output,false);
        });
    });

    describe('utils.isStr',function(){
        it('should return true with input string',function(){
            var output = utils.isStr(obj_string);
            assert.deepEqual(output,true);
        });

        it('should return false with input number',function(){
            var output = utils.isStr(obj_number);
            assert.deepEqual(output,false);
        });

        it('should return false with input object',function(){
            var output = utils.isStr(obj_object);
            assert.deepEqual(output,false);
        });

        it('should return false with input array',function(){
            var output = utils.isStr(obj_array);
            assert.deepEqual(output,false);
        });

        it('should return false with input function',function(){
            var output = utils.isStr(obj_function);
            assert.deepEqual(output,false);
        });

    });

    describe('utils.isArray',function(){
        it('should return false with input string',function(){
            var output = utils.isArray(obj_string);
            assert.deepEqual(output,false);
        });

        it('should return false with input number',function(){
            var output = utils.isArray(obj_number);
            assert.deepEqual(output,false);
        });

        it('should return false with input object',function(){
            var output = utils.isArray(obj_object);
            assert.deepEqual(output,false);
        });

        it('should return true with input array',function(){
            var output = utils.isArray(obj_array);
            assert.deepEqual(output,true);
        });

        it('should return false with input function',function(){
            var output = utils.isArray(obj_function);
            assert.deepEqual(output,false);
        });

    });

    describe('utils.isNumber',function(){
        it('should return false with input string',function(){
            var output = utils.isNumber(obj_string);
            assert.deepEqual(output,false);
        });

        it('should return true with input number',function(){
            var output = utils.isNumber(obj_number);
            assert.deepEqual(output,true);
        });

        it('should return false with input object',function(){
            var output = utils.isNumber(obj_object);
            assert.deepEqual(output,false);
        });

        it('should return false with input array',function(){
            var output = utils.isNumber(obj_array);
            assert.deepEqual(output,false);
        });

        it('should return false with input function',function(){
            var output = utils.isNumber(obj_function);
            assert.deepEqual(output,false);
        });

    });

    describe('utils.isEmpty',function(){
        it('should return true with empty object',function(){
            var output = utils.isEmpty(obj_object);
            assert.deepEqual(output,true);
        });

        it('should return false with non-empty object',function(){
            var obj = {'a':'b'};
            var output = utils.isEmpty(obj);
            assert.deepEqual(output,false);
        });

        it('should return false with null',function(){
            var obj = null;
            var output = utils.isEmpty(obj);
            assert.deepEqual(output,true);
        });
    });

    describe('utils.hasOwn',function(){
        it('should return true with existing property',function(){
            var obj = {
                con : '123'
            };

            var output = utils.hasOwn(obj,'con');
            assert.isTrue(output);

        });

        it('should return false with non existing property',function(){
            var obj = {
                con : '123'
            };

            var output = utils.hasOwn(obj,'con2');
            assert.isFalse(output);
        });
    });

    describe('utils.getParameterByName',function(){
        it('should return empty string with no parameter',function(){
            var output = utils.getParameterByName('test');
            assert.equal(output,'');
        });
    });

    describe('utils.contains',function(){
        it('should return true if the input string contains in the input obj',function(){
            var output = utils.contains('123','1');
            assert.deepEqual(output,true);
        });

        it('should return false if the input string do not contain in the input obj',function(){
            var output = utils.contains('234','1');
            assert.deepEqual(output,false);
        });

        it('should return false if the input string is empty', function() {
            var output = utils.contains();
            assert.ok(!output, 'an empty string returns false');
        });
    });

    describe('utils._each',function(){

        it('',function(){
            var obj = {
                a:'1',
                b:'2'
            };

            utils._each(obj,function(v,k,o){
                if(k==='a'){
                    assert.equal(v,'1');
                }else{
                    assert.equal(v,'2');
                }
            })
        });

        it('',function(){
            var obj = ['1','2'];

            utils._each(obj,function(v,k){

                if(k===0){
                    assert.equal(v,'1');
                }else{
                    assert.equal(v,'2');
                }
            })
        });
    });

    describe('utils.getUUID',function(){
        it('should return uuid',function(){
            var output = utils.getUUID();
            assert.isNotNull(output,'getUUID');
        });
    });
});
