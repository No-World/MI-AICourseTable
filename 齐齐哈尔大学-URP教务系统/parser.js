function scheduleHtmlParser(htmlContent) {
    const courseData = [];
    const cellRegex = /<td.*?id="(\d+)_(\d+)".*?>([\s\S]*?)<\/td>/g;
    const divRegex = /<div.*?>([\s\S]*?)<\/div>/g;
    const pRegex = /<p.*?>([\s\S]*?)<\/p>/g;

    let cellMatch;
    while ((cellMatch = cellRegex.exec(htmlContent)) !== null) {
        const day = parseInt(cellMatch[1], 10);
        const sections = parseInt(cellMatch[2], 10);
        const cellContent = cellMatch[3];

        let divMatch;
        while ((divMatch = divRegex.exec(cellContent)) !== null) {
            const divContent = divMatch[1];
            const pMatches = [...divContent.matchAll(pRegex)];

            if (pMatches.length >= 5) {
                const name = pMatches[0][1].trim();
                const teacher = pMatches[2][1].trim().split('*')[0];
                const weeksString = pMatches[3][1].trim();
                const sectionList = pMatches[4][1].trim().match(/\d+/g).map(Number);
                const position = pMatches[5][1].trim();

                const weeks = parseWeeks(weeksString);

                courseData.push({
                    name: name,
                    position: position,
                    teacher: teacher,
                    weeks: weeks,
                    day: day,
                    sections: sectionList
                });
            }
        }
    }

    return courseData;
}



function parseWeeks(weeksString) {
    const weeks = [];
    const ranges = weeksString.match(/\d+-\d+|\d+/g);

    ranges.forEach(range => {
        if (range.includes('-')) {
            const [start, end] = range.split('-').map(Number);
            for (let i = start; i <= end; i++) {
                weeks.push(i);
            }
        } else {
            weeks.push(Number(range));
        }
    });

    return weeks;
}

// 比较两个数组是否相等
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
