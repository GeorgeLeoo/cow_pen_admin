export default class DataType {
  public static isObject = (obj: object) => Object.prototype.toString.call(obj) === '[object Object]'
  public static isNumber = (obj: object) => Object.prototype.toString.call(obj) === '[object Number]'
  public static isString = (obj: object) => Object.prototype.toString.call(obj) === '[object String]'
  public static isUndefined = (obj: object) => Object.prototype.toString.call(obj) === '[object Undefined]'
  public static isBoolean = (obj: object) => Object.prototype.toString.call(obj) === '[object Boolean]'
  public static isArray = (obj: object) => Object.prototype.toString.call(obj) === '[object Array]'
  public static isFunction = (obj: object) => Object.prototype.toString.call(obj) === '[object Function]'
}
