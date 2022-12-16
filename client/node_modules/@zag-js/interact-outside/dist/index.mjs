// ../dom/dist/index.mjs
var runIfFn = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return (agent == null ? void 0 : agent.platform) ?? navigator.platform;
}
var pt = (v) => isDom() && v.test(getPlatform());
var isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
var isMac = () => pt(/^Mac/) && !isTouchDevice;
function isDocument(el) {
  return el.nodeType === Node.DOCUMENT_NODE;
}
function isWindow(value) {
  return (value == null ? void 0 : value.toString()) === "[object Window]";
}
function getDocument(el) {
  if (isWindow(el))
    return el.document;
  if (isDocument(el))
    return el;
  return (el == null ? void 0 : el.ownerDocument) ?? document;
}
function getWindow(el) {
  return (el == null ? void 0 : el.ownerDocument.defaultView) ?? window;
}
function getEventTarget(event) {
  var _a;
  return ((_a = event.composedPath) == null ? void 0 : _a.call(event)[0]) ?? event.target;
}
function contains(parent, child) {
  if (!parent)
    return false;
  return parent === child || isHTMLElement(parent) && isHTMLElement(child) && parent.contains(child);
}
function isHTMLElement(v) {
  return typeof v === "object" && (v == null ? void 0 : v.nodeType) === Node.ELEMENT_NODE && typeof (v == null ? void 0 : v.nodeName) === "string";
}
function isVisible(el) {
  if (!isHTMLElement(el))
    return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
var isContextMenuEvent = (e) => {
  return e.button === 2 || isCtrlKey(e) && e.button === 0;
};
var isCtrlKey = (v) => isMac() ? v.metaKey && !v.ctrlKey : v.ctrlKey && !v.metaKey;
function fireCustomEvent(el, type, init) {
  if (!el)
    return;
  const win = getWindow(el);
  const event = new win.CustomEvent(type, init);
  return el.dispatchEvent(event);
}
var focusableSelector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
function isFocusable(element) {
  if (!element)
    return false;
  return element.matches(focusableSelector) && isVisible(element);
}
var isRef = (v) => hasProp(v, "current");
function addDomEvent(target, eventName, handler, options) {
  const node = isRef(target) ? target.current : runIfFn(target);
  node == null ? void 0 : node.addEventListener(eventName, handler, options);
  return () => {
    node == null ? void 0 : node.removeEventListener(eventName, handler, options);
  };
}

// ../core/dist/index.mjs
var callAll = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn == null ? void 0 : fn(...a);
  });
};

// src/index.ts
var POINTER_OUTSIDE_EVENT = "pointerdown.outside";
var FOCUS_OUTSIDE_EVENT = "focus.outside";
function trackInteractOutside(node, options) {
  const { exclude, onFocusOutside, onPointerDownOutside, onInteractOutside } = options;
  if (!node)
    return;
  const doc = getDocument(node);
  const win = getWindow(node);
  function isEventOutside(event) {
    const target = getEventTarget(event);
    if (!(target instanceof win.HTMLElement)) {
      return false;
    }
    if (!contains(doc.documentElement, target)) {
      return false;
    }
    if (contains(node, target)) {
      return false;
    }
    return !(exclude == null ? void 0 : exclude(target));
  }
  let clickHandler;
  function onPointerDown(event) {
    function handler() {
      if (!node || !isEventOutside(event))
        return;
      if (onPointerDownOutside || onInteractOutside) {
        const handler2 = callAll(onPointerDownOutside, onInteractOutside);
        node.addEventListener(POINTER_OUTSIDE_EVENT, handler2, { once: true });
      }
      fireCustomEvent(node, POINTER_OUTSIDE_EVENT, {
        bubbles: false,
        cancelable: true,
        detail: {
          originalEvent: event,
          contextmenu: isContextMenuEvent(event),
          focusable: isFocusable(getEventTarget(event))
        }
      });
    }
    if (event.pointerType === "touch") {
      doc.removeEventListener("click", handler);
      clickHandler = handler;
      doc.addEventListener("click", handler, { once: true });
    } else {
      handler();
    }
  }
  const cleanups = /* @__PURE__ */ new Set();
  const timer = setTimeout(() => {
    cleanups.add(addDomEvent(doc, "pointerdown", onPointerDown, true));
  }, 0);
  function onFocusin(event) {
    if (!node || !isEventOutside(event))
      return;
    if (onFocusOutside || onInteractOutside) {
      const handler = callAll(onFocusOutside, onInteractOutside);
      node.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
    }
    fireCustomEvent(node, FOCUS_OUTSIDE_EVENT, {
      bubbles: false,
      cancelable: true,
      detail: {
        originalEvent: event,
        contextmenu: false,
        focusable: isFocusable(getEventTarget(event))
      }
    });
  }
  cleanups.add(addDomEvent(doc, "focusin", onFocusin, true));
  return () => {
    clearTimeout(timer);
    if (clickHandler)
      doc.removeEventListener("click", clickHandler);
    cleanups.forEach((fn) => fn());
  };
}
export {
  trackInteractOutside
};
