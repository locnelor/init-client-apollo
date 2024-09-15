
export const ImportUserForm = (url: string) => {
    return [{
        type: "input",
        name: "college",
        label: "学院名称",
        required: true
    }, {
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