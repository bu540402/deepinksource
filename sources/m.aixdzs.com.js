const baseUrl = "https://m.aixdzs.com"

const search = (key) => {
    let response = GET(`${baseUrl}/search?k=${key}`)
    let array = [];
    let $ = HTML.parse(response);
    $('ul.ix-list li').forEach((child) => {
        let $ = HTML.parse(child);
        array.push({
            name: $('a.ba').text(),
            author: $('a.book-author').text(),
            cover: '',
            detail: `${baseUrl}${$('a.ba').attr('href')}`,
        });
    });
    return JSON.stringify(array);
}

const detail = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    let book = {
        catalog: url,
        summary: $('p.ix-txt-info').text(),
        category: $('div.ix-list-info p:eq(1) a').text(),
        status: $('div.ix-list-info p:eq(1) span').text(),
        words: $('div.ix-list-info p:eq(2)').text().replace('字数:', '').trim(),
        lastChapter: $('div.ix-list-info p:eq(3) a').text(),
        update: $('div.ix-list-info p:eq(4)').text(),
    }
    return JSON.stringify(book)
}

const catalog = (url) => {
    let response = GET(url)
    let $ = HTML.parse(response)
    let array = []
    $('ul.chapter > li:gt(0)').forEach((chapter) => {
        let $ = HTML.parse(chapter)
        array.push({
            name: $('a').text(),
            url: `${baseUrl}${$('a').attr('href')}`
        })
    })
    return JSON.stringify(array)
}

const chapter = (url) => {
    let $ = HTML.parse(GET(url))
    return $('article.page-content section')
}

var bookSource = JSON.stringify({
    name: "爱下电子书(外网)",
    url: "m.aixdzs.com",
    version: 100
})