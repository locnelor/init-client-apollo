

export const ImportTeacherForm = (url: string) => {
    return [{
        type: "file",
        name: "file",
        label: "选择文件",
        required: true
    }, {
        type: "download",
        name: "null",
        label: "下载模板",
        url
    }]
}