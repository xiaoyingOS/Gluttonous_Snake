//定义食物的类
class Food{
    //定义一个属性，用来表示食物对应的元素
    foodElement: HTMLElement;
    constructor(){
        //通过id获取页面food元素，并赋值给foodElement
        this.foodElement = document.getElementById("food")!;
    }

    //定义获取食物X轴坐标
    get X(){
        return this.foodElement.offsetLeft;
    }
    //定义获取食物Y轴坐标
    get Y(){
        return this.foodElement.offsetTop;
    }

    //修改食物的位置
    change(){
        //位置范围：0~124 ???
        //每次都是一个随机数
        //蛇移动一次是10，食物是10的倍数
        let left = Math.round(Math.random()*124) * 10;
        let top = Math.round(Math.random()*124) * 10;

        if(top > 700){
            top = Math.round(Math.random()*70) * 10;
        }

        this.foodElement.style.left = left + "px";
        this.foodElement.style.top = top + "px";
    }
}

// //测试
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);

//暴露出去
export default Food;