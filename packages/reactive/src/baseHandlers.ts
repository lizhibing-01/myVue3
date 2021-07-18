import {  isObject } from "@vue/shared";
import{reactive}  from './reactive'
function createGetter() {
    /**
     * target 是原来的对象
     * key 去取什么属性
     * recevier 代理对象
     */
    return function get(target, key, receiver) {

        const res = Reflect.get(target, key, receiver); 
        if(isObject(res)){
          return  reactive(res)
        }
        return res;
    }
}
function createSetter() {
    return function set(target, key, value, receiver) {
        const res = Reflect.set(target, key, value, receiver);
        return res
    }
}
const get = createGetter(); // 不是仅读的也不是浅的
const set = createSetter();
export const mutableHandler = { // reactive中的get和set
    get,
    set
}