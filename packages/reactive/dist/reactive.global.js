var VueReactivity = (function (exports) {
    'use strict';

    function isObject(val) {
        return typeof val == 'object' && val !== null;
    }

    function createGetter() {
        /**
         * target 是原来的对象
         * key 去取什么属性
         * recevier 代理对象
         */
        return function get(target, key, receiver) {
            var res = Reflect.get(target, key, receiver);
            if (isObject(res)) {
                return reactive(res);
            }
            return res;
        };
    }
    function createSetter() {
        return function set(target, key, value, receiver) {
            var res = Reflect.set(target, key, value, receiver);
            return res;
        };
    }
    var get = createGetter(); // 不是仅读的也不是浅的
    var set = createSetter();
    var mutableHandler = {
        get: get,
        set: set
    };

    function reactive(target) {
        return createReactiveObject(target, mutableHandler);
    }
    /**
     *
     * @param target 创建代理的目标
     * @param baseHandler 针对不同的方式创建不同的代理对象
     */
    // weakMap(key只能是对象) map(key可以是其他类型)
    var reactiveMap = new WeakMap(); // 目的是添加缓存
    function createReactiveObject(target, baseHandler) {
        if (!isObject(target)) {
            return target;
        }
        var existProxy = reactiveMap.get(target);
        if (existProxy) {
            return existProxy; // 如果已经代理过了，那就直接把上次的代理返回就可以的 
        }
        // 如果是对象 就做一个代理 new proxy
        var proxy = new Proxy(target, baseHandler);
        reactiveMap.set(target, proxy);
        return proxy;
    }

    exports.reactive = reactive;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=reactive.global.js.map
