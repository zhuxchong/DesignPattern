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
