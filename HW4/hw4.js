/*
{
    author : National Chiao Tung University 0712238 Yan-Tong Lin,
    description :  JS web programming 2020 fall HW 4,
    link: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Test_your_skills:_Object-oriented_JavaScript,
    usage : directly open the hw4.html in the current directory and look at the console,
    license: Apache 2.0,
    notice: this work is done by NCTU 0712238 Yan-Tong Lin @ 2020/11/3, please explicitly refer to this when using a part of this code,
}
*/

/* JS1, prototype style, commented to avoid redeclaration
function Shape(name, sides, sideLength)
{
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
}

Shape.prototype.calcPerimeter = function()
{
    console.log(this.name + "'s perimeter = " + this.sides*this.sideLength);
}
*/

//JS2, ES class syntax 
class Shape
{
    constructor(name, sides, sideLength)
    {
        this.name = name;
        this.sides = sides;
        this.sideLength = sideLength;
    }
    calcPerimeter()
    {
        console.log(this.name + "'s perimeter = " + this.sides*this.sideLength);
    }
}

//JS3, inheritance
class Square extends Shape
{
    constructor(sideLength)
    {
        super("square", 4, sideLength);
    }
    calcArea()
    {
        console.log(this.name + "'s area = " + this.sideLength**2);
    }
}

var square = new Shape("square", 4, 5);
var triangle = new Shape("triangle", 3, 3);
var square2 = new Square(5);

square.calcPerimeter();
triangle.calcPerimeter();
square2.calcPerimeter();
square2.calcArea();


