//版本更新和原来的不兼容，写一个方法使方法和现在版本兼容
class Adaptee {
  specificRequest() {
    return "德国标准";
  }
}
class Target {
  constructor() {
    this.adaptee = new Adaptee();
  }
  request() {
    let info = this.adaptee.specificRequest();
    return `${info} - switch - China Standard`;
  }
}
let target = new Target();
target.request();
