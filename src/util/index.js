/*
* export default 当前js文件只导出一个对象
* export 可以导出多个对象 并使用 * as api from '路径'
* */
const CedorUtils = function () {
  this.name = 'Cedor';
  this.age = 26;
}

CedorUtils.prototype = {
  /**
   * @获取localStorage中的属性值
   * */
  getLocalValue: function (name) {
    return JSON.parse(localStorage.getItem(name)) || ''
  },
  /**
   * @设置localStorage中的属性
   * */
  setLocalValue: function (name, value) {
    localStorage.setItem(name, value)
  },
  /**
   * @移除localStorage中的属性
   * */
  removeLocalValue: function (name) {
    localStorage.removeItem(name)
  },
  /**
   * @数字转换千分位
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
   * @手机号脱敏
   * */
  resetPhone: function (phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  },
  /**
   * @数组去重
   * */
  removeRepeat: function (value) {
    // let arr = [],obj={};
    // for (let i = 0 ; i < value.length ; i++){
    //   if(!obj[value[i]]){
    //     arr.push(value[i]);
    //     obj[value[i]] = 1;
    //   }
    // }
    return [...new Set(value)]
  },
  /**
   * @数组求和
   * */
  totalCount: function (value) {
    let result = 0;
    for (let i = 0; i < value.length; i++) {
      result += value[i]
    }
    return result
  },
  /**
   * @数组排序
   * */
  sortArray: function (value) {
    let sortNum = (a, b) => {
      return a - b;
    }
    return value.sort(sortNum)
  },
  /**
   * @数组拼接
   * */
  concatArray: function (value1, value2) {
    // return value1.concat(value2)
    return [...value1, ...value2]
  },
  /**
   * @从url中获取hash
   * */
  getUrlHash: function (value) {
    const keyValueArr = value.split('?')[1].split('&');
    let hashObject = {};
    keyValueArr.forEach(item => {
      const keyValue = item.split('=')
      hashObject[keyValue[0]] = keyValue[1]
    })
    return hashObject
  },
  /**
   * @个位数 + 0
   * */
  unidigitAddZero: function (value) {
    return value < 10 ? '0' + value : value;
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
  /**
   * @正则验证小数  decimals 小数
   * @+一次或多次 ?0次或多次 {m}必须m次 {m,}最少m次 {m,n}出现m-n次
   * */
  validateDecimals: function (value) {
    let reg = /^[+-]?\d+(\.\d+)?$/;
    return reg.test(value);
  },
  /**
   * @正则验证千分位数字
   * */
  validateThousand: function (value) {
    let reg = /^[+-]?\d{1,3}(,\d{3})*(.\d+)?$/;
    return reg.test(value);
  },
  /**
   * @正则验证正负整数
   * */
  validateInteger: function (value) {
    let reg = /^[+-]?\d+$/;
    return reg.test(value);
  },
  /**
   * @正则验证email
   * */
  validateEmail: function (value) {
    let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return reg.test(value);
  },
  /**
   * @全局提取email
   * */
  extractAllEmail: function (value) {
    return value.match(/[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}/g)
  },
  /**
   * @正则验证手机号
   * */
  validatePhone: function (value) {
    let reg = /^1([358]\d|4[579]|66|7[0135678]|9[89])\d{8}$/;
    return reg.test(value);
  },
  /**
   * @正则验证数字和英文(非中文以及标点)
   * */
  validateNoneChinese: function (value) {
    let reg = /^[a-zA-Z0-9]+$/;
    return reg.test(value);
  },
  /**
   * @正则验证数字英文包括下划线(非中文以及特殊标点)
   * */
  validateNoneChinese_: function (value) {
    let reg = /^\w+$/;
    return reg.test(value);
  },
  /**
   * @正则验证纯英文
   * @\.\+\$表示解译可匹配的用来添加可匹配的特殊符号
   * */
  validateEnglish: function (value) {
    let reg = /^[a-zA-Z]{3}$/;
    return reg.test(value);
  },
  /**
   * @深拷贝
   * oldValue 需要被处理的变量
   * */
  deepCopy: function (oldValue) {
    // let newValue = {};
    // if(typeof oldValue === 'object' && oldValue instanceof Array){
    //   newValue = [];
    // }
    // for (let key in oldValue){
    //   if(typeof oldValue[key] === 'object'){
    //     newValue[key] = this.deepCopy(oldValue[key]);
    //   }else{
    //     newValue[key] = oldValue[key];
    //   }
    // }
    // return newValue
    return JSON.parse(JSON.stringify(oldValue))
  },
  /**
   * @树结构中找到自身并设置父节点属性
   * */
  // treeFindMe:function(id,json){
  //   let parentNode = null
  //   for(let i = 0 ; i < json.length ; i ++){
  //     if(this.me) break
  //     let obj = json[i]
  //     parentNode = obj
  //     if(obj.id === id && !this.find){
  //       this.me = obj
  //       this.find = true
  //       break
  //     }
  //     if (obj.childList && !this.find){
  //       this.treeFindMe(id,obj.childList)
  //     }
  //   }
  //   if(this.me !== ''){
  //     parentNode.show = true
  //   }
  // },
  /**
   * @两个数字相加  只能处理正常数值(被科学计数法处理的数值计算错误)
   * */
  countAndSay: function (A, B) {
    let _A = (A + '').split('').reverse()
    let _B = (B + '').split('').reverse()
    let maxLength = Math.max(_A.length, _B.length)
    for (var i = 0; i < maxLength; i++) {
      let sum = parseInt(_A[i] || 0) + parseInt(_B[i] || 0)
      if (sum >= 10) {
        _A[i] = sum - 10
        _A[i + 1] = (_A[i + 1] || 0) + 1
      } else {
        _A[i] = sum
      }
    }
    return _A.reverse().join('')
  },
  /**
   * @获取某个时间是周几，已考虑ie浏览器不能识别 '-' 的兼容性问题
   * */
  getWeek: function (date) {
    let newDate = date.indexOf('-') === -1 ? date : date.replace(/-/g, "/");
    let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    return week[new Date(newDate).getDay() - 1]
  },
  /**
   * 读数
   * */
  readNumber:function (value) {
    console.log(value);
    let allZero = false
    let text = ['零','一','二','三','四','五','六','七','八','九']
    let unit = ['','十','百','千','万','十万','百万','千万','亿','十亿','百亿','千亿']
    return value
      .toString()
      .split('')
      .reverse()
      .map((item,index)=> {
        if(item !== '0') allZero = true
        return (allZero ? text[item] : '')+(item === '0' ? '' : unit[index])
      })
      .reverse()
      .join('')
      .replace(/零+/g,'零')
    // return value
    //   .toString()
    //   .split('')
    //   .reverse()
    //   .map((item,index)=> text[item]+(item === '0' ? '' : unit[index]))
    //   .reverse()
    //   .join('')
    //   .replace(/零+/g,'零')
    //   .replace(/^零+|零+$/g,'')
  }


}
export default new CedorUtils()
