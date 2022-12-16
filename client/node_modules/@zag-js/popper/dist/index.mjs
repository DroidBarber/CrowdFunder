// src/get-placement.ts
import { arrow, computePosition, flip, offset, shift, size } from "@floating-ui/dom";

// ../core/dist/index.mjs
var callAll = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn == null ? void 0 : fn(...a);
  });
};
var isBoolean = (v) => v === true || v === false;

// src/auto-update.ts
import { getOverflowAncestors } from "@floating-ui/dom";

// ../dom/dist/index.mjs
var runIfFn = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
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
function getObservedElements() {
  ;
  globalThis.__rectObserverMap__ = globalThis.__rectObserverMap__ || /* @__PURE__ */ new Map();
  return globalThis.__rectObserverMap__;
}
function observeElementRect(el, fn) {
  const observedElements = getObservedElements();
  const data = observedElements.get(el);
  if (!data) {
    observedElements.set(el, { rect: {}, callbacks: [fn] });
    if (observedElements.size === 1) {
      rafId = requestAnimationFrame(runLoop);
    }
  } else {
    data.callbacks.push(fn);
    fn(el.getBoundingClientRect());
  }
  return function unobserve() {
    const data2 = observedElements.get(el);
    if (!data2)
      return;
    const index = data2.callbacks.indexOf(fn);
    if (index > -1) {
      data2.callbacks.splice(index, 1);
    }
    if (data2.callbacks.length === 0) {
      observedElements.delete(el);
      if (observedElements.size === 0) {
        cancelAnimationFrame(rafId);
      }
    }
  };
}
var rafId;
function runLoop() {
  const observedElements = getObservedElements();
  const changedRectsData = [];
  observedElements.forEach((data, element) => {
    const newRect = element.getBoundingClientRect();
    if (!isEqual(data.rect, newRect)) {
      data.rect = newRect;
      changedRectsData.push(data);
    }
  });
  changedRectsData.forEach((data) => {
    data.callbacks.forEach((callback) => callback(data.rect));
  });
  rafId = requestAnimationFrame(runLoop);
}
function isEqual(rect1, rect2) {
  return rect1.width === rect2.width && rect1.height === rect2.height && rect1.top === rect2.top && rect1.right === rect2.right && rect1.bottom === rect2.bottom && rect1.left === rect2.left;
}

// src/auto-update.ts
function resolveOptions(option) {
  const bool = isBoolean(option);
  return {
    ancestorResize: bool ? option : option.ancestorResize ?? true,
    ancestorScroll: bool ? option : option.ancestorScroll ?? true,
    referenceResize: bool ? option : option.referenceResize ?? true
  };
}
function autoUpdate(reference, floating, update, options = false) {
  const { ancestorScroll, ancestorResize, referenceResize } = resolveOptions(options);
  const useAncestors = ancestorScroll || ancestorResize;
  const ancestors = [];
  if (useAncestors && isHTMLElement(reference)) {
    ancestors.push(...getOverflowAncestors(reference));
  }
  function addResizeListeners() {
    let cleanups = [observeElementRect(floating, update)];
    if (referenceResize && isHTMLElement(reference)) {
      cleanups.push(observeElementRect(reference, update));
    }
    cleanups.push(callAll(...ancestors.map((el) => addDomEvent(el, "resize", update))));
    return () => cleanups.forEach((fn) => fn());
  }
  function addScrollListeners() {
    return callAll(...ancestors.map((el) => addDomEvent(el, "scroll", update, { passive: true })));
  }
  return callAll(addResizeListeners(), addScrollListeners());
}

// src/middleware.ts
var toVar = (value) => ({ variable: value, reference: `var(${value})` });
var cssVars = {
  arrowSize: toVar("--arrow-size"),
  arrowSizeHalf: toVar("--arrow-size-half"),
  arrowBg: toVar("--arrow-background"),
  transformOrigin: toVar("--transform-origin"),
  arrowOffset: toVar("--arrow-offset")
};
var getTransformOrigin = (arrow2) => ({
  top: "bottom center",
  "top-start": arrow2 ? `${arrow2.x}px bottom` : "left bottom",
  "top-end": arrow2 ? `${arrow2.x}px bottom` : "right bottom",
  bottom: "top center",
  "bottom-start": arrow2 ? `${arrow2.x}px top` : "top left",
  "bottom-end": arrow2 ? `${arrow2.x}px top` : "top right",
  left: "right center",
  "left-start": arrow2 ? `right ${arrow2.y}px` : "right top",
  "left-end": arrow2 ? `right ${arrow2.y}px` : "right bottom",
  right: "left center",
  "right-start": arrow2 ? `left ${arrow2.y}px` : "left top",
  "right-end": arrow2 ? `left ${arrow2.y}px` : "left bottom"
});
var transformOrigin = {
  name: "transformOrigin",
  fn({ placement, elements, middlewareData }) {
    const { arrow: arrow2 } = middlewareData;
    const transformOrigin2 = getTransformOrigin(arrow2)[placement];
    const { floating } = elements;
    floating.style.setProperty(cssVars.transformOrigin.variable, transformOrigin2);
    return {
      data: { transformOrigin: transformOrigin2 }
    };
  }
};
var shiftArrow = (opts) => ({
  name: "shiftArrow",
  fn({ placement, middlewareData }) {
    const { element: arrow2 } = opts;
    if (middlewareData.arrow) {
      const { x, y } = middlewareData.arrow;
      const dir = placement.split("-")[0];
      Object.assign(arrow2.style, {
        left: x != null ? `${x}px` : "",
        top: y != null ? `${y}px` : "",
        [dir]: `calc(100% + ${cssVars.arrowOffset.reference})`
      });
    }
    return {};
  }
});

// src/get-placement.ts
var defaultOptions = {
  strategy: "absolute",
  placement: "bottom",
  listeners: true,
  gutter: 8,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
function getPlacement(reference, floating, opts = {}) {
  if (!floating || !reference)
    return;
  const options = Object.assign({}, defaultOptions, opts);
  const arrowEl = floating.querySelector("[data-part=arrow]");
  const middleware = [];
  if (options.flip) {
    middleware.push(
      flip({
        boundary: options.boundary,
        padding: options.overflowPadding
      })
    );
  }
  if (options.gutter || options.offset) {
    const arrowOffset = arrowEl ? arrowEl.offsetHeight / 2 : 0;
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if ((data == null ? void 0 : data.mainAxis) != null)
      data.mainAxis += arrowOffset;
    middleware.push(offset(data));
  }
  middleware.push(
    shift({
      boundary: options.boundary,
      crossAxis: options.overlap,
      padding: options.overflowPadding
    })
  );
  if (arrowEl) {
    middleware.push(
      arrow({ element: arrowEl, padding: 8 }),
      shiftArrow({ element: arrowEl })
    );
  }
  middleware.push(transformOrigin);
  middleware.push(
    size({
      padding: options.overflowPadding,
      apply({ rects, availableHeight, availableWidth }) {
        const referenceWidth = Math.round(rects.reference.width);
        floating.style.setProperty("--reference-width", `${referenceWidth}px`);
        floating.style.setProperty("--available-width", `${availableWidth}px`);
        floating.style.setProperty("--available-height", `${availableHeight}px`);
        if (options.sameWidth) {
          Object.assign(floating.style, {
            width: `${referenceWidth}px`,
            minWidth: "unset"
          });
        }
        if (options.fitViewport) {
          Object.assign(floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`
          });
        }
      }
    })
  );
  function compute(config = {}) {
    if (!reference || !floating)
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy,
      ...config
    }).then((data) => {
      var _a;
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      Object.assign(floating.style, {
        position: data.strategy,
        top: "0",
        left: "0",
        transform: `translate3d(${x}px, ${y}px, 0)`
      });
      (_a = options.onComplete) == null ? void 0 : _a.call(options, { ...data, compute });
    });
  }
  compute();
  return callAll(
    options.listeners ? autoUpdate(reference, floating, compute, options.listeners) : void 0,
    options.onCleanup
  );
}
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// src/get-styles.ts
var UNMEASURED_FLOATING_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  opacity: 0,
  transform: "translate3d(0, -200%, 0)",
  pointerEvents: "none"
};
var ARROW_FLOATING_STYLE = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function getPlacementStyles(options) {
  const { measured, strategy = "absolute", placement = "bottom" } = options;
  return {
    arrow: {
      position: "absolute",
      width: cssVars.arrowSize.reference,
      height: cssVars.arrowSize.reference,
      [cssVars.arrowSizeHalf.variable]: `calc(${cssVars.arrowSize.reference} / 2)`,
      [cssVars.arrowOffset.variable]: `calc(${cssVars.arrowSizeHalf.reference} * -1)`,
      opacity: !measured ? 0 : void 0
    },
    innerArrow: {
      transform: ARROW_FLOATING_STYLE[placement.split("-")[0]],
      background: cssVars.arrowBg.reference,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "inherit"
    },
    floating: {
      position: strategy,
      minWidth: "max-content",
      ...!measured && UNMEASURED_FLOATING_STYLE
    }
  };
}
export {
  getBasePlacement,
  getPlacement,
  getPlacementStyles
};
