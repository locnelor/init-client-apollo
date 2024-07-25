export const TypeOption = {
    input: [{
        name: "minLength",
        type: "number",
        label: "最小长度",
    }, {
        name: "maxLength",
        type: "number",
        label: "最大长度"
    }, {
        name: "regex",
        type: "input",
        label: "正则校验",
    }],
    textarea: [{
        name: "minLength",
        type: "number",
        label: "最小长度",
    }, {
        name: "maxLength",
        type: "number",
        label: "最大长度"
    }, {
        name: "regex",
        type: "input",
        label: "正则校验",
    }],
    number: [{
        name: "min",
        type: "number",
        label: "最小值"
    }, {
        name: "max",
        type: "number",
        label: "最大值"
    }, {
        name: "floatLength",
        type: "number",
        label: "小数位长"
    }, {
        name: "suffix",
        type: "input",
        label: "后缀"
    }],
    option: [{
        name: "checkbox",
        type: "switch",
        label: "是否多选"
    }, {
        name: "options",
        type: "options",
        label: "选项"
    }],
    image: [{
        name: "max",
        type: "number",
        label: "最多上传"
    }, {
        name: "min",
        type: "number",
        label: "最小上传"
    }],
    file: [{
        name: "select",
        type: "select",
        label: "文件类型",
        options: [{
            label: "图片",
            value: "image/*"
        }, {
            label: "视频",
            value: "video/*"
        }, {
            label: "文档",
            value: ".docx,.doc,.xlsx,.xls,.pdf"
        }, {
            label: "压缩包",
            value: ".zip,.rar,.7z,.tar,.gz,.bz2"
        }]
    }]
}
export const BasicOption = [{
    type: "input",
    label: "单行输入"
}, {
    type: "textarea",
    label: "多行输入"
}, {
    type: "number",
    label: "数字输入"
}, {
    type: "option",
    label: "选择"
}, {
    type: "image",
    label: "图片上传"
}, {
    type: "file",
    label: "文件上传"
}]
export const InfoOption = [{
    type: "input",
    label: "姓名"
}, {
    type: "input",
    label: "学号",
    regex: (/^\d{2}P\d{10}$/).toString()
}, {
    type: "input",
    label: "手机号",
    validate(value: string) {
        const regex = /^1[34578]\d{9}$/;
        return regex.test(value) ? Promise.resolve() : Promise.reject("请输入正确的手机号");
    }
}, {
    type: "input",
    label: "邮箱",
    validate(value: string) {
        const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/;
        return regex.test(value) ? Promise.resolve() : Promise.reject("请输入正确的邮箱");
    }
}, {
    type: "input",
    label: "QQ号",
    validate(value: string) {
        const regex = /^[1-9][0-9]{4,12}$/;
        return regex.test(value) ? Promise.resolve() : Promise.reject("请输入正确的QQ号");
    }
}, {
    type: "input",
    label: "身份证号",
    validate(value: string) {
        const regex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        return regex.test(value) ? Promise.resolve() : Promise.reject("请输入正确的身份证号");
    }
}, {
    type: "option",
    label: "性别",
    option: [{
        value: "男",
        label: "男"
    }, {
        value: "女",
        label: "女"
    }]
}]