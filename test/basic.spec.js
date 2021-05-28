import Volt from '../src/index'

test('simple basic', () => {
  const text = 'Hello world!'
  const volt = new Volt({
    getTemplate: () => (text)
  })

  expect(volt.fetch('test.volt')).toMatch(text)
})

test('simple with var', () => {
  const volt = new Volt({
    getTemplate: () => ('Hello {{ name }}!')
  })

  expect(volt.fetch('test.volt', {name: 'Arnavi'})).toMatch('Hello Arnavi!')
})
