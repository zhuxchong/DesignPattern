const { construct } = require("core-js/fn/reflect")

class Product{
    construct(productName){
        this.productName=productName
    }
    displayName(){
        console.log(this.productName)
    }
    sayHi(name){
        alert('hi'+ name)
    }
}
class Generator{
    createProduct(name){
        let p = new Product(name);
        return p
    }
}

 let gen = new Generator() // 创建一个工厂
 let p = gen.createProduct('Nike')
p.displayName();
p.sayHi('Adidas')

//======================================================//
//实例


var employee1 = new Object();
employee1.position = "Front end engineer";
employee1.tool = "I love vscode.";
employee1.introduction = function () {
    console.log("I am a " + this.position + ", and " + this.tool);
}
var employee2 = new Object();
employee2.position = "UI designer";
employee2.tool = "I love photoshop.";
employee2.introduction = function () {
    console.log("I am a " + this.position + ", and " + this.tool);
}
employee1.introduction();//I am a Front end engineer, and I love vscode.
employee2.introduction();//I am a UI designer, and I love photoshop.
//在上边这个例子中，我们定义了两个employee，一个是Front End Engineer，另一个是UI designer，他们都有position属性和tool属性，也都有introduction方法。如果我们需要创建很多个类似employee的对象呢，那我们就需要重复很多类似的代码。接下来，我们做一些简单的修改：

function Employee(type) {
    var employee;
    if (type == "programmer") {
        employee = new Programmer();
    } else if (type == "designer") {
        employee = new Designer();
    }
    employee.introduction = function () {
        console.log("I am a " + this.position + ", and " + this.tool);
    }
    return employee;

}

function Programmer() {
    this.position = "Front end engineer";
    this.tool = "I love vscode.";
}
function Designer() {
    this.position = "UI designer";
    this.tool = "I love photoshop.";
}

var employee1 = Employee("programmer");
employee1.introduction();//I am a Front end engineer, and I love vscode.
var employee2 = Employee("designer");
employee2.introduction();//I am a UI designer, and I love photoshop.
//在上边这段代码中，我们将employee的初始化分别放到了Programmer()和Designer()中实现。这其实就是一个简单工厂模式的例子，Employee是一个工厂，可以根据传入的type的不同，创建不同的employee，每个employee有自己的职位和使用的工具，每个employee都可以介绍自己的这些信息。