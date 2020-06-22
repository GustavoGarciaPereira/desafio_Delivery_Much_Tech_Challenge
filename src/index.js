const express = require('express')
const fetch = require('node-fetch');
//var request = require('request-promise');
require('dotenv').config()

const app = express();

app.get('/recipes/:ingredient_1/:ingredient_2',(request,response)=>{
  //response.send(`<h1>Gustvo</h1>`)
  console.log(request.params.ingredient_1)
  console.log(request.params.ingredient_2)
  consulta_apis(response,{"ingredient_1":request.params.ingredient_1,
                          "ingredient_2":request.params.ingredient_2})
    

})


function consulta_apis(res,{ ingredient_1,ingredient_2 }){
    const comida = `http://www.recipepuppy.com/api/?i=${ingredient_1},${ingredient_2}&q=omelet&p=3`
    //const gif = `http://api.giphy.com/v1/gifs/search?q=${formatar_title_gifs(data.results[0].title)}&api_key=goJ6l4rzB8TU9T4SD1VuxWCmLrvHeY9H&limit=1`
    let comidaOjs = new Object()
    let list = []
    let sei_la = fetch(comida)
    .then(response => response.json())
    .then(data => {
      data = data.results
      //console.log("old", data);
      return data;
    })
    .then(data => {
        data.forEach(function(e, index,array) {
          fetch(`http://api.giphy.com/v1/gifs/search?q=${formatar_title_gifs(e.title)}&api_key=${process.env.API_GIF_KAY}&limit=1`)
          .then(response => response.json())
          .then(data => {
            comidaOjs["title"]=e.title
            comidaOjs["ingredients"]= formatar_ingredients(e.ingredients)
            comidaOjs["link"]=e.href,
            comidaOjs["gif"]=data.data[0].embed_url
            list.push(comidaOjs)
            comidaOjs = {}
             
            return list 
          }).then(x=>{
              res.json(x)
              console.log(x)
          })
        });

      });
}


function formatar_ingredients(ingredientes){
    console.log("",)

    return ordenar(ingredientes.split(','))
}

function ordenar(items){
    items.sort(function (a, b) {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      });

      return items
}

function formatar_title_gifs(title){
    return title.replace(/ /g,'+');
}


app.listen(process.env.PORT,()=>{
    console.log("gusta")
})