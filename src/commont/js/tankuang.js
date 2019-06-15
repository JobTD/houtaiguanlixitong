function kong(obj) {
    return obj.$message({
        message: '缺少必要参数!',
        type: 'warning'
    });
}

function mima(obj) {
    return obj.$message({
        message: '密码不一致!',
        type: 'warning'
    });
}

function sj(obj) {
    return obj.$message({
        message: '手机验证失败!',
        type: 'warning'
    });
}

function sfz(obj) {
    return obj.$message({
        message: '身份证验证失败!',
        type: 'warning'
    });

}

function zh(obj) {
    return obj.$message({
        message: '账号验证失败!',
        type: 'warning'
    });
}

function yx(obj) {
    return obj.$message({
        message: '邮箱验证失败!',
        type: 'warning'
    });
}

function ym(obj) {
    return obj.$message({
        message: '域名验证失败!',
        type: 'warning'
    });

}

function zy(obj) {
    return obj.$message({
        message: '账号格式或邮箱格式不正确!',
        type: 'warning'
    });

}
export default {
    sj,
    sfz,
    zh,
    yx,
    ym,
    zy,
    kong,
    mima
}