/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-04-26 15:53:12
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-04-26 15:54:19
 * @FilePath: /DesignPattern/src/index.js
 */
class LoginForm {
  constructor() {
    this.state = "hide";
  }
  show() {
    if (this.state === "show") {
      alert("show");
      return;
    }
    this.state = "show";
    alert("change to show");
  }
  hide() {
    if (this.state === "hide") {
      alert("hide");
      return;
    }
    this.state = "hide";
    alert("change to hide");
  }
}
LoginForm.getInstance = function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new LoginForm();
    }
    return instance;
  };
};

let login1 = LoginForm.getInstance();
login1.show();
let login2 = LoginForm.getInstance();
login2.hide();
console.log(login1 === login2);
