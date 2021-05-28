/**
 * Example show Volt Js can be used in Node.js
 */

const fs = require('fs')
const path = require('path')
const Volt = require('@techlavi/voltjs/node')

Volt.getTemplate = function (name) {
  return fs.readFileSync(path.normalize(`${__dirname}/${name}`), {encoding: 'utf-8'})
}

const voltJs = new Volt()

console.log(voltJs.fetch('demo.volt', {name: "Umakant Patil"}))
