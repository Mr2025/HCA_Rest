//CONFIG Debugging System =====================================================
const chalk = require('chalk');
const debug = require('debug')
const error = debug('proxy:Device:Error');
const log = debug('proxy:Device');

//INCLUDE Dependancies ========================================================

//Source ======================================================================
class Device{
    constructor (hca){ 
        /* Use Inversion of control, and injection here*/
        log(`Device:Consructing`);
        this.hca = hca;
    }

    processPost(req,res){
        const device = req.params.device;
		const value = req.params.value;
        
        log(`Device:processPost Device:[${chalk.blue(device)}] Value:[${chalk.blue(value)}]`);
        
        this.hca.deviceSet(device,value);

        res.send({device:device,value:value});
    }
    processGet(req,res){
        const device = req.params.device;
		
        log(`Device:processGet Device:[${chalk.blue(device)}]`);
        
        res.send({
            device:device,
            value:this.hca.DeviceGet(device)
        });
    }
}//END Class

//Export Soruce ===============================================================
module.exports = Device;
