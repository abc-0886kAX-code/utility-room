// 随机生成中文汉字
const generateRandomChinese = count => {
    const start = parseInt('4e00', 16);
    const end = parseInt('9fa5', 16);
    let name = '';
    for (let i = 0; i < count; i++) {
        const cha = Math.floor(Math.random() * (end - start));
        name += '\\u' + (start + cha).toString(16);
    }

    return eval(`'${name}'`);
};
// 随机生成数字
const generateRandomNumber = max => {
    return Math.floor(Math.random() * (max + 1));
};

// 随机生成时间
function handleDate() {
    const generateNumber = parseInt(10 * Math.random);

    const generateTimestamp = Number(new Date())
        .toString()
        .replace(
            Number(new Date()).toString()[generateNumber] ?? '0',
            parseInt(20 * Math.random).toString()
        );

    const cutoffGenerateTimestamp = Number(generateTimestamp.slice(0, 13));

    function isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }

    function conversion(timestamp) {
        let convertedValue = new Date(timestamp);
        console.log(isValidDate(convertedValue));

        if (!isValidDate(convertedValue)) {
            convertedValue = new Date();
        }
        //日期
        const DD = String(convertedValue.getDate()).padStart(2, '0'); // 获取日
        const MM = String(convertedValue.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
        const yyyy = convertedValue.getFullYear(); // 获取年

        // 时间
        const hh = String(convertedValue.getHours()).padStart(2, '0'); //获取当前小时数(0-23)
        const mm = String(convertedValue.getMinutes()).padStart(2, '0'); //获取当前分钟数(0-59)
        const ss = String(convertedValue.getSeconds()).padStart(2, '0'); //获取当前秒数(0-59)
        convertedValue = yyyy + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
        return convertedValue;
    }
    return {
        timesteamp: conversion(cutoffGenerateTimestamp),
        timeConversion: conversion,
        generateTimestamp,
    };
}
// 随机生成手机号
function generateMobileNumber() {
    const prefixArray = new Array(
        '130',
        '131',
        '132',
        '133',
        '135',
        '137',
        '138',
        '170',
        '187',
        '189'
    );

    const i = parseInt(10 * Math.random());

    let prefix = prefixArray[i];

    for (let j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix;
}
const GenerateData = length => {
    return Array.apply(null, { length }).map((item, index, arr) => {
        return {
            labname: generateRandomChinese(6),
            labtypename: generateRandomChinese(4),
            labacreage: generateRandomNumber(1000),
            professionaldirectionname: generateRandomChinese(4),
            professionaldirection2name: generateRandomChinese(5),
            professionaldirection3name: generateRandomChinese(6),
            groupbusinesplatename: generateRandomChinese(3),
            departmentidname: generateRandomChinese(4),
            approveunit: generateRandomChinese(3),
            approvetime: handleDate().timesteamp,
            receptiontime: handleDate().timesteamp,
            linkman: generateRandomChinese(2),
            mobilephone: generateMobileNumber(),
            checkresultname: index % 2 === 0 ? '审核' : '退回',
        };
    });
};

GenerateData(24);
