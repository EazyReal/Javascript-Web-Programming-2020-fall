/*
{
    author : National Chiao Tung University 0712238 Yan-Tong Lin,
    description :  JS web programming 2020 fall HW 3,
    usage : directly open the hw3.html in the current directory,
    license: Apache 2.0,
    notice: this work is done by NCTU 0712238 Yan-Tong Lin @ 2020/10/27, please explicitly refer to this when using a part of this code,
}
*/

// parameters
let mainList = document.getElementById('mainList'); //where the html is inserted
let n = 6; //number of bits
let N = Math.pow(2, n); //get N by number of bits
//let format_card = 5;

// the  function is called to render the html
render_html();
// this complete the game, use lambda style
document.getElementById("submit_button").onclick = function(){
    let sum = 0;
    for(let i = 0; i < n; i++)
    {
        selected = document.getElementById(`checkbox${i}`).checked; //note, do not use value (always give "on")
        // add to sum if selected, note that in js, bool can be convert to int directly using this style
        sum += selected*(2**i);
    }
    alert(`your number is ${sum}`);
}


//the belows are functions for rendering

// use main to make innerHTML of wrapper to be context
function render_html()
{
	//title
    let context = `<li class="title"> <h1>GUESS THE NUMBER</h1> <h4>check the card if the number is in the card</h4>`
    // sublists
    for(let i = 0; i < n; i++)
    {
        context += `<li class="card">
        <ul class="card_wrapper">
            ${render_card(i)}
        </ul>
    </li>`
    }
    context += `<input type="button" class="button" value="Done!" id="submit_button"> </input>`;
    mainList.innerHTML = context;
}

// for correctly print 1st, 2nd, 3rd
function dressing(x)
{
    if(x%10 == 1)
    {
        return "st";
    }
    else if(x%10 == 2)
    {
        return "nd";
    }
    else if(x%10 == 3)
    {
        return "rd";
    }
    else{
        return "th";
    }
}

// card in context
function render_card(b)
{
    let sub = `<li class="card_title">The ${b+1}${dressing(b+1)} Card</li> <input type="checkbox" class="checker" id="checkbox${b}"> </input>`;
    // the numbers
    let B = Math.pow(2, b);
    for(let i = 0; i < N; i++)
    {
        if((i&B) == B)
        {
            sub += `<li class="card_item">` + i + `</li>`
        }
    }
    return sub
}