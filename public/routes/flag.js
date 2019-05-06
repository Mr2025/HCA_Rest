//CONFIG Debugging System =====================================================
const chalk = require('chalk');
const debug = require('debug')
const error = debug('proxy:Flag:Error');
const log = debug('proxy:Flag');

//INCLUDE Dependancies ========================================================

//Source ======================================================================
class Flag{
    constructor (hca){ 
        /* Use Inversion of control, and injection here*/
        log(`Flag:Consructing`);
        this.hca = hca;
        //console.dir(hca);
    }

    processPost(req,res){
        const flag = req.params.flag;
		const value = req.params.value;        

        log(`Flag:processPost Flag:[${chalk.blue(flag)}] Value:[${chalk.blue(value)}]`);
        
        this.hca.flagSet(flag,value);

        res.send({flag:flag,value:value});
    }
    processGet(req,res){
        const flag = req.params.flag;
		
        log(`Flag:processGet Flag:[${chalk.blue(flag)}]`);        
        res.send({
            flag:flag,
            value:this.hca.flagGet(flag)
        });
    }
}//END Class

//Export Soruce ===============================================================
module.exports = Flag;
