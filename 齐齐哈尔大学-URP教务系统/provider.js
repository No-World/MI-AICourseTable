<<<<<<< HEAD
/*
 * @Author: No-World 2259881867@qq.com
 * @Date: 2024-07-14 17:07:48
 * @LastEditors: No-World 2259881867@qq.com
 * @LastEditTime: 2025-02-20 02:35:29
 * @FilePath: \齐齐哈尔大学-URP教务系统\provider.js
 * @Description: 检查函数
 */

/**
 * @description: 从HTML获取table内部的字符串
 * @return {JSON{table, sourceType}}
 */
async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    await loadTool('AIScheduleTools');
    const isResultPage = window.location.href.includes('courseSelectResult/index');
    const isCurriculumPage = window.location.href.includes('thisSemesterCurriculum/index');

    // 页面类型判断
    const sourceType = isResultPage ? 1 :
        isCurriculumPage ? 2 :
            0;
    if (!sourceType) {
        await AIScheduleAlert('请到本学期课表或选课结果页面再进行导入哦')
        return 'do not continue';
    }

    try {
        const table = document.querySelector("#infoTable table.table.table-striped.table-bordered");
        return JSON.stringify({
            data: table.outerHTML.replace(/\t/g, ''),
            sourceType: sourceType
        });
    } catch (error) {
        await AIScheduleAlert(`数据获取失败: ${error.message}`);
        return 'do not continue';
    }
}
=======
async function scheduleHtmlProvider() {
    await loadTool('AIScheduleTools');
    if (!window.location.href.includes('student/courseSelect/thisSemesterCurriculum/index')) {
        await AIScheduleAlert('请到选课管理-本学期课表-本学期课表页面再进行导入哦')
        return 'do not continue';
    }
    // 检查当前页面的 URL
    try {
        // 获取tbody元素
        const tbody = document.getElementById('courseTableBody');

        // 检查tbody是否存在
        if (!tbody) {
            console.error('请在页面加载完全后再尝试导入');
        }

        // 返回tbody的HTML内容
        return tbody.innerHTML;
    } catch (error) {
        // console.error(error);
        await AIScheduleAlert(error.message)
        return 'do not continue';
    }
}
>>>>>>> ed0d73a2f8e7cbacbc5fa5537e5a0acc21906529
