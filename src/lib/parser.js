
const ldelim = '{'
const rdelim = '}'

const voltParser = (getTemplate) => {

  const buildInConditions = {
    if: (params) => {
      return `if (${params}) {`
    },
    else: () => {
      return `} else {`
    },
    elseif: (params) => {
      return `} else if (${params}) {`
    },
    endif: () => {
      return '}'
    },
    for: (params) => {
      const args = params.match(/(.*)\sin\s(.*)$/)
      buildInConditions.for.i += 1
      return `for (var i${buildInConditions.for.i} in ${args[2]}) { if (Object.prototype.hasOwnProperty.call(${args[2]}, i${buildInConditions.for.i})) { var ${args[1]} = ${args[2]}[i${buildInConditions.for.i}]; `;
    },
    endfor: () => {
      return '}}';
    }
  }

  // i for iterations init.
  buildInConditions.for.i = 0;

  const findTag = (s, expression = '') => {
    const expressionAny = /^\s*(.+)\s*$/i
    const expressionTag = expression ? new RegExp('^\\s*(' + expression + ')\\s*$', 'i') : expressionAny
    let openCount = 0
    let offset = 0
    let i
    let sTag
    let found

    for (i = 0; i < s.length; ++i) {
      if (s.substr(i, ldelim.length) === ldelim) {
        if ((i + 1) < s.length && s.substr((i + 1), 1).match(/\s/)) {
          continue
        }
        if (!openCount) {
          s = s.slice(i)
          offset += parseInt(i)
          i = 0
        }
        ++openCount
      } else if (s.substr(i, rdelim.length) === rdelim) {
        if ((i - 1) >= 0 && s.substr((i - 1), 1).match(/\s/)) {
          continue
        }
        if (!--openCount) {
          sTag = s.slice(ldelim.length, i).replace(/[\r\n]/g, ' ')
          found = sTag.match(expressionTag)
          if (found) {
            found.index = offset
            found[0] = s.slice(0, (i + rdelim.length))
            return found
          }
        }
        if (openCount < 0) {
          // Ignore any number of unmatched right delimiters.
          openCount = 0
        }
      }
    }
    return null
  }

  const applyPacking = (txt) => {
    if (txt.length > 0) {
        return `$VOLT_JS_TXT += ${JSON.stringify(txt)};`
    }
    return ''
  }

  const getTree = (tplRaw) => {
    let tree = []
    let tpl = tplRaw

    while (true) {
      const tag = findTag(tpl)
      if (tag) {
        // Start of the template before tag as text
        tree.push(applyPacking(tpl.slice(0, tag.index)))
      } else {
        break
      }
      tpl = tpl.slice((tag.index + tag[0].length))

      const tagContentComment = tag[1].match(/^#(.*)#$/)
      const tagContentOutput = tag[1].match(/^{(.*)}$/)
      const tagContentCond = tag[1].match(/^%-(.*)-%$/)
      const tagContentFunc = tag[1].match(/^%(.*)%$/)
      if (tagContentComment) {
        // It is a comment.
        tree.push(`/* ${tagContentComment[1].trim()} */`)
      } else if (tagContentOutput) {
        // It is output variable
        tree.push(`$VOLT_JS_TXT += ${tagContentOutput[1].trim()};`)
      } else if (tagContentCond) {
        // One of the conditions.
        const innerTag = tagContentCond[1].match(/^\s*(\w+)(.*)$/)

        if (innerTag) {
          const funcName = innerTag[1]
          const paramStr = (innerTag.length > 2) ? innerTag[2].replace(/^\s+|\s+$/g, '') : ''

          if (funcName in buildInConditions) {
            if (paramStr) {
              tree.push(buildInConditions[funcName](paramStr))
            } else {
              tree.push(buildInConditions[funcName]())
            }
          }
        }
      } else if (tagContentFunc) {
        // Functions may be?
        const innerTag = tagContentFunc[1].match(/^\s*(\w+)(.*)$/)
        if (innerTag) {
          const funcName = innerTag[1]
          const paramStr = (innerTag.length > 2) ? innerTag[2].replace(/^\s+|\s+$/g, '') : ''

          if (funcName in buildInConditions) {
            if (paramStr) {
              tree.push(buildInConditions[funcName](paramStr))
            } else {
              tree.push(buildInConditions[funcName]())
            }
          }
        }
      }
    }

    if (tpl) {
      // Rest of the template after last tag as text
      tree.push(applyPacking(tpl))
    }
    return tree
  }

  return (file) => {
    const contents = getTemplate(file)
    const tree = getTree(contents)

    return `try{ var $VOLT_JS_TXT = ''; ${tree.join('')} return $VOLT_JS_TXT; }catch(error){throw new Error(error.message);}`
  }
}

export default voltParser
