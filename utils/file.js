'use strict'

const fs = require('fs')
const co = require('co')

exports = module.exports = {
    // 文件是否存在
    stat(file) {
        return new Promise(resolve => fs.stat(file, (e, stat) => resolve(e ? null : stat)))
    },
    // 读取
    read(file) {
        return co(function* () {
            const stat = yield exports.stat(file)
            if (!stat || stat && !stat.isFile) {
                return null
            }
            return yield new Promise(resolve => {
                let data = ''
                const readerStream = fs.createReadStream(file)
                readerStream.setEncoding('UTF8')
                readerStream.on('data', chunk => data += chunk);
                readerStream.on('end', () => resolve(data))
                readerStream.on('error', e => resolve(null))
            })
        })
    },
    // 写入
    write(file, data) {
        // console.log({file, data})
        return new Promise(resolve => {
            const writerStream = fs.createWriteStream(file)
            writerStream.write(data, 'UTF8')
            writerStream.end()
            writerStream.on('finish', () => resolve(true))
            writerStream.on('error', e => resolve(false))
        })
    },
    mkdir(path) {
        return new Promise(resolve => {
            fs.mkdir(path, (err) => {
                resolve(err);
            });
        })

    }
    ,
    readdir(filePath) {
        //根据文件路径读取文件，返回文件列表
        return new Promise(resolve => {
            var readDir = fs.readdirSync(filePath);
            console.log(readDir);
            resolve(readDir)
        })
    }
}