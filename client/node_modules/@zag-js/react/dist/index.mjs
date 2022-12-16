// src/index.ts
import { mergeProps } from "@zag-js/core";

// src/use-snapshot.ts
import { useCallback, useDebugValue, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { affectedToPathList, createProxy as createProxyToCompare, isChanged } from "proxy-compare";
import { snapshot, subscribe } from "@zag-js/store";
var __DEV__ = process.env.NODE_ENV !== "production";
var useAffectedDebugValue = (state, affected) => {
  const pathList = useRef();
  useEffect(() => {
    pathList.current = affectedToPathList(state, affected);
  });
  useDebugValue(pathList.current);
};
function useSnapshot(proxyObject, options) {
  const notifyInSync = options == null ? void 0 : options.sync;
  const lastSnapshot = useRef();
  const lastAffected = useRef();
  let inRender = true;
  const currSnapshot = useSyncExternalStore(
    useCallback(
      (callback) => {
        const unsub = subscribe(proxyObject, callback, notifyInSync);
        callback();
        return unsub;
      },
      [proxyObject, notifyInSync]
    ),
    () => {
      const nextSnapshot = snapshot(proxyObject);
      try {
        if (!inRender && lastSnapshot.current && lastAffected.current && !isChanged(lastSnapshot.current, nextSnapshot, lastAffected.current, /* @__PURE__ */ new WeakMap())) {
          return lastSnapshot.current;
        }
      } catch (e) {
      }
      return nextSnapshot;
    },
    () => snapshot(proxyObject)
  );
  inRender = false;
  const currAffected = /* @__PURE__ */ new WeakMap();
  useEffect(() => {
    lastSnapshot.current = currSnapshot;
    lastAffected.current = currAffected;
  });
  if (__DEV__) {
    useAffectedDebugValue(currSnapshot, currAffected);
  }
  const proxyCache = useMemo(() => /* @__PURE__ */ new WeakMap(), []);
  return createProxyToCompare(currSnapshot, currAffected, proxyCache);
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
import { useEffect as useEffect2, useLayoutEffect, useRef as useRef2 } from "react";
var useSafeLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect2;
function useConstant(fn) {
  const ref = useRef2();
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
import { createNormalizer } from "@zag-js/types";
var normalizeProps = createNormalizer((v) => v);
export {
  mergeProps,
  normalizeProps,
  useActor,
  useMachine,
  useService
};
