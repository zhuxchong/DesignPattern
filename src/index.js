function testable(isTestable) {
  return function (target) {
    target.isTestable = isTestable;
  };
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable;

//================================

function testable(t) {
  t.prototype.isTestable = true;
}

@testable(true)
class MyTestableClass {}
const obj = new MyTestableClass();
obj.isTestable;

//不改变原来方法，增加功能
// class MyClass {}

// function annotation(target) {
//   target.annotated = true;
// }
//===
// @decorator
// class A {}

// // 等同于

// class A {}
// A = decorator(A) || A;

class Circle {
  draw() {
    console.log("画圆");
  }
}
class Decorator {
  constructor(circle) {
    this.circle = circle;
  }
  setBorderColor(circle) {
    console.log("set color");
  }
  draw() {
    this.circle.draw();
    this.setBorderColor(circle);
  }
}
let circle = new Circle();
circle.draw();

let dec = new Decorator(circle);
dec.draw();

//ES7 Decorator

function _debounce(func, wait, immediate) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

function debounce(wait, immediate) {
  return function handleDescriptor(target, key, descriptor) {
    const callback = descriptor.value;

    if (typeof callback !== "function") {
      throw new SyntaxError("Only functions can be debounced");
    }

    var fn = _debounce(callback, wait, immediate);

    return {
      ...descriptor,
      value() {
        fn();
      },
    };
  };
}
class Toggle extends React.Component {
  //@debounce(500, true)
  handleClick() {
    console.log("toggle");
  }

  render() {
    return <button onClick={this.handleClick}>button</button>;
  }
}
//==exp

let log = (type) => {
  return (target, name, descriptor) => {
    const method = descriptor.value;
    descriptor.value = (...args) => {
      console.info(`(${type}) 正在执行: ${name}(${args}) = ?`);
      let ret;
      try {
        ret = method.apply(target, args);
        console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`);
      } catch (error) {
        console.error(`(${type}) 失败: ${name}(${args}) => ${error}`);
      }
      return ret;
    };
  };
};

class Math {
  //@log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function (...args) {
    console.log(`Calling ${name} with`, args);
    return oldValue.apply(this, args);
  };

  return descriptor;
}

const math = new Math();

// Calling add with [2, 4]
math.add(2, 4);
/////////============////////////////////////////////////////

//开始定义装饰器//看到两个箭头函数感觉懵逼了，转化一个也就是一个函数里返回一个函数再返回一个组件包裹器而已//title参数对应上面的“Profile Page”字符串
//WrappedComponent参数对应上面的Profile组件
//然后在组件加载完修改了title，在返回一个新组件，是不是很像高阶组件呢
const setTitle = (title) => (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      document.title = title;
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
//假如有这么一个页面组件，用于显示用户资料的，当从Home组件进去到这个组件时
//希望title从“Home Page”变成“Profile Page”
//注意这里隐形传入了组件，语法类似setTitle('Profile Page')(Profile)@setTitle("Profile Page")
class Profile extends React.Component {}
