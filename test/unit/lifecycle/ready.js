import afterMutations from '../../lib/after-mutations';
import { define, symbols } from '../../../src/index';
import helperElement from '../../lib/element';

describe('lifecycle/ready', function () {
  let tag;

  beforeEach(function () {
    tag = helperElement();
    define(tag.safe, {
      ready: function (elem) {
        elem.innerHTML = 'templated';
      },
      render () {}
    });
  });

  it('should be called', function (done) {
    const el = tag.create();

    afterMutations(
      () => expect(el.textContent).to.equal('templated'),
      done
    );
  });

  it('should be called after created is called', function () {
    const { safe: tagName } = helperElement('my-el');
    const MyEl = define(tagName, {
      created (elem) {
        elem.created = true;
      },
      ready (elem) {
        expect(elem.created).to.equal(true);
      }
    });

    new MyEl();
  });

  it('should have access to the extended prototype', function () {
    const { safe: tagName } = helperElement('my-el');
    const MyEl = define(tagName, {
      prototype: {
        myfunc () {}
      },
      ready (elem) {
        expect(elem.myfunc).to.be.a('function');
      }
    });

    new MyEl();
  });
});
