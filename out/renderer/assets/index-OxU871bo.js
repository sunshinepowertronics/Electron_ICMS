function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var REACT_ELEMENT_TYPE$2 = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE$2 = Symbol.for("react.fragment");
function jsxProd(type, config, maybeKey) {
  var key = null;
  void 0 !== maybeKey && (key = "" + maybeKey);
  void 0 !== config.key && (key = "" + config.key);
  if ("key" in config) {
    maybeKey = {};
    for (var propName in config)
      "key" !== propName && (maybeKey[propName] = config[propName]);
  } else maybeKey = config;
  config = maybeKey.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE$2,
    type,
    key,
    ref: void 0 !== config ? config : null,
    props: maybeKey
  };
}
reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE$2;
reactJsxRuntime_production.jsx = jsxProd;
reactJsxRuntime_production.jsxs = jsxProd;
{
  jsxRuntime.exports = reactJsxRuntime_production;
}
var jsxRuntimeExports = jsxRuntime.exports;
var react = { exports: {} };
var react_production = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var REACT_ELEMENT_TYPE$1 = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE$2 = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE$1 = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE$1 = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE$1 = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE$1 = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE$1 = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE$1 = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE$1 = Symbol.for("react.suspense"), REACT_MEMO_TYPE$1 = Symbol.for("react.memo"), REACT_LAZY_TYPE$1 = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE$1 = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL$1 = Symbol.iterator;
function getIteratorFn$1(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable = MAYBE_ITERATOR_SYMBOL$1 && maybeIterable[MAYBE_ITERATOR_SYMBOL$1] || maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var ReactNoopUpdateQueue = {
  isMounted: function() {
    return false;
  },
  enqueueForceUpdate: function() {
  },
  enqueueReplaceState: function() {
  },
  enqueueSetState: function() {
  }
}, assign$1 = Object.assign, emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function(partialState, callback) {
  if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {
}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
assign$1(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
var isArrayImpl$1 = Array.isArray;
function noop$3() {
}
var ReactSharedInternals$2 = { H: null, A: null, T: null, S: null }, hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function ReactElement(type, key, props) {
  var refProp = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE$1,
    type,
    key,
    ref: void 0 !== refProp ? refProp : null,
    props
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(oldElement.type, newKey, oldElement.props);
}
function isValidElement(object) {
  return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE$1;
}
function escape(key) {
  var escaperLookup = { "=": "=0", ":": "=2" };
  return "$" + key.replace(/[=:]/g, function(match) {
    return escaperLookup[match];
  });
}
var userProvidedKeyEscapeRegex = /\/+/g;
function getElementKey(element, index2) {
  return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index2.toString(36);
}
function resolveThenable(thenable) {
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      switch ("string" === typeof thenable.status ? thenable.then(noop$3, noop$3) : (thenable.status = "pending", thenable.then(
        function(fulfilledValue) {
          "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
        },
        function(error) {
          "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
        }
      )), thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
      }
  }
  throw thenable;
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = false;
  if (null === children) invokeCallback = true;
  else
    switch (type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = true;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE$1:
          case REACT_PORTAL_TYPE$2:
            invokeCallback = true;
            break;
          case REACT_LAZY_TYPE$1:
            return invokeCallback = children._init, mapIntoArray(
              invokeCallback(children._payload),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
        }
    }
  if (invokeCallback)
    return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl$1(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
      return c;
    })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
      callback,
      escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
        userProvidedKeyEscapeRegex,
        "$&/"
      ) + "/") + invokeCallback
    )), array.push(callback)), 1;
  invokeCallback = 0;
  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
  if (isArrayImpl$1(children))
    for (var i = 0; i < children.length; i++)
      nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
        nameSoFar,
        array,
        escapedPrefix,
        type,
        callback
      );
  else if (i = getIteratorFn$1(children), "function" === typeof i)
    for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
      nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
        nameSoFar,
        array,
        escapedPrefix,
        type,
        callback
      );
  else if ("object" === type) {
    if ("function" === typeof children.then)
      return mapIntoArray(
        resolveThenable(children),
        array,
        escapedPrefix,
        nameSoFar,
        callback
      );
    array = String(children);
    throw Error(
      "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
    );
  }
  return invokeCallback;
}
function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [], count = 0;
  mapIntoArray(children, result, "", "", function(child) {
    return func.call(context, child, count++);
  });
  return result;
}
function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    ctor.then(
      function(moduleObject) {
        if (0 === payload._status || -1 === payload._status)
          payload._status = 1, payload._result = moduleObject;
      },
      function(error) {
        if (0 === payload._status || -1 === payload._status)
          payload._status = 2, payload._result = error;
      }
    );
    -1 === payload._status && (payload._status = 0, payload._result = ctor);
  }
  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}
var reportGlobalError$1 = "function" === typeof reportError ? reportError : function(error) {
  if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
    var event = new window.ErrorEvent("error", {
      bubbles: true,
      cancelable: true,
      message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
      error
    });
    if (!window.dispatchEvent(event)) return;
  } else if ("object" === typeof process && "function" === typeof process.emit) {
    process.emit("uncaughtException", error);
    return;
  }
  console.error(error);
}, Children = {
  map: mapChildren,
  forEach: function(children, forEachFunc, forEachContext) {
    mapChildren(
      children,
      function() {
        forEachFunc.apply(this, arguments);
      },
      forEachContext
    );
  },
  count: function(children) {
    var n = 0;
    mapChildren(children, function() {
      n++;
    });
    return n;
  },
  toArray: function(children) {
    return mapChildren(children, function(child) {
      return child;
    }) || [];
  },
  only: function(children) {
    if (!isValidElement(children))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return children;
  }
};
react_production.Activity = REACT_ACTIVITY_TYPE$1;
react_production.Children = Children;
react_production.Component = Component;
react_production.Fragment = REACT_FRAGMENT_TYPE$1;
react_production.Profiler = REACT_PROFILER_TYPE$1;
react_production.PureComponent = PureComponent;
react_production.StrictMode = REACT_STRICT_MODE_TYPE$1;
react_production.Suspense = REACT_SUSPENSE_TYPE$1;
react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals$2;
react_production.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(size) {
    return ReactSharedInternals$2.H.useMemoCache(size);
  }
};
react_production.cache = function(fn) {
  return function() {
    return fn.apply(null, arguments);
  };
};
react_production.cacheSignal = function() {
  return null;
};
react_production.cloneElement = function(element, config, children) {
  if (null === element || void 0 === element)
    throw Error(
      "The argument must be a React element, but you passed " + element + "."
    );
  var props = assign$1({}, element.props), key = element.key;
  if (null != config)
    for (propName in void 0 !== config.key && (key = "" + config.key), config)
      !hasOwnProperty$1.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;
  else if (1 < propName) {
    for (var childArray = Array(propName), i = 0; i < propName; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  return ReactElement(element.type, key, props);
};
react_production.createContext = function(defaultValue) {
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE$1,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = defaultValue;
  defaultValue.Consumer = {
    $$typeof: REACT_CONSUMER_TYPE$1,
    _context: defaultValue
  };
  return defaultValue;
};
react_production.createElement = function(type, config, children) {
  var propName, props = {}, key = null;
  if (null != config)
    for (propName in void 0 !== config.key && (key = "" + config.key), config)
      hasOwnProperty$1.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;
  else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps)
    for (propName in childrenLength = type.defaultProps, childrenLength)
      void 0 === props[propName] && (props[propName] = childrenLength[propName]);
  return ReactElement(type, key, props);
};
react_production.createRef = function() {
  return { current: null };
};
react_production.forwardRef = function(render) {
  return { $$typeof: REACT_FORWARD_REF_TYPE$1, render };
};
react_production.isValidElement = isValidElement;
react_production.lazy = function(ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE$1,
    _payload: { _status: -1, _result: ctor },
    _init: lazyInitializer
  };
};
react_production.memo = function(type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE$1,
    type,
    compare: void 0 === compare ? null : compare
  };
};
react_production.startTransition = function(scope) {
  var prevTransition = ReactSharedInternals$2.T, currentTransition = {};
  ReactSharedInternals$2.T = currentTransition;
  try {
    var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals$2.S;
    null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
    "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop$3, reportGlobalError$1);
  } catch (error) {
    reportGlobalError$1(error);
  } finally {
    null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals$2.T = prevTransition;
  }
};
react_production.unstable_useCacheRefresh = function() {
  return ReactSharedInternals$2.H.useCacheRefresh();
};
react_production.use = function(usable) {
  return ReactSharedInternals$2.H.use(usable);
};
react_production.useActionState = function(action, initialState, permalink) {
  return ReactSharedInternals$2.H.useActionState(action, initialState, permalink);
};
react_production.useCallback = function(callback, deps) {
  return ReactSharedInternals$2.H.useCallback(callback, deps);
};
react_production.useContext = function(Context) {
  return ReactSharedInternals$2.H.useContext(Context);
};
react_production.useDebugValue = function() {
};
react_production.useDeferredValue = function(value, initialValue) {
  return ReactSharedInternals$2.H.useDeferredValue(value, initialValue);
};
react_production.useEffect = function(create, deps) {
  return ReactSharedInternals$2.H.useEffect(create, deps);
};
react_production.useEffectEvent = function(callback) {
  return ReactSharedInternals$2.H.useEffectEvent(callback);
};
react_production.useId = function() {
  return ReactSharedInternals$2.H.useId();
};
react_production.useImperativeHandle = function(ref, create, deps) {
  return ReactSharedInternals$2.H.useImperativeHandle(ref, create, deps);
};
react_production.useInsertionEffect = function(create, deps) {
  return ReactSharedInternals$2.H.useInsertionEffect(create, deps);
};
react_production.useLayoutEffect = function(create, deps) {
  return ReactSharedInternals$2.H.useLayoutEffect(create, deps);
};
react_production.useMemo = function(create, deps) {
  return ReactSharedInternals$2.H.useMemo(create, deps);
};
react_production.useOptimistic = function(passthrough, reducer) {
  return ReactSharedInternals$2.H.useOptimistic(passthrough, reducer);
};
react_production.useReducer = function(reducer, initialArg, init) {
  return ReactSharedInternals$2.H.useReducer(reducer, initialArg, init);
};
react_production.useRef = function(initialValue) {
  return ReactSharedInternals$2.H.useRef(initialValue);
};
react_production.useState = function(initialState) {
  return ReactSharedInternals$2.H.useState(initialState);
};
react_production.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
  return ReactSharedInternals$2.H.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
};
react_production.useTransition = function() {
  return ReactSharedInternals$2.H.useTransition();
};
react_production.version = "19.2.4";
{
  react.exports = react_production;
}
var reactExports = react.exports;
const React$2 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
var client = { exports: {} };
var reactDomClient_production = {};
var scheduler = { exports: {} };
var scheduler_production = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports$1) {
  function push2(heap, node) {
    var index2 = heap.length;
    heap.push(node);
    a: for (; 0 < index2; ) {
      var parentIndex = index2 - 1 >>> 1, parent = heap[parentIndex];
      if (0 < compare(parent, node))
        heap[parentIndex] = node, heap[index2] = parent, index2 = parentIndex;
      else break a;
    }
  }
  function peek(heap) {
    return 0 === heap.length ? null : heap[0];
  }
  function pop2(heap) {
    if (0 === heap.length) return null;
    var first = heap[0], last = heap.pop();
    if (last !== first) {
      heap[0] = last;
      a: for (var index2 = 0, length = heap.length, halfLength = length >>> 1; index2 < halfLength; ) {
        var leftIndex = 2 * (index2 + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
        if (0 > compare(left, last))
          rightIndex < length && 0 > compare(right, left) ? (heap[index2] = right, heap[rightIndex] = last, index2 = rightIndex) : (heap[index2] = left, heap[leftIndex] = last, index2 = leftIndex);
        else if (rightIndex < length && 0 > compare(right, last))
          heap[index2] = right, heap[rightIndex] = last, index2 = rightIndex;
        else break a;
      }
    }
    return first;
  }
  function compare(a, b) {
    var diff = a.sortIndex - b.sortIndex;
    return 0 !== diff ? diff : a.id - b.id;
  }
  exports$1.unstable_now = void 0;
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var localPerformance = performance;
    exports$1.unstable_now = function() {
      return localPerformance.now();
    };
  } else {
    var localDate = Date, initialTime = localDate.now();
    exports$1.unstable_now = function() {
      return localDate.now() - initialTime;
    };
  }
  var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = false, isHostCallbackScheduled = false, isHostTimeoutScheduled = false, needsPaint = false, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
  function advanceTimers(currentTime) {
    for (var timer = peek(timerQueue); null !== timer; ) {
      if (null === timer.callback) pop2(timerQueue);
      else if (timer.startTime <= currentTime)
        pop2(timerQueue), timer.sortIndex = timer.expirationTime, push2(taskQueue, timer);
      else break;
      timer = peek(timerQueue);
    }
  }
  function handleTimeout(currentTime) {
    isHostTimeoutScheduled = false;
    advanceTimers(currentTime);
    if (!isHostCallbackScheduled)
      if (null !== peek(taskQueue))
        isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
      else {
        var firstTimer = peek(timerQueue);
        null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
  }
  var isMessageLoopRunning = false, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
  function shouldYieldToHost() {
    return needsPaint ? true : exports$1.unstable_now() - startTime < frameInterval ? false : true;
  }
  function performWorkUntilDeadline() {
    needsPaint = false;
    if (isMessageLoopRunning) {
      var currentTime = exports$1.unstable_now();
      startTime = currentTime;
      var hasMoreWork = true;
      try {
        a: {
          isHostCallbackScheduled = false;
          isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
          isPerformingWork = true;
          var previousPriorityLevel = currentPriorityLevel;
          try {
            b: {
              advanceTimers(currentTime);
              for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                var callback = currentTask.callback;
                if ("function" === typeof callback) {
                  currentTask.callback = null;
                  currentPriorityLevel = currentTask.priorityLevel;
                  var continuationCallback = callback(
                    currentTask.expirationTime <= currentTime
                  );
                  currentTime = exports$1.unstable_now();
                  if ("function" === typeof continuationCallback) {
                    currentTask.callback = continuationCallback;
                    advanceTimers(currentTime);
                    hasMoreWork = true;
                    break b;
                  }
                  currentTask === peek(taskQueue) && pop2(taskQueue);
                  advanceTimers(currentTime);
                } else pop2(taskQueue);
                currentTask = peek(taskQueue);
              }
              if (null !== currentTask) hasMoreWork = true;
              else {
                var firstTimer = peek(timerQueue);
                null !== firstTimer && requestHostTimeout(
                  handleTimeout,
                  firstTimer.startTime - currentTime
                );
                hasMoreWork = false;
              }
            }
            break a;
          } finally {
            currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
          }
          hasMoreWork = void 0;
        }
      } finally {
        hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
      }
    }
  }
  var schedulePerformWorkUntilDeadline;
  if ("function" === typeof localSetImmediate)
    schedulePerformWorkUntilDeadline = function() {
      localSetImmediate(performWorkUntilDeadline);
    };
  else if ("undefined" !== typeof MessageChannel) {
    var channel = new MessageChannel(), port = channel.port2;
    channel.port1.onmessage = performWorkUntilDeadline;
    schedulePerformWorkUntilDeadline = function() {
      port.postMessage(null);
    };
  } else
    schedulePerformWorkUntilDeadline = function() {
      localSetTimeout(performWorkUntilDeadline, 0);
    };
  function requestHostTimeout(callback, ms) {
    taskTimeoutID = localSetTimeout(function() {
      callback(exports$1.unstable_now());
    }, ms);
  }
  exports$1.unstable_IdlePriority = 5;
  exports$1.unstable_ImmediatePriority = 1;
  exports$1.unstable_LowPriority = 4;
  exports$1.unstable_NormalPriority = 3;
  exports$1.unstable_Profiling = null;
  exports$1.unstable_UserBlockingPriority = 2;
  exports$1.unstable_cancelCallback = function(task) {
    task.callback = null;
  };
  exports$1.unstable_forceFrameRate = function(fps) {
    0 > fps || 125 < fps ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
  };
  exports$1.unstable_getCurrentPriorityLevel = function() {
    return currentPriorityLevel;
  };
  exports$1.unstable_next = function(eventHandler) {
    switch (currentPriorityLevel) {
      case 1:
      case 2:
      case 3:
        var priorityLevel = 3;
        break;
      default:
        priorityLevel = currentPriorityLevel;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
  exports$1.unstable_requestPaint = function() {
    needsPaint = true;
  };
  exports$1.unstable_runWithPriority = function(priorityLevel, eventHandler) {
    switch (priorityLevel) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        priorityLevel = 3;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
  exports$1.unstable_scheduleCallback = function(priorityLevel, callback, options) {
    var currentTime = exports$1.unstable_now();
    "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
    switch (priorityLevel) {
      case 1:
        var timeout = -1;
        break;
      case 2:
        timeout = 250;
        break;
      case 5:
        timeout = 1073741823;
        break;
      case 4:
        timeout = 1e4;
        break;
      default:
        timeout = 5e3;
    }
    timeout = options + timeout;
    priorityLevel = {
      id: taskIdCounter++,
      callback,
      priorityLevel,
      startTime: options,
      expirationTime: timeout,
      sortIndex: -1
    };
    options > currentTime ? (priorityLevel.sortIndex = options, push2(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push2(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
    return priorityLevel;
  };
  exports$1.unstable_shouldYield = shouldYieldToHost;
  exports$1.unstable_wrapCallback = function(callback) {
    var parentPriorityLevel = currentPriorityLevel;
    return function() {
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = parentPriorityLevel;
      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
  };
})(scheduler_production);
{
  scheduler.exports = scheduler_production;
}
var schedulerExports = scheduler.exports;
var reactDom = { exports: {} };
var reactDom_production = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$1 = reactExports;
function formatProdErrorMessage$1(code) {
  var url = "https://react.dev/errors/" + code;
  if (1 < arguments.length) {
    url += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var i = 2; i < arguments.length; i++)
      url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function noop$2() {
}
var Internals = {
  d: {
    f: noop$2,
    r: function() {
      throw Error(formatProdErrorMessage$1(522));
    },
    D: noop$2,
    C: noop$2,
    L: noop$2,
    m: noop$2,
    X: noop$2,
    S: noop$2,
    M: noop$2
  },
  p: 0,
  findDOMNode: null
}, REACT_PORTAL_TYPE$1 = Symbol.for("react.portal");
function createPortal$1(children, containerInfo, implementation) {
  var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE$1,
    key: null == key ? null : "" + key,
    children,
    containerInfo,
    implementation
  };
}
var ReactSharedInternals$1 = React$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function getCrossOriginStringAs(as, input) {
  if ("font" === as) return "";
  if ("string" === typeof input)
    return "use-credentials" === input ? input : "";
}
reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
reactDom_production.createPortal = function(children, container) {
  var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
    throw Error(formatProdErrorMessage$1(299));
  return createPortal$1(children, container, null, key);
};
reactDom_production.flushSync = function(fn) {
  var previousTransition = ReactSharedInternals$1.T, previousUpdatePriority = Internals.p;
  try {
    if (ReactSharedInternals$1.T = null, Internals.p = 2, fn) return fn();
  } finally {
    ReactSharedInternals$1.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
  }
};
reactDom_production.preconnect = function(href, options) {
  "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
};
reactDom_production.prefetchDNS = function(href) {
  "string" === typeof href && Internals.d.D(href);
};
reactDom_production.preinit = function(href, options) {
  if ("string" === typeof href && options && "string" === typeof options.as) {
    var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
    "style" === as ? Internals.d.S(
      href,
      "string" === typeof options.precedence ? options.precedence : void 0,
      {
        crossOrigin,
        integrity,
        fetchPriority
      }
    ) : "script" === as && Internals.d.X(href, {
      crossOrigin,
      integrity,
      fetchPriority,
      nonce: "string" === typeof options.nonce ? options.nonce : void 0
    });
  }
};
reactDom_production.preinitModule = function(href, options) {
  if ("string" === typeof href)
    if ("object" === typeof options && null !== options) {
      if (null == options.as || "script" === options.as) {
        var crossOrigin = getCrossOriginStringAs(
          options.as,
          options.crossOrigin
        );
        Internals.d.M(href, {
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
      }
    } else null == options && Internals.d.M(href);
};
reactDom_production.preload = function(href, options) {
  if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
    var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
    Internals.d.L(href, as, {
      crossOrigin,
      integrity: "string" === typeof options.integrity ? options.integrity : void 0,
      nonce: "string" === typeof options.nonce ? options.nonce : void 0,
      type: "string" === typeof options.type ? options.type : void 0,
      fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
      referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
      imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
      imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
      media: "string" === typeof options.media ? options.media : void 0
    });
  }
};
reactDom_production.preloadModule = function(href, options) {
  if ("string" === typeof href)
    if (options) {
      var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
      Internals.d.m(href, {
        as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
        crossOrigin,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0
      });
    } else Internals.d.m(href);
};
reactDom_production.requestFormReset = function(form) {
  Internals.d.r(form);
};
reactDom_production.unstable_batchedUpdates = function(fn, a) {
  return fn(a);
};
reactDom_production.useFormState = function(action, initialState, permalink) {
  return ReactSharedInternals$1.H.useFormState(action, initialState, permalink);
};
reactDom_production.useFormStatus = function() {
  return ReactSharedInternals$1.H.useHostTransitionStatus();
};
reactDom_production.version = "19.2.4";
function checkDCE$1() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE$1);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE$1();
  reactDom.exports = reactDom_production;
}
var reactDomExports = reactDom.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Scheduler = schedulerExports, React = reactExports, ReactDOM$1 = reactDomExports;
function formatProdErrorMessage(code) {
  var url = "https://react.dev/errors/" + code;
  if (1 < arguments.length) {
    url += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var i = 2; i < arguments.length; i++)
      url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function isValidContainer(node) {
  return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
}
function getNearestMountedFiber(fiber) {
  var node = fiber, nearestMounted = fiber;
  if (fiber.alternate) for (; node.return; ) node = node.return;
  else {
    fiber = node;
    do
      node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return;
    while (fiber);
  }
  return 3 === node.tag ? nearestMounted : null;
}
function getSuspenseInstanceFromFiber(fiber) {
  if (13 === fiber.tag) {
    var suspenseState = fiber.memoizedState;
    null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
    if (null !== suspenseState) return suspenseState.dehydrated;
  }
  return null;
}
function getActivityInstanceFromFiber(fiber) {
  if (31 === fiber.tag) {
    var activityState = fiber.memoizedState;
    null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
    if (null !== activityState) return activityState.dehydrated;
  }
  return null;
}
function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber)
    throw Error(formatProdErrorMessage(188));
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    alternate = getNearestMountedFiber(fiber);
    if (null === alternate) throw Error(formatProdErrorMessage(188));
    return alternate !== fiber ? null : fiber;
  }
  for (var a = fiber, b = alternate; ; ) {
    var parentA = a.return;
    if (null === parentA) break;
    var parentB = parentA.alternate;
    if (null === parentB) {
      b = parentA.return;
      if (null !== b) {
        a = b;
        continue;
      }
      break;
    }
    if (parentA.child === parentB.child) {
      for (parentB = parentA.child; parentB; ) {
        if (parentB === a) return assertIsMounted(parentA), fiber;
        if (parentB === b) return assertIsMounted(parentA), alternate;
        parentB = parentB.sibling;
      }
      throw Error(formatProdErrorMessage(188));
    }
    if (a.return !== b.return) a = parentA, b = parentB;
    else {
      for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
        if (child$0 === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }
        if (child$0 === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }
        child$0 = child$0.sibling;
      }
      if (!didFindChild) {
        for (child$0 = parentB.child; child$0; ) {
          if (child$0 === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }
          if (child$0 === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }
          child$0 = child$0.sibling;
        }
        if (!didFindChild) throw Error(formatProdErrorMessage(189));
      }
    }
    if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
  }
  if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
  return a.stateNode.current === a ? fiber : alternate;
}
function findCurrentHostFiberImpl(node) {
  var tag = node.tag;
  if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
  for (node = node.child; null !== node; ) {
    tag = findCurrentHostFiberImpl(node);
    if (null !== tag) return tag;
    node = node.sibling;
  }
  return null;
}
var assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy");
var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
function getComponentNameFromType(type) {
  if (null == type) return null;
  if ("function" === typeof type)
    return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE:
      return "SuspenseList";
    case REACT_ACTIVITY_TYPE:
      return "Activity";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_PORTAL_TYPE:
        return "Portal";
      case REACT_CONTEXT_TYPE:
        return type.displayName || "Context";
      case REACT_CONSUMER_TYPE:
        return (type._context.displayName || "Context") + ".Consumer";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        type = type.displayName;
        type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
        return type;
      case REACT_MEMO_TYPE:
        return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
      case REACT_LAZY_TYPE:
        innerType = type._payload;
        type = type._init;
        try {
          return getComponentNameFromType(type(innerType));
        } catch (x) {
        }
    }
  return null;
}
var isArrayImpl = Array.isArray, ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM$1.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
  pending: false,
  data: null,
  method: null,
  action: null
}, valueStack = [], index = -1;
function createCursor(defaultValue) {
  return { current: defaultValue };
}
function pop(cursor) {
  0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null);
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance);
  push(contextFiberStackCursor, fiber);
  push(contextStackCursor, null);
  switch (nextRootInstance.nodeType) {
    case 9:
    case 11:
      fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
      break;
    default:
      if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
        nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
      else
        switch (fiber) {
          case "svg":
            fiber = 1;
            break;
          case "math":
            fiber = 2;
            break;
          default:
            fiber = 0;
        }
  }
  pop(contextStackCursor);
  push(contextStackCursor, fiber);
}
function popHostContainer() {
  pop(contextStackCursor);
  pop(contextFiberStackCursor);
  pop(rootInstanceStackCursor);
}
function pushHostContext(fiber) {
  null !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber);
  var context = contextStackCursor.current;
  var JSCompiler_inline_result = getChildHostContextProd(context, fiber.type);
  context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
  hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
}
var prefix, suffix;
function describeBuiltInComponentFrame(name) {
  if (void 0 === prefix)
    try {
      throw Error();
    } catch (x) {
      var match = x.stack.trim().match(/\n( *(at )?)/);
      prefix = match && match[1] || "";
      suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return "\n" + prefix + name + suffix;
}
var reentry = false;
function describeNativeComponentFrame(fn, construct) {
  if (!fn || reentry) return "";
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var RunInRootFrame = {
      DetermineComponentFrameRoot: function() {
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if ("object" === typeof Reflect && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                var control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x$1) {
                control = x$1;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x$2) {
              control = x$2;
            }
            (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
            });
          }
        } catch (sample) {
          if (sample && control && "string" === typeof sample.stack)
            return [sample.stack, control.stack];
        }
        return [null, null];
      }
    };
    RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var namePropDescriptor = Object.getOwnPropertyDescriptor(
      RunInRootFrame.DetermineComponentFrameRoot,
      "name"
    );
    namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
      RunInRootFrame.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
    if (sampleStack && controlStack) {
      var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
      for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
        RunInRootFrame++;
      for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
        "DetermineComponentFrameRoot"
      ); )
        namePropDescriptor++;
      if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
        for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
          namePropDescriptor--;
      for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
        if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
          if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
            do
              if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                return frame;
              }
            while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
          }
          break;
        }
    }
  } finally {
    reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
  }
  return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
}
function describeFiber(fiber, childFiber) {
  switch (fiber.tag) {
    case 26:
    case 27:
    case 5:
      return describeBuiltInComponentFrame(fiber.type);
    case 16:
      return describeBuiltInComponentFrame("Lazy");
    case 13:
      return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
    case 19:
      return describeBuiltInComponentFrame("SuspenseList");
    case 0:
    case 15:
      return describeNativeComponentFrame(fiber.type, false);
    case 11:
      return describeNativeComponentFrame(fiber.type.render, false);
    case 1:
      return describeNativeComponentFrame(fiber.type, true);
    case 31:
      return describeBuiltInComponentFrame("Activity");
    default:
      return "";
  }
}
function getStackByFiberInDevAndProd(workInProgress2) {
  try {
    var info = "", previous = null;
    do
      info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
    while (workInProgress2);
    return info;
  } catch (x) {
    return "\nError generating stack: " + x.message + "\n" + x.stack;
  }
}
var hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null;
function setIsStrictModeForDevtools(newIsStrictMode) {
  "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
  if (injectedHook && "function" === typeof injectedHook.setStrictMode)
    try {
      injectedHook.setStrictMode(rendererID, newIsStrictMode);
    } catch (err) {
    }
}
var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
function clz32Fallback(x) {
  x >>>= 0;
  return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
}
var nextTransitionUpdateLane = 256, nextTransitionDeferredLane = 262144, nextRetryLane = 4194304;
function getHighestPriorityLanes(lanes) {
  var pendingSyncLanes = lanes & 42;
  if (0 !== pendingSyncLanes) return pendingSyncLanes;
  switch (lanes & -lanes) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
      return lanes & 261888;
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return lanes & 3932160;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return lanes & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return lanes;
  }
}
function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
  var pendingLanes = root2.pendingLanes;
  if (0 === pendingLanes) return 0;
  var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
  root2 = root2.warmLanes;
  var nonIdlePendingLanes = pendingLanes & 134217727;
  0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
  return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
}
function checkIfRootIsPrerendering(root2, renderLanes2) {
  return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
}
function computeExpirationTime(lane, currentTime) {
  switch (lane) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return currentTime + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return currentTime + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function claimNextRetryLane() {
  var lane = nextRetryLane;
  nextRetryLane <<= 1;
  0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
  return lane;
}
function createLaneMap(initial) {
  for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
  return laneMap;
}
function markRootUpdated$1(root2, updateLane) {
  root2.pendingLanes |= updateLane;
  268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
}
function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
  var previouslyPendingLanes = root2.pendingLanes;
  root2.pendingLanes = remainingLanes;
  root2.suspendedLanes = 0;
  root2.pingedLanes = 0;
  root2.warmLanes = 0;
  root2.expiredLanes &= remainingLanes;
  root2.entangledLanes &= remainingLanes;
  root2.errorRecoveryDisabledLanes &= remainingLanes;
  root2.shellSuspendCounter = 0;
  var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
  for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
    var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
    entanglements[index$7] = 0;
    expirationTimes[index$7] = -1;
    var hiddenUpdatesForLane = hiddenUpdates[index$7];
    if (null !== hiddenUpdatesForLane)
      for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
        var update = hiddenUpdatesForLane[index$7];
        null !== update && (update.lane &= -536870913);
      }
    remainingLanes &= ~lane;
  }
  0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
  0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
}
function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
  root2.pendingLanes |= spawnedLane;
  root2.suspendedLanes &= ~spawnedLane;
  var spawnedLaneIndex = 31 - clz32(spawnedLane);
  root2.entangledLanes |= spawnedLane;
  root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
}
function markRootEntangled(root2, entangledLanes) {
  var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
  for (root2 = root2.entanglements; rootEntangledLanes; ) {
    var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
    lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes);
    rootEntangledLanes &= ~lane;
  }
}
function getBumpedLaneForHydration(root2, renderLanes2) {
  var renderLane = renderLanes2 & -renderLanes2;
  renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
  return 0 !== (renderLane & (root2.suspendedLanes | renderLanes2)) ? 0 : renderLane;
}
function getBumpedLaneForHydrationByLane(lane) {
  switch (lane) {
    case 2:
      lane = 1;
      break;
    case 8:
      lane = 4;
      break;
    case 32:
      lane = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      lane = 128;
      break;
    case 268435456:
      lane = 134217728;
      break;
    default:
      lane = 0;
  }
  return lane;
}
function lanesToEventPriority(lanes) {
  lanes &= -lanes;
  return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
}
function resolveUpdatePriority() {
  var updatePriority = ReactDOMSharedInternals.p;
  if (0 !== updatePriority) return updatePriority;
  updatePriority = window.event;
  return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
}
function runWithPriority(priority, fn) {
  var previousPriority = ReactDOMSharedInternals.p;
  try {
    return ReactDOMSharedInternals.p = priority, fn();
  } finally {
    ReactDOMSharedInternals.p = previousPriority;
  }
}
var randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey;
function detachDeletedInstance(node) {
  delete node[internalInstanceKey];
  delete node[internalPropsKey];
  delete node[internalEventHandlersKey];
  delete node[internalEventHandlerListenersKey];
  delete node[internalEventHandlesSetKey];
}
function getClosestInstanceFromNode(targetNode) {
  var targetInst = targetNode[internalInstanceKey];
  if (targetInst) return targetInst;
  for (var parentNode = targetNode.parentNode; parentNode; ) {
    if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
      parentNode = targetInst.alternate;
      if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
        for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode; ) {
          if (parentNode = targetNode[internalInstanceKey]) return parentNode;
          targetNode = getParentHydrationBoundary(targetNode);
        }
      return targetInst;
    }
    targetNode = parentNode;
    parentNode = targetNode.parentNode;
  }
  return null;
}
function getInstanceFromNode(node) {
  if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
    var tag = node.tag;
    if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag)
      return node;
  }
  return null;
}
function getNodeFromInstance(inst) {
  var tag = inst.tag;
  if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
  throw Error(formatProdErrorMessage(33));
}
function getResourcesFromRoot(root2) {
  var resources = root2[internalRootNodeResourcesKey];
  resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
  return resources;
}
function markNodeAsHoistable(node) {
  node[internalHoistableMarker] = true;
}
var allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {};
function registerTwoPhaseEvent(registrationName, dependencies) {
  registerDirectEvent(registrationName, dependencies);
  registerDirectEvent(registrationName + "Capture", dependencies);
}
function registerDirectEvent(registrationName, dependencies) {
  registrationNameDependencies[registrationName] = dependencies;
  for (registrationName = 0; registrationName < dependencies.length; registrationName++)
    allNativeEvents.add(dependencies[registrationName]);
}
var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return true;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return validatedAttributeNameCache[attributeName] = true;
  illegalAttributeNameCache[attributeName] = true;
  return false;
}
function setValueForAttribute(node, name, value) {
  if (isAttributeNameSafe(name))
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
          node.removeAttribute(name);
          return;
        case "boolean":
          var prefix$10 = name.toLowerCase().slice(0, 5);
          if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
            node.removeAttribute(name);
            return;
          }
      }
      node.setAttribute(name, "" + value);
    }
}
function setValueForKnownAttribute(node, name, value) {
  if (null === value) node.removeAttribute(name);
  else {
    switch (typeof value) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        node.removeAttribute(name);
        return;
    }
    node.setAttribute(name, "" + value);
  }
}
function setValueForNamespacedAttribute(node, namespace, name, value) {
  if (null === value) node.removeAttribute(name);
  else {
    switch (typeof value) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        node.removeAttribute(name);
        return;
    }
    node.setAttributeNS(namespace, name, "" + value);
  }
}
function getToStringValue(value) {
  switch (typeof value) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return value;
    case "object":
      return value;
    default:
      return "";
  }
}
function isCheckable(elem) {
  var type = elem.type;
  return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
}
function trackValueOnNode(node, valueField, currentValue) {
  var descriptor = Object.getOwnPropertyDescriptor(
    node.constructor.prototype,
    valueField
  );
  if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
    var get = descriptor.get, set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: true,
      get: function() {
        return get.call(this);
      },
      set: function(value) {
        currentValue = "" + value;
        set.call(this, value);
      }
    });
    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable
    });
    return {
      getValue: function() {
        return currentValue;
      },
      setValue: function(value) {
        currentValue = "" + value;
      },
      stopTracking: function() {
        node._valueTracker = null;
        delete node[valueField];
      }
    };
  }
}
function track(node) {
  if (!node._valueTracker) {
    var valueField = isCheckable(node) ? "checked" : "value";
    node._valueTracker = trackValueOnNode(
      node,
      valueField,
      "" + node[valueField]
    );
  }
}
function updateValueIfChanged(node) {
  if (!node) return false;
  var tracker = node._valueTracker;
  if (!tracker) return true;
  var lastValue = tracker.getValue();
  var value = "";
  node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
  node = value;
  return node !== lastValue ? (tracker.setValue(node), true) : false;
}
function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}
var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
  return value.replace(
    escapeSelectorAttributeValueInsideDoubleQuotesRegex,
    function(ch) {
      return "\\" + ch.charCodeAt(0).toString(16) + " ";
    }
  );
}
function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
  element.name = "";
  null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
  if (null != value)
    if ("number" === type) {
      if (0 === value && "" === element.value || element.value != value)
        element.value = "" + getToStringValue(value);
    } else
      element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
  else
    "submit" !== type && "reset" !== type || element.removeAttribute("value");
  null != value ? setDefaultValue(element, type, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, type, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
  null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
  null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
  null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
}
function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
  null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
  if (null != value || null != defaultValue) {
    if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
      track(element);
      return;
    }
    defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
    value = null != value ? "" + getToStringValue(value) : defaultValue;
    isHydrating2 || value === element.value || (element.value = value);
    element.defaultValue = value;
  }
  checked = null != checked ? checked : defaultChecked;
  checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
  element.checked = isHydrating2 ? element.checked : !!checked;
  element.defaultChecked = !!checked;
  null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
  track(element);
}
function setDefaultValue(node, type, value) {
  "number" === type && getActiveElement(node.ownerDocument) === node || node.defaultValue === "" + value || (node.defaultValue = "" + value);
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
  node = node.options;
  if (multiple) {
    multiple = {};
    for (var i = 0; i < propValue.length; i++)
      multiple["$" + propValue[i]] = true;
    for (propValue = 0; propValue < node.length; propValue++)
      i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
  } else {
    propValue = "" + getToStringValue(propValue);
    multiple = null;
    for (i = 0; i < node.length; i++) {
      if (node[i].value === propValue) {
        node[i].selected = true;
        setDefaultSelected && (node[i].defaultSelected = true);
        return;
      }
      null !== multiple || node[i].disabled || (multiple = node[i]);
    }
    null !== multiple && (multiple.selected = true);
  }
}
function updateTextarea(element, value, defaultValue) {
  if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
    element.defaultValue !== value && (element.defaultValue = value);
    return;
  }
  element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
}
function initTextarea(element, value, defaultValue, children) {
  if (null == value) {
    if (null != children) {
      if (null != defaultValue) throw Error(formatProdErrorMessage(92));
      if (isArrayImpl(children)) {
        if (1 < children.length) throw Error(formatProdErrorMessage(93));
        children = children[0];
      }
      defaultValue = children;
    }
    null == defaultValue && (defaultValue = "");
    value = defaultValue;
  }
  defaultValue = getToStringValue(value);
  element.defaultValue = defaultValue;
  children = element.textContent;
  children === defaultValue && "" !== children && null !== children && (element.value = children);
  track(element);
}
function setTextContent(node, text) {
  if (text) {
    var firstChild = node.firstChild;
    if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
}
var unitlessNumbers = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function setValueForStyle(style2, styleName, value) {
  var isCustomProperty = 0 === styleName.indexOf("--");
  null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
}
function setValueForStyles(node, styles, prevStyles) {
  if (null != styles && "object" !== typeof styles)
    throw Error(formatProdErrorMessage(62));
  node = node.style;
  if (null != prevStyles) {
    for (var styleName in prevStyles)
      !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "");
    for (var styleName$16 in styles)
      styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && setValueForStyle(node, styleName$16, styleName);
  } else
    for (var styleName$17 in styles)
      styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
}
function isCustomElement(tagName) {
  if (-1 === tagName.indexOf("-")) return false;
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var aliases = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function sanitizeURL(url) {
  return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
}
function noop$1() {
}
var currentReplayingEvent = null;
function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
}
var restoreTarget = null, restoreQueue = null;
function restoreStateOfTarget(target) {
  var internalInstance = getInstanceFromNode(target);
  if (internalInstance && (target = internalInstance.stateNode)) {
    var props = target[internalPropsKey] || null;
    a: switch (target = internalInstance.stateNode, internalInstance.type) {
      case "input":
        updateInput(
          target,
          props.value,
          props.defaultValue,
          props.defaultValue,
          props.checked,
          props.defaultChecked,
          props.type,
          props.name
        );
        internalInstance = props.name;
        if ("radio" === props.type && null != internalInstance) {
          for (props = target; props.parentNode; ) props = props.parentNode;
          props = props.querySelectorAll(
            'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
              "" + internalInstance
            ) + '"][type="radio"]'
          );
          for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
            var otherNode = props[internalInstance];
            if (otherNode !== target && otherNode.form === target.form) {
              var otherProps = otherNode[internalPropsKey] || null;
              if (!otherProps) throw Error(formatProdErrorMessage(90));
              updateInput(
                otherNode,
                otherProps.value,
                otherProps.defaultValue,
                otherProps.defaultValue,
                otherProps.checked,
                otherProps.defaultChecked,
                otherProps.type,
                otherProps.name
              );
            }
          }
          for (internalInstance = 0; internalInstance < props.length; internalInstance++)
            otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
        }
        break a;
      case "textarea":
        updateTextarea(target, props.value, props.defaultValue);
        break a;
      case "select":
        internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
    }
  }
}
var isInsideEventHandler = false;
function batchedUpdates$1(fn, a, b) {
  if (isInsideEventHandler) return fn(a, b);
  isInsideEventHandler = true;
  try {
    var JSCompiler_inline_result = fn(a);
    return JSCompiler_inline_result;
  } finally {
    if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
      if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
        for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
    }
  }
}
function getListener(inst, registrationName) {
  var stateNode = inst.stateNode;
  if (null === stateNode) return null;
  var props = stateNode[internalPropsKey] || null;
  if (null === props) return null;
  stateNode = props[registrationName];
  a: switch (registrationName) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
      inst = !props;
      break a;
    default:
      inst = false;
  }
  if (inst) return null;
  if (stateNode && "function" !== typeof stateNode)
    throw Error(
      formatProdErrorMessage(231, registrationName, typeof stateNode)
    );
  return stateNode;
}
var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), passiveBrowserEventsSupported = false;
if (canUseDOM)
  try {
    var options = {};
    Object.defineProperty(options, "passive", {
      get: function() {
        passiveBrowserEventsSupported = true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (e) {
    passiveBrowserEventsSupported = false;
  }
var root = null, startText = null, fallbackText = null;
function getData() {
  if (fallbackText) return fallbackText;
  var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
  for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
  var minEnd = startLength - start;
  for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
  return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
}
function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
}
function functionThatReturnsTrue() {
  return true;
}
function functionThatReturnsFalse() {
  return false;
}
function createSyntheticEvent(Interface) {
  function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
    this._reactName = reactName;
    this._targetInst = targetInst;
    this.type = reactEventType;
    this.nativeEvent = nativeEvent;
    this.target = nativeEventTarget;
    this.currentTarget = null;
    for (var propName in Interface)
      Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
    this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
    this.isPropagationStopped = functionThatReturnsFalse;
    return this;
  }
  assign(SyntheticBaseEvent.prototype, {
    preventDefault: function() {
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
    },
    stopPropagation: function() {
      var event = this.nativeEvent;
      event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
    },
    persist: function() {
    },
    isPersistent: functionThatReturnsTrue
  });
  return SyntheticBaseEvent;
}
var EventInterface = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: getEventModifierState,
  button: 0,
  buttons: 0,
  relatedTarget: function(event) {
    return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
  },
  movementX: function(event) {
    if ("movementX" in event) return event.movementX;
    event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
    return lastMovementX;
  },
  movementY: function(event) {
    return "movementY" in event ? event.movementY : lastMovementY;
  }
}), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }), SyntheticDragEvent = createSyntheticEvent(DragEventInterface), FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }), SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface), AnimationEventInterface = assign({}, EventInterface, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface), ClipboardEventInterface = assign({}, EventInterface, {
  clipboardData: function(event) {
    return "clipboardData" in event ? event.clipboardData : window.clipboardData;
  }
}), SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface), CompositionEventInterface = assign({}, EventInterface, { data: 0 }), SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface), normalizeKey = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, translateToKey = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, modifierKeyToProp = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function modifierStateGetter(keyArg) {
  var nativeEvent = this.nativeEvent;
  return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
}
function getEventModifierState() {
  return modifierStateGetter;
}
var KeyboardEventInterface = assign({}, UIEventInterface, {
  key: function(nativeEvent) {
    if (nativeEvent.key) {
      var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
      if ("Unidentified" !== key) return key;
    }
    return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: getEventModifierState,
  charCode: function(event) {
    return "keypress" === event.type ? getEventCharCode(event) : 0;
  },
  keyCode: function(event) {
    return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
  },
  which: function(event) {
    return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
  }
}), SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface), PointerEventInterface = assign({}, MouseEventInterface, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
}), SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface), TouchEventInterface = assign({}, UIEventInterface, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: getEventModifierState
}), SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface), TransitionEventInterface = assign({}, EventInterface, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface), WheelEventInterface = assign({}, MouseEventInterface, {
  deltaX: function(event) {
    return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function(event) {
    return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface), ToggleEventInterface = assign({}, EventInterface, {
  newState: 0,
  oldState: 0
}), SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface), END_KEYCODES = [9, 13, 27, 32], canUseCompositionEvent = canUseDOM && "CompositionEvent" in window, documentMode = null;
canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CHAR = String.fromCharCode(32), hasSpaceKeypress = false;
function isFallbackCompositionEnd(domEventName, nativeEvent) {
  switch (domEventName) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function getDataFromCustomEvent(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
}
var isComposing = false;
function getNativeBeforeInputChars(domEventName, nativeEvent) {
  switch (domEventName) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;
    case "textInput":
      return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(domEventName, nativeEvent) {
  if (isComposing)
    return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
  switch (domEventName) {
    case "paste":
      return null;
    case "keypress":
      if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
        if (nativeEvent.char && 1 < nativeEvent.char.length)
          return nativeEvent.char;
        if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case "compositionend":
      return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
    default:
      return null;
  }
}
var supportedInputTypes = {
  color: true,
  date: true,
  datetime: true,
  "datetime-local": true,
  email: true,
  month: true,
  number: true,
  password: true,
  range: true,
  search: true,
  tel: true,
  text: true,
  time: true,
  url: true,
  week: true
};
function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
}
function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
  restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
  inst = accumulateTwoPhaseListeners(inst, "onChange");
  0 < inst.length && (nativeEvent = new SyntheticEvent(
    "onChange",
    "change",
    null,
    nativeEvent,
    target
  ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
}
var activeElement$1 = null, activeElementInst$1 = null;
function runEventInBatch(dispatchQueue) {
  processDispatchQueue(dispatchQueue, 0);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(domEventName, targetInst) {
  if ("change" === domEventName) return targetInst;
}
var isInputEventSupported = false;
if (canUseDOM) {
  var JSCompiler_inline_result$jscomp$286;
  if (canUseDOM) {
    var isSupported$jscomp$inline_427 = "oninput" in document;
    if (!isSupported$jscomp$inline_427) {
      var element$jscomp$inline_428 = document.createElement("div");
      element$jscomp$inline_428.setAttribute("oninput", "return;");
      isSupported$jscomp$inline_427 = "function" === typeof element$jscomp$inline_428.oninput;
    }
    JSCompiler_inline_result$jscomp$286 = isSupported$jscomp$inline_427;
  } else JSCompiler_inline_result$jscomp$286 = false;
  isInputEventSupported = JSCompiler_inline_result$jscomp$286 && (!document.documentMode || 9 < document.documentMode);
}
function stopWatchingForValueChange() {
  activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
}
function handlePropertyChange(nativeEvent) {
  if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
    var dispatchQueue = [];
    createAndAccumulateChangeEvent(
      dispatchQueue,
      activeElementInst$1,
      nativeEvent,
      getEventTarget(nativeEvent)
    );
    batchedUpdates$1(runEventInBatch, dispatchQueue);
  }
}
function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
  "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(domEventName) {
  if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
    return getInstIfValueChanged(activeElementInst$1);
}
function getTargetInstForClickEvent(domEventName, targetInst) {
  if ("click" === domEventName) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
  if ("input" === domEventName || "change" === domEventName)
    return getInstIfValueChanged(targetInst);
}
function is(x, y) {
  return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
}
var objectIs = "function" === typeof Object.is ? Object.is : is;
function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) return true;
  if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
    return false;
  var keysA = Object.keys(objA), keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (keysB = 0; keysB < keysA.length; keysB++) {
    var currentKey = keysA[keysB];
    if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
      return false;
  }
  return true;
}
function getLeafNode(node) {
  for (; node && node.firstChild; ) node = node.firstChild;
  return node;
}
function getNodeForCharacterOffset(root2, offset) {
  var node = getLeafNode(root2);
  root2 = 0;
  for (var nodeEnd; node; ) {
    if (3 === node.nodeType) {
      nodeEnd = root2 + node.textContent.length;
      if (root2 <= offset && nodeEnd >= offset)
        return { node, offset: offset - root2 };
      root2 = nodeEnd;
    }
    a: {
      for (; node; ) {
        if (node.nextSibling) {
          node = node.nextSibling;
          break a;
        }
        node = node.parentNode;
      }
      node = void 0;
    }
    node = getLeafNode(node);
  }
}
function containsNode(outerNode, innerNode) {
  return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
}
function getActiveElementDeep(containerInfo) {
  containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
  for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
    try {
      var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
    } catch (err) {
      JSCompiler_inline_result = false;
    }
    if (JSCompiler_inline_result) containerInfo = element.contentWindow;
    else break;
    element = getActiveElement(containerInfo.document);
  }
  return element;
}
function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
}
var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = false;
function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
  var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
  mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
    anchorNode: doc.anchorNode,
    anchorOffset: doc.anchorOffset,
    focusNode: doc.focusNode,
    focusOffset: doc.focusOffset
  }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
    "onSelect",
    "select",
    null,
    nativeEvent,
    nativeEventTarget
  ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
}
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit" + styleProp] = "webkit" + eventName;
  prefixes["Moz" + styleProp] = "moz" + eventName;
  return prefixes;
}
var vendorPrefixes = {
  animationend: makePrefixMap("Animation", "AnimationEnd"),
  animationiteration: makePrefixMap("Animation", "AnimationIteration"),
  animationstart: makePrefixMap("Animation", "AnimationStart"),
  transitionrun: makePrefixMap("Transition", "TransitionRun"),
  transitionstart: makePrefixMap("Transition", "TransitionStart"),
  transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
  transitionend: makePrefixMap("Transition", "TransitionEnd")
}, prefixedEventNames = {}, style = {};
canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
  if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName], styleProp;
  for (styleProp in prefixMap)
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
      return prefixedEventNames[eventName] = prefixMap[styleProp];
  return eventName;
}
var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  " "
);
simpleEventPluginEvents.push("scrollEnd");
function registerSimpleEvent(domEventName, reactName) {
  topLevelEventsToReactNames.set(domEventName, reactName);
  registerTwoPhaseEvent(reactName, [domEventName]);
}
var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
  if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
    var event = new window.ErrorEvent("error", {
      bubbles: true,
      cancelable: true,
      message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
      error
    });
    if (!window.dispatchEvent(event)) return;
  } else if ("object" === typeof process && "function" === typeof process.emit) {
    process.emit("uncaughtException", error);
    return;
  }
  console.error(error);
}, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0;
function finishQueueingConcurrentUpdates() {
  for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
    var fiber = concurrentQueues[i];
    concurrentQueues[i++] = null;
    var queue = concurrentQueues[i];
    concurrentQueues[i++] = null;
    var update = concurrentQueues[i];
    concurrentQueues[i++] = null;
    var lane = concurrentQueues[i];
    concurrentQueues[i++] = null;
    if (null !== queue && null !== update) {
      var pending = queue.pending;
      null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
      queue.pending = update;
    }
    0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
  }
}
function enqueueUpdate$1(fiber, queue, update, lane) {
  concurrentQueues[concurrentQueuesIndex++] = fiber;
  concurrentQueues[concurrentQueuesIndex++] = queue;
  concurrentQueues[concurrentQueuesIndex++] = update;
  concurrentQueues[concurrentQueuesIndex++] = lane;
  concurrentlyUpdatedLanes |= lane;
  fiber.lanes |= lane;
  fiber = fiber.alternate;
  null !== fiber && (fiber.lanes |= lane);
}
function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
  enqueueUpdate$1(fiber, queue, update, lane);
  return getRootForUpdatedFiber(fiber);
}
function enqueueConcurrentRenderForLane(fiber, lane) {
  enqueueUpdate$1(fiber, null, null, lane);
  return getRootForUpdatedFiber(fiber);
}
function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
  sourceFiber.lanes |= lane;
  var alternate = sourceFiber.alternate;
  null !== alternate && (alternate.lanes |= lane);
  for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
    parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
  return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
}
function getRootForUpdatedFiber(sourceFiber) {
  if (50 < nestedUpdateCount)
    throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
  for (var parent = sourceFiber.return; null !== parent; )
    sourceFiber = parent, parent = sourceFiber.return;
  return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
}
var emptyContextObject = {};
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.refCleanup = this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function createFiberImplClass(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}
function shouldConstruct(Component2) {
  Component2 = Component2.prototype;
  return !(!Component2 || !Component2.isReactComponent);
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress2 = current.alternate;
  null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
    current.tag,
    pendingProps,
    current.key,
    current.mode
  ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
  workInProgress2.flags = current.flags & 65011712;
  workInProgress2.childLanes = current.childLanes;
  workInProgress2.lanes = current.lanes;
  workInProgress2.child = current.child;
  workInProgress2.memoizedProps = current.memoizedProps;
  workInProgress2.memoizedState = current.memoizedState;
  workInProgress2.updateQueue = current.updateQueue;
  pendingProps = current.dependencies;
  workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
  workInProgress2.sibling = current.sibling;
  workInProgress2.index = current.index;
  workInProgress2.ref = current.ref;
  workInProgress2.refCleanup = current.refCleanup;
  return workInProgress2;
}
function resetWorkInProgress(workInProgress2, renderLanes2) {
  workInProgress2.flags &= 65011714;
  var current = workInProgress2.alternate;
  null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
    lanes: renderLanes2.lanes,
    firstContext: renderLanes2.firstContext
  });
  return workInProgress2;
}
function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
  var fiberTag = 0;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type)
    fiberTag = isHostHoistableType(
      type,
      pendingProps,
      contextStackCursor.current
    ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
  else
    a: switch (type) {
      case REACT_ACTIVITY_TYPE:
        return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children, mode, lanes, key);
      case REACT_STRICT_MODE_TYPE:
        fiberTag = 8;
        mode |= 24;
        break;
      case REACT_PROFILER_TYPE:
        return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
      case REACT_SUSPENSE_TYPE:
        return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
      case REACT_SUSPENSE_LIST_TYPE:
        return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
      default:
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              fiberTag = 10;
              break a;
            case REACT_CONSUMER_TYPE:
              fiberTag = 9;
              break a;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = 11;
              break a;
            case REACT_MEMO_TYPE:
              fiberTag = 14;
              break a;
            case REACT_LAZY_TYPE:
              fiberTag = 16;
              owner = null;
              break a;
          }
        fiberTag = 29;
        pendingProps = Error(
          formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
        );
        owner = null;
    }
  key = createFiberImplClass(fiberTag, pendingProps, key, mode);
  key.elementType = type;
  key.type = owner;
  key.lanes = lanes;
  return key;
}
function createFiberFromFragment(elements, mode, lanes, key) {
  elements = createFiberImplClass(7, elements, key, mode);
  elements.lanes = lanes;
  return elements;
}
function createFiberFromText(content, mode, lanes) {
  content = createFiberImplClass(6, content, null, mode);
  content.lanes = lanes;
  return content;
}
function createFiberFromDehydratedFragment(dehydratedNode) {
  var fiber = createFiberImplClass(18, null, null, 0);
  fiber.stateNode = dehydratedNode;
  return fiber;
}
function createFiberFromPortal(portal, mode, lanes) {
  mode = createFiberImplClass(
    4,
    null !== portal.children ? portal.children : [],
    portal.key,
    mode
  );
  mode.lanes = lanes;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
var CapturedStacks = /* @__PURE__ */ new WeakMap();
function createCapturedValueAtFiber(value, source) {
  if ("object" === typeof value && null !== value) {
    var existing = CapturedStacks.get(value);
    if (void 0 !== existing) return existing;
    source = {
      value,
      source,
      stack: getStackByFiberInDevAndProd(source)
    };
    CapturedStacks.set(value, source);
    return source;
  }
  return {
    value,
    source,
    stack: getStackByFiberInDevAndProd(source)
  };
}
var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "";
function pushTreeFork(workInProgress2, totalChildren) {
  forkStack[forkStackIndex++] = treeForkCount;
  forkStack[forkStackIndex++] = treeForkProvider;
  treeForkProvider = workInProgress2;
  treeForkCount = totalChildren;
}
function pushTreeId(workInProgress2, totalChildren, index2) {
  idStack[idStackIndex++] = treeContextId;
  idStack[idStackIndex++] = treeContextOverflow;
  idStack[idStackIndex++] = treeContextProvider;
  treeContextProvider = workInProgress2;
  var baseIdWithLeadingBit = treeContextId;
  workInProgress2 = treeContextOverflow;
  var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
  baseIdWithLeadingBit &= ~(1 << baseLength);
  index2 += 1;
  var length = 32 - clz32(totalChildren) + baseLength;
  if (30 < length) {
    var numberOfOverflowBits = baseLength - baseLength % 5;
    length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
    baseIdWithLeadingBit >>= numberOfOverflowBits;
    baseLength -= numberOfOverflowBits;
    treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
    treeContextOverflow = length + workInProgress2;
  } else
    treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
}
function pushMaterializedTreeId(workInProgress2) {
  null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
}
function popTreeContext(workInProgress2) {
  for (; workInProgress2 === treeForkProvider; )
    treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
  for (; workInProgress2 === treeContextProvider; )
    treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
}
function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
  idStack[idStackIndex++] = treeContextId;
  idStack[idStackIndex++] = treeContextOverflow;
  idStack[idStackIndex++] = treeContextProvider;
  treeContextId = suspendedContext.id;
  treeContextOverflow = suspendedContext.overflow;
  treeContextProvider = workInProgress2;
}
var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = false, hydrationErrors = null, rootOrSingletonContext = false, HydrationMismatchException = Error(formatProdErrorMessage(519));
function throwOnHydrationMismatch(fiber) {
  var error = Error(
    formatProdErrorMessage(
      418,
      1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML",
      ""
    )
  );
  queueHydrationError(createCapturedValueAtFiber(error, fiber));
  throw HydrationMismatchException;
}
function prepareToHydrateHostInstance(fiber) {
  var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
  instance[internalInstanceKey] = fiber;
  instance[internalPropsKey] = props;
  switch (type) {
    case "dialog":
      listenToNonDelegatedEvent("cancel", instance);
      listenToNonDelegatedEvent("close", instance);
      break;
    case "iframe":
    case "object":
    case "embed":
      listenToNonDelegatedEvent("load", instance);
      break;
    case "video":
    case "audio":
      for (type = 0; type < mediaEventTypes.length; type++)
        listenToNonDelegatedEvent(mediaEventTypes[type], instance);
      break;
    case "source":
      listenToNonDelegatedEvent("error", instance);
      break;
    case "img":
    case "image":
    case "link":
      listenToNonDelegatedEvent("error", instance);
      listenToNonDelegatedEvent("load", instance);
      break;
    case "details":
      listenToNonDelegatedEvent("toggle", instance);
      break;
    case "input":
      listenToNonDelegatedEvent("invalid", instance);
      initInput(
        instance,
        props.value,
        props.defaultValue,
        props.checked,
        props.defaultChecked,
        props.type,
        props.name,
        true
      );
      break;
    case "select":
      listenToNonDelegatedEvent("invalid", instance);
      break;
    case "textarea":
      listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
  }
  type = props.children;
  "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
  instance || throwOnHydrationMismatch(fiber, true);
}
function popToNextHostParent(fiber) {
  for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
    switch (hydrationParentFiber.tag) {
      case 5:
      case 31:
      case 13:
        rootOrSingletonContext = false;
        return;
      case 27:
      case 3:
        rootOrSingletonContext = true;
        return;
      default:
        hydrationParentFiber = hydrationParentFiber.return;
    }
}
function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return false;
  if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
  var tag = fiber.tag, JSCompiler_temp;
  if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
    if (JSCompiler_temp = 5 === tag)
      JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
    JSCompiler_temp = !JSCompiler_temp;
  }
  JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
  popToNextHostParent(fiber);
  if (13 === tag) {
    fiber = fiber.memoizedState;
    fiber = null !== fiber ? fiber.dehydrated : null;
    if (!fiber) throw Error(formatProdErrorMessage(317));
    nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
  } else if (31 === tag) {
    fiber = fiber.memoizedState;
    fiber = null !== fiber ? fiber.dehydrated : null;
    if (!fiber) throw Error(formatProdErrorMessage(317));
    nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
  } else
    27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
  return true;
}
function resetHydrationState() {
  nextHydratableInstance = hydrationParentFiber = null;
  isHydrating = false;
}
function upgradeHydrationErrorsToRecoverable() {
  var queuedErrors = hydrationErrors;
  null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
    workInProgressRootRecoverableErrors,
    queuedErrors
  ), hydrationErrors = null);
  return queuedErrors;
}
function queueHydrationError(error) {
  null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
}
var valueCursor = createCursor(null), currentlyRenderingFiber$1 = null, lastContextDependency = null;
function pushProvider(providerFiber, context, nextValue) {
  push(valueCursor, context._currentValue);
  context._currentValue = nextValue;
}
function popProvider(context) {
  context._currentValue = valueCursor.current;
  pop(valueCursor);
}
function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
  for (; null !== parent; ) {
    var alternate = parent.alternate;
    (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
    if (parent === propagationRoot) break;
    parent = parent.return;
  }
}
function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
  var fiber = workInProgress2.child;
  null !== fiber && (fiber.return = workInProgress2);
  for (; null !== fiber; ) {
    var list = fiber.dependencies;
    if (null !== list) {
      var nextFiber = fiber.child;
      list = list.firstContext;
      a: for (; null !== list; ) {
        var dependency = list;
        list = fiber;
        for (var i = 0; i < contexts.length; i++)
          if (dependency.context === contexts[i]) {
            list.lanes |= renderLanes2;
            dependency = list.alternate;
            null !== dependency && (dependency.lanes |= renderLanes2);
            scheduleContextWorkOnParentPath(
              list.return,
              renderLanes2,
              workInProgress2
            );
            forcePropagateEntireTree || (nextFiber = null);
            break a;
          }
        list = dependency.next;
      }
    } else if (18 === fiber.tag) {
      nextFiber = fiber.return;
      if (null === nextFiber) throw Error(formatProdErrorMessage(341));
      nextFiber.lanes |= renderLanes2;
      list = nextFiber.alternate;
      null !== list && (list.lanes |= renderLanes2);
      scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
      nextFiber = null;
    } else nextFiber = fiber.child;
    if (null !== nextFiber) nextFiber.return = fiber;
    else
      for (nextFiber = fiber; null !== nextFiber; ) {
        if (nextFiber === workInProgress2) {
          nextFiber = null;
          break;
        }
        fiber = nextFiber.sibling;
        if (null !== fiber) {
          fiber.return = nextFiber.return;
          nextFiber = fiber;
          break;
        }
        nextFiber = nextFiber.return;
      }
    fiber = nextFiber;
  }
}
function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
  current = null;
  for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
    if (!isInsidePropagationBailout) {
      if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
      else if (0 !== (parent.flags & 262144)) break;
    }
    if (10 === parent.tag) {
      var currentParent = parent.alternate;
      if (null === currentParent) throw Error(formatProdErrorMessage(387));
      currentParent = currentParent.memoizedProps;
      if (null !== currentParent) {
        var context = parent.type;
        objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
      }
    } else if (parent === hostTransitionProviderCursor.current) {
      currentParent = parent.alternate;
      if (null === currentParent) throw Error(formatProdErrorMessage(387));
      currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
    }
    parent = parent.return;
  }
  null !== current && propagateContextChanges(
    workInProgress2,
    current,
    renderLanes2,
    forcePropagateEntireTree
  );
  workInProgress2.flags |= 262144;
}
function checkIfContextChanged(currentDependencies) {
  for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
    if (!objectIs(
      currentDependencies.context._currentValue,
      currentDependencies.memoizedValue
    ))
      return true;
    currentDependencies = currentDependencies.next;
  }
  return false;
}
function prepareToReadContext(workInProgress2) {
  currentlyRenderingFiber$1 = workInProgress2;
  lastContextDependency = null;
  workInProgress2 = workInProgress2.dependencies;
  null !== workInProgress2 && (workInProgress2.firstContext = null);
}
function readContext(context) {
  return readContextForConsumer(currentlyRenderingFiber$1, context);
}
function readContextDuringReconciliation(consumer, context) {
  null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
  return readContextForConsumer(consumer, context);
}
function readContextForConsumer(consumer, context) {
  var value = context._currentValue;
  context = { context, memoizedValue: value, next: null };
  if (null === lastContextDependency) {
    if (null === consumer) throw Error(formatProdErrorMessage(308));
    lastContextDependency = context;
    consumer.dependencies = { lanes: 0, firstContext: context };
    consumer.flags |= 524288;
  } else lastContextDependency = lastContextDependency.next = context;
  return value;
}
var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
  var listeners = [], signal = this.signal = {
    aborted: false,
    addEventListener: function(type, listener) {
      listeners.push(listener);
    }
  };
  this.abort = function() {
    signal.aborted = true;
    listeners.forEach(function(listener) {
      return listener();
    });
  };
}, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
  $$typeof: REACT_CONTEXT_TYPE,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function createCache() {
  return {
    controller: new AbortControllerLocal(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function releaseCache(cache) {
  cache.refCount--;
  0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
    cache.controller.abort();
  });
}
var currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null;
function entangleAsyncAction(transition, thenable) {
  if (null === currentEntangledListeners) {
    var entangledListeners = currentEntangledListeners = [];
    currentEntangledPendingCount = 0;
    currentEntangledLane = requestTransitionLane();
    currentEntangledActionThenable = {
      status: "pending",
      value: void 0,
      then: function(resolve) {
        entangledListeners.push(resolve);
      }
    };
  }
  currentEntangledPendingCount++;
  thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
  return thenable;
}
function pingEngtangledActionScope() {
  if (0 === --currentEntangledPendingCount && null !== currentEntangledListeners) {
    null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
    var listeners = currentEntangledListeners;
    currentEntangledListeners = null;
    currentEntangledLane = 0;
    currentEntangledActionThenable = null;
    for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
  }
}
function chainThenableValue(thenable, result) {
  var listeners = [], thenableWithOverride = {
    status: "pending",
    value: null,
    reason: null,
    then: function(resolve) {
      listeners.push(resolve);
    }
  };
  thenable.then(
    function() {
      thenableWithOverride.status = "fulfilled";
      thenableWithOverride.value = result;
      for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
    },
    function(error) {
      thenableWithOverride.status = "rejected";
      thenableWithOverride.reason = error;
      for (error = 0; error < listeners.length; error++)
        (0, listeners[error])(void 0);
    }
  );
  return thenableWithOverride;
}
var prevOnStartTransitionFinish = ReactSharedInternals.S;
ReactSharedInternals.S = function(transition, returnValue) {
  globalMostRecentTransitionTime = now();
  "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
  null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
};
var resumedCache = createCursor(null);
function peekCacheFromPool() {
  var cacheResumedFromPreviousRender = resumedCache.current;
  return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
}
function pushTransition(offscreenWorkInProgress, prevCachePool) {
  null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
}
function getSuspendedCache() {
  var cacheFromPool = peekCacheFromPool();
  return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
}
var SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), SuspenseActionException = Error(formatProdErrorMessage(542)), noopSuspenseyCommitThenable = { then: function() {
} };
function isThenableResolved(thenable) {
  thenable = thenable.status;
  return "fulfilled" === thenable || "rejected" === thenable;
}
function trackUsedThenable(thenableState2, thenable, index2) {
  index2 = thenableState2[index2];
  void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2);
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
    default:
      if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
      else {
        thenableState2 = workInProgressRoot;
        if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
          throw Error(formatProdErrorMessage(482));
        thenableState2 = thenable;
        thenableState2.status = "pending";
        thenableState2.then(
          function(fulfilledValue) {
            if ("pending" === thenable.status) {
              var fulfilledThenable = thenable;
              fulfilledThenable.status = "fulfilled";
              fulfilledThenable.value = fulfilledValue;
            }
          },
          function(error) {
            if ("pending" === thenable.status) {
              var rejectedThenable = thenable;
              rejectedThenable.status = "rejected";
              rejectedThenable.reason = error;
            }
          }
        );
      }
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
      }
      suspendedThenable = thenable;
      throw SuspenseException;
  }
}
function resolveLazy(lazyType) {
  try {
    var init = lazyType._init;
    return init(lazyType._payload);
  } catch (x) {
    if (null !== x && "object" === typeof x && "function" === typeof x.then)
      throw suspendedThenable = x, SuspenseException;
    throw x;
  }
}
var suspendedThenable = null;
function getSuspendedThenable() {
  if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
  var thenable = suspendedThenable;
  suspendedThenable = null;
  return thenable;
}
function checkIfUseWrappedInAsyncCatch(rejectedReason) {
  if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
    throw Error(formatProdErrorMessage(483));
}
var thenableState$1 = null, thenableIndexCounter$1 = 0;
function unwrapThenable(thenable) {
  var index2 = thenableIndexCounter$1;
  thenableIndexCounter$1 += 1;
  null === thenableState$1 && (thenableState$1 = []);
  return trackUsedThenable(thenableState$1, thenable, index2);
}
function coerceRef(workInProgress2, element) {
  element = element.props.ref;
  workInProgress2.ref = void 0 !== element ? element : null;
}
function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
  if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
    throw Error(formatProdErrorMessage(525));
  returnFiber = Object.prototype.toString.call(newChild);
  throw Error(
    formatProdErrorMessage(
      31,
      "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
    )
  );
}
function createChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var deletions = returnFiber.deletions;
      null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
    }
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild; )
      deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
    return null;
  }
  function mapRemainingChildren(currentFirstChild) {
    for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
      null !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
    return existingChildren;
  }
  function useFiber(fiber, pendingProps) {
    fiber = createWorkInProgress(fiber, pendingProps);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects)
      return newFiber.flags |= 1048576, lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex)
      return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex;
    newFiber.flags |= 67108866;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 67108866);
    return newFiber;
  }
  function updateTextNode(returnFiber, current, textContent, lanes) {
    if (null === current || 6 !== current.tag)
      return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
    current = useFiber(current, textContent);
    current.return = returnFiber;
    return current;
  }
  function updateElement(returnFiber, current, element, lanes) {
    var elementType = element.type;
    if (elementType === REACT_FRAGMENT_TYPE)
      return updateFragment(
        returnFiber,
        current,
        element.props.children,
        lanes,
        element.key
      );
    if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
      return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
    current = createFiberFromTypeAndProps(
      element.type,
      element.key,
      element.props,
      null,
      returnFiber.mode,
      lanes
    );
    coerceRef(current, element);
    current.return = returnFiber;
    return current;
  }
  function updatePortal(returnFiber, current, portal, lanes) {
    if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
      return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
    current = useFiber(current, portal.children || []);
    current.return = returnFiber;
    return current;
  }
  function updateFragment(returnFiber, current, fragment, lanes, key) {
    if (null === current || 7 !== current.tag)
      return current = createFiberFromFragment(
        fragment,
        returnFiber.mode,
        lanes,
        key
      ), current.return = returnFiber, current;
    current = useFiber(current, fragment);
    current.return = returnFiber;
    return current;
  }
  function createChild(returnFiber, newChild, lanes) {
    if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
      return newChild = createFiberFromText(
        "" + newChild,
        returnFiber.mode,
        lanes
      ), newChild.return = returnFiber, newChild;
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return lanes = createFiberFromTypeAndProps(
            newChild.type,
            newChild.key,
            newChild.props,
            null,
            returnFiber.mode,
            lanes
          ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
        case REACT_PORTAL_TYPE:
          return newChild = createFiberFromPortal(
            newChild,
            returnFiber.mode,
            lanes
          ), newChild.return = returnFiber, newChild;
        case REACT_LAZY_TYPE:
          return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
      }
      if (isArrayImpl(newChild) || getIteratorFn(newChild))
        return newChild = createFiberFromFragment(
          newChild,
          returnFiber.mode,
          lanes,
          null
        ), newChild.return = returnFiber, newChild;
      if ("function" === typeof newChild.then)
        return createChild(returnFiber, unwrapThenable(newChild), lanes);
      if (newChild.$$typeof === REACT_CONTEXT_TYPE)
        return createChild(
          returnFiber,
          readContextDuringReconciliation(returnFiber, newChild),
          lanes
        );
      throwOnInvalidObjectTypeImpl(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, lanes) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
      return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
        case REACT_LAZY_TYPE:
          return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
      }
      if (isArrayImpl(newChild) || getIteratorFn(newChild))
        return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
      if ("function" === typeof newChild.then)
        return updateSlot(
          returnFiber,
          oldFiber,
          unwrapThenable(newChild),
          lanes
        );
      if (newChild.$$typeof === REACT_CONTEXT_TYPE)
        return updateSlot(
          returnFiber,
          oldFiber,
          readContextDuringReconciliation(returnFiber, newChild),
          lanes
        );
      throwOnInvalidObjectTypeImpl(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
    if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
      return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return existingChildren = existingChildren.get(
            null === newChild.key ? newIdx : newChild.key
          ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
        case REACT_PORTAL_TYPE:
          return existingChildren = existingChildren.get(
            null === newChild.key ? newIdx : newChild.key
          ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
        case REACT_LAZY_TYPE:
          return newChild = resolveLazy(newChild), updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            newChild,
            lanes
          );
      }
      if (isArrayImpl(newChild) || getIteratorFn(newChild))
        return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
      if ("function" === typeof newChild.then)
        return updateFromMap(
          existingChildren,
          returnFiber,
          newIdx,
          unwrapThenable(newChild),
          lanes
        );
      if (newChild.$$typeof === REACT_CONTEXT_TYPE)
        return updateFromMap(
          existingChildren,
          returnFiber,
          newIdx,
          readContextDuringReconciliation(returnFiber, newChild),
          lanes
        );
      throwOnInvalidObjectTypeImpl(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
    for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        lanes
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length)
      return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++)
        oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
          oldFiber,
          currentFirstChild,
          newIdx
        ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
      nextOldFiber = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        newChildren[newIdx],
        lanes
      ), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(
        null === nextOldFiber.key ? newIdx : nextOldFiber.key
      ), currentFirstChild = placeChild(
        nextOldFiber,
        currentFirstChild,
        newIdx
      ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
    shouldTrackSideEffects && oldFiber.forEach(function(child) {
      return deleteChild(returnFiber, child);
    });
    isHydrating && pushTreeFork(returnFiber, newIdx);
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
    if (null == newChildren) throw Error(formatProdErrorMessage(151));
    for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done)
      return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildren.next())
        step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
      step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
    shouldTrackSideEffects && oldFiber.forEach(function(child) {
      return deleteChild(returnFiber, child);
    });
    isHydrating && pushTreeFork(returnFiber, newIdx);
    return resultingFirstChild;
  }
  function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
    "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && (newChild = newChild.props.children);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            for (var key = newChild.key; null !== currentFirstChild; ) {
              if (currentFirstChild.key === key) {
                key = newChild.type;
                if (key === REACT_FRAGMENT_TYPE) {
                  if (7 === currentFirstChild.tag) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(
                      currentFirstChild,
                      newChild.props.children
                    );
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  }
                } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  lanes = useFiber(currentFirstChild, newChild.props);
                  coerceRef(lanes, newChild);
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                  break a;
                }
                deleteRemainingChildren(returnFiber, currentFirstChild);
                break;
              } else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
              newChild.props.children,
              returnFiber.mode,
              lanes,
              newChild.key
            ), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              lanes
            ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
          }
          return placeSingleChild(returnFiber);
        case REACT_PORTAL_TYPE:
          a: {
            for (key = newChild.key; null !== currentFirstChild; ) {
              if (currentFirstChild.key === key)
                if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  lanes = useFiber(currentFirstChild, newChild.children || []);
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                  break a;
                } else {
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                }
              else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
            lanes.return = returnFiber;
            returnFiber = lanes;
          }
          return placeSingleChild(returnFiber);
        case REACT_LAZY_TYPE:
          return newChild = resolveLazy(newChild), reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
      }
      if (isArrayImpl(newChild))
        return reconcileChildrenArray(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
      if (getIteratorFn(newChild)) {
        key = getIteratorFn(newChild);
        if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
        newChild = key.call(newChild);
        return reconcileChildrenIterator(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
      }
      if ("function" === typeof newChild.then)
        return reconcileChildFibersImpl(
          returnFiber,
          currentFirstChild,
          unwrapThenable(newChild),
          lanes
        );
      if (newChild.$$typeof === REACT_CONTEXT_TYPE)
        return reconcileChildFibersImpl(
          returnFiber,
          currentFirstChild,
          readContextDuringReconciliation(returnFiber, newChild),
          lanes
        );
      throwOnInvalidObjectTypeImpl(returnFiber, newChild);
    }
    return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
  }
  return function(returnFiber, currentFirstChild, newChild, lanes) {
    try {
      thenableIndexCounter$1 = 0;
      var firstChildFiber = reconcileChildFibersImpl(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes
      );
      thenableState$1 = null;
      return firstChildFiber;
    } catch (x) {
      if (x === SuspenseException || x === SuspenseActionException) throw x;
      var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
      fiber.lanes = lanes;
      fiber.return = returnFiber;
      return fiber;
    } finally {
    }
  };
}
var reconcileChildFibers = createChildReconciler(true), mountChildFibers = createChildReconciler(false), hasForceUpdate = false;
function initializeUpdateQueue(fiber) {
  fiber.updateQueue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function cloneUpdateQueue(current, workInProgress2) {
  current = current.updateQueue;
  workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
    baseState: current.baseState,
    firstBaseUpdate: current.firstBaseUpdate,
    lastBaseUpdate: current.lastBaseUpdate,
    shared: current.shared,
    callbacks: null
  });
}
function createUpdate(lane) {
  return { lane, tag: 0, payload: null, callback: null, next: null };
}
function enqueueUpdate(fiber, update, lane) {
  var updateQueue = fiber.updateQueue;
  if (null === updateQueue) return null;
  updateQueue = updateQueue.shared;
  if (0 !== (executionContext & 2)) {
    var pending = updateQueue.pending;
    null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
    updateQueue.pending = update;
    update = getRootForUpdatedFiber(fiber);
    markUpdateLaneFromFiberToRoot(fiber, null, lane);
    return update;
  }
  enqueueUpdate$1(fiber, updateQueue, update, lane);
  return getRootForUpdatedFiber(fiber);
}
function entangleTransitions(root2, fiber, lane) {
  fiber = fiber.updateQueue;
  if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
    var queueLanes = fiber.lanes;
    queueLanes &= root2.pendingLanes;
    lane |= queueLanes;
    fiber.lanes = lane;
    markRootEntangled(root2, lane);
  }
}
function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
  var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
  if (null !== current && (current = current.updateQueue, queue === current)) {
    var newFirst = null, newLast = null;
    queue = queue.firstBaseUpdate;
    if (null !== queue) {
      do {
        var clone = {
          lane: queue.lane,
          tag: queue.tag,
          payload: queue.payload,
          callback: null,
          next: null
        };
        null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
        queue = queue.next;
      } while (null !== queue);
      null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
    } else newFirst = newLast = capturedUpdate;
    queue = {
      baseState: current.baseState,
      firstBaseUpdate: newFirst,
      lastBaseUpdate: newLast,
      shared: current.shared,
      callbacks: current.callbacks
    };
    workInProgress2.updateQueue = queue;
    return;
  }
  workInProgress2 = queue.lastBaseUpdate;
  null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
  queue.lastBaseUpdate = capturedUpdate;
}
var didReadFromEntangledAsyncAction = false;
function suspendIfUpdateReadFromEntangledAsyncAction() {
  if (didReadFromEntangledAsyncAction) {
    var entangledActionThenable = currentEntangledActionThenable;
    if (null !== entangledActionThenable) throw entangledActionThenable;
  }
}
function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
  didReadFromEntangledAsyncAction = false;
  var queue = workInProgress$jscomp$0.updateQueue;
  hasForceUpdate = false;
  var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
  if (null !== pendingQueue) {
    queue.shared.pending = null;
    var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
    lastBaseUpdate = lastPendingUpdate;
    var current = workInProgress$jscomp$0.alternate;
    null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
  }
  if (null !== firstBaseUpdate) {
    var newState = queue.baseState;
    lastBaseUpdate = 0;
    current = firstPendingUpdate = lastPendingUpdate = null;
    pendingQueue = firstBaseUpdate;
    do {
      var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
      if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
        0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
        null !== current && (current = current.next = {
          lane: 0,
          tag: pendingQueue.tag,
          payload: pendingQueue.payload,
          callback: null,
          next: null
        });
        a: {
          var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
          updateLane = props;
          var instance = instance$jscomp$0;
          switch (update.tag) {
            case 1:
              workInProgress2 = update.payload;
              if ("function" === typeof workInProgress2) {
                newState = workInProgress2.call(instance, newState, updateLane);
                break a;
              }
              newState = workInProgress2;
              break a;
            case 3:
              workInProgress2.flags = workInProgress2.flags & -65537 | 128;
            case 0:
              workInProgress2 = update.payload;
              updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
              if (null === updateLane || void 0 === updateLane) break a;
              newState = assign({}, newState, updateLane);
              break a;
            case 2:
              hasForceUpdate = true;
          }
        }
        updateLane = pendingQueue.callback;
        null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
      } else
        isHiddenUpdate = {
          lane: updateLane,
          tag: pendingQueue.tag,
          payload: pendingQueue.payload,
          callback: pendingQueue.callback,
          next: null
        }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
      pendingQueue = pendingQueue.next;
      if (null === pendingQueue)
        if (pendingQueue = queue.shared.pending, null === pendingQueue)
          break;
        else
          isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
    } while (1);
    null === current && (lastPendingUpdate = newState);
    queue.baseState = lastPendingUpdate;
    queue.firstBaseUpdate = firstPendingUpdate;
    queue.lastBaseUpdate = current;
    null === firstBaseUpdate && (queue.shared.lanes = 0);
    workInProgressRootSkippedLanes |= lastBaseUpdate;
    workInProgress$jscomp$0.lanes = lastBaseUpdate;
    workInProgress$jscomp$0.memoizedState = newState;
  }
}
function callCallback(callback, context) {
  if ("function" !== typeof callback)
    throw Error(formatProdErrorMessage(191, callback));
  callback.call(context);
}
function commitCallbacks(updateQueue, context) {
  var callbacks = updateQueue.callbacks;
  if (null !== callbacks)
    for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
      callCallback(callbacks[updateQueue], context);
}
var currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0);
function pushHiddenContext(fiber, context) {
  fiber = entangledRenderLanes;
  push(prevEntangledRenderLanesCursor, fiber);
  push(currentTreeHiddenStackCursor, context);
  entangledRenderLanes = fiber | context.baseLanes;
}
function reuseHiddenContextOnStack() {
  push(prevEntangledRenderLanesCursor, entangledRenderLanes);
  push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
}
function popHiddenContext() {
  entangledRenderLanes = prevEntangledRenderLanesCursor.current;
  pop(currentTreeHiddenStackCursor);
  pop(prevEntangledRenderLanesCursor);
}
var suspenseHandlerStackCursor = createCursor(null), shellBoundary = null;
function pushPrimaryTreeSuspenseHandler(handler) {
  var current = handler.alternate;
  push(suspenseStackCursor, suspenseStackCursor.current & 1);
  push(suspenseHandlerStackCursor, handler);
  null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
}
function pushDehydratedActivitySuspenseHandler(fiber) {
  push(suspenseStackCursor, suspenseStackCursor.current);
  push(suspenseHandlerStackCursor, fiber);
  null === shellBoundary && (shellBoundary = fiber);
}
function pushOffscreenSuspenseHandler(fiber) {
  22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
}
function reuseSuspenseHandlerOnStack() {
  push(suspenseStackCursor, suspenseStackCursor.current);
  push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
}
function popSuspenseHandler(fiber) {
  pop(suspenseHandlerStackCursor);
  shellBoundary === fiber && (shellBoundary = null);
  pop(suspenseStackCursor);
}
var suspenseStackCursor = createCursor(0);
function findFirstSuspended(row) {
  for (var node = row; null !== node; ) {
    if (13 === node.tag) {
      var state = node.memoizedState;
      if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
        return node;
    } else if (19 === node.tag && ("forwards" === node.memoizedProps.revealOrder || "backwards" === node.memoizedProps.revealOrder || "unstable_legacy-backwards" === node.memoizedProps.revealOrder || "together" === node.memoizedProps.revealOrder)) {
      if (0 !== (node.flags & 128)) return node;
    } else if (null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === row) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === row) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  return null;
}
var renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = false, didScheduleRenderPhaseUpdateDuringThisPass = false, shouldDoubleInvokeUserFnsInHooksDEV = false, localIdCounter = 0, thenableIndexCounter = 0, thenableState = null, globalClientIdCounter = 0;
function throwInvalidHookError() {
  throw Error(formatProdErrorMessage(321));
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return false;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
    if (!objectIs(nextDeps[i], prevDeps[i])) return false;
  return true;
}
function renderWithHooks(current, workInProgress2, Component2, props, secondArg, nextRenderLanes) {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber = workInProgress2;
  workInProgress2.memoizedState = null;
  workInProgress2.updateQueue = null;
  workInProgress2.lanes = 0;
  ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  shouldDoubleInvokeUserFnsInHooksDEV = false;
  nextRenderLanes = Component2(props, secondArg);
  shouldDoubleInvokeUserFnsInHooksDEV = false;
  didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
    workInProgress2,
    Component2,
    props,
    secondArg
  ));
  finishRenderingHooks(current);
  return nextRenderLanes;
}
function finishRenderingHooks(current) {
  ReactSharedInternals.H = ContextOnlyDispatcher;
  var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
  renderLanes = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber = null;
  didScheduleRenderPhaseUpdate = false;
  thenableIndexCounter = 0;
  thenableState = null;
  if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
  null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
}
function renderWithHooksAgain(workInProgress2, Component2, props, secondArg) {
  currentlyRenderingFiber = workInProgress2;
  var numberOfReRenders = 0;
  do {
    didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
    thenableIndexCounter = 0;
    didScheduleRenderPhaseUpdateDuringThisPass = false;
    if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
    numberOfReRenders += 1;
    workInProgressHook = currentHook = null;
    if (null != workInProgress2.updateQueue) {
      var children = workInProgress2.updateQueue;
      children.lastEffect = null;
      children.events = null;
      children.stores = null;
      null != children.memoCache && (children.memoCache.index = 0);
    }
    ReactSharedInternals.H = HooksDispatcherOnRerender;
    children = Component2(props, secondArg);
  } while (didScheduleRenderPhaseUpdateDuringThisPass);
  return children;
}
function TransitionAwareHostComponent() {
  var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
  maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
  dispatcher = dispatcher.useState()[0];
  (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
  return maybeThenable;
}
function checkDidRenderIdHook() {
  var didRenderIdHook = 0 !== localIdCounter;
  localIdCounter = 0;
  return didRenderIdHook;
}
function bailoutHooks(current, workInProgress2, lanes) {
  workInProgress2.updateQueue = current.updateQueue;
  workInProgress2.flags &= -2053;
  current.lanes &= ~lanes;
}
function resetHooksOnUnwind(workInProgress2) {
  if (didScheduleRenderPhaseUpdate) {
    for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
      var queue = workInProgress2.queue;
      null !== queue && (queue.pending = null);
      workInProgress2 = workInProgress2.next;
    }
    didScheduleRenderPhaseUpdate = false;
  }
  renderLanes = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber = null;
  didScheduleRenderPhaseUpdateDuringThisPass = false;
  thenableIndexCounter = localIdCounter = 0;
  thenableState = null;
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  if (null === currentHook) {
    var nextCurrentHook = currentlyRenderingFiber.alternate;
    nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
  } else nextCurrentHook = currentHook.next;
  var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
  if (null !== nextWorkInProgressHook)
    workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
  else {
    if (null === nextCurrentHook) {
      if (null === currentlyRenderingFiber.alternate)
        throw Error(formatProdErrorMessage(467));
      throw Error(formatProdErrorMessage(310));
    }
    currentHook = nextCurrentHook;
    nextCurrentHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null
    };
    null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
  }
  return workInProgressHook;
}
function createFunctionComponentUpdateQueue() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function useThenable(thenable) {
  var index2 = thenableIndexCounter;
  thenableIndexCounter += 1;
  null === thenableState && (thenableState = []);
  thenable = trackUsedThenable(thenableState, thenable, index2);
  index2 = currentlyRenderingFiber;
  null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
  return thenable;
}
function use(usable) {
  if (null !== usable && "object" === typeof usable) {
    if ("function" === typeof usable.then) return useThenable(usable);
    if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
  }
  throw Error(formatProdErrorMessage(438, String(usable)));
}
function useMemoCache(size) {
  var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
  null !== updateQueue && (memoCache = updateQueue.memoCache);
  if (null == memoCache) {
    var current = currentlyRenderingFiber.alternate;
    null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
      data: current.data.map(function(array) {
        return array.slice();
      }),
      index: 0
    })));
  }
  null == memoCache && (memoCache = { data: [], index: 0 });
  null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
  updateQueue.memoCache = memoCache;
  updateQueue = memoCache.data[memoCache.index];
  if (void 0 === updateQueue)
    for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
      updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
  memoCache.index++;
  return updateQueue;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function updateReducer(reducer) {
  var hook = updateWorkInProgressHook();
  return updateReducerImpl(hook, currentHook, reducer);
}
function updateReducerImpl(hook, current, reducer) {
  var queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
  if (null !== pendingQueue) {
    if (null !== baseQueue) {
      var baseFirst = baseQueue.next;
      baseQueue.next = pendingQueue.next;
      pendingQueue.next = baseFirst;
    }
    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }
  pendingQueue = hook.baseState;
  if (null === baseQueue) hook.memoizedState = pendingQueue;
  else {
    current = baseQueue.next;
    var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$60 = false;
    do {
      var updateLane = update.lane & -536870913;
      if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
        var revertLane = update.revertLane;
        if (0 === revertLane)
          null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
            lane: 0,
            revertLane: 0,
            gesture: null,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = true);
        else if ((renderLanes & revertLane) === revertLane) {
          update = update.next;
          revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = true);
          continue;
        } else
          updateLane = {
            lane: 0,
            revertLane: update.revertLane,
            gesture: null,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
        updateLane = update.action;
        shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
        pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
      } else
        revertLane = {
          lane: updateLane,
          revertLane: update.revertLane,
          gesture: update.gesture,
          action: update.action,
          hasEagerState: update.hasEagerState,
          eagerState: update.eagerState,
          next: null
        }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
      update = update.next;
    } while (null !== update && update !== current);
    null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
    if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$60 && (reducer = currentEntangledActionThenable, null !== reducer)))
      throw reducer;
    hook.memoizedState = pendingQueue;
    hook.baseState = baseFirst;
    hook.baseQueue = newBaseQueueLast;
    queue.lastRenderedState = pendingQueue;
  }
  null === baseQueue && (queue.lanes = 0);
  return [hook.memoizedState, queue.dispatch];
}
function rerenderReducer(reducer) {
  var hook = updateWorkInProgressHook(), queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
  if (null !== lastRenderPhaseUpdate) {
    queue.pending = null;
    var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
    do
      newState = reducer(newState, update.action), update = update.next;
    while (update !== lastRenderPhaseUpdate);
    objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
    hook.memoizedState = newState;
    null === hook.baseQueue && (hook.baseState = newState);
    queue.lastRenderedState = newState;
  }
  return [newState, dispatch];
}
function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
  if (isHydrating$jscomp$0) {
    if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
    getServerSnapshot = getServerSnapshot();
  } else getServerSnapshot = getSnapshot();
  var snapshotChanged = !objectIs(
    (currentHook || hook).memoizedState,
    getServerSnapshot
  );
  snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
  hook = hook.queue;
  updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
    subscribe
  ]);
  if (hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && workInProgressHook.memoizedState.tag & 1) {
    fiber.flags |= 2048;
    pushSimpleEffect(
      9,
      { destroy: void 0 },
      updateStoreInstance.bind(
        null,
        fiber,
        hook,
        getServerSnapshot,
        getSnapshot
      ),
      null
    );
    if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
    isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
  }
  return getServerSnapshot;
}
function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
  fiber.flags |= 16384;
  fiber = { getSnapshot, value: renderedSnapshot };
  getSnapshot = currentlyRenderingFiber.updateQueue;
  null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
}
function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
  inst.value = nextSnapshot;
  inst.getSnapshot = getSnapshot;
  checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
}
function subscribeToStore(fiber, inst, subscribe) {
  return subscribe(function() {
    checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
  });
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function forceStoreRerender(fiber) {
  var root2 = enqueueConcurrentRenderForLane(fiber, 2);
  null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
}
function mountStateImpl(initialState) {
  var hook = mountWorkInProgressHook();
  if ("function" === typeof initialState) {
    var initialStateInitializer = initialState;
    initialState = initialStateInitializer();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(true);
      try {
        initialStateInitializer();
      } finally {
        setIsStrictModeForDevtools(false);
      }
    }
  }
  hook.memoizedState = hook.baseState = initialState;
  hook.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };
  return hook;
}
function updateOptimisticImpl(hook, current, passthrough, reducer) {
  hook.baseState = passthrough;
  return updateReducerImpl(
    hook,
    currentHook,
    "function" === typeof reducer ? reducer : basicStateReducer
  );
}
function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
  if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
  fiber = actionQueue.action;
  if (null !== fiber) {
    var actionNode = {
      payload,
      action: fiber,
      next: null,
      isTransition: true,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function(listener) {
        actionNode.listeners.push(listener);
      }
    };
    null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
    setState(actionNode);
    setPendingState = actionQueue.pending;
    null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
  }
}
function runActionStateAction(actionQueue, node) {
  var action = node.action, payload = node.payload, prevState = actionQueue.state;
  if (node.isTransition) {
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    ReactSharedInternals.T = currentTransition;
    try {
      var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      handleActionReturnValue(actionQueue, node, returnValue);
    } catch (error) {
      onActionError(actionQueue, node, error);
    } finally {
      null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  } else
    try {
      prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
    } catch (error$66) {
      onActionError(actionQueue, node, error$66);
    }
}
function handleActionReturnValue(actionQueue, node, returnValue) {
  null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
    function(nextState) {
      onActionSuccess(actionQueue, node, nextState);
    },
    function(error) {
      return onActionError(actionQueue, node, error);
    }
  ) : onActionSuccess(actionQueue, node, returnValue);
}
function onActionSuccess(actionQueue, actionNode, nextState) {
  actionNode.status = "fulfilled";
  actionNode.value = nextState;
  notifyActionListeners(actionNode);
  actionQueue.state = nextState;
  actionNode = actionQueue.pending;
  null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
}
function onActionError(actionQueue, actionNode, error) {
  var last = actionQueue.pending;
  actionQueue.pending = null;
  if (null !== last) {
    last = last.next;
    do
      actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
    while (actionNode !== last);
  }
  actionQueue.action = null;
}
function notifyActionListeners(actionNode) {
  actionNode = actionNode.listeners;
  for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
}
function actionStateReducer(oldState, newState) {
  return newState;
}
function mountActionState(action, initialStateProp) {
  if (isHydrating) {
    var ssrFormState = workInProgressRoot.formState;
    if (null !== ssrFormState) {
      a: {
        var JSCompiler_inline_result = currentlyRenderingFiber;
        if (isHydrating) {
          if (nextHydratableInstance) {
            b: {
              var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
              for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                if (!inRootOrSingleton) {
                  JSCompiler_inline_result$jscomp$0 = null;
                  break b;
                }
                JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                  JSCompiler_inline_result$jscomp$0.nextSibling
                );
                if (null === JSCompiler_inline_result$jscomp$0) {
                  JSCompiler_inline_result$jscomp$0 = null;
                  break b;
                }
              }
              inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
              JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
            }
            if (JSCompiler_inline_result$jscomp$0) {
              nextHydratableInstance = getNextHydratable(
                JSCompiler_inline_result$jscomp$0.nextSibling
              );
              JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
              break a;
            }
          }
          throwOnHydrationMismatch(JSCompiler_inline_result);
        }
        JSCompiler_inline_result = false;
      }
      JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
    }
  }
  ssrFormState = mountWorkInProgressHook();
  ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
  JSCompiler_inline_result = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: actionStateReducer,
    lastRenderedState: initialStateProp
  };
  ssrFormState.queue = JSCompiler_inline_result;
  ssrFormState = dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    JSCompiler_inline_result
  );
  JSCompiler_inline_result.dispatch = ssrFormState;
  JSCompiler_inline_result = mountStateImpl(false);
  inRootOrSingleton = dispatchOptimisticSetState.bind(
    null,
    currentlyRenderingFiber,
    false,
    JSCompiler_inline_result.queue
  );
  JSCompiler_inline_result = mountWorkInProgressHook();
  JSCompiler_inline_result$jscomp$0 = {
    state: initialStateProp,
    dispatch: null,
    action,
    pending: null
  };
  JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
  ssrFormState = dispatchActionState.bind(
    null,
    currentlyRenderingFiber,
    JSCompiler_inline_result$jscomp$0,
    inRootOrSingleton,
    ssrFormState
  );
  JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
  JSCompiler_inline_result.memoizedState = action;
  return [initialStateProp, ssrFormState, false];
}
function updateActionState(action) {
  var stateHook = updateWorkInProgressHook();
  return updateActionStateImpl(stateHook, currentHook, action);
}
function updateActionStateImpl(stateHook, currentStateHook, action) {
  currentStateHook = updateReducerImpl(
    stateHook,
    currentStateHook,
    actionStateReducer
  )[0];
  stateHook = updateReducer(basicStateReducer)[0];
  if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
    try {
      var state = useThenable(currentStateHook);
    } catch (x) {
      if (x === SuspenseException) throw SuspenseActionException;
      throw x;
    }
  else state = currentStateHook;
  currentStateHook = updateWorkInProgressHook();
  var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
  action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
    9,
    { destroy: void 0 },
    actionStateActionEffect.bind(null, actionQueue, action),
    null
  ));
  return [state, dispatch, stateHook];
}
function actionStateActionEffect(actionQueue, action) {
  actionQueue.action = action;
}
function rerenderActionState(action) {
  var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
  if (null !== currentStateHook)
    return updateActionStateImpl(stateHook, currentStateHook, action);
  updateWorkInProgressHook();
  stateHook = stateHook.memoizedState;
  currentStateHook = updateWorkInProgressHook();
  var dispatch = currentStateHook.queue.dispatch;
  currentStateHook.memoizedState = action;
  return [stateHook, dispatch, false];
}
function pushSimpleEffect(tag, inst, create, deps) {
  tag = { tag, create, deps, inst, next: null };
  inst = currentlyRenderingFiber.updateQueue;
  null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
  create = inst.lastEffect;
  null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
  return tag;
}
function updateRef() {
  return updateWorkInProgressHook().memoizedState;
}
function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = mountWorkInProgressHook();
  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushSimpleEffect(
    1 | hookFlags,
    { destroy: void 0 },
    create,
    void 0 === deps ? null : deps
  );
}
function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var inst = hook.memoizedState.inst;
  null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
    1 | hookFlags,
    inst,
    create,
    deps
  ));
}
function mountEffect(create, deps) {
  mountEffectImpl(8390656, 8, create, deps);
}
function updateEffect(create, deps) {
  updateEffectImpl(2048, 8, create, deps);
}
function useEffectEventImpl(payload) {
  currentlyRenderingFiber.flags |= 4;
  var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
  if (null === componentUpdateQueue)
    componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
  else {
    var events = componentUpdateQueue.events;
    null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
  }
}
function updateEvent(callback) {
  var ref = updateWorkInProgressHook().memoizedState;
  useEffectEventImpl({ ref, nextImpl: callback });
  return function() {
    if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
    return ref.impl.apply(void 0, arguments);
  };
}
function updateInsertionEffect(create, deps) {
  return updateEffectImpl(4, 2, create, deps);
}
function updateLayoutEffect(create, deps) {
  return updateEffectImpl(4, 4, create, deps);
}
function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref) {
    create = create();
    var refCleanup = ref(create);
    return function() {
      "function" === typeof refCleanup ? refCleanup() : ref(null);
    };
  }
  if (null !== ref && void 0 !== ref)
    return create = create(), ref.current = create, function() {
      ref.current = null;
    };
}
function updateImperativeHandle(ref, create, deps) {
  deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
  updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
}
function mountDebugValue() {
}
function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (null !== deps && areHookInputsEqual(deps, prevState[1]))
    return prevState[0];
  hook.memoizedState = [callback, deps];
  return callback;
}
function updateMemo(nextCreate, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (null !== deps && areHookInputsEqual(deps, prevState[1]))
    return prevState[0];
  prevState = nextCreate();
  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    setIsStrictModeForDevtools(true);
    try {
      nextCreate();
    } finally {
      setIsStrictModeForDevtools(false);
    }
  }
  hook.memoizedState = [prevState, deps];
  return prevState;
}
function mountDeferredValueImpl(hook, value, initialValue) {
  if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
    return hook.memoizedState = value;
  hook.memoizedState = initialValue;
  hook = requestDeferredLane();
  currentlyRenderingFiber.lanes |= hook;
  workInProgressRootSkippedLanes |= hook;
  return initialValue;
}
function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
  if (objectIs(value, prevValue)) return value;
  if (null !== currentTreeHiddenStackCursor.current)
    return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
  if (0 === (renderLanes & 42) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
    return didReceiveUpdate = true, hook.memoizedState = value;
  hook = requestDeferredLane();
  currentlyRenderingFiber.lanes |= hook;
  workInProgressRootSkippedLanes |= hook;
  return prevValue;
}
function startTransition(fiber, queue, pendingState, finishedState, callback) {
  var previousPriority = ReactDOMSharedInternals.p;
  ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
  var prevTransition = ReactSharedInternals.T, currentTransition = {};
  ReactSharedInternals.T = currentTransition;
  dispatchOptimisticSetState(fiber, false, queue, pendingState);
  try {
    var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
    null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
    if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
      var thenableForFinishedState = chainThenableValue(
        returnValue,
        finishedState
      );
      dispatchSetStateInternal(
        fiber,
        queue,
        thenableForFinishedState,
        requestUpdateLane(fiber)
      );
    } else
      dispatchSetStateInternal(
        fiber,
        queue,
        finishedState,
        requestUpdateLane(fiber)
      );
  } catch (error) {
    dispatchSetStateInternal(
      fiber,
      queue,
      { then: function() {
      }, status: "rejected", reason: error },
      requestUpdateLane()
    );
  } finally {
    ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
  }
}
function noop() {
}
function startHostTransition(formFiber, pendingState, action, formData) {
  if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
  var queue = ensureFormComponentIsStateful(formFiber).queue;
  startTransition(
    formFiber,
    queue,
    pendingState,
    sharedNotPendingObject,
    null === action ? noop : function() {
      requestFormReset$1(formFiber);
      return action(formData);
    }
  );
}
function ensureFormComponentIsStateful(formFiber) {
  var existingStateHook = formFiber.memoizedState;
  if (null !== existingStateHook) return existingStateHook;
  existingStateHook = {
    memoizedState: sharedNotPendingObject,
    baseState: sharedNotPendingObject,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: sharedNotPendingObject
    },
    next: null
  };
  var initialResetState = {};
  existingStateHook.next = {
    memoizedState: initialResetState,
    baseState: initialResetState,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: initialResetState
    },
    next: null
  };
  formFiber.memoizedState = existingStateHook;
  formFiber = formFiber.alternate;
  null !== formFiber && (formFiber.memoizedState = existingStateHook);
  return existingStateHook;
}
function requestFormReset$1(formFiber) {
  var stateHook = ensureFormComponentIsStateful(formFiber);
  null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
  dispatchSetStateInternal(
    formFiber,
    stateHook.next.queue,
    {},
    requestUpdateLane()
  );
}
function useHostTransitionStatus() {
  return readContext(HostTransitionContext);
}
function updateId() {
  return updateWorkInProgressHook().memoizedState;
}
function updateRefresh() {
  return updateWorkInProgressHook().memoizedState;
}
function refreshCache(fiber) {
  for (var provider = fiber.return; null !== provider; ) {
    switch (provider.tag) {
      case 24:
      case 3:
        var lane = requestUpdateLane();
        fiber = createUpdate(lane);
        var root$69 = enqueueUpdate(provider, fiber, lane);
        null !== root$69 && (scheduleUpdateOnFiber(root$69, provider, lane), entangleTransitions(root$69, provider, lane));
        provider = { cache: createCache() };
        fiber.payload = provider;
        return;
    }
    provider = provider.return;
  }
}
function dispatchReducerAction(fiber, queue, action) {
  var lane = requestUpdateLane();
  action = {
    lane,
    revertLane: 0,
    gesture: null,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };
  isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
}
function dispatchSetState(fiber, queue, action) {
  var lane = requestUpdateLane();
  dispatchSetStateInternal(fiber, queue, action, lane);
}
function dispatchSetStateInternal(fiber, queue, action, lane) {
  var update = {
    lane,
    revertLane: 0,
    gesture: null,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };
  if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
  else {
    var alternate = fiber.alternate;
    if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
      try {
        var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
        update.hasEagerState = true;
        update.eagerState = eagerState;
        if (objectIs(eagerState, currentState))
          return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
      } catch (error) {
      } finally {
      }
    action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
    if (null !== action)
      return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
  }
  return false;
}
function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
  action = {
    lane: 2,
    revertLane: requestTransitionLane(),
    gesture: null,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };
  if (isRenderPhaseUpdate(fiber)) {
    if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
  } else
    throwIfDuringRender = enqueueConcurrentHookUpdate(
      fiber,
      queue,
      action,
      2
    ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
}
function isRenderPhaseUpdate(fiber) {
  var alternate = fiber.alternate;
  return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
}
function enqueueRenderPhaseUpdate(queue, update) {
  didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  var pending = queue.pending;
  null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
  queue.pending = update;
}
function entangleTransitionUpdate(root2, queue, lane) {
  if (0 !== (lane & 4194048)) {
    var queueLanes = queue.lanes;
    queueLanes &= root2.pendingLanes;
    lane |= queueLanes;
    queue.lanes = lane;
    markRootEntangled(root2, lane);
  }
}
var ContextOnlyDispatcher = {
  readContext,
  use,
  useCallback: throwInvalidHookError,
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useImperativeHandle: throwInvalidHookError,
  useLayoutEffect: throwInvalidHookError,
  useInsertionEffect: throwInvalidHookError,
  useMemo: throwInvalidHookError,
  useReducer: throwInvalidHookError,
  useRef: throwInvalidHookError,
  useState: throwInvalidHookError,
  useDebugValue: throwInvalidHookError,
  useDeferredValue: throwInvalidHookError,
  useTransition: throwInvalidHookError,
  useSyncExternalStore: throwInvalidHookError,
  useId: throwInvalidHookError,
  useHostTransitionStatus: throwInvalidHookError,
  useFormState: throwInvalidHookError,
  useActionState: throwInvalidHookError,
  useOptimistic: throwInvalidHookError,
  useMemoCache: throwInvalidHookError,
  useCacheRefresh: throwInvalidHookError
};
ContextOnlyDispatcher.useEffectEvent = throwInvalidHookError;
var HooksDispatcherOnMount = {
  readContext,
  use,
  useCallback: function(callback, deps) {
    mountWorkInProgressHook().memoizedState = [
      callback,
      void 0 === deps ? null : deps
    ];
    return callback;
  },
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: function(ref, create, deps) {
    deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
    mountEffectImpl(
      4194308,
      4,
      imperativeHandleEffect.bind(null, create, ref),
      deps
    );
  },
  useLayoutEffect: function(create, deps) {
    return mountEffectImpl(4194308, 4, create, deps);
  },
  useInsertionEffect: function(create, deps) {
    mountEffectImpl(4, 2, create, deps);
  },
  useMemo: function(nextCreate, deps) {
    var hook = mountWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var nextValue = nextCreate();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(true);
      try {
        nextCreate();
      } finally {
        setIsStrictModeForDevtools(false);
      }
    }
    hook.memoizedState = [nextValue, deps];
    return nextValue;
  },
  useReducer: function(reducer, initialArg, init) {
    var hook = mountWorkInProgressHook();
    if (void 0 !== init) {
      var initialState = init(initialArg);
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          init(initialArg);
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
    } else initialState = initialArg;
    hook.memoizedState = hook.baseState = initialState;
    reducer = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: reducer,
      lastRenderedState: initialState
    };
    hook.queue = reducer;
    reducer = reducer.dispatch = dispatchReducerAction.bind(
      null,
      currentlyRenderingFiber,
      reducer
    );
    return [hook.memoizedState, reducer];
  },
  useRef: function(initialValue) {
    var hook = mountWorkInProgressHook();
    initialValue = { current: initialValue };
    return hook.memoizedState = initialValue;
  },
  useState: function(initialState) {
    initialState = mountStateImpl(initialState);
    var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
    queue.dispatch = dispatch;
    return [initialState.memoizedState, dispatch];
  },
  useDebugValue: mountDebugValue,
  useDeferredValue: function(value, initialValue) {
    var hook = mountWorkInProgressHook();
    return mountDeferredValueImpl(hook, value, initialValue);
  },
  useTransition: function() {
    var stateHook = mountStateImpl(false);
    stateHook = startTransition.bind(
      null,
      currentlyRenderingFiber,
      stateHook.queue,
      true,
      false
    );
    mountWorkInProgressHook().memoizedState = stateHook;
    return [false, stateHook];
  },
  useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
    var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
    if (isHydrating) {
      if (void 0 === getServerSnapshot)
        throw Error(formatProdErrorMessage(407));
      getServerSnapshot = getServerSnapshot();
    } else {
      getServerSnapshot = getSnapshot();
      if (null === workInProgressRoot)
        throw Error(formatProdErrorMessage(349));
      0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
    }
    hook.memoizedState = getServerSnapshot;
    var inst = { value: getServerSnapshot, getSnapshot };
    hook.queue = inst;
    mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
      subscribe
    ]);
    fiber.flags |= 2048;
    pushSimpleEffect(
      9,
      { destroy: void 0 },
      updateStoreInstance.bind(
        null,
        fiber,
        inst,
        getServerSnapshot,
        getSnapshot
      ),
      null
    );
    return getServerSnapshot;
  },
  useId: function() {
    var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
    if (isHydrating) {
      var JSCompiler_inline_result = treeContextOverflow;
      var idWithLeadingBit = treeContextId;
      JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
      identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
      JSCompiler_inline_result = localIdCounter++;
      0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
      identifierPrefix += "_";
    } else
      JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
    return hook.memoizedState = identifierPrefix;
  },
  useHostTransitionStatus,
  useFormState: mountActionState,
  useActionState: mountActionState,
  useOptimistic: function(passthrough) {
    var hook = mountWorkInProgressHook();
    hook.memoizedState = hook.baseState = passthrough;
    var queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    hook.queue = queue;
    hook = dispatchOptimisticSetState.bind(
      null,
      currentlyRenderingFiber,
      true,
      queue
    );
    queue.dispatch = hook;
    return [passthrough, hook];
  },
  useMemoCache,
  useCacheRefresh: function() {
    return mountWorkInProgressHook().memoizedState = refreshCache.bind(
      null,
      currentlyRenderingFiber
    );
  },
  useEffectEvent: function(callback) {
    var hook = mountWorkInProgressHook(), ref = { impl: callback };
    hook.memoizedState = ref;
    return function() {
      if (0 !== (executionContext & 2))
        throw Error(formatProdErrorMessage(440));
      return ref.impl.apply(void 0, arguments);
    };
  }
}, HooksDispatcherOnUpdate = {
  readContext,
  use,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: function() {
    return updateReducer(basicStateReducer);
  },
  useDebugValue: mountDebugValue,
  useDeferredValue: function(value, initialValue) {
    var hook = updateWorkInProgressHook();
    return updateDeferredValueImpl(
      hook,
      currentHook.memoizedState,
      value,
      initialValue
    );
  },
  useTransition: function() {
    var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
    return [
      "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
      start
    ];
  },
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId,
  useHostTransitionStatus,
  useFormState: updateActionState,
  useActionState: updateActionState,
  useOptimistic: function(passthrough, reducer) {
    var hook = updateWorkInProgressHook();
    return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
  },
  useMemoCache,
  useCacheRefresh: updateRefresh
};
HooksDispatcherOnUpdate.useEffectEvent = updateEvent;
var HooksDispatcherOnRerender = {
  readContext,
  use,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: rerenderReducer,
  useRef: updateRef,
  useState: function() {
    return rerenderReducer(basicStateReducer);
  },
  useDebugValue: mountDebugValue,
  useDeferredValue: function(value, initialValue) {
    var hook = updateWorkInProgressHook();
    return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
      hook,
      currentHook.memoizedState,
      value,
      initialValue
    );
  },
  useTransition: function() {
    var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
    return [
      "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
      start
    ];
  },
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId,
  useHostTransitionStatus,
  useFormState: rerenderActionState,
  useActionState: rerenderActionState,
  useOptimistic: function(passthrough, reducer) {
    var hook = updateWorkInProgressHook();
    if (null !== currentHook)
      return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
    hook.baseState = passthrough;
    return [passthrough, hook.queue.dispatch];
  },
  useMemoCache,
  useCacheRefresh: updateRefresh
};
HooksDispatcherOnRerender.useEffectEvent = updateEvent;
function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
  ctor = workInProgress2.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
  workInProgress2.memoizedState = getDerivedStateFromProps;
  0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  enqueueSetState: function(inst, payload, callback) {
    inst = inst._reactInternals;
    var lane = requestUpdateLane(), update = createUpdate(lane);
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    payload = enqueueUpdate(inst, update, lane);
    null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
  },
  enqueueReplaceState: function(inst, payload, callback) {
    inst = inst._reactInternals;
    var lane = requestUpdateLane(), update = createUpdate(lane);
    update.tag = 1;
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    payload = enqueueUpdate(inst, update, lane);
    null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
  },
  enqueueForceUpdate: function(inst, callback) {
    inst = inst._reactInternals;
    var lane = requestUpdateLane(), update = createUpdate(lane);
    update.tag = 2;
    void 0 !== callback && null !== callback && (update.callback = callback);
    callback = enqueueUpdate(inst, update, lane);
    null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
  }
};
function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
  workInProgress2 = workInProgress2.stateNode;
  return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
}
function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
  workInProgress2 = instance.state;
  "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function resolveClassComponentProps(Component2, baseProps) {
  var newProps = baseProps;
  if ("ref" in baseProps) {
    newProps = {};
    for (var propName in baseProps)
      "ref" !== propName && (newProps[propName] = baseProps[propName]);
  }
  if (Component2 = Component2.defaultProps) {
    newProps === baseProps && (newProps = assign({}, newProps));
    for (var propName$73 in Component2)
      void 0 === newProps[propName$73] && (newProps[propName$73] = Component2[propName$73]);
  }
  return newProps;
}
function defaultOnUncaughtError(error) {
  reportGlobalError(error);
}
function defaultOnCaughtError(error) {
  console.error(error);
}
function defaultOnRecoverableError(error) {
  reportGlobalError(error);
}
function logUncaughtError(root2, errorInfo) {
  try {
    var onUncaughtError = root2.onUncaughtError;
    onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
  } catch (e$74) {
    setTimeout(function() {
      throw e$74;
    });
  }
}
function logCaughtError(root2, boundary, errorInfo) {
  try {
    var onCaughtError = root2.onCaughtError;
    onCaughtError(errorInfo.value, {
      componentStack: errorInfo.stack,
      errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
    });
  } catch (e$75) {
    setTimeout(function() {
      throw e$75;
    });
  }
}
function createRootErrorUpdate(root2, errorInfo, lane) {
  lane = createUpdate(lane);
  lane.tag = 3;
  lane.payload = { element: null };
  lane.callback = function() {
    logUncaughtError(root2, errorInfo);
  };
  return lane;
}
function createClassErrorUpdate(lane) {
  lane = createUpdate(lane);
  lane.tag = 3;
  return lane;
}
function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    update.payload = function() {
      return getDerivedStateFromError(error);
    };
    update.callback = function() {
      logCaughtError(root2, fiber, errorInfo);
    };
  }
  var inst = fiber.stateNode;
  null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
    logCaughtError(root2, fiber, errorInfo);
    "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
    var stack = errorInfo.stack;
    this.componentDidCatch(errorInfo.value, {
      componentStack: null !== stack ? stack : ""
    });
  });
}
function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
  sourceFiber.flags |= 32768;
  if (null !== value && "object" === typeof value && "function" === typeof value.then) {
    returnFiber = sourceFiber.alternate;
    null !== returnFiber && propagateParentContextChanges(
      returnFiber,
      sourceFiber,
      rootRenderLanes,
      true
    );
    sourceFiber = suspenseHandlerStackCursor.current;
    if (null !== sourceFiber) {
      switch (sourceFiber.tag) {
        case 31:
        case 13:
          return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
        case 22:
          return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([value])
          }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
      }
      throw Error(formatProdErrorMessage(435, sourceFiber.tag));
    }
    attachPingListener(root2, value, rootRenderLanes);
    renderDidSuspendDelayIfPossible();
    return false;
  }
  if (isHydrating)
    return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
      cause: value
    }), queueHydrationError(
      createCapturedValueAtFiber(returnFiber, sourceFiber)
    )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
      root2.stateNode,
      value,
      rootRenderLanes
    ), enqueueCapturedUpdate(root2, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
  var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
  wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
  null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
  4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
  if (null === returnFiber) return true;
  value = createCapturedValueAtFiber(value, sourceFiber);
  sourceFiber = returnFiber;
  do {
    switch (sourceFiber.tag) {
      case 3:
        return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
      case 1:
        if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
          return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
            rootRenderLanes,
            root2,
            sourceFiber,
            value
          ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
    }
    sourceFiber = sourceFiber.return;
  } while (null !== sourceFiber);
  return false;
}
var SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = false;
function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
  workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
    workInProgress2,
    current.child,
    nextChildren,
    renderLanes2
  );
}
function updateForwardRef(current, workInProgress2, Component2, nextProps, renderLanes2) {
  Component2 = Component2.render;
  var ref = workInProgress2.ref;
  if ("ref" in nextProps) {
    var propsWithoutRef = {};
    for (var key in nextProps)
      "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
  } else propsWithoutRef = nextProps;
  prepareToReadContext(workInProgress2);
  nextProps = renderWithHooks(
    current,
    workInProgress2,
    Component2,
    propsWithoutRef,
    ref,
    renderLanes2
  );
  key = checkDidRenderIdHook();
  if (null !== current && !didReceiveUpdate)
    return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  isHydrating && key && pushMaterializedTreeId(workInProgress2);
  workInProgress2.flags |= 1;
  reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
  return workInProgress2.child;
}
function updateMemoComponent(current, workInProgress2, Component2, nextProps, renderLanes2) {
  if (null === current) {
    var type = Component2.type;
    if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component2.compare)
      return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
        current,
        workInProgress2,
        type,
        nextProps,
        renderLanes2
      );
    current = createFiberFromTypeAndProps(
      Component2.type,
      null,
      nextProps,
      workInProgress2,
      workInProgress2.mode,
      renderLanes2
    );
    current.ref = workInProgress2.ref;
    current.return = workInProgress2;
    return workInProgress2.child = current;
  }
  type = current.child;
  if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
    var prevProps = type.memoizedProps;
    Component2 = Component2.compare;
    Component2 = null !== Component2 ? Component2 : shallowEqual;
    if (Component2(prevProps, nextProps) && current.ref === workInProgress2.ref)
      return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  }
  workInProgress2.flags |= 1;
  current = createWorkInProgress(type, nextProps);
  current.ref = workInProgress2.ref;
  current.return = workInProgress2;
  return workInProgress2.child = current;
}
function updateSimpleMemoComponent(current, workInProgress2, Component2, nextProps, renderLanes2) {
  if (null !== current) {
    var prevProps = current.memoizedProps;
    if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
      if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
        0 !== (current.flags & 131072) && (didReceiveUpdate = true);
      else
        return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  }
  return updateFunctionComponent(
    current,
    workInProgress2,
    Component2,
    nextProps,
    renderLanes2
  );
}
function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
  var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
  null === current && null === workInProgress2.stateNode && (workInProgress2.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  });
  if ("hidden" === nextProps.mode) {
    if (0 !== (workInProgress2.flags & 128)) {
      prevState = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
      if (null !== current) {
        nextProps = workInProgress2.child = current.child;
        for (nextChildren = 0; null !== nextProps; )
          nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
        nextProps = nextChildren & ~prevState;
      } else nextProps = 0, workInProgress2.child = null;
      return deferHiddenOffscreenComponent(
        current,
        workInProgress2,
        prevState,
        renderLanes2,
        nextProps
      );
    }
    if (0 !== (renderLanes2 & 536870912))
      workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
        workInProgress2,
        null !== prevState ? prevState.cachePool : null
      ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
    else
      return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(
        current,
        workInProgress2,
        null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
        renderLanes2,
        nextProps
      );
  } else
    null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
  reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
  return workInProgress2.child;
}
function bailoutOffscreenComponent(current, workInProgress2) {
  null !== current && 22 === current.tag || null !== workInProgress2.stateNode || (workInProgress2.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  });
  return workInProgress2.sibling;
}
function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
  var JSCompiler_inline_result = peekCacheFromPool();
  JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
  workInProgress2.memoizedState = {
    baseLanes: nextBaseLanes,
    cachePool: JSCompiler_inline_result
  };
  null !== current && pushTransition(workInProgress2, null);
  reuseHiddenContextOnStack();
  pushOffscreenSuspenseHandler(workInProgress2);
  null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
  workInProgress2.childLanes = remainingChildLanes;
  return null;
}
function mountActivityChildren(workInProgress2, nextProps) {
  nextProps = mountWorkInProgressOffscreenFiber(
    { mode: nextProps.mode, children: nextProps.children },
    workInProgress2.mode
  );
  nextProps.ref = workInProgress2.ref;
  workInProgress2.child = nextProps;
  nextProps.return = workInProgress2;
  return nextProps;
}
function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
  reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
  current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps);
  current.flags |= 2;
  popSuspenseHandler(workInProgress2);
  workInProgress2.memoizedState = null;
  return current;
}
function updateActivityComponent(current, workInProgress2, renderLanes2) {
  var nextProps = workInProgress2.pendingProps, didSuspend = 0 !== (workInProgress2.flags & 128);
  workInProgress2.flags &= -129;
  if (null === current) {
    if (isHydrating) {
      if ("hidden" === nextProps.mode)
        return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, bailoutOffscreenComponent(null, current);
      pushDehydratedActivitySuspenseHandler(workInProgress2);
      (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
        current,
        rootOrSingletonContext
      ), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
        dehydrated: current,
        treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
        retryLane: 536870912,
        hydrationErrors: null
      }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
      if (null === current) throw throwOnHydrationMismatch(workInProgress2);
      workInProgress2.lanes = 536870912;
      return null;
    }
    return mountActivityChildren(workInProgress2, nextProps);
  }
  var prevState = current.memoizedState;
  if (null !== prevState) {
    var dehydrated = prevState.dehydrated;
    pushDehydratedActivitySuspenseHandler(workInProgress2);
    if (didSuspend)
      if (workInProgress2.flags & 256)
        workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      else if (null !== workInProgress2.memoizedState)
        workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
      else throw Error(formatProdErrorMessage(558));
    else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), didSuspend = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || didSuspend) {
      nextProps = workInProgressRoot;
      if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), 0 !== dehydrated && dehydrated !== prevState.retryLane))
        throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
      renderDidSuspendDelayIfPossible();
      workInProgress2 = retryActivityComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    } else
      current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 4096;
    return workInProgress2;
  }
  current = createWorkInProgress(current.child, {
    mode: nextProps.mode,
    children: nextProps.children
  });
  current.ref = workInProgress2.ref;
  workInProgress2.child = current;
  current.return = workInProgress2;
  return current;
}
function markRef(current, workInProgress2) {
  var ref = workInProgress2.ref;
  if (null === ref)
    null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
  else {
    if ("function" !== typeof ref && "object" !== typeof ref)
      throw Error(formatProdErrorMessage(284));
    if (null === current || current.ref !== ref)
      workInProgress2.flags |= 4194816;
  }
}
function updateFunctionComponent(current, workInProgress2, Component2, nextProps, renderLanes2) {
  prepareToReadContext(workInProgress2);
  Component2 = renderWithHooks(
    current,
    workInProgress2,
    Component2,
    nextProps,
    void 0,
    renderLanes2
  );
  nextProps = checkDidRenderIdHook();
  if (null !== current && !didReceiveUpdate)
    return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
  workInProgress2.flags |= 1;
  reconcileChildren(current, workInProgress2, Component2, renderLanes2);
  return workInProgress2.child;
}
function replayFunctionComponent(current, workInProgress2, nextProps, Component2, secondArg, renderLanes2) {
  prepareToReadContext(workInProgress2);
  workInProgress2.updateQueue = null;
  nextProps = renderWithHooksAgain(
    workInProgress2,
    Component2,
    nextProps,
    secondArg
  );
  finishRenderingHooks(current);
  Component2 = checkDidRenderIdHook();
  if (null !== current && !didReceiveUpdate)
    return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  isHydrating && Component2 && pushMaterializedTreeId(workInProgress2);
  workInProgress2.flags |= 1;
  reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
  return workInProgress2.child;
}
function updateClassComponent(current, workInProgress2, Component2, nextProps, renderLanes2) {
  prepareToReadContext(workInProgress2);
  if (null === workInProgress2.stateNode) {
    var context = emptyContextObject, contextType = Component2.contextType;
    "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
    context = new Component2(nextProps, context);
    workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
    context.updater = classComponentUpdater;
    workInProgress2.stateNode = context;
    context._reactInternals = workInProgress2;
    context = workInProgress2.stateNode;
    context.props = nextProps;
    context.state = workInProgress2.memoizedState;
    context.refs = {};
    initializeUpdateQueue(workInProgress2);
    contextType = Component2.contextType;
    context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
    context.state = workInProgress2.memoizedState;
    contextType = Component2.getDerivedStateFromProps;
    "function" === typeof contextType && (applyDerivedStateFromProps(
      workInProgress2,
      Component2,
      contextType,
      nextProps
    ), context.state = workInProgress2.memoizedState);
    "function" === typeof Component2.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
    "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
    nextProps = true;
  } else if (null === current) {
    context = workInProgress2.stateNode;
    var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component2, unresolvedOldProps);
    context.props = oldProps;
    var oldContext = context.context, contextType$jscomp$0 = Component2.contextType;
    contextType = emptyContextObject;
    "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
    var getDerivedStateFromProps = Component2.getDerivedStateFromProps;
    contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
    unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
    contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
      workInProgress2,
      context,
      nextProps,
      contextType
    );
    hasForceUpdate = false;
    var oldState = workInProgress2.memoizedState;
    context.state = oldState;
    processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
    suspendIfUpdateReadFromEntangledAsyncAction();
    oldContext = workInProgress2.memoizedState;
    unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
      workInProgress2,
      Component2,
      getDerivedStateFromProps,
      nextProps
    ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
      workInProgress2,
      Component2,
      oldProps,
      nextProps,
      oldState,
      oldContext,
      contextType
    )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
  } else {
    context = workInProgress2.stateNode;
    cloneUpdateQueue(current, workInProgress2);
    contextType = workInProgress2.memoizedProps;
    contextType$jscomp$0 = resolveClassComponentProps(Component2, contextType);
    context.props = contextType$jscomp$0;
    getDerivedStateFromProps = workInProgress2.pendingProps;
    oldState = context.context;
    oldContext = Component2.contextType;
    oldProps = emptyContextObject;
    "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
    unresolvedOldProps = Component2.getDerivedStateFromProps;
    (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
      workInProgress2,
      context,
      nextProps,
      oldProps
    );
    hasForceUpdate = false;
    oldState = workInProgress2.memoizedState;
    context.state = oldState;
    processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
    suspendIfUpdateReadFromEntangledAsyncAction();
    var newState = workInProgress2.memoizedState;
    contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
      workInProgress2,
      Component2,
      unresolvedOldProps,
      nextProps
    ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
      workInProgress2,
      Component2,
      contextType$jscomp$0,
      nextProps,
      oldState,
      newState,
      oldProps
    ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
      nextProps,
      newState,
      oldProps
    )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
  }
  context = nextProps;
  markRef(current, workInProgress2);
  nextProps = 0 !== (workInProgress2.flags & 128);
  context || nextProps ? (context = workInProgress2.stateNode, Component2 = nextProps && "function" !== typeof Component2.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
    workInProgress2,
    current.child,
    null,
    renderLanes2
  ), workInProgress2.child = reconcileChildFibers(
    workInProgress2,
    null,
    Component2,
    renderLanes2
  )) : reconcileChildren(current, workInProgress2, Component2, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
    current,
    workInProgress2,
    renderLanes2
  );
  return current;
}
function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
  resetHydrationState();
  workInProgress2.flags |= 256;
  reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
  return workInProgress2.child;
}
var SUSPENDED_MARKER = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null
};
function mountSuspenseOffscreenState(renderLanes2) {
  return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
}
function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
  current = null !== current ? current.childLanes & ~renderLanes2 : 0;
  primaryTreeDidDefer && (current |= workInProgressDeferredLane);
  return current;
}
function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
  var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
  (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
  JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
  JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
  workInProgress2.flags &= -33;
  if (null === current) {
    if (isHydrating) {
      showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
      (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
        current,
        rootOrSingletonContext
      ), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
        dehydrated: current,
        treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
        retryLane: 536870912,
        hydrationErrors: null
      }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
      if (null === current) throw throwOnHydrationMismatch(workInProgress2);
      isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912;
      return null;
    }
    var nextPrimaryChildren = nextProps.children;
    nextProps = nextProps.fallback;
    if (showFallback)
      return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, nextPrimaryChildren = mountWorkInProgressOffscreenFiber(
        { mode: "hidden", children: nextPrimaryChildren },
        showFallback
      ), nextProps = createFiberFromFragment(
        nextProps,
        showFallback,
        renderLanes2,
        null
      ), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextPrimaryChildren.sibling = nextProps, workInProgress2.child = nextPrimaryChildren, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        JSCompiler_temp,
        renderLanes2
      ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
    pushPrimaryTreeSuspenseHandler(workInProgress2);
    return mountSuspensePrimaryChildren(workInProgress2, nextPrimaryChildren);
  }
  var prevState = current.memoizedState;
  if (null !== prevState && (nextPrimaryChildren = prevState.dehydrated, null !== nextPrimaryChildren)) {
    if (didSuspend)
      workInProgress2.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, workInProgress2 = retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      )) : null !== workInProgress2.memoizedState ? (reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null) : (reuseSuspenseHandlerOnStack(), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, nextProps = mountWorkInProgressOffscreenFiber(
        { mode: "visible", children: nextProps.children },
        showFallback
      ), nextPrimaryChildren = createFiberFromFragment(
        nextPrimaryChildren,
        showFallback,
        renderLanes2,
        null
      ), nextPrimaryChildren.flags |= 2, nextProps.return = workInProgress2, nextPrimaryChildren.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, reconcileChildFibers(
        workInProgress2,
        current.child,
        null,
        renderLanes2
      ), nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        JSCompiler_temp,
        renderLanes2
      ), workInProgress2.memoizedState = SUSPENDED_MARKER, workInProgress2 = bailoutOffscreenComponent(null, nextProps));
    else if (pushPrimaryTreeSuspenseHandler(workInProgress2), isSuspenseInstanceFallback(nextPrimaryChildren)) {
      JSCompiler_temp = nextPrimaryChildren.nextSibling && nextPrimaryChildren.nextSibling.dataset;
      if (JSCompiler_temp) var digest = JSCompiler_temp.dgst;
      JSCompiler_temp = digest;
      nextProps = Error(formatProdErrorMessage(419));
      nextProps.stack = "";
      nextProps.digest = JSCompiler_temp;
      queueHydrationError({ value: nextProps, source: null, stack: null });
      workInProgress2 = retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    } else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), JSCompiler_temp = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
      JSCompiler_temp = workInProgressRoot;
      if (null !== JSCompiler_temp && (nextProps = getBumpedLaneForHydration(JSCompiler_temp, renderLanes2), 0 !== nextProps && nextProps !== prevState.retryLane))
        throw prevState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
      isSuspenseInstancePending(nextPrimaryChildren) || renderDidSuspendDelayIfPossible();
      workInProgress2 = retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    } else
      isSuspenseInstancePending(nextPrimaryChildren) ? (workInProgress2.flags |= 192, workInProgress2.child = current.child, workInProgress2 = null) : (current = prevState.treeContext, nextHydratableInstance = getNextHydratable(
        nextPrimaryChildren.nextSibling
      ), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountSuspensePrimaryChildren(
        workInProgress2,
        nextProps.children
      ), workInProgress2.flags |= 4096);
    return workInProgress2;
  }
  if (showFallback)
    return reuseSuspenseHandlerOnStack(), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, prevState = current.child, digest = prevState.sibling, nextProps = createWorkInProgress(prevState, {
      mode: "hidden",
      children: nextProps.children
    }), nextProps.subtreeFlags = prevState.subtreeFlags & 65011712, null !== digest ? nextPrimaryChildren = createWorkInProgress(
      digest,
      nextPrimaryChildren
    ) : (nextPrimaryChildren = createFiberFromFragment(
      nextPrimaryChildren,
      showFallback,
      renderLanes2,
      null
    ), nextPrimaryChildren.flags |= 2), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, nextPrimaryChildren = current.child.memoizedState, null === nextPrimaryChildren ? nextPrimaryChildren = mountSuspenseOffscreenState(renderLanes2) : (showFallback = nextPrimaryChildren.cachePool, null !== showFallback ? (prevState = CacheContext._currentValue, showFallback = showFallback.parent !== prevState ? { parent: prevState, pool: prevState } : showFallback) : showFallback = getSuspendedCache(), nextPrimaryChildren = {
      baseLanes: nextPrimaryChildren.baseLanes | renderLanes2,
      cachePool: showFallback
    }), nextProps.memoizedState = nextPrimaryChildren, nextProps.childLanes = getRemainingWorkInPrimaryTree(
      current,
      JSCompiler_temp,
      renderLanes2
    ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
  pushPrimaryTreeSuspenseHandler(workInProgress2);
  renderLanes2 = current.child;
  current = renderLanes2.sibling;
  renderLanes2 = createWorkInProgress(renderLanes2, {
    mode: "visible",
    children: nextProps.children
  });
  renderLanes2.return = workInProgress2;
  renderLanes2.sibling = null;
  null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
  workInProgress2.child = renderLanes2;
  workInProgress2.memoizedState = null;
  return renderLanes2;
}
function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
  primaryChildren = mountWorkInProgressOffscreenFiber(
    { mode: "visible", children: primaryChildren },
    workInProgress2.mode
  );
  primaryChildren.return = workInProgress2;
  return workInProgress2.child = primaryChildren;
}
function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
  offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
  offscreenProps.lanes = 0;
  return offscreenProps;
}
function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
  reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
  current = mountSuspensePrimaryChildren(
    workInProgress2,
    workInProgress2.pendingProps.children
  );
  current.flags |= 2;
  workInProgress2.memoizedState = null;
  return current;
}
function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
  fiber.lanes |= renderLanes2;
  var alternate = fiber.alternate;
  null !== alternate && (alternate.lanes |= renderLanes2);
  scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
}
function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
  var renderState = workInProgress2.memoizedState;
  null === renderState ? workInProgress2.memoizedState = {
    isBackwards,
    rendering: null,
    renderingStartTime: 0,
    last: lastContentRow,
    tail,
    tailMode,
    treeForkCount: treeForkCount2
  } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
}
function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
  var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
  nextProps = nextProps.children;
  var suspenseContext = suspenseStackCursor.current, shouldForceFallback = 0 !== (suspenseContext & 2);
  shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1;
  push(suspenseStackCursor, suspenseContext);
  reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
  nextProps = isHydrating ? treeForkCount : 0;
  if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128))
    a: for (current = workInProgress2.child; null !== current; ) {
      if (13 === current.tag)
        null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
      else if (19 === current.tag)
        scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
      else if (null !== current.child) {
        current.child.return = current;
        current = current.child;
        continue;
      }
      if (current === workInProgress2) break a;
      for (; null === current.sibling; ) {
        if (null === current.return || current.return === workInProgress2)
          break a;
        current = current.return;
      }
      current.sibling.return = current.return;
      current = current.sibling;
    }
  switch (revealOrder) {
    case "forwards":
      renderLanes2 = workInProgress2.child;
      for (revealOrder = null; null !== renderLanes2; )
        current = renderLanes2.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderLanes2), renderLanes2 = renderLanes2.sibling;
      renderLanes2 = revealOrder;
      null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null);
      initSuspenseListRenderState(
        workInProgress2,
        false,
        revealOrder,
        renderLanes2,
        tailMode,
        nextProps
      );
      break;
    case "backwards":
    case "unstable_legacy-backwards":
      renderLanes2 = null;
      revealOrder = workInProgress2.child;
      for (workInProgress2.child = null; null !== revealOrder; ) {
        current = revealOrder.alternate;
        if (null !== current && null === findFirstSuspended(current)) {
          workInProgress2.child = revealOrder;
          break;
        }
        current = revealOrder.sibling;
        revealOrder.sibling = renderLanes2;
        renderLanes2 = revealOrder;
        revealOrder = current;
      }
      initSuspenseListRenderState(
        workInProgress2,
        true,
        renderLanes2,
        null,
        tailMode,
        nextProps
      );
      break;
    case "together":
      initSuspenseListRenderState(
        workInProgress2,
        false,
        null,
        null,
        void 0,
        nextProps
      );
      break;
    default:
      workInProgress2.memoizedState = null;
  }
  return workInProgress2.child;
}
function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
  null !== current && (workInProgress2.dependencies = current.dependencies);
  workInProgressRootSkippedLanes |= workInProgress2.lanes;
  if (0 === (renderLanes2 & workInProgress2.childLanes))
    if (null !== current) {
      if (propagateParentContextChanges(
        current,
        workInProgress2,
        renderLanes2,
        false
      ), 0 === (renderLanes2 & workInProgress2.childLanes))
        return null;
    } else return null;
  if (null !== current && workInProgress2.child !== current.child)
    throw Error(formatProdErrorMessage(153));
  if (null !== workInProgress2.child) {
    current = workInProgress2.child;
    renderLanes2 = createWorkInProgress(current, current.pendingProps);
    workInProgress2.child = renderLanes2;
    for (renderLanes2.return = workInProgress2; null !== current.sibling; )
      current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
    renderLanes2.sibling = null;
  }
  return workInProgress2.child;
}
function checkScheduledUpdateOrContext(current, renderLanes2) {
  if (0 !== (current.lanes & renderLanes2)) return true;
  current = current.dependencies;
  return null !== current && checkIfContextChanged(current) ? true : false;
}
function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
  switch (workInProgress2.tag) {
    case 3:
      pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
      pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
      resetHydrationState();
      break;
    case 27:
    case 5:
      pushHostContext(workInProgress2);
      break;
    case 4:
      pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
      break;
    case 10:
      pushProvider(
        workInProgress2,
        workInProgress2.type,
        workInProgress2.memoizedProps.value
      );
      break;
    case 31:
      if (null !== workInProgress2.memoizedState)
        return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
      break;
    case 13:
      var state$102 = workInProgress2.memoizedState;
      if (null !== state$102) {
        if (null !== state$102.dehydrated)
          return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
        if (0 !== (renderLanes2 & workInProgress2.child.childLanes))
          return updateSuspenseComponent(current, workInProgress2, renderLanes2);
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        current = bailoutOnAlreadyFinishedWork(
          current,
          workInProgress2,
          renderLanes2
        );
        return null !== current ? current.sibling : null;
      }
      pushPrimaryTreeSuspenseHandler(workInProgress2);
      break;
    case 19:
      var didSuspendBefore = 0 !== (current.flags & 128);
      state$102 = 0 !== (renderLanes2 & workInProgress2.childLanes);
      state$102 || (propagateParentContextChanges(
        current,
        workInProgress2,
        renderLanes2,
        false
      ), state$102 = 0 !== (renderLanes2 & workInProgress2.childLanes));
      if (didSuspendBefore) {
        if (state$102)
          return updateSuspenseListComponent(
            current,
            workInProgress2,
            renderLanes2
          );
        workInProgress2.flags |= 128;
      }
      didSuspendBefore = workInProgress2.memoizedState;
      null !== didSuspendBefore && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null);
      push(suspenseStackCursor, suspenseStackCursor.current);
      if (state$102) break;
      else return null;
    case 22:
      return workInProgress2.lanes = 0, updateOffscreenComponent(
        current,
        workInProgress2,
        renderLanes2,
        workInProgress2.pendingProps
      );
    case 24:
      pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
  }
  return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
}
function beginWork(current, workInProgress2, renderLanes2) {
  if (null !== current)
    if (current.memoizedProps !== workInProgress2.pendingProps)
      didReceiveUpdate = true;
    else {
      if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
        return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
          current,
          workInProgress2,
          renderLanes2
        );
      didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
    }
  else
    didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
  workInProgress2.lanes = 0;
  switch (workInProgress2.tag) {
    case 16:
      a: {
        var props = workInProgress2.pendingProps;
        current = resolveLazy(workInProgress2.elementType);
        workInProgress2.type = current;
        if ("function" === typeof current)
          shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
            null,
            workInProgress2,
            current,
            props,
            renderLanes2
          )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
            null,
            workInProgress2,
            current,
            props,
            renderLanes2
          ));
        else {
          if (void 0 !== current && null !== current) {
            var $$typeof = current.$$typeof;
            if ($$typeof === REACT_FORWARD_REF_TYPE) {
              workInProgress2.tag = 11;
              workInProgress2 = updateForwardRef(
                null,
                workInProgress2,
                current,
                props,
                renderLanes2
              );
              break a;
            } else if ($$typeof === REACT_MEMO_TYPE) {
              workInProgress2.tag = 14;
              workInProgress2 = updateMemoComponent(
                null,
                workInProgress2,
                current,
                props,
                renderLanes2
              );
              break a;
            }
          }
          workInProgress2 = getComponentNameFromType(current) || current;
          throw Error(formatProdErrorMessage(306, workInProgress2, ""));
        }
      }
      return workInProgress2;
    case 0:
      return updateFunctionComponent(
        current,
        workInProgress2,
        workInProgress2.type,
        workInProgress2.pendingProps,
        renderLanes2
      );
    case 1:
      return props = workInProgress2.type, $$typeof = resolveClassComponentProps(
        props,
        workInProgress2.pendingProps
      ), updateClassComponent(
        current,
        workInProgress2,
        props,
        $$typeof,
        renderLanes2
      );
    case 3:
      a: {
        pushHostContainer(
          workInProgress2,
          workInProgress2.stateNode.containerInfo
        );
        if (null === current) throw Error(formatProdErrorMessage(387));
        props = workInProgress2.pendingProps;
        var prevState = workInProgress2.memoizedState;
        $$typeof = prevState.element;
        cloneUpdateQueue(current, workInProgress2);
        processUpdateQueue(workInProgress2, props, null, renderLanes2);
        var nextState = workInProgress2.memoizedState;
        props = nextState.cache;
        pushProvider(workInProgress2, CacheContext, props);
        props !== prevState.cache && propagateContextChanges(
          workInProgress2,
          [CacheContext],
          renderLanes2,
          true
        );
        suspendIfUpdateReadFromEntangledAsyncAction();
        props = nextState.element;
        if (prevState.isDehydrated)
          if (prevState = {
            element: props,
            isDehydrated: false,
            cache: nextState.cache
          }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
            workInProgress2 = mountHostRootWithoutHydrating(
              current,
              workInProgress2,
              props,
              renderLanes2
            );
            break a;
          } else if (props !== $$typeof) {
            $$typeof = createCapturedValueAtFiber(
              Error(formatProdErrorMessage(424)),
              workInProgress2
            );
            queueHydrationError($$typeof);
            workInProgress2 = mountHostRootWithoutHydrating(
              current,
              workInProgress2,
              props,
              renderLanes2
            );
            break a;
          } else {
            current = workInProgress2.stateNode.containerInfo;
            switch (current.nodeType) {
              case 9:
                current = current.body;
                break;
              default:
                current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
            }
            nextHydratableInstance = getNextHydratable(current.firstChild);
            hydrationParentFiber = workInProgress2;
            isHydrating = true;
            hydrationErrors = null;
            rootOrSingletonContext = true;
            renderLanes2 = mountChildFibers(
              workInProgress2,
              null,
              props,
              renderLanes2
            );
            for (workInProgress2.child = renderLanes2; renderLanes2; )
              renderLanes2.flags = renderLanes2.flags & -3 | 4096, renderLanes2 = renderLanes2.sibling;
          }
        else {
          resetHydrationState();
          if (props === $$typeof) {
            workInProgress2 = bailoutOnAlreadyFinishedWork(
              current,
              workInProgress2,
              renderLanes2
            );
            break a;
          }
          reconcileChildren(current, workInProgress2, props, renderLanes2);
        }
        workInProgress2 = workInProgress2.child;
      }
      return workInProgress2;
    case 26:
      return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
        workInProgress2.type,
        null,
        workInProgress2.pendingProps,
        null
      )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (renderLanes2 = workInProgress2.type, current = workInProgress2.pendingProps, props = getOwnerDocumentFromRootContainer(
        rootInstanceStackCursor.current
      ).createElement(renderLanes2), props[internalInstanceKey] = workInProgress2, props[internalPropsKey] = current, setInitialProperties(props, renderLanes2, current), markNodeAsHoistable(props), workInProgress2.stateNode = props) : workInProgress2.memoizedState = getResource(
        workInProgress2.type,
        current.memoizedProps,
        workInProgress2.pendingProps,
        current.memoizedState
      ), null;
    case 27:
      return pushHostContext(workInProgress2), null === current && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(
        workInProgress2.type,
        workInProgress2.pendingProps,
        rootInstanceStackCursor.current
      ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(
        current,
        workInProgress2,
        workInProgress2.pendingProps.children,
        renderLanes2
      ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
    case 5:
      if (null === current && isHydrating) {
        if ($$typeof = props = nextHydratableInstance)
          props = canHydrateInstance(
            props,
            workInProgress2.type,
            workInProgress2.pendingProps,
            rootOrSingletonContext
          ), null !== props ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
        $$typeof || throwOnHydrationMismatch(workInProgress2);
      }
      pushHostContext(workInProgress2);
      $$typeof = workInProgress2.type;
      prevState = workInProgress2.pendingProps;
      nextState = null !== current ? current.memoizedProps : null;
      props = prevState.children;
      shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32);
      null !== workInProgress2.memoizedState && ($$typeof = renderWithHooks(
        current,
        workInProgress2,
        TransitionAwareHostComponent,
        null,
        null,
        renderLanes2
      ), HostTransitionContext._currentValue = $$typeof);
      markRef(current, workInProgress2);
      reconcileChildren(current, workInProgress2, props, renderLanes2);
      return workInProgress2.child;
    case 6:
      if (null === current && isHydrating) {
        if (current = renderLanes2 = nextHydratableInstance)
          renderLanes2 = canHydrateTextInstance(
            renderLanes2,
            workInProgress2.pendingProps,
            rootOrSingletonContext
          ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
        current || throwOnHydrationMismatch(workInProgress2);
      }
      return null;
    case 13:
      return updateSuspenseComponent(current, workInProgress2, renderLanes2);
    case 4:
      return pushHostContainer(
        workInProgress2,
        workInProgress2.stateNode.containerInfo
      ), props = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
        workInProgress2,
        null,
        props,
        renderLanes2
      ) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
    case 11:
      return updateForwardRef(
        current,
        workInProgress2,
        workInProgress2.type,
        workInProgress2.pendingProps,
        renderLanes2
      );
    case 7:
      return reconcileChildren(
        current,
        workInProgress2,
        workInProgress2.pendingProps,
        renderLanes2
      ), workInProgress2.child;
    case 8:
      return reconcileChildren(
        current,
        workInProgress2,
        workInProgress2.pendingProps.children,
        renderLanes2
      ), workInProgress2.child;
    case 12:
      return reconcileChildren(
        current,
        workInProgress2,
        workInProgress2.pendingProps.children,
        renderLanes2
      ), workInProgress2.child;
    case 10:
      return props = workInProgress2.pendingProps, pushProvider(workInProgress2, workInProgress2.type, props.value), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
    case 9:
      return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
    case 14:
      return updateMemoComponent(
        current,
        workInProgress2,
        workInProgress2.type,
        workInProgress2.pendingProps,
        renderLanes2
      );
    case 15:
      return updateSimpleMemoComponent(
        current,
        workInProgress2,
        workInProgress2.type,
        workInProgress2.pendingProps,
        renderLanes2
      );
    case 19:
      return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
    case 31:
      return updateActivityComponent(current, workInProgress2, renderLanes2);
    case 22:
      return updateOffscreenComponent(
        current,
        workInProgress2,
        renderLanes2,
        workInProgress2.pendingProps
      );
    case 24:
      return prepareToReadContext(workInProgress2), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(
        workInProgress2,
        [CacheContext],
        renderLanes2,
        true
      ))), reconcileChildren(
        current,
        workInProgress2,
        workInProgress2.pendingProps.children,
        renderLanes2
      ), workInProgress2.child;
    case 29:
      throw workInProgress2.pendingProps;
  }
  throw Error(formatProdErrorMessage(156, workInProgress2.tag));
}
function markUpdate(workInProgress2) {
  workInProgress2.flags |= 4;
}
function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
  if (type = 0 !== (workInProgress2.mode & 32)) type = false;
  if (type) {
    if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
      if (workInProgress2.stateNode.complete) workInProgress2.flags |= 8192;
      else if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
      else
        throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
  } else workInProgress2.flags &= -16777217;
}
function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
  if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
    workInProgress2.flags &= -16777217;
  else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
    if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
    else
      throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
}
function scheduleRetryEffect(workInProgress2, retryQueue) {
  null !== retryQueue && (workInProgress2.flags |= 4);
  workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
}
function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  if (!isHydrating)
    switch (renderState.tailMode) {
      case "hidden":
        hasRenderedATailFallback = renderState.tail;
        for (var lastTailNode = null; null !== hasRenderedATailFallback; )
          null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
        null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
        break;
      case "collapsed":
        lastTailNode = renderState.tail;
        for (var lastTailNode$106 = null; null !== lastTailNode; )
          null !== lastTailNode.alternate && (lastTailNode$106 = lastTailNode), lastTailNode = lastTailNode.sibling;
        null === lastTailNode$106 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$106.sibling = null;
    }
}
function bubbleProperties(completedWork) {
  var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
  if (didBailout)
    for (var child$107 = completedWork.child; null !== child$107; )
      newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags & 65011712, subtreeFlags |= child$107.flags & 65011712, child$107.return = completedWork, child$107 = child$107.sibling;
  else
    for (child$107 = completedWork.child; null !== child$107; )
      newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags, subtreeFlags |= child$107.flags, child$107.return = completedWork, child$107 = child$107.sibling;
  completedWork.subtreeFlags |= subtreeFlags;
  completedWork.childLanes = newChildLanes;
  return didBailout;
}
function completeWork(current, workInProgress2, renderLanes2) {
  var newProps = workInProgress2.pendingProps;
  popTreeContext(workInProgress2);
  switch (workInProgress2.tag) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return bubbleProperties(workInProgress2), null;
    case 1:
      return bubbleProperties(workInProgress2), null;
    case 3:
      renderLanes2 = workInProgress2.stateNode;
      newProps = null;
      null !== current && (newProps = current.memoizedState.cache);
      workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
      popProvider(CacheContext);
      popHostContainer();
      renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
      if (null === current || null === current.child)
        popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
      bubbleProperties(workInProgress2);
      return null;
    case 26:
      var type = workInProgress2.type, nextResource = workInProgress2.memoizedState;
      null === current ? (markUpdate(workInProgress2), null !== nextResource ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
        workInProgress2,
        type,
        null,
        newProps,
        renderLanes2
      ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
        workInProgress2,
        type,
        current,
        newProps,
        renderLanes2
      ));
      return null;
    case 27:
      popHostContext(workInProgress2);
      renderLanes2 = rootInstanceStackCursor.current;
      type = workInProgress2.type;
      if (null !== current && null != workInProgress2.stateNode)
        current.memoizedProps !== newProps && markUpdate(workInProgress2);
      else {
        if (!newProps) {
          if (null === workInProgress2.stateNode)
            throw Error(formatProdErrorMessage(166));
          bubbleProperties(workInProgress2);
          return null;
        }
        current = contextStackCursor.current;
        popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
      }
      bubbleProperties(workInProgress2);
      return null;
    case 5:
      popHostContext(workInProgress2);
      type = workInProgress2.type;
      if (null !== current && null != workInProgress2.stateNode)
        current.memoizedProps !== newProps && markUpdate(workInProgress2);
      else {
        if (!newProps) {
          if (null === workInProgress2.stateNode)
            throw Error(formatProdErrorMessage(166));
          bubbleProperties(workInProgress2);
          return null;
        }
        nextResource = contextStackCursor.current;
        if (popHydrationState(workInProgress2))
          prepareToHydrateHostInstance(workInProgress2);
        else {
          var ownerDocument = getOwnerDocumentFromRootContainer(
            rootInstanceStackCursor.current
          );
          switch (nextResource) {
            case 1:
              nextResource = ownerDocument.createElementNS(
                "http://www.w3.org/2000/svg",
                type
              );
              break;
            case 2:
              nextResource = ownerDocument.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                type
              );
              break;
            default:
              switch (type) {
                case "svg":
                  nextResource = ownerDocument.createElementNS(
                    "http://www.w3.org/2000/svg",
                    type
                  );
                  break;
                case "math":
                  nextResource = ownerDocument.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    type
                  );
                  break;
                case "script":
                  nextResource = ownerDocument.createElement("div");
                  nextResource.innerHTML = "<script><\/script>";
                  nextResource = nextResource.removeChild(
                    nextResource.firstChild
                  );
                  break;
                case "select":
                  nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", {
                    is: newProps.is
                  }) : ownerDocument.createElement("select");
                  newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                  break;
                default:
                  nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
              }
          }
          nextResource[internalInstanceKey] = workInProgress2;
          nextResource[internalPropsKey] = newProps;
          a: for (ownerDocument = workInProgress2.child; null !== ownerDocument; ) {
            if (5 === ownerDocument.tag || 6 === ownerDocument.tag)
              nextResource.appendChild(ownerDocument.stateNode);
            else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
              ownerDocument.child.return = ownerDocument;
              ownerDocument = ownerDocument.child;
              continue;
            }
            if (ownerDocument === workInProgress2) break a;
            for (; null === ownerDocument.sibling; ) {
              if (null === ownerDocument.return || ownerDocument.return === workInProgress2)
                break a;
              ownerDocument = ownerDocument.return;
            }
            ownerDocument.sibling.return = ownerDocument.return;
            ownerDocument = ownerDocument.sibling;
          }
          workInProgress2.stateNode = nextResource;
          a: switch (setInitialProperties(nextResource, type, newProps), type) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              newProps = !!newProps.autoFocus;
              break a;
            case "img":
              newProps = true;
              break a;
            default:
              newProps = false;
          }
          newProps && markUpdate(workInProgress2);
        }
      }
      bubbleProperties(workInProgress2);
      preloadInstanceAndSuspendIfNeeded(
        workInProgress2,
        workInProgress2.type,
        null === current ? null : current.memoizedProps,
        workInProgress2.pendingProps,
        renderLanes2
      );
      return null;
    case 6:
      if (current && null != workInProgress2.stateNode)
        current.memoizedProps !== newProps && markUpdate(workInProgress2);
      else {
        if ("string" !== typeof newProps && null === workInProgress2.stateNode)
          throw Error(formatProdErrorMessage(166));
        current = rootInstanceStackCursor.current;
        if (popHydrationState(workInProgress2)) {
          current = workInProgress2.stateNode;
          renderLanes2 = workInProgress2.memoizedProps;
          newProps = null;
          type = hydrationParentFiber;
          if (null !== type)
            switch (type.tag) {
              case 27:
              case 5:
                newProps = type.memoizedProps;
            }
          current[internalInstanceKey] = workInProgress2;
          current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
          current || throwOnHydrationMismatch(workInProgress2, true);
        } else
          current = getOwnerDocumentFromRootContainer(current).createTextNode(
            newProps
          ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
      }
      bubbleProperties(workInProgress2);
      return null;
    case 31:
      renderLanes2 = workInProgress2.memoizedState;
      if (null === current || null !== current.memoizedState) {
        newProps = popHydrationState(workInProgress2);
        if (null !== renderLanes2) {
          if (null === current) {
            if (!newProps) throw Error(formatProdErrorMessage(318));
            current = workInProgress2.memoizedState;
            current = null !== current ? current.dehydrated : null;
            if (!current) throw Error(formatProdErrorMessage(557));
            current[internalInstanceKey] = workInProgress2;
          } else
            resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
          bubbleProperties(workInProgress2);
          current = false;
        } else
          renderLanes2 = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes2), current = true;
        if (!current) {
          if (workInProgress2.flags & 256)
            return popSuspenseHandler(workInProgress2), workInProgress2;
          popSuspenseHandler(workInProgress2);
          return null;
        }
        if (0 !== (workInProgress2.flags & 128))
          throw Error(formatProdErrorMessage(558));
      }
      bubbleProperties(workInProgress2);
      return null;
    case 13:
      newProps = workInProgress2.memoizedState;
      if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
        type = popHydrationState(workInProgress2);
        if (null !== newProps && null !== newProps.dehydrated) {
          if (null === current) {
            if (!type) throw Error(formatProdErrorMessage(318));
            type = workInProgress2.memoizedState;
            type = null !== type ? type.dehydrated : null;
            if (!type) throw Error(formatProdErrorMessage(317));
            type[internalInstanceKey] = workInProgress2;
          } else
            resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
          bubbleProperties(workInProgress2);
          type = false;
        } else
          type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = true;
        if (!type) {
          if (workInProgress2.flags & 256)
            return popSuspenseHandler(workInProgress2), workInProgress2;
          popSuspenseHandler(workInProgress2);
          return null;
        }
      }
      popSuspenseHandler(workInProgress2);
      if (0 !== (workInProgress2.flags & 128))
        return workInProgress2.lanes = renderLanes2, workInProgress2;
      renderLanes2 = null !== newProps;
      current = null !== current && null !== current.memoizedState;
      renderLanes2 && (newProps = workInProgress2.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
      renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
      scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
      bubbleProperties(workInProgress2);
      return null;
    case 4:
      return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), bubbleProperties(workInProgress2), null;
    case 10:
      return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
    case 19:
      pop(suspenseStackCursor);
      newProps = workInProgress2.memoizedState;
      if (null === newProps) return bubbleProperties(workInProgress2), null;
      type = 0 !== (workInProgress2.flags & 128);
      nextResource = newProps.rendering;
      if (null === nextResource)
        if (type) cutOffTailIfNeeded(newProps, false);
        else {
          if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
            for (current = workInProgress2.child; null !== current; ) {
              nextResource = findFirstSuspended(current);
              if (null !== nextResource) {
                workInProgress2.flags |= 128;
                cutOffTailIfNeeded(newProps, false);
                current = nextResource.updateQueue;
                workInProgress2.updateQueue = current;
                scheduleRetryEffect(workInProgress2, current);
                workInProgress2.subtreeFlags = 0;
                current = renderLanes2;
                for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                  resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                push(
                  suspenseStackCursor,
                  suspenseStackCursor.current & 1 | 2
                );
                isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
                return workInProgress2.child;
              }
              current = current.sibling;
            }
          null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
        }
      else {
        if (!type)
          if (current = findFirstSuspended(nextResource), null !== current) {
            if (workInProgress2.flags |= 128, type = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, true), null === newProps.tail && "hidden" === newProps.tailMode && !nextResource.alternate && !isHydrating)
              return bubbleProperties(workInProgress2), null;
          } else
            2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
        newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
      }
      if (null !== newProps.tail)
        return current = newProps.tail, newProps.rendering = current, newProps.tail = current.sibling, newProps.renderingStartTime = now(), current.sibling = null, renderLanes2 = suspenseStackCursor.current, push(
          suspenseStackCursor,
          type ? renderLanes2 & 1 | 2 : renderLanes2 & 1
        ), isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount), current;
      bubbleProperties(workInProgress2);
      return null;
    case 22:
    case 23:
      return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
    case 24:
      return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(formatProdErrorMessage(156, workInProgress2.tag));
}
function unwindWork(current, workInProgress2) {
  popTreeContext(workInProgress2);
  switch (workInProgress2.tag) {
    case 1:
      return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
    case 3:
      return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
    case 26:
    case 27:
    case 5:
      return popHostContext(workInProgress2), null;
    case 31:
      if (null !== workInProgress2.memoizedState) {
        popSuspenseHandler(workInProgress2);
        if (null === workInProgress2.alternate)
          throw Error(formatProdErrorMessage(340));
        resetHydrationState();
      }
      current = workInProgress2.flags;
      return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
    case 13:
      popSuspenseHandler(workInProgress2);
      current = workInProgress2.memoizedState;
      if (null !== current && null !== current.dehydrated) {
        if (null === workInProgress2.alternate)
          throw Error(formatProdErrorMessage(340));
        resetHydrationState();
      }
      current = workInProgress2.flags;
      return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
    case 19:
      return pop(suspenseStackCursor), null;
    case 4:
      return popHostContainer(), null;
    case 10:
      return popProvider(workInProgress2.type), null;
    case 22:
    case 23:
      return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
    case 24:
      return popProvider(CacheContext), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function unwindInterruptedWork(current, interruptedWork) {
  popTreeContext(interruptedWork);
  switch (interruptedWork.tag) {
    case 3:
      popProvider(CacheContext);
      popHostContainer();
      break;
    case 26:
    case 27:
    case 5:
      popHostContext(interruptedWork);
      break;
    case 4:
      popHostContainer();
      break;
    case 31:
      null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
      break;
    case 13:
      popSuspenseHandler(interruptedWork);
      break;
    case 19:
      pop(suspenseStackCursor);
      break;
    case 10:
      popProvider(interruptedWork.type);
      break;
    case 22:
    case 23:
      popSuspenseHandler(interruptedWork);
      popHiddenContext();
      null !== current && pop(resumedCache);
      break;
    case 24:
      popProvider(CacheContext);
  }
}
function commitHookEffectListMount(flags, finishedWork) {
  try {
    var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
    if (null !== lastEffect) {
      var firstEffect = lastEffect.next;
      updateQueue = firstEffect;
      do {
        if ((updateQueue.tag & flags) === flags) {
          lastEffect = void 0;
          var create = updateQueue.create, inst = updateQueue.inst;
          lastEffect = create();
          inst.destroy = lastEffect;
        }
        updateQueue = updateQueue.next;
      } while (updateQueue !== firstEffect);
    }
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}
function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
  try {
    var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
    if (null !== lastEffect) {
      var firstEffect = lastEffect.next;
      updateQueue = firstEffect;
      do {
        if ((updateQueue.tag & flags) === flags) {
          var inst = updateQueue.inst, destroy = inst.destroy;
          if (void 0 !== destroy) {
            inst.destroy = void 0;
            lastEffect = finishedWork;
            var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
            try {
              destroy_();
            } catch (error) {
              captureCommitPhaseError(
                lastEffect,
                nearestMountedAncestor,
                error
              );
            }
          }
        }
        updateQueue = updateQueue.next;
      } while (updateQueue !== firstEffect);
    }
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}
function commitClassCallbacks(finishedWork) {
  var updateQueue = finishedWork.updateQueue;
  if (null !== updateQueue) {
    var instance = finishedWork.stateNode;
    try {
      commitCallbacks(updateQueue, instance);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
}
function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
  instance.props = resolveClassComponentProps(
    current.type,
    current.memoizedProps
  );
  instance.state = current.memoizedState;
  try {
    instance.componentWillUnmount();
  } catch (error) {
    captureCommitPhaseError(current, nearestMountedAncestor, error);
  }
}
function safelyAttachRef(current, nearestMountedAncestor) {
  try {
    var ref = current.ref;
    if (null !== ref) {
      switch (current.tag) {
        case 26:
        case 27:
        case 5:
          var instanceToUse = current.stateNode;
          break;
        case 30:
          instanceToUse = current.stateNode;
          break;
        default:
          instanceToUse = current.stateNode;
      }
      "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
    }
  } catch (error) {
    captureCommitPhaseError(current, nearestMountedAncestor, error);
  }
}
function safelyDetachRef(current, nearestMountedAncestor) {
  var ref = current.ref, refCleanup = current.refCleanup;
  if (null !== ref)
    if ("function" === typeof refCleanup)
      try {
        refCleanup();
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      } finally {
        current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
      }
    else if ("function" === typeof ref)
      try {
        ref(null);
      } catch (error$140) {
        captureCommitPhaseError(current, nearestMountedAncestor, error$140);
      }
    else ref.current = null;
}
function commitHostMount(finishedWork) {
  var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
  try {
    a: switch (type) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        props.autoFocus && instance.focus();
        break a;
      case "img":
        props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
    }
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}
function commitHostUpdate(finishedWork, newProps, oldProps) {
  try {
    var domElement = finishedWork.stateNode;
    updateProperties(domElement, finishedWork.type, oldProps, newProps);
    domElement[internalPropsKey] = newProps;
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
}
function getHostSibling(fiber) {
  a: for (; ; ) {
    for (; null === fiber.sibling; ) {
      if (null === fiber.return || isHostParent(fiber.return)) return null;
      fiber = fiber.return;
    }
    fiber.sibling.return = fiber.return;
    for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
      if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
      if (fiber.flags & 2) continue a;
      if (null === fiber.child || 4 === fiber.tag) continue a;
      else fiber.child.return = fiber, fiber = fiber.child;
    }
    if (!(fiber.flags & 2)) return fiber.stateNode;
  }
}
function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  var tag = node.tag;
  if (5 === tag || 6 === tag)
    node = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(node, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(node), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1));
  else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode, before = null), node = node.child, null !== node))
    for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node; )
      insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
}
function insertOrAppendPlacementNode(node, before, parent) {
  var tag = node.tag;
  if (5 === tag || 6 === tag)
    node = node.stateNode, before ? parent.insertBefore(node, before) : parent.appendChild(node);
  else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, null !== node))
    for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node; )
      insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
}
function commitHostSingletonAcquisition(finishedWork) {
  var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
  try {
    for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
      singleton.removeAttributeNode(attributes[0]);
    setInitialProperties(singleton, type, props);
    singleton[internalInstanceKey] = finishedWork;
    singleton[internalPropsKey] = props;
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}
var offscreenSubtreeIsHidden = false, offscreenSubtreeWasHidden = false, needsFormReset = false, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null;
function commitBeforeMutationEffects(root2, firstChild) {
  root2 = root2.containerInfo;
  eventsEnabled = _enabled;
  root2 = getActiveElementDeep(root2);
  if (hasSelectionCapabilities(root2)) {
    if ("selectionStart" in root2)
      var JSCompiler_temp = {
        start: root2.selectionStart,
        end: root2.selectionEnd
      };
    else
      a: {
        JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
        var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
        if (selection && 0 !== selection.rangeCount) {
          JSCompiler_temp = selection.anchorNode;
          var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
          selection = selection.focusOffset;
          try {
            JSCompiler_temp.nodeType, focusNode.nodeType;
          } catch (e$20) {
            JSCompiler_temp = null;
            break a;
          }
          var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
          b: for (; ; ) {
            for (var next; ; ) {
              node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
              node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
              3 === node.nodeType && (length += node.nodeValue.length);
              if (null === (next = node.firstChild)) break;
              parentNode = node;
              node = next;
            }
            for (; ; ) {
              if (node === root2) break b;
              parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
              parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
              if (null !== (next = node.nextSibling)) break;
              node = parentNode;
              parentNode = node.parentNode;
            }
            node = next;
          }
          JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
        } else JSCompiler_temp = null;
      }
    JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
  } else JSCompiler_temp = null;
  selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
  _enabled = false;
  for (nextEffect = firstChild; null !== nextEffect; )
    if (firstChild = nextEffect, root2 = firstChild.child, 0 !== (firstChild.subtreeFlags & 1028) && null !== root2)
      root2.return = firstChild, nextEffect = root2;
    else
      for (; null !== nextEffect; ) {
        firstChild = nextEffect;
        focusNode = firstChild.alternate;
        root2 = firstChild.flags;
        switch (firstChild.tag) {
          case 0:
            if (0 !== (root2 & 4) && (root2 = firstChild.updateQueue, root2 = null !== root2 ? root2.events : null, null !== root2))
              for (JSCompiler_temp = 0; JSCompiler_temp < root2.length; JSCompiler_temp++)
                anchorOffset = root2[JSCompiler_temp], anchorOffset.ref.impl = anchorOffset.nextImpl;
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (0 !== (root2 & 1024) && null !== focusNode) {
              root2 = void 0;
              JSCompiler_temp = firstChild;
              anchorOffset = focusNode.memoizedProps;
              focusNode = focusNode.memoizedState;
              selection = JSCompiler_temp.stateNode;
              try {
                var resolvedPrevProps = resolveClassComponentProps(
                  JSCompiler_temp.type,
                  anchorOffset
                );
                root2 = selection.getSnapshotBeforeUpdate(
                  resolvedPrevProps,
                  focusNode
                );
                selection.__reactInternalSnapshotBeforeUpdate = root2;
              } catch (error) {
                captureCommitPhaseError(
                  JSCompiler_temp,
                  JSCompiler_temp.return,
                  error
                );
              }
            }
            break;
          case 3:
            if (0 !== (root2 & 1024)) {
              if (root2 = firstChild.stateNode.containerInfo, JSCompiler_temp = root2.nodeType, 9 === JSCompiler_temp)
                clearContainerSparingly(root2);
              else if (1 === JSCompiler_temp)
                switch (root2.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    clearContainerSparingly(root2);
                    break;
                  default:
                    root2.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (0 !== (root2 & 1024)) throw Error(formatProdErrorMessage(163));
        }
        root2 = firstChild.sibling;
        if (null !== root2) {
          root2.return = firstChild.return;
          nextEffect = root2;
          break;
        }
        nextEffect = firstChild.return;
      }
}
function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
  var flags = finishedWork.flags;
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      flags & 4 && commitHookEffectListMount(5, finishedWork);
      break;
    case 1:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      if (flags & 4)
        if (finishedRoot = finishedWork.stateNode, null === current)
          try {
            finishedRoot.componentDidMount();
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        else {
          var prevProps = resolveClassComponentProps(
            finishedWork.type,
            current.memoizedProps
          );
          current = current.memoizedState;
          try {
            finishedRoot.componentDidUpdate(
              prevProps,
              current,
              finishedRoot.__reactInternalSnapshotBeforeUpdate
            );
          } catch (error$139) {
            captureCommitPhaseError(
              finishedWork,
              finishedWork.return,
              error$139
            );
          }
        }
      flags & 64 && commitClassCallbacks(finishedWork);
      flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
      break;
    case 3:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
        current = null;
        if (null !== finishedWork.child)
          switch (finishedWork.child.tag) {
            case 27:
            case 5:
              current = finishedWork.child.stateNode;
              break;
            case 1:
              current = finishedWork.child.stateNode;
          }
        try {
          commitCallbacks(finishedRoot, current);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      break;
    case 27:
      null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
    case 26:
    case 5:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      null === current && flags & 4 && commitHostMount(finishedWork);
      flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
      break;
    case 12:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      break;
    case 31:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
      break;
    case 13:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
      flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
        null,
        finishedWork
      ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
      break;
    case 22:
      flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
      if (!flags) {
        current = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
        prevProps = offscreenSubtreeIsHidden;
        var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
        offscreenSubtreeIsHidden = flags;
        (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          0 !== (finishedWork.subtreeFlags & 8772)
        ) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        offscreenSubtreeIsHidden = prevProps;
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
      }
      break;
    case 30:
      break;
    default:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
  }
}
function detachFiberAfterEffects(fiber) {
  var alternate = fiber.alternate;
  null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
  fiber.child = null;
  fiber.deletions = null;
  fiber.sibling = null;
  5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
  fiber.stateNode = null;
  fiber.return = null;
  fiber.dependencies = null;
  fiber.memoizedProps = null;
  fiber.memoizedState = null;
  fiber.pendingProps = null;
  fiber.stateNode = null;
  fiber.updateQueue = null;
}
var hostParent = null, hostParentIsContainer = false;
function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
  for (parent = parent.child; null !== parent; )
    commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
}
function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
    try {
      injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
    } catch (err) {
    }
  switch (deletedFiber.tag) {
    case 26:
      offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
      break;
    case 27:
      offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
      var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
      isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      releaseSingletonInstance(deletedFiber.stateNode);
      hostParent = prevHostParent;
      hostParentIsContainer = prevHostParentIsContainer;
      break;
    case 5:
      offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
    case 6:
      prevHostParent = hostParent;
      prevHostParentIsContainer = hostParentIsContainer;
      hostParent = null;
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      hostParent = prevHostParent;
      hostParentIsContainer = prevHostParentIsContainer;
      if (null !== hostParent)
        if (hostParentIsContainer)
          try {
            (9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode);
          } catch (error) {
            captureCommitPhaseError(
              deletedFiber,
              nearestMountedAncestor,
              error
            );
          }
        else
          try {
            hostParent.removeChild(deletedFiber.stateNode);
          } catch (error) {
            captureCommitPhaseError(
              deletedFiber,
              nearestMountedAncestor,
              error
            );
          }
      break;
    case 18:
      null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(
        9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
        deletedFiber.stateNode
      ), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
      break;
    case 4:
      prevHostParent = hostParent;
      prevHostParentIsContainer = hostParentIsContainer;
      hostParent = deletedFiber.stateNode.containerInfo;
      hostParentIsContainer = true;
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      hostParent = prevHostParent;
      hostParentIsContainer = prevHostParentIsContainer;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
      offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      break;
    case 1:
      offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
        deletedFiber,
        nearestMountedAncestor,
        prevHostParent
      ));
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      break;
    case 21:
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      break;
    case 22:
      offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      offscreenSubtreeWasHidden = prevHostParent;
      break;
    default:
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
  }
}
function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
  if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
    finishedRoot = finishedRoot.dehydrated;
    try {
      retryIfBlockedOn(finishedRoot);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
}
function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
  if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
    try {
      retryIfBlockedOn(finishedRoot);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
}
function getRetryCache(finishedWork) {
  switch (finishedWork.tag) {
    case 31:
    case 13:
    case 19:
      var retryCache = finishedWork.stateNode;
      null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
      return retryCache;
    case 22:
      return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
    default:
      throw Error(formatProdErrorMessage(435, finishedWork.tag));
  }
}
function attachSuspenseRetryListeners(finishedWork, wakeables) {
  var retryCache = getRetryCache(finishedWork);
  wakeables.forEach(function(wakeable) {
    if (!retryCache.has(wakeable)) {
      retryCache.add(wakeable);
      var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
      wakeable.then(retry, retry);
    }
  });
}
function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
  var deletions = parentFiber.deletions;
  if (null !== deletions)
    for (var i = 0; i < deletions.length; i++) {
      var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
      a: for (; null !== parent; ) {
        switch (parent.tag) {
          case 27:
            if (isSingletonScope(parent.type)) {
              hostParent = parent.stateNode;
              hostParentIsContainer = false;
              break a;
            }
            break;
          case 5:
            hostParent = parent.stateNode;
            hostParentIsContainer = false;
            break a;
          case 3:
          case 4:
            hostParent = parent.stateNode.containerInfo;
            hostParentIsContainer = true;
            break a;
        }
        parent = parent.return;
      }
      if (null === hostParent) throw Error(formatProdErrorMessage(160));
      commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
      hostParent = null;
      hostParentIsContainer = false;
      root2 = childToDelete.alternate;
      null !== root2 && (root2.return = null);
      childToDelete.return = null;
    }
  if (parentFiber.subtreeFlags & 13886)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
}
var currentHoistableRoot = null;
function commitMutationEffectsOnFiber(finishedWork, root2) {
  var current = finishedWork.alternate, flags = finishedWork.flags;
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
      break;
    case 1:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
      flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (flags = finishedWork.callbacks, null !== flags && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === current ? flags : current.concat(flags))));
      break;
    case 26:
      var hoistableRoot = currentHoistableRoot;
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
      if (flags & 4) {
        var currentResource = null !== current ? current.memoizedState : null;
        flags = finishedWork.memoizedState;
        if (null === current)
          if (null === flags)
            if (null === finishedWork.stateNode) {
              a: {
                flags = finishedWork.type;
                current = finishedWork.memoizedProps;
                hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
                b: switch (flags) {
                  case "title":
                    currentResource = hoistableRoot.getElementsByTagName("title")[0];
                    if (!currentResource || currentResource[internalHoistableMarker] || currentResource[internalInstanceKey] || "http://www.w3.org/2000/svg" === currentResource.namespaceURI || currentResource.hasAttribute("itemprop"))
                      currentResource = hoistableRoot.createElement(flags), hoistableRoot.head.insertBefore(
                        currentResource,
                        hoistableRoot.querySelector("head > title")
                      );
                    setInitialProperties(currentResource, flags, current);
                    currentResource[internalInstanceKey] = finishedWork;
                    markNodeAsHoistable(currentResource);
                    flags = currentResource;
                    break a;
                  case "link":
                    var maybeNodes = getHydratableHoistableCache(
                      "link",
                      "href",
                      hoistableRoot
                    ).get(flags + (current.href || ""));
                    if (maybeNodes) {
                      for (var i = 0; i < maybeNodes.length; i++)
                        if (currentResource = maybeNodes[i], currentResource.getAttribute("href") === (null == current.href || "" === current.href ? null : current.href) && currentResource.getAttribute("rel") === (null == current.rel ? null : current.rel) && currentResource.getAttribute("title") === (null == current.title ? null : current.title) && currentResource.getAttribute("crossorigin") === (null == current.crossOrigin ? null : current.crossOrigin)) {
                          maybeNodes.splice(i, 1);
                          break b;
                        }
                    }
                    currentResource = hoistableRoot.createElement(flags);
                    setInitialProperties(currentResource, flags, current);
                    hoistableRoot.head.appendChild(currentResource);
                    break;
                  case "meta":
                    if (maybeNodes = getHydratableHoistableCache(
                      "meta",
                      "content",
                      hoistableRoot
                    ).get(flags + (current.content || ""))) {
                      for (i = 0; i < maybeNodes.length; i++)
                        if (currentResource = maybeNodes[i], currentResource.getAttribute("content") === (null == current.content ? null : "" + current.content) && currentResource.getAttribute("name") === (null == current.name ? null : current.name) && currentResource.getAttribute("property") === (null == current.property ? null : current.property) && currentResource.getAttribute("http-equiv") === (null == current.httpEquiv ? null : current.httpEquiv) && currentResource.getAttribute("charset") === (null == current.charSet ? null : current.charSet)) {
                          maybeNodes.splice(i, 1);
                          break b;
                        }
                    }
                    currentResource = hoistableRoot.createElement(flags);
                    setInitialProperties(currentResource, flags, current);
                    hoistableRoot.head.appendChild(currentResource);
                    break;
                  default:
                    throw Error(formatProdErrorMessage(468, flags));
                }
                currentResource[internalInstanceKey] = finishedWork;
                markNodeAsHoistable(currentResource);
                flags = currentResource;
              }
              finishedWork.stateNode = flags;
            } else
              mountHoistable(
                hoistableRoot,
                finishedWork.type,
                finishedWork.stateNode
              );
          else
            finishedWork.stateNode = acquireResource(
              hoistableRoot,
              flags,
              finishedWork.memoizedProps
            );
        else
          currentResource !== flags ? (null === currentResource ? null !== current.stateNode && (current = current.stateNode, current.parentNode.removeChild(current)) : currentResource.count--, null === flags ? mountHoistable(
            hoistableRoot,
            finishedWork.type,
            finishedWork.stateNode
          ) : acquireResource(
            hoistableRoot,
            flags,
            finishedWork.memoizedProps
          )) : null === flags && null !== finishedWork.stateNode && commitHostUpdate(
            finishedWork,
            finishedWork.memoizedProps,
            current.memoizedProps
          );
      }
      break;
    case 27:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
      null !== current && flags & 4 && commitHostUpdate(
        finishedWork,
        finishedWork.memoizedProps,
        current.memoizedProps
      );
      break;
    case 5:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
      if (finishedWork.flags & 32) {
        hoistableRoot = finishedWork.stateNode;
        try {
          setTextContent(hoistableRoot, "");
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      flags & 4 && null != finishedWork.stateNode && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(
        finishedWork,
        hoistableRoot,
        null !== current ? current.memoizedProps : hoistableRoot
      ));
      flags & 1024 && (needsFormReset = true);
      break;
    case 6:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      if (flags & 4) {
        if (null === finishedWork.stateNode)
          throw Error(formatProdErrorMessage(162));
        flags = finishedWork.memoizedProps;
        current = finishedWork.stateNode;
        try {
          current.nodeValue = flags;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      break;
    case 3:
      tagCaches = null;
      hoistableRoot = currentHoistableRoot;
      currentHoistableRoot = getHoistableRoot(root2.containerInfo);
      recursivelyTraverseMutationEffects(root2, finishedWork);
      currentHoistableRoot = hoistableRoot;
      commitReconciliationEffects(finishedWork);
      if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
        try {
          retryIfBlockedOn(root2.containerInfo);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
      break;
    case 4:
      flags = currentHoistableRoot;
      currentHoistableRoot = getHoistableRoot(
        finishedWork.stateNode.containerInfo
      );
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      currentHoistableRoot = flags;
      break;
    case 12:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      break;
    case 31:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
      break;
    case 13:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
      flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
      break;
    case 22:
      hoistableRoot = null !== finishedWork.memoizedState;
      var wasHidden = null !== current && null !== current.memoizedState, prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
      offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
      offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
      recursivelyTraverseMutationEffects(root2, finishedWork);
      offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
      offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
      commitReconciliationEffects(finishedWork);
      if (flags & 8192)
        a: for (root2 = finishedWork.stateNode, root2._visibility = hoistableRoot ? root2._visibility & -2 : root2._visibility | 1, hoistableRoot && (null === current || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), current = null, root2 = finishedWork; ; ) {
          if (5 === root2.tag || 26 === root2.tag) {
            if (null === current) {
              wasHidden = current = root2;
              try {
                if (currentResource = wasHidden.stateNode, hoistableRoot)
                  maybeNodes = currentResource.style, "function" === typeof maybeNodes.setProperty ? maybeNodes.setProperty("display", "none", "important") : maybeNodes.display = "none";
                else {
                  i = wasHidden.stateNode;
                  var styleProp = wasHidden.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
                  i.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
                }
              } catch (error) {
                captureCommitPhaseError(wasHidden, wasHidden.return, error);
              }
            }
          } else if (6 === root2.tag) {
            if (null === current) {
              wasHidden = root2;
              try {
                wasHidden.stateNode.nodeValue = hoistableRoot ? "" : wasHidden.memoizedProps;
              } catch (error) {
                captureCommitPhaseError(wasHidden, wasHidden.return, error);
              }
            }
          } else if (18 === root2.tag) {
            if (null === current) {
              wasHidden = root2;
              try {
                var instance = wasHidden.stateNode;
                hoistableRoot ? hideOrUnhideDehydratedBoundary(instance, true) : hideOrUnhideDehydratedBoundary(wasHidden.stateNode, false);
              } catch (error) {
                captureCommitPhaseError(wasHidden, wasHidden.return, error);
              }
            }
          } else if ((22 !== root2.tag && 23 !== root2.tag || null === root2.memoizedState || root2 === finishedWork) && null !== root2.child) {
            root2.child.return = root2;
            root2 = root2.child;
            continue;
          }
          if (root2 === finishedWork) break a;
          for (; null === root2.sibling; ) {
            if (null === root2.return || root2.return === finishedWork) break a;
            current === root2 && (current = null);
            root2 = root2.return;
          }
          current === root2 && (current = null);
          root2.sibling.return = root2.return;
          root2 = root2.sibling;
        }
      flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (current = flags.retryQueue, null !== current && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current))));
      break;
    case 19:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork);
  }
}
function commitReconciliationEffects(finishedWork) {
  var flags = finishedWork.flags;
  if (flags & 2) {
    try {
      for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
        if (isHostParent(parentFiber)) {
          hostParentFiber = parentFiber;
          break;
        }
        parentFiber = parentFiber.return;
      }
      if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
      switch (hostParentFiber.tag) {
        case 27:
          var parent = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
          insertOrAppendPlacementNode(finishedWork, before, parent);
          break;
        case 5:
          var parent$141 = hostParentFiber.stateNode;
          hostParentFiber.flags & 32 && (setTextContent(parent$141, ""), hostParentFiber.flags &= -33);
          var before$142 = getHostSibling(finishedWork);
          insertOrAppendPlacementNode(finishedWork, before$142, parent$141);
          break;
        case 3:
        case 4:
          var parent$143 = hostParentFiber.stateNode.containerInfo, before$144 = getHostSibling(finishedWork);
          insertOrAppendPlacementNodeIntoContainer(
            finishedWork,
            before$144,
            parent$143
          );
          break;
        default:
          throw Error(formatProdErrorMessage(161));
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
    finishedWork.flags &= -3;
  }
  flags & 4096 && (finishedWork.flags &= -4097);
}
function recursivelyResetForms(parentFiber) {
  if (parentFiber.subtreeFlags & 1024)
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var fiber = parentFiber;
      recursivelyResetForms(fiber);
      5 === fiber.tag && fiber.flags & 1024 && fiber.stateNode.reset();
      parentFiber = parentFiber.sibling;
    }
}
function recursivelyTraverseLayoutEffects(root2, parentFiber) {
  if (parentFiber.subtreeFlags & 8772)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
}
function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
  for (parentFiber = parentFiber.child; null !== parentFiber; ) {
    var finishedWork = parentFiber;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 1:
        safelyDetachRef(finishedWork, finishedWork.return);
        var instance = finishedWork.stateNode;
        "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
          finishedWork,
          finishedWork.return,
          instance
        );
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 27:
        releaseSingletonInstance(finishedWork.stateNode);
      case 26:
      case 5:
        safelyDetachRef(finishedWork, finishedWork.return);
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 22:
        null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 30:
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      default:
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
    }
    parentFiber = parentFiber.sibling;
  }
}
function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, includeWorkInProgressEffects) {
  includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
  for (parentFiber = parentFiber.child; null !== parentFiber; ) {
    var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        commitHookEffectListMount(4, finishedWork);
        break;
      case 1:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        current = finishedWork;
        finishedRoot = current.stateNode;
        if ("function" === typeof finishedRoot.componentDidMount)
          try {
            finishedRoot.componentDidMount();
          } catch (error) {
            captureCommitPhaseError(current, current.return, error);
          }
        current = finishedWork;
        finishedRoot = current.updateQueue;
        if (null !== finishedRoot) {
          var instance = current.stateNode;
          try {
            var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
            if (null !== hiddenCallbacks)
              for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                callCallback(hiddenCallbacks[finishedRoot], instance);
          } catch (error) {
            captureCommitPhaseError(current, current.return, error);
          }
        }
        includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 27:
        commitHostSingletonAcquisition(finishedWork);
      case 26:
      case 5:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 12:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        break;
      case 31:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 13:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 22:
        null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 30:
        break;
      default:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
    }
    parentFiber = parentFiber.sibling;
  }
}
function commitOffscreenPassiveMountEffects(current, finishedWork) {
  var previousCache = null;
  null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
  current = null;
  null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
  current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
}
function commitCachePassiveMountEffect(current, finishedWork) {
  current = null;
  null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
  finishedWork = finishedWork.memoizedState.cache;
  finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
}
function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
  if (parentFiber.subtreeFlags & 10256)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      commitPassiveMountOnFiber(
        root2,
        parentFiber,
        committedLanes,
        committedTransitions
      ), parentFiber = parentFiber.sibling;
}
function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
  var flags = finishedWork.flags;
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
      flags & 2048 && commitHookEffectListMount(9, finishedWork);
      break;
    case 1:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
      break;
    case 3:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
      flags & 2048 && (finishedRoot = null, null !== finishedWork.alternate && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, null != finishedRoot && releaseCache(finishedRoot)));
      break;
    case 12:
      if (flags & 2048) {
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        finishedRoot = finishedWork.stateNode;
        try {
          var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
          "function" === typeof onPostCommit && onPostCommit(
            id,
            null === finishedWork.alternate ? "mount" : "update",
            finishedRoot.passiveEffectDuration,
            -0
          );
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      } else
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
      break;
    case 31:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
      break;
    case 13:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
      break;
    case 23:
      break;
    case 22:
      _finishedWork$memoize2 = finishedWork.stateNode;
      id = finishedWork.alternate;
      null !== finishedWork.memoizedState ? _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      ) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions,
        0 !== (finishedWork.subtreeFlags & 10256) || false
      ));
      flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
      break;
    case 24:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
      flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
      break;
    default:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
  }
}
function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
  includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || false);
  for (parentFiber = parentFiber.child; null !== parentFiber; ) {
    var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        );
        commitHookEffectListMount(8, finishedWork);
        break;
      case 23:
        break;
      case 22:
        var instance = finishedWork.stateNode;
        null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        ) : recursivelyTraverseAtomicPassiveEffects(
          finishedRoot,
          finishedWork
        ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        ));
        includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
          finishedWork.alternate,
          finishedWork
        );
        break;
      case 24:
        recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        );
        includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
        break;
      default:
        recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        );
    }
    parentFiber = parentFiber.sibling;
  }
}
function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
  if (parentFiber.subtreeFlags & 10256)
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 22:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
          flags & 2048 && commitOffscreenPassiveMountEffects(
            finishedWork.alternate,
            finishedWork
          );
          break;
        case 24:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
          flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
      }
      parentFiber = parentFiber.sibling;
    }
}
var suspenseyCommitFlag = 8192;
function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
  if (parentFiber.subtreeFlags & suspenseyCommitFlag)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      accumulateSuspenseyCommitOnFiber(
        parentFiber,
        committedLanes,
        suspendedState
      ), parentFiber = parentFiber.sibling;
}
function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
  switch (fiber.tag) {
    case 26:
      recursivelyAccumulateSuspenseyCommit(
        fiber,
        committedLanes,
        suspendedState
      );
      fiber.flags & suspenseyCommitFlag && null !== fiber.memoizedState && suspendResource(
        suspendedState,
        currentHoistableRoot,
        fiber.memoizedState,
        fiber.memoizedProps
      );
      break;
    case 5:
      recursivelyAccumulateSuspenseyCommit(
        fiber,
        committedLanes,
        suspendedState
      );
      break;
    case 3:
    case 4:
      var previousHoistableRoot = currentHoistableRoot;
      currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
      recursivelyAccumulateSuspenseyCommit(
        fiber,
        committedLanes,
        suspendedState
      );
      currentHoistableRoot = previousHoistableRoot;
      break;
    case 22:
      null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(
        fiber,
        committedLanes,
        suspendedState
      ), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(
        fiber,
        committedLanes,
        suspendedState
      ));
      break;
    default:
      recursivelyAccumulateSuspenseyCommit(
        fiber,
        committedLanes,
        suspendedState
      );
  }
}
function detachAlternateSiblings(parentFiber) {
  var previousFiber = parentFiber.alternate;
  if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
    previousFiber.child = null;
    do
      previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
    while (null !== parentFiber);
  }
}
function recursivelyTraversePassiveUnmountEffects(parentFiber) {
  var deletions = parentFiber.deletions;
  if (0 !== (parentFiber.flags & 16)) {
    if (null !== deletions)
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i];
        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
          childToDelete,
          parentFiber
        );
      }
    detachAlternateSiblings(parentFiber);
  }
  if (parentFiber.subtreeFlags & 10256)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
}
function commitPassiveUnmountOnFiber(finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
      recursivelyTraversePassiveUnmountEffects(finishedWork);
      finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
      break;
    case 3:
      recursivelyTraversePassiveUnmountEffects(finishedWork);
      break;
    case 12:
      recursivelyTraversePassiveUnmountEffects(finishedWork);
      break;
    case 22:
      var instance = finishedWork.stateNode;
      null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
      break;
    default:
      recursivelyTraversePassiveUnmountEffects(finishedWork);
  }
}
function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
  var deletions = parentFiber.deletions;
  if (0 !== (parentFiber.flags & 16)) {
    if (null !== deletions)
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i];
        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
          childToDelete,
          parentFiber
        );
      }
    detachAlternateSiblings(parentFiber);
  }
  for (parentFiber = parentFiber.child; null !== parentFiber; ) {
    deletions = parentFiber;
    switch (deletions.tag) {
      case 0:
      case 11:
      case 15:
        commitHookEffectListUnmount(8, deletions, deletions.return);
        recursivelyTraverseDisconnectPassiveEffects(deletions);
        break;
      case 22:
        i = deletions.stateNode;
        i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
        break;
      default:
        recursivelyTraverseDisconnectPassiveEffects(deletions);
    }
    parentFiber = parentFiber.sibling;
  }
}
function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
  for (; null !== nextEffect; ) {
    var fiber = nextEffect;
    switch (fiber.tag) {
      case 0:
      case 11:
      case 15:
        commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
        break;
      case 23:
      case 22:
        if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
          var cache = fiber.memoizedState.cachePool.pool;
          null != cache && cache.refCount++;
        }
        break;
      case 24:
        releaseCache(fiber.memoizedState.cache);
    }
    cache = fiber.child;
    if (null !== cache) cache.return = fiber, nextEffect = cache;
    else
      a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
        cache = nextEffect;
        var sibling = cache.sibling, returnFiber = cache.return;
        detachFiberAfterEffects(cache);
        if (cache === fiber) {
          nextEffect = null;
          break a;
        }
        if (null !== sibling) {
          sibling.return = returnFiber;
          nextEffect = sibling;
          break a;
        }
        nextEffect = returnFiber;
      }
  }
}
var DefaultAsyncDispatcher = {
  getCacheForType: function(resourceType) {
    var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
    void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
    return cacheForType;
  },
  cacheSignal: function() {
    return readContext(CacheContext).controller.signal;
  }
}, PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = false, workInProgressRootIsPrerendering = false, workInProgressRootDidAttachPingListener = false, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = false, globalMostRecentFallbackTime = 0, globalMostRecentTransitionTime = 0, workInProgressRootRenderTargetTime = Infinity, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
function requestUpdateLane() {
  return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
}
function requestDeferredLane() {
  if (0 === workInProgressDeferredLane)
    if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
      var lane = nextTransitionDeferredLane;
      nextTransitionDeferredLane <<= 1;
      0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
      workInProgressDeferredLane = lane;
    } else workInProgressDeferredLane = 536870912;
  lane = suspenseHandlerStackCursor.current;
  null !== lane && (lane.flags |= 32);
  return workInProgressDeferredLane;
}
function scheduleUpdateOnFiber(root2, fiber, lane) {
  if (root2 === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
    prepareFreshStack(root2, 0), markRootSuspended(
      root2,
      workInProgressRootRenderLanes,
      workInProgressDeferredLane,
      false
    );
  markRootUpdated$1(root2, lane);
  if (0 === (executionContext & 2) || root2 !== workInProgressRoot)
    root2 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
      root2,
      workInProgressRootRenderLanes,
      workInProgressDeferredLane,
      false
    )), ensureRootIsScheduled(root2);
}
function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
  if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
  var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
  do {
    if (0 === exitStatus) {
      workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
      break;
    } else {
      forceSync = root$jscomp$0.current.alternate;
      if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
        exitStatus = renderRootSync(root$jscomp$0, lanes, false);
        renderWasConcurrent = false;
        continue;
      }
      if (2 === exitStatus) {
        renderWasConcurrent = lanes;
        if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
          var JSCompiler_inline_result = 0;
        else
          JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
        if (0 !== JSCompiler_inline_result) {
          lanes = JSCompiler_inline_result;
          a: {
            var root2 = root$jscomp$0;
            exitStatus = workInProgressRootConcurrentErrors;
            var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
            wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
            JSCompiler_inline_result = renderRootSync(
              root2,
              JSCompiler_inline_result,
              false
            );
            if (2 !== JSCompiler_inline_result) {
              if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                exitStatus = 4;
                break a;
              }
              renderWasConcurrent = workInProgressRootRecoverableErrors;
              workInProgressRootRecoverableErrors = exitStatus;
              null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                workInProgressRootRecoverableErrors,
                renderWasConcurrent
              ));
            }
            exitStatus = JSCompiler_inline_result;
          }
          renderWasConcurrent = false;
          if (2 !== exitStatus) continue;
        }
      }
      if (1 === exitStatus) {
        prepareFreshStack(root$jscomp$0, 0);
        markRootSuspended(root$jscomp$0, lanes, 0, true);
        break;
      }
      a: {
        shouldTimeSlice = root$jscomp$0;
        renderWasConcurrent = exitStatus;
        switch (renderWasConcurrent) {
          case 0:
          case 1:
            throw Error(formatProdErrorMessage(345));
          case 4:
            if ((lanes & 4194048) !== lanes) break;
          case 6:
            markRootSuspended(
              shouldTimeSlice,
              lanes,
              workInProgressDeferredLane,
              !workInProgressRootDidSkipSuspendedSiblings
            );
            break a;
          case 2:
            workInProgressRootRecoverableErrors = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(formatProdErrorMessage(329));
        }
        if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
          markRootSuspended(
            shouldTimeSlice,
            lanes,
            workInProgressDeferredLane,
            !workInProgressRootDidSkipSuspendedSiblings
          );
          if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
          pendingEffectsLanes = lanes;
          shouldTimeSlice.timeoutHandle = scheduleTimeout(
            commitRootWhenReady.bind(
              null,
              shouldTimeSlice,
              forceSync,
              workInProgressRootRecoverableErrors,
              workInProgressTransitions,
              workInProgressRootDidIncludeRecursiveRenderUpdate,
              lanes,
              workInProgressDeferredLane,
              workInProgressRootInterleavedUpdatedLanes,
              workInProgressSuspendedRetryLanes,
              workInProgressRootDidSkipSuspendedSiblings,
              renderWasConcurrent,
              "Throttled",
              -0,
              0
            ),
            exitStatus
          );
          break a;
        }
        commitRootWhenReady(
          shouldTimeSlice,
          forceSync,
          workInProgressRootRecoverableErrors,
          workInProgressTransitions,
          workInProgressRootDidIncludeRecursiveRenderUpdate,
          lanes,
          workInProgressDeferredLane,
          workInProgressRootInterleavedUpdatedLanes,
          workInProgressSuspendedRetryLanes,
          workInProgressRootDidSkipSuspendedSiblings,
          renderWasConcurrent,
          null,
          -0,
          0
        );
      }
    }
    break;
  } while (1);
  ensureRootIsScheduled(root$jscomp$0);
}
function commitRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
  root2.timeoutHandle = -1;
  suspendedCommitReason = finishedWork.subtreeFlags;
  if (suspendedCommitReason & 8192 || 16785408 === (suspendedCommitReason & 16785408)) {
    suspendedCommitReason = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: true,
      waitingForViewTransition: false,
      unsuspend: noop$1
    };
    accumulateSuspenseyCommitOnFiber(
      finishedWork,
      lanes,
      suspendedCommitReason
    );
    var timeoutOffset = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0;
    timeoutOffset = waitForCommitToBeReady(
      suspendedCommitReason,
      timeoutOffset
    );
    if (null !== timeoutOffset) {
      pendingEffectsLanes = lanes;
      root2.cancelPendingCommit = timeoutOffset(
        commitRoot.bind(
          null,
          root2,
          finishedWork,
          lanes,
          recoverableErrors,
          transitions,
          didIncludeRenderPhaseUpdate,
          spawnedLane,
          updatedLanes,
          suspendedRetryLanes,
          exitStatus,
          suspendedCommitReason,
          null,
          completedRenderStartTime,
          completedRenderEndTime
        )
      );
      markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
      return;
    }
  }
  commitRoot(
    root2,
    finishedWork,
    lanes,
    recoverableErrors,
    transitions,
    didIncludeRenderPhaseUpdate,
    spawnedLane,
    updatedLanes,
    suspendedRetryLanes
  );
}
function isRenderConsistentWithExternalStores(finishedWork) {
  for (var node = finishedWork; ; ) {
    var tag = node.tag;
    if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
      for (var i = 0; i < tag.length; i++) {
        var check = tag[i], getSnapshot = check.getSnapshot;
        check = check.value;
        try {
          if (!objectIs(getSnapshot(), check)) return false;
        } catch (error) {
          return false;
        }
      }
    tag = node.child;
    if (node.subtreeFlags & 16384 && null !== tag)
      tag.return = node, node = tag;
    else {
      if (node === finishedWork) break;
      for (; null === node.sibling; ) {
        if (null === node.return || node.return === finishedWork) return true;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
  return true;
}
function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
  suspendedLanes &= ~workInProgressRootPingedLanes;
  suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
  root2.suspendedLanes |= suspendedLanes;
  root2.pingedLanes &= ~suspendedLanes;
  didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
  didAttemptEntireTree = root2.expirationTimes;
  for (var lanes = suspendedLanes; 0 < lanes; ) {
    var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
    didAttemptEntireTree[index$6] = -1;
    lanes &= ~lane;
  }
  0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
}
function flushSyncWork$1() {
  return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0), false) : true;
}
function resetWorkInProgressStack() {
  if (null !== workInProgress) {
    if (0 === workInProgressSuspendedReason)
      var interruptedWork = workInProgress.return;
    else
      interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
    for (; null !== interruptedWork; )
      unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
    workInProgress = null;
  }
}
function prepareFreshStack(root2, lanes) {
  var timeoutHandle = root2.timeoutHandle;
  -1 !== timeoutHandle && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
  timeoutHandle = root2.cancelPendingCommit;
  null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
  pendingEffectsLanes = 0;
  resetWorkInProgressStack();
  workInProgressRoot = root2;
  workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
  workInProgressRootRenderLanes = lanes;
  workInProgressSuspendedReason = 0;
  workInProgressThrownValue = null;
  workInProgressRootDidSkipSuspendedSiblings = false;
  workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
  workInProgressRootDidAttachPingListener = false;
  workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
  workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
  workInProgressRootDidIncludeRecursiveRenderUpdate = false;
  0 !== (lanes & 8) && (lanes |= lanes & 32);
  var allEntangledLanes = root2.entangledLanes;
  if (0 !== allEntangledLanes)
    for (root2 = root2.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes; ) {
      var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
      lanes |= root2[index$4];
      allEntangledLanes &= ~lane;
    }
  entangledRenderLanes = lanes;
  finishQueueingConcurrentUpdates();
  return timeoutHandle;
}
function handleThrow(root2, thrownValue) {
  currentlyRenderingFiber = null;
  ReactSharedInternals.H = ContextOnlyDispatcher;
  thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
  workInProgressThrownValue = thrownValue;
  null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
    root2,
    createCapturedValueAtFiber(thrownValue, root2.current)
  ));
}
function shouldRemainOnPreviousScreen() {
  var handler = suspenseHandlerStackCursor.current;
  return null === handler ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : false;
}
function pushDispatcher() {
  var prevDispatcher = ReactSharedInternals.H;
  ReactSharedInternals.H = ContextOnlyDispatcher;
  return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
}
function pushAsyncDispatcher() {
  var prevAsyncDispatcher = ReactSharedInternals.A;
  ReactSharedInternals.A = DefaultAsyncDispatcher;
  return prevAsyncDispatcher;
}
function renderDidSuspendDelayIfPossible() {
  workInProgressRootExitStatus = 4;
  workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
  0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
    workInProgressRoot,
    workInProgressRootRenderLanes,
    workInProgressDeferredLane,
    false
  );
}
function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
  if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
    workInProgressTransitions = null, prepareFreshStack(root2, lanes);
  lanes = false;
  var exitStatus = workInProgressRootExitStatus;
  a: do
    try {
      if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
        var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
        switch (workInProgressSuspendedReason) {
          case 8:
            resetWorkInProgressStack();
            exitStatus = 6;
            break a;
          case 3:
          case 2:
          case 9:
          case 6:
            null === suspenseHandlerStackCursor.current && (lanes = true);
            var reason = workInProgressSuspendedReason;
            workInProgressSuspendedReason = 0;
            workInProgressThrownValue = null;
            throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
            if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
              exitStatus = 0;
              break a;
            }
            break;
          default:
            reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
        }
      }
      workLoopSync();
      exitStatus = workInProgressRootExitStatus;
      break;
    } catch (thrownValue$165) {
      handleThrow(root2, thrownValue$165);
    }
  while (1);
  lanes && root2.shellSuspendCounter++;
  lastContextDependency = currentlyRenderingFiber$1 = null;
  executionContext = prevExecutionContext;
  ReactSharedInternals.H = prevDispatcher;
  ReactSharedInternals.A = prevAsyncDispatcher;
  null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
  return exitStatus;
}
function workLoopSync() {
  for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
}
function renderRootConcurrent(root2, lanes) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
  workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
    root2,
    lanes
  );
  a: do
    try {
      if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
        lanes = workInProgress;
        var thrownValue = workInProgressThrownValue;
        b: switch (workInProgressSuspendedReason) {
          case 1:
            workInProgressSuspendedReason = 0;
            workInProgressThrownValue = null;
            throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
            break;
          case 2:
          case 9:
            if (isThenableResolved(thrownValue)) {
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              replaySuspendedUnitOfWork(lanes);
              break;
            }
            lanes = function() {
              2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7);
              ensureRootIsScheduled(root2);
            };
            thrownValue.then(lanes, lanes);
            break a;
          case 3:
            workInProgressSuspendedReason = 7;
            break a;
          case 4:
            workInProgressSuspendedReason = 5;
            break a;
          case 7:
            isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
            break;
          case 5:
            var resource = null;
            switch (workInProgress.tag) {
              case 26:
                resource = workInProgress.memoizedState;
              case 5:
              case 27:
                var hostFiber = workInProgress;
                if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  var sibling = hostFiber.sibling;
                  if (null !== sibling) workInProgress = sibling;
                  else {
                    var returnFiber = hostFiber.return;
                    null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                  }
                  break b;
                }
            }
            workInProgressSuspendedReason = 0;
            workInProgressThrownValue = null;
            throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
            break;
          case 6:
            workInProgressSuspendedReason = 0;
            workInProgressThrownValue = null;
            throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
            break;
          case 8:
            resetWorkInProgressStack();
            workInProgressRootExitStatus = 6;
            break a;
          default:
            throw Error(formatProdErrorMessage(462));
        }
      }
      workLoopConcurrentByScheduler();
      break;
    } catch (thrownValue$167) {
      handleThrow(root2, thrownValue$167);
    }
  while (1);
  lastContextDependency = currentlyRenderingFiber$1 = null;
  ReactSharedInternals.H = prevDispatcher;
  ReactSharedInternals.A = prevAsyncDispatcher;
  executionContext = prevExecutionContext;
  if (null !== workInProgress) return 0;
  workInProgressRoot = null;
  workInProgressRootRenderLanes = 0;
  finishQueueingConcurrentUpdates();
  return workInProgressRootExitStatus;
}
function workLoopConcurrentByScheduler() {
  for (; null !== workInProgress && !shouldYield(); )
    performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork) {
  var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
}
function replaySuspendedUnitOfWork(unitOfWork) {
  var next = unitOfWork;
  var current = next.alternate;
  switch (next.tag) {
    case 15:
    case 0:
      next = replayFunctionComponent(
        current,
        next,
        next.pendingProps,
        next.type,
        void 0,
        workInProgressRootRenderLanes
      );
      break;
    case 11:
      next = replayFunctionComponent(
        current,
        next,
        next.pendingProps,
        next.type.render,
        next.ref,
        workInProgressRootRenderLanes
      );
      break;
    case 5:
      resetHooksOnUnwind(next);
    default:
      unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
  }
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
}
function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
  lastContextDependency = currentlyRenderingFiber$1 = null;
  resetHooksOnUnwind(unitOfWork);
  thenableState$1 = null;
  thenableIndexCounter$1 = 0;
  var returnFiber = unitOfWork.return;
  try {
    if (throwException(
      root2,
      returnFiber,
      unitOfWork,
      thrownValue,
      workInProgressRootRenderLanes
    )) {
      workInProgressRootExitStatus = 1;
      logUncaughtError(
        root2,
        createCapturedValueAtFiber(thrownValue, root2.current)
      );
      workInProgress = null;
      return;
    }
  } catch (error) {
    if (null !== returnFiber) throw workInProgress = returnFiber, error;
    workInProgressRootExitStatus = 1;
    logUncaughtError(
      root2,
      createCapturedValueAtFiber(thrownValue, root2.current)
    );
    workInProgress = null;
    return;
  }
  if (unitOfWork.flags & 32768) {
    if (isHydrating || 1 === suspendedReason) root2 = true;
    else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
      root2 = false;
    else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
      suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
    unwindUnitOfWork(unitOfWork, root2);
  } else completeUnitOfWork(unitOfWork);
}
function completeUnitOfWork(unitOfWork) {
  var completedWork = unitOfWork;
  do {
    if (0 !== (completedWork.flags & 32768)) {
      unwindUnitOfWork(
        completedWork,
        workInProgressRootDidSkipSuspendedSiblings
      );
      return;
    }
    unitOfWork = completedWork.return;
    var next = completeWork(
      completedWork.alternate,
      completedWork,
      entangledRenderLanes
    );
    if (null !== next) {
      workInProgress = next;
      return;
    }
    completedWork = completedWork.sibling;
    if (null !== completedWork) {
      workInProgress = completedWork;
      return;
    }
    workInProgress = completedWork = unitOfWork;
  } while (null !== completedWork);
  0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
}
function unwindUnitOfWork(unitOfWork, skipSiblings) {
  do {
    var next = unwindWork(unitOfWork.alternate, unitOfWork);
    if (null !== next) {
      next.flags &= 32767;
      workInProgress = next;
      return;
    }
    next = unitOfWork.return;
    null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
    if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
      workInProgress = unitOfWork;
      return;
    }
    workInProgress = unitOfWork = next;
  } while (null !== unitOfWork);
  workInProgressRootExitStatus = 6;
  workInProgress = null;
}
function commitRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
  root2.cancelPendingCommit = null;
  do
    flushPendingEffects();
  while (0 !== pendingEffectsStatus);
  if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
  if (null !== finishedWork) {
    if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
    didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
    didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes;
    markRootFinished(
      root2,
      lanes,
      didIncludeRenderPhaseUpdate,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes
    );
    root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
    pendingFinishedWork = finishedWork;
    pendingEffectsRoot = root2;
    pendingEffectsLanes = lanes;
    pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
    pendingPassiveTransitions = transitions;
    pendingRecoverableErrors = recoverableErrors;
    0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
      flushPassiveEffects();
      return null;
    })) : (root2.callbackNode = null, root2.callbackPriority = 0);
    recoverableErrors = 0 !== (finishedWork.flags & 13878);
    if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
      recoverableErrors = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      transitions = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = 2;
      spawnedLane = executionContext;
      executionContext |= 4;
      try {
        commitBeforeMutationEffects(root2, finishedWork, lanes);
      } finally {
        executionContext = spawnedLane, ReactDOMSharedInternals.p = transitions, ReactSharedInternals.T = recoverableErrors;
      }
    }
    pendingEffectsStatus = 1;
    flushMutationEffects();
    flushLayoutEffects();
    flushSpawnedWork();
  }
}
function flushMutationEffects() {
  if (1 === pendingEffectsStatus) {
    pendingEffectsStatus = 0;
    var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
    if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
      rootMutationHasEffect = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = 2;
      var prevExecutionContext = executionContext;
      executionContext |= 4;
      try {
        commitMutationEffectsOnFiber(finishedWork, root2);
        var priorSelectionInformation = selectionInformation, curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = priorSelectionInformation.focusedElem, priorSelectionRange = priorSelectionInformation.selectionRange;
        if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
          priorFocusedElem.ownerDocument.documentElement,
          priorFocusedElem
        )) {
          if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
            var start = priorSelectionRange.start, end = priorSelectionRange.end;
            void 0 === end && (end = start);
            if ("selectionStart" in priorFocusedElem)
              priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                end,
                priorFocusedElem.value.length
              );
            else {
              var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
              if (win.getSelection) {
                var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                var startMarker = getNodeForCharacterOffset(
                  priorFocusedElem,
                  start$jscomp$0
                ), endMarker = getNodeForCharacterOffset(
                  priorFocusedElem,
                  end$jscomp$0
                );
                if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                  var range = doc.createRange();
                  range.setStart(startMarker.node, startMarker.offset);
                  selection.removeAllRanges();
                  start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                }
              }
            }
          }
          doc = [];
          for (selection = priorFocusedElem; selection = selection.parentNode; )
            1 === selection.nodeType && doc.push({
              element: selection,
              left: selection.scrollLeft,
              top: selection.scrollTop
            });
          "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
          for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
            var info = doc[priorFocusedElem];
            info.element.scrollLeft = info.left;
            info.element.scrollTop = info.top;
          }
        }
        _enabled = !!eventsEnabled;
        selectionInformation = eventsEnabled = null;
      } finally {
        executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
      }
    }
    root2.current = finishedWork;
    pendingEffectsStatus = 2;
  }
}
function flushLayoutEffects() {
  if (2 === pendingEffectsStatus) {
    pendingEffectsStatus = 0;
    var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
    if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
      rootHasLayoutEffect = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = 2;
      var prevExecutionContext = executionContext;
      executionContext |= 4;
      try {
        commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
      } finally {
        executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
      }
    }
    pendingEffectsStatus = 3;
  }
}
function flushSpawnedWork() {
  if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
    pendingEffectsStatus = 0;
    requestPaint();
    var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors;
    0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
    var remainingLanes = root2.pendingLanes;
    0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
    lanesToEventPriority(lanes);
    finishedWork = finishedWork.stateNode;
    if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
      try {
        injectedHook.onCommitFiberRoot(
          rendererID,
          finishedWork,
          void 0,
          128 === (finishedWork.current.flags & 128)
        );
      } catch (err) {
      }
    if (null !== recoverableErrors) {
      finishedWork = ReactSharedInternals.T;
      remainingLanes = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = 2;
      ReactSharedInternals.T = null;
      try {
        for (var onRecoverableError = root2.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
          var recoverableError = recoverableErrors[i];
          onRecoverableError(recoverableError.value, {
            componentStack: recoverableError.stack
          });
        }
      } finally {
        ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = remainingLanes;
      }
    }
    0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
    ensureRootIsScheduled(root2);
    remainingLanes = root2.pendingLanes;
    0 !== (lanes & 261930) && 0 !== (remainingLanes & 42) ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : nestedUpdateCount = 0;
    flushSyncWorkAcrossRoots_impl(0);
  }
}
function releaseRootPooledCache(root2, remainingLanes) {
  0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
}
function flushPendingEffects() {
  flushMutationEffects();
  flushLayoutEffects();
  flushSpawnedWork();
  return flushPassiveEffects();
}
function flushPassiveEffects() {
  if (5 !== pendingEffectsStatus) return false;
  var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
  pendingEffectsRemainingLanes = 0;
  var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
  try {
    ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
    ReactSharedInternals.T = null;
    renderPriority = pendingPassiveTransitions;
    pendingPassiveTransitions = null;
    var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
    pendingEffectsStatus = 0;
    pendingFinishedWork = pendingEffectsRoot = null;
    pendingEffectsLanes = 0;
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
    var prevExecutionContext = executionContext;
    executionContext |= 4;
    commitPassiveUnmountOnFiber(root$jscomp$0.current);
    commitPassiveMountOnFiber(
      root$jscomp$0,
      root$jscomp$0.current,
      lanes,
      renderPriority
    );
    executionContext = prevExecutionContext;
    flushSyncWorkAcrossRoots_impl(0, false);
    if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
      try {
        injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
      } catch (err) {
      }
    return true;
  } finally {
    ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
  }
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
  rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
  null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
}
function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
  if (3 === sourceFiber.tag)
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
  else
    for (; null !== nearestMountedAncestor; ) {
      if (3 === nearestMountedAncestor.tag) {
        captureCommitPhaseErrorOnRoot(
          nearestMountedAncestor,
          sourceFiber,
          error
        );
        break;
      } else if (1 === nearestMountedAncestor.tag) {
        var instance = nearestMountedAncestor.stateNode;
        if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
          sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
          error = createClassErrorUpdate(2);
          instance = enqueueUpdate(nearestMountedAncestor, error, 2);
          null !== instance && (initializeClassErrorUpdate(
            error,
            instance,
            nearestMountedAncestor,
            sourceFiber
          ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
          break;
        }
      }
      nearestMountedAncestor = nearestMountedAncestor.return;
    }
}
function attachPingListener(root2, wakeable, lanes) {
  var pingCache = root2.pingCache;
  if (null === pingCache) {
    pingCache = root2.pingCache = new PossiblyWeakMap();
    var threadIDs = /* @__PURE__ */ new Set();
    pingCache.set(wakeable, threadIDs);
  } else
    threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
  threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
}
function pingSuspendedRoot(root2, wakeable, pingedLanes) {
  var pingCache = root2.pingCache;
  null !== pingCache && pingCache.delete(wakeable);
  root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
  root2.warmLanes &= ~pingedLanes;
  workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) && prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
  ensureRootIsScheduled(root2);
}
function retryTimedOutBoundary(boundaryFiber, retryLane) {
  0 === retryLane && (retryLane = claimNextRetryLane());
  boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
  null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
}
function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
  null !== suspenseState && (retryLane = suspenseState.retryLane);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
function resolveRetryWakeable(boundaryFiber, wakeable) {
  var retryLane = 0;
  switch (boundaryFiber.tag) {
    case 31:
    case 13:
      var retryCache = boundaryFiber.stateNode;
      var suspenseState = boundaryFiber.memoizedState;
      null !== suspenseState && (retryLane = suspenseState.retryLane);
      break;
    case 19:
      retryCache = boundaryFiber.stateNode;
      break;
    case 22:
      retryCache = boundaryFiber.stateNode._retryCache;
      break;
    default:
      throw Error(formatProdErrorMessage(314));
  }
  null !== retryCache && retryCache.delete(wakeable);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
function scheduleCallback$1(priorityLevel, callback) {
  return scheduleCallback$3(priorityLevel, callback);
}
var firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = false, mightHavePendingSyncWork = false, isFlushingWork = false, currentEventTransitionLane = 0;
function ensureRootIsScheduled(root2) {
  root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
  mightHavePendingSyncWork = true;
  didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
}
function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
  if (!isFlushingWork && mightHavePendingSyncWork) {
    isFlushingWork = true;
    do {
      var didPerformSomeWork = false;
      for (var root$170 = firstScheduledRoot; null !== root$170; ) {
        if (0 !== syncTransitionLanes) {
          var pendingLanes = root$170.pendingLanes;
          if (0 === pendingLanes) var JSCompiler_inline_result = 0;
          else {
            var suspendedLanes = root$170.suspendedLanes, pingedLanes = root$170.pingedLanes;
            JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
            JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
            JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
          }
          0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
        } else
          JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
            root$170,
            root$170 === workInProgressRoot ? JSCompiler_inline_result : 0,
            null !== root$170.cancelPendingCommit || -1 !== root$170.timeoutHandle
          ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$170, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
        root$170 = root$170.next;
      }
    } while (didPerformSomeWork);
    isFlushingWork = false;
  }
}
function processRootScheduleInImmediateTask() {
  processRootScheduleInMicrotask();
}
function processRootScheduleInMicrotask() {
  mightHavePendingSyncWork = didScheduleMicrotask = false;
  var syncTransitionLanes = 0;
  0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
  for (var currentTime = now(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
    var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
    if (0 === nextLanes)
      root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
    else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
      mightHavePendingSyncWork = true;
    root2 = next;
  }
  0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes);
  0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
}
function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
  for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
    var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
    if (-1 === expirationTime) {
      if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
        expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
    } else expirationTime <= currentTime && (root2.expiredLanes |= lane);
    lanes &= ~lane;
  }
  currentTime = workInProgressRoot;
  suspendedLanes = workInProgressRootRenderLanes;
  suspendedLanes = getNextLanes(
    root2,
    root2 === currentTime ? suspendedLanes : 0,
    null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
  );
  pingedLanes = root2.callbackNode;
  if (0 === suspendedLanes || root2 === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
    return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
  if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
    currentTime = suspendedLanes & -suspendedLanes;
    if (currentTime === root2.callbackPriority) return currentTime;
    null !== pingedLanes && cancelCallback$1(pingedLanes);
    switch (lanesToEventPriority(suspendedLanes)) {
      case 2:
      case 8:
        suspendedLanes = UserBlockingPriority;
        break;
      case 32:
        suspendedLanes = NormalPriority$1;
        break;
      case 268435456:
        suspendedLanes = IdlePriority;
        break;
      default:
        suspendedLanes = NormalPriority$1;
    }
    pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
    suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
    root2.callbackPriority = currentTime;
    root2.callbackNode = suspendedLanes;
    return currentTime;
  }
  null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
  root2.callbackPriority = 2;
  root2.callbackNode = null;
  return 2;
}
function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
  if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
    return root2.callbackNode = null, root2.callbackPriority = 0, null;
  var originalCallbackNode = root2.callbackNode;
  if (flushPendingEffects() && root2.callbackNode !== originalCallbackNode)
    return null;
  var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
  workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
    root2,
    root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
    null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
  );
  if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
  performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
  scheduleTaskForRootDuringMicrotask(root2, now());
  return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
}
function performSyncWorkOnRoot(root2, lanes) {
  if (flushPendingEffects()) return null;
  performWorkOnRoot(root2, lanes, true);
}
function scheduleImmediateRootScheduleTask() {
  scheduleMicrotask(function() {
    0 !== (executionContext & 6) ? scheduleCallback$3(
      ImmediatePriority,
      processRootScheduleInImmediateTask
    ) : processRootScheduleInMicrotask();
  });
}
function requestTransitionLane() {
  if (0 === currentEventTransitionLane) {
    var actionScopeLane = currentEntangledLane;
    0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
    currentEventTransitionLane = actionScopeLane;
  }
  return currentEventTransitionLane;
}
function coerceFormActionProp(actionProp) {
  return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL("" + actionProp);
}
function createFormDataWithSubmitter(form, submitter) {
  var temp = submitter.ownerDocument.createElement("input");
  temp.name = submitter.name;
  temp.value = submitter.value;
  form.id && temp.setAttribute("form", form.id);
  submitter.parentNode.insertBefore(temp, submitter);
  form = new FormData(form);
  temp.parentNode.removeChild(temp);
  return form;
}
function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
  if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
    var action = coerceFormActionProp(
      (nativeEventTarget[internalPropsKey] || null).action
    ), submitter = nativeEvent.submitter;
    submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
    var event = new SyntheticEvent(
      "action",
      "action",
      null,
      nativeEvent,
      nativeEventTarget
    );
    dispatchQueue.push({
      event,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (nativeEvent.defaultPrevented) {
              if (0 !== currentEventTransitionLane) {
                var formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget);
                startHostTransition(
                  maybeTargetInst,
                  {
                    pending: true,
                    data: formData,
                    method: nativeEventTarget.method,
                    action
                  },
                  null,
                  formData
                );
              }
            } else
              "function" === typeof action && (event.preventDefault(), formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget), startHostTransition(
                maybeTargetInst,
                {
                  pending: true,
                  data: formData,
                  method: nativeEventTarget.method,
                  action
                },
                action,
                formData
              ));
          },
          currentTarget: nativeEventTarget
        }
      ]
    });
  }
}
for (var i$jscomp$inline_1577 = 0; i$jscomp$inline_1577 < simpleEventPluginEvents.length; i$jscomp$inline_1577++) {
  var eventName$jscomp$inline_1578 = simpleEventPluginEvents[i$jscomp$inline_1577], domEventName$jscomp$inline_1579 = eventName$jscomp$inline_1578.toLowerCase(), capitalizedEvent$jscomp$inline_1580 = eventName$jscomp$inline_1578[0].toUpperCase() + eventName$jscomp$inline_1578.slice(1);
  registerSimpleEvent(
    domEventName$jscomp$inline_1579,
    "on" + capitalizedEvent$jscomp$inline_1580
  );
}
registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
registerSimpleEvent(ANIMATION_START, "onAnimationStart");
registerSimpleEvent("dblclick", "onDoubleClick");
registerSimpleEvent("focusin", "onFocus");
registerSimpleEvent("focusout", "onBlur");
registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
registerSimpleEvent(TRANSITION_START, "onTransitionStart");
registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
registerTwoPhaseEvent(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
registerTwoPhaseEvent(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
registerTwoPhaseEvent("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
registerTwoPhaseEvent(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
registerTwoPhaseEvent(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
registerTwoPhaseEvent(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), nonDelegatedEvents = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
);
function processDispatchQueue(dispatchQueue, eventSystemFlags) {
  eventSystemFlags = 0 !== (eventSystemFlags & 4);
  for (var i = 0; i < dispatchQueue.length; i++) {
    var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
    _dispatchQueue$i = _dispatchQueue$i.listeners;
    a: {
      var previousInstance = void 0;
      if (eventSystemFlags)
        for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
          var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
          _dispatchListeners$i = _dispatchListeners$i.listener;
          if (instance !== previousInstance && event.isPropagationStopped())
            break a;
          previousInstance = _dispatchListeners$i;
          event.currentTarget = currentTarget;
          try {
            previousInstance(event);
          } catch (error) {
            reportGlobalError(error);
          }
          event.currentTarget = null;
          previousInstance = instance;
        }
      else
        for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
          _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
          instance = _dispatchListeners$i.instance;
          currentTarget = _dispatchListeners$i.currentTarget;
          _dispatchListeners$i = _dispatchListeners$i.listener;
          if (instance !== previousInstance && event.isPropagationStopped())
            break a;
          previousInstance = _dispatchListeners$i;
          event.currentTarget = currentTarget;
          try {
            previousInstance(event);
          } catch (error) {
            reportGlobalError(error);
          }
          event.currentTarget = null;
          previousInstance = instance;
        }
    }
  }
}
function listenToNonDelegatedEvent(domEventName, targetElement) {
  var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
  void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
  var listenerSetKey = domEventName + "__bubble";
  JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
}
function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
  var eventSystemFlags = 0;
  isCapturePhaseListener && (eventSystemFlags |= 4);
  addTrappedEventListener(
    target,
    domEventName,
    eventSystemFlags,
    isCapturePhaseListener
  );
}
var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
function listenToAllSupportedEvents(rootContainerElement) {
  if (!rootContainerElement[listeningMarker]) {
    rootContainerElement[listeningMarker] = true;
    allNativeEvents.forEach(function(domEventName) {
      "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
    });
    var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
    null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
  }
}
function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
  switch (getEventPriority(domEventName)) {
    case 2:
      var listenerWrapper = dispatchDiscreteEvent;
      break;
    case 8:
      listenerWrapper = dispatchContinuousEvent;
      break;
    default:
      listenerWrapper = dispatchEvent;
  }
  eventSystemFlags = listenerWrapper.bind(
    null,
    domEventName,
    eventSystemFlags,
    targetContainer
  );
  listenerWrapper = void 0;
  !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
  isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
    capture: true,
    passive: listenerWrapper
  }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
    passive: listenerWrapper
  }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
}
function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
  var ancestorInst = targetInst$jscomp$0;
  if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
    a: for (; ; ) {
      if (null === targetInst$jscomp$0) return;
      var nodeTag = targetInst$jscomp$0.tag;
      if (3 === nodeTag || 4 === nodeTag) {
        var container = targetInst$jscomp$0.stateNode.containerInfo;
        if (container === targetContainer) break;
        if (4 === nodeTag)
          for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
            var grandTag = nodeTag.tag;
            if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
              return;
            nodeTag = nodeTag.return;
          }
        for (; null !== container; ) {
          nodeTag = getClosestInstanceFromNode(container);
          if (null === nodeTag) return;
          grandTag = nodeTag.tag;
          if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
            targetInst$jscomp$0 = ancestorInst = nodeTag;
            continue a;
          }
          container = container.parentNode;
        }
      }
      targetInst$jscomp$0 = targetInst$jscomp$0.return;
    }
  batchedUpdates$1(function() {
    var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
    a: {
      var reactName = topLevelEventsToReactNames.get(domEventName);
      if (void 0 !== reactName) {
        var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
        switch (domEventName) {
          case "keypress":
            if (0 === getEventCharCode(nativeEvent)) break a;
          case "keydown":
          case "keyup":
            SyntheticEventCtor = SyntheticKeyboardEvent;
            break;
          case "focusin":
            reactEventType = "focus";
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "focusout":
            reactEventType = "blur";
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "beforeblur":
          case "afterblur":
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "click":
            if (2 === nativeEvent.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            SyntheticEventCtor = SyntheticMouseEvent;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            SyntheticEventCtor = SyntheticDragEvent;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            SyntheticEventCtor = SyntheticTouchEvent;
            break;
          case ANIMATION_END:
          case ANIMATION_ITERATION:
          case ANIMATION_START:
            SyntheticEventCtor = SyntheticAnimationEvent;
            break;
          case TRANSITION_END:
            SyntheticEventCtor = SyntheticTransitionEvent;
            break;
          case "scroll":
          case "scrollend":
            SyntheticEventCtor = SyntheticUIEvent;
            break;
          case "wheel":
            SyntheticEventCtor = SyntheticWheelEvent;
            break;
          case "copy":
          case "cut":
          case "paste":
            SyntheticEventCtor = SyntheticClipboardEvent;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            SyntheticEventCtor = SyntheticPointerEvent;
            break;
          case "toggle":
          case "beforetoggle":
            SyntheticEventCtor = SyntheticToggleEvent;
        }
        var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
        inCapturePhase = [];
        for (var instance = targetInst, lastHostComponent; null !== instance; ) {
          var _instance = instance;
          lastHostComponent = _instance.stateNode;
          _instance = _instance.tag;
          5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
            createDispatchListener(instance, _instance, lastHostComponent)
          ));
          if (accumulateTargetOnly) break;
          instance = instance.return;
        }
        0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
          reactName,
          reactEventType,
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
      }
    }
    if (0 === (eventSystemFlags & 7)) {
      a: {
        reactName = "mouseover" === domEventName || "pointerover" === domEventName;
        SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
        if (reactName && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
          break a;
        if (SyntheticEventCtor || reactName) {
          reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window;
          if (SyntheticEventCtor) {
            if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), inCapturePhase = reactEventType.tag, reactEventType !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
              reactEventType = null;
          } else SyntheticEventCtor = null, reactEventType = targetInst;
          if (SyntheticEventCtor !== reactEventType) {
            inCapturePhase = SyntheticMouseEvent;
            _instance = "onMouseLeave";
            reactEventName = "onMouseEnter";
            instance = "mouse";
            if ("pointerout" === domEventName || "pointerover" === domEventName)
              inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
            accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
            lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
            reactName = new inCapturePhase(
              _instance,
              instance + "leave",
              SyntheticEventCtor,
              nativeEvent,
              nativeEventTarget
            );
            reactName.target = accumulateTargetOnly;
            reactName.relatedTarget = lastHostComponent;
            _instance = null;
            getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
              reactEventName,
              instance + "enter",
              reactEventType,
              nativeEvent,
              nativeEventTarget
            ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
            accumulateTargetOnly = _instance;
            if (SyntheticEventCtor && reactEventType)
              b: {
                inCapturePhase = getParent;
                reactEventName = SyntheticEventCtor;
                instance = reactEventType;
                lastHostComponent = 0;
                for (_instance = reactEventName; _instance; _instance = inCapturePhase(_instance))
                  lastHostComponent++;
                _instance = 0;
                for (var tempB = instance; tempB; tempB = inCapturePhase(tempB))
                  _instance++;
                for (; 0 < lastHostComponent - _instance; )
                  reactEventName = inCapturePhase(reactEventName), lastHostComponent--;
                for (; 0 < _instance - lastHostComponent; )
                  instance = inCapturePhase(instance), _instance--;
                for (; lastHostComponent--; ) {
                  if (reactEventName === instance || null !== instance && reactEventName === instance.alternate) {
                    inCapturePhase = reactEventName;
                    break b;
                  }
                  reactEventName = inCapturePhase(reactEventName);
                  instance = inCapturePhase(instance);
                }
                inCapturePhase = null;
              }
            else inCapturePhase = null;
            null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(
              dispatchQueue,
              reactName,
              SyntheticEventCtor,
              inCapturePhase,
              false
            );
            null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
              dispatchQueue,
              accumulateTargetOnly,
              reactEventType,
              inCapturePhase,
              true
            );
          }
        }
      }
      a: {
        reactName = targetInst ? getNodeFromInstance(targetInst) : window;
        SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
        if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
          var getTargetInstFunc = getTargetInstForChangeEvent;
        else if (isTextInputElement(reactName))
          if (isInputEventSupported)
            getTargetInstFunc = getTargetInstForInputOrChangeEvent;
          else {
            getTargetInstFunc = getTargetInstForInputEventPolyfill;
            var handleEventFunc = handleEventsForInputEventPolyfill;
          }
        else
          SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
        if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
          createAndAccumulateChangeEvent(
            dispatchQueue,
            getTargetInstFunc,
            nativeEvent,
            nativeEventTarget
          );
          break a;
        }
        handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
        "focusout" === domEventName && targetInst && "number" === reactName.type && null != targetInst.memoizedProps.value && setDefaultValue(reactName, "number", reactName.value);
      }
      handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
      switch (domEventName) {
        case "focusin":
          if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
            activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
          break;
        case "focusout":
          lastSelection = activeElementInst = activeElement = null;
          break;
        case "mousedown":
          mouseDown = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          mouseDown = false;
          constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
          break;
        case "selectionchange":
          if (skipSelectionChangeEvent) break;
        case "keydown":
        case "keyup":
          constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
      }
      var fallbackData;
      if (canUseCompositionEvent)
        b: {
          switch (domEventName) {
            case "compositionstart":
              var eventType = "onCompositionStart";
              break b;
            case "compositionend":
              eventType = "onCompositionEnd";
              break b;
            case "compositionupdate":
              eventType = "onCompositionUpdate";
              break b;
          }
          eventType = void 0;
        }
      else
        isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
      eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
        eventType,
        domEventName,
        null,
        nativeEvent,
        nativeEventTarget
      ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
      if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
        eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
          "onBeforeInput",
          "beforeinput",
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({
          event: handleEventFunc,
          listeners: eventType
        }), handleEventFunc.data = fallbackData);
      extractEvents$1(
        dispatchQueue,
        domEventName,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
    }
    processDispatchQueue(dispatchQueue, eventSystemFlags);
  });
}
function createDispatchListener(instance, listener, currentTarget) {
  return {
    instance,
    listener,
    currentTarget
  };
}
function accumulateTwoPhaseListeners(targetFiber, reactName) {
  for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
    var _instance2 = targetFiber, stateNode = _instance2.stateNode;
    _instance2 = _instance2.tag;
    5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
      createDispatchListener(targetFiber, _instance2, stateNode)
    ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
      createDispatchListener(targetFiber, _instance2, stateNode)
    ));
    if (3 === targetFiber.tag) return listeners;
    targetFiber = targetFiber.return;
  }
  return [];
}
function getParent(inst) {
  if (null === inst) return null;
  do
    inst = inst.return;
  while (inst && 5 !== inst.tag && 27 !== inst.tag);
  return inst ? inst : null;
}
function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
  for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
    var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
    _instance3 = _instance3.tag;
    if (null !== alternate && alternate === common) break;
    5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
      createDispatchListener(target, stateNode, alternate)
    )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
      createDispatchListener(target, stateNode, alternate)
    )));
    target = target.return;
  }
  0 !== listeners.length && dispatchQueue.push({ event, listeners });
}
var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
function normalizeMarkupForTextOrAttribute(markup) {
  return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
}
function checkForUnmatchedText(serverText, clientText) {
  clientText = normalizeMarkupForTextOrAttribute(clientText);
  return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
}
function setProp(domElement, tag, key, value, props, prevValue) {
  switch (key) {
    case "children":
      "string" === typeof value ? "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && "body" !== tag && setTextContent(domElement, "" + value);
      break;
    case "className":
      setValueForKnownAttribute(domElement, "class", value);
      break;
    case "tabIndex":
      setValueForKnownAttribute(domElement, "tabindex", value);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      setValueForKnownAttribute(domElement, key, value);
      break;
    case "style":
      setValueForStyles(domElement, value, prevValue);
      break;
    case "data":
      if ("object" !== tag) {
        setValueForKnownAttribute(domElement, "data", value);
        break;
      }
    case "src":
    case "href":
      if ("" === value && ("a" !== tag || "href" !== key)) {
        domElement.removeAttribute(key);
        break;
      }
      if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
        domElement.removeAttribute(key);
        break;
      }
      value = sanitizeURL("" + value);
      domElement.setAttribute(key, value);
      break;
    case "action":
    case "formAction":
      if ("function" === typeof value) {
        domElement.setAttribute(
          key,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
          domElement,
          tag,
          "formEncType",
          props.formEncType,
          props,
          null
        ), setProp(
          domElement,
          tag,
          "formMethod",
          props.formMethod,
          props,
          null
        ), setProp(
          domElement,
          tag,
          "formTarget",
          props.formTarget,
          props,
          null
        )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
      if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
        domElement.removeAttribute(key);
        break;
      }
      value = sanitizeURL("" + value);
      domElement.setAttribute(key, value);
      break;
    case "onClick":
      null != value && (domElement.onclick = noop$1);
      break;
    case "onScroll":
      null != value && listenToNonDelegatedEvent("scroll", domElement);
      break;
    case "onScrollEnd":
      null != value && listenToNonDelegatedEvent("scrollend", domElement);
      break;
    case "dangerouslySetInnerHTML":
      if (null != value) {
        if ("object" !== typeof value || !("__html" in value))
          throw Error(formatProdErrorMessage(61));
        key = value.__html;
        if (null != key) {
          if (null != props.children) throw Error(formatProdErrorMessage(60));
          domElement.innerHTML = key;
        }
      }
      break;
    case "multiple":
      domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
      break;
    case "muted":
      domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
        domElement.removeAttribute("xlink:href");
        break;
      }
      key = sanitizeURL("" + value);
      domElement.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        key
      );
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "" + value) : domElement.removeAttribute(key);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
      break;
    case "capture":
    case "download":
      true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
      break;
    case "rowSpan":
    case "start":
      null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
      break;
    case "popover":
      listenToNonDelegatedEvent("beforetoggle", domElement);
      listenToNonDelegatedEvent("toggle", domElement);
      setValueForAttribute(domElement, "popover", value);
      break;
    case "xlinkActuate":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        value
      );
      break;
    case "xlinkArcrole":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        value
      );
      break;
    case "xlinkRole":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        value
      );
      break;
    case "xlinkShow":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        value
      );
      break;
    case "xlinkTitle":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        value
      );
      break;
    case "xlinkType":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        value
      );
      break;
    case "xmlBase":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        value
      );
      break;
    case "xmlLang":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        value
      );
      break;
    case "xmlSpace":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        value
      );
      break;
    case "is":
      setValueForAttribute(domElement, "is", value);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
        key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
  }
}
function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
  switch (key) {
    case "style":
      setValueForStyles(domElement, value, prevValue);
      break;
    case "dangerouslySetInnerHTML":
      if (null != value) {
        if ("object" !== typeof value || !("__html" in value))
          throw Error(formatProdErrorMessage(61));
        key = value.__html;
        if (null != key) {
          if (null != props.children) throw Error(formatProdErrorMessage(60));
          domElement.innerHTML = key;
        }
      }
      break;
    case "children":
      "string" === typeof value ? setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && setTextContent(domElement, "" + value);
      break;
    case "onScroll":
      null != value && listenToNonDelegatedEvent("scroll", domElement);
      break;
    case "onScrollEnd":
      null != value && listenToNonDelegatedEvent("scrollend", domElement);
      break;
    case "onClick":
      null != value && (domElement.onclick = noop$1);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!registrationNameDependencies.hasOwnProperty(key))
        a: {
          if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), tag = key.slice(2, props ? key.length - 7 : void 0), prevValue = domElement[internalPropsKey] || null, prevValue = null != prevValue ? prevValue[key] : null, "function" === typeof prevValue && domElement.removeEventListener(tag, prevValue, props), "function" === typeof value)) {
            "function" !== typeof prevValue && null !== prevValue && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
            domElement.addEventListener(tag, value, props);
            break a;
          }
          key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
        }
  }
}
function setInitialProperties(domElement, tag, props) {
  switch (tag) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      listenToNonDelegatedEvent("error", domElement);
      listenToNonDelegatedEvent("load", domElement);
      var hasSrc = false, hasSrcSet = false, propKey;
      for (propKey in props)
        if (props.hasOwnProperty(propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "src":
                hasSrc = true;
                break;
              case "srcSet":
                hasSrcSet = true;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(137, tag));
              default:
                setProp(domElement, tag, propKey, propValue, props, null);
            }
        }
      hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
      hasSrc && setProp(domElement, tag, "src", props.src, props, null);
      return;
    case "input":
      listenToNonDelegatedEvent("invalid", domElement);
      var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
      for (hasSrc in props)
        if (props.hasOwnProperty(hasSrc)) {
          var propValue$184 = props[hasSrc];
          if (null != propValue$184)
            switch (hasSrc) {
              case "name":
                hasSrcSet = propValue$184;
                break;
              case "type":
                propValue = propValue$184;
                break;
              case "checked":
                checked = propValue$184;
                break;
              case "defaultChecked":
                defaultChecked = propValue$184;
                break;
              case "value":
                propKey = propValue$184;
                break;
              case "defaultValue":
                defaultValue = propValue$184;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propValue$184)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                setProp(domElement, tag, hasSrc, propValue$184, props, null);
            }
        }
      initInput(
        domElement,
        propKey,
        defaultValue,
        checked,
        defaultChecked,
        propValue,
        hasSrcSet,
        false
      );
      return;
    case "select":
      listenToNonDelegatedEvent("invalid", domElement);
      hasSrc = propValue = propKey = null;
      for (hasSrcSet in props)
        if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
          switch (hasSrcSet) {
            case "value":
              propKey = defaultValue;
              break;
            case "defaultValue":
              propValue = defaultValue;
              break;
            case "multiple":
              hasSrc = defaultValue;
            default:
              setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
          }
      tag = propKey;
      props = propValue;
      domElement.multiple = !!hasSrc;
      null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
      return;
    case "textarea":
      listenToNonDelegatedEvent("invalid", domElement);
      propKey = hasSrcSet = hasSrc = null;
      for (propValue in props)
        if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
          switch (propValue) {
            case "value":
              hasSrc = defaultValue;
              break;
            case "defaultValue":
              hasSrcSet = defaultValue;
              break;
            case "children":
              propKey = defaultValue;
              break;
            case "dangerouslySetInnerHTML":
              if (null != defaultValue) throw Error(formatProdErrorMessage(91));
              break;
            default:
              setProp(domElement, tag, propValue, defaultValue, props, null);
          }
      initTextarea(domElement, hasSrc, hasSrcSet, propKey);
      return;
    case "option":
      for (checked in props)
        if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
          switch (checked) {
            case "selected":
              domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
              break;
            default:
              setProp(domElement, tag, checked, hasSrc, props, null);
          }
      return;
    case "dialog":
      listenToNonDelegatedEvent("beforetoggle", domElement);
      listenToNonDelegatedEvent("toggle", domElement);
      listenToNonDelegatedEvent("cancel", domElement);
      listenToNonDelegatedEvent("close", domElement);
      break;
    case "iframe":
    case "object":
      listenToNonDelegatedEvent("load", domElement);
      break;
    case "video":
    case "audio":
      for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
        listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
      break;
    case "image":
      listenToNonDelegatedEvent("error", domElement);
      listenToNonDelegatedEvent("load", domElement);
      break;
    case "details":
      listenToNonDelegatedEvent("toggle", domElement);
      break;
    case "embed":
    case "source":
    case "link":
      listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (defaultChecked in props)
        if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
          switch (defaultChecked) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(formatProdErrorMessage(137, tag));
            default:
              setProp(domElement, tag, defaultChecked, hasSrc, props, null);
          }
      return;
    default:
      if (isCustomElement(tag)) {
        for (propValue$184 in props)
          props.hasOwnProperty(propValue$184) && (hasSrc = props[propValue$184], void 0 !== hasSrc && setPropOnCustomElement(
            domElement,
            tag,
            propValue$184,
            hasSrc,
            props,
            void 0
          ));
        return;
      }
  }
  for (defaultValue in props)
    props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
}
function updateProperties(domElement, tag, lastProps, nextProps) {
  switch (tag) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
      for (propKey in lastProps) {
        var lastProp = lastProps[propKey];
        if (lastProps.hasOwnProperty(propKey) && null != lastProp)
          switch (propKey) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              lastDefaultValue = lastProp;
            default:
              nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
          }
      }
      for (var propKey$201 in nextProps) {
        var propKey = nextProps[propKey$201];
        lastProp = lastProps[propKey$201];
        if (nextProps.hasOwnProperty(propKey$201) && (null != propKey || null != lastProp))
          switch (propKey$201) {
            case "type":
              type = propKey;
              break;
            case "name":
              name = propKey;
              break;
            case "checked":
              checked = propKey;
              break;
            case "defaultChecked":
              defaultChecked = propKey;
              break;
            case "value":
              value = propKey;
              break;
            case "defaultValue":
              defaultValue = propKey;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (null != propKey)
                throw Error(formatProdErrorMessage(137, tag));
              break;
            default:
              propKey !== lastProp && setProp(
                domElement,
                tag,
                propKey$201,
                propKey,
                nextProps,
                lastProp
              );
          }
      }
      updateInput(
        domElement,
        value,
        defaultValue,
        lastDefaultValue,
        checked,
        defaultChecked,
        type,
        name
      );
      return;
    case "select":
      propKey = value = defaultValue = propKey$201 = null;
      for (type in lastProps)
        if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
          switch (type) {
            case "value":
              break;
            case "multiple":
              propKey = lastDefaultValue;
            default:
              nextProps.hasOwnProperty(type) || setProp(
                domElement,
                tag,
                type,
                null,
                nextProps,
                lastDefaultValue
              );
          }
      for (name in nextProps)
        if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
          switch (name) {
            case "value":
              propKey$201 = type;
              break;
            case "defaultValue":
              defaultValue = type;
              break;
            case "multiple":
              value = type;
            default:
              type !== lastDefaultValue && setProp(
                domElement,
                tag,
                name,
                type,
                nextProps,
                lastDefaultValue
              );
          }
      tag = defaultValue;
      lastProps = value;
      nextProps = propKey;
      null != propKey$201 ? updateOptions(domElement, !!lastProps, propKey$201, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
      return;
    case "textarea":
      propKey = propKey$201 = null;
      for (defaultValue in lastProps)
        if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
          switch (defaultValue) {
            case "value":
              break;
            case "children":
              break;
            default:
              setProp(domElement, tag, defaultValue, null, nextProps, name);
          }
      for (value in nextProps)
        if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
          switch (value) {
            case "value":
              propKey$201 = name;
              break;
            case "defaultValue":
              propKey = name;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (null != name) throw Error(formatProdErrorMessage(91));
              break;
            default:
              name !== type && setProp(domElement, tag, value, name, nextProps, type);
          }
      updateTextarea(domElement, propKey$201, propKey);
      return;
    case "option":
      for (var propKey$217 in lastProps)
        if (propKey$201 = lastProps[propKey$217], lastProps.hasOwnProperty(propKey$217) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$217))
          switch (propKey$217) {
            case "selected":
              domElement.selected = false;
              break;
            default:
              setProp(
                domElement,
                tag,
                propKey$217,
                null,
                nextProps,
                propKey$201
              );
          }
      for (lastDefaultValue in nextProps)
        if (propKey$201 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$201 !== propKey && (null != propKey$201 || null != propKey))
          switch (lastDefaultValue) {
            case "selected":
              domElement.selected = propKey$201 && "function" !== typeof propKey$201 && "symbol" !== typeof propKey$201;
              break;
            default:
              setProp(
                domElement,
                tag,
                lastDefaultValue,
                propKey$201,
                nextProps,
                propKey
              );
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var propKey$222 in lastProps)
        propKey$201 = lastProps[propKey$222], lastProps.hasOwnProperty(propKey$222) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$222) && setProp(domElement, tag, propKey$222, null, nextProps, propKey$201);
      for (checked in nextProps)
        if (propKey$201 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$201 !== propKey && (null != propKey$201 || null != propKey))
          switch (checked) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (null != propKey$201)
                throw Error(formatProdErrorMessage(137, tag));
              break;
            default:
              setProp(
                domElement,
                tag,
                checked,
                propKey$201,
                nextProps,
                propKey
              );
          }
      return;
    default:
      if (isCustomElement(tag)) {
        for (var propKey$227 in lastProps)
          propKey$201 = lastProps[propKey$227], lastProps.hasOwnProperty(propKey$227) && void 0 !== propKey$201 && !nextProps.hasOwnProperty(propKey$227) && setPropOnCustomElement(
            domElement,
            tag,
            propKey$227,
            void 0,
            nextProps,
            propKey$201
          );
        for (defaultChecked in nextProps)
          propKey$201 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$201 === propKey || void 0 === propKey$201 && void 0 === propKey || setPropOnCustomElement(
            domElement,
            tag,
            defaultChecked,
            propKey$201,
            nextProps,
            propKey
          );
        return;
      }
  }
  for (var propKey$232 in lastProps)
    propKey$201 = lastProps[propKey$232], lastProps.hasOwnProperty(propKey$232) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$232) && setProp(domElement, tag, propKey$232, null, nextProps, propKey$201);
  for (lastProp in nextProps)
    propKey$201 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$201 === propKey || null == propKey$201 && null == propKey || setProp(domElement, tag, lastProp, propKey$201, nextProps, propKey);
}
function isLikelyStaticResource(initiatorType) {
  switch (initiatorType) {
    case "css":
    case "script":
    case "font":
    case "img":
    case "image":
    case "input":
    case "link":
      return true;
    default:
      return false;
  }
}
function estimateBandwidth() {
  if ("function" === typeof performance.getEntriesByType) {
    for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
      var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
      if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
        initiatorType = 0;
        duration = entry.responseEnd;
        for (i += 1; i < resourceEntries.length; i++) {
          var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
          if (overlapStartTime > duration) break;
          var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
          overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
        }
        --i;
        bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
        count++;
        if (10 < count) break;
      }
    }
    if (0 < count) return bits / count / 1e6;
  }
  return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
}
var eventsEnabled = null, selectionInformation = null;
function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
}
function getOwnHostContext(namespaceURI) {
  switch (namespaceURI) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function getChildHostContextProd(parentNamespace, type) {
  if (0 === parentNamespace)
    switch (type) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
}
function shouldSetTextContent(type, props) {
  return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
}
var currentPopstateTransitionEvent = null;
function shouldAttemptEagerTransition() {
  var event = window.event;
  if (event && "popstate" === event.type) {
    if (event === currentPopstateTransitionEvent) return false;
    currentPopstateTransitionEvent = event;
    return true;
  }
  currentPopstateTransitionEvent = null;
  return false;
}
var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0, cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0, localPromise = "function" === typeof Promise ? Promise : void 0, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
  return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
} : scheduleTimeout;
function handleErrorInNextTick(error) {
  setTimeout(function() {
    throw error;
  });
}
function isSingletonScope(type) {
  return "head" === type;
}
function clearHydrationBoundary(parentInstance, hydrationInstance) {
  var node = hydrationInstance, depth = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && 8 === nextNode.nodeType)
      if (node = nextNode.data, "/$" === node || "/&" === node) {
        if (0 === depth) {
          parentInstance.removeChild(nextNode);
          retryIfBlockedOn(hydrationInstance);
          return;
        }
        depth--;
      } else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node)
        depth++;
      else if ("html" === node)
        releaseSingletonInstance(parentInstance.ownerDocument.documentElement);
      else if ("head" === node) {
        node = parentInstance.ownerDocument.head;
        releaseSingletonInstance(node);
        for (var node$jscomp$0 = node.firstChild; node$jscomp$0; ) {
          var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
          node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
          node$jscomp$0 = nextNode$jscomp$0;
        }
      } else
        "body" === node && releaseSingletonInstance(parentInstance.ownerDocument.body);
    node = nextNode;
  } while (node);
  retryIfBlockedOn(hydrationInstance);
}
function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
  var node = suspenseInstance;
  suspenseInstance = 0;
  do {
    var nextNode = node.nextSibling;
    1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
    if (nextNode && 8 === nextNode.nodeType)
      if (node = nextNode.data, "/$" === node)
        if (0 === suspenseInstance) break;
        else suspenseInstance--;
      else
        "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
    node = nextNode;
  } while (node);
}
function clearContainerSparingly(container) {
  var nextNode = container.firstChild;
  nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
  for (; nextNode; ) {
    var node = nextNode;
    nextNode = nextNode.nextSibling;
    switch (node.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        clearContainerSparingly(node);
        detachDeletedInstance(node);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if ("stylesheet" === node.rel.toLowerCase()) continue;
    }
    container.removeChild(node);
  }
}
function canHydrateInstance(instance, type, props, inRootOrSingleton) {
  for (; 1 === instance.nodeType; ) {
    var anyProps = props;
    if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
      if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
        break;
    } else if (!inRootOrSingleton)
      if ("input" === type && "hidden" === instance.type) {
        var name = null == anyProps.name ? null : "" + anyProps.name;
        if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
          return instance;
      } else return instance;
    else if (!instance[internalHoistableMarker])
      switch (type) {
        case "meta":
          if (!instance.hasAttribute("itemprop")) break;
          return instance;
        case "link":
          name = instance.getAttribute("rel");
          if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
            break;
          else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
            break;
          return instance;
        case "style":
          if (instance.hasAttribute("data-precedence")) break;
          return instance;
        case "script":
          name = instance.getAttribute("src");
          if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
            break;
          return instance;
        default:
          return instance;
      }
    instance = getNextHydratable(instance.nextSibling);
    if (null === instance) break;
  }
  return null;
}
function canHydrateTextInstance(instance, text, inRootOrSingleton) {
  if ("" === text) return null;
  for (; 3 !== instance.nodeType; ) {
    if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
      return null;
    instance = getNextHydratable(instance.nextSibling);
    if (null === instance) return null;
  }
  return instance;
}
function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
  for (; 8 !== instance.nodeType; ) {
    if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
      return null;
    instance = getNextHydratable(instance.nextSibling);
    if (null === instance) return null;
  }
  return instance;
}
function isSuspenseInstancePending(instance) {
  return "$?" === instance.data || "$~" === instance.data;
}
function isSuspenseInstanceFallback(instance) {
  return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
}
function registerSuspenseInstanceRetry(instance, callback) {
  var ownerDocument = instance.ownerDocument;
  if ("$~" === instance.data) instance._reactRetry = callback;
  else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState)
    callback();
  else {
    var listener = function() {
      callback();
      ownerDocument.removeEventListener("DOMContentLoaded", listener);
    };
    ownerDocument.addEventListener("DOMContentLoaded", listener);
    instance._reactRetry = listener;
  }
}
function getNextHydratable(node) {
  for (; null != node; node = node.nextSibling) {
    var nodeType = node.nodeType;
    if (1 === nodeType || 3 === nodeType) break;
    if (8 === nodeType) {
      nodeType = node.data;
      if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType)
        break;
      if ("/$" === nodeType || "/&" === nodeType) return null;
    }
  }
  return node;
}
var previousHydratableOnEnteringScopedSingleton = null;
function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
  hydrationInstance = hydrationInstance.nextSibling;
  for (var depth = 0; hydrationInstance; ) {
    if (8 === hydrationInstance.nodeType) {
      var data = hydrationInstance.data;
      if ("/$" === data || "/&" === data) {
        if (0 === depth)
          return getNextHydratable(hydrationInstance.nextSibling);
        depth--;
      } else
        "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
    }
    hydrationInstance = hydrationInstance.nextSibling;
  }
  return null;
}
function getParentHydrationBoundary(targetInstance) {
  targetInstance = targetInstance.previousSibling;
  for (var depth = 0; targetInstance; ) {
    if (8 === targetInstance.nodeType) {
      var data = targetInstance.data;
      if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
        if (0 === depth) return targetInstance;
        depth--;
      } else "/$" !== data && "/&" !== data || depth++;
    }
    targetInstance = targetInstance.previousSibling;
  }
  return null;
}
function resolveSingletonInstance(type, props, rootContainerInstance) {
  props = getOwnerDocumentFromRootContainer(rootContainerInstance);
  switch (type) {
    case "html":
      type = props.documentElement;
      if (!type) throw Error(formatProdErrorMessage(452));
      return type;
    case "head":
      type = props.head;
      if (!type) throw Error(formatProdErrorMessage(453));
      return type;
    case "body":
      type = props.body;
      if (!type) throw Error(formatProdErrorMessage(454));
      return type;
    default:
      throw Error(formatProdErrorMessage(451));
  }
}
function releaseSingletonInstance(instance) {
  for (var attributes = instance.attributes; attributes.length; )
    instance.removeAttributeNode(attributes[0]);
  detachDeletedInstance(instance);
}
var preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set();
function getHoistableRoot(container) {
  return "function" === typeof container.getRootNode ? container.getRootNode() : 9 === container.nodeType ? container : container.ownerDocument;
}
var previousDispatcher = ReactDOMSharedInternals.d;
ReactDOMSharedInternals.d = {
  f: flushSyncWork,
  r: requestFormReset,
  D: prefetchDNS,
  C: preconnect,
  L: preload,
  m: preloadModule,
  X: preinitScript,
  S: preinitStyle,
  M: preinitModuleScript
};
function flushSyncWork() {
  var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
  return previousWasRendering || wasRendering;
}
function requestFormReset(form) {
  var formInst = getInstanceFromNode(form);
  null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
}
var globalDocument = "undefined" === typeof document ? null : document;
function preconnectAs(rel, href, crossOrigin) {
  var ownerDocument = globalDocument;
  if (ownerDocument && "string" === typeof href && href) {
    var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
    limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
    "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
    preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
  }
}
function prefetchDNS(href) {
  previousDispatcher.D(href);
  preconnectAs("dns-prefetch", href, null);
}
function preconnect(href, crossOrigin) {
  previousDispatcher.C(href, crossOrigin);
  preconnectAs("preconnect", href, crossOrigin);
}
function preload(href, as, options) {
  previousDispatcher.L(href, as, options);
  var ownerDocument = globalDocument;
  if (ownerDocument && href && as) {
    var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
    "image" === as ? options && options.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
      options.imageSrcSet
    ) + '"]', "string" === typeof options.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
      options.imageSizes
    ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
    var key = preloadSelector;
    switch (as) {
      case "style":
        key = getStyleKey(href);
        break;
      case "script":
        key = getScriptKey(href);
    }
    preloadPropsMap.has(key) || (href = assign(
      {
        rel: "preload",
        href: "image" === as && options && options.imageSrcSet ? void 0 : href,
        as
      },
      options
    ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key)) || (as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as)));
  }
}
function preloadModule(href, options) {
  previousDispatcher.m(href, options);
  var ownerDocument = globalDocument;
  if (ownerDocument && href) {
    var as = options && "string" === typeof options.as ? options.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
    switch (as) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        key = getScriptKey(href);
    }
    if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
      switch (as) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
            return;
      }
      as = ownerDocument.createElement("link");
      setInitialProperties(as, "link", href);
      markNodeAsHoistable(as);
      ownerDocument.head.appendChild(as);
    }
  }
}
function preinitStyle(href, precedence, options) {
  previousDispatcher.S(href, precedence, options);
  var ownerDocument = globalDocument;
  if (ownerDocument && href) {
    var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
    precedence = precedence || "default";
    var resource = styles.get(key);
    if (!resource) {
      var state = { loading: 0, preload: null };
      if (resource = ownerDocument.querySelector(
        getStylesheetSelectorFromKey(key)
      ))
        state.loading = 5;
      else {
        href = assign(
          { rel: "stylesheet", href, "data-precedence": precedence },
          options
        );
        (options = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options);
        var link = resource = ownerDocument.createElement("link");
        markNodeAsHoistable(link);
        setInitialProperties(link, "link", href);
        link._p = new Promise(function(resolve, reject) {
          link.onload = resolve;
          link.onerror = reject;
        });
        link.addEventListener("load", function() {
          state.loading |= 1;
        });
        link.addEventListener("error", function() {
          state.loading |= 2;
        });
        state.loading |= 4;
        insertStylesheet(resource, precedence, ownerDocument);
      }
      resource = {
        type: "stylesheet",
        instance: resource,
        count: 1,
        state
      };
      styles.set(key, resource);
    }
  }
}
function preinitScript(src, options) {
  previousDispatcher.X(src, options);
  var ownerDocument = globalDocument;
  if (ownerDocument && src) {
    var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
    resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
      type: "script",
      instance: resource,
      count: 1,
      state: null
    }, scripts.set(key, resource));
  }
}
function preinitModuleScript(src, options) {
  previousDispatcher.M(src, options);
  var ownerDocument = globalDocument;
  if (ownerDocument && src) {
    var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
    resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
      type: "script",
      instance: resource,
      count: 1,
      state: null
    }, scripts.set(key, resource));
  }
}
function getResource(type, currentProps, pendingProps, currentResource) {
  var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
  if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
  switch (type) {
    case "meta":
    case "title":
      return null;
    case "style":
      return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (currentProps = getStyleKey(pendingProps.href), pendingProps = getResourcesFromRoot(
        JSCompiler_inline_result
      ).hoistableStyles, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
        type = getStyleKey(pendingProps.href);
        var styles$243 = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableStyles, resource$244 = styles$243.get(type);
        resource$244 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$244 = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, styles$243.set(type, resource$244), (styles$243 = JSCompiler_inline_result.querySelector(
          getStylesheetSelectorFromKey(type)
        )) && !styles$243._p && (resource$244.instance = styles$243, resource$244.state.loading = 5), preloadPropsMap.has(type) || (pendingProps = {
          rel: "preload",
          as: "style",
          href: pendingProps.href,
          crossOrigin: pendingProps.crossOrigin,
          integrity: pendingProps.integrity,
          media: pendingProps.media,
          hrefLang: pendingProps.hrefLang,
          referrerPolicy: pendingProps.referrerPolicy
        }, preloadPropsMap.set(type, pendingProps), styles$243 || preloadStylesheet(
          JSCompiler_inline_result,
          type,
          pendingProps,
          resource$244.state
        )));
        if (currentProps && null === currentResource)
          throw Error(formatProdErrorMessage(528, ""));
        return resource$244;
      }
      if (currentProps && null !== currentResource)
        throw Error(formatProdErrorMessage(529, ""));
      return null;
    case "script":
      return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (currentProps = getScriptKey(pendingProps), pendingProps = getResourcesFromRoot(
        JSCompiler_inline_result
      ).hoistableScripts, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(formatProdErrorMessage(444, type));
  }
}
function getStyleKey(href) {
  return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
}
function getStylesheetSelectorFromKey(key) {
  return 'link[rel="stylesheet"][' + key + "]";
}
function stylesheetPropsFromRawProps(rawProps) {
  return assign({}, rawProps, {
    "data-precedence": rawProps.precedence,
    precedence: null
  });
}
function preloadStylesheet(ownerDocument, key, preloadProps, state) {
  ownerDocument.querySelector('link[rel="preload"][as="style"][' + key + "]") ? state.loading = 1 : (key = ownerDocument.createElement("link"), state.preload = key, key.addEventListener("load", function() {
    return state.loading |= 1;
  }), key.addEventListener("error", function() {
    return state.loading |= 2;
  }), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key));
}
function getScriptKey(src) {
  return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
}
function getScriptSelectorFromKey(key) {
  return "script[async]" + key;
}
function acquireResource(hoistableRoot, resource, props) {
  resource.count++;
  if (null === resource.instance)
    switch (resource.type) {
      case "style":
        var instance = hoistableRoot.querySelector(
          'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
        );
        if (instance)
          return resource.instance = instance, markNodeAsHoistable(instance), instance;
        var styleProps = assign({}, props, {
          "data-href": props.href,
          "data-precedence": props.precedence,
          href: null,
          precedence: null
        });
        instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
          "style"
        );
        markNodeAsHoistable(instance);
        setInitialProperties(instance, "style", styleProps);
        insertStylesheet(instance, props.precedence, hoistableRoot);
        return resource.instance = instance;
      case "stylesheet":
        styleProps = getStyleKey(props.href);
        var instance$249 = hoistableRoot.querySelector(
          getStylesheetSelectorFromKey(styleProps)
        );
        if (instance$249)
          return resource.state.loading |= 4, resource.instance = instance$249, markNodeAsHoistable(instance$249), instance$249;
        instance = stylesheetPropsFromRawProps(props);
        (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
        instance$249 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
        markNodeAsHoistable(instance$249);
        var linkInstance = instance$249;
        linkInstance._p = new Promise(function(resolve, reject) {
          linkInstance.onload = resolve;
          linkInstance.onerror = reject;
        });
        setInitialProperties(instance$249, "link", instance);
        resource.state.loading |= 4;
        insertStylesheet(instance$249, props.precedence, hoistableRoot);
        return resource.instance = instance$249;
      case "script":
        instance$249 = getScriptKey(props.src);
        if (styleProps = hoistableRoot.querySelector(
          getScriptSelectorFromKey(instance$249)
        ))
          return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
        instance = props;
        if (styleProps = preloadPropsMap.get(instance$249))
          instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
        hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
        styleProps = hoistableRoot.createElement("script");
        markNodeAsHoistable(styleProps);
        setInitialProperties(styleProps, "link", instance);
        hoistableRoot.head.appendChild(styleProps);
        return resource.instance = styleProps;
      case "void":
        return null;
      default:
        throw Error(formatProdErrorMessage(443, resource.type));
    }
  else
    "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
  return resource.instance;
}
function insertStylesheet(instance, precedence, root2) {
  for (var nodes = root2.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.dataset.precedence === precedence) prior = node;
    else if (prior !== last) break;
  }
  prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
}
function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
  null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
  null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
  null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
}
function adoptPreloadPropsForScript(scriptProps, preloadProps) {
  null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
  null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
  null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
}
var tagCaches = null;
function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
  if (null === tagCaches) {
    var cache = /* @__PURE__ */ new Map();
    var caches = tagCaches = /* @__PURE__ */ new Map();
    caches.set(ownerDocument, cache);
  } else
    caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
  if (cache.has(type)) return cache;
  cache.set(type, null);
  ownerDocument = ownerDocument.getElementsByTagName(type);
  for (caches = 0; caches < ownerDocument.length; caches++) {
    var node = ownerDocument[caches];
    if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
      var nodeKey = node.getAttribute(keyAttribute) || "";
      nodeKey = type + nodeKey;
      var existing = cache.get(nodeKey);
      existing ? existing.push(node) : cache.set(nodeKey, [node]);
    }
  }
  return cache;
}
function mountHoistable(hoistableRoot, type, instance) {
  hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
  hoistableRoot.head.insertBefore(
    instance,
    "title" === type ? hoistableRoot.querySelector("head > title") : null
  );
}
function isHostHoistableType(type, props, hostContext) {
  if (1 === hostContext || null != props.itemProp) return false;
  switch (type) {
    case "meta":
    case "title":
      return true;
    case "style":
      if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
        break;
      return true;
    case "link":
      if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
        break;
      switch (props.rel) {
        case "stylesheet":
          return type = props.disabled, "string" === typeof props.precedence && null == type;
        default:
          return true;
      }
    case "script":
      if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
        return true;
  }
  return false;
}
function preloadResource(resource) {
  return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
}
function suspendResource(state, hoistableRoot, resource, props) {
  if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
    if (null === resource.instance) {
      var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
        getStylesheetSelectorFromKey(key)
      );
      if (instance) {
        hoistableRoot = instance._p;
        null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
        resource.state.loading |= 4;
        resource.instance = instance;
        markNodeAsHoistable(instance);
        return;
      }
      instance = hoistableRoot.ownerDocument || hoistableRoot;
      props = stylesheetPropsFromRawProps(props);
      (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
      instance = instance.createElement("link");
      markNodeAsHoistable(instance);
      var linkInstance = instance;
      linkInstance._p = new Promise(function(resolve, reject) {
        linkInstance.onload = resolve;
        linkInstance.onerror = reject;
      });
      setInitialProperties(instance, "link", props);
      resource.instance = instance;
    }
    null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
    state.stylesheets.set(resource, hoistableRoot);
    (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
  }
}
var estimatedBytesWithinLimit = 0;
function waitForCommitToBeReady(state, timeoutOffset) {
  state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
  return 0 < state.count || 0 < state.imgCount ? function(commit) {
    var stylesheetTimer = setTimeout(function() {
      state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
      if (state.unsuspend) {
        var unsuspend = state.unsuspend;
        state.unsuspend = null;
        unsuspend();
      }
    }, 6e4 + timeoutOffset);
    0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
    var imgTimer = setTimeout(
      function() {
        state.waitingForImages = false;
        if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
          var unsuspend = state.unsuspend;
          state.unsuspend = null;
          unsuspend();
        }
      },
      (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset
    );
    state.unsuspend = commit;
    return function() {
      state.unsuspend = null;
      clearTimeout(stylesheetTimer);
      clearTimeout(imgTimer);
    };
  } : null;
}
function onUnsuspend() {
  this.count--;
  if (0 === this.count && (0 === this.imgCount || !this.waitingForImages)) {
    if (this.stylesheets) insertSuspendedStylesheets(this, this.stylesheets);
    else if (this.unsuspend) {
      var unsuspend = this.unsuspend;
      this.unsuspend = null;
      unsuspend();
    }
  }
}
var precedencesByRoot = null;
function insertSuspendedStylesheets(state, resources) {
  state.stylesheets = null;
  null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
}
function insertStylesheetIntoRoot(root2, resource) {
  if (!(resource.state.loading & 4)) {
    var precedences = precedencesByRoot.get(root2);
    if (precedences) var last = precedences.get(null);
    else {
      precedences = /* @__PURE__ */ new Map();
      precedencesByRoot.set(root2, precedences);
      for (var nodes = root2.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
          precedences.set(node.dataset.precedence, node), last = node;
      }
      last && precedences.set(null, last);
    }
    nodes = resource.instance;
    node = nodes.getAttribute("data-precedence");
    i = precedences.get(node) || last;
    i === last && precedences.set(null, nodes);
    precedences.set(node, nodes);
    this.count++;
    last = onUnsuspend.bind(this);
    nodes.addEventListener("load", last);
    nodes.addEventListener("error", last);
    i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
    resource.state.loading |= 4;
  }
}
var HostTransitionContext = {
  $$typeof: REACT_CONTEXT_TYPE,
  Provider: null,
  Consumer: null,
  _currentValue: sharedNotPendingObject,
  _currentValue2: sharedNotPendingObject,
  _threadCount: 0
};
function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
  this.tag = 1;
  this.containerInfo = containerInfo;
  this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
  this.callbackPriority = 0;
  this.expirationTimes = createLaneMap(-1);
  this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = createLaneMap(0);
  this.hiddenUpdates = createLaneMap(null);
  this.identifierPrefix = identifierPrefix;
  this.onUncaughtError = onUncaughtError;
  this.onCaughtError = onCaughtError;
  this.onRecoverableError = onRecoverableError;
  this.pooledCache = null;
  this.pooledCacheLanes = 0;
  this.formState = formState;
  this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
  containerInfo = new FiberRootNode(
    containerInfo,
    tag,
    hydrate,
    identifierPrefix,
    onUncaughtError,
    onCaughtError,
    onRecoverableError,
    onDefaultTransitionIndicator,
    formState
  );
  tag = 1;
  true === isStrictMode && (tag |= 24);
  isStrictMode = createFiberImplClass(3, null, null, tag);
  containerInfo.current = isStrictMode;
  isStrictMode.stateNode = containerInfo;
  tag = createCache();
  tag.refCount++;
  containerInfo.pooledCache = tag;
  tag.refCount++;
  isStrictMode.memoizedState = {
    element: initialChildren,
    isDehydrated: hydrate,
    cache: tag
  };
  initializeUpdateQueue(isStrictMode);
  return containerInfo;
}
function getContextForSubtree(parentComponent) {
  if (!parentComponent) return emptyContextObject;
  parentComponent = emptyContextObject;
  return parentComponent;
}
function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
  parentComponent = getContextForSubtree(parentComponent);
  null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
  container = createUpdate(lane);
  container.payload = { element };
  callback = void 0 === callback ? null : callback;
  null !== callback && (container.callback = callback);
  element = enqueueUpdate(rootFiber, container, lane);
  null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
}
function markRetryLaneImpl(fiber, retryLane) {
  fiber = fiber.memoizedState;
  if (null !== fiber && null !== fiber.dehydrated) {
    var a = fiber.retryLane;
    fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
  }
}
function markRetryLaneIfNotHydrated(fiber, retryLane) {
  markRetryLaneImpl(fiber, retryLane);
  (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
}
function attemptContinuousHydration(fiber) {
  if (13 === fiber.tag || 31 === fiber.tag) {
    var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
    null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
    markRetryLaneIfNotHydrated(fiber, 67108864);
  }
}
function attemptHydrationAtCurrentPriority(fiber) {
  if (13 === fiber.tag || 31 === fiber.tag) {
    var lane = requestUpdateLane();
    lane = getBumpedLaneForHydrationByLane(lane);
    var root2 = enqueueConcurrentRenderForLane(fiber, lane);
    null !== root2 && scheduleUpdateOnFiber(root2, fiber, lane);
    markRetryLaneIfNotHydrated(fiber, lane);
  }
}
var _enabled = true;
function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
  var prevTransition = ReactSharedInternals.T;
  ReactSharedInternals.T = null;
  var previousPriority = ReactDOMSharedInternals.p;
  try {
    ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
  } finally {
    ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
  }
}
function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
  var prevTransition = ReactSharedInternals.T;
  ReactSharedInternals.T = null;
  var previousPriority = ReactDOMSharedInternals.p;
  try {
    ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
  } finally {
    ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
  }
}
function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  if (_enabled) {
    var blockedOn = findInstanceBlockingEvent(nativeEvent);
    if (null === blockedOn)
      dispatchEventForPluginEventSystem(
        domEventName,
        eventSystemFlags,
        nativeEvent,
        return_targetInst,
        targetContainer
      ), clearIfContinuousEvent(domEventName, nativeEvent);
    else if (queueIfContinuousEvent(
      blockedOn,
      domEventName,
      eventSystemFlags,
      targetContainer,
      nativeEvent
    ))
      nativeEvent.stopPropagation();
    else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
      for (; null !== blockedOn; ) {
        var fiber = getInstanceFromNode(blockedOn);
        if (null !== fiber)
          switch (fiber.tag) {
            case 3:
              fiber = fiber.stateNode;
              if (fiber.current.memoizedState.isDehydrated) {
                var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                if (0 !== lanes) {
                  var root2 = fiber;
                  root2.pendingLanes |= 2;
                  for (root2.entangledLanes |= 2; lanes; ) {
                    var lane = 1 << 31 - clz32(lanes);
                    root2.entanglements[1] |= lane;
                    lanes &= ~lane;
                  }
                  ensureRootIsScheduled(fiber);
                  0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0));
                }
              }
              break;
            case 31:
            case 13:
              root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
          }
        fiber = findInstanceBlockingEvent(nativeEvent);
        null === fiber && dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          return_targetInst,
          targetContainer
        );
        if (fiber === blockedOn) break;
        blockedOn = fiber;
      }
      null !== blockedOn && nativeEvent.stopPropagation();
    } else
      dispatchEventForPluginEventSystem(
        domEventName,
        eventSystemFlags,
        nativeEvent,
        null,
        targetContainer
      );
  }
}
function findInstanceBlockingEvent(nativeEvent) {
  nativeEvent = getEventTarget(nativeEvent);
  return findInstanceBlockingTarget(nativeEvent);
}
var return_targetInst = null;
function findInstanceBlockingTarget(targetNode) {
  return_targetInst = null;
  targetNode = getClosestInstanceFromNode(targetNode);
  if (null !== targetNode) {
    var nearestMounted = getNearestMountedFiber(targetNode);
    if (null === nearestMounted) targetNode = null;
    else {
      var tag = nearestMounted.tag;
      if (13 === tag) {
        targetNode = getSuspenseInstanceFromFiber(nearestMounted);
        if (null !== targetNode) return targetNode;
        targetNode = null;
      } else if (31 === tag) {
        targetNode = getActivityInstanceFromFiber(nearestMounted);
        if (null !== targetNode) return targetNode;
        targetNode = null;
      } else if (3 === tag) {
        if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
          return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
        targetNode = null;
      } else nearestMounted !== targetNode && (targetNode = null);
    }
  }
  return_targetInst = targetNode;
  return null;
}
function getEventPriority(domEventName) {
  switch (domEventName) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (getCurrentPriorityLevel()) {
        case ImmediatePriority:
          return 2;
        case UserBlockingPriority:
          return 8;
        case NormalPriority$1:
        case LowPriority:
          return 32;
        case IdlePriority:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var hasScheduledReplayAttempt = false, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function clearIfContinuousEvent(domEventName, nativeEvent) {
  switch (domEventName) {
    case "focusin":
    case "focusout":
      queuedFocus = null;
      break;
    case "dragenter":
    case "dragleave":
      queuedDrag = null;
      break;
    case "mouseover":
    case "mouseout":
      queuedMouse = null;
      break;
    case "pointerover":
    case "pointerout":
      queuedPointers.delete(nativeEvent.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      queuedPointerCaptures.delete(nativeEvent.pointerId);
  }
}
function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
    return existingQueuedEvent = {
      blockedOn,
      domEventName,
      eventSystemFlags,
      nativeEvent,
      targetContainers: [targetContainer]
    }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
  existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
  blockedOn = existingQueuedEvent.targetContainers;
  null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
  return existingQueuedEvent;
}
function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  switch (domEventName) {
    case "focusin":
      return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
        queuedFocus,
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ), true;
    case "dragenter":
      return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
        queuedDrag,
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ), true;
    case "mouseover":
      return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
        queuedMouse,
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ), true;
    case "pointerover":
      var pointerId = nativeEvent.pointerId;
      queuedPointers.set(
        pointerId,
        accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedPointers.get(pointerId) || null,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )
      );
      return true;
    case "gotpointercapture":
      return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
        pointerId,
        accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedPointerCaptures.get(pointerId) || null,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )
      ), true;
  }
  return false;
}
function attemptExplicitHydrationTarget(queuedTarget) {
  var targetInst = getClosestInstanceFromNode(queuedTarget.target);
  if (null !== targetInst) {
    var nearestMounted = getNearestMountedFiber(targetInst);
    if (null !== nearestMounted) {
      if (targetInst = nearestMounted.tag, 13 === targetInst) {
        if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
          queuedTarget.blockedOn = targetInst;
          runWithPriority(queuedTarget.priority, function() {
            attemptHydrationAtCurrentPriority(nearestMounted);
          });
          return;
        }
      } else if (31 === targetInst) {
        if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
          queuedTarget.blockedOn = targetInst;
          runWithPriority(queuedTarget.priority, function() {
            attemptHydrationAtCurrentPriority(nearestMounted);
          });
          return;
        }
      } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
        queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
        return;
      }
    }
  }
  queuedTarget.blockedOn = null;
}
function attemptReplayContinuousQueuedEvent(queuedEvent) {
  if (null !== queuedEvent.blockedOn) return false;
  for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
    var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
    if (null === nextBlockedOn) {
      nextBlockedOn = queuedEvent.nativeEvent;
      var nativeEventClone = new nextBlockedOn.constructor(
        nextBlockedOn.type,
        nextBlockedOn
      );
      currentReplayingEvent = nativeEventClone;
      nextBlockedOn.target.dispatchEvent(nativeEventClone);
      currentReplayingEvent = null;
    } else
      return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
    targetContainers.shift();
  }
  return true;
}
function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
  attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
}
function replayUnblockedEvents() {
  hasScheduledReplayAttempt = false;
  null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
  null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
  null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
  queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
  queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
}
function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
  queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
    Scheduler.unstable_NormalPriority,
    replayUnblockedEvents
  )));
}
var lastScheduledReplayQueue = null;
function scheduleReplayQueueIfNeeded(formReplayingQueue) {
  lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
    Scheduler.unstable_NormalPriority,
    function() {
      lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
      for (var i = 0; i < formReplayingQueue.length; i += 3) {
        var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
        if ("function" !== typeof submitterOrAction)
          if (null === findInstanceBlockingTarget(submitterOrAction || form))
            continue;
          else break;
        var formInst = getInstanceFromNode(form);
        null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
          formInst,
          {
            pending: true,
            data: formData,
            method: form.method,
            action: submitterOrAction
          },
          submitterOrAction,
          formData
        ));
      }
    }
  ));
}
function retryIfBlockedOn(unblocked) {
  function unblock(queuedEvent) {
    return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
  }
  null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
  null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
  null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
  queuedPointers.forEach(unblock);
  queuedPointerCaptures.forEach(unblock);
  for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
    var queuedTarget = queuedExplicitHydrationTargets[i];
    queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
  }
  for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
    attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
  i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
  if (null != i)
    for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
      var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
      if ("function" === typeof submitterOrAction)
        formProps || scheduleReplayQueueIfNeeded(i);
      else if (formProps) {
        var action = null;
        if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
          if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
            action = formProps.formAction;
          else {
            if (null !== findInstanceBlockingTarget(form)) continue;
          }
        else action = formProps.action;
        "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
        scheduleReplayQueueIfNeeded(i);
      }
    }
}
function defaultOnDefaultTransitionIndicator() {
  function handleNavigate(event) {
    event.canIntercept && "react-transition" === event.info && event.intercept({
      handler: function() {
        return new Promise(function(resolve) {
          return pendingResolve = resolve;
        });
      },
      focusReset: "manual",
      scroll: "manual"
    });
  }
  function handleNavigateComplete() {
    null !== pendingResolve && (pendingResolve(), pendingResolve = null);
    isCancelled || setTimeout(startFakeNavigation, 20);
  }
  function startFakeNavigation() {
    if (!isCancelled && !navigation.transition) {
      var currentEntry = navigation.currentEntry;
      currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
        state: currentEntry.getState(),
        info: "react-transition",
        history: "replace"
      });
    }
  }
  if ("object" === typeof navigation) {
    var isCancelled = false, pendingResolve = null;
    navigation.addEventListener("navigate", handleNavigate);
    navigation.addEventListener("navigatesuccess", handleNavigateComplete);
    navigation.addEventListener("navigateerror", handleNavigateComplete);
    setTimeout(startFakeNavigation, 100);
    return function() {
      isCancelled = true;
      navigation.removeEventListener("navigate", handleNavigate);
      navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
      navigation.removeEventListener("navigateerror", handleNavigateComplete);
      null !== pendingResolve && (pendingResolve(), pendingResolve = null);
    };
  }
}
function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}
ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
  var root2 = this._internalRoot;
  if (null === root2) throw Error(formatProdErrorMessage(409));
  var current = root2.current, lane = requestUpdateLane();
  updateContainerImpl(current, lane, children, root2, null, null);
};
ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
  var root2 = this._internalRoot;
  if (null !== root2) {
    this._internalRoot = null;
    var container = root2.containerInfo;
    updateContainerImpl(root2.current, 2, null, root2, null, null);
    flushSyncWork$1();
    container[internalContainerInstanceKey] = null;
  }
};
function ReactDOMHydrationRoot(internalRoot) {
  this._internalRoot = internalRoot;
}
ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
  if (target) {
    var updatePriority = resolveUpdatePriority();
    target = { blockedOn: null, target, priority: updatePriority };
    for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
    queuedExplicitHydrationTargets.splice(i, 0, target);
    0 === i && attemptExplicitHydrationTarget(target);
  }
};
var isomorphicReactPackageVersion$jscomp$inline_1840 = React.version;
if ("19.2.4" !== isomorphicReactPackageVersion$jscomp$inline_1840)
  throw Error(
    formatProdErrorMessage(
      527,
      isomorphicReactPackageVersion$jscomp$inline_1840,
      "19.2.4"
    )
  );
ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
  var fiber = componentOrElement._reactInternals;
  if (void 0 === fiber) {
    if ("function" === typeof componentOrElement.render)
      throw Error(formatProdErrorMessage(188));
    componentOrElement = Object.keys(componentOrElement).join(",");
    throw Error(formatProdErrorMessage(268, componentOrElement));
  }
  componentOrElement = findCurrentFiberUsingSlowPath(fiber);
  componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
  componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
  return componentOrElement;
};
var internals$jscomp$inline_2347 = {
  bundleType: 0,
  version: "19.2.4",
  rendererPackageName: "react-dom",
  currentDispatcherRef: ReactSharedInternals,
  reconcilerVersion: "19.2.4"
};
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var hook$jscomp$inline_2348 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!hook$jscomp$inline_2348.isDisabled && hook$jscomp$inline_2348.supportsFiber)
    try {
      rendererID = hook$jscomp$inline_2348.inject(
        internals$jscomp$inline_2347
      ), injectedHook = hook$jscomp$inline_2348;
    } catch (err) {
    }
}
reactDomClient_production.createRoot = function(container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
  null !== options && void 0 !== options && (true === options.unstable_strictMode && (isStrictMode = true), void 0 !== options.identifierPrefix && (identifierPrefix = options.identifierPrefix), void 0 !== options.onUncaughtError && (onUncaughtError = options.onUncaughtError), void 0 !== options.onCaughtError && (onCaughtError = options.onCaughtError), void 0 !== options.onRecoverableError && (onRecoverableError = options.onRecoverableError));
  options = createFiberRoot(
    container,
    1,
    false,
    null,
    null,
    isStrictMode,
    identifierPrefix,
    null,
    onUncaughtError,
    onCaughtError,
    onRecoverableError,
    defaultOnDefaultTransitionIndicator
  );
  container[internalContainerInstanceKey] = options.current;
  listenToAllSupportedEvents(container);
  return new ReactDOMRoot(options);
};
reactDomClient_production.hydrateRoot = function(container, initialChildren, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
  null !== options && void 0 !== options && (true === options.unstable_strictMode && (isStrictMode = true), void 0 !== options.identifierPrefix && (identifierPrefix = options.identifierPrefix), void 0 !== options.onUncaughtError && (onUncaughtError = options.onUncaughtError), void 0 !== options.onCaughtError && (onCaughtError = options.onCaughtError), void 0 !== options.onRecoverableError && (onRecoverableError = options.onRecoverableError), void 0 !== options.formState && (formState = options.formState));
  initialChildren = createFiberRoot(
    container,
    1,
    true,
    initialChildren,
    null != options ? options : null,
    isStrictMode,
    identifierPrefix,
    formState,
    onUncaughtError,
    onCaughtError,
    onRecoverableError,
    defaultOnDefaultTransitionIndicator
  );
  initialChildren.context = getContextForSubtree(null);
  options = initialChildren.current;
  isStrictMode = requestUpdateLane();
  isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
  identifierPrefix = createUpdate(isStrictMode);
  identifierPrefix.callback = null;
  enqueueUpdate(options, identifierPrefix, isStrictMode);
  options = isStrictMode;
  initialChildren.current.lanes = options;
  markRootUpdated$1(initialChildren, options);
  ensureRootIsScheduled(initialChildren);
  container[internalContainerInstanceKey] = initialChildren.current;
  listenToAllSupportedEvents(container);
  return new ReactDOMHydrationRoot(initialChildren);
};
reactDomClient_production.version = "19.2.4";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  client.exports = reactDomClient_production;
}
var clientExports = client.exports;
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(clientExports);
/**
 * react-router v7.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var PopStateEventType = "popstate";
function isLocation(obj) {
  return typeof obj === "object" && obj != null && "pathname" in obj && "search" in obj && "hash" in obj && "state" in obj && "key" in obj;
}
function createBrowserHistory(options = {}) {
  function createBrowserLocation(window2, globalHistory) {
    let maskedLocation = globalHistory.state?.masked;
    let { pathname, search, hash } = maskedLocation || window2.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default",
      maskedLocation ? {
        pathname: window2.location.pathname,
        search: window2.location.search,
        hash: window2.location.hash
      } : void 0
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location, index2) {
  return {
    usr: location.state,
    key: location.key,
    idx: index2,
    masked: location.unstable_mask ? {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    } : void 0
  };
}
function createLocation(current, to, state = null, key, unstable_mask) {
  let location = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey(),
    unstable_mask
  };
  return location;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
  let { window: window2 = document.defaultView, v5Compat = false } = options;
  let globalHistory = window2.history;
  let action = "POP";
  let listener = null;
  let index2 = getIndex();
  if (index2 == null) {
    index2 = 0;
    globalHistory.replaceState({ ...globalHistory.state, idx: index2 }, "");
  }
  function getIndex() {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }
  function handlePop() {
    action = "POP";
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index2;
    index2 = nextIndex;
    if (listener) {
      listener({ action, location: history.location, delta });
    }
  }
  function push2(to, state) {
    action = "PUSH";
    let location = isLocation(to) ? to : createLocation(history.location, to, state);
    index2 = getIndex() + 1;
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location.unstable_mask || location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 1 });
    }
  }
  function replace2(to, state) {
    action = "REPLACE";
    let location = isLocation(to) ? to : createLocation(history.location, to, state);
    index2 = getIndex();
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location.unstable_mask || location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 0 });
    }
  }
  function createURL(to) {
    return createBrowserURLImpl(to);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref2(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push: push2,
    replace: replace2,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function createBrowserURLImpl(to, isAbsolute = false) {
  let base = "http://localhost";
  if (typeof window !== "undefined") {
    base = window.location.origin !== "null" ? window.location.origin : window.location.href;
  }
  invariant(base, "No window.location.(origin|href) available to create URL");
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  if (!isAbsolute && href.startsWith("//")) {
    href = base + href;
  }
  return new URL(href, base);
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
  let flattenRoute = (route, index2, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
        return;
      }
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(
        route.children,
        branches,
        routesMeta,
        path,
        hasParentOptionalSegments
      );
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index2) => {
    if (route.path === "" || !route.path?.includes("?")) {
      flattenRoute(route, index2);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index2, true, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index2) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index2] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index2];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (match, paramName, isOptional, index2, str) => {
      params.push({ paramName, isOptional: isOptional != null });
      if (isOptional) {
        let nextChar = str.charAt(index2 + match.length);
        if (nextChar && nextChar !== "/") {
          return "/([^\\/]*)";
        }
        return "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    toPathname = toPathname.replace(/\/\/+/g, "/");
    if (toPathname.startsWith("/")) {
      pathname = resolvePathname(toPathname.substring(1), "/");
    } else {
      pathname = resolvePathname(toPathname, fromPathname);
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
  return matches.map((m) => m.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename) {
  let to = _to;
  if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) {
    return {
      absoluteURL: void 0,
      isExternal: false,
      to
    };
  }
  let absoluteURL = to;
  let isExternal = false;
  if (isBrowser) {
    try {
      let currentUrl = new URL(window.location.href);
      let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
      let path = stripBasename(targetUrl.pathname, basename);
      if (targetUrl.origin === currentUrl.origin && path != null) {
        to = path + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    } catch (e) {
      warning(
        false,
        `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  }
  return {
    absoluteURL,
    isExternal,
    to
  };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
new Set(validRequestMethodsArr);
var DataRouterContext = reactExports.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = reactExports.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = reactExports.createContext(false);
var ViewTransitionContext = reactExports.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = reactExports.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = reactExports.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = reactExports.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = reactExports.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = reactExports.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
  if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
    try {
      let parsed = JSON.parse(digest.slice(28));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") {
        return parsed;
      }
    } catch {
    }
  }
}
function decodeRouteErrorResponseDigest(digest) {
  if (digest.startsWith(
    `${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`
  )) {
    try {
      let parsed = JSON.parse(digest.slice(40));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") {
        return new ErrorResponseImpl(
          parsed.status,
          parsed.statusText,
          parsed.data
        );
      }
    } catch {
    }
  }
}
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return reactExports.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let { basename, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator2.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator2.replace : navigator2.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator2,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = reactExports.createContext(null);
function useOutlet(context) {
  let outlet = reactExports.useContext(RouteContext).outlet;
  return reactExports.useMemo(
    () => outlet && /* @__PURE__ */ reactExports.createElement(OutletContext.Provider, { value: context }, outlet),
    [outlet, context]
  );
}
function useParams() {
  let { matches } = reactExports.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return reactExports.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches: parentMatches } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    invariant(
      parentPathnameBase === "/" || parsedLocationArg.pathname?.startsWith(parentPathnameBase),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
    );
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, { pathname: remainingPathname });
  {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator2.encodeLocation ? navigator2.encodeLocation(
            match.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator2.encodeLocation ? navigator2.encodeLocation(
            match.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterOpts
  );
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(
      LocationContext.Provider,
      {
        value: {
          location: {
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default",
            unstable_mask: void 0,
            ...location
          },
          navigationType: "POP"
          /* Pop */
        }
      },
      renderedMatches
    );
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ reactExports.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "React Router caught the following error during render",
        error
      );
    }
  }
  render() {
    let error = this.state.error;
    if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
      const decoded = decodeRouteErrorResponseDigest(error.digest);
      if (decoded) error = decoded;
    }
    let result = error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ reactExports.createElement(
      RouteErrorContext.Provider,
      {
        value: error,
        children: this.props.component
      }
    )) : this.props.children;
    if (this.context) {
      return /* @__PURE__ */ reactExports.createElement(RSCErrorHandler, { error }, result);
    }
    return result;
  }
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({
  children,
  error
}) {
  let { basename } = reactExports.useContext(NavigationContext);
  if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
    let redirect2 = decodeRedirectErrorDigest(error.digest);
    if (redirect2) {
      let existingRedirect = errorRedirectHandledMap.get(error);
      if (existingRedirect) throw existingRedirect;
      let parsed = parseToInfo(redirect2.location, basename);
      if (isBrowser && !errorRedirectHandledMap.get(error)) {
        if (parsed.isExternal || redirect2.reloadDocument) {
          window.location.href = parsed.absoluteURL || parsed.to;
        } else {
          const redirectPromise = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(parsed.to, {
              replace: redirect2.replace
            })
          );
          errorRedirectHandledMap.set(error, redirectPromise);
          throw redirectPromise;
        }
      }
      return /* @__PURE__ */ reactExports.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${parsed.absoluteURL || parsed.to}`
        }
      );
    }
  }
  return children;
}
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
  let dataRouterState = dataRouterOpts?.state;
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState?.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && errors?.[m.route.id] !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterOpts && dataRouterState) {
    renderFallback = dataRouterState.renderFallback;
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          if (dataRouterOpts.isStatic) {
            renderFallback = true;
          }
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  let onErrorHandler = dataRouterOpts?.onError;
  let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
    onErrorHandler(error, {
      location: dataRouterState.location,
      params: dataRouterState.matches?.[0]?.params ?? {},
      unstable_pattern: getRoutePattern(dataRouterState.matches),
      errorInfo
    });
  } : void 0;
  return renderedMatches.reduceRight(
    (outlet, match, index2) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index2 === 0) {
            warningOnce(
              "route-fallback",
              false,
              "No `HydrateFallback` element provided to render during initial hydration"
            );
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index2) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index2 + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ reactExports.createElement(
          RenderedRoute,
          {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          }
        );
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index2 === 0) ? /* @__PURE__ */ reactExports.createElement(
        RenderErrorBoundary,
        {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: { outlet: null, matches: matches2, isDataRoute: true },
          onError
        }
      ) : getChildren();
    },
    null
  );
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(
    "useRouteId"
    /* UseRouteId */
  );
}
function useRouteError() {
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(
    "useRouteError"
    /* UseRouteError */
  );
  let routeId = useCurrentRouteId(
    "useRouteError"
    /* UseRouteError */
  );
  if (error !== void 0) {
    return error;
  }
  return state.errors?.[routeId];
}
function useNavigateStable() {
  let { router } = useDataRouterContext(
    "useNavigate"
    /* UseNavigateStable */
  );
  let id = useCurrentRouteId(
    "useNavigate"
    /* UseNavigateStable */
  );
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        await router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
reactExports.memo(DataRoutes);
function DataRoutes({
  routes,
  future,
  state,
  isStatic,
  onError
}) {
  return useRoutesImpl(routes, void 0, { state, isStatic, onError });
}
function Navigate({
  to,
  replace: replace2,
  state,
  relative
}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    `<Navigate> may be used only in the context of a <Router> component.`
  );
  let { static: isStatic } = reactExports.useContext(NavigationContext);
  warning(
    !isStatic,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`
  );
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(
    to,
    getResolveToMatches(matches),
    locationPathname,
    relative === "path"
  );
  let jsonPath = JSON.stringify(path);
  reactExports.useEffect(() => {
    navigate(JSON.parse(jsonPath), { replace: replace2, state, relative });
  }, [navigate, jsonPath, relative, replace2, state]);
  return null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(props) {
  invariant(
    false,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`
  );
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP",
  navigator: navigator2,
  static: staticProp = false,
  unstable_useTransitions
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(
    () => ({
      basename,
      navigator: navigator2,
      static: staticProp,
      unstable_useTransitions,
      future: {}
    }),
    [basename, navigator2, staticProp, unstable_useTransitions]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default",
    unstable_mask
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key,
        unstable_mask
      },
      navigationType
    };
  }, [
    basename,
    pathname,
    search,
    hash,
    state,
    key,
    navigationType,
    unstable_mask
  ]);
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, { children, value: locationContext }));
}
function Routes({
  children,
  location
}) {
  return useRoutes(createRoutesFromChildren(children), location);
}
function createRoutesFromChildren(children, parentPath = []) {
  let routes = [];
  reactExports.Children.forEach(children, (element, index2) => {
    if (!reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index2];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(
        routes,
        createRoutesFromChildren(element.props.children, treePath)
      );
      return;
    }
    invariant(
      element.type === Route,
      `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    );
    invariant(
      !element.props.index || !element.props.children,
      "An index route cannot have child routes."
    );
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      middleware: element.props.middleware,
      loader: element.props.loader,
      action: element.props.action,
      hydrateFallbackElement: element.props.hydrateFallbackElement,
      HydrateFallback: element.props.HydrateFallback,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(
        element.props.children,
        treePath
      );
    }
    routes.push(route);
  });
  return routes;
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix2 = name ? `${name}.` : "";
        formData.append(`${prefix2}x`, "0");
        formData.append(`${prefix2}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (trailingSlashAware) {
    if (url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}_.${extension}`;
    } else {
      url.pathname = `${url.pathname}.${extension}`;
    }
  } else {
    if (url.pathname === "/") {
      url.pathname = `_root.${extension}`;
    } else if (basename && stripBasename(url.pathname, basename) === "/") {
      url.pathname = `${basename.replace(/\/$/, "")}/_root.${extension}`;
    } else {
      url.pathname = `${url.pathname.replace(/\/$/, "")}.${extension}`;
    }
  }
  return url;
}
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    void 0) ;
    window.location.reload();
    return new Promise(() => {
    });
  }
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index2) => {
    if (!currentMatches[index2]) return true;
    return match.route.id !== currentMatches[index2].route.id;
  };
  let matchPathChanged = (match, index2) => {
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index2].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      currentMatches[index2].route.path?.endsWith("*") && currentMatches[index2].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index2) => isNew(match, index2) || matchPathChanged(match, index2)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index2) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index2) || matchPathChanged(match, index2)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: currentMatches[0]?.params || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
function useDataRouterContext2() {
  let context = reactExports.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = reactExports.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = reactExports.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = reactExports.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = reactExports.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = reactExports.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = reactExports.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  reactExports.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let { router } = useDataRouterContext2();
  let matches = reactExports.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { future, manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = reactExports.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename,
      future.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    future.unstable_trailingSlashAwareDataRequests,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = reactExports.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ reactExports.createElement(
      "link",
      {
        key,
        nonce: linkProps.nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
      }
    )
  )));
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser2) {
    window.__reactRouterVersion = // @ts-expect-error
    "7.13.1";
  }
} catch (e) {
}
function BrowserRouter({
  basename,
  children,
  unstable_useTransitions,
  window: window2
}) {
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let setState = reactExports.useCallback(
    (newState) => {
      if (unstable_useTransitions === false) {
        setStateImpl(newState);
      } else {
        reactExports.startTransition(() => setStateImpl(newState));
      }
    },
    [unstable_useTransitions]
  );
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ reactExports.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      unstable_useTransitions
    }
  );
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = reactExports.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    unstable_mask,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    unstable_defaultShouldRevalidate,
    ...rest
  }, forwardedRef) {
    let { basename, navigator: navigator2, unstable_useTransitions } = reactExports.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
    let parsed = parseToInfo(to, basename);
    to = parsed.to;
    let href = useHref(to, { relative });
    let location = useLocation();
    let maskedHref = null;
    if (unstable_mask) {
      let resolved = resolveTo(
        unstable_mask,
        [],
        location.unstable_mask ? location.unstable_mask.pathname : "/",
        true
      );
      if (basename !== "/") {
        resolved.pathname = resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname]);
      }
      maskedHref = navigator2.createHref(resolved);
    }
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      unstable_mask,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition,
      unstable_defaultShouldRevalidate,
      unstable_useTransitions
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let isSpaLink = !(parsed.isExternal || reloadDocument);
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ reactExports.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
          onClick: isSpaLink ? handleClick : onClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, link, /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = reactExports.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = reactExports.useContext(DataRouterStateContext);
    let { navigator: navigator2, basename } = reactExports.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style2 = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ reactExports.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style: style2,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = reactExports.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    unstable_defaultShouldRevalidate,
    ...props
  }, forwardedRef) => {
    let { unstable_useTransitions } = reactExports.useContext(NavigationContext);
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = submitter?.getAttribute("formmethod") || method;
      let doSubmit = () => submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition,
        unstable_defaultShouldRevalidate
      });
      if (unstable_useTransitions && navigate !== false) {
        reactExports.startTransition(() => doSubmit());
      } else {
        doSubmit();
      }
    };
    return /* @__PURE__ */ reactExports.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  unstable_mask,
  state,
  preventScrollReset,
  relative,
  viewTransition,
  unstable_defaultShouldRevalidate,
  unstable_useTransitions
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return reactExports.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        let doNavigate = () => navigate(to, {
          replace: replace2,
          unstable_mask,
          state,
          preventScrollReset,
          relative,
          viewTransition,
          unstable_defaultShouldRevalidate
        });
        if (unstable_useTransitions) {
          reactExports.startTransition(() => doNavigate());
        } else {
          doNavigate();
        }
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      unstable_mask,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition,
      unstable_defaultShouldRevalidate,
      unstable_useTransitions
    ]
  );
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3(
    "useSubmit"
    /* UseSubmit */
  );
  let { basename } = reactExports.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  let routerFetch = router.fetch;
  let routerNavigate = router.navigate;
  return reactExports.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await routerFetch(key, currentRouteId, options.action || action, {
          unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await routerNavigate(options.action || action, {
          unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [routerFetch, routerNavigate, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = reactExports.useContext(NavigationContext);
  let routeContext = reactExports.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, { relative } = {}) {
  let vtContext = reactExports.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState"
    /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
const STORAGE_MODEL = "device_model_name";
const STORAGE_FIRMWARE = "device_firmware_version";
const STORAGE_CONFIGURED = "configured";
function Login() {
  const navigate = useNavigate();
  const [pin, setPin] = reactExports.useState(["", "", "", ""]);
  const [showPin, setShowPin] = reactExports.useState(false);
  const [pinError, setPinError] = reactExports.useState(false);
  const pinRefs = reactExports.useRef([]);
  const verifySeq = reactExports.useRef(0);
  const handlePinChange = (value, index2) => {
    setPinError(false);
    const sanitizedValue = value.replace(/\D/g, "").slice(-1);
    const updatedPin = [...pin];
    updatedPin[index2] = sanitizedValue;
    setPin(updatedPin);
    if (sanitizedValue && index2 < pinRefs.current.length - 1) {
      pinRefs.current[index2 + 1]?.focus();
    }
  };
  const handlePinKeyDown = (event, index2) => {
    if (event.key === "Backspace" && !pin[index2] && index2 > 0) {
      pinRefs.current[index2 - 1]?.focus();
    }
  };
  reactExports.useEffect(() => {
    const pinValue = pin.join("");
    if (pinValue.length !== 4) {
      return;
    }
    const seq = ++verifySeq.current;
    (async () => {
      const stored = localStorage.getItem("encrypted_pin");
      if (!stored) {
        if (verifySeq.current === seq) {
          setPin(["", "", "", ""]);
          setPinError(true);
          pinRefs.current[0]?.focus();
        }
        return;
      }
      const tryDecrypt = async () => {
        const encoder = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
          "raw",
          encoder.encode("icms-local-pin-key"),
          "PBKDF2",
          false,
          ["deriveKey"]
        );
        const key = await window.crypto.subtle.deriveKey(
          {
            name: "PBKDF2",
            salt: encoder.encode("icms-pin-salt"),
            iterations: 1e5,
            hash: "SHA-256"
          },
          keyMaterial,
          { name: "AES-GCM", length: 256 },
          false,
          ["decrypt"]
        );
        const parsed = JSON.parse(stored);
        const decrypted = await window.crypto.subtle.decrypt(
          { name: "AES-GCM", iv: new Uint8Array(parsed.iv) },
          key,
          new Uint8Array(parsed.data)
        );
        return new TextDecoder().decode(decrypted);
      };
      try {
        const decrypted = await tryDecrypt();
        if (verifySeq.current !== seq) return;
        if (decrypted === pinValue) {
          navigate(localStorage.getItem(STORAGE_CONFIGURED) === "true" ? "/dashboard" : "/card");
        } else {
          setPin(["", "", "", ""]);
          setPinError(true);
          pinRefs.current[0]?.focus();
        }
      } catch {
        if (verifySeq.current !== seq) return;
        setPin(["", "", "", ""]);
        setPinError(true);
        pinRefs.current[0]?.focus();
      }
    })();
  }, [pin, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "login-title", children: "ICMS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "login-subtitle", children: "Enter your PIN to continue" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pin-grid-with-toggle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pin-grid", children: pin.map((digit, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: (el) => {
            pinRefs.current[index2] = el;
          },
          className: "pin-input",
          type: showPin ? "text" : "password",
          inputMode: "numeric",
          maxLength: 1,
          autoComplete: "one-time-code",
          value: digit,
          onChange: (e) => handlePinChange(e.target.value, index2),
          onKeyDown: (e) => handlePinKeyDown(e, index2)
        },
        index2
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "pin-visibility-toggle",
          onClick: () => setShowPin((prev) => !prev),
          "aria-label": showPin ? "Hide PIN" : "Show PIN",
          children: showPin ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 5.08A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7-1 2.24-2.77 4.12-5 5.26M6.61 6.61C4.2 7.87 2.31 9.79 1 12c1.73 3.89 6 7 11 7 1.73 0 3.37-.37 4.84-1.03",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "none"
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M1 12c1.73-3.89 6-7 11-7s9.27 3.11 11 7c-1.73 3.89-6 7-11 7S2.73 15.89 1 12z",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                fill: "none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "2", fill: "none" })
          ] })
        }
      )
    ] }),
    pinError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "auth-code-status invalid", children: "Incorrect PIN. Try again." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/setup", className: "login-setup-link", children: "Set up or change PIN" })
  ] });
}
const products = [
  {
    product_name: "EICS114",
    versions: [
      {
        version: "1.1x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 0E 70 D3",
            query2: "slave_id 01 00 00 00 18 3D 1D",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 1,
            left_labels_1_custom_rows: 5,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 10,
            cooling_params: {
              "Temp(Cab)": [
                "°C",
                "N/A",
                "0 1",
                "1",
                "float"
              ],
              "Temp(Amb)": [
                "°C",
                "N/A",
                "2 3",
                "1",
                "float"
              ],
              "Δt": [
                "°C",
                "N/A",
                "4 5",
                "1",
                "int16"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "6 7",
                "1",
                "float"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "0",
                "1",
                "bit"
              ],
              Door: [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ],
              HCT: [
                "",
                "N/A",
                "2",
                "1",
                "bit"
              ],
              "Fan1 Fail": [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              "Fan2 Fail": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              "Fan3 Fail": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Fan4 Fail": [
                "",
                "N/A",
                "7",
                "1",
                "bit"
              ],
              "Usys Low": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "10",
                "1",
                "bit"
              ],
              "Δt ": [
                "",
                "N/A",
                "11",
                "1",
                "bit"
              ],
              "Fan On ": [
                "",
                "N/A",
                "13",
                "1",
                "bit"
              ],
              "DIN 1": [
                "",
                "N/A",
                "16",
                "1",
                "bit"
              ],
              "DIN 2": [
                "",
                "N/A",
                "17",
                "1",
                "bit"
              ],
              "DIN 3": [
                "",
                "N/A",
                "18",
                "1",
                "bit"
              ],
              "DIN 4": [
                "",
                "N/A",
                "19",
                "1",
                "bit"
              ],
              "DIN 5": [
                "",
                "N/A",
                "20",
                "1",
                "bit"
              ],
              "DIN 6": [
                "",
                "N/A",
                "21",
                "1",
                "bit"
              ],
              "DIN 7": [
                "",
                "N/A",
                "22",
                "1",
                "bit"
              ],
              "DIN 8": [
                "",
                "N/A",
                "23",
                "1",
                "bit"
              ]
            },
            version_params: {
              "FTU HW Model No": [
                "",
                "N/A",
                "8 9",
                "1",
                "float"
              ],
              "FTU SW Version": [
                "",
                "N/A",
                "10 11",
                "1",
                "float"
              ],
              "ODC VID": [
                "",
                "N/A",
                "12 13",
                "1",
                "float"
              ]
            },
            cooling_params_columns: 1,
            cooling_params_rows: 5,
            power_params_columns: 1,
            power_params_rows: 5,
            alarm_params_columns: 2,
            alarm_params_rows: 10,
            version_params_columns: 2,
            version_params_rows: 10
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 1D 84 DE",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            left_labels_1_columns: 1,
            left_labels_1_custom_rows: 8,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 9,
            slave_id: "0x0C",
            addr_hi: "0x00",
            addr_lo: "0x01",
            cooling_params: {
              "Power On Delay": [
                "sec",
                "N/A",
                "0",
                "1"
              ],
              "High Cabinet Temp (HCT)": [
                "°C",
                "N/A",
                "1",
                "1"
              ],
              "No. Of Fan": [
                "",
                "N/A",
                "2",
                "1"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Fan Minimum Duty": [
                "%",
                "N/A",
                "4",
                "1"
              ],
              "Fan Starting Temperature": [
                "°C",
                "N/A",
                "5",
                "1"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "6",
                "1"
              ],
              "Sensor Fail Duty": [
                "%",
                "N/A",
                "7",
                "1"
              ],
              "Usys Low Level": [
                "V",
                "N/A",
                "8",
                "1"
              ],
              "Low Speed Fix Duty": [
                "%",
                "N/A",
                "18",
                "1"
              ]
            },
            alarm_params: {
              "Smoke Alarm": [
                "",
                "N/A",
                "9",
                "1"
              ],
              "Door Open": [
                "",
                "N/A",
                "10",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "11",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "12",
                "1"
              ],
              "Fan1 Fail": [
                "",
                "N/A",
                "13",
                "1"
              ],
              "Fan2 Fail": [
                "",
                "N/A",
                "14",
                "1"
              ],
              "Fan3 Fail": [
                "",
                "N/A",
                "15",
                "1"
              ],
              "Fan4 Fail": [
                "",
                "N/A",
                "16",
                "1"
              ],
              "Usys Alarm": [
                "",
                "N/A",
                "17",
                "1"
              ],
              "DIN 1 Alarm": [
                "",
                "N/A",
                "19",
                "1"
              ],
              "DIN 2 Alarm": [
                "",
                "N/A",
                "20",
                "1"
              ],
              "DIN 3 Alarm": [
                "",
                "N/A",
                "21",
                "1"
              ],
              "DIN 4 Alarm": [
                "",
                "N/A",
                "22",
                "1"
              ],
              "DIN 5 Alarm": [
                "",
                "N/A",
                "23",
                "1"
              ],
              "DIN 6 Alarm": [
                "",
                "N/A",
                "24",
                "1"
              ],
              "DIN 7 Alarm": [
                "",
                "N/A",
                "25",
                "1"
              ],
              "DIN 8 Alarm": [
                "",
                "N/A",
                "26",
                "1"
              ]
            },
            version_params: {
              "REL2 Trigger": [
                "",
                "N/A",
                "27",
                "1"
              ],
              "ODC Version": [
                "",
                "N/A",
                "28",
                "1"
              ]
            }
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "1.2x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 01 00 0E 4F CC",
            query2: "slave_id 01 00 01 00 18 D3 88",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 1,
            left_labels_1_custom_rows: 5,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 5,
            cooling_params: {
              "Temp(Cab)": [
                "°C",
                "N/A",
                "0 1",
                "1",
                "float"
              ]
            },
            alarm_params: {
              "Usys Low": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ],
              "DIN 1": [
                "",
                "N/A",
                "16",
                "1",
                "bit"
              ],
              "DIN 2": [
                "",
                "N/A",
                "17",
                "1",
                "bit"
              ],
              "DIN 3": [
                "",
                "N/A",
                "18",
                "1",
                "bit"
              ],
              "DIN 4": [
                "",
                "N/A",
                "19",
                "1",
                "bit"
              ],
              "DIN 5": [
                "",
                "N/A",
                "20",
                "1",
                "bit"
              ],
              "DIN 6": [
                "",
                "N/A",
                "21",
                "1",
                "bit"
              ],
              "DIN 7": [
                "",
                "N/A",
                "22",
                "1",
                "bit"
              ],
              "DIN 8": [
                "",
                "N/A",
                "23",
                "1",
                "bit"
              ]
            },
            version_params: {
              "FTU HW Model No": [
                "",
                "N/A",
                "8 9",
                "1",
                "float"
              ],
              "FTU SW Version": [
                "",
                "N/A",
                "10 11",
                "1",
                "float"
              ],
              "ODC VID": [
                "",
                "N/A",
                "12 13",
                "1",
                "float"
              ]
            },
            cooling_params_columns: 1,
            cooling_params_rows: 5,
            power_params_columns: 1,
            power_params_rows: 5,
            alarm_params_columns: 2,
            alarm_params_rows: 5,
            version_params_columns: 2,
            version_params_rows: 5
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 01 00 1D 2B B0",
            query_mapping: {
              alarm_params: "query1",
              version_params: "query1"
            },
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 4,
            slave_id: "0x0C",
            alarm_params: {
              "DIN 1 Alarm": [
                "",
                "N/A",
                "19",
                "1"
              ],
              "DIN 2 Alarm": [
                "",
                "N/A",
                "20",
                "1"
              ],
              "DIN 3 Alarm": [
                "",
                "N/A",
                "21",
                "1"
              ],
              "DIN 4 Alarm": [
                "",
                "N/A",
                "22",
                "1"
              ],
              "DIN 5 Alarm": [
                "",
                "N/A",
                "23",
                "1"
              ],
              "DIN 6 Alarm": [
                "",
                "N/A",
                "24",
                "1"
              ],
              "DIN 7 Alarm": [
                "",
                "N/A",
                "25",
                "1"
              ],
              "DIN 8 Alarm": [
                "",
                "N/A",
                "26",
                "1"
              ]
            },
            version_params: {
              "REL2 Trigger": [
                "",
                "N/A",
                "27",
                "1"
              ],
              "ODC Version": [
                "",
                "N/A",
                "28",
                "1"
              ]
            }
          },
          {
            option_name: "Help"
          }
        ]
      }
    ]
  },
  {
    product_name: "EICS42E",
    versions: [
      {
        version: "1.3x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 0B B1 CD",
            query2: "01 02 00 00 00 0C 78 0F",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 4,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            cooling_params: {
              "Temp(Cab)": [
                "°C",
                "N/A",
                "0",
                "0.01"
              ],
              "Temp(Amb)": [
                "°C",
                "N/A",
                "1",
                "0.01"
              ],
              "Δt": [
                "°C",
                "N/A",
                "2",
                "0.1",
                "int16"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Fan 1 Run Hour": [
                "hr",
                "N/A",
                "5",
                "1"
              ],
              "Fan 2 Run Hour": [
                "hr",
                "N/A",
                "6",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "4",
                "0.1"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "0",
                "1",
                "bit"
              ],
              Door: [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ],
              HCT: [
                "",
                "N/A",
                "2",
                "1",
                "bit"
              ],
              "Usys Low": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "10",
                "1",
                "bit"
              ],
              "Fan On": [
                "",
                "N/A",
                "11",
                "1",
                "bit",
                "fan_status"
              ],
              "Fan 1 Status": [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              "Fan 2 Status": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ]
            },
            version_params: {
              "FTU HW Model No": [
                "",
                "N/A",
                "9",
                "0.1"
              ],
              "FTU SW Version": [
                "",
                "N/A",
                "10",
                "0.001"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 4,
            power_params_columns: 2,
            power_params_rows: 4,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6
          },
          {
            option_name: "Settings",
            query1: "01 03 00 00 00 16 C4 04",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            left_labels_1_columns: 1,
            left_labels_1_custom_rows: 8,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 4,
            slave_id: "0x01",
            cooling_params: {
              "Power On Delay": [
                "sec",
                "N/A",
                "0",
                "1"
              ],
              "Fan Fix Duty Starting Temperature": [
                "°C",
                "N/A",
                "1",
                "1"
              ],
              "Fan Stop Temperature": [
                "°C",
                "N/A",
                "2",
                "1"
              ],
              "Fix Duty": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Variable Duty Starting Temperature": [
                "°C",
                "N/A",
                "4",
                "1"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "5",
                "1"
              ],
              "No. Of Fan": [
                "",
                "N/A",
                "6",
                "1"
              ],
              "High Cabinet Temp (HCT)": [
                "°C",
                "N/A",
                "7",
                "1"
              ],
              "Fan Minimum Duty": [
                "%",
                "N/A",
                "8",
                "1"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "9",
                "1"
              ],
              "Sensor Fail Duty": [
                "%",
                "N/A",
                "10",
                "1"
              ],
              "Usys Low Level": [
                "V",
                "N/A",
                "11",
                "1"
              ]
            },
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "12",
                "1"
              ],
              Door: [
                "",
                "N/A",
                "13",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "14",
                "1"
              ],
              "Usys Low": [
                "",
                "N/A",
                "20",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "15",
                "1"
              ],
              "Fan 1 Fail": [
                "",
                "N/A",
                "16",
                "1"
              ],
              "Fan 2 Fail": [
                "",
                "N/A",
                "17",
                "1"
              ]
            },
            version_params: {
              "Fan Model No.": [
                "",
                "N/A",
                "21",
                "1"
              ]
            }
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "1.4x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 0B B1 CD",
            query2: "slave_id 02 00 00 00 0C 78 0F",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 4,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            cooling_params: {
              "Temp(Cab)": [
                "°C",
                "N/A",
                "0",
                "0.01"
              ],
              "Temp(Amb)": [
                "°C",
                "N/A",
                "1",
                "0.01"
              ],
              "Δt": [
                "°C",
                "N/A",
                "2",
                "0.1",
                "int16"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Fan 1 Run Hour": [
                "hr",
                "N/A",
                "5",
                "1"
              ],
              "Fan 2 Run Hour": [
                "hr",
                "N/A",
                "6",
                "1"
              ],
              "Fan 3 Run Hour": [
                "hr",
                "N/A",
                "7",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "4",
                "0.1"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "0",
                "1",
                "bit"
              ],
              Door: [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ],
              HCT: [
                "",
                "N/A",
                "2",
                "1",
                "bit"
              ],
              "Usys Low": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "10",
                "1",
                "bit"
              ],
              "Fan On": [
                "",
                "N/A",
                "11",
                "1",
                "bit",
                "fan_status"
              ],
              "Fan 1 Status": [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              "Fan 2 Status": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              "Fan 3 Status": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ]
            },
            version_params: {
              "FTU HW Model No": [
                "",
                "N/A",
                "9",
                "0.1"
              ],
              "FTU SW Version": [
                "",
                "N/A",
                "10",
                "0.001"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 4,
            power_params_columns: 2,
            power_params_rows: 4,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 16 C4 04",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            left_labels_1_columns: 1,
            left_labels_1_custom_rows: 8,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 4,
            slave_id: "0x01",
            cooling_params: {
              "Power On Delay": [
                "sec",
                "N/A",
                "0",
                "1"
              ],
              "Fan Fix Duty Starting Temperature": [
                "°C",
                "N/A",
                "1",
                "1"
              ],
              "Fan Stop Temperature": [
                "°C",
                "N/A",
                "2",
                "1"
              ],
              "Fix Duty": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Variable Duty Starting Temperature": [
                "°C",
                "N/A",
                "4",
                "1"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "5",
                "1"
              ],
              "No. Of Fan": [
                "",
                "N/A",
                "6",
                "1"
              ],
              "High Cabinet Temp (HCT)": [
                "°C",
                "N/A",
                "7",
                "1"
              ],
              "Fan Minimum Duty": [
                "%",
                "N/A",
                "8",
                "1"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "9",
                "1"
              ],
              "Sensor Fail Duty": [
                "%",
                "N/A",
                "10",
                "1"
              ],
              "Usys Low Level": [
                "V",
                "N/A",
                "11",
                "1"
              ]
            },
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "12",
                "1"
              ],
              Door: [
                "",
                "N/A",
                "13",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "14",
                "1"
              ],
              "Usys Low": [
                "",
                "N/A",
                "20",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "15",
                "1"
              ],
              "Fan 1 Fail": [
                "",
                "N/A",
                "16",
                "1"
              ],
              "Fan 2 Fail": [
                "",
                "N/A",
                "17",
                "1"
              ],
              "Fan 3 Fail": [
                "",
                "N/A",
                "18",
                "1"
              ]
            },
            version_params: {
              "Fan Model No.": [
                "",
                "N/A",
                "21",
                "1"
              ]
            }
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "1.5x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 0B B1 CD",
            query2: "slave_id 02 00 00 00 0C 78 0F",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 4,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            cooling_params: {
              "Temp(Cab)": [
                "°C",
                "N/A",
                "0",
                "0.01"
              ],
              "Temp(Amb)": [
                "°C",
                "N/A",
                "1",
                "0.01"
              ],
              "Δt": [
                "°C",
                "N/A",
                "2",
                "0.1",
                "int16"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Fan 1 Run Hour": [
                "hr",
                "N/A",
                "5",
                "1"
              ],
              "Fan 2 Run Hour": [
                "hr",
                "N/A",
                "6",
                "1"
              ],
              "Fan 3 Run Hour": [
                "hr",
                "N/A",
                "7",
                "1"
              ],
              "Fan 4 Run Hour": [
                "hr",
                "N/A",
                "8",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "4",
                "0.1"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "0",
                "1",
                "bit"
              ],
              Door: [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ],
              HCT: [
                "",
                "N/A",
                "2",
                "1",
                "bit"
              ],
              "Usys Low": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "10",
                "1",
                "bit"
              ],
              "Fan On": [
                "",
                "N/A",
                "11",
                "1",
                "bit",
                "fan_status"
              ],
              "Fan 1 Status": [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              "Fan 2 Status": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              "Fan 3 Status": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Fan 4 Status": [
                "",
                "N/A",
                "7",
                "1",
                "bit"
              ]
            },
            version_params: {
              "FTU HW Model No": [
                "",
                "N/A",
                "9",
                "0.1"
              ],
              "FTU SW Version": [
                "",
                "N/A",
                "10",
                "0.001"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 4,
            power_params_columns: 2,
            power_params_rows: 4,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 16 C4 04",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            left_labels_1_columns: 1,
            left_labels_1_custom_rows: 8,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 4,
            slave_id: "0x01",
            cooling_params: {
              "Power On Delay": [
                "sec",
                "N/A",
                "0",
                "1"
              ],
              "Fan Fix Duty Starting Temperature": [
                "°C",
                "N/A",
                "1",
                "1"
              ],
              "Fan Stop Temperature": [
                "°C",
                "N/A",
                "2",
                "1"
              ],
              "Fix Duty": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Variable Duty Starting Temperature": [
                "°C",
                "N/A",
                "4",
                "1"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "5",
                "1"
              ],
              "No. Of Fan": [
                "",
                "N/A",
                "6",
                "1"
              ],
              "High Cabinet Temp (HCT)": [
                "°C",
                "N/A",
                "7",
                "1"
              ],
              "Fan Minimum Duty": [
                "%",
                "N/A",
                "8",
                "1"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "9",
                "1"
              ],
              "Sensor Fail Duty": [
                "%",
                "N/A",
                "10",
                "1"
              ],
              "Usys Low Level": [
                "V",
                "N/A",
                "11",
                "1"
              ]
            },
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "12",
                "1"
              ],
              Door: [
                "",
                "N/A",
                "13",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "14",
                "1"
              ],
              "Usys Low": [
                "",
                "N/A",
                "20",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "15",
                "1"
              ],
              "Fan 1 Fail": [
                "",
                "N/A",
                "16",
                "1"
              ],
              "Fan 2 Fail": [
                "",
                "N/A",
                "17",
                "1"
              ],
              "Fan 3 Fail": [
                "",
                "N/A",
                "18",
                "1"
              ],
              "Fan 4 Fail": [
                "",
                "N/A",
                "19",
                "1"
              ]
            },
            version_params: {
              "Fan Model No.": [
                "",
                "N/A",
                "21",
                "1"
              ]
            }
          },
          {
            option_name: "Help"
          }
        ]
      }
    ]
  },
  {
    product_name: "EICS124M",
    versions: [
      {
        version: "1.6x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 10 F1 C6",
            query2: "slave_id 02 00 00 00 0C 78 0F",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 4,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            cooling_params: {
              "Temp(Cab)": [
                "°C",
                "N/A",
                "0",
                "0.01"
              ],
              "Temp(Amb)": [
                "°C",
                "N/A",
                "1",
                "0.01"
              ],
              "Δt": [
                "°C",
                "N/A",
                "2",
                "0.1",
                "int16"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Fan 1 Run Hour": [
                "hr",
                "N/A",
                "7",
                "1"
              ],
              "Fan 2 Run Hour": [
                "hr",
                "N/A",
                "8",
                "1"
              ],
              "Fan 3 Run Hour": [
                "hr",
                "N/A",
                "9",
                "1"
              ],
              "Fan 4 Run Hour": [
                "hr",
                "N/A",
                "10",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "4",
                "0.1"
              ],
              "System Power": [
                "W",
                "N/A",
                "5",
                "0.1"
              ],
              "System Energy": [
                "kWh",
                "N/A",
                "6",
                "0.1"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "0",
                "1",
                "bit"
              ],
              Door: [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ],
              HCT: [
                "",
                "N/A",
                "2",
                "1",
                "bit"
              ],
              "Usys Low": [
                "",
                "N/A",
                "10",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "11",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "12",
                "1",
                "bit"
              ],
              "Fan On": [
                "",
                "N/A",
                "13",
                "1",
                "bit",
                "fan_status"
              ],
              "Fan 1 Status": [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              "Fan 2 Status": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              "Fan 3 Status": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Fan 4 Status": [
                "",
                "N/A",
                "7",
                "1",
                "bit"
              ]
            },
            version_params: {
              "FTU HW Model No": [
                "",
                "N/A",
                "13",
                "1"
              ],
              "FTU SW Version": [
                "",
                "N/A",
                "14",
                "0.001"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 4,
            power_params_columns: 2,
            power_params_rows: 4,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 16 C4 04",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            cooling_params_columns: 1,
            cooling_params_rows: 8,
            alarm_params_columns: 2,
            alarm_params_rows: 5,
            version_params_columns: 2,
            version_params_rows: 5,
            slave_id: "0x01",
            cooling_params: {
              "Power On Delay": [
                "sec",
                "N/A",
                "0",
                "1"
              ],
              "High Cabinet Temp (HCT)": [
                "°C",
                "N/A",
                "1",
                "1"
              ],
              "No. Of Fan": [
                "",
                "N/A",
                "2",
                "1"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Fan Minimum Duty": [
                "%",
                "N/A",
                "4",
                "1"
              ],
              "Fan Starting Temperature": [
                "°C",
                "N/A",
                "5",
                "1"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "6",
                "1"
              ],
              "Sensor Fail Duty": [
                "%",
                "N/A",
                "7",
                "1"
              ],
              "Usys Low Level": [
                "V",
                "N/A",
                "8",
                "1"
              ]
            },
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "9",
                "1"
              ],
              Door: [
                "",
                "N/A",
                "10",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "11",
                "1"
              ],
              "Usys Low": [
                "",
                "N/A",
                "19",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "12",
                "1"
              ],
              "Fan 1 Fail": [
                "",
                "N/A",
                "13",
                "1"
              ],
              "Fan 2 Fail": [
                "",
                "N/A",
                "14",
                "1"
              ],
              "Fan 3 Fail": [
                "",
                "N/A",
                "15",
                "1"
              ],
              "Fan 4 Fail": [
                "",
                "N/A",
                "16",
                "1"
              ]
            },
            version_params: {
              "Fan Model No.": [
                "",
                "N/A",
                "20",
                "1"
              ],
              "FTU SW Version": [
                "",
                "N/A",
                "21",
                "0.1"
              ]
            }
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "1.7x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 18 crc16MOdbus",
            query2: "slave_id 02 00 00 00 18 crc16MOdbus",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            cooling_params_columns: 2,
            cooling_params_rows: 4,
            power_params_columns: 2,
            power_params_rows: 6,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6,
            cooling_params: {
              "Temp(Cab)": [
                "°C",
                "N/A",
                "0",
                "0.01"
              ],
              "Temp(Amb)": [
                "°C",
                "N/A",
                "1",
                "0.01"
              ],
              "Δt": [
                "°C",
                "N/A",
                "2",
                "0.1",
                "int16"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "3",
                "1"
              ],
              "Fan 1 Run Hour": [
                "hr",
                "N/A",
                "7",
                "1"
              ],
              "Fan 2 Run Hour": [
                "hr",
                "N/A",
                "8",
                "1"
              ],
              "Fan 3 Run Hour": [
                "hr",
                "N/A",
                "9",
                "1"
              ],
              "Fan 4 Run Hour": [
                "hr",
                "N/A",
                "10",
                "1"
              ],
              "Fan 5 Run Hour": [
                "hr",
                "N/A",
                "11",
                "1"
              ],
              "Fan 6 Run Hour": [
                "hr",
                "N/A",
                "12",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "4",
                "0.1"
              ],
              "System Power": [
                "W",
                "N/A",
                "5",
                "0.1"
              ],
              "System Energy": [
                "kWh",
                "N/A",
                "6",
                "0.1"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "0",
                "1",
                "bit"
              ],
              Door: [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ],
              HCT: [
                "",
                "N/A",
                "2",
                "1",
                "bit"
              ],
              Usys: [
                "",
                "N/A",
                "14 10",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "11",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "12",
                "1",
                "bit"
              ],
              "Fan On": [
                "",
                "N/A",
                "13",
                "1",
                "bit",
                "fan_status"
              ],
              "Fan 1 Status": [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              "Fan 2 Status": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              "Fan 3 Status": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Fan 4 Status": [
                "",
                "N/A",
                "7",
                "1",
                "bit"
              ],
              "Fan 5 Status": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "Fan 6 Status": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ]
            },
            version_params: {
              "FTU HW Model No": [
                "",
                "N/A",
                "13",
                "1"
              ],
              "FTU SW Version": [
                "",
                "N/A",
                "14",
                "0.001"
              ],
              number_of_fans: [
                "",
                "N/A",
                "16",
                "1",
                "hide"
              ]
            }
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 18 crc16MOdbus",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            cooling_params_columns: 1,
            cooling_params_rows: 8,
            alarm_params_columns: 2,
            alarm_params_rows: 5,
            version_params_columns: 2,
            version_params_rows: 5,
            slave_id: "0x01",
            cooling_params: {
              "Power On Delay": [
                "sec",
                "N/A",
                "0",
                "1",
                "05-60"
              ],
              "High Cabinet Temp (HCT)": [
                "°C",
                "N/A",
                "1",
                "1",
                "45-60"
              ],
              "No. Of Fan": [
                "",
                "N/A",
                "2",
                "1",
                "1-6"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "3",
                "1",
                "80-99"
              ],
              "Fan Minimum Duty": [
                "%",
                "N/A",
                "4",
                "1",
                "20-40"
              ],
              "Fan Starting Temperature": [
                "°C",
                "N/A",
                "5",
                "1",
                "25-32"
              ],
              "Usys High Level": [
                "V",
                "N/A",
                "6",
                "1",
                "60-75"
              ],
              "Sensor Fail Duty": [
                "%",
                "N/A",
                "7",
                "1",
                "50-99"
              ],
              "Usys Low Level": [
                "V",
                "N/A",
                "8",
                "1",
                "35-45"
              ],
              "Calibration T_cab": [
                "",
                "N/A",
                "20",
                "1",
                "40-60"
              ],
              "Calibration T_amb": [
                "",
                "N/A",
                "21",
                "1",
                "40-60"
              ]
            },
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "9",
                "1"
              ],
              Door: [
                "",
                "N/A",
                "10",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "11",
                "1"
              ],
              "Usys Low": [
                "",
                "N/A",
                "19",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "12",
                "1"
              ],
              "Fan 1 Fail": [
                "",
                "N/A",
                "13",
                "1"
              ],
              "Fan 2 Fail": [
                "",
                "N/A",
                "14",
                "1"
              ],
              "Fan 3 Fail": [
                "",
                "N/A",
                "15",
                "1"
              ],
              "Fan 4 Fail": [
                "",
                "N/A",
                "16",
                "1"
              ],
              "Fan 5 Fail": [
                "",
                "N/A",
                "17",
                "1"
              ],
              "Fan 6 Fail": [
                "",
                "N/A",
                "18",
                "1"
              ]
            },
            version_params: {
              "Fan Model": [
                "",
                "N/A",
                "22",
                "1"
              ],
              "Slave ID": [
                "",
                "N/A",
                "23",
                "1",
                "1-255"
              ]
            }
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "2.6x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 37 B1 DC",
            query2: "slave_id 02 00 00 00 18 78 00",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 6,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 8,
            cooling_params: {
              "T1(Cab)": [
                "°C",
                "N/A",
                "34",
                "0.1"
              ],
              "T2(Amb)": [
                "°C",
                "N/A",
                "36",
                "0.1"
              ],
              "Δt": [
                "°C",
                "N/A",
                "37",
                "0.1",
                "int16"
              ],
              "Duty(Internal Fan)": [
                "%",
                "N/A",
                "45",
                "1"
              ],
              "Duty(External Fan)": [
                "%",
                "N/A",
                "46",
                "1"
              ],
              "Run Hours of Only Hex": [
                "",
                "N/A",
                "39 38",
                "1",
                "concat2                                                                                                                                                                                                                                                                                                                                                                                                  "
              ],
              "RPM(Internal Fan 1)": [
                "RPM",
                "N/A",
                "27",
                "1"
              ],
              "RPM(Internal Fan 2)": [
                "RPM",
                "N/A",
                "28",
                "1"
              ],
              "RPM(Internal Fan 3": [
                "RPM",
                "N/A",
                "29",
                "1"
              ],
              "RPM(External Fan 1)": [
                "RPM",
                "N/A",
                "30",
                "1"
              ],
              "RPM(External Fan 2)": [
                "RPM",
                "N/A",
                "31",
                "1"
              ],
              "RPM(External Fan 3": [
                "RPM",
                "N/A",
                "32",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "35",
                "0.1"
              ],
              "System Current": [
                "A",
                "N/A",
                "42",
                "0.1"
              ],
              "System Power": [
                "W",
                "N/A",
                "43",
                "0.1"
              ],
              "System Energy": [
                "kWh",
                "N/A",
                "44",
                "0.01"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Door: [
                "",
                "N/A",
                "12",
                "1",
                "bit"
              ],
              Smoke: [
                "",
                "N/A",
                "13",
                "1",
                "bit"
              ],
              "Delta T": [
                "",
                "N/A",
                "21",
                "1",
                "bit"
              ],
              "Machine Status": [
                "",
                "N/A",
                "20",
                "1",
                "bit"
              ],
              "Cabinet Temperature": [
                "",
                "N/A",
                "8 9",
                "1",
                "bit"
              ],
              Usys: [
                "",
                "N/A",
                "10 11",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "7",
                "1",
                "bit"
              ],
              "Internal Fan 1": [
                "",
                "N/A",
                "0",
                "14",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "Internal Fan 2": [
                "",
                "N/A",
                "1",
                "15",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "Internal Fan 3": [
                "",
                "N/A",
                "2",
                "16",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 1": [
                "",
                "N/A",
                "3",
                "17",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 2": [
                "",
                "N/A",
                "4",
                "18",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 3": [
                "",
                "N/A",
                "5",
                "19",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ]
            },
            version_params: {
              "Product Type": [
                "",
                "N/A",
                "0",
                "1"
              ],
              "Product Serial No": [
                "",
                "N/A",
                "4 15",
                "1",
                "ascii"
              ],
              "Protocol Version": [
                "",
                "N/A",
                "3",
                "0.1"
              ],
              "Site ID": [
                "",
                "N/A",
                "16 25",
                "1",
                "ascii"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "1",
                "1"
              ],
              "HEX Software Version": [
                "",
                "N/A",
                "2",
                "0.1"
              ],
              "Date of Installation": [
                "",
                "N/A",
                "26",
                "1",
                "mmdd"
              ],
              "Installation Date": [
                "",
                "N/A",
                "47 48 49",
                "1"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 6,
            power_params_columns: 2,
            power_params_rows: 6,
            alarm_params_columns: 2,
            alarm_params_rows: 8,
            version_params_columns: 2,
            version_params_rows: 8
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 47 05 F8",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            left_labels_1_columns: 1,
            left_labels_1_custom_rows: 8,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            slave_id: "0x01",
            cooling_params: {
              Password: [
                "",
                "N/A",
                "18",
                "1",
                "100-255"
              ],
              "Power On Delay": [
                "sec",
                "N/A",
                "19",
                "1",
                "5-60"
              ],
              "High Temperature Alarm Point": [
                "°C",
                "N/A",
                "10",
                "0.1",
                "45-60"
              ],
              "Low Temperature Alarm Point": [
                "°C",
                "N/A",
                "11",
                "0.1",
                "-20 to 30",
                "int16"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "4",
                "1",
                "60-99"
              ],
              "Internal Fan Idle Speed": [
                "%",
                "N/A",
                "5",
                "1",
                "20 - 40"
              ],
              "Heat Exchanger Starting Temperature": [
                "°C",
                "N/A",
                "8",
                "0.1",
                "25-35"
              ],
              "Heat Exchanger Stopping Return Difference temperature": [
                "°C",
                "N/A",
                "9",
                "0.1",
                "20-35"
              ],
              "High DC Voltage Alarm Point": [
                "V",
                "N/A",
                "16",
                "0.1",
                "55-75"
              ],
              "Low DC Voltage Alarm Point": [
                "V",
                "N/A",
                "17",
                "0.1",
                "35-45"
              ],
              "Constant Duty for Fix": [
                "%",
                "N/A",
                "22",
                "1",
                "20-40"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "23",
                "1",
                "02 - 15"
              ],
              "Duty When Any (T1/T2) Fail": [
                "%",
                "N/A",
                "25",
                "1",
                "60 - 99"
              ],
              "Calibration T1": [
                "",
                "N/A",
                "40",
                "1",
                "40-60"
              ],
              "Calibration T2": [
                "",
                "N/A",
                "41",
                "1",
                "40-60"
              ]
            },
            alarm_params: {
              "Smoke Alarm": [
                "",
                "N/A",
                "26",
                "1"
              ],
              "Door Open": [
                "",
                "N/A",
                "27",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "28",
                "1"
              ],
              "Low Temp Alarm": [
                "",
                "N/A",
                "29",
                "1"
              ],
              "Usys High Alarm": [
                "",
                "N/A",
                "37",
                "1"
              ],
              "Usys Low Alarm": [
                "",
                "N/A",
                "38",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "30",
                "1"
              ],
              "Fan1 Fail": [
                "",
                "N/A",
                "31",
                "1"
              ],
              "Fan2 Fail": [
                "",
                "N/A",
                "32",
                "1"
              ],
              "Fan3 Fail": [
                "",
                "N/A",
                "33",
                "1"
              ],
              "Fan4 Fail": [
                "",
                "N/A",
                "34",
                "1"
              ],
              "Fan5 Fail": [
                "",
                "N/A",
                "35",
                "1"
              ],
              "Fan6 Fail": [
                "",
                "N/A",
                "36",
                "1"
              ]
            },
            version_params: {
              "Slave ID": [
                "",
                "N/A",
                "42",
                "1",
                "1-99"
              ],
              "Site ID": [
                "",
                "N/A",
                "43 52",
                "1",
                "ascii",
                "16bit"
              ],
              "Product Type": [
                "",
                "N/A",
                "70",
                "1",
                "10-90"
              ],
              "Product Serial No": [
                "",
                "N/A",
                "58 69",
                "1",
                "ascii",
                "16bit"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "53",
                "1"
              ],
              "Installation Date": [
                "",
                "N/A",
                "54",
                "1",
                "1-31"
              ],
              "Installation Month": [
                "",
                "N/A",
                "55",
                "1",
                "1-12"
              ],
              "Installation Year": [
                "",
                "N/A",
                "56",
                "1",
                "2025-3000"
              ]
            }
          },
          {
            option_name: "Logs",
            query1: "slave_id 85 00 01 00 10 AB CD"
          },
          {
            option_name: "Help"
          }
        ]
      }
    ]
  },
  {
    product_name: "EICS141",
    versions: [
      {
        version: "1.8x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 35 30 1D",
            query2: "slave_id 02 00 00 00 18 78 00",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 6,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            cooling_params: {
              "T1(Cab)": [
                "°C",
                "N/A",
                "32",
                "0.1"
              ],
              "T2(Amb)": [
                "°C",
                "N/A",
                "34",
                "0.1"
              ],
              "Δt": [
                "°C",
                "N/A",
                "35",
                "0.1",
                "int16"
              ],
              "Duty(Internal Fan)": [
                "%",
                "N/A",
                "43",
                "1"
              ],
              "Duty(External Fan)": [
                "%",
                "N/A",
                "44",
                "1"
              ],
              "Run Hours of Only Hex": [
                "",
                "N/A",
                "37 36",
                "1",
                "concat2                                                                                                                                                                                                                                                                                                                                                                                                  "
              ],
              "RPM(Internal Fan 1)": [
                "RPM",
                "N/A",
                "27",
                "1"
              ],
              "RPM(Internal Fan 2)": [
                "RPM",
                "N/A",
                "28",
                "1"
              ],
              "RPM(External Fan 1)": [
                "RPM",
                "N/A",
                "29",
                "1"
              ],
              "RPM(External Fan 2)": [
                "RPM",
                "N/A",
                "30",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "33",
                "0.1"
              ],
              "System Current": [
                "A",
                "N/A",
                "40",
                "0.1"
              ],
              "System Power": [
                "W",
                "N/A",
                "41",
                "0.1"
              ],
              "System Energy": [
                "kWh",
                "N/A",
                "42",
                "0.01"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Door: [
                "",
                "N/A",
                "11",
                "1",
                "bit"
              ],
              Smoke: [
                "",
                "N/A",
                "12",
                "1",
                "bit"
              ],
              "Machine Status": [
                "",
                "N/A",
                "18",
                "1",
                "bit"
              ],
              "Cabinet Temperature": [
                "",
                "N/A",
                "7 8",
                "1",
                "bit"
              ],
              Usys: [
                "",
                "N/A",
                "9 10",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Internal Fan 1": [
                "",
                "N/A",
                "0",
                "14",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "Internal Fan 2": [
                "",
                "N/A",
                "1",
                "15",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 1": [
                "",
                "N/A",
                "2",
                "16",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 2": [
                "",
                "N/A",
                "3",
                "17",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ]
            },
            version_params: {
              "Product Type": [
                "",
                "N/A",
                "0",
                "1"
              ],
              "Product Serial No": [
                "",
                "N/A",
                "4 15",
                "1",
                "ascii"
              ],
              "Protocol Version": [
                "",
                "N/A",
                "3",
                "0.1"
              ],
              "Site ID": [
                "",
                "N/A",
                "16 25",
                "1",
                "ascii"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "1",
                "1"
              ],
              "HEX Software Version": [
                "",
                "N/A",
                "2",
                "0.1"
              ],
              "Date of Installation": [
                "",
                "N/A",
                "26",
                "1",
                "mmdd"
              ],
              "Installation Date": [
                "",
                "N/A",
                "45 46 47",
                "1"
              ],
              "Controller's Date": [
                "",
                "N/A",
                "48 49 50",
                "1"
              ],
              Time: [
                "",
                "N/A",
                "51 52",
                "1"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 6,
            power_params_columns: 2,
            power_params_rows: 6,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 45 84 39",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            cooling_params_columns: 1,
            cooling_params_rows: 8,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6,
            slave_id: "0x01",
            cooling_params: {
              Password: [
                "",
                "N/A",
                "18",
                "1",
                "100-255"
              ],
              "Power On Delay": [
                "sec",
                "N/A",
                "19",
                "1",
                "5-60"
              ],
              "High Temperature Alarm Point": [
                "°C",
                "N/A",
                "10",
                "0.1",
                "45-60"
              ],
              "Low Temperature Alarm Point": [
                "°C",
                "N/A",
                "11",
                "0.1",
                "-20 to 30",
                "int16"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "4",
                "1",
                "60-99"
              ],
              "Internal Fan Idle Speed": [
                "%",
                "N/A",
                "5",
                "1",
                "20 - 40"
              ],
              "Heat Exchanger Starting Temperature": [
                "°C",
                "N/A",
                "8",
                "0.1",
                "25-35"
              ],
              "Heat Exchanger Stopping Return Difference temperature": [
                "°C",
                "N/A",
                "9",
                "0.1",
                "20-35"
              ],
              "High DC Voltage Alarm Point": [
                "V",
                "N/A",
                "16",
                "0.1",
                "55-75"
              ],
              "Low DC Voltage Alarm Point": [
                "V",
                "N/A",
                "17",
                "0.1",
                "35-45"
              ],
              "Constant Duty for Fix": [
                "%",
                "N/A",
                "22",
                "1",
                "20-40"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "23",
                "1",
                "02 - 15"
              ],
              "Duty When Any (T1/T2) Fail": [
                "%",
                "N/A",
                "25",
                "1",
                "60-99"
              ],
              "Calibration T1": [
                "",
                "N/A",
                "38",
                "1",
                "40-60"
              ],
              "Calibration T2": [
                "",
                "N/A",
                "39",
                "1",
                "40-60"
              ]
            },
            alarm_params: {
              "Smoke Alarm": [
                "",
                "N/A",
                "26",
                "1"
              ],
              "Door Open": [
                "",
                "N/A",
                "27",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "28",
                "1"
              ],
              "Low Temp Alarm": [
                "",
                "N/A",
                "29",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "30",
                "1"
              ],
              "Fan1 Fail": [
                "",
                "N/A",
                "31",
                "1"
              ],
              "Fan2 Fail": [
                "",
                "N/A",
                "32",
                "1"
              ],
              "Fan3 Fail": [
                "",
                "N/A",
                "33",
                "1"
              ],
              "Fan4 Fail": [
                "",
                "N/A",
                "34",
                "1"
              ],
              "Usys High Alarm": [
                "",
                "N/A",
                "35",
                "1"
              ],
              "Usys Low Alarm": [
                "",
                "N/A",
                "36",
                "1"
              ],
              Buzzer: [
                "",
                "N/A",
                "37",
                "1"
              ]
            },
            version_params: {
              "Slave ID": [
                "",
                "N/A",
                "40",
                "1",
                "1-99"
              ],
              "Site ID": [
                "",
                "N/A",
                "41 50",
                "1",
                "ascii",
                "8bit"
              ],
              "Product Type": [
                "",
                "N/A",
                "68",
                "1",
                "10-90"
              ],
              "Product Serial No": [
                "",
                "N/A",
                "56 67",
                "1",
                "ascii",
                "8bit"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "51",
                "1"
              ],
              "Installation Date": [
                "",
                "N/A",
                "52",
                "1",
                "1-31"
              ],
              "Installation Month": [
                "",
                "N/A",
                "53",
                "1",
                "1-12"
              ],
              "Installation Year": [
                "",
                "N/A",
                "54",
                "1",
                "2025-3000"
              ]
            }
          },
          {
            option_name: "Logs",
            query1: "slave_id 85 00 01 00 10 AB CD"
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "1.9x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 35 30 1D",
            query2: "slave_id 02 00 00 00 18 78 00",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            cooling_params_columns: 2,
            cooling_params_rows: 6,
            power_params_columns: 2,
            power_params_rows: 6,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6,
            cooling_params: {
              "T1(Cab)": [
                "°C",
                "N/A",
                "32",
                "0.1"
              ],
              "T2(Amb)": [
                "°C",
                "N/A",
                "34",
                "0.1"
              ],
              "Δt": [
                "°C",
                "N/A",
                "35",
                "0.1",
                "int16"
              ],
              "Duty(Internal Fan)": [
                "%",
                "N/A",
                "43",
                "1"
              ],
              "Duty(External Fan)": [
                "%",
                "N/A",
                "44",
                "1"
              ],
              "Run Hours of Only Hex": [
                "",
                "N/A",
                "36",
                "0.1"
              ],
              "RPM(Internal Fan 1)": [
                "RPM",
                "N/A",
                "27",
                "0.1"
              ],
              "RPM(Internal Fan 2)": [
                "RPM",
                "N/A",
                "28",
                "0.1"
              ],
              "RPM(External Fan 1)": [
                "RPM",
                "N/A",
                "29",
                "0.1"
              ],
              "RPM(External Fan 2)": [
                "RPM",
                "N/A",
                "30",
                "0.1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "33",
                "0.1"
              ],
              "System Current": [
                "A",
                "N/A",
                "40",
                "0.1"
              ],
              "System Power": [
                "W",
                "N/A",
                "41",
                "0.1"
              ],
              "System Energy": [
                "kWh",
                "N/A",
                "42",
                "0.01"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Door: [
                "",
                "N/A",
                "11",
                "1",
                "bit"
              ],
              Smoke: [
                "",
                "N/A",
                "12",
                "1",
                "bit"
              ],
              "Machine Status": [
                "",
                "N/A",
                "18",
                "1",
                "bit"
              ],
              "Cabinet Temperature": [
                "",
                "N/A",
                "7 8",
                "1",
                "bit"
              ],
              Usys: [
                "",
                "N/A",
                "9 10",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Internal Fan 1": [
                "",
                "N/A",
                "0",
                "14",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "Internal Fan 2": [
                "",
                "N/A",
                "1",
                "15",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 1": [
                "",
                "N/A",
                "2",
                "16",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 2": [
                "",
                "N/A",
                "3",
                "17",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ]
            },
            version_params: {
              "Product Type": [
                "",
                "N/A",
                "0",
                "1"
              ],
              "Product Serial No": [
                "",
                "N/A",
                "4 15",
                "1",
                "ascii"
              ],
              "Protocol Version": [
                "",
                "N/A",
                "3",
                "0.1"
              ],
              "Site ID": [
                "",
                "N/A",
                "16 25",
                "1",
                "ascii"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "1",
                "1"
              ],
              "HEX Software Version": [
                "",
                "N/A",
                "2",
                "0.001"
              ],
              "Installation Date": [
                "",
                "N/A",
                "45 46 47",
                "1"
              ],
              "Controller's Date": [
                "",
                "N/A",
                "48 49 50",
                "1"
              ],
              Time: [
                "",
                "N/A",
                "51 52",
                "1"
              ]
            }
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 45 84 39",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            cooling_params_columns: 1,
            cooling_params_rows: 8,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6,
            slave_id: "0x01",
            cooling_params: {
              Password: [
                "",
                "N/A",
                "18",
                "1",
                "100-255"
              ],
              "Power On Delay": [
                "sec",
                "N/A",
                "19",
                "1",
                "05-60"
              ],
              "High Temperature Alarm Point": [
                "°C",
                "N/A",
                "10",
                "1",
                "30-60"
              ],
              "Low Temperature Alarm Point": [
                "°C",
                "N/A",
                "11",
                "1",
                "-20 to 30",
                "int16"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "20",
                "1",
                "80-99"
              ],
              "Heat Exchanger Starting Temperature": [
                "°C",
                "N/A",
                "9",
                "1",
                "20-50"
              ],
              "Heat Exchanger Variable Starting temperature": [
                "°C",
                "N/A",
                "8",
                "1",
                "20-50"
              ],
              "High DC Voltage Alarm Point": [
                "V",
                "N/A",
                "16",
                "1",
                "50-60"
              ],
              "Low DC Voltage Alarm Point": [
                "V",
                "N/A",
                "17",
                "1",
                "42-50"
              ],
              "Constant Duty for Fix": [
                "%",
                "N/A",
                "22",
                "1",
                "10-40"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "23",
                "1",
                "02-15"
              ],
              "Internal Fan Idle Speed": [
                "%",
                "N/A",
                "24",
                "1",
                "10-40"
              ],
              "Duty When Any (T1/T2) Fail": [
                "%",
                "N/A",
                "25",
                "1",
                "60-99"
              ],
              "Calibration T1": [
                "",
                "N/A",
                "38",
                "1",
                "40-60"
              ],
              "Calibration T2": [
                "",
                "N/A",
                "39",
                "1",
                "40-60"
              ]
            },
            alarm_params: {
              "Smoke Alarm": [
                "",
                "N/A",
                "26",
                "1"
              ],
              "Door Open": [
                "",
                "N/A",
                "27",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "28",
                "1"
              ],
              "Low Temp Alarm": [
                "",
                "N/A",
                "29",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "30",
                "1"
              ],
              "Fan1 Fail": [
                "",
                "N/A",
                "31",
                "1"
              ],
              "Fan2 Fail": [
                "",
                "N/A",
                "32",
                "1"
              ],
              "Fan3 Fail": [
                "",
                "N/A",
                "33",
                "1"
              ],
              "Fan4 Fail": [
                "",
                "N/A",
                "34",
                "1"
              ],
              "High Voltage Alarm": [
                "",
                "N/A",
                "35",
                "1"
              ],
              "Low Voltage Alarm": [
                "",
                "N/A",
                "36",
                "1"
              ],
              Buzzer: [
                "",
                "N/A",
                "37",
                "1"
              ]
            },
            version_params: {
              "Slave ID": [
                "",
                "N/A",
                "40",
                "1",
                "1-99"
              ],
              "Site ID": [
                "",
                "N/A",
                "41 50",
                "1",
                "ascii",
                "16bit"
              ],
              "Product Serial No": [
                "",
                "N/A",
                "56 68",
                "1",
                "ascii",
                "16bit"
              ],
              "Product Type": [
                "",
                "N/A",
                "68",
                "1",
                "10-90"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "51",
                "1",
                "1-99"
              ],
              "Installation Date": [
                "",
                "N/A",
                "52",
                "1",
                "1-31"
              ],
              "Installation Month": [
                "",
                "N/A",
                "53",
                "1",
                "1-12"
              ],
              "Installation Year": [
                "",
                "N/A",
                "54",
                "1",
                "2025-3000"
              ]
            }
          },
          {
            option_name: "Logs",
            query1: "slave_id 85 00 01 00 10 AB CD"
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "2.0x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 37 B1 DC",
            query2: "slave_id 02 00 00 00 3C 78 1B",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            cooling_params_columns: 2,
            cooling_params_rows: 7,
            power_params_columns: 1,
            power_params_rows: 6,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6,
            cooling_params: {
              "T1(Cab)": [
                "°C",
                "N/A",
                "32",
                "0.1"
              ],
              "T2(Amb)": [
                "°C",
                "N/A",
                "34",
                "0.1"
              ],
              "Δt": [
                "°C",
                "N/A",
                "35",
                "0.1",
                "int16"
              ],
              "Duty(Internal Fan)": [
                "%",
                "N/A",
                "43",
                "1"
              ],
              "Duty(External Fan)": [
                "%",
                "N/A",
                "44",
                "1"
              ],
              "Run Hours of Only Hex": [
                "",
                "N/A",
                "36",
                "0.1"
              ],
              "RPM(Internal Fan 1)": [
                "RPM",
                "N/A",
                "27",
                "0.1"
              ],
              "RPM(Internal Fan 2)": [
                "RPM",
                "N/A",
                "28",
                "0.1"
              ],
              "RPM(External Fan 1)": [
                "RPM",
                "N/A",
                "29",
                "0.1"
              ],
              "RPM(External Fan 2)": [
                "RPM",
                "N/A",
                "30",
                "0.1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "33",
                "0.1"
              ],
              "System Current": [
                "A",
                "N/A",
                "40",
                "0.1"
              ],
              "System Power": [
                "W",
                "N/A",
                "41",
                "0.1"
              ],
              "System Energy": [
                "kWh",
                "N/A",
                "42",
                "0.01"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Door: [
                "",
                "N/A",
                "11",
                "1",
                "bit"
              ],
              Smoke: [
                "",
                "N/A",
                "12",
                "1",
                "bit"
              ],
              "Machine Status": [
                "",
                "N/A",
                "18",
                "1",
                "bit"
              ],
              "Delta T": [
                "",
                "N/A",
                "19",
                "1",
                "bit"
              ],
              "Cabinet Temperature": [
                "",
                "N/A",
                "7 8",
                "1",
                "bit"
              ],
              Usys: [
                "",
                "N/A",
                "9 10",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Internal Fan 1": [
                "",
                "N/A",
                "0",
                "14",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "Internal Fan 2": [
                "",
                "N/A",
                "1",
                "15",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 1": [
                "",
                "N/A",
                "2",
                "16",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 2": [
                "",
                "N/A",
                "3",
                "17",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ]
            },
            version_params: {
              "Product Type": [
                "",
                "N/A",
                "0",
                "1"
              ],
              "Product Serial No": [
                "",
                "N/A",
                "4 15",
                "1",
                "ascii"
              ],
              "Protocol Version": [
                "",
                "N/A",
                "3",
                "0.1"
              ],
              "Site ID": [
                "",
                "N/A",
                "16 19",
                "1",
                "ascii"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "1",
                "1"
              ],
              "HEX Software Version": [
                "",
                "N/A",
                "2",
                "0.001"
              ],
              "Installation Date": [
                "",
                "N/A",
                "45 46 47",
                "1"
              ],
              "Controller's Date": [
                "",
                "N/A",
                "48 49 50",
                "1"
              ],
              Time: [
                "",
                "N/A",
                "51 52",
                "1"
              ]
            }
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 3C 45 DB",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            cooling_params_columns: 1,
            cooling_params_rows: 8,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6,
            slave_id: "0x01",
            cooling_params: {
              Password: [
                "",
                "N/A",
                "18",
                "1",
                "100-255"
              ],
              "Power On Delay": [
                "sec",
                "N/A",
                "19",
                "1",
                "05-60"
              ],
              "High Temperature Alarm Point": [
                "°C",
                "N/A",
                "10",
                "1",
                "30-60"
              ],
              "Low Temperature Alarm Point": [
                "°C",
                "N/A",
                "11",
                "1",
                "-20 to 30",
                "int16"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "20",
                "1",
                "80-99"
              ],
              "Heat Exchanger Starting Temperature": [
                "°C",
                "N/A",
                "9",
                "1",
                "20-50"
              ],
              "Heat Exchanger Variable Starting temperature": [
                "°C",
                "N/A",
                "8",
                "1",
                "20-50"
              ],
              "High DC Voltage Alarm Point": [
                "V",
                "N/A",
                "16",
                "1",
                "50-60"
              ],
              "Low DC Voltage Alarm Point": [
                "V",
                "N/A",
                "17",
                "1",
                "42-50"
              ],
              "Constant Duty for Fix": [
                "%",
                "N/A",
                "22",
                "1",
                "10-40"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "23",
                "1",
                "02-15"
              ],
              "Internal Fan Idle Speed": [
                "%",
                "N/A",
                "24",
                "1",
                "10-40"
              ],
              "Duty When Any (T1/T2) Fail": [
                "%",
                "N/A",
                "25",
                "1",
                "60-99"
              ],
              "Calibration T1": [
                "",
                "N/A",
                "38",
                "1",
                "40-60"
              ],
              "Calibration T2": [
                "",
                "N/A",
                "39",
                "1",
                "40-60"
              ]
            },
            alarm_params: {
              "Smoke Alarm": [
                "",
                "N/A",
                "26",
                "1"
              ],
              "Door Open": [
                "",
                "N/A",
                "27",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "28",
                "1"
              ],
              "Low Temp Alarm": [
                "",
                "N/A",
                "29",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "30",
                "1"
              ],
              "Fan1 Fail": [
                "",
                "N/A",
                "31",
                "1"
              ],
              "Fan2 Fail": [
                "",
                "N/A",
                "32",
                "1"
              ],
              "Fan3 Fail": [
                "",
                "N/A",
                "33",
                "1"
              ],
              "Fan4 Fail": [
                "",
                "N/A",
                "34",
                "1"
              ],
              "Usys High Alarm": [
                "",
                "N/A",
                "35",
                "1"
              ],
              "Usys Low Alarm": [
                "",
                "N/A",
                "36",
                "1"
              ],
              Buzzer: [
                "",
                "N/A",
                "37",
                "1"
              ]
            },
            version_params: {
              "Slave ID": [
                "",
                "N/A",
                "40",
                "1",
                "1-99"
              ],
              "Site ID": [
                "",
                "N/A",
                "41 50",
                "1",
                "ascii"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "51",
                "1",
                "1-99"
              ],
              "Installation Date": [
                "",
                "N/A",
                "52",
                "1",
                "1-31"
              ],
              "Installation Month": [
                "",
                "N/A",
                "53",
                "1",
                "1-12"
              ],
              "Installation Year": [
                "",
                "N/A",
                "54",
                "1",
                "1-255"
              ]
            }
          },
          {
            option_name: "Logs",
            query1: "slave_id 85 00 01 00 10 AB CD"
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "2.9x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 37 B1 DC",
            query2: "slave_id 02 00 00 00 18 78 00",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 6,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            cooling_params: {
              "T1(Cab)": [
                "°C",
                "N/A",
                "33",
                "0.1"
              ],
              "T2(Amb)": [
                "°C",
                "N/A",
                "35",
                "0.1"
              ],
              "Δt": [
                "°C",
                "N/A",
                "36",
                "0.1",
                "int16"
              ],
              "Duty(Internal Fan)": [
                "%",
                "N/A",
                "44",
                "1"
              ],
              "Duty(External Fan)": [
                "%",
                "N/A",
                "45",
                "1"
              ],
              "Run Hours of Only Hex": [
                "",
                "N/A",
                "38 37",
                "1",
                "concat2                                                                                                                                                                                                                                                                                                                                                                                                  "
              ],
              "RPM(Internal Fan 1)": [
                "RPM",
                "N/A",
                "28",
                "1"
              ],
              "RPM(Internal Fan 2)": [
                "RPM",
                "N/A",
                "29",
                "1"
              ],
              "RPM(External Fan 1)": [
                "RPM",
                "N/A",
                "30",
                "1"
              ],
              "RPM(External Fan 2)": [
                "RPM",
                "N/A",
                "31",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "34",
                "0.1"
              ],
              "System Current": [
                "A",
                "N/A",
                "41",
                "0.1"
              ],
              "System Power": [
                "W",
                "N/A",
                "42",
                "0.1"
              ],
              "System Energy": [
                "kWh",
                "N/A",
                "43",
                "0.01"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              Door: [
                "",
                "N/A",
                "12",
                "1",
                "bit"
              ],
              Smoke: [
                "",
                "N/A",
                "13",
                "1",
                "bit"
              ],
              "Machine Status": [
                "",
                "N/A",
                "19",
                "1",
                "bit"
              ],
              "Cabinet Temperature": [
                "",
                "N/A",
                "8 9",
                "1",
                "bit"
              ],
              Usys: [
                "",
                "N/A",
                "10 11",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "T2 Sensor": [
                "",
                "N/A",
                "7",
                "1",
                "bit"
              ],
              "Internal Fan 1": [
                "",
                "N/A",
                "1",
                "15",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "Internal Fan 2": [
                "",
                "N/A",
                "2",
                "16",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 1": [
                "",
                "N/A",
                "3",
                "17",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ],
              "External Fan 2": [
                "",
                "N/A",
                "4",
                "18",
                "bit",
                [
                  0,
                  1,
                  2
                ]
              ]
            },
            version_params: {
              "Product Type": [
                "",
                "N/A",
                "1",
                "1"
              ],
              "Product Serial No": [
                "",
                "N/A",
                "5 16",
                "1",
                "ascii"
              ],
              "Protocol Version": [
                "",
                "N/A",
                "4",
                "0.1"
              ],
              "Site ID": [
                "",
                "N/A",
                "17 26",
                "1",
                "ascii"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "2",
                "1"
              ],
              "HEX Software Version": [
                "",
                "N/A",
                "3",
                "0.1"
              ],
              "Date of Installation": [
                "",
                "N/A",
                "27",
                "1",
                "mmdd"
              ],
              "Installation Date": [
                "",
                "N/A",
                "46 47 48",
                "1"
              ],
              "Controller's Date": [
                "",
                "N/A",
                "49 50 51",
                "1"
              ],
              Time: [
                "",
                "N/A",
                "52 53",
                "1"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 6,
            power_params_columns: 2,
            power_params_rows: 6,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 45 84 39",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            left_labels_1_columns: 1,
            left_labels_1_custom_rows: 8,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            slave_id: "0x01",
            cooling_params: {
              Password: [
                "",
                "N/A",
                "19",
                "1",
                "100-255"
              ],
              "Power On Delay": [
                "sec",
                "N/A",
                "20",
                "1",
                "5-60"
              ],
              "High Temperature Alarm Point": [
                "°C",
                "N/A",
                "11",
                "0.1",
                "45-60"
              ],
              "Low Temperature Alarm Point": [
                "°C",
                "N/A",
                "12",
                "0.1",
                "-20 to 30",
                "int16"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "5",
                "1",
                "60-99"
              ],
              "Internal Fan Idle Speed": [
                "%",
                "N/A",
                "6",
                "1",
                "20 - 40"
              ],
              "Heat Exchanger Starting Temperature": [
                "°C",
                "N/A",
                "7",
                "0.1",
                "25-35"
              ],
              "Heat Exchanger Stopping Return Difference temperature": [
                "°C",
                "N/A",
                "10",
                "0.1",
                "20-35"
              ],
              "High DC Voltage Alarm Point": [
                "V",
                "N/A",
                "17",
                "0.1",
                "55-75"
              ],
              "Low DC Voltage Alarm Point": [
                "V",
                "N/A",
                "18",
                "0.1",
                "35-45"
              ],
              "Constant Duty for Fix": [
                "%",
                "N/A",
                "23",
                "1",
                "20-40"
              ],
              "Set Delta T": [
                "°C",
                "N/A",
                "24",
                "1",
                "02 - 15"
              ],
              "Duty When Any (T1/T2) Fail": [
                "%",
                "N/A",
                "26",
                "1",
                "60-99"
              ],
              "Calibration T1": [
                "",
                "N/A",
                "39",
                "1",
                "40-60"
              ],
              "Calibration T2": [
                "",
                "N/A",
                "40",
                "1",
                "40-60"
              ]
            },
            alarm_params: {
              "Smoke Alarm": [
                "",
                "N/A",
                "27",
                "1"
              ],
              "Door Open": [
                "",
                "N/A",
                "28",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "29",
                "1"
              ],
              "Low Temp Alarm": [
                "",
                "N/A",
                "30",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "31",
                "1"
              ],
              "Fan1 Fail": [
                "",
                "N/A",
                "32",
                "1"
              ],
              "Fan2 Fail": [
                "",
                "N/A",
                "33",
                "1"
              ],
              "Fan3 Fail": [
                "",
                "N/A",
                "34",
                "1"
              ],
              "Fan4 Fail": [
                "",
                "N/A",
                "35",
                "1"
              ],
              "Usys High Alarm": [
                "",
                "N/A",
                "36",
                "1"
              ],
              "Usys Low Alarm": [
                "",
                "N/A",
                "37",
                "1"
              ],
              Buzzer: [
                "",
                "N/A",
                "38",
                "1"
              ]
            },
            version_params: {
              "Slave ID": [
                "",
                "N/A",
                "41",
                "1",
                "1-99"
              ],
              "Site ID": [
                "",
                "N/A",
                "42 51",
                "1",
                "ascii",
                "8bit"
              ],
              "Product Type": [
                "",
                "N/A",
                "69",
                "1",
                "10-90"
              ],
              "Product Serial No": [
                "",
                "N/A",
                "57 68",
                "1",
                "ascii",
                "8bit"
              ],
              "Manufacturer Code": [
                "",
                "N/A",
                "52",
                "1"
              ],
              "Installation Date": [
                "",
                "N/A",
                "53",
                "1",
                "1-31"
              ],
              "Installation Month": [
                "",
                "N/A",
                "54",
                "1",
                "1-12"
              ],
              "Installation Year": [
                "",
                "N/A",
                "55",
                "1",
                "2025-3000"
              ]
            }
          },
          {
            option_name: "Logs",
            query1: "slave_id 85 00 01 00 10 AB CD"
          },
          {
            option_name: "Help"
          }
        ]
      }
    ]
  },
  {
    product_name: "EICS145",
    versions: [
      {
        version: "2.1x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "01 04 00 00 00 09 30 0C",
            query2: "01 02 00 00 00 0A F8 0D",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query2",
              version_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 2,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 4,
            cooling_params: {
              "Temp(Cab)": [
                "°C",
                "N/A",
                "0",
                "0.01"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "1",
                "1"
              ],
              "Fan 1 Run Hour": [
                "hr",
                "N/A",
                "3",
                "0.1"
              ],
              "Fan 2 Run Hour": [
                "hr",
                "N/A",
                "4",
                "0.1"
              ],
              "Fan 3 Run Hour": [
                "hr",
                "N/A",
                "5",
                "0.1"
              ],
              "Fan 4 Run Hour": [
                "hr",
                "N/A",
                "6",
                "0.1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "2",
                "0.1"
              ]
            },
            b0: "0",
            b1: "1",
            b2: "2",
            alarm_params: {
              "Site On Battery": [
                "",
                "N/A",
                "0",
                "1",
                "bit"
              ],
              "HCT/HRT": [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ],
              "T1 Sensor": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "Usys Low": [
                "",
                "N/A",
                "7",
                "1",
                "bit"
              ],
              "Fan On": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ],
              "Fan 1 Fail": [
                "",
                "N/A",
                "3",
                "1",
                "bit"
              ],
              "Fan 2 Fail": [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              "Fan 3 Fail": [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              "Fan 4 Fail": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ]
            },
            version_params: {
              "FTU HW Model No": [
                "",
                "N/A",
                "7",
                "0.1"
              ],
              "FTU SW Version": [
                "",
                "N/A",
                "8",
                "0.001"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 2,
            power_params_columns: 2,
            power_params_rows: 2,
            alarm_params_columns: 2,
            alarm_params_rows: 4,
            version_params_columns: 2,
            version_params_rows: 4
          },
          {
            option_name: "Settings",
            query1: "slave_id 03 00 00 00 15 84 05",
            query_mapping: {
              cooling_params: "query1",
              alarm_params: "query1",
              version_params: "query1"
            },
            left_labels_1_columns: 1,
            left_labels_1_custom_rows: 8,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 4,
            slave_id: "0x01",
            cooling_params: {
              "Power On Delay": [
                "sec",
                "N/A",
                "0",
                "1",
                "5 - 60"
              ],
              "Fan Fix Duty Starting Temperature": [
                "°C",
                "N/A",
                "1",
                "1",
                "20 - 70"
              ],
              "Fan Stop Temperature": [
                "°C",
                "N/A",
                "2",
                "1",
                "20 - 70"
              ],
              "Fix Duty": [
                "%",
                "N/A",
                "3",
                "1",
                "0 - 100"
              ],
              "Variable Duty Starting Temperature": [
                "°C",
                "N/A",
                "4",
                "1",
                "20 - 70"
              ],
              "Variable Duty Stopping Temperature": [
                "°C",
                "N/A",
                "5",
                "1",
                "20 - 70"
              ],
              "No. Of Fan": [
                "",
                "N/A",
                "6",
                "1",
                "1 - 4"
              ],
              "High Cabinet Temp (HCT)": [
                "°C",
                "N/A",
                "7",
                "1",
                "20 - 70"
              ],
              "Fan Minimum Duty": [
                "%",
                "N/A",
                "8",
                "1",
                "0 - 100"
              ],
              "Max Duty Lock (Noise Limit)": [
                "%",
                "N/A",
                "9",
                "1",
                "0 - 100"
              ],
              "Sensor Fail Duty": [
                "%",
                "N/A",
                "10",
                "1",
                "0 - 100"
              ],
              "Usys Low Level": [
                "V",
                "N/A",
                "11",
                "1",
                "0 - 40"
              ]
            },
            alarm_params: {
              "Site On Battery": [
                "",
                "N/A",
                "12",
                "1"
              ],
              "High Temp Alarm": [
                "",
                "N/A",
                "13",
                "1"
              ],
              "Usys Low": [
                "",
                "N/A",
                "19",
                "1"
              ],
              "All Fan Fail": [
                "",
                "N/A",
                "14",
                "1"
              ],
              "Fan 1 Fail": [
                "",
                "N/A",
                "15",
                "1"
              ],
              "Fan 2 Fail": [
                "",
                "N/A",
                "16",
                "1"
              ],
              "Fan 3 Fail": [
                "",
                "N/A",
                "17",
                "1"
              ],
              "Fan 4 Fail": [
                "",
                "N/A",
                "18",
                "1"
              ]
            },
            version_params: {
              "Slave ID": [
                "",
                "N/A",
                "20",
                "1",
                "1 - 127"
              ]
            }
          },
          {
            option_name: "Help"
          }
        ]
      }
    ]
  },
  {
    product_name: "EICS42",
    versions: [
      {
        version: "2.3x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 07 B0 D5",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 4,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            cooling_params: {
              "Room Temp": [
                "°C",
                "N/A",
                "0",
                "0.1"
              ],
              "Ambient Temp": [
                "°C",
                "N/A",
                "1",
                "0.1"
              ],
              "Δt": [
                "°C",
                "N/A",
                "2",
                "0.1",
                "int16"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "4",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "3",
                "0.1"
              ]
            },
            b0: "5",
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              Door: [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              HCT: [
                "",
                "N/A",
                "3",
                "1",
                "bit"
              ],
              "Usys Low": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Room Sensor": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "Ambient Sensor": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ],
              Fan: [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 4,
            power_params_columns: 2,
            power_params_rows: 4,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "2.4x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 07 B0 D5",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 4,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            cooling_params: {
              "Room Temp": [
                "°C",
                "N/A",
                "0",
                "0.1"
              ],
              "Ambient Temp": [
                "°C",
                "N/A",
                "1",
                "0.1"
              ],
              "Δt": [
                "°C",
                "N/A",
                "2",
                "0.1",
                "int16"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "4",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "3",
                "0.1"
              ]
            },
            b0: "5",
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              Door: [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              HCT: [
                "",
                "N/A",
                "3",
                "1",
                "bit"
              ],
              "Usys Low": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Room Sensor": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "Ambient Sensor": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ],
              Fan: [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 4,
            power_params_columns: 2,
            power_params_rows: 4,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6
          },
          {
            option_name: "Help"
          }
        ]
      },
      {
        version: "2.5x",
        is_default: false,
        sidebar_params: [
          {
            option_name: "Monitor",
            query1: "slave_id 04 00 00 00 07 B0 D5",
            query_mapping: {
              cooling_params: "query1",
              power_params: "query1",
              alarm_params: "query1"
            },
            left_labels_1_columns: 2,
            left_labels_1_custom_rows: 4,
            right_labels_1_columns: 2,
            right_labels_1_custom_rows: 6,
            cooling_params: {
              "Room Temp": [
                "°C",
                "N/A",
                "0",
                "0.1"
              ],
              "Ambient Temp": [
                "°C",
                "N/A",
                "1",
                "0.1"
              ],
              "Δt": [
                "°C",
                "N/A",
                "2",
                "0.1",
                "int16"
              ],
              "PWM Duty": [
                "%",
                "N/A",
                "4",
                "1"
              ]
            },
            power_params: {
              "System Voltage": [
                "V",
                "N/A",
                "3",
                "0.1"
              ]
            },
            b0: "5",
            alarm_params: {
              Smoke: [
                "",
                "N/A",
                "4",
                "1",
                "bit"
              ],
              Door: [
                "",
                "N/A",
                "5",
                "1",
                "bit"
              ],
              HCT: [
                "",
                "N/A",
                "3",
                "1",
                "bit"
              ],
              "Usys Low": [
                "",
                "N/A",
                "6",
                "1",
                "bit"
              ],
              "Room Sensor": [
                "",
                "N/A",
                "8",
                "1",
                "bit"
              ],
              "Ambient Sensor": [
                "",
                "N/A",
                "9",
                "1",
                "bit"
              ],
              Fan: [
                "",
                "N/A",
                "1",
                "1",
                "bit"
              ]
            },
            cooling_params_columns: 2,
            cooling_params_rows: 4,
            power_params_columns: 2,
            power_params_rows: 4,
            alarm_params_columns: 2,
            alarm_params_rows: 6,
            version_params_columns: 2,
            version_params_rows: 6
          },
          {
            option_name: "Help"
          }
        ]
      }
    ]
  }
];
const productsData = {
  products
};
const PARAM_SECTION_ORDER = [
  "cooling_params",
  "power_params",
  "alarm_params",
  "version_params"
];
const PARAM_MATRIX_RENDER_ORDER = [
  "cooling_params",
  "alarm_params",
  "power_params",
  "version_params"
];
const PARAM_SECTION_TITLES = {
  cooling_params: "Cooling parameters",
  power_params: "Power parameters",
  alarm_params: "Alarm parameters",
  version_params: "Version parameters"
};
const PARAM_MATRIX_SLOT = {
  cooling_params: { row: 1, col: 1 },
  alarm_params: { row: 1, col: 2 },
  power_params: { row: 2, col: 1 },
  version_params: { row: 2, col: 2 }
};
const FIRST_COLUMN_EVEN_SPLIT = -1;
const DEFAULT_SECTION_LAYOUT = { columns: 1, rows: 24 };
function clampInt(value, min, max, fallback) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}
function readSectionLayout(monitor, group) {
  const colKey = `${group}_columns`;
  const rowKey = `${group}_rows`;
  const hasCol = colKey in monitor;
  const hasRow = rowKey in monitor;
  if (!hasCol && !hasRow) return DEFAULT_SECTION_LAYOUT;
  const columns = clampInt(monitor[colKey], 1, 6, DEFAULT_SECTION_LAYOUT.columns);
  if (columns <= 1) {
    return { columns: 1, rows: hasRow ? clampInt(monitor[rowKey], 0, 500, 0) : DEFAULT_SECTION_LAYOUT.rows };
  }
  if (!hasRow) {
    return { columns, rows: FIRST_COLUMN_EVEN_SPLIT };
  }
  const rows = clampInt(monitor[rowKey], 0, 500, 0);
  return { columns, rows };
}
function splitEvenly(items, k) {
  if (k <= 0) return [];
  if (k === 1) return [items];
  const n = items.length;
  const out = Array.from({ length: k }, () => []);
  if (n === 0) return out;
  const base = Math.floor(n / k);
  const extra = n % k;
  let i = 0;
  for (let c = 0; c < k; c++) {
    const size = base + (c < extra ? 1 : 0);
    out[c] = items.slice(i, i + size);
    i += size;
  }
  return out;
}
function splitParamEntriesForLayout(entries, layout) {
  const { columns, rows } = layout;
  if (columns <= 1) return [entries];
  if (rows === FIRST_COLUMN_EVEN_SPLIT) {
    return splitEvenly(entries, columns);
  }
  const n = entries.length;
  const firstLen = Math.min(Math.max(0, rows), n);
  const col0 = entries.slice(0, firstLen);
  const rest = entries.slice(firstLen);
  const restCols = columns - 1;
  if (restCols <= 0) return [col0];
  return [col0, ...splitEvenly(rest, restCols)];
}
function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
function isParamSpecArray(v) {
  return Array.isArray(v) && v.length >= 1;
}
const SETTINGS_PARAM_MATRIX_ORDER = ["cooling_params", "alarm_params", "version_params"];
function resolveMonitorEntry(modelName, firmwareVersion) {
  const model = modelName?.trim();
  const fw = firmwareVersion?.trim();
  if (!model || !fw) return null;
  const { products: products2 } = productsData;
  const product = products2.find((p) => p.product_name === model);
  if (!product) return null;
  const versionEntry = product.versions.find((v) => v.version === fw);
  if (!versionEntry?.sidebar_params) return null;
  const monitor = versionEntry.sidebar_params.find(
    (s) => isPlainObject(s) && String(s.option_name ?? "").trim().toLowerCase() === "monitor"
  );
  if (!monitor || !isPlainObject(monitor)) return null;
  return monitor;
}
function monitorBlockHasQueries(m) {
  const q1 = m.query1;
  const q2 = m.query2;
  return typeof q1 === "string" && q1.trim().length > 0 || typeof q2 === "string" && q2.trim().length > 0;
}
function extractMonitorFromSidebar(sidebar) {
  if (!sidebar) return null;
  const monitor = sidebar.find(
    (s) => isPlainObject(s) && String(s.option_name ?? "").trim().toLowerCase() === "monitor"
  );
  return monitor && isPlainObject(monitor) ? monitor : null;
}
function resolveMonitorEntryForSerialPoll(modelName, firmwareVersion) {
  const exact = resolveMonitorEntry(modelName, firmwareVersion);
  if (exact && monitorBlockHasQueries(exact)) return exact;
  const model = modelName?.trim();
  if (!model) return null;
  const { products: products2 } = productsData;
  const product = products2.find((p) => p.product_name === model);
  if (!product?.versions?.length) return null;
  const fw = firmwareVersion?.trim();
  if (fw) {
    const v = product.versions.find((e) => e.version === fw);
    const m = v ? extractMonitorFromSidebar(v.sidebar_params) : null;
    if (m && monitorBlockHasQueries(m)) return m;
  }
  const defaultVer = product.versions.find((e) => e.is_default === true);
  if (defaultVer) {
    const m = extractMonitorFromSidebar(defaultVer.sidebar_params);
    if (m && monitorBlockHasQueries(m)) return m;
  }
  for (const v of product.versions) {
    const m = extractMonitorFromSidebar(v.sidebar_params);
    if (m && monitorBlockHasQueries(m)) return m;
  }
  return null;
}
function extractSettingsFromSidebar(sidebar) {
  if (!sidebar) return null;
  const settings = sidebar.find(
    (s) => isPlainObject(s) && String(s.option_name ?? "").trim().toLowerCase() === "settings"
  );
  return settings && isPlainObject(settings) ? settings : null;
}
function resolveSettingsEntry(modelName, firmwareVersion) {
  const model = modelName?.trim();
  const fw = firmwareVersion?.trim();
  if (!model || !fw) return null;
  const { products: products2 } = productsData;
  const product = products2.find((p) => p.product_name === model);
  if (!product) return null;
  const versionEntry = product.versions.find((v) => v.version === fw);
  if (!versionEntry?.sidebar_params) return null;
  return extractSettingsFromSidebar(versionEntry.sidebar_params);
}
function resolveSettingsEntryForSerialPoll(modelName, firmwareVersion) {
  const exact = resolveSettingsEntry(modelName, firmwareVersion);
  if (exact && monitorBlockHasQueries(exact)) return exact;
  const model = modelName?.trim();
  if (!model) return null;
  const { products: products2 } = productsData;
  const product = products2.find((p) => p.product_name === model);
  if (!product?.versions?.length) return null;
  const fw = firmwareVersion?.trim();
  if (fw) {
    const v = product.versions.find((e) => e.version === fw);
    const s = v ? extractSettingsFromSidebar(v.sidebar_params) : null;
    if (s && monitorBlockHasQueries(s)) return s;
  }
  const defaultVer = product.versions.find((e) => e.is_default === true);
  if (defaultVer) {
    const s = extractSettingsFromSidebar(defaultVer.sidebar_params);
    if (s && monitorBlockHasQueries(s)) return s;
  }
  for (const v of product.versions) {
    const s = extractSettingsFromSidebar(v.sidebar_params);
    if (s && monitorBlockHasQueries(s)) return s;
  }
  return null;
}
function getSettingsQueryTemplates(modelName, firmwareVersion) {
  const settings = resolveSettingsEntryForSerialPoll(modelName, firmwareVersion);
  if (!settings) return null;
  const q1 = settings.query1;
  const q2 = settings.query2;
  const out = {};
  if (typeof q1 === "string" && q1.trim()) out.query1 = q1.trim();
  if (typeof q2 === "string" && q2.trim()) out.query2 = q2.trim();
  return Object.keys(out).length > 0 ? out : null;
}
function readSettingsQueryMapping(settings) {
  const raw = settings.query_mapping;
  if (!isPlainObject(raw)) return {};
  const out = {};
  for (const key of SETTINGS_PARAM_MATRIX_ORDER) {
    const v = raw[key];
    if (v === "query1" || v === "query2") out[key] = v;
  }
  return out;
}
function getSettingsDashboardConfig(modelName, firmwareVersion) {
  const settings = resolveSettingsEntry(modelName, firmwareVersion);
  if (!settings) return null;
  const groups = {};
  const sectionLayout = {};
  for (const key of SETTINGS_PARAM_MATRIX_ORDER) {
    const raw = settings[key];
    if (!isPlainObject(raw)) continue;
    const entries = {};
    for (const [paramName, spec] of Object.entries(raw)) {
      if (!isParamSpecArray(spec)) continue;
      entries[paramName] = spec;
    }
    if (Object.keys(entries).length > 0) {
      groups[key] = entries;
      sectionLayout[key] = readSectionLayout(settings, key);
    }
  }
  return Object.keys(groups).length > 0 ? {
    groups,
    sectionLayout,
    queryMapping: readSettingsQueryMapping(settings),
    alarmDiscreteByteIndices: readMonitorAlarmDiscreteTriple(settings),
    alarmHoldingBitBaseRegister: readMonitorAlarmB0(settings)
  } : null;
}
function readMonitorQueryMapping(monitor) {
  const raw = monitor.query_mapping;
  if (!isPlainObject(raw)) return {};
  const out = {};
  for (const key of PARAM_SECTION_ORDER) {
    const v = raw[key];
    if (v === "query1" || v === "query2") out[key] = v;
  }
  return out;
}
function readMonitorAlarmDiscreteTriple(monitor) {
  const parts = [];
  for (const k of ["b0", "b1", "b2"]) {
    const v = monitor[k];
    const n = typeof v === "number" && Number.isFinite(v) ? v : parseInt(String(v ?? "").trim(), 10);
    if (!Number.isFinite(n) || n < 0) return null;
    parts.push(Math.floor(n));
  }
  return [parts[0], parts[1], parts[2]];
}
function readMonitorAlarmB0(monitor) {
  const v = monitor.b0;
  const n = typeof v === "number" && Number.isFinite(v) ? v : parseInt(String(v ?? "").trim(), 10);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.floor(n);
}
function getMonitorDashboardConfig(modelName, firmwareVersion) {
  const monitor = resolveMonitorEntry(modelName, firmwareVersion);
  if (!monitor) return null;
  const groups = {};
  const sectionLayout = {};
  for (const key of PARAM_SECTION_ORDER) {
    const raw = monitor[key];
    if (!isPlainObject(raw)) continue;
    const entries = {};
    for (const [paramName, spec] of Object.entries(raw)) {
      if (!isParamSpecArray(spec)) continue;
      entries[paramName] = spec;
    }
    if (Object.keys(entries).length > 0) {
      groups[key] = entries;
      sectionLayout[key] = readSectionLayout(monitor, key);
    }
  }
  return Object.keys(groups).length > 0 ? {
    groups,
    sectionLayout,
    queryMapping: readMonitorQueryMapping(monitor),
    alarmDiscreteByteIndices: readMonitorAlarmDiscreteTriple(monitor),
    alarmHoldingBitBaseRegister: readMonitorAlarmB0(monitor)
  } : null;
}
function getMonitorQueryTemplates(modelName, firmwareVersion) {
  const monitor = resolveMonitorEntryForSerialPoll(modelName, firmwareVersion);
  if (!monitor) return null;
  const q1 = monitor.query1;
  const q2 = monitor.query2;
  const out = {};
  if (typeof q1 === "string" && q1.trim()) out.query1 = q1.trim();
  if (typeof q2 === "string" && q2.trim()) out.query2 = q2.trim();
  return Object.keys(out).length > 0 ? out : null;
}
const LIVE_SCALAR_COLOR = "#00ff00";
function formatUnit(raw) {
  if (raw === null || raw === void 0) return "—";
  const t = String(raw).trim();
  return t.length > 0 ? t : "";
}
function formatDefault(raw) {
  if (raw === null || raw === void 0) return "—";
  const t = String(raw).trim();
  return t.length > 0 ? t : "—";
}
function isVersionParamHidden(spec) {
  return spec.length >= 5 && String(spec[4]).trim() === "hide";
}
function entriesForParamMatrix(groupKey, block) {
  let entries = Object.entries(block);
  if (groupKey === "version_params") {
    entries = entries.filter(([, spec]) => !Array.isArray(spec) || !isVersionParamHidden(spec));
  }
  if (groupKey === "alarm_params") {
    const fanOn = block["Fan On"];
    const hideFanOn = Array.isArray(fanOn) && fanOn.length >= 6 && String(fanOn[5]).trim() === "fan_status";
    if (hideFanOn) {
      entries = entries.filter(([name]) => name !== "Fan On");
    }
  }
  return entries;
}
function ParamSectionCard({
  groupKey,
  block,
  layout,
  liveByParamName,
  interactive,
  onParamRowClick
}) {
  const columnChunks = splitParamEntriesForLayout(entriesForParamMatrix(groupKey, block), layout);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card dashboard-param-matrix-cell", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: PARAM_SECTION_TITLES[groupKey] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-param-section-cols", children: columnChunks.map((colEntries, colIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "dashboard-param-list dashboard-param-col", children: colEntries.map(([name, spec]) => {
      const live = liveByParamName?.[name];
      const text = live?.value ?? formatDefault(spec.length > 1 ? spec[1] : void 0);
      const valueColor = live ? live.color ?? LIVE_SCALAR_COLOR : void 0;
      const clickable = Boolean(interactive && onParamRowClick);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: `dashboard-param-row${clickable ? " dashboard-param-row--clickable" : ""}`,
          ...clickable ? {
            role: "button",
            tabIndex: 0,
            onClick: () => onParamRowClick({ paramName: name, spec, displayText: text }),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onParamRowClick({ paramName: name, spec, displayText: text });
              }
            }
          } : {},
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `dashboard-param-name${live?.nameMuted ? " dashboard-param-name--muted" : ""}`,
                children: name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "dashboard-param-default",
                style: valueColor ? { color: valueColor } : void 0,
                children: text
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dashboard-param-unit", children: formatUnit(spec[0]) })
          ]
        },
        name
      );
    }) }, colIndex)) })
  ] });
}
function parseTrafficPayload(text) {
  const t = text.trim();
  if (t.startsWith("[RX] ")) {
    return { kind: "rx", hex: t.slice(5).trim() };
  }
  const txFail = t.match(/^\[TX\s+(\S+)\s+failed\]\s*(.*)$/);
  if (txFail) {
    return { kind: "log", hex: `TX ${txFail[1]} failed · ${txFail[2].trim()}` };
  }
  const txOk = t.match(/^\[TX\s+(.+?)\]\s+(.+)$/);
  if (txOk) {
    return { kind: "tx", query: txOk[1].trim(), hex: txOk[2].trim() };
  }
  if (t.startsWith("[error]")) {
    return { kind: "log", hex: t };
  }
  return { kind: "rx", hex: t };
}
function Traffic({ connected, path, baudRate, slaveId, lines }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "serial-readout traffic-view", "aria-label": "Serial traffic", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "serial-readout-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: connected ? "serial-readout-dot" : "serial-readout-dot serial-readout-dot--idle",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "serial-readout-summary", children: [
        "Traffic —",
        " ",
        connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: path }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "serial-readout-sep", "aria-hidden": "true" }),
          "Baudrate: ",
          baudRate,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "serial-readout-sep", "aria-hidden": "true" }),
          "Slave ID: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: slaveId || "—" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Not connected" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "serial-readout-log", role: "log", "aria-live": "polite", children: !connected ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "serial-readout-placeholder", children: "Use the toolbar Connect button to open a port and view traffic." }) : lines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "serial-readout-placeholder", children: "No frames yet — waiting for bytes on the wire…" }) : lines.map((row, index2) => {
      const tab = row.indexOf("	");
      const rowKey = tab >= 0 ? row.slice(0, tab) : String(index2);
      const text = tab >= 0 ? row.slice(tab + 1) : row;
      const { kind, query, hex } = parseTrafficPayload(text);
      const tagLabel = kind === "tx" ? "TX" : kind === "rx" ? "RX" : "—";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "serial-readout-line traffic-view-line", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `traffic-view-tag traffic-view-tag--${kind}`, children: tagLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "traffic-view-payload traffic-view-hex", children: hex })
      ] }, `${rowKey}-${index2}`);
    }) })
  ] });
}
const DisplayViewContext = reactExports.createContext(null);
function DisplayViewProvider({
  children,
  view,
  serialConnected,
  serialLineCount,
  serialLines,
  serialPath,
  serialBaudRate,
  serialSlaveId,
  beginSettingsParamEdit,
  endSettingsParamEdit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DisplayViewContext.Provider,
    {
      value: {
        view,
        serialConnected,
        serialLineCount,
        serialLines,
        serialPath,
        serialBaudRate,
        serialSlaveId,
        beginSettingsParamEdit,
        endSettingsParamEdit
      },
      children
    }
  );
}
function useDisplayView() {
  const v = reactExports.useContext(DisplayViewContext);
  if (!v) {
    throw new Error("useDisplayView must be used within DisplayViewProvider");
  }
  return v;
}
function crc16Modbus(data) {
  let crc = 65535;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      if (crc & 1) crc = crc >>> 1 ^ 40961;
      else crc >>>= 1;
    }
  }
  return crc & 65535;
}
function parseSlaveByte(slaveIdStr) {
  const s = slaveIdStr.trim();
  if (!s) return 1;
  const n = /^0x/i.test(s) ? parseInt(s, 16) : parseInt(s, 10);
  if (!Number.isFinite(n) || n < 0 || n > 247) return 1;
  return n;
}
function isCrcPlaceholderToken(t) {
  return /^crc16m[Oo]dbus$/i.test(t);
}
function buildModbusRtuFrame(template, slaveIdStr) {
  const raw = template.trim();
  if (!raw) return null;
  const tokens = raw.split(/\s+/).filter(Boolean);
  const bytes = [];
  let i = 0;
  let sawSlaveKeyword = false;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t === "slave_id") {
      sawSlaveKeyword = true;
      bytes.push(parseSlaveByte(slaveIdStr));
      i++;
      continue;
    }
    if (isCrcPlaceholderToken(t)) {
      i++;
      if (i < tokens.length) return null;
      if (bytes.length < 2) return null;
      const crc2 = crc16Modbus(new Uint8Array(bytes));
      return new Uint8Array([...bytes, crc2 & 255, crc2 >> 8 & 255]);
    }
    if (!/^[0-9a-fA-F]{2}$/.test(t)) return null;
    bytes.push(parseInt(t, 16));
    i++;
  }
  if (bytes.length < 4) return null;
  const body = bytes.slice(0, -2);
  if (!sawSlaveKeyword) body[0] = parseSlaveByte(slaveIdStr);
  const crc = crc16Modbus(new Uint8Array(body));
  return new Uint8Array([...body, crc & 255, crc >> 8 & 255]);
}
function appendCrc(body) {
  const crc = crc16Modbus(new Uint8Array(body));
  return new Uint8Array([...body, crc & 255, crc >> 8 & 255]);
}
function buildWriteSingleRegisterRtu(slaveIdStr, regAddr, valueU16) {
  if (!Number.isFinite(regAddr) || regAddr < 0 || regAddr > 65535) return null;
  const v = Math.round(valueU16) & 65535;
  const slave = parseSlaveByte(slaveIdStr);
  const hi = regAddr >> 8 & 255;
  const lo = regAddr & 255;
  const vhi = v >> 8 & 255;
  const vlo = v & 255;
  return appendCrc([slave, 6, hi, lo, vhi, vlo]);
}
function buildWriteSingleCoilRtu(slaveIdStr, coilAddr, on) {
  if (!Number.isFinite(coilAddr) || coilAddr < 0 || coilAddr > 65535) return null;
  const slave = parseSlaveByte(slaveIdStr);
  const hi = coilAddr >> 8 & 255;
  const lo = coilAddr & 255;
  const vhi = on ? 255 : 0;
  const vlo = 0;
  return appendCrc([slave, 5, hi, lo, vhi, vlo]);
}
const NA = { value: "N/A", color: "#ffffff" };
const FALLBACK = {
  "0": { value: "Inactive", color: "#00ff00" },
  "1": { value: "Active", color: "#ff4444" }
};
const ALARM_MAPPINGS = {
  "Internal Fan 1": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#d00000" } },
  "Internal Fan 2": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#d00000" } },
  "Internal Fan 3": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#d00000" } },
  "External Fan 1": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#d00000" } },
  "External Fan 2": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#d00000" } },
  "External Fan 3": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#d00000" } },
  "Fan 1 Fail": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "Fan 2 Fail": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "Fan 3 Fail": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "Fan 4 Fail": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "Fan 5 Fail": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "Fan 6 Fail": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "All Fan Fail": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "Room Sensor": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "Ambient Sensor": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  Fan: { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "T1 Sensor": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "T2 Sensor": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "Delta T": { "0": { value: "OK", color: "#00ff00" }, "1": { value: "Fail", color: "#ff4444" } },
  "High Temp Alarm": { "0": { value: "Normal", color: "#00ff00" }, "1": { value: "High", color: "#ff4444" } },
  "Low Temp Alarm": { "0": { value: "Normal", color: "#00ff00" }, "1": { value: "Low", color: "#ff9900" } },
  HCT: { "0": { value: "Normal", color: "#00ff00" }, "1": { value: "High", color: "#ff4444" } },
  Smoke: { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff4444" } },
  "Smoke Alarm": { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff4444" } },
  Door: { "0": { value: "Closed", color: "#00ff00" }, "1": { value: "Open", color: "#ff4444" } },
  "Door Open": { "0": { value: "Closed", color: "#00ff00" }, "1": { value: "Open", color: "#ff4444" } },
  "Usys High Alarm": { "0": { value: "Normal", color: "#00ff00" }, "1": { value: "High", color: "#ff4444" } },
  "Usys Low Alarm": { "0": { value: "Normal", color: "#00ff00" }, "1": { value: "Low", color: "#ff9900" } },
  "Machine Status": { "0": { value: "Off", color: "#888888" }, "1": { value: "On", color: "#00ff00" } },
  "Fan On": { "0": { value: "Off", color: "#888888" }, "1": { value: "On", color: "#00ff00" } },
  "Internal Fan 1 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "Internal Fan 2 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "External Fan 1 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "External Fan 2 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "Fan 1 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "Fan 2 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "Fan 3 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "Fan 4 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "Fan 5 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "Fan 6 Status": { "0": { value: "Stopped", color: "#ff0000" }, "1": { value: "Running", color: "#00ff00" } },
  "DIN 1": { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff0000" } },
  "DIN 2": { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff0000" } },
  "DIN 3": { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff0000" } },
  "DIN 4": { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff0000" } },
  "DIN 5": { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff0000" } },
  "DIN 6": { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff0000" } },
  "DIN 7": { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff0000" } },
  "DIN 8": { "0": { value: "Inactive", color: "#00ff00" }, "1": { value: "Active", color: "#ff0000" } },
  Buzzer: { "0": { value: "Off", color: "#888888" }, "1": { value: "On", color: "#ff4444" } },
  "Smoke/Door": { "0": { value: "Closed", color: "#888888" }, "1": { value: "Open", color: "#ff4444" } },
  "HCT/HRT": { "0": { value: "Normal", color: "#00ff00" }, "1": { value: "High", color: "#ff4444" } },
  "Usys Low": { "0": { value: "Normal", color: "#00ff00" }, "1": { value: "Low", color: "#ff9900" } }
};
const INTERNAL_EXTERNAL_FAN_NAMES = /* @__PURE__ */ new Set([
  "Internal Fan 1",
  "Internal Fan 2",
  "Internal Fan 3",
  "External Fan 1",
  "External Fan 2",
  "External Fan 3"
]);
function getAlarmMapping(paramName, bitValue) {
  const row = ALARM_MAPPINGS[paramName];
  const k = String(bitValue);
  if (row?.[k]) return row[k];
  return FALLBACK[k] ?? NA;
}
function getFanStatusDisplay(fanOn, fanStatus) {
  if (fanOn === 0) return { value: "Stopped", color: "#888888" };
  if (fanStatus === 0) return { value: "Running", color: "#00ff00" };
  if (fanStatus === 1) return { value: "Fail", color: "#ff4444" };
  return NA;
}
function getBitIn24(b0, b1, b2, bitPosition) {
  if (bitPosition < 8) return b0 >> bitPosition & 1;
  if (bitPosition < 16) return b1 >> bitPosition - 8 & 1;
  return b2 >> bitPosition - 16 & 1;
}
function parseAlarmBit(b0, b1, b2, bitPosition, paramName) {
  try {
    const bit = getBitIn24(b0, b1, b2, bitPosition);
    return getAlarmMapping(paramName, bit);
  } catch {
    return NA;
  }
}
function dualBitHighLowNormal(valA, valB) {
  if (valA === 1 && valB === 0) return { value: "High", color: "#ff4444" };
  if (valA === 0 && valB === 1) return { value: "Low", color: "#ff9900" };
  if (valA === 0 && valB === 0) return { value: "Normal", color: "#00ff00" };
  return NA;
}
function internalExternalFanDisplay(failBit, runningBit) {
  if (failBit === 1) return { value: "Fail", color: "#d00000" };
  if (failBit === 0 && runningBit === 1) return { value: "Running", color: "#00ff00" };
  if (failBit === 0 && runningBit === 0) return { value: "Stopped", color: "#d00000" };
  return NA;
}
function settingsEnabledDisabledCell(bit) {
  return bit ? { value: "Enabled", color: "#00ff00" } : { value: "Disabled", color: "#888888" };
}
function hexStringToBytes(hex) {
  const parts = hex.trim().split(/\s+/).filter(Boolean);
  const out = [];
  for (const p of parts) {
    if (!/^[0-9a-fA-F]{2}$/.test(p)) return null;
    out.push(parseInt(p, 16));
  }
  return out;
}
function modbusCrcOk(bytes) {
  if (bytes.length < 4) return false;
  const body = new Uint8Array(bytes.slice(0, -2));
  const c = crc16Modbus(body);
  return (c & 255) === bytes[bytes.length - 2] && (c >> 8 & 255) === bytes[bytes.length - 1];
}
function parseReadResponse(bytes) {
  if (bytes.length < 5 || !modbusCrcOk(bytes)) return null;
  const func = bytes[1];
  if (func & 128) return null;
  if (func !== 1 && func !== 2 && func !== 3 && func !== 4) return null;
  const bc = bytes[2];
  if (bytes.length < 5 + bc) return null;
  return { func, data: Uint8Array.from(bytes.slice(3, 3 + bc)) };
}
function wordsFrom03or04(data) {
  const words = [];
  for (let i = 0; i + 1 < data.length; i += 2) {
    words.push((data[i] << 8 | data[i + 1]) & 65535);
  }
  return words;
}
function int16FromWord(u16) {
  const u = u16 & 65535;
  return u > 32767 ? u - 65536 : u;
}
function formatMinutesToHm(totalMinutes) {
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) return "N/A";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${hh} hrs ${mm} min`;
}
function extractLineText(row) {
  const tab = row.indexOf("	");
  return tab >= 0 ? row.slice(tab + 1) : row;
}
function parsePollSerialSnapshots(serialLines, prefix2) {
  let pending = null;
  let holdingWords = null;
  let discreteBytes = null;
  const txQ1 = `[TX ${prefix2}/q1]`;
  const txQ2 = `[TX ${prefix2}/q2]`;
  for (const row of serialLines) {
    const text = extractLineText(row).trim();
    if (text.startsWith(txQ1)) {
      pending = "query1";
      continue;
    }
    if (text.startsWith(txQ2)) {
      pending = "query2";
      continue;
    }
    if (!text.startsWith("[RX] ") || !pending) continue;
    const hex = text.slice(5).trim();
    const bytes = hexStringToBytes(hex);
    if (!bytes) continue;
    const parsed = parseReadResponse(bytes);
    if (!parsed) continue;
    if (pending === "query1" && (parsed.func === 3 || parsed.func === 4)) {
      holdingWords = wordsFrom03or04(parsed.data);
      pending = null;
      continue;
    }
    if (pending === "query2" && (parsed.func === 1 || parsed.func === 2)) {
      discreteBytes = parsed.data;
      pending = null;
    }
  }
  return { holdingWords, discreteBytes };
}
function formatScaledNumber(n) {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const digits = abs >= 100 ? 2 : abs >= 10 ? 3 : 4;
  let s = n.toFixed(digits);
  s = s.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  return s;
}
function parseRegIndices(spec2) {
  const s = String(spec2 ?? "").trim();
  if (!s) return [];
  return s.split(/\s+/).map((x) => parseInt(x, 10)).filter((n) => Number.isFinite(n));
}
function firstRegToken(spec2) {
  const s = String(spec2 ?? "").trim().split(/\s+/)[0];
  if (!s) return null;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : null;
}
function readBitFromCoilByte(coils, physByte, bitInByte) {
  if (physByte < 0 || physByte >= coils.length || bitInByte < 0 || bitInByte > 7) return null;
  return coils[physByte] >> bitInByte & 1;
}
function resolveAlarmBitFromTriple(regTok, coils, triple) {
  if (regTok.length >= 2 && regTok[0] >= 0 && regTok[0] <= 2 && regTok[1] >= 0 && regTok[1] <= 7) {
    const phys = triple[regTok[0]];
    return readBitFromCoilByte(coils, phys, regTok[1]);
  }
  if (regTok.length === 1) {
    const k = regTok[0];
    if (k >= 0 && k <= 23) {
      const seg = k >> 3;
      const bit = k & 7;
      const phys = triple[seg];
      return readBitFromCoilByte(coils, phys, bit);
    }
  }
  return null;
}
function resolveCoilByteAndBit(regTok, coilBytes) {
  const maxB = coilBytes.length;
  if (maxB <= 0 || regTok.length === 0) return null;
  if (regTok.length === 1) {
    const n = regTok[0];
    const bi2 = Math.floor(n / 8);
    const bj2 = n % 8;
    if (bi2 < 0 || bi2 >= maxB) return null;
    return { bi: bi2, bj: bj2 };
  }
  const byteIdx = regTok[0];
  const bitIdx = regTok[1];
  if (bitIdx >= 0 && bitIdx <= 7 && byteIdx >= 0 && byteIdx < maxB) {
    return { bi: byteIdx, bj: bitIdx };
  }
  const linear = regTok[0] * 16 + regTok[1];
  const bi = Math.floor(linear / 8);
  const bj = linear % 8;
  if (bi < 0 || bi >= maxB) return null;
  return { bi, bj };
}
const KNOWN_SPEC_TYPES = /* @__PURE__ */ new Set([
  "int16",
  "float",
  "bit",
  "hide",
  "uint16",
  "ascii",
  "8bit",
  "16bit",
  "string",
  "uint32",
  "concat2",
  "mmdd"
]);
function getSpecMode(spec) {
  if (spec.length >= 6) {
    const t = String(spec[5]).toLowerCase().trim();
    if (KNOWN_SPEC_TYPES.has(t)) return t === "hide" ? "uint16" : t;
  }
  if (spec.length >= 4) {
    const t = String(spec[4]).toLowerCase().trim();
    if (KNOWN_SPEC_TYPES.has(t)) return t === "hide" ? "uint16" : t;
  }
  return "";
}
function scalarFromSpec(paramName, spec, words, coils, alarmDiscreteTriple) {
  if (spec.length < 4) return null;
  const mode = getSpecMode(spec) || (!words && coils ? "bit" : "");
  const mult = parseFloat(String(spec[3]));
  if (!Number.isFinite(mult)) return null;
  const regTok = parseRegIndices(spec[2]);
  if (regTok.length === 0) return null;
  if (mode === "bit") {
    if (!coils?.length) return null;
    if (alarmDiscreteTriple) {
      const fromTriple = resolveAlarmBitFromTriple(regTok, coils, alarmDiscreteTriple);
      if (fromTriple !== null) return fromTriple ? "On" : "Off";
    }
    const addr = resolveCoilByteAndBit(regTok, coils);
    if (!addr) return null;
    const bitVal = coils[addr.bi] >> addr.bj & 1;
    return bitVal ? "On" : "Off";
  }
  if (!words?.length) return null;
  if (mode === "float" && regTok.length >= 2) {
    const i = regTok[0];
    const j = regTok[1];
    if (i < 0 || j < 0 || i >= words.length || j >= words.length) return null;
    const u32 = (words[i] & 65535) << 16 | words[j] & 65535;
    const buf = new ArrayBuffer(4);
    new DataView(buf).setUint32(0, u32 >>> 0, false);
    const f = new DataView(buf).getFloat32(0, false);
    if (!Number.isFinite(f)) return "—";
    return formatScaledNumber(f * mult);
  }
  if (mode === "ascii" || mode === "8bit" || mode === "16bit" || mode === "string") {
    const start = regTok[0];
    const end = regTok.length >= 2 ? regTok[1] : regTok[0];
    if (start < 0 || end < 0) return null;
    const a = Math.min(start, end);
    const b = Math.max(start, end);
    const bytes = [];
    for (let i = a; i <= b; i++) {
      if (i < 0 || i >= words.length) continue;
      const w = words[i] & 65535;
      bytes.push(w >> 8 & 255, w & 255);
    }
    const filtered = bytes.filter((x) => x !== 0);
    if (filtered.length === 0) return "N/A";
    let s = "";
    for (const c of filtered) {
      if (c >= 32 && c <= 126) s += String.fromCharCode(c);
    }
    s = s.trim();
    return s.length ? s : "N/A";
  }
  if (mode === "mmdd") {
    const ri2 = regTok[0];
    if (ri2 < 0 || ri2 >= words.length) return null;
    const v = words[ri2] & 65535;
    const month = Math.floor(v / 100);
    const day = v % 100;
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${mm}-${dd}`;
  }
  if (mode === "concat2" && regTok.length >= 2) {
    const i = regTok[0];
    const j = regTok[1];
    if (i < 0 || j < 0 || i >= words.length || j >= words.length) return null;
    return `${words[i] & 65535}${words[j] & 65535}`;
  }
  if (mode === "uint32" && regTok.length >= 2) {
    const i = regTok[0];
    const j = regTok[1];
    if (i < 0 || j < 0 || i >= words.length || j >= words.length) return null;
    const u32 = ((words[i] & 65535) << 16 | words[j] & 65535) >>> 0;
    const scaled = u32 * mult;
    return formatScaledNumber(scaled);
  }
  if (regTok.length >= 2) {
    const i = regTok[0];
    const j = regTok[1];
    if (i >= 0 && j >= 0 && i < words.length && j < words.length) {
      if (paramName === "Time") {
        const hh = String(words[i] & 65535).padStart(2, "0");
        const mm = String(words[j] & 65535).padStart(2, "0");
        return `${hh}:${mm}`;
      }
      if (paramName === "Hex Running" || paramName === "Run Hours of Only Hex") {
        const totalMinutes = ((words[i] & 65535) << 16 | words[j] & 65535) >>> 0;
        return formatMinutesToHm(totalMinutes);
      }
    }
  }
  if (regTok.length >= 3) {
    const [i, j, k] = regTok;
    if (i >= 0 && j >= 0 && k >= 0 && i < words.length && j < words.length && k < words.length) {
      if (paramName === "Installation Date" || paramName === "Controller's Date") {
        const dd = String(words[i] & 65535).padStart(2, "0");
        const mm = String(words[j] & 65535).padStart(2, "0");
        const yy = String(words[k] & 65535).padStart(2, "0");
        return `${dd}-${mm}-${yy}`;
      }
    }
  }
  const ri = regTok[0];
  if (ri < 0 || ri >= words.length) return null;
  const u = words[ri] & 65535;
  const raw = mode === "int16" ? int16FromWord(u) : u;
  return formatScaledNumber(raw * mult);
}
function cell(d) {
  return { value: d.value, color: d.color };
}
function parseRegTripleFromSpec(spec, fallback) {
  const raw = spec[5];
  if (!Array.isArray(raw) || raw.length < 3) return fallback;
  const nums = raw.map((x) => typeof x === "number" ? x : parseInt(String(x), 10));
  if (!nums.every((n) => Number.isFinite(n) && n >= 0)) return fallback;
  return [Math.floor(nums[0]), Math.floor(nums[1]), Math.floor(nums[2])];
}
function readTripleBytes(coils, triple) {
  return [
    triple[0] < coils.length ? coils[triple[0]] : 0,
    triple[1] < coils.length ? coils[triple[1]] : 0,
    triple[2] < coils.length ? coils[triple[2]] : 0
  ];
}
function parseIntFromLiveScalar(s) {
  const digits = s.replace(/\D/g, "");
  if (digits.length > 0) {
    const n2 = parseInt(digits, 10);
    return Number.isFinite(n2) ? n2 : null;
  }
  const n = parseInt(s.trim(), 10);
  return Number.isFinite(n) ? n : null;
}
function parseNumberOfFans(config, snap) {
  const { groups, queryMapping, alarmDiscreteByteIndices } = config;
  for (const groupKey of Object.keys(groups)) {
    const block = groups[groupKey];
    const spec = block?.number_of_fans;
    if (!block || !Array.isArray(spec)) continue;
    const q = queryMapping[groupKey];
    if (!q) continue;
    const words = q === "query1" ? snap.holdingWords : null;
    const coils = q === "query2" ? snap.discreteBytes : null;
    const triple = groupKey === "alarm_params" ? alarmDiscreteByteIndices : null;
    const raw = scalarFromSpec("number_of_fans", spec, words, coils, triple);
    if (raw === null) continue;
    const n = parseIntFromLiveScalar(raw);
    if (n !== null && n >= 0) return n;
  }
  return null;
}
function applyNumberOfFansOverrides(out, numFans) {
  if (numFans === null || numFans < 0) return;
  const cap = Math.min(6, Math.floor(numFans));
  const muted = { value: "N/A", color: "#888888", nameMuted: true };
  for (let i = cap + 1; i <= 6; i++) {
    out[`Fan ${i} Status`] = { ...muted };
    out[`Fan ${i} Run Hour`] = { ...muted };
  }
}
function applyFanStatusBlock(block, coils, defaultTriple, out, settingsAlarmsBinary) {
  const fanOnSpec = block["Fan On"];
  if (!Array.isArray(fanOnSpec) || fanOnSpec.length < 6 || String(fanOnSpec[5]).trim() !== "fan_status") {
    return false;
  }
  const fanOnPos = firstRegToken(fanOnSpec[2]);
  if (fanOnPos === null || fanOnPos < 0) return false;
  const triple = parseRegTripleFromSpec(fanOnSpec, defaultTriple);
  const [b0, b1, b2] = readTripleBytes(coils, triple);
  const fanOn = getBitIn24(b0, b1, b2, fanOnPos);
  for (let i = 1; i <= 6; i++) {
    const key = `Fan ${i} Status`;
    const sp = block[key];
    if (!Array.isArray(sp)) continue;
    const p = firstRegToken(sp[2]);
    if (p === null || p < 0) continue;
    const st = getBitIn24(b0, b1, b2, p);
    out[key] = settingsAlarmsBinary ? settingsEnabledDisabledCell(st) : cell(getFanStatusDisplay(fanOn, st));
  }
  return true;
}
function alarmDisplayFromQuery1(paramName, spec, words, alarmWordBase) {
  if (spec.length < 4) return null;
  const mode = getSpecMode(spec);
  const mult = parseFloat(String(spec[3]));
  if (!Number.isFinite(mult)) return null;
  const bitPos = firstRegToken(spec[2]);
  if (mode === "bit" && bitPos !== null && bitPos >= 0) {
    let bitVal;
    if (alarmWordBase !== null) {
      if (alarmWordBase >= words.length || bitPos > 15) return null;
      bitVal = words[alarmWordBase] >> bitPos & 1;
    } else {
      const regIdx = Math.floor(bitPos / 16);
      const bitIn = bitPos % 16;
      if (regIdx < 0 || regIdx >= words.length) return null;
      bitVal = words[regIdx] >> bitIn & 1;
    }
    return getAlarmMapping(paramName, bitVal);
  }
  if (mode === "bit") return null;
  const ri = firstRegToken(spec[2]);
  if (ri === null || ri < 0 || ri >= words.length) return null;
  const u = words[ri] & 65535;
  const raw = mode === "int16" ? int16FromWord(u) : u;
  const scaled = raw * mult;
  const bit = scaled !== 0 ? 1 : 0;
  return getAlarmMapping(paramName, bit);
}
function alarmBitFromQuery1(spec, words, alarmWordBase) {
  if (spec.length < 4) return null;
  const mode = getSpecMode(spec);
  const mult = parseFloat(String(spec[3]));
  if (!Number.isFinite(mult)) return null;
  const bitPos = firstRegToken(spec[2]);
  if (mode === "bit" && bitPos !== null && bitPos >= 0) {
    if (alarmWordBase !== null) {
      if (alarmWordBase >= words.length || bitPos > 15) return null;
      return words[alarmWordBase] >> bitPos & 1;
    }
    const regIdx = Math.floor(bitPos / 16);
    const bitIn = bitPos % 16;
    if (regIdx < 0 || regIdx >= words.length) return null;
    return words[regIdx] >> bitIn & 1;
  }
  if (mode === "bit") return null;
  const ri = firstRegToken(spec[2]);
  if (ri === null || ri < 0 || ri >= words.length) return null;
  const u = words[ri] & 65535;
  const raw = mode === "int16" ? int16FromWord(u) : u;
  const scaled = raw * mult;
  return scaled !== 0 ? 1 : 0;
}
function buildModbusLiveDisplayMap(config, snap, liveOptions) {
  const out = {};
  const { groups, queryMapping, alarmDiscreteByteIndices, alarmHoldingBitBaseRegister } = config;
  const defaultDiscreteTriple = alarmDiscreteByteIndices ?? [0, 1, 2];
  const settingsAlarmBits = liveOptions?.settingsAlarmsEnabledDisabled === true;
  for (const groupKey of Object.keys(groups)) {
    const block = groups[groupKey];
    if (!block) continue;
    const q = queryMapping[groupKey];
    if (!q) continue;
    const words = q === "query1" ? snap.holdingWords : null;
    const coils = q === "query2" ? snap.discreteBytes : null;
    if (groupKey === "alarm_params" && q === "query2" && coils?.length) {
      const fanStatusApplied = applyFanStatusBlock(
        block,
        coils,
        defaultDiscreteTriple,
        out,
        settingsAlarmBits
      );
      for (const [paramName, spec] of Object.entries(block)) {
        if (!Array.isArray(spec)) continue;
        if (fanStatusApplied && (paramName === "Fan On" || /^Fan [1-6] Status$/.test(paramName))) {
          continue;
        }
        const regTok = parseRegIndices(spec[2]);
        const mode = getSpecMode(spec);
        const isBit = mode === "bit" || !mode && !words;
        if (!isBit) continue;
        const tripleForParam = parseRegTripleFromSpec(spec, defaultDiscreteTriple);
        const [db0, db1, db2] = readTripleBytes(coils, tripleForParam);
        if (paramName === "Usys" && regTok.length >= 2) {
          const a = getBitIn24(db0, db1, db2, regTok[0]);
          const b = getBitIn24(db0, db1, db2, regTok[1]);
          out[paramName] = settingsAlarmBits ? settingsEnabledDisabledCell(a) : cell(dualBitHighLowNormal(a, b));
          continue;
        }
        if (paramName === "Cabinet Temperature" && regTok.length >= 2) {
          const a = getBitIn24(db0, db1, db2, regTok[0]);
          const b = getBitIn24(db0, db1, db2, regTok[1]);
          out[paramName] = settingsAlarmBits ? settingsEnabledDisabledCell(a) : cell(dualBitHighLowNormal(a, b));
          continue;
        }
        if (INTERNAL_EXTERNAL_FAN_NAMES.has(paramName) && Array.isArray(spec[5]) && spec[5].length >= 3) {
          const failP = firstRegToken(spec[2]);
          const runP = firstRegToken(spec[3]);
          if (failP !== null && runP !== null && failP >= 0 && runP >= 0) {
            const failB = getBitIn24(db0, db1, db2, failP);
            const runB = getBitIn24(db0, db1, db2, runP);
            out[paramName] = settingsAlarmBits ? settingsEnabledDisabledCell(runB) : cell(internalExternalFanDisplay(failB, runB));
            continue;
          }
        }
        if (regTok.length === 1 && regTok[0] >= 0 && regTok[0] <= 23) {
          const bit = getBitIn24(db0, db1, db2, regTok[0]);
          out[paramName] = settingsAlarmBits ? settingsEnabledDisabledCell(bit) : cell(parseAlarmBit(db0, db1, db2, regTok[0], paramName));
          continue;
        }
        if (regTok.length >= 2 && regTok[0] >= 0 && regTok[0] <= 2 && regTok[1] >= 0 && regTok[1] <= 7) {
          const k = regTok[0] * 8 + regTok[1];
          const bit = getBitIn24(db0, db1, db2, k);
          out[paramName] = settingsAlarmBits ? settingsEnabledDisabledCell(bit) : cell(parseAlarmBit(db0, db1, db2, k, paramName));
          continue;
        }
        const addr = resolveCoilByteAndBit(regTok, coils);
        if (addr) {
          const bitVal = coils[addr.bi] >> addr.bj & 1;
          out[paramName] = settingsAlarmBits ? settingsEnabledDisabledCell(bitVal) : cell(getAlarmMapping(paramName, bitVal));
        }
      }
      continue;
    }
    if (groupKey === "alarm_params" && q === "query1" && words?.length) {
      for (const [paramName, spec] of Object.entries(block)) {
        if (!Array.isArray(spec)) continue;
        if (settingsAlarmBits) {
          const bit = alarmBitFromQuery1(spec, words, alarmHoldingBitBaseRegister);
          if (bit !== null) out[paramName] = settingsEnabledDisabledCell(bit);
        } else {
          const ad = alarmDisplayFromQuery1(paramName, spec, words, alarmHoldingBitBaseRegister);
          if (ad) out[paramName] = cell(ad);
        }
      }
      continue;
    }
    const alarmTriple = groupKey === "alarm_params" ? alarmDiscreteByteIndices : null;
    for (const [paramName, spec] of Object.entries(block)) {
      if (!Array.isArray(spec)) continue;
      const v = scalarFromSpec(paramName, spec, words, coils, alarmTriple);
      if (v !== null) out[paramName] = { value: v };
    }
  }
  applyNumberOfFansOverrides(out, parseNumberOfFans(config, snap));
  return out;
}
function computeMonitorLiveValues(serialLines, config) {
  if (!config) return {};
  const snap = parsePollSerialSnapshots(serialLines, "monitor");
  return buildModbusLiveDisplayMap(config, snap);
}
function computeSettingsLiveValues(serialLines, config) {
  if (!config) return {};
  const snap = parsePollSerialSnapshots(serialLines, "settings");
  return buildModbusLiveDisplayMap(config, snap, { settingsAlarmsEnabledDisabled: true });
}
function Dashboard() {
  const { view, serialConnected, serialLines, serialPath, serialBaudRate, serialSlaveId } = useDisplayView();
  if (view === "traffic") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "traffic-log-embed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Traffic,
        {
          connected: serialConnected,
          path: serialPath,
          baudRate: serialBaudRate,
          slaveId: serialSlaveId,
          lines: serialLines
        }
      ) })
    ] });
  }
  const dashboardConfig = getMonitorDashboardConfig(
    localStorage.getItem(STORAGE_MODEL),
    localStorage.getItem(STORAGE_FIRMWARE)
  );
  const groups = dashboardConfig?.groups ?? null;
  const sectionLayout = dashboardConfig?.sectionLayout ?? {};
  const liveByParamName = reactExports.useMemo(() => {
    const cfg = getMonitorDashboardConfig(
      localStorage.getItem(STORAGE_MODEL),
      localStorage.getItem(STORAGE_FIRMWARE)
    );
    return computeMonitorLiveValues(serialLines, cfg);
  }, [serialLines]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Dashboard" }),
    !groups ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "No monitor parameters for the current device. Set ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "model" }),
      " and",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "firmware version" }),
      " (matching ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "products.json" }),
      ") in device setup, then open Monitor again."
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-param-matrix", children: PARAM_MATRIX_RENDER_ORDER.map((groupKey) => {
      const block = groups[groupKey];
      const slot = PARAM_MATRIX_SLOT[groupKey];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "dashboard-param-cell",
          style: { gridRow: slot.row, gridColumn: slot.col },
          children: block && Object.keys(block).length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ParamSectionCard,
            {
              groupKey,
              block,
              layout: sectionLayout[groupKey] ?? DEFAULT_SECTION_LAYOUT,
              liveByParamName
            }
          ) : null
        },
        groupKey
      );
    }) })
  ] });
}
const ASCII_TYPES = /* @__PURE__ */ new Set(["ascii", "8bit", "16bit", "concat2"]);
function firstRegisterIndexFromSpec(spec2) {
  const s = String(spec2 ?? "").trim().split(/\s+/)[0];
  if (!s) return null;
  const n = parseInt(s, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}
function registerRangeFromSpec(spec2) {
  const parts = String(spec2 ?? "").trim().split(/\s+/).map((x) => parseInt(x, 10)).filter((n) => Number.isFinite(n));
  if (parts.length >= 2) {
    const a = parts[0];
    const b = parts[1];
    return { start: Math.min(a, b), end: Math.max(a, b) };
  }
  return null;
}
function looksLikeRangeToken(s) {
  const t = s.trim().toLowerCase();
  return t.includes("-") || /\bto\b/.test(t);
}
function getParameterRangeLabel(spec) {
  if (!Array.isArray(spec) || spec.length < 5) return null;
  for (const idx of [4, 5]) {
    if (idx >= spec.length) continue;
    const rv = spec[idx];
    if (typeof rv === "string" && looksLikeRangeToken(rv)) return rv.trim();
  }
  return null;
}
function parseRangeBounds(rangeStr) {
  const lower = rangeStr.trim().toLowerCase();
  let segments;
  if (/\bto\b/.test(lower)) {
    segments = lower.split(/\bto\b/).map((p) => p.trim());
  } else {
    segments = lower.split("-").map((p) => p.trim()).filter((p) => p.length > 0);
  }
  if (segments.length < 2) return null;
  const min = parseFloat(segments[0]);
  const max = parseFloat(segments[segments.length - 1]);
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return min <= max ? { min, max } : { min: max, max: min };
}
function getDecimalMultiplierFromSpec(spec) {
  if (!Array.isArray(spec) || spec.length < 4) return null;
  const m = parseFloat(String(spec[3]));
  if (!Number.isFinite(m) || m <= 0 || m >= 1) return null;
  return m;
}
function isAsciiLikeSpec(spec) {
  if (!Array.isArray(spec) || spec.length < 5) return false;
  const t4 = String(spec[4]).toLowerCase().trim();
  const t5 = spec.length > 5 ? String(spec[5]).toLowerCase().trim() : "";
  if (ASCII_TYPES.has(t4)) return true;
  if (t5 && ASCII_TYPES.has(t5)) return true;
  return false;
}
function getAsciiStringMode(spec) {
  if (!Array.isArray(spec) || spec.length < 5) return null;
  const t4 = String(spec[4]).toLowerCase().trim();
  const t5 = spec.length > 5 ? String(spec[5]).toLowerCase().trim() : "";
  if (t5 === "16bit" || t4 === "16bit") return "16bit";
  if (t5 === "8bit" || t4 === "8bit") return "8bit";
  if (t5 === "ascii" || t4 === "ascii") return "8bit";
  return null;
}
function getSpecNumericMode(spec) {
  const t5 = spec.length > 5 ? String(spec[5]).toLowerCase().trim() : "";
  const t4 = spec.length > 4 ? String(spec[4]).toLowerCase().trim() : "";
  if (t5 === "int16" || t4 === "int16") return "int16";
  return "uint16";
}
function clampInt16ToU16(n) {
  const r = Math.round(n);
  const c = Math.max(-32768, Math.min(32767, r));
  return c & 65535;
}
function hexToBytes(hex) {
  const parts = hex.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  const out = [];
  for (const p of parts) {
    if (!/^[0-9a-fA-F]{2}$/.test(p)) return null;
    out.push(parseInt(p, 16));
  }
  return out;
}
function createWriteEchoWaiter(expectedPrefix, timeoutMs) {
  let off = null;
  let t = null;
  let done = false;
  const cancel = () => {
    if (done) return;
    done = true;
    if (off) off();
    if (t !== null) window.clearTimeout(t);
  };
  const promise = new Promise((resolve, reject) => {
    let done2 = false;
    const finishOk = () => {
      if (done2) return;
      done2 = true;
      if (off) off();
      if (t !== null) window.clearTimeout(t);
      resolve();
    };
    const finishErr = (err) => {
      if (done2) return;
      done2 = true;
      if (off) off();
      if (t !== null) window.clearTimeout(t);
      reject(err);
    };
    off = window.icms.onSerialData((payload) => {
      const bytes = hexToBytes(payload.hex);
      if (!bytes || bytes.length !== 8) return;
      for (let i = 0; i < expectedPrefix.length; i++) {
        if ((bytes[i] & 255) !== (expectedPrefix[i] & 255)) return;
      }
      finishOk();
    });
    t = window.setTimeout(() => {
      finishErr(new Error("Timed out waiting for device write echo"));
    }, timeoutMs);
  });
  return { promise, cancel };
}
async function writeSettingsAlarmBool(slaveId, query, spec, on) {
  const addr = firstRegisterIndexFromSpec(spec[2]);
  if (addr === null) return { ok: false, error: "Invalid coil/register address in spec" };
  const logTx = { logTx: "settings-alarm" };
  if (query === "query2") {
    const f2 = buildWriteSingleCoilRtu(slaveId, addr, on);
    if (!f2) return { ok: false, error: "Could not build write coil frame" };
    return window.icms.writeSerialBytes([...f2], logTx);
  }
  const f = buildWriteSingleRegisterRtu(slaveId, addr, on ? 1 : 0);
  if (!f) return { ok: false, error: "Could not build write register frame" };
  return window.icms.writeSerialBytes([...f], logTx);
}
async function writeSettingsHoldingUInt16(slaveId, spec, valueU16) {
  const addr = firstRegisterIndexFromSpec(spec[2]);
  if (addr === null) return { ok: false, error: "Invalid register address in spec" };
  const v = Math.round(valueU16) & 65535;
  const f = buildWriteSingleRegisterRtu(slaveId, addr, v);
  if (!f) return { ok: false, error: "Could not build write register frame" };
  return window.icms.writeSerialBytes([...f]);
}
async function writeSettingsAsciiRegisters(slaveId, spec, text, onProgress) {
  const range = registerRangeFromSpec(spec[2]);
  const start = range?.start ?? firstRegisterIndexFromSpec(spec[2]);
  if (start === null) return { ok: false, error: "Invalid register range in spec" };
  const end = range?.end ?? start;
  const numRegs = Math.max(0, end - start + 1);
  const mode = getAsciiStringMode(spec) ?? "8bit";
  const cleaned = String(text ?? "").replaceAll("\0", "").trim();
  const asciiBytes = [];
  for (let i = 0; i < cleaned.length; i++) {
    const code = cleaned.charCodeAt(i);
    asciiBytes.push(code >= 0 && code <= 127 ? code : 63);
  }
  const bytesPerReg = mode === "16bit" ? 2 : 1;
  const maxBytes = numRegs * bytesPerReg;
  const dataByteLen = Math.min(asciiBytes.length, maxBytes);
  const data = asciiBytes.slice(0, maxBytes);
  while (data.length < maxBytes) data.push(0);
  onProgress?.({
    writtenRegisters: 0,
    totalRegisters: numRegs,
    writtenChars: 0,
    totalChars: dataByteLen
  });
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  for (let r = 0; r < numRegs; r++) {
    let regVal = 0;
    if (mode === "16bit") {
      const hi = data[r * 2] ?? 0;
      const lo = data[r * 2 + 1] ?? 0;
      regVal = (hi & 255) << 8 | lo & 255;
    } else {
      regVal = data[r] ?? 0;
    }
    const f = buildWriteSingleRegisterRtu(slaveId, start + r, regVal & 65535);
    if (!f) return { ok: false, error: "Could not build write register frame" };
    const req = [...f];
    const expectedPrefix = req.slice(0, 4);
    const waiter = createWriteEchoWaiter(expectedPrefix, 2500);
    const res = await window.icms.writeSerialBytes(req);
    if (!res.ok) {
      waiter.cancel();
      return res;
    }
    try {
      await waiter.promise;
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
    onProgress?.({
      writtenRegisters: r + 1,
      totalRegisters: numRegs,
      writtenChars: Math.min((r + 1) * bytesPerReg, dataByteLen),
      totalChars: dataByteLen
    });
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }
  return { ok: true };
}
async function writeSettingsNumericRegister(slaveId, spec, rawRegisterInt, mode) {
  const v = mode === "int16" ? clampInt16ToU16(rawRegisterInt) : Math.max(0, Math.min(65535, Math.round(rawRegisterInt)));
  return writeSettingsHoldingUInt16(slaveId, spec, v);
}
function displayLooksEnabled(s) {
  const t = s.trim().toLowerCase();
  return ["enabled", "on", "1", "true", "yes", "active"].includes(t);
}
function SettingsParamEditDialog({
  open,
  onClose,
  paramName,
  spec,
  groupKey,
  displayText,
  slaveId,
  serialConnected,
  queryForGroup
}) {
  const titleId = reactExports.useId();
  const hintId = reactExports.useId();
  const [error, setError] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [writeProgress, setWriteProgress] = reactExports.useState(null);
  const isAlarm = groupKey === "alarm_params";
  const ascii = isAsciiLikeSpec(spec);
  const asciiMode = ascii ? getAsciiStringMode(spec) : null;
  const mult = getDecimalMultiplierFromSpec(spec);
  const rangeLabel = getParameterRangeLabel(spec);
  const rangeBounds = rangeLabel ? parseRangeBounds(rangeLabel) : null;
  const numericMode = getSpecNumericMode(spec);
  const isPassword = paramName.trim().toLowerCase() === "password";
  const hasHint = Boolean(rangeLabel || ascii);
  const inputLabel = mult !== null ? "Value (device units)" : ascii ? "Text" : isPassword ? "Password" : "Value";
  const asciiRange = ascii ? registerRangeFromSpec(spec[2]) : null;
  const asciiStart = ascii ? asciiRange?.start ?? firstRegisterIndexFromSpec(spec[2]) : null;
  const asciiEnd = ascii ? asciiRange?.end ?? asciiStart : null;
  const asciiTotalRegs = ascii && asciiStart !== null && asciiEnd !== null ? Math.max(0, asciiEnd - asciiStart + 1) : 0;
  const [toggleOn, setToggleOn] = reactExports.useState(false);
  const [textInput, setTextInput] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!open) return;
    setError(null);
    setBusy(false);
    setWriteProgress(null);
    if (isAlarm) {
      setToggleOn(displayLooksEnabled(displayText));
    } else if (ascii) {
      setTextInput(displayText.trim());
    } else if (mult !== null && displayText.trim()) {
      const v = parseFloat(displayText.replace(/[^\d.-]/g, ""));
      setTextInput(Number.isFinite(v) ? String(Math.round(v / mult)) : displayText.trim());
    } else {
      setTextInput(displayText.trim());
    }
  }, [open, isAlarm, ascii, mult, displayText]);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, busy]);
  if (!open) return null;
  const runWrite = async () => {
    setError(null);
    if (!serialConnected) {
      setError("Connect serial first.");
      return;
    }
    setBusy(true);
    try {
      if (isAlarm) {
        const res2 = await writeSettingsAlarmBool(slaveId, queryForGroup, spec, toggleOn);
        if (!res2.ok) {
          setError(res2.error);
          return;
        }
        onClose();
        return;
      }
      if (ascii) {
        setWriteProgress({
          writtenRegisters: 0,
          totalRegisters: asciiTotalRegs,
          writtenChars: 0,
          totalChars: asciiMode === "16bit" ? asciiTotalRegs * 2 : asciiTotalRegs
        });
        await new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
        const res2 = await writeSettingsAsciiRegisters(slaveId, spec, textInput, (p) => setWriteProgress(p));
        if (!res2.ok) {
          setError(res2.error);
          return;
        }
        onClose();
        return;
      }
      const rawStr = textInput.trim();
      if (mult !== null) {
        const displayVal = parseFloat(rawStr);
        if (!Number.isFinite(displayVal)) {
          setError("Enter a valid number.");
          return;
        }
        const rawInt2 = Math.round(displayVal / mult);
        const res2 = await writeSettingsNumericRegister(slaveId, spec, rawInt2, "uint16");
        if (!res2.ok) {
          setError(res2.error);
          return;
        }
        onClose();
        return;
      }
      const rawInt = parseInt(rawStr, 10);
      if (!Number.isFinite(rawInt)) {
        setError("Enter a valid integer.");
        return;
      }
      if (rangeBounds) {
        if (rawInt < rangeBounds.min || rawInt > rangeBounds.max) {
          setError(`Value must be between ${rangeBounds.min} and ${rangeBounds.max}.`);
          return;
        }
      }
      const res = await writeSettingsNumericRegister(slaveId, spec, rawInt, numericMode);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      onClose();
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "settings-edit-backdrop",
      role: "presentation",
      onClick: (e) => e.target === e.currentTarget && !busy && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "settings-edit-dialog",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": titleId,
          "aria-describedby": hasHint ? hintId : void 0,
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: titleId, className: "settings-edit-title", children: paramName }),
            hasHint ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: hintId, className: "settings-edit-hint", children: [
              rangeLabel ? `Range: ${rangeLabel}` : "",
              ascii && asciiMode === "16bit" ? "Two characters per register." : ascii ? "One character per register." : ""
            ].filter(Boolean).join(" · ") }) : null,
            busy && ascii && writeProgress && writeProgress.totalRegisters > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-edit-progress", role: "status", "aria-live": "polite", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-edit-progress-line", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-edit-spinner", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "settings-edit-progress-text", children: [
                  "Writing… ",
                  writeProgress.writtenChars,
                  "/",
                  writeProgress.totalChars,
                  " chars · ",
                  writeProgress.writtenRegisters,
                  "/",
                  writeProgress.totalRegisters,
                  " regs"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-edit-progress-track", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "settings-edit-progress-bar",
                  style: {
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        Math.round(writeProgress.writtenRegisters / Math.max(1, writeProgress.totalRegisters) * 100)
                      )
                    )}%`
                  }
                }
              ) })
            ] }) : null,
            isAlarm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-edit-toggle-line", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: `settings-edit-switch ${toggleOn ? "settings-edit-switch--on" : "settings-edit-switch--off"}`,
                  onClick: () => setToggleOn(!toggleOn),
                  disabled: busy,
                  "aria-pressed": toggleOn,
                  "aria-label": toggleOn ? "Enabled. Press to disable." : "Disabled. Press to enable.",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-edit-switch-knob" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-edit-state", children: toggleOn ? "Enabled" : "Disabled" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "settings-edit-field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "settings-edit-label", children: inputLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "settings-edit-input",
                  type: isPassword ? "password" : "text",
                  value: textInput,
                  onChange: (e) => setTextInput(e.target.value),
                  disabled: busy,
                  autoComplete: "off",
                  spellCheck: false
                }
              )
            ] }),
            error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "settings-edit-error", role: "alert", children: error }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "settings-edit-actions", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "settings-edit-btn settings-edit-btn--plain", onClick: onClose, disabled: busy, children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "settings-edit-btn settings-edit-btn--primary", onClick: runWrite, disabled: busy, children: busy ? "Saving…" : isAlarm ? "OK" : "Save" })
            ] })
          ]
        }
      )
    }
  );
}
const SETTINGS_GRID_CLASS = {
  cooling_params: "settings-param-cooling",
  alarm_params: "settings-param-alarm",
  version_params: "settings-param-version"
};
function Settings() {
  const {
    view,
    serialConnected,
    serialLines,
    serialPath,
    serialBaudRate,
    serialSlaveId,
    beginSettingsParamEdit,
    endSettingsParamEdit
  } = useDisplayView();
  const [editTarget, setEditTarget] = reactExports.useState(null);
  reactExports.useEffect(() => {
    return () => endSettingsParamEdit();
  }, [endSettingsParamEdit]);
  const closeParamEdit = () => {
    endSettingsParamEdit();
    setEditTarget(null);
  };
  if (view === "traffic") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "traffic-log-embed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Traffic,
        {
          connected: serialConnected,
          path: serialPath,
          baudRate: serialBaudRate,
          slaveId: serialSlaveId,
          lines: serialLines
        }
      ) })
    ] });
  }
  const settingsConfig = getSettingsDashboardConfig(
    localStorage.getItem(STORAGE_MODEL),
    localStorage.getItem(STORAGE_FIRMWARE)
  );
  const groups = settingsConfig?.groups ?? null;
  const sectionLayout = settingsConfig?.sectionLayout ?? {};
  const liveByParamName = reactExports.useMemo(() => {
    const cfg = getSettingsDashboardConfig(
      localStorage.getItem(STORAGE_MODEL),
      localStorage.getItem(STORAGE_FIRMWARE)
    );
    return computeSettingsLiveValues(serialLines, cfg);
  }, [serialLines]);
  const platform = typeof window !== "undefined" && window.icms?.platform ? window.icms.platform : "unknown";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Settings" }),
    !groups ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "No device settings parameters for the current device. Set ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "model" }),
        " and",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "firmware version" }),
        " (matching ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "products.json" }),
        ") in device setup, then open Settings again."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card settings-app-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Application" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Platform: ",
          platform,
          ". App preferences and configuration can go here."
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-param-matrix", children: SETTINGS_PARAM_MATRIX_ORDER.map((groupKey) => {
        const block = groups[groupKey];
        if (!block || Object.keys(block).length === 0) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `dashboard-param-cell ${SETTINGS_GRID_CLASS[groupKey]}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ParamSectionCard,
              {
                groupKey,
                block,
                layout: sectionLayout[groupKey] ?? DEFAULT_SECTION_LAYOUT,
                liveByParamName,
                interactive: true,
                onParamRowClick: (p) => {
                  beginSettingsParamEdit();
                  setEditTarget({ groupKey, ...p });
                }
              }
            )
          },
          groupKey
        );
      }) }),
      editTarget ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsParamEditDialog,
        {
          open: true,
          onClose: closeParamEdit,
          paramName: editTarget.paramName,
          spec: editTarget.spec,
          groupKey: editTarget.groupKey,
          displayText: editTarget.displayText,
          slaveId: serialSlaveId,
          serialConnected,
          queryForGroup: settingsConfig?.queryMapping[editTarget.groupKey]
        }
      ) : null
    ] })
  ] });
}
const Logs = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Logs" });
};
function IconLock() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "profile-tile-icon-svg", viewBox: "0 0 24 24", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 0 1 6 0v3H9zm2 6.25a1.25 1.25 0 1 1 2.5 0v1a1.25 1.25 0 1 1-2.5 0v-1z"
    }
  ) });
}
function IconDeviceCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "profile-tile-icon-svg", viewBox: "0 0 24 24", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm2 0v12h12V6H6zm2 2h8v2H8V8zm0 4h5v2H8v-2z"
    }
  ) });
}
function IconArrow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "profile-tile-arrow-svg", viewBox: "0 0 24 24", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      fill: "currentColor",
      d: "M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.75.75 0 1 1 1.06-1.06l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0z"
    }
  ) });
}
const tiles = [
  {
    to: "/setup",
    title: "PIN & access code",
    description: "Full-screen setup flow with verification code and a new 4-digit PIN setup.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconLock, {})
  },
  {
    to: "/card",
    title: "Device & default card",
    description: "Setup default card. Select the device model and firmware version.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDeviceCard, {})
  }
];
const Profile = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "profile-hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "profile-eyebrow", children: "ICMS workspace" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "profile-heading", children: "Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "profile-lead", children: "Security and device identity for this installation. Use the shortcuts below when you need to change PIN verification or how your default card is applied." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "profile-hero-rule", "aria-hidden": true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "profile-grid", role: "list", children: tiles.map(({ to, title, description, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "profile-grid-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "profile-tile", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-tile-icon-wrap", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "profile-tile-copy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-tile-title", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-tile-desc", children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "profile-tile-arrow-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrow, {}) })
    ] }) }, to)) })
  ] });
};
const Auth = () => {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = reactExports.useState("");
  const [enteredCode, setEnteredCode] = reactExports.useState("");
  const [newPin, setNewPin] = reactExports.useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = reactExports.useState(["", "", "", ""]);
  const [showNewPin, setShowNewPin] = reactExports.useState(false);
  const newPinRefs = reactExports.useRef([]);
  const confirmPinRefs = reactExports.useRef([]);
  reactExports.useEffect(() => {
    const generatedCode = Math.floor(1e3 + Math.random() * 9e3).toString();
    setAccessCode(generatedCode);
    if (localStorage.getItem("PinSetup") === null) {
      localStorage.setItem("PinSetup", "false");
    }
  }, []);
  const getComputedAuthorizationCode = (code) => {
    if (code.length !== 4) {
      return "";
    }
    const digits = code.split("").map((digit) => Number(digit));
    const computedValue = digits[0] * digits[3] + (digits[1] + digits[2]);
    return String(computedValue);
  };
  const expectedAuthorizationCode = getComputedAuthorizationCode(accessCode);
  const isAuthorizationCodeValid = enteredCode.length > 0 && expectedAuthorizationCode.length > 0 && enteredCode === expectedAuthorizationCode;
  const handlePinChange = (value, index2, pin, setPin, refs) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(-1);
    const updatedPin = [...pin];
    updatedPin[index2] = sanitizedValue;
    setPin(updatedPin);
    if (sanitizedValue && index2 < refs.current.length - 1) {
      refs.current[index2 + 1]?.focus();
    }
  };
  const handlePinKeyDown = (event, index2, pin, refs) => {
    if (event.key === "Backspace" && !pin[index2] && index2 > 0) {
      refs.current[index2 - 1]?.focus();
    }
  };
  const newPinValue = newPin.join("");
  const confirmPinValue = confirmPin.join("");
  const isPinValid = newPinValue.length === 4 && confirmPinValue.length === 4 && newPinValue === confirmPinValue;
  const encryptPin = async (pin) => {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode("icms-local-pin-key"),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("icms-pin-salt"),
        iterations: 1e5,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(pin)
    );
    const encryptedArray = Array.from(new Uint8Array(encryptedBuffer));
    return JSON.stringify({
      iv: Array.from(iv),
      data: encryptedArray
    });
  };
  const handleSubmit = async () => {
    if (!isAuthorizationCodeValid || !isPinValid) {
      return;
    }
    const encryptedPin = await encryptPin(confirmPinValue);
    localStorage.setItem("encrypted_pin", encryptedPin);
    localStorage.setItem("PinSetup", "true");
    navigate("/login");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Setup Your PIN" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "auth-subtitle", children: "Create a secure 4-digit UPI style PIN to continue." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-code-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "auth-code-input",
          type: "text",
          inputMode: "numeric",
          placeholder: "Enter authorization code",
          value: enteredCode,
          maxLength: 2,
          onChange: (e) => setEnteredCode(e.target.value.replace(/\D/g, "").slice(0, 2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "auth-generated-code", children: [
        "Access Code: ",
        accessCode
      ] })
    ] }),
    enteredCode.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `auth-code-status ${isAuthorizationCodeValid ? "valid" : "invalid"}`, children: isAuthorizationCodeValid ? " ✅ Authorization code matched - You are authorized to proceed" : "❌ Wrong code" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "auth-help-text", children: "For assistance in obtaining the authorization code, contact Sunshine Powertronics Pvt. Ltd. customer support at +91 93730 91580." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pin-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "auth-section-title", children: "Enter New PIN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pin-grid-with-toggle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pin-grid", children: newPin.map((digit, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: (el) => {
                newPinRefs.current[index2] = el;
              },
              className: "pin-input",
              type: showNewPin ? "text" : "password",
              inputMode: "numeric",
              maxLength: 1,
              value: digit,
              disabled: !isAuthorizationCodeValid,
              onChange: (e) => handlePinChange(e.target.value, index2, newPin, setNewPin, newPinRefs),
              onKeyDown: (e) => handlePinKeyDown(e, index2, newPin, newPinRefs)
            },
            `new-${index2}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "pin-visibility-toggle",
              disabled: !isAuthorizationCodeValid,
              onClick: () => setShowNewPin((prev) => !prev),
              "aria-label": showNewPin ? "Hide new PIN" : "Show new PIN",
              children: showNewPin ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 5.08A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7-1 2.24-2.77 4.12-5 5.26M6.61 6.61C4.2 7.87 2.31 9.79 1 12c1.73 3.89 6 7 11 7 1.73 0 3.37-.37 4.84-1.03",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  fill: "none"
                }
              ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M1 12c1.73-3.89 6-7 11-7s9.27 3.11 11 7c-1.73 3.89-6 7-11 7S2.73 15.89 1 12z",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "none"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "2", fill: "none" })
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "auth-section-title", children: "Confirm PIN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pin-grid", children: confirmPin.map((digit, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: (el) => {
              confirmPinRefs.current[index2] = el;
            },
            className: "pin-input",
            type: "password",
            inputMode: "numeric",
            maxLength: 1,
            value: digit,
            disabled: !isAuthorizationCodeValid,
            onChange: (e) => handlePinChange(e.target.value, index2, confirmPin, setConfirmPin, confirmPinRefs),
            onKeyDown: (e) => handlePinKeyDown(e, index2, confirmPin, confirmPinRefs)
          },
          `confirm-${index2}`
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "auth-submit", disabled: !isAuthorizationCodeValid || !isPinValid, onClick: handleSubmit, children: "Set PIN" })
  ] });
};
function DefaultCard() {
  const navigate = useNavigate();
  const products2 = productsData.products;
  const [productName, setProductName] = reactExports.useState("");
  const [versionName, setVersionName] = reactExports.useState("");
  const [saveStatus, setSaveStatus] = reactExports.useState("idle");
  const selectedProduct = reactExports.useMemo(
    () => products2.find((p) => p.product_name === productName),
    [productName, products2]
  );
  const versionOptions = selectedProduct?.versions ?? [];
  const versionDisabled = versionOptions.length === 0;
  const canSave = Boolean(productName.trim() && versionName.trim());
  reactExports.useEffect(() => {
    setVersionName("");
  }, [productName]);
  reactExports.useEffect(() => {
    setSaveStatus("idle");
  }, [productName, versionName]);
  function persistConfiguration() {
    const model = productName.trim();
    const firmware = versionName.trim();
    if (!model || !firmware) return;
    try {
      localStorage.setItem(STORAGE_MODEL, model);
      localStorage.setItem(STORAGE_FIRMWARE, firmware);
      localStorage.setItem(STORAGE_CONFIGURED, "true");
      navigate("/dashboard");
    } catch {
      setSaveStatus("error");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!canSave) return;
    persistConfiguration();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "default-card-page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "default-card-inner", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "default-card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "default-card-eyebrow", children: "Configuration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "default-card-title", children: "Device profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "default-card-lead", children: "Pick your product and firmware version." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "default-card-form", onSubmit: handleSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "default-card-fields", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "default-card-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "default-card-field-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "default-card-field-label", children: "Model Name" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "default-card-select",
              value: productName,
              onChange: (e) => setProductName(e.target.value),
              "aria-label": "Product model",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Choose a model name…" }),
                products2.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.product_name, children: p.product_name }, p.product_name))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "default-card-field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "default-card-field-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "default-card-field-label", children: "Firmware Version" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "default-card-select",
              value: versionName,
              onChange: (e) => setVersionName(e.target.value),
              disabled: versionDisabled,
              "aria-label": "Firmware version",
              children: versionDisabled ? /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Choose a product first…" }) : [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select version name" }, "_version-placeholder"),
                ...versionOptions.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: v.version, children: [
                  v.version,
                  v.is_default ? " · default" : ""
                ] }, `${v.version}-${i}`))
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "default-card-save", disabled: !canSave, children: "Save configuration" }),
      saveStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "default-card-save-feedback default-card-save-feedback--err", role: "alert", children: "Could not save. Storage may be unavailable." })
    ] })
  ] }) });
}
const FAQ_PAIRS = [
  {
    q: "What if I forget my PIN?",
    a: "If you forget your PIN, click on 'Forget PIN' and call the support number to get your access code for resetting the PIN."
  },
  {
    q: "How do I connect to my equipment?",
    a: "The system uses serial communication (RS485/Modbus). Ensure your equipment is properly connected via the designated communication port and that the correct product configuration is selected."
  },
  {
    q: "What products are supported?",
    a: "The system supports multiple product types including EICS141, EICS114, EICS42, and many more variants. Each product has specific parameter configurations and communication protocols."
  },
  {
    q: "How do I interpret alarm conditions?",
    a: "Alarm conditions are displayed in the Monitor section. Red indicators show active alarms such as temperature limits, fan failures, or power issues. Check the Settings section for alarm threshold configurations."
  },
  {
    q: "Can I export monitoring data?",
    a: "Yes, the system maintains logs of all monitoring data. Access the Logs section to view historical data and system events for analysis and reporting purposes."
  },
  {
    q: "Is the system secure?",
    a: "Yes, the system implements multiple security layers including PIN-based authentication, device binding, and encrypted local storage to ensure only authorized access to your equipment."
  }
];
function HelpFaqItem({ question, answer, index: index2 }) {
  const baseId = reactExports.useId();
  const panelId = `${baseId}-panel-${index2}`;
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "help-faq-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "help-faq-q",
        "aria-expanded": open,
        "aria-controls": panelId,
        id: `${baseId}-btn-${index2}`,
        onClick: () => setOpen((v) => !v),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "help-faq-arrow", "aria-hidden": true, children: open ? "▼" : "▶" }),
          question
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: panelId,
        role: "region",
        "aria-labelledby": `${baseId}-btn-${index2}`,
        className: `help-faq-a${open ? " help-faq-a--open" : ""}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "help-faq-a-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: answer }) })
      }
    )
  ] });
}
function Help() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "help-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "help-doc-title", children: "ICMS Help & Documentation" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "help-section", "aria-labelledby": "help-overview", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "help-overview", className: "help-section-title", children: "Application overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "help-prose", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The ICMS (Industrial Control and Security Management) system is a comprehensive desktop application designed for monitoring and controlling industrial equipment. This system provides real-time monitoring of various parameters including temperature, power consumption, fan operations, and alarm conditions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "help-em", children: "Key capabilities" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "help-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Real-time monitoring of cooling systems and environmental parameters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Power management and energy consumption tracking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Comprehensive alarm and fault detection system" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Secure PIN-based authentication with device binding" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Multi-product support with configurable parameters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Professional dark theme interface optimized for industrial environments" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "help-rule" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "help-section", "aria-labelledby": "help-started", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "help-started", className: "help-section-title", children: "Getting started" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "help-prose", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "help-subtitle", children: "First time setup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "help-list help-list--ordered", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Launch the application:" }),
            " Run the ICMS application from your desktop or start menu."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "PIN setup:" }),
            " Enter a 4-digit PIN of your choice for secure access."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Confirm PIN:" }),
            " Re-enter the same 4-digit PIN to confirm."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Access code:" }),
            " To get the access code, contact Sunshine Powertronics Pvt. Ltd. customer support at",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+919373091580", className: "help-tel", children: "+91 93730 91580" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Complete setup:" }),
            " Use the PIN setup action to finalize your security configuration."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "help-subtitle", children: "Daily usage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "help-list help-list--ordered", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Launch application:" }),
            " Start the ICMS application."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Enter PIN:" }),
            " Input your 4-digit PIN."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Access dashboard:" }),
            " Upon successful authentication, you will reach the main dashboard."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Navigate:" }),
            " Use the sidebar to access different monitoring sections."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "help-rule" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "help-section", "aria-labelledby": "help-features", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "help-features", className: "help-section-title", children: "Features guide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "help-prose", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "help-subtitle", children: "Dashboard / monitor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The main monitoring interface displays real-time data from your connected equipment:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "help-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cooling and monitoring parameters:" }),
            " Cabinet temperature (T1), ambient temperature (T2), and temperature difference (Δt)."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Alarms:" }),
            " Various alarms are displayed in the Monitor section."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Power management:" }),
            " System voltage, current, power consumption, and energy usage."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Version information:" }),
            " Operating status and performance metrics."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "help-subtitle", children: "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Configure system parameters and alarm thresholds:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "help-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Temperature settings:" }),
            " High/low alarm points, heat exchanger parameters."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Fan configuration:" }),
            " Duty limits, idle speeds, failure responses."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Power settings:" }),
            " Voltage alarm thresholds, power-on delays."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Security:" }),
            " Password protection and access controls."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "help-subtitle", children: "Debug & logs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Advanced diagnostic tools for system maintenance:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "help-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Debug mode:" }),
            " Raw data monitoring and communication diagnostics."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "System logs:" }),
            " Historical data, alarm records, and system events."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Troubleshooting:" }),
            " Connection status and error diagnostics."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "help-rule" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "help-section", "aria-labelledby": "help-trouble", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "help-trouble", className: "help-section-title", children: "Troubleshooting" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "help-prose", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "help-subtitle help-subtitle--warn", children: "Connection issues" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "help-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "No data display:" }),
            " Check serial port connections and ensure correct COM port selection."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Communication errors:" }),
            " Verify Modbus settings, baud rate, and device address."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Port not found:" }),
            " Install proper drivers and check device manager for port availability."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "help-subtitle help-subtitle--warn", children: "Authentication problems" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "help-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "PIN not accepted:" }),
            " Ensure you are entering the correct 4-digit PIN."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Device binding issues:" }),
            " The PIN is tied to your specific device for security."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "help-subtitle help-subtitle--warn", children: "Display issues" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "help-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Missing parameters:" }),
            " Verify product configuration matches your equipment."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Incorrect values:" }),
            " Check scaling factors and unit conversions in settings."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Interface problems:" }),
            " Try restarting the application or checking system compatibility."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "help-subtitle help-subtitle--warn", children: "Performance issues" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "help-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Slow response:" }),
            " Check system resources and close unnecessary applications."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Data lag:" }),
            " Verify communication speed settings and network stability."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Memory usage:" }),
            " Clear logs periodically to maintain optimal performance."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "help-rule" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "help-section", "aria-labelledby": "help-faq", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "help-faq", className: "help-section-title", children: "Frequently asked questions" }),
      FAQ_PAIRS.map((pair, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HelpFaqItem, { question: pair.q, answer: pair.a, index: i }, pair.q))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "help-footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "© 2026 Sunshine Powertronics Pvt. Ltd." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "help-footer-version", children: "SW version 2.7.21" })
    ] })
  ] });
}
function SectionPage() {
  const { sectionName } = useParams();
  const title = sectionName ? decodeURIComponent(sectionName) : "Section";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This section is not wired to a dedicated page yet." }) })
  ] });
}
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React$2.createContext && /* @__PURE__ */ React$2.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ React$2.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React$2.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React$2.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React$2.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React$2.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function MdClose(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" }, "child": [] }, { "tag": "path", "attr": { "d": "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }, "child": [] }] })(props);
}
function MdUsbOff(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" }, "child": [] }, { "tag": "path", "attr": { "d": "M15 8h4v4h-1v2c0 .34-.08.66-.23.94L16 13.17V12h-1V8zm-4 .17 2 2V6h2l-3-4-3 4h2v2.17zM13 16v2.28c.6.34 1 .98 1 1.72 0 1.1-.9 2-2 2s-2-.9-2-2c0-.74.4-1.37 1-1.72V16H8c-1.11 0-2-.89-2-2v-2.28c-.6-.34-1-.98-1-1.72 0-.59.26-1.13.68-1.49L1.39 4.22 2.8 2.81l18.38 18.38-1.41 1.41-6.6-6.6H13zm-2-2v-.17l-2.51-2.51c-.14.16-.31.29-.49.4V14h3z" }, "child": [] }] })(props);
}
function MdUsb(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" }, "child": [] }, { "tag": "path", "attr": { "d": "M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2.07c.7-.37 1.2-1.08 1.2-1.93 0-1.21-.99-2.2-2.2-2.2-1.21 0-2.2.99-2.2 2.2 0 .85.5 1.56 1.2 1.93V13c0 1.11.89 2 2 2h3v3.05c-.71.37-1.2 1.1-1.2 1.95a2.2 2.2 0 0 0 4.4 0c0-.85-.49-1.58-1.2-1.95V15h3c1.11 0 2-.89 2-2v-2h1V7h-4z" }, "child": [] }] })(props);
}
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false
};
function SidebarNavIcon({ to, label }) {
  const l = label.trim().toLowerCase();
  if (to === "/dashboard" || l === "monitor") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...iconProps, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 21h8M12 17v4" })
    ] });
  }
  if (to === "/settings" || l === "settings") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...iconProps, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0" })
    ] });
  }
  if (to === "/logs" || l === "logs") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...iconProps, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14 2v6h6M16 13H8M16 17H8M10 9H8" })
    ] });
  }
  if (to === "/help" || l === "help") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...iconProps, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" })
    ] });
  }
  if (to === "/profile" || l === "profile") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...iconProps, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "7", r: "4" })
    ] });
  }
  if (to === "/login" || l === "logout") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...iconProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" }) });
  }
  if (to.startsWith("/section/")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...iconProps, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { ...iconProps, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 16v-4M12 8h.01" })
  ] });
}
const OPTION_ROUTE = {
  monitor: "/dashboard",
  settings: "/settings",
  logs: "/logs",
  help: "/help"
};
function routeForOptionName(name) {
  const k = name.trim().toLowerCase();
  return OPTION_ROUTE[k] ?? `/section/${encodeURIComponent(name.trim())}`;
}
function defaultProductNav() {
  return [
    { to: "/dashboard", label: "Monitor", key: "Monitor" },
    { to: "/settings", label: "Settings", key: "Settings" },
    { to: "/logs", label: "Logs", key: "Logs" },
    { to: "/help", label: "Help", key: "Help" }
  ];
}
function getProductNavFromStorage() {
  const model = localStorage.getItem(STORAGE_MODEL)?.trim();
  const firmware = localStorage.getItem(STORAGE_FIRMWARE)?.trim();
  if (!model || !firmware) {
    return defaultProductNav();
  }
  const product = productsData.products.find((p) => p.product_name === model);
  const version = product?.versions.find((v) => v.version === firmware);
  const params = version?.sidebar_params;
  if (!params?.length) {
    return defaultProductNav();
  }
  const seen = /* @__PURE__ */ new Set();
  const items = [];
  for (const entry of params) {
    const label = entry.option_name;
    if (!label || seen.has(label)) continue;
    seen.add(label);
    items.push({
      to: routeForOptionName(label),
      label,
      key: label
    });
  }
  return items.length > 0 ? items : defaultProductNav();
}
const tailNavItems = [
  { to: "/profile", label: "Profile", key: "__profile" },
  { to: "/login", label: "Logout", key: "__logout" }
];
const BAUD_RATES = [1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600];
const MONITOR_POLL_MS = 600;
function serialPortFieldCopy(platform) {
  if (platform === "win32") {
    return { label: "COM / serial port", selectPlaceholder: "Select COM port" };
  }
  return { label: "Serial port", selectPlaceholder: "Select serial port" };
}
function ConnectModal({
  open,
  onClose,
  onConnected
}) {
  const [ports, setPorts] = reactExports.useState([]);
  const [portsLoading, setPortsLoading] = reactExports.useState(false);
  const [portPath, setPortPath] = reactExports.useState("");
  const [slaveId, setSlaveId] = reactExports.useState("");
  const [baudRate, setBaudRate] = reactExports.useState(9600);
  const [connectBusy, setConnectBusy] = reactExports.useState(false);
  const [connectError, setConnectError] = reactExports.useState(null);
  const { label: portFieldLabel, selectPlaceholder } = serialPortFieldCopy(window.icms.platform);
  reactExports.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setPortsLoading(true);
    const run = async () => {
      try {
        const list = await window.icms.listSerialPorts();
        if (!cancelled) setPorts(Array.isArray(list) ? list : []);
      } catch {
        if (!cancelled) setPorts([]);
      } finally {
        if (!cancelled) setPortsLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) {
      setPortPath("");
      setSlaveId("");
      setBaudRate(9600);
      setConnectError(null);
      setConnectBusy(false);
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const canConnect = Boolean(portPath) && !portsLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "connect-modal-backdrop", role: "presentation", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "connect-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "connect-modal-title",
      "aria-describedby": "connect-modal-desc",
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connect-modal-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connect-modal-header-text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "connect-modal-icon-badge", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MdUsb, { className: "connect-modal-header-icon" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "connect-modal-title", className: "connect-modal-title", children: "Serial connection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "connect-modal-desc", className: "connect-modal-subtitle", children: "Select an available port and settings for your device." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "connect-modal-dismiss",
              "aria-label": "Close dialog",
              onClick: onClose,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(MdClose, { className: "connect-modal-dismiss-icon", "aria-hidden": true })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "connect-modal-form", onSubmit: (e) => e.preventDefault(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connect-modal-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connect-modal-field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "connect-modal-label", htmlFor: "connect-serial-port", children: portFieldLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "connect-serial-port",
                  className: "connect-modal-select",
                  value: portPath,
                  onChange: (e) => setPortPath(e.target.value),
                  disabled: portsLoading || !portsLoading && ports.length === 0,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: portsLoading ? "Scanning for ports…" : ports.length === 0 ? "No serial ports detected" : selectPlaceholder }),
                    ports.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.path, children: p.label }, p.path))
                  ]
                }
              ),
              !portsLoading && ports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "connect-modal-hint", children: "Connect a USB serial adapter and reopen this dialog." }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connect-modal-row2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connect-modal-field connect-modal-field--compact", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "connect-modal-label", htmlFor: "connect-slave-id", children: "Slave ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "connect-slave-id",
                    className: "connect-modal-input",
                    type: "text",
                    inputMode: "numeric",
                    autoComplete: "off",
                    placeholder: "1–247",
                    value: slaveId,
                    onChange: (e) => setSlaveId(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connect-modal-field connect-modal-field--compact", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "connect-modal-label", htmlFor: "connect-baud", children: "Baud rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "connect-baud",
                    className: "connect-modal-select",
                    value: baudRate,
                    onChange: (e) => setBaudRate(Number(e.target.value)),
                    children: BAUD_RATES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b, children: b }, b))
                  }
                )
              ] })
            ] })
          ] }),
          connectError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "connect-modal-error", children: connectError }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connect-modal-footer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "connect-modal-btn connect-modal-btn--secondary",
                disabled: connectBusy,
                onClick: onClose,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "connect-modal-btn connect-modal-btn--primary",
                disabled: !canConnect || connectBusy,
                onClick: async () => {
                  setConnectError(null);
                  setConnectBusy(true);
                  try {
                    const result = await window.icms.openSerialPort({
                      path: portPath,
                      baudRate,
                      slaveId: slaveId.trim()
                    });
                    if (!result.ok) {
                      setConnectError(result.error);
                      return;
                    }
                    onConnected({
                      path: result.path,
                      baudRate: result.baudRate,
                      slaveId: result.slaveId
                    });
                    onClose();
                  } catch (e) {
                    setConnectError(e instanceof Error ? e.message : "Could not open port");
                  } finally {
                    setConnectBusy(false);
                  }
                },
                children: connectBusy ? "Connecting…" : "Connect"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function RootRedirect() {
  return localStorage.getItem("PinSetup") === "true" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login", replace: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Auth, {});
}
function renderNavLink(item) {
  const { to, label, key } = item;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    NavLink,
    {
      to,
      className: ({ isActive }) => isActive ? "nav-link active" : "nav-link",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-link-icon", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarNavIcon, { to, label }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-link-label", children: label })
      ]
    },
    key
  );
}
function SidebarLogoutButton({ label }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "nav-link nav-link--logout",
      onClick: () => navigate("/login", { replace: true }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-link-icon", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarNavIcon, { to: "/login", label }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "nav-link-label", children: label })
      ]
    }
  );
}
function AppLayout() {
  const location = useLocation();
  const storedModel = localStorage.getItem(STORAGE_MODEL)?.trim() ?? "";
  const storedFirmware = localStorage.getItem(STORAGE_FIRMWARE)?.trim() ?? "";
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [connectOpen, setConnectOpen] = reactExports.useState(false);
  const [serialSession, setSerialSession] = reactExports.useState(null);
  const [serialLines, setSerialLines] = reactExports.useState([]);
  const serialLineKey = reactExports.useRef(0);
  const settingsPollHoldRef = reactExports.useRef(false);
  const [settingsParamEditBlocksPoll, setSettingsParamEditBlocksPoll] = reactExports.useState(false);
  const beginSettingsParamEdit = reactExports.useCallback(() => {
    settingsPollHoldRef.current = true;
    setSettingsParamEditBlocksPoll(true);
  }, []);
  const endSettingsParamEdit = reactExports.useCallback(() => {
    settingsPollHoldRef.current = false;
    setSettingsParamEditBlocksPoll(false);
  }, []);
  const [displayView, setDisplayView] = reactExports.useState("data");
  const [toolbarNow, setToolbarNow] = reactExports.useState(() => /* @__PURE__ */ new Date());
  const productNav = getProductNavFromStorage();
  reactExports.useEffect(() => {
    const id = window.setInterval(() => setToolbarNow(/* @__PURE__ */ new Date()), 1e3);
    return () => window.clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    return window.icms.onDisplayView((view) => setDisplayView(view));
  }, []);
  reactExports.useEffect(() => {
    const offData = window.icms.onSerialData(({ hex }) => {
      serialLineKey.current += 1;
      const id = serialLineKey.current;
      setSerialLines((prev) => {
        const next = [...prev, `${id}	[RX] ${hex}`];
        return next.length > 500 ? next.slice(-500) : next;
      });
    });
    const offErr = window.icms.onSerialError((msg) => {
      serialLineKey.current += 1;
      const id = serialLineKey.current;
      setSerialLines((prev) => {
        const next = [...prev, `${id}	[error] ${msg}`];
        return next.length > 500 ? next.slice(-500) : next;
      });
    });
    return () => {
      offData();
      offErr();
    };
  }, []);
  reactExports.useEffect(() => {
    if (location.pathname !== "/settings" && location.pathname !== "/dashboard") return;
    setSerialLines([]);
    serialLineKey.current = 0;
  }, [location.pathname]);
  reactExports.useEffect(() => {
    if (location.pathname !== "/settings") {
      endSettingsParamEdit();
    }
  }, [location.pathname, endSettingsParamEdit]);
  reactExports.useEffect(() => {
    if (!serialSession) return;
    const path = location.pathname;
    const pollSettings = path === "/settings";
    const pollMonitor = path === "/dashboard";
    if (!pollSettings && !pollMonitor) return;
    if (pollSettings && settingsParamEditBlocksPoll) return;
    const model = localStorage.getItem(STORAGE_MODEL);
    const fw = localStorage.getItem(STORAGE_FIRMWARE);
    const templates = pollSettings ? getSettingsQueryTemplates(model, fw) : getMonitorQueryTemplates(model, fw);
    if (!templates) return;
    const labelPrefix = pollSettings ? "settings" : "monitor";
    const frames = [];
    if (templates.query1) {
      const f = buildModbusRtuFrame(templates.query1, serialSession.slaveId);
      if (f) frames.push({ label: `${labelPrefix}/q1`, bytes: [...f] });
    }
    if (templates.query2) {
      const f = buildModbusRtuFrame(templates.query2, serialSession.slaveId);
      if (f) frames.push({ label: `${labelPrefix}/q2`, bytes: [...f] });
    }
    if (frames.length === 0) return;
    let step = 0;
    let pollId;
    let cancelled = false;
    const pushLine = (text) => {
      serialLineKey.current += 1;
      const id = serialLineKey.current;
      setSerialLines((prev) => {
        const next = [...prev, `${id}	${text}`];
        return next.length > 500 ? next.slice(-500) : next;
      });
    };
    const tick = async () => {
      if (pollSettings && settingsPollHoldRef.current) return;
      const { label, bytes } = frames[step % frames.length];
      step += 1;
      const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join(" ");
      pushLine(`[TX ${label}] ${hex}`);
      const res = await window.icms.writeSerialBytes(bytes);
      if (!res.ok) pushLine(`[TX ${label} failed] ${res.error}`);
    };
    const start = window.setTimeout(() => {
      if (cancelled) return;
      void tick();
      pollId = window.setInterval(() => void tick(), MONITOR_POLL_MS);
    }, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
      if (pollId !== void 0) window.clearInterval(pollId);
    };
  }, [serialSession, location.pathname, settingsParamEditBlocksPoll]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-layout", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `sidebar${sidebarOpen ? "" : " sidebar--collapsed"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "logo", children: "ICMS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { id: "app-sidebar-nav", className: "sidebar-nav-main", "aria-label": "Product", children: productNav.map(renderNavLink) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sidebar-nav-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { id: "app-sidebar-footer", "aria-label": "Account", children: tailNavItems.map(
        (item) => item.key === "__logout" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarLogoutButton, { label: item.label }, item.key) : renderNavLink(item)
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-main", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "content-toolbar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "content-toolbar-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "sidebar-toggle",
            "aria-expanded": sidebarOpen,
            "aria-controls": "app-sidebar-nav app-sidebar-footer",
            "aria-label": sidebarOpen ? "Collapse navigation" : "Expand navigation",
            onClick: () => setSidebarOpen((open) => !open),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "sidebar-toggle-icon", viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                fill: "currentColor",
                d: "M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              }
            ) })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "content-toolbar-center", children: storedModel || storedFirmware ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "content-toolbar-device",
            title: [storedModel, storedFirmware].filter(Boolean).join(" · "),
            children: [
              storedModel ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "content-toolbar-device-text", children: storedModel }) : null,
              storedModel && storedFirmware ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "content-toolbar-device-sep", "aria-hidden": "true", children: "·" }) : null,
              storedFirmware ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "content-toolbar-device-text", children: [
                "v",
                storedFirmware
              ] }) : null
            ]
          }
        ) : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content-toolbar-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "time",
            {
              className: "content-toolbar-datetime",
              dateTime: toolbarNow.toISOString(),
              title: toolbarNow.toLocaleString(),
              children: toolbarNow.toLocaleString(void 0, {
                dateStyle: "medium",
                timeStyle: "medium"
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: serialSession ? "connect-button connect-button--connected" : "connect-button",
              "aria-label": serialSession ? `Disconnect serial — ${serialSession.path}` : "Connect serial device",
              title: serialSession ? `Disconnect (${serialSession.path})` : "Connect",
              onClick: async () => {
                if (serialSession) {
                  await window.icms.closeSerialPort();
                  setSerialSession(null);
                  setSerialLines([]);
                  return;
                }
                setConnectOpen(true);
              },
              children: serialSession ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MdUsbOff, { className: "connect-usb-icon", "aria-hidden": true }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "connect-button-port", title: serialSession.path, children: serialSession.path })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MdUsb, { className: "connect-usb-icon", "aria-hidden": true })
            }
          )
        ] })
      ] }),
      displayView === "data" && serialSession ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}) : null,
      displayView === "traffic" && location.pathname !== "/settings" && location.pathname !== "/dashboard" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-main-traffic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Traffic,
        {
          connected: Boolean(serialSession),
          path: serialSession?.path ?? "",
          baudRate: serialSession?.baudRate ?? 0,
          slaveId: serialSession?.slaveId ?? "",
          lines: serialLines
        }
      ) }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConnectModal,
        {
          open: connectOpen,
          onClose: () => setConnectOpen(false),
          onConnected: (info) => {
            setSerialLines([]);
            serialLineKey.current = 0;
            setSerialSession(info);
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DisplayViewProvider,
        {
          view: displayView,
          serialConnected: Boolean(serialSession),
          serialLineCount: serialLines.length,
          serialLines,
          serialPath: serialSession?.path ?? "",
          serialBaudRate: serialSession?.baudRate ?? 0,
          serialSlaveId: serialSession?.slaveId ?? "",
          beginSettingsParamEdit,
          endSettingsParamEdit,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "main",
            {
              className: `content${displayView === "traffic" && location.pathname !== "/settings" && location.pathname !== "/dashboard" ? " content--under-traffic" : ""}${displayView === "traffic" && (location.pathname === "/settings" || location.pathname === "/dashboard") ? " content--traffic-inline" : ""}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
            }
          )
        }
      )
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-shell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(RootRedirect, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Login, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/setup", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Auth, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/card", element: /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultCard, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Route, { element: /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, {}), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/settings", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/logs", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Logs, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/help", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Help, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/section/:sectionName", element: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/profile", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Profile, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/auth", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Auth, {}) })
    ] })
  ] }) }) });
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React$2.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
