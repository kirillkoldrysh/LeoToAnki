// arr = string.split("\n\n").map(s => s.split("—").map(ss => $.trim(ss)));

var arr = ($('.history-list-container .list-item').text().split("\n\n")).map(s => s.split("—").map(ss => $.trim(ss)));

console.save = function (data, filename) {
    if (!data) {
        console.error('Console.save: No data')
        return;
    }

    if (!filename) filename = 'story.json'

    if (typeof data === "object") {
        data = "arr = " + JSON.stringify(data, undefined, 4)
        // data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {
        type: 'text/json'
    }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}


console.save(arr, 'words.json');
