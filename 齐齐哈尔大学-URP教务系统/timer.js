/*
 * @Author: No-World 2259881867@qq.com
 * @Date: 2024-07-14 17:07:48
 * @LastEditors: No-World 2259881867@qq.com
 * @LastEditTime: 2025-02-22 21:44:03
 * @FilePath: \齐齐哈尔大学-URP教务系统\timer.js
 * @Description: 时间配置
 */

/**
 * @description: 时间配置函数
 * @return {JSON} 时间配置
 */
async function scheduleTimer({
    providerRes,
    parserRes
} = {}) {
    // 支持异步操作 推荐await写法
    return {
        totalWeek: 18, // 总周数：[1, 30]之间的整数
        startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: true, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 2, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
            section: 1, // 节次：[1, 30]之间的整数
            startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '08:45', // 结束时间：同上
        }, {
            section: 2, // 节次：[1, 30]之间的整数
            startTime: '08:55', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '09:40', // 结束时间：同上
        }, {
            section: 3, // 节次：[1, 30]之间的整数
            startTime: '10:10', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '10:55', // 结束时间：同上
        }, {
            section: 4, // 节次：[1, 30]之间的整数
            startTime: '11:05', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '11:50', // 结束时间：同上
        }, {
            section: 5, // 节次：[1, 30]之间的整数
            startTime: '14:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '14:45', // 结束时间：同上
        }, {
            section: 6, // 节次：[1, 30]之间的整数
            startTime: '14:55', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '15:40', // 结束时间：同上
        }, {
            section: 7, // 节次：[1, 30]之间的整数
            startTime: '16:10', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '16:55', // 结束时间：同上
        }, {
            section: 8, // 节次：[1, 30]之间的整数
            startTime: '17:05', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '17:50', // 结束时间：同上
        }, {
            section: 9, // 节次：[1, 30]之间的整数
            startTime: '19:00', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '19:45', // 结束时间：同上
        }, {
            section: 10, // 节次：[1, 30]之间的整数
            startTime: '19:55', // 开始时间：参照这个标准格式5位长度字符串
            endTime: '20:40', // 结束时间：同上
        },
        ], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
    }
}