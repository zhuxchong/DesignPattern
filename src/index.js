/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-05-04 23:14:21
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-05-06 23:22:52
 * @FilePath: /DesignPattern/src/index.js
 */

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
