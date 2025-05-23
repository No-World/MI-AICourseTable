/*
 * @Author: No-World 2259881867@qq.com
 * @Date: 2024-07-14 17:07:48
 * @LastEditors: No-World 2259881867@qq.com
 * @LastEditTime: 2025-02-20 02:45:30
 * @FilePath: \齐齐哈尔大学-URP教务系统\parser.js
 * @Description: 课程解析
 */

/**
 * @description: 课程解析函数
 * @param {string} html 
 * @return {Array} 课程列表
 */
function scheduleHtmlParser(htmlContent) {
    try {
        const { data, sourceType } = JSON.parse(htmlContent);
        const $ = cheerio.load(data);
        const courseList = [];

        // 动态列配置
        const columnConfig = {
            1: { time: 12, location: 13 },
            2: { time: 14, location: 15 }
        }[sourceType] || { time: 14, location: 15 }; // 默认值

        let mainCourseInfo = {};

        $('tbody tr').each((index, tr) => {
            const $tds = $(tr).find('td');

            // 主课程行检测（包含完整信息）
            if ($tds.length >= Math.max(columnConfig.time, columnConfig.location) + 1) {
                mainCourseInfo = {
                    name: $tds.eq(1).text().trim(),
                    teacher: $tds.eq(9).text().replace(/\*|\s+/g, '').trim()
                };

                // 处理主行时间
                processRow(
                    $tds.eq(columnConfig.time).text().trim(),
                    $tds.eq(columnConfig.location).text().trim(),
                    mainCourseInfo,
                    courseList
                );
            }
            // 附加课程行（合并单元格情况）
            else if ($tds.length === 2) {
                processRow(
                    $tds.eq(0).text().trim(),
                    $tds.eq(1).text().trim(),
                    mainCourseInfo,
                    courseList
                );
            }
        });

        return courseList;
    } catch (error) {
        console.error('解析失败:', error);
        return [];
    }
}

/**
 * @description: 处理时间地点行
 * @param {string} timeStr
 * @param {string} locationStr
 * @param {*} baseInfo
 * @param {JSON} courseList
 */
function processRow(timeStr, locationStr, baseInfo, courseList) {
    if (!timeStr || !locationStr) return;

    try {
        const [weeksPart, dayPart, nodePart] = timeStr.split('>>').map(s => s.trim());
        const { weeks, type } = parseWeeks(weeksPart);

        courseList.push({
            name: baseInfo.name,
            position: locationStr.replace(/>>/g, ' '),
            teacher: baseInfo.teacher,
            weeks: weeks,
            day: chineseToNumber(dayPart),
            sections: parseSections(nodePart),
            type: type
        });
    } catch (e) {
        console.warn('解析行失败:', e.message, '原始数据:', timeStr, locationStr);
    }
}

/**
 * @description: 周次解析
 * @param {string} weeksString
 * @return {int[]} 周次数组
 */
function parseWeeks(weeksString) {
    const result = { weeks: new Set(), type: 0 };
    const cleanStr = weeksString.replace(/周/g, '');

    // 检测单双周标记
    if (cleanStr.includes('单')) result.type = 1;
    if (cleanStr.includes('双')) result.type = 2;

    // 提取数字范围
    cleanStr.replace(/[^\d,-]/g, '').split(',').forEach(part => {
        const [start, end] = part.split('-').map(Number);
        if (end && start <= end) {
            for (let i = start; i <= end; i++) {
                if (result.type === 0 ||
                    (result.type === 1 && i % 2 === 1) ||
                    (result.type === 2 && i % 2 === 0)) {
                    result.weeks.add(i);
                }
            }
        } else if (!isNaN(start)) {
            result.weeks.add(start);
        }
    });

    result.weeks = Array.from(result.weeks).sort((a, b) => a - b);
    return result;
}

/**
 * @description: 节次解析
 * @param {string} nodeText
 * @return {int[]} 节次数组
 */
function parseSections(nodeText) {
    const match = nodeText.match(/(\d+)(?:-(\d+))?/);
    if (!match) return [];

    const start = parseInt(match[1]);
    const end = match[2] ? parseInt(match[2]) : start;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * @description: 星期解析
 * @param {string} dayText
 * @return {int} 星期几，默认1
 */
function chineseToNumber(dayText) {
    const weekMap = {
        '一': 1, '二': 2, '三': 3, '四': 4,
        '五': 5, '六': 6, '日': 7, '天': 7,
        '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7
    };
    return weekMap[dayText.replace(/星期|周/g, '')] || 1;
}