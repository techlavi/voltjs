import voltParser from './lib/parser'

function Volt(options) {
  let volt = new Object()

  let getTemplate = options.getTemplate ? options.getTemplate : null

  if (volt.getTemplate && !getTemplate) {
    getTemplate = volt.getTemplate
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

export default Volt
