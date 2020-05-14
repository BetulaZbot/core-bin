'use strict'

const Command = require('..')
const path = require('path')
const File = require('../utils/file')

module.exports = class CreateCommand extends Command {
    constructor(rawArgv) {
        super(rawArgv);
    }
    * createTpl(cwd, mTpls) {
        let orgPath = cwd;
        for (let i = 0; i < mTpls.length; i++) {
            let tpl = mTpls[i];
            let mPath = path.join(orgPath, tpl.name)
            console.log("create:", mPath, tpl.type)
            if (tpl.type == 'file') {
                yield File.write(mPath, tpl.tpl)
            } else if (tpl.type == 'folder') {
                yield File.mkdir(mPath)
                yield this.createTpl(mPath, tpl.content)
            }
        }
    }
    * run({ argv, cwd }) {
        let { name, dir, type } = argv;
        const configPath = path.join(cwd, dir, 'components', name)
        if (yield File.stat(configPath)) {
            console.warn('the component is already created')
            return process.exit(0)
        }
        console.log("create:", configPath)
        //建立文件夹
        let info = yield File.mkdir(configPath)
        info && console.log("create err:", info)
        //建立模组文件
        const getTpl = require(`../tpl/tpl${type ? `.${type}` : ''}`)
        let tpl = getTpl(name);
        yield this.createTpl(configPath, tpl)
        //遍历文件夹
        //调用文件遍历方法
        let components = yield File.readdir(path.join(cwd, dir, 'components'))
        // //文件遍历方法
        // console.log(components,path.join(cwd, 'client/config/index.js'))
        yield File.write(path.join(cwd, dir, 'client/config/index.js'), `
export default {
    //平台相关配置
    PLATFORM: {
        //包路径
        packages: {
            ${components.map((name) => {
            return (`"${name}": () => import("../../components/${name}")`)
        })}
        }
    },
        
}`)
        return "successfully"
    }
}
