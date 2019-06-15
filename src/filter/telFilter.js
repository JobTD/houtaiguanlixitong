function telFilter(tel) {
    return tel.substr(0, 3) + '****' + tel.slice(7);

}
export default telFilter;