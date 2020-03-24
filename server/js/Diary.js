module.exports.diary = function () {
    const base = [
        {dayLesson: [{lesson: '', homework: ''}]},
        {dayLesson: [{lesson: '', homework: ''}]},
        {dayLesson: [{lesson: '', homework: ''}]},
        {dayLesson: [{lesson: '', homework: ''}]},
        {dayLesson: [{lesson: '', homework: ''}]},
        {dayLesson: [{lesson: '', homework: ''}]}
    ]

    const date = new Date()
    let year = date.getFullYear()

    if (new Date(year, 8, 1, 1,0,0,0).valueOf() > date.valueOf()) {
        --year
    }
    const start = new Date(year, 8, 1, 1,0,0,0);
    let september = start.valueOf();
    if (start.getDay() === 6) {
        september += 86400000 + 86400000
    } else if (start.getDay() === 0) {
        september += 86400000
    }
    const book = {}
    for (let i = 0; i < 43; i++) {
        book[september] = base;
        september += 604800000;
    }
    return {[year]: book}
}

module.exports.lesson = [
    {dayLesson: [{lesson: '', homework: []}]},
    {dayLesson: [{lesson: '', homework: []}]},
    {dayLesson: [{lesson: '', homework: []}]},
    {dayLesson: [{lesson: '', homework: []}]},
    {dayLesson: [{lesson: '', homework: []}]},
    {dayLesson: [{lesson: '', homework: []}]}
]
