//Testing Framework ===========================================================
const chai = require('chai');
const sinon = require('sinon');
chai.should(); //install should operators.
const expect = chai.expect;

//Dependancies ================================================================
//NONE

//Subject Under Test ==========================================================
const Sut = require('../public/routes/device.js');

//Begin Tests =================================================================
describe('Device ', function(){
    it('Get Device Status');
    it('Set Device to On');
    it('Set Device to Off');
    it('Set Device to Dim');
});

//Test Data ===================================================================
//None