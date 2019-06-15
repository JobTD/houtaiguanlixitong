export default function(time) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1 >= 10 ?
        date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    var day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();

    return `${year}+${month}+${day}`;
}