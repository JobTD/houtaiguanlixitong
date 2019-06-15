function pho(a) {
    var pho = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    return pho.test(a)
}

function use(a) {
    var use = /^[a-zA-z0-9]\w{3,15}$/
    return use.test(a)
}

function ema(a) {
    var ema = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    return ema.test(a)
}

function sfid(a) {
    var sfid = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    return sfid.test(a)
}

function ipdz(a) {
    var ipdz = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return ipdz.test(a)
}

function canshu(obj) {
    var isok = true;
    for (var i in obj) {
        if (obj[i] == '') {
            isok = false;
            break;
        }
    }
    return isok;
}

function mima(a, b) {
    return a == b;
}
export default {
    pho,
    use,
    ema,
    sfid,
    ipdz,
    canshu,
    mima
}