import types from '../types';

export default function (opts) {
  var type = types[opts.type];
  function CustomElement () {
    var element = type.create(opts);

    // Ensure the definition prototype is up to date with the element's
    // prototype. This ensures that overwriting the element prototype still
    // works.
    opts.prototype = CustomElement.prototype;

    // Initialises. This will always exist.
    opts.prototype.createdCallback.call(element);

    return element;
  }

  // This allows modifications to the element prototype propagate to the
  // definition prototype.
  CustomElement.prototype = opts.prototype;

  // Ensure the prototype has a non-enumerable constructor.
  Object.defineProperty(CustomElement.prototype, 'constructor', {
    enumerable: false,
    value: CustomElement
  });

  return CustomElement;
}