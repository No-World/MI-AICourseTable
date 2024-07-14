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
