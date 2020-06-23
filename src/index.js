const express = require('express')
const fetch = require('node-fetch');
//var request = require('request-promise');
require('dotenv').config()

const app = express();

app.get('/recipes/:ingredient_1/:ingredient_2',async (request,response)=>{
  console.log(request.params.ingredient_1)
  console.log(request.params.ingredient_2)
  const resposta = await consulta_apis(response,{"ingredient_1":request.params.ingredient_1,
                          "ingredient_2":request.params.ingredient_2})
  
  console.log(resposta)

})


async function consulta_apis(res,{ ingredient_1,ingredient_2 }){
    const comida = `http://www.recipepuppy.com/api/?i=${ingredient_1},${ingredient_2}&q=omelet&p=3`
    let comidaOjs = new Object();


    comidaOjs["keywords"]=[ingredient_1,ingredient_2]
    let list = []
    let resposta = await fetch(comida)
    .then(response => response.json())
    .then(data => {
      data = data.results
      return data;
    })
    .then(data => {
        data.forEach(function(e, index,array) {
        fetch(`http://api.giphy.com/v1/gifs/search?q=${formatar_title_gifs(e.title)}&api_key=${process.env.API_GIF_KAY}&limit=1`)
          .then(response => response.json())
          .then(data => {

            let returnedTarget = Object.assign({
             ["title"]: e.title,
             ["ingredients"]:formatar_ingredients(e.ingredients),
             ["link"]: e.href,
             
            }, {["gif"]:data.data[0].embed_url});
            
            list.push(returnedTarget)

            returnedTarget = {}
             
            return list 
          }).then(x=>{

            comidaOjs["recipes"] = x
            return comidaOjs

          }).then(x=>{
            
            console.log(x)
            

            res.status(200).json(x)
            return x
          })

        });
        return comidaOjs
      });
      console.log(resposta)
      
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
    console.log("gustavo")
})