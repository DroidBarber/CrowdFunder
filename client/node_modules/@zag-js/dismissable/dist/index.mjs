// ../dom/dist/index.mjs
var runIfFn = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
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
var isRef = (v) => hasProp(v, "current");
function addDomEvent(target, eventName, handler, options) {
  const node = isRef(target) ? target.current : runIfFn(target);
  node == null ? void 0 : node.addEventListener(eventName, handler, options);
  return () => {
    node == null ? void 0 : node.removeEventListener(eventName, handler, options);
  };
}

// src/dismissable-layer.ts
import {
  trackInteractOutside
} from "@zag-js/interact-outside";

// ../core/dist/index.mjs
function warn(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && process.env.NODE_ENV !== "production") {
    console.warn(m);
  }
}

// src/escape-keydown.ts
function trackEscapeKeydown(fn) {
  const handleKeyDown = (event) => {
    if (event.key === "Escape")
      fn == null ? void 0 : fn(event);
  };
  return addDomEvent(document, "keydown", handleKeyDown);
}

// src/layer-stack.ts
var layerStack = {
  layers: [],
  branches: [],
  count() {
    return this.layers.length;
  },
  pointerBlockingLayers() {
    return this.layers.filter((layer) => layer.pointerBlocking);
  },
  topMostPointerBlockingLayer() {
    return [...this.pointerBlockingLayers()].slice(-1)[0];
  },
  hasPointerBlockingLayer() {
    return this.pointerBlockingLayers().length > 0;
  },
  isBelowPointerBlockingLayer(node) {
    var _a;
    const index = this.indexOf(node);
    const highestBlockingIndex = this.topMostPointerBlockingLayer() ? this.indexOf((_a = this.topMostPointerBlockingLayer()) == null ? void 0 : _a.node) : -1;
    return index < highestBlockingIndex;
  },
  isTopMost(node) {
    const layer = this.layers[this.count() - 1];
    return (layer == null ? void 0 : layer.node) === node;
  },
  getNestedLayers(node) {
    return Array.from(this.layers).slice(this.indexOf(node) + 1);
  },
  isInNestedLayer(node, target) {
    return this.getNestedLayers(node).some((layer) => contains(layer.node, target));
  },
  isInBranch(target) {
    return Array.from(this.branches).some((branch) => contains(branch, target));
  },
  add(layer) {
    this.layers.push(layer);
  },
  addBranch(node) {
    this.branches.push(node);
  },
  remove(node) {
    const index = this.indexOf(node);
    if (index < 0)
      return;
    if (index < this.count() - 1) {
      const _layers = this.getNestedLayers(node);
      _layers.forEach((layer) => layer.dismiss());
    }
    this.layers.splice(index, 1);
  },
  removeBranch(node) {
    const index = this.branches.indexOf(node);
    if (index >= 0)
      this.branches.splice(index, 1);
  },
  indexOf(node) {
    return this.layers.findIndex((layer) => layer.node === node);
  },
  dismiss(node) {
    var _a;
    (_a = this.layers[this.indexOf(node)]) == null ? void 0 : _a.dismiss();
  },
  clear() {
    this.remove(this.layers[0].node);
  }
};

// src/pointer-event-outside.ts
var originalBodyPointerEvents;
function assignPointerEventToLayers() {
  layerStack.layers.forEach(({ node }) => {
    node.style.pointerEvents = layerStack.isBelowPointerBlockingLayer(node) ? "none" : "auto";
  });
}
function clearPointerEvent(node) {
  node.style.pointerEvents = "";
}
var DATA_ATTR = "data-inert";
function disablePointerEventsOutside(node) {
  const doc = getDocument(node);
  if (layerStack.hasPointerBlockingLayer() && !doc.body.hasAttribute(DATA_ATTR)) {
    originalBodyPointerEvents = document.body.style.pointerEvents;
    doc.body.style.pointerEvents = "none";
    doc.body.setAttribute(DATA_ATTR, "");
  }
  return () => {
    if (layerStack.hasPointerBlockingLayer())
      return;
    doc.body.style.pointerEvents = originalBodyPointerEvents;
    doc.body.removeAttribute(DATA_ATTR);
    if (doc.body.style.length === 0)
      doc.body.removeAttribute("style");
  };
}

// src/dismissable-layer.ts
function trackDismissableElement(node, options) {
  if (!node) {
    warn("[@zag-js/dismissable] node is `null` or `undefined`");
    return;
  }
  const { onDismiss, pointerBlocking, exclude: excludeContainers, debug } = options;
  const layer = { dismiss: onDismiss, node, pointerBlocking };
  layerStack.add(layer);
  assignPointerEventToLayers();
  function onPointerDownOutside(event) {
    var _a, _b;
    const target = getEventTarget(event.detail.originalEvent);
    if (layerStack.isBelowPointerBlockingLayer(node) || layerStack.isInBranch(target))
      return;
    (_a = options.onPointerDownOutside) == null ? void 0 : _a.call(options, event);
    (_b = options.onInteractOutside) == null ? void 0 : _b.call(options, event);
    if (event.defaultPrevented)
      return;
    if (debug) {
      console.log("onPointerDownOutside:", event.detail.originalEvent);
    }
    onDismiss == null ? void 0 : onDismiss();
  }
  function onFocusOutside(event) {
    var _a, _b;
    const target = getEventTarget(event.detail.originalEvent);
    if (layerStack.isInBranch(target))
      return;
    (_a = options.onFocusOutside) == null ? void 0 : _a.call(options, event);
    (_b = options.onInteractOutside) == null ? void 0 : _b.call(options, event);
    if (event.defaultPrevented)
      return;
    if (debug) {
      console.log("onFocusOutside:", event.detail.originalEvent);
    }
    onDismiss == null ? void 0 : onDismiss();
  }
  function onEscapeKeyDown(event) {
    var _a;
    if (!layerStack.isTopMost(node))
      return;
    (_a = options.onEscapeKeyDown) == null ? void 0 : _a.call(options, event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  }
  function exclude(target) {
    if (!node)
      return false;
    const containers = typeof excludeContainers === "function" ? excludeContainers() : excludeContainers;
    const _containers = Array.isArray(containers) ? containers : [containers];
    return _containers.some((node2) => contains(node2, target)) || layerStack.isInNestedLayer(node, target);
  }
  const cleanups = [
    pointerBlocking ? disablePointerEventsOutside(node) : void 0,
    trackEscapeKeydown(onEscapeKeyDown),
    trackInteractOutside(node, { exclude, onFocusOutside, onPointerDownOutside })
  ];
  return () => {
    layerStack.remove(node);
    assignPointerEventToLayers();
    clearPointerEvent(node);
    cleanups.forEach((fn) => fn == null ? void 0 : fn());
  };
}
export {
  trackDismissableElement
};
