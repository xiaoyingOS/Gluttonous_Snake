class Snake{
    //获取蛇的容器
    snakeElement: HTMLElement;
    //蛇头元素
    snakeHead: HTMLElement;
    //蛇身元素(包括蛇头)
    snakeBodies: HTMLCollection;

    constructor(){
        this.snakeElement = document.getElementById("snake")!;
        this.snakeHead = document.querySelector("#snake > div") as HTMLElement;
        this.snakeBodies = this.snakeElement.getElementsByTagName('div');
    }

    //获取蛇头坐标
    get X(){
        return this.snakeHead.offsetLeft;
    }

    get Y(){
        return this.snakeHead.offsetTop;
    }

    //设置蛇头坐标
    set X(snakeCoord_X: number){
        //新值和旧值相同，则直接返回，不修改
        if(this.X === snakeCoord_X) return;
        //检查是否撞墙 X范围0~1250
        if(snakeCoord_X < 0 || snakeCoord_X > 1250){
            //蛇撞墙了，就要把消息传递给GameControl
            throw new Error("蛇撞没了");
        }

        //禁止水平方向掉头(蛇头和蛇第二节问题)
        if(this.snakeBodies[1] && (this.snakeBodies[1] as HTMLElement).offsetLeft === snakeCoord_X){
            //如果蛇掉头，应该继续让它以原来方向走
            if(snakeCoord_X > this.X){
                snakeCoord_X = this.X - 10;
            }else{
                snakeCoord_X = this.X + 10;
            }
        };

        //移动蛇身体
        this.moveBody();

        this.snakeHead.style.left = snakeCoord_X + "px";

        //检查是否撞自己
        this.checkBumpBody();
    }

    set Y(snakeCoord_Y: number){
        if(this.Y ===snakeCoord_Y) return;
        if(snakeCoord_Y < 0 || snakeCoord_Y > 710){
            //蛇撞墙了，就要把消息传递给GameControl
            throw new Error("蛇撞没了");
        }

        //禁止水平方向掉头(蛇头和蛇第二节问题)
        if(this.snakeBodies[1] && (this.snakeBodies[1] as HTMLElement).offsetTop === snakeCoord_Y){
            //如果蛇掉头，应该继续让它以原来方向走
            if(snakeCoord_Y > this.Y){
                snakeCoord_Y = this.Y - 10;
            }else{
                snakeCoord_Y = this.Y + 10;
            }
        };

        //移动蛇身体
        this.moveBody();

        this.snakeHead.style.top = snakeCoord_Y + "px";

        //检查是否撞自己
        this.checkBumpBody();
        
    }

    //蛇增加长度的方法(增加蛇身)
    addBody(){
        //向snakeElement中添加多个div
        for(let i=0; i<3;i++){
            this.snakeElement.insertAdjacentHTML("beforeend", "<div></div>");
        }
    }

    //移动蛇身
    moveBody(){
        //需要将蛇后边的位置 设置为 蛇前一节的位置

        //遍历获取蛇的所有身体
        for(let i = this.snakeBodies.length-1; i > 0; i--){
            //获取前一节身体的位置
            let bodyX = (this.snakeBodies[i-1] as HTMLElement).offsetLeft;
            let bodyY = (this.snakeBodies[i-1] as HTMLElement).offsetTop;

            //将值设置到当前身体上
            (this.snakeBodies[i] as HTMLElement).style.left = bodyX + 'px';
            (this.snakeBodies[i] as HTMLElement).style.top = bodyY + 'px';
        };
    }

    //检查是否撞到自己方法
    checkBumpBody(){
        for(let i=1; i < this.snakeBodies.length; i++){
            if(this.X === (this.snakeBodies[i] as HTMLElement).offsetLeft && this.Y === (this.snakeBodies[i] as HTMLElement).offsetTop){
                //撞到就游戏结束
                throw new Error('撞到自己身子啦 ');
            };
        };
    }

}

//暴露出去
export default Snake;