'use strict'

module.exports = (name) => {
    return [
        {
            name: 'config',
            type: 'folder',
            content: [
                {
                    name: 'index.js',
                    type: 'file',
                    tpl: `export const remote =  {
    "COMMON:QUERY:DEMO": 'json!SYS@GET:/path',
}`
                }
            ]

        },
        {
            name: 'var',
            type: 'folder',
            content: [
                {
                    name: 'index.ts',
                    type: 'file',
                    tpl: `import { db } from 'core-dbjs'
class InitState extends db {
    constructor(name, updateView) {
        super(name, updateView);
        //声明所属的表
        this.initTables([])
    }
}
export default InitState`
                }
            ]

        }, {
            name: 'view',
            type: 'folder',
            content: [
                {
                    name: 'index.js',
                    type: 'file',
                    tpl: `
import './index.scss'
import React, { Component } from 'react'
export default class extends Component {
    constructor() {
        super();
    }
    render() {
        return (<div></div>)
    }
}`
                }, {
                    name: 'index.scss',
                    type: 'file',
                    tpl: ``
                }
            ]

        }, {
            name: 'worker',
            type: 'folder',
            content: [
                {
                    name: 'main.js',
                    type: 'file',
                    tpl: `import { Worker , recordRst } from 'core-element'   
export default class extends Worker {}`
                }
            ]
        }, {
            name: 'index.js',
            type: 'file',
            tpl: `import db from './var/index'
import $platform from '../../client'
import main from './worker/main'
import * as config from './config'
import view from './view'
import getElement from 'core-manager'
const name = '${name}'
export default getElement(name, view, db, { main }, $platform, config)`
        }
    ]
}