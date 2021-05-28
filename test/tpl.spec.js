import Volt from '../src/index'

test('simple compiled tpl', () => {
  const text = 'Hello world!'
  const volt = new Volt({
    getTemplate: () => (text)
  })

  expect(volt.compile('test.volt')).toMatch(text)
})


test('simple compiled tpl with var', () => {
  const volt = new Volt({
    getTemplate: () => ('Hello {{ name }}!')
  })

  expect(volt.compile('test.volt')).toMatch('try{ var $VOLT_JS_TXT = \'\'; $VOLT_JS_TXT += \"Hello \";$VOLT_JS_TXT += name;$VOLT_JS_TXT += \"!\"; return $VOLT_JS_TXT; }catch(error){throw new Error(error.message);}')
})
