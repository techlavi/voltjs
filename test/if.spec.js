import Volt from '../src/index'

test('simple if', () => {
  const tpl = '--{%- if data === true -%}works{%- endif -%}--'

  const volt = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt.fetch('test.volt', {data: true})).toMatch('--works--')

  const volt2 = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt2.fetch('test.volt', {data: false})).toMatch('----')
})

test('simple if else', () => {
  const tpl = '--{%- if data === true -%}if{%- else -%}else{%- endif -%}--'

  let volt = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt.fetch('test.volt', {data: true})).toMatch('--if--')

  const volt2 = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt2.fetch('test.volt', {data: false})).toMatch('--else--')
})

test('simple if elseif', () => {
  const tpl = '--{%- if data === 1 -%}if{%- elseif data === 2 -%}elseif{%- endif -%}--'

  let volt = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt.fetch('test.volt', {data: 1})).toMatch('--if--')

  const volt2 = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt2.fetch('test.volt', {data: 2})).toMatch('--elseif--')
})

test('simple if elseif else', () => {
  const tpl = '--{%- if data === 1 -%}if{%- elseif data === 2 -%}elseif{%- else -%}else{%- endif -%}--'

  let volt = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt.fetch('test.volt', {data: 1})).toMatch('--if--')

  const volt2 = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt2.fetch('test.volt', {data: 2})).toMatch('--elseif--')

  const volt3 = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt3.fetch('test.volt', {data: 3})).toMatch('--else--')
})

test('nested if', () => {
  const tpl = '--{%- if data -%}if {%- if data2 -%}nested-if{%- endif -%}{%- endif -%}--'

  let volt = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt.fetch('test.volt', {data: true, data2: true})).toMatch('--if nested-if--')


  const volt2 = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt2.fetch('test.volt', {data: true, data2: false})).toMatch('--if --')

  const volt3 = new Volt({
    getTemplate: () => (tpl)
  })

  expect(volt3.fetch('test.volt', {data: false, data2: false})).toMatch('----')
})
