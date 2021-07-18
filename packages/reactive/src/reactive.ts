
import { isObject } from "@vue/shared";
import { mutableHandler } from "./baseHandlers";

export function reactive(target) {
    return createReactiveObject(target, mutableHandler);
}

/**
 * 
 * @param target 创建代理的目标
 * @param baseHandler 针对不同的方式创建不同的代理对象  
 */
// weakMap(key只能是对象) map(key可以是其他类型)
const reactiveMap = new WeakMap(); // 目的是添加缓存
function createReactiveObject(target, baseHandler) {
    if(!isObject(target)){
        return target;
    }
    const existProxy = reactiveMap.get(target);
    if(existProxy){
        return existProxy;// 如果已经代理过了，那就直接把上次的代理返回就可以的 
    }
    // 如果是对象 就做一个代理 new proxy
    const proxy = new Proxy(target,baseHandler);
    reactiveMap.set(target,proxy);
    return proxy;
}