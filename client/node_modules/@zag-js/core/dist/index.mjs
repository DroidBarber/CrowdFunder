// src/index.ts
import { proxy as proxy2, ref as ref2, snapshot as snapshot3, subscribe as subscribe3 } from "@zag-js/store";

// ../utilities/core/dist/index.mjs
function clear(v) {
  while (v.length > 0)
    v.pop();
  return v;
}
var runIfFn = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast = (v) => v;
var noop = () => {
};
var callAll = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn == null ? void 0 : fn(...a);
  });
};
var uuid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
var isDev = () => process.env.NODE_ENV !== "production";
var isArray = (v) => Array.isArray(v);
var isObject = (v) => !(v == null || typeof v !== "object" || isArray(v));
var isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
var isString = (v) => typeof v === "string";
var isFunction = (v) => typeof v === "function";
function warn(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && process.env.NODE_ENV !== "production") {
    console.warn(m);
  }
}
function invariant(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && process.env.NODE_ENV !== "production") {
    throw new Error(m);
  }
}

// src/utils.ts
import { snapshot, subscribe } from "@zag-js/store";
function toEvent(event) {
  const obj = isString(event) ? { type: event } : event;
  return obj;
}
function toArray(value) {
  if (!value)
    return [];
  return isArray(value) ? value.slice() : [value];
}
function isGuardHelper(value) {
  return isObject(value) && value.predicate != null;
}
function subscribeKey(obj, key, fn, sync) {
  let prev = Reflect.get(snapshot(obj), key);
  return subscribe(
    obj,
    () => {
      const snap = snapshot(obj);
      if (!Object.is(prev, snap[key])) {
        fn(snap[key]);
        prev = Reflect.get(snap, key);
      }
    },
    sync
  );
}

// src/guard-utils.ts
var Truthy = () => true;
function exec(guardMap, ctx, event, meta) {
  return (guard) => {
    var _a;
    if (isString(guard)) {
      return !!((_a = guardMap[guard]) == null ? void 0 : _a.call(guardMap, ctx, event, meta));
    }
    if (isFunction(guard)) {
      return guard(ctx, event, meta);
    }
    return guard.predicate(guardMap)(ctx, event, meta);
  };
}
function or(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).some(Boolean)
  };
}
function and(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).every(Boolean)
  };
}
function not(condition) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => {
      return !exec(guardMap, ctx, event, meta)(condition);
    }
  };
}
function stateIn(...values) {
  return (_ctx, _evt, meta) => meta.state.matches(...values);
}
var guards = { or, and, not, stateIn };
function choose(actions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => {
      var _a;
      return (_a = actions.find((def) => {
        const guard = def.guard ?? Truthy;
        return exec(guardMap, ctx, event, meta)(guard);
      })) == null ? void 0 : _a.actions;
    }
  };
}
function determineGuardFn(guard, guardMap) {
  guard = guard ?? Truthy;
  return (context, event, meta) => {
    if (isString(guard)) {
      const value = guardMap[guard];
      return isFunction(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard == null ? void 0 : guard(context, event, meta);
  };
}
function determineActionsFn(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}

// src/machine.ts
import { ref, snapshot as snapshot2, subscribe as subscribe2 } from "@zag-js/store";
import { klona } from "klona/json";

// src/create-proxy.ts
import { proxy, proxyWithComputed } from "@zag-js/store";
function createProxy(config) {
  const computedContext = config.computed ?? cast({});
  const initialContext = config.context ?? cast({});
  const state = proxy({
    value: "",
    previousValue: "",
    event: cast({}),
    previousEvent: cast({}),
    context: proxyWithComputed(initialContext, computedContext),
    done: false,
    tags: [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast(this).nextEvents.includes(event);
    },
    get nextEvents() {
      var _a, _b;
      const stateEvents = ((_b = (_a = config.states) == null ? void 0 : _a[this.value]) == null ? void 0 : _b["on"]) ?? {};
      const globalEvents = (config == null ? void 0 : config.on) ?? {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" /* Init */ || !this.previousValue)
        return false;
      return this.value !== this.previousValue;
    }
  });
  return cast(state);
}

// src/delay-utils.ts
function determineDelayFn(delay, delaysMap) {
  return (context, event) => {
    if (isNumber(delay))
      return delay;
    if (isFunction(delay)) {
      return delay(context, event);
    }
    if (isString(delay)) {
      const value = Number.parseFloat(delay);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap == null ? void 0 : delaysMap[delay];
        invariant(
          valueOrFn == null,
          `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay}\`. It doesn't exist in \`options.delays\``
        );
        return isFunction(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}

// src/transition-utils.ts
function toTarget(target) {
  return isString(target) ? { target } : target;
}
function determineTransitionFn(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray(transitions).map(toTarget).find((transition) => {
      const determineGuard = determineGuardFn(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}

// src/machine.ts
var Machine = class {
  status = "Not Started" /* NotStarted */;
  state;
  initialState;
  id;
  type = "machine" /* Machine */;
  activityEvents = /* @__PURE__ */ new Map();
  delayedEvents = /* @__PURE__ */ new Map();
  stateListeners = /* @__PURE__ */ new Set();
  contextListeners = /* @__PURE__ */ new Set();
  eventListeners = /* @__PURE__ */ new Set();
  doneListeners = /* @__PURE__ */ new Set();
  contextWatchers = /* @__PURE__ */ new Set();
  removeStateListener = noop;
  removeEventListener = noop;
  removeContextListener = noop;
  parent;
  children = /* @__PURE__ */ new Map();
  guardMap;
  actionMap;
  delayMap;
  activityMap;
  sync;
  options;
  config;
  constructor(config, options) {
    var _a, _b, _c, _d, _e, _f;
    this.config = klona(config);
    this.options = klona(options ?? {});
    this.id = this.config.id ?? `machine-${uuid()}`;
    this.guardMap = ((_a = this.options) == null ? void 0 : _a.guards) ?? {};
    this.actionMap = ((_b = this.options) == null ? void 0 : _b.actions) ?? {};
    this.delayMap = ((_c = this.options) == null ? void 0 : _c.delays) ?? {};
    this.activityMap = ((_d = this.options) == null ? void 0 : _d.activities) ?? {};
    this.sync = ((_e = this.options) == null ? void 0 : _e.sync) ?? false;
    this.state = createProxy(this.config);
    const event = toEvent("machine.created" /* Created */);
    this.executeActions((_f = this.config) == null ? void 0 : _f.created, event);
  }
  get stateSnapshot() {
    return cast(snapshot2(this.state));
  }
  getState() {
    return klona(this.stateSnapshot);
  }
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  start = (init) => {
    if (this.status === "Running" /* Running */) {
      return this;
    }
    this.status = "Running" /* Running */;
    this.removeStateListener = subscribe2(
      this.state,
      () => {
        this.stateListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
      },
      this.sync
    );
    this.removeEventListener = subscribeKey(
      this.state,
      "event",
      (event2) => {
        this.executeActions(this.config.onEvent, event2);
        this.eventListeners.forEach((listener) => {
          listener(event2);
        });
      },
      this.sync
    );
    this.removeContextListener = subscribe2(
      this.state.context,
      () => {
        this.log("Context:", this.contextSnapshot);
        this.contextListeners.forEach((listener) => {
          listener(this.contextSnapshot);
        });
      },
      this.sync || this.options.debug
    );
    this.setupContextWatchers();
    this.executeActivities(toEvent("machine.start" /* Start */), toArray(this.config.activities), "machine.start" /* Start */);
    this.executeActions(this.config.entry, toEvent("machine.start" /* Start */));
    const event = toEvent("machine.init" /* Init */);
    const target = isObject(init) ? init.value : init;
    const context = isObject(init) ? init.context : void 0;
    if (context) {
      this.setContext(context);
    }
    const transition = {
      target: target ?? this.config.initial
    };
    const next = this.getNextStateInfo(transition, event);
    this.initialState = next;
    this.performStateChangeEffects(this.state.value, next, event);
    return this;
  };
  setupContextWatchers = () => {
    for (const [key, fn] of Object.entries(this.config.watch ?? {})) {
      this.contextWatchers.add(
        subscribeKey(this.state.context, key, () => {
          this.executeActions(fn, this.state.event);
        })
      );
    }
  };
  stop = () => {
    if (this.status === "Stopped" /* Stopped */)
      return;
    this.performExitEffects(this.state.value, toEvent("machine.stop" /* Stop */));
    this.executeActions(this.config.exit, toEvent("machine.stop" /* Stop */));
    this.setState("");
    this.setEvent("machine.stop" /* Stop */);
    this.stopStateListeners();
    this.stopChildren();
    this.stopActivities();
    this.stopDelayedEvents();
    this.stopContextWatchers();
    this.stopEventListeners();
    this.stopContextListeners();
    this.status = "Stopped" /* Stopped */;
    return this;
  };
  stopEventListeners = () => {
    this.eventListeners.clear();
    this.removeEventListener();
  };
  stopContextListeners = () => {
    this.contextListeners.clear();
    this.removeContextListener();
  };
  stopStateListeners = () => {
    this.removeStateListener();
    this.stateListeners.clear();
  };
  stopContextWatchers = () => {
    this.contextWatchers.forEach((fn) => fn());
    this.contextWatchers.clear();
  };
  stopDelayedEvents = () => {
    this.delayedEvents.forEach((state) => {
      state.forEach((stop) => stop());
    });
    this.delayedEvents.clear();
  };
  stopActivities = (state) => {
    var _a, _b;
    if (state) {
      (_a = this.activityEvents.get(state)) == null ? void 0 : _a.forEach((stop) => stop());
      (_b = this.activityEvents.get(state)) == null ? void 0 : _b.clear();
      this.activityEvents.delete(state);
    } else {
      this.activityEvents.forEach((state2) => {
        state2.forEach((stop) => stop());
        state2.clear();
      });
      this.activityEvents.clear();
    }
  };
  sendChild = (evt, to) => {
    const event = toEvent(evt);
    const id = runIfFn(to, this.contextSnapshot);
    const child = this.children.get(id);
    if (!child) {
      invariant(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
    }
    child.send(event);
  };
  stopChild = (id) => {
    if (!this.children.has(id)) {
      invariant(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
    }
    this.children.get(id).stop();
    this.children.delete(id);
  };
  removeChild = (id) => {
    this.children.delete(id);
  };
  stopChildren = () => {
    this.children.forEach((child) => child.stop());
    this.children.clear();
  };
  setParent = (parent) => {
    this.parent = parent;
  };
  spawn = (src, id) => {
    const actor = runIfFn(src);
    if (id)
      actor.id = id;
    actor.type = "machine.actor" /* Actor */;
    actor.setParent(this);
    this.children.set(actor.id, cast(actor));
    actor.onDone(() => {
      this.removeChild(actor.id);
    }).start();
    return cast(ref(actor));
  };
  addActivityCleanup = (state, cleanup) => {
    var _a;
    if (!state)
      return;
    if (!this.activityEvents.has(state)) {
      this.activityEvents.set(state, /* @__PURE__ */ new Set([cleanup]));
    } else {
      (_a = this.activityEvents.get(state)) == null ? void 0 : _a.add(cleanup);
    }
  };
  setState = (target) => {
    this.state.previousValue = this.state.value;
    this.state.value = target;
    const stateNode = this.getStateNode(target);
    if (target == null) {
      clear(this.state.tags);
    } else {
      this.state.tags = toArray(stateNode == null ? void 0 : stateNode.tags);
    }
  };
  setContext = (context) => {
    if (!context)
      return;
    for (const key in context) {
      this.state.context[key] = context[key];
    }
  };
  withContext = (context) => {
    const newContext = { ...this.config.context, ...context };
    return new Machine({ ...this.config, context: newContext }, this.options);
  };
  setActions = (actions) => {
    this.actionMap = { ...this.actionMap, ...actions };
  };
  getStateNode = (state) => {
    var _a;
    if (!state)
      return;
    return (_a = this.config.states) == null ? void 0 : _a[state];
  };
  getNextStateInfo = (transitions, event) => {
    const transition = this.determineTransition(transitions, event);
    const isTargetless = !(transition == null ? void 0 : transition.target);
    const target = (transition == null ? void 0 : transition.target) ?? this.state.value;
    const changed = this.state.value !== target;
    const stateNode = this.getStateNode(target);
    const reenter = !isTargetless && !changed && !(transition == null ? void 0 : transition.internal);
    const info = {
      reenter,
      transition,
      stateNode,
      target,
      changed
    };
    this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
    return info;
  };
  getActionFromDelayedTransition = (transition) => {
    const event = toEvent("machine.after" /* After */);
    const determineDelay = determineDelayFn(transition.delay, this.delayMap);
    const delay = determineDelay(this.contextSnapshot, event);
    let id;
    return {
      entry: () => {
        id = globalThis.setTimeout(() => {
          const next = this.getNextStateInfo(transition, event);
          this.performStateChangeEffects(this.state.value, next, event);
        }, delay);
      },
      exit: () => {
        globalThis.clearTimeout(id);
      }
    };
  };
  getDelayedEventActions = (state) => {
    const stateNode = this.getStateNode(state);
    const event = toEvent("machine.after" /* After */);
    if (!stateNode || !stateNode.after)
      return;
    const entries = [];
    const exits = [];
    if (isArray(stateNode.after)) {
      const transition = this.determineTransition(stateNode.after, event);
      if (!transition)
        return;
      const actions = this.getActionFromDelayedTransition(transition);
      entries.push(actions.entry);
      exits.push(actions.exit);
    } else if (isObject(stateNode.after)) {
      for (const delay in stateNode.after) {
        const transition = stateNode.after[delay];
        let resolvedTransition = {};
        if (isArray(transition)) {
          const picked = this.determineTransition(transition, event);
          if (picked)
            resolvedTransition = picked;
        } else if (isString(transition)) {
          resolvedTransition = { target: transition, delay };
        } else {
          resolvedTransition = { ...transition, delay };
        }
        const actions = this.getActionFromDelayedTransition(resolvedTransition);
        entries.push(actions.entry);
        exits.push(actions.exit);
      }
    }
    return { entries, exits };
  };
  get self() {
    const _self = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      get state() {
        return _self.stateSnapshot;
      }
    };
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  executeActions = (actions, event) => {
    var _a;
    const _actions = determineActionsFn(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
    for (const action of toArray(_actions)) {
      const fn = isString(action) ? (_a = this.actionMap) == null ? void 0 : _a[action] : action;
      warn(
        isString(action) && !fn,
        `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``
      );
      fn == null ? void 0 : fn(this.state.context, event, this.meta);
    }
  };
  executeActivities = (event, activities, state) => {
    var _a;
    for (const activity of activities) {
      const fn = isString(activity) ? (_a = this.activityMap) == null ? void 0 : _a[activity] : activity;
      if (!fn) {
        warn(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
        continue;
      }
      const cleanup = fn(this.state.context, event, this.meta);
      if (cleanup) {
        this.addActivityCleanup(state ?? this.state.value, cleanup);
      }
    }
  };
  createEveryActivities = (every, callbackfn) => {
    if (!every)
      return;
    const event = toEvent("machine.every" /* Every */);
    if (isArray(every)) {
      const picked = toArray(every).find((transition) => {
        const delayOrFn = transition.delay;
        const determineDelay2 = determineDelayFn(delayOrFn, this.delayMap);
        const delay2 = determineDelay2(this.contextSnapshot, event);
        const determineGuard = determineGuardFn(transition.guard, this.guardMap);
        const guard = determineGuard(this.contextSnapshot, event, this.guardMeta);
        return guard ?? delay2 != null;
      });
      if (!picked)
        return;
      const determineDelay = determineDelayFn(picked.delay, this.delayMap);
      const delay = determineDelay(this.contextSnapshot, event);
      const activity = () => {
        const id = globalThis.setInterval(() => {
          this.executeActions(picked.actions, event);
        }, delay);
        return () => {
          globalThis.clearInterval(id);
        };
      };
      callbackfn(activity);
    } else {
      for (const interval in every) {
        const actions = every == null ? void 0 : every[interval];
        const determineDelay = determineDelayFn(interval, this.delayMap);
        const delay = determineDelay(this.contextSnapshot, event);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(actions, event);
          }, delay);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      }
    }
  };
  setEvent = (event) => {
    this.state.previousEvent = this.state.event;
    this.state.event = ref(toEvent(event));
  };
  performExitEffects = (current, event) => {
    const currentState = this.state.value;
    if (currentState === "")
      return;
    const stateNode = current ? this.getStateNode(current) : void 0;
    this.stopActivities(currentState);
    const _exit = determineActionsFn(stateNode == null ? void 0 : stateNode.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
    const exitActions = toArray(_exit);
    const afterExitActions = this.delayedEvents.get(currentState);
    if (afterExitActions) {
      exitActions.push(...afterExitActions);
    }
    this.executeActions(exitActions, event);
    this.eventListeners.clear();
  };
  performEntryEffects = (next, event) => {
    const stateNode = this.getStateNode(next);
    const activities = toArray(stateNode == null ? void 0 : stateNode.activities);
    this.createEveryActivities(stateNode == null ? void 0 : stateNode.every, (activity) => {
      activities.unshift(activity);
    });
    if (activities.length > 0) {
      this.executeActivities(event, activities);
    }
    const _entry = determineActionsFn(stateNode == null ? void 0 : stateNode.entry, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
    const entryActions = toArray(_entry);
    const afterActions = this.getDelayedEventActions(next);
    if ((stateNode == null ? void 0 : stateNode.after) && afterActions) {
      this.delayedEvents.set(next, afterActions == null ? void 0 : afterActions.exits);
      entryActions.push(...afterActions.entries);
    }
    this.executeActions(entryActions, event);
    if ((stateNode == null ? void 0 : stateNode.type) === "final") {
      this.state.done = true;
      this.doneListeners.forEach((listener) => {
        listener(this.stateSnapshot);
      });
      this.stop();
    }
  };
  performTransitionEffects = (transitions, event) => {
    const transition = this.determineTransition(transitions, event);
    this.executeActions(transition == null ? void 0 : transition.actions, event);
  };
  performStateChangeEffects = (current, next, event) => {
    this.setEvent(event);
    const changed = next.changed || next.reenter;
    if (changed) {
      this.performExitEffects(current, event);
    }
    this.performTransitionEffects(next.transition, event);
    this.setState(next.target);
    if (changed) {
      this.performEntryEffects(next.target, event);
    }
  };
  determineTransition = (transition, event) => {
    const fn = determineTransitionFn(transition, this.guardMap);
    return fn == null ? void 0 : fn(this.contextSnapshot, event, this.guardMeta);
  };
  sendParent = (evt) => {
    var _a;
    if (!this.parent) {
      invariant("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
    }
    const event = toEvent(evt);
    (_a = this.parent) == null ? void 0 : _a.send(event);
  };
  log = (...args) => {
    if (isDev() && this.options.debug) {
      console.log(...args);
    }
  };
  send = (evt) => {
    const event = toEvent(evt);
    this.transition(this.state.value, event);
  };
  transition = (state, evt) => {
    var _a, _b;
    const stateNode = isString(state) ? this.getStateNode(state) : state == null ? void 0 : state.stateNode;
    const event = toEvent(evt);
    if (!stateNode && !this.config.on) {
      const msg = this.status === "Stopped" /* Stopped */ ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
      warn(msg);
      return;
    }
    const transitions = ((_a = stateNode == null ? void 0 : stateNode.on) == null ? void 0 : _a[event.type]) ?? ((_b = this.config.on) == null ? void 0 : _b[event.type]);
    const next = this.getNextStateInfo(transitions, event);
    this.performStateChangeEffects(this.state.value, next, event);
    return next.stateNode;
  };
  subscribe = (listener) => {
    this.stateListeners.add(listener);
    if (this.status === "Running" /* Running */) {
      listener(this.stateSnapshot);
    }
    return () => {
      this.stateListeners.delete(listener);
    };
  };
  onDone = (listener) => {
    this.doneListeners.add(listener);
    return this;
  };
  onTransition = (listener) => {
    this.stateListeners.add(listener);
    if (this.status === "Running" /* Running */) {
      listener(this.stateSnapshot);
    }
    return this;
  };
  onChange = (listener) => {
    this.contextListeners.add(listener);
    return this;
  };
  onEvent = (listener) => {
    this.eventListeners.add(listener);
    return this;
  };
  get [Symbol.toStringTag]() {
    return "Machine";
  }
};
var createMachine = (config, options) => new Machine(config, options);

// src/merge-props.ts
var clsx = (...args) => args.map((str) => str == null ? void 0 : str.trim()).filter(Boolean).join(" ");
function mergeProps(...args) {
  let result = {};
  for (let props of args) {
    for (let key in result) {
      if (/^on[A-Z]/.test(key) && typeof result[key] === "function" && typeof props[key] === "function") {
        result[key] = callAll(result[key], props[key]);
        continue;
      }
      if (key === "className" || key === "class") {
        result[key] = clsx(result[key], props[key]);
        continue;
      }
      if (key === "style") {
        result[key] = Object.assign({}, result[key] ?? {}, props[key] ?? {});
        continue;
      }
      result[key] = props[key] !== void 0 ? props[key] : result[key];
    }
    for (let key in props) {
      if (result[key] === void 0) {
        result[key] = props[key];
      }
    }
  }
  return result;
}
export {
  Machine,
  choose,
  createMachine,
  guards,
  mergeProps,
  proxy2 as proxy,
  ref2 as ref,
  snapshot3 as snapshot,
  subscribe3 as subscribe
};
