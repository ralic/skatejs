import afterMutations from '../lib/after-mutations';
import { define, ready, vdom, symbols } from '../../src/index';

describe('namded slots', function () {
  let called;
  
  it('should render', function () {
    called = [];

    define('atlas-animation', {
      render(elem) {
        called.push('render');
        vdom.div({}, () => {
          vdom.create('slot');
        });
      },
    });

    const hello = define('x-hello', {
      render() {
        vdom.div({}, () => {
          vdom.create('atlas-animation', {}, () => {
            vdom.div({}, 'Bounce');
          });
        });
      },
    });


    const helloEleme = new hello();

    const ch2 = helloEleme[symbols.shadowRoot].firstElementChild;

    afterMutations(() => {
      expect(["<atlas-animation defined=\"\"><div>Bounce</div></atlas-animation>", "<atlas-animation defined><div>Bounce</div></atlas-animation>"].indexOf(ch2.innerHTML)>-1).to.equal(true);
      expect(ch2.textContent).to.equal("Bounce");
      expect(ch2.textContent).to.equal(ch2.__textContent);

      expect(ch2.__innerHTML).not.to.equal(`<atlas-animation defined=\"\"><${symbols.shadowRoot}><div><content></content></div></${symbols.shadowRoot}></atlas-animation>`);
      expect(ch2.__innerHTML).not.to.equal(`<atlas-animation defined><${symbols.shadowRoot}><div><content></content></div></${symbols.shadowRoot}></atlas-animation>`);

      // not sure about this one, this is how it looks in browser without namedslots
     // expect([`<atlas-animation defined><${symbols.shadowRoot}><div><content></content></div><div>Bounce</div></${symbols.shadowRoot}></atlas-animation>`, `<atlas-animation defined=\"\"><${symbols.shadowRoot}><div><content></content></div><div>Bounce</div></${symbols.shadowRoot}></atlas-animation>`].indexOf(ch2.__innerHTML)>-1).to.equal(true);
    });

  })
});