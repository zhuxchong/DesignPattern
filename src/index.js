class Test{
    constructor(name){
        this.name=name
    }
    alertName(subName){
        alert(this.name+subName)
    }
}
let _p=new Test('hi')
_p.alertName('helo')
