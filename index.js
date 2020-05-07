'use strict'

const Command = require('common-bin');
const pkg = require('./package.json');
const path = require('path')



// require('colors')

class MainCommand extends Command {
    constructor(rawArgv){
        super(rawArgv);
        this.usage = 'Usage: core-cli <command> [options]';
        this.load(path.join(__dirname, 'lib'));
        this.yargs.alias('V', 'version');
        this.name = 'core-cli'
    }
    get version(){
        return pkg.version 
    }

}
 
module.exports = MainCommand