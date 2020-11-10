/*
{
    author : National Chiao Tung University 0712238 Yan-Tong Lin,
    description :  JS web programming 2020 fall HW 5,
    usage : directly open the hw4.html in the current directory and look at the console,
    license: Apache 2.0,
    notice: this work is done by NCTU 0712238 Yan-Tong Lin @ 2020/11/10, please explicitly refer to this when using a part of this code,
}
*/

//boundary can be set easily
let X = 800;
let Y = 600;
let R = 50;
let v_min = 3;
let v_max = 5;

//reusable rand int function
function rand_int(l, r) // [l, r]
{
    return Math.floor(Math.random()*(r-l+1)+l);
}

// class for Ball, OOP style
class Ball
{
    constructor() 
    {
        // get random radius and color(by rgb)
        this.color = "rgb(" + rand_int(0, 255) + "," + rand_int(0, 255) + "," + rand_int(0, 255) + ")";
        this.radius = rand_int(10, 20);
        //initial position vector x_0, position is the top_left position of the ball
        this.x0 = {x:rand_int(0, X-R), y:rand_int(0, Y-R)};
        // x, v vectors for modeling motions
        // please note that x is a common notation for position vector in mechanics
        this.x = {x:this.x0.x, y: this.x0.y};
        this.v = {x:rand_int(v_min, v_max), y:rand_int(v_min, v_max)};

        //created node
        this.node = document.createElement("div");
        //set node init attr
        this.node.setAttribute("class", "ball");
        this.node.style.width = (2*this.radius) + "px";
        this.node.style.height = this.node.style.width;
        this.node.style.backgroundColor = this.color;
        this.node.style.left = this.x.x + "px";
        this.node.style.top = this.x.y + "px";
    }

    // update x (position) with v (velocity)
    move()
    {
        //check reflection before update
        if(this.x.x + this.v.x > X-this.radius*2 || this.x.x < 0)
        {
            this.v.x *= -1;
        }
        if(this.x.y + this.v.y > Y-this.radius*2 || this.x.y < 0)
        {
            this.v.y *= -1;
        }
        //update with velocity
        this.x.x += this.v.x;
        this.node.style.left = this.x.x + "px";
        this.x.y += this.v.y;
        this.node.style.top = this.x.y + "px";
    }
}

// open a container
var container = document.createElement("div");
container.setAttribute("id", "container");
container.style.width = X;
container.style.height = Y;
container.style.position = "relative";
container.style.backgroundColor = "black"
document.body.appendChild(container);

// array for balls
let balls = [];
// number of balls rand from [3,10]
let n_balls = rand_int(3, 10);
for (let i = 0; i < n_balls; i++)
{
    // init new ball
    balls.push(new Ball());
    // add to containers chidren  set
    container.appendChild(balls[i].node);
}

// call to update all balls; position by Ball.move
function run()
{
    for (let i = 0; i < n_balls; i++)
    {
        balls[i].move();
        container.childNodes[i] = balls[i];
    }
}

// open a intervaled thread 
let thread = setInterval(run, 10);
// avoiding infinite loop 
setTimeout(clearInterval, 15000, thread);

/* another coding style, teacher dislikes it
let timer = setInterval( function(){
    //run
}, 100);
 */