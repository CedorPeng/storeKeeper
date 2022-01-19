const filter = {
  /**
   * @数字转换千分位
   * value  {Number}  过滤器默认传进来需要被处理的值
   * place  {Number}  需要保留的小数位数
   * */
  setThousand: function (value, place) {
    value = value || 0;
    place = !isNaN(place = Math.abs(place)) ? place : 2;
    let thousand = ',', decimal = '.',
      negative = value < 0 ? '-' : '',
      i = parseInt(value = Math.abs(+value || 0).toFixed(place), 10) + '',
      j = (j = i.length) > 3 ? j % 3 : 0;
    return negative + (j ? i.substr(0, j) + thousand : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
      (place ? decimal + Math.abs(value - i).toFixed(place).slice(2) : '')

  },
  /**
   * @字符串去掉全部空格
   * */
  trimString: function (value) {
    return value.replace(/\s/g, '');
  },
  /**
   * @字符串去掉前后空格
   * */
  removeBothSides: function (value) {
    return value.replace(/(^\s+)|(\s+$)/g, '');
  },
  /**
   * @时间戳转换YYYY-MM-DD HH-mm-ss
   * @value   {Date}   需要处理的时间戳
   * @format  {String} 处理成的格式 'YYYY-MM-DD YYYY-MM-DD hh:mm:ss YYYY/MM/DD YYYY/MM/DD hh:mm:ss'
   * */
  setTimeFilter: function (value, format) {
    let time = new Date(value)
    format = format || 'YYYY-MM-DD'
    let Y = time.getFullYear(),
      M = this.unidigitAddZero(time.getMonth() + 1),
      D = this.unidigitAddZero(time.getDate()),
      h = this.unidigitAddZero(time.getHours()),
      m = this.unidigitAddZero(time.getMinutes()),
      s = this.unidigitAddZero(time.getSeconds()),
      result = '';
    switch (format) {
      case 'YYYY-MM-DD':
        result = Y + '-' + M + '-' + D;
        break;
      case 'YYYY-MM-DD hh:mm:ss' :
        result = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
        break;
      case 'YYYY/MM/DD':
        result = Y + '/' + M + '/' + D;
        break;
      case 'YYYY/MM/DD hh:mm:ss' :
        result = Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s;
        break;
      default:
        break;
    }
    return result;
  },
}
export default Vue => {
  for (let key in filter) {
    Vue.filter(key, filter[key])
  }
}
