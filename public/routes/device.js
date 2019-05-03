//CONFIG Debugging System =====================================================
const chalk = require('chalk');
const debug = require('debug')
const error = debug('proxy:Device:Error');
const log = debug('proxy:Device');

//INCLUDE Dependancies ========================================================

//Source ======================================================================
class Device{
    constructor (){ 
        /* Use Inversion of control, and injection here*/
        log(`Device:Consructing`);
    }

    processPost(req,res){
        const device = req.params.device;
		const value = req.params.value;
		
        log(`Device:processPost Device:[${chalk.blue(device)}] Value:[${chalk.blue(value)}]`);
        res.send({device:device,value:value});
    }
    processGet(req,res){
        const device = req.params.device;
		
        log(`Device:processPost Device:[${chalk.blue(device)}]`);
        res.send({device:device,value:'100'});
    }
}//END Class

//Export Soruce ===============================================================
module.exports = Device;
