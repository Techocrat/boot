let app_id = config.app_id;
let app_key = config.app_key;
let b = false;
let count = 0;
let o = false;
let isdrop = false;

let spinner =  `<div class="spinner-border text-primary" 
id="spinner" role="status">
<span class="sr-only"></span>
</div>`

document.querySelector("#content").innerHTML = spinner;

let modal = document.querySelector("#staticBackdrop");

const button = document.getElementById("search");


let counter = 0;
const quantity = 10;

button.addEventListener("click", ()=>
{
    b = true;
    console.log(document.getElementById('inp').value);
    document.querySelector("#content").innerHTML = spinner;
    counter = 0;
    count = 0;
    getData();

})

function dropdown(event)
{
    isdrop = true;
    window.cuisine = event.dataset.cuisine;
    counter = 0;
    document.querySelector("#content").innerHTML = spinner;
    dropdowndata();
}

function dropdowndata()
{
    const start = counter;
    const end = start + quantity;
    counter = end+1;
    isdrop = true;

    let app_id = "ae9ec6b9";
    let app_key = "14b9a265b9446d71415e30308065834f";
    fetch(`https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q&cuisineType=${window.cuisine}&from=${start}&to=${end}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        d(data);
    })
    .catch(error =>{
        window.location.reload();
    })
}


function onl(){

    const start = counter;
    const end = start + quantity;
    counter = end+1;
    
    let app_id = "ae9ec6b9";
    let app_key = "14b9a265b9446d71415e30308065834f";
    fetch(`https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q&cuisineType=indian&from=${start}&to=${end}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        d(data);
    });
}

function getData()
{
    const start = counter;
    const end = start + quantity;
    counter = end+1;
    let inp = document.getElementById("inp").value;
    fetch(`https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q=${inp}&from=${start}&to=${end}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        d(data);
    })
}

function md(recipe)
{

    console.log(recipe);
    document.getElementById('staticBackdropLabel').innerHTML = recipe.label;
    document.getElementById('link').href = recipe.url;
    let ing = document.getElementById('ingredients');
    ing.innerHTML = "";
    document.getElementById('nutrients').innerHTML = "";
    document.getElementById('mealType').innerHTML = recipe.mealType;
    document.getElementById('dishType').innerHTML = recipe.dishType;
    document.getElementById('dietLabel').innerHTML = recipe.dietLabels;
    document.getElementById('yield').innerHTML = recipe.yield;
    document.getElementById('cal').innerHTML = parseInt(recipe.calories);
    for(let i = 0;i<recipe.ingredients.length;i++)
    {
        let ingredient = document.createElement('li');
        ingredient.innerHTML = recipe.ingredientLines[i];
        console.log(recipe.ingredientLines[i]);
        ing.appendChild(ingredient);
    }
    const nutlabel = Object.values(recipe.totalNutrients);
    for(let i =0;i<nutlabel.length;i++)
    {
        let nutrient = document.createElement('div');
        nutrient.innerHTML = nutlabel[i].label;
        document.getElementById('nutrients').appendChild(nutrient);
    }
}

function d(data)
{
    for(let i = 0;i<data.hits.length;i++)
    {
        let rec = JSON.stringify(data.hits[i].recipe);
        document.getElementById('spinner').style.display = 'none';
        let toAdd = document.createElement('div');
        toAdd.className = "col";
        toAdd.innerHTML =`
            <div class="card" style="width:18rem;">
                <img class="card-img-top" src="${data.hits[i].recipe.image}" alt="Card image cap">
                <div class="card-body">
                    <h6 class="card-title">${data.hits[i].recipe.label}</h6>
                </div>
                <div><button id='but' type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#staticBackdrop' onclick='md(${rec})'>Recipe</button></div>
           </div>`
      ;
        document.querySelector("#content").appendChild(toAdd);
    }
    if(b & !count || isdrop){
        setTimeout(2000);
        document.querySelector("#content").scrollIntoView(true);
    }

    o = true;

}

// window.onscroll = () => {
//     if(window.innerHeight + window.scrollY >= document.body.offsetHeight && o)
//     {

//         if(isdrop)
//         {
//             dropdowndata();
//         }
//         else
//         {
//             if(!b)
//             {

//                 onl();
//             }
//             else
//             {
//                 count+=1;
//                 getData();
//             }
//         }
//     }
// }

