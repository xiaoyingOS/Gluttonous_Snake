//导入其他类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

//游戏控制器，控制其他的所有类
class GameControl{
    //定义3个属性
    //蛇 食物 计分牌
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    //创建一个属性，用来存储蛇的移动方向 (也就是按键控制的方向)
    direction: string = "Right";

    //创建一个变量，用来记录游戏是否结束
    isLive: boolean = true;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(14,1);

        //调用方法
        this.init();
    }

    //游戏初始化，调用这个函数，游戏就开始
    init(){
        //绑定键盘按下事件
        document.addEventListener("keydown", this.keydownhander.bind(this));
        
        //调用move方法，使蛇移动
        this.move();
    }

    /**
     * ArrowUp    Up     w  后面wsad是我自己设置的，和主流游戏保持一致
     * ArrowDown  Down   s
     * ArrowLeft  Left   a
     * ArrowRight Right  d
    */

    //创建一个键盘按下的响应函数
    keydownhander(event: KeyboardEvent){
        //检查even.key的值是否合法
        //修改direction属性
        this.direction = event.key;
        // console.log(event.key);

    }

    //创建控制蛇移动的方法
    move(){
        /*
         * 根据方向(this.direction)来改变蛇的位置
         * 向上 top减小
         * 向下 top增加
         * 向左 left减少
         * 向右 left增加
         */

        //获取当前蛇的位置
        let X = this.snake.X; 
        let Y = this.snake.Y;

        //计算X和Y的值
        switch(this.direction){
            case "ArrowUp":
            case "Up":
            case "w":
                //向上移动 top减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
            case "s":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
            case "a":
                //向左移动，left减少
                X -= 10; 
                break;
            case "ArrowRight":
            case "Right":
            case "d":
                X += 10;
                break;

        }

        //检查是否吃到食物
        this.checkEat(X, Y);
           

        //捕获抛出的错误
        try{
            //修改蛇的X和Y的值
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(err){
            //进入catch，表明游戏结束，弹出提示
            
            this.isLive && alert(err + "--> Game Over");
            // let num = 0;
            // console.log(num++);
            
            //并将isLive设置为false
            this.isLive = false;
            
        }


        let time =  80;
        if(this.scorePanel.Level >= 2){
            time = 60;
        }

        if(this.scorePanel.Level >= 5){
            time = 30;
        }

        if(this.scorePanel.Level >= 9){
            time = 20;
        }

        if(this.scorePanel.Level >= 12){
            time = 10;
        }

        if(this.scorePanel.Level === 13){
            //????? 你能过？？？？？？ 
            this.isLive && this.isLive && setTimeout(this.move.bind(this), 1);
            this.isLive && this.isLive && setTimeout(this.move.bind(this), 0);
            this.isLive && this.isLive && setTimeout(this.move.bind(this), 0);
        }

        if(this.scorePanel.Level === 14){
            alert('恭喜 --> 修改源码 <-- 通关');
            throw new Error('程序停止')
        }

        //开启定时器
            this.isLive && setTimeout(this.move.bind(this), time);


    }

    //定义一个方法，用来检查是否吃到食物
    checkEat(X: number, Y: number){
        if(X === this.food.X && Y === this.food.Y){
             //食物位置重置
             this.food.change();
             //加分
             this.scorePanel.addScore();
             //蛇变长
             this.snake.addBody();
        };
    }

}

//暴露出去
export default GameControl;