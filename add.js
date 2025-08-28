import { saveData } from "./hulpfuncties.js";
 
 const animals = JSON.parse(localStorage.getItem('dogList'))








/* Adding animal + updating animal list with added animal  */

const userInput = document.querySelector('form.userInput');

if(userInput != null)
    {
        userInput.addEventListener('submit', (x) => 
        {
        x.preventDefault();
        addAnimal();
        
        
        
        })  

    }



/* FUNCTIONS */

function  findHighestId(){
    let Id = 0;

    if(animals != null)
        {
            animals.forEach((x) =>{
        if(x.Id > Id)
        {Id = x.Id}

    })

    return Id;

        }
    
    
}

function addAnimal () {
const animal = {
        Id: findHighestId() +1,
        Ras: document.querySelector('#Ras').value,
        Naam: document.querySelector('#Naam').value,
        Leeftijd: document.querySelector('#Leeftijd').value,
        geslacht: document.querySelector('#geslacht').value,
        Karakter: "",
        gezondheid: 'goed'

    }

animals.push(animal)
saveData(animals)

const feedback = document.querySelector('#feedback');

if (feedback != null)
    {   
        feedback.innerText = 'Gelukt!'

    }

  
} 

 



