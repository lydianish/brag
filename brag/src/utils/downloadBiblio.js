import * as FileSaver from 'file-saver';

const endOfLine = '\r\n';

export function downloadBiblio (filename) {
    const articles = ["article publié 1", "article publié 2"]
    const data = articles[0] + endOfLine +articles[1];
    downloadFile(data, filename);
}

function downloadFile (data, filename) {
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
}
