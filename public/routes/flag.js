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

    processOwn(req,res){        
        const flag = req.params.flag;        
        const name = req.body.desc;  
        const type = req.body._type;  

        console.dir(req.query);
        console.dir(req.body);
        console.dir(req.params);
        
        log(`Flag:processOwn Flag:[${chalk.blue(flag)}] Value:[${chalk.blue(name)}] _type:[${chalk.blue(type)}]`);

        if (type === 'location'){
            const region = req.body.inregions;  
            if (region.length>0 ){
                this.hca.flagSet(flag,region[0]);
            }
        }
        
        res.send({flag:flag,value:name});

    }

    processFhem(req,res){
        //NOTE: https://www.egigeozone.de/manual/default.html 
        const flag = req.params.flag;
        const name = req.query.name;
        const isEnter = (req.query.entry == '1');
        const isExit = (req.query.entry == '0');		

        let value = null;

        if (isEnter){
            value = name;
        }

        if (isExit){
            value ="Unknown";
        }
        
        log(`Flag:processFhem Flag:[${chalk.blue(flag)}] Value:[${chalk.blue(value)}] isEnter:[${chalk.blue(isEnter)}] isExit:[${chalk.blue(isExit)}]`);

        this.hca.flagSet(flag,name);

        res.send({flag:flag,value:value});
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
