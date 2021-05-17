/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-05-04 23:14:21
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-05-17 23:19:27
 * @FilePath: /DesignPattern/src/index.js
 */

// 适配器模式 提供不一样的接口，比如老旧功能不能用了，写个新的接口，可以接触目标类
// 代理模式 显示与原来一模一样的功能，但是功能是经过包装或者修改的，就是包了一层，改写了一下功能
// 装饰器模式  扩展功能，不能改写原有的，包了一层 增加新的功能

class RealImg {
  constructor(fileName) {
    this.fileName = fileName;
  }
  display() {
    console.log("display", this.fileName);
  }
  loadFromDisk() {
    console.log("loading", this.fileName);
  }
}
class ProxyImg {
  constructor(fileName) {
    this.realImage = new RealImg(fileName);
  }
  display() {
    this.realImg.display();
  }
}

let proxyImg = new ProxyImg("img");

const star = {
  name: "张123",
  age: 25,
  phone: "13131313131",
}; //不能直接接触明星
const agent = new Proxy(star, {
  get: (target, key) => {
    if (key === "phone") {
      return "14141414141"; //agent's number
    }
    if (key === "price") {
      return 120000;
    }
    return target[key];
  },
  set: (target, key, val) => {
    if (key === "customPrice") {
      if (val < 10000) {
        throw new Error("low price");
      } else {
        target[key] = val;
        return true;
      }
    }
  },
});
