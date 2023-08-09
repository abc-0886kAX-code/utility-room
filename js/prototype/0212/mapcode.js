/*
 * @FilePath: \test\0212\mapcode.js
 * @Author: zhangxin
 * @Date: 2023-02-12 14:19:50
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-12 18:29:54
 * @Description:
 */
const map = new Map();

function mapcode() {
    function set(key, value) {
        map.set(key, value);
    }
    function get(key) {
        return map.get(key);
    }
    function has(key) {
        return map.has(key);
    }
    function del(key) {
        return map.delete(key);
    }
    function clear() {
        map.clear();
    }
    function size() {
        return map.size;
    }

    return {
        set,
        get,
        has,
        clear,
        del,
        size,
    };
}

const crud = mapcode();
console.log(crud.set('test', 1));
console.log(crud.get('test'));
console.log(crud.has('test'));

const object1 = {
    test: '1',
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

console.log(hasOwnProperty.call(object1, 'test'));
