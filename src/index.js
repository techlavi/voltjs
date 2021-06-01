import {isBrowser, isNode} from 'browser-or-node'
import sprintf from 'locutus/php/strings/sprintf'
import urlencode from 'locutus/php/url/urlencode'
import addslashes from 'locutus/php/strings/addslashes'
import ltrim from 'locutus/php/strings/ltrim'
import rtrim from 'locutus/php/strings/rtrim'
import trim from 'locutus/php/strings/trim'
import count from 'locutus/php/array/count'
import nl2br from 'locutus/php/strings/nl2br'
import stripslashes from 'locutus/php/strings/stripslashes'
import strip_tags from 'locutus/php/strings/strip_tags'
import voltParser from './lib/parser'

function Volt(options = {}) {
  let volt = new Object()

  let getTemplate = options.getTemplate ? options.getTemplate : null

  if (Volt.getTemplate && !getTemplate) {
    getTemplate = Volt.getTemplate
  } else if (!getTemplate) {
    getTemplate = (name) => {
      throw new Error('no getTemplate function defined.')
    }
  }

  volt.compile = voltParser(getTemplate)
  volt.render = (compiled, data) => {
    let keys = [];
    let values = [];
    for (var i in data) {
      keys.push(i)
      values.push(data[i])
    }
    const output = new Function(keys, compiled)
    return output(...values)
  }

  volt.fetch = (tpl, data) => {
    const compiled = volt.compile(tpl)
    return volt.render(compiled, data)
  }

  return volt
}

((function () {
  'use strict'

  const $VoltJsFilters = {}

  $VoltJsFilters.capitalize = (s) => {
    return (s + '')
    .replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase()
    })
  }

  $VoltJsFilters.trim = (s) => (`${s}`.trim())

  $VoltJsFilters.abs = (s) => (Math.abs(s))

  $VoltJsFilters.convert_encoding = ((from, to) => ((s) => (s)))

  $VoltJsFilters.default = (defaultValue) => (
    (s) => {
      if (!s) {
        return defaultValue
      }
      return s
    }
  )

  $VoltJsFilters.e = $VoltJsFilters.escape = (s) => (
    `${s}`.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  )

  $VoltJsFilters.escape_attr = (s) => (
    `${s}`.replace(/[\u00A0-\u9999<>\&\/\\\'\"]/g, (i) => (
      `&#x${i.charCodeAt(0).toString(16)};`
    ))
  )

  $VoltJsFilters.escape_css = (s) => (
    `${s}`.replace(/[\u00A0-\u9999<>\&\/\\\'\"]/g, (i) => (
      `\\${i.charCodeAt(0).toString(16)} `
    ))
  )

  $VoltJsFilters.escape_js = (s) => (
    `${s}`.replace(/[\u00A0-\u9999<>\&\/\\\'\"]/g, (i) => (
      `\\x${i.charCodeAt(0).toString(16)}`
    ))
  )

  $VoltJsFilters.format = (...values) => (
    (s) => {
      values.unshift(s)
      return sprintf(...values)
    }
  )

  $VoltJsFilters.left_trim = (s) => (
    ltrim(`${s}`)
  )

  $VoltJsFilters.right_trim = (s) => (
    rtrim(`${s}`)
  )

  $VoltJsFilters.length = (s) => (
    count(s)
  )

  $VoltJsFilters.lower = (s) => (
    `${s}`.toLowerCase()
  )

  $VoltJsFilters.nl2br = (s) => (
    nl2br(`${s}`)
  )

  $VoltJsFilters.slashes = (s) => (
    addslashes(`${s}`)
  )

  $VoltJsFilters.stripslashes = (s) => (
    stripslashes(`${s}`)
  )

  $VoltJsFilters.striptags = (s) => (
    strip_tags(`${s}`)
  )

  $VoltJsFilters.trim = (s) => (
    trim(`${s}`)
  )

  $VoltJsFilters.url_encode = (s) => (
    urlencode(`${s}`)
  )

  $VoltJsFilters.upper = (s) => (
    `${s}`.toUpperCase()
  )

  if (isNode && typeof global.$VoltJsFilters === 'undefined') {
    global.$VoltJsFilters = $VoltJsFilters
  } else if (isBrowser && typeof window.$VoltJsFilters === 'undefined') {
    window.$VoltJsFilters = $VoltJsFilters
  }
})())

export default Volt
