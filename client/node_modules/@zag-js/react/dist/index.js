"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  mergeProps: () => import_core.mergeProps,
  normalizeProps: () => normalizeProps,
  useActor: () => useActor,
  useMachine: () => useMachine,
  useService: () => useService
});
module.exports = __toCommonJS(src_exports);
var import_core = require("@zag-js/core");

// src/use-snapshot.ts
var import_react = require("react");
var import_proxy_compare = require("proxy-compare");
var import_store = require("@zag-js/store");
var __DEV__ = process.env.NODE_ENV !== "production";
var useAffectedDebugValue = (state, affected) => {
  const pathList = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    pathList.current = (0, import_proxy_compare.affectedToPathList)(state, affected);
  });
  (0, import_react.useDebugValue)(pathList.current);
};
function useSnapshot(proxyObject, options) {
  const notifyInSync = options == null ? void 0 : options.sync;
  const lastSnapshot = (0, import_react.useRef)();
  const lastAffected = (0, import_react.useRef)();
  let inRender = true;
  const currSnapshot = (0, import_react.useSyncExternalStore)(
    (0, import_react.useCallback)(
      (callback) => {
        const unsub = (0, import_store.subscribe)(proxyObject, callback, notifyInSync);
        callback();
        return unsub;
      },
      [proxyObject, notifyInSync]
    ),
    () => {
      const nextSnapshot = (0, import_store.snapshot)(proxyObject);
      try {
        if (!inRender && lastSnapshot.current && lastAffected.current && !(0, import_proxy_compare.isChanged)(lastSnapshot.current, nextSnapshot, lastAffected.current, /* @__PURE__ */ new WeakMap())) {
          return lastSnapshot.current;
        }
      } catch (e) {
      }
      return nextSnapshot;
    },
    () => (0, import_store.snapshot)(proxyObject)
  );
  inRender = false;
  const currAffected = /* @__PURE__ */ new WeakMap();
  (0, import_react.useEffect)(() => {
    lastSnapshot.current = currSnapshot;
    lastAffected.current = currAffected;
  });
  if (__DEV__) {
    useAffectedDebugValue(currSnapshot, currAffected);
  }
  const proxyCache = (0, import_react.useMemo)(() => /* @__PURE__ */ new WeakMap(), []);
  return (0, import_proxy_compare.createProxy)(currSnapshot, currAffected, proxyCache);
}

// src/use-actor.ts
function useActor(service) {
  const current = useSnapshot(service.state, {
    sync: service.options.hookSync
  });
  const typedState = current;
  return [typedState, service.send];
}

// src/use-machine.ts
var import_react2 = require("react");
var useSafeLayoutEffect = typeof document !== "undefined" ? import_react2.useLayoutEffect : import_react2.useEffect;
function useConstant(fn) {
  const ref = (0, import_react2.useRef)();
  if (!ref.current)
    ref.current = { v: fn() };
  return ref.current.v;
}
function useService(machine, options) {
  const { actions, state: hydratedState, context } = options ?? {};
  const service = useConstant(() => {
    const _machine = typeof machine === "function" ? machine() : machine;
    return context ? _machine.withContext(context) : _machine;
  });
  useSafeLayoutEffect(() => {
    service.start(hydratedState);
    if (service.state.can("SETUP")) {
      service.send("SETUP");
    }
    return () => {
      service.stop();
    };
  }, []);
  useSafeLayoutEffect(() => {
    service.setActions(actions);
  }, [actions]);
  useSafeLayoutEffect(() => {
    service.setContext(context);
  }, [context]);
  return service;
}
function useMachine(machine, options) {
  const service = useService(machine, options);
  const state = useSnapshot(service.state, {
    sync: service.options.hookSync
  });
  const typedState = state;
  return [typedState, service.send, service];
}

// src/normalize-props.ts
var import_types = require("@zag-js/types");
var normalizeProps = (0, import_types.createNormalizer)((v) => v);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeProps,
  normalizeProps,
  useActor,
  useMachine,
  useService
});
