/*
 * @FilePath: \test\0218\Exercise_bind.js
 * @Author: zhangxin
 * @Date: 2023-02-18 23:44:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-19 16:07:12
 * @Description:
 */
const exercise_obj = {
    exercise_name: 'exercise_value',
    exercise_fun: function () {
        console.log(this);
    },
};
// TODO: this 指向 当前对象
exercise_obj.exercise_fun();

const exercise_unactive = {
    exercise_name: 'exercise_unactive',
};

// TODO: this 指向bind传入的参数
// TODO: bind return fun
const exercise_result = exercise_obj.exercise_fun.bind(exercise_unactive);
exercise_result();

// TODO: 实现bind()
Function.prototype.Newbind = function (context, ...args) {
    return (...params) => this.apply(context, [...params, ...args]);
};
