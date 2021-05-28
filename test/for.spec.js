import Volt from '../src/index'

test('for loop', () => {
  const text = '--{% for item in items %}+{{ item }}+{% endfor %}--'
  const volt = new Volt({
    getTemplate: () => (text)
  })

  expect(volt.fetch('test.volt', {
    items: ['pallavi', 'arnavi']
  })).toMatch('--+pallavi++arnavi+--')
})

test('for loop recursive', () => {
  const text = '--{% for item in items %}+{% for k in item %} {{ k }} {% endfor %}+{% endfor %}--'
  const volt = new Volt({
    getTemplate: () => (text)
  })

  expect(volt.fetch('test.volt', {
    items: [['pallavi'], ['arnavi']]
  })).toMatch('--+ pallavi ++ arnavi +--')
})
