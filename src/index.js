class Car{
    constructor(num){
        this.num=num
    }
}

class Camera{
    shot(car){
        return {
            num:car.num,
            inTime:Date.now()
        }
    }
}

class Screen{
    show(car,inTime){
        console.log('rego',car.num);
        console.log('duration',Date.now()-inTime)
    }
}

class Park{
    constructor(floors){
        this.floors=floors||[]
        this.carList={}
        this.camera=new Camera()
        this.screen=new Screen();
    }
    in(car){
        const info=this.camera.shot(car)
        const i = parseInt(Math.random()*100%100)
        const space=this.floors[0].spaces[i]
        space.in()
        info.space=space
        this.carList[car.num]=info
    }
    out(car){
         const info=this.carList[car.num]
         const space=info.space
         space.out();
         this.screen.show(car,info.inTime);
         delete this.carList[car.num]
    }
    emptyNum(){
        return this.floors.map(floor=>{
            return `${floor.index} 
            ${floor.emptySpaceNum()}`
        }).join('\n')
    }
}

class Floor{
    constructor(index,spaces){
        this.index=index;
        this.spaces=spaces||[]
    }
    emptySpaceNum(){
        let num=0;
        this.spaces.forEach(p=>{
            if(p.empty){
                num=num+1
            }
        })
        return num
    }
}

class ParkSpace{
    constructor(){
        this.empty=true
    }
    in(){
         this.empty=false
    }
    out(){
          this.empty=true
    }
}
//test
const floors=[];
for(let i=0;i<3;i++){
    const spaces=[];
    for(let j=0;j<100;j++){
        spaces[j]=new ParkSpace()
    }
    floors[i]=new Floor(i+1,spaces)
}
const park=new Park(floors)

const car1=new Car('sb')
const car2=new Car('cnm')
const car3=new Car('nt')

console.log(park);
console.log(park.emptyNum())
park.in(car1)
console.log(park.emptyNum())
park.in(car2)


console.log(park.emptyNum())
setTimeout(()=>{
    park.out(car1)
console.log(park.emptyNum())
},1000)