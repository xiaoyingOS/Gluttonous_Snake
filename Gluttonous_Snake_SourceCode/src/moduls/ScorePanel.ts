//定义计分牌
class ScorePanel{
    //score和level用来记录分数或等级
    //设置成私有属性，禁止外面修改
    private __score: number = 0;
    private __level: number = 0;

    //设置一个变量限制等级
    private __maxLevel: number;
    //设置变量，多少分数升级
    private __upScore: number;

    //分数和等级所在元素，在构造函数中初始化
    scoreElement: HTMLElement;
    levelElement: HTMLElement;

    constructor(maxLevel: number = 33,upScore: number = 10000){
        this.scoreElement = document.getElementById("score")!;
        this.levelElement = document.getElementById("level")!;
        this.__maxLevel = maxLevel;
        this.__upScore = upScore;
    }

    //获取等级
    get maxLevel(){
        return this.__maxLevel;
    }

    //获取多少分升1级
    get upScore(){
        return this.__upScore;
    }

    //getter，获取分数
    get Score(){
        return this.__score;
    }

    //setter,修改分数
    set Score(score_1: number){
        if(score_1 > 0){
            this.__score = score_1;
        }
    }

    //设置加分方法
    addScore(){
        //分数自增
        this.Score = this.Score + 100000000;
        this.scoreElement.innerHTML = this.Score + "";
        
        if(this.Score % this.upScore === 0){
            this.levelUp();
        }
    }

    //getter，获取等级

    get Level(){
        return this.__level;
    }

    //setter,修改等级
    set Level(level_1: number){
        if(level_1 > 0){
            this.__level = level_1;
        }
    }

    //升级方法
    levelUp(){
        if(this.Level < this.maxLevel){
            this.Level = this.Level + 1;
            this.levelElement.innerHTML = this.Level + "";
        }
    }

    
}

export default ScorePanel;

//测试
// const scorePanel = new ScorePanel();
// for(let i=0;i<100;i++){
//     scorePanel.addScore();
// }
