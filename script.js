import {
    saveData
} from "./hulpfuncties.js";

let animals = JSON.parse(localStorage.getItem('dogList')) || [];
const update = new CustomEvent('updateList');

console.log(animals);



/* Extra info bovenaan overzicht scherm */



infoHonden();

console.log(animals)

/* Caretaker event */

const careTaker = document.querySelector('#feedbackCaretaker');
if (careTaker != null) {
    careTaker.addEventListener('click', () => {
        Caretaking();
    })
}


/* Filtering showAnimalList on adoptable or not */

const checkbox = document.querySelector('#checkbox');

if (checkbox != null) {
    checkbox.addEventListener('input', () => {

        const position = document.querySelector('div.container');
        position.innerHTML = '';

        if (checkbox.checked) {
            animals.forEach((x) => {

                if (x.Karakter.length > 0) {
                    showAnimal(x);
                }

            })
        } else {
            animals.forEach(showAnimal)
        }

    })

}




/* EventHandeling (updatelist) */
const container = document.querySelector('div.container');

if (container != null) {
    container.addEventListener('updateList', () => {
        
        updateAnimals();
    })

}

if(animals != null)
    {
        animals.forEach(showAnimal);

    }



/* FUNCTIONS */



function showAnimal(x) {

    const animalAdd = document.createElement('article');
    const position = document.querySelector('div.container')
    animalAdd.innerHTML = `<img class="icon" src="./img/window.png" alt="Check on animal"></img><img class="icon2" src="./img/health-care.png" alt="Call the vet"></img><ul><li>Id: ${x.Id}</li><li>Ras: ${x.Ras}</li><li>Naam: ${x.Naam}</li><li>Geslacht: ${x.geslacht}</li><li>Leeftijd: ${x.Leeftijd}</li><li>Karakter: ${x.Karakter}</li><li>Gezondheid: ${x.gezondheid}</li></ul>`;
    animalAdd.classList.add('flexbox')


    /* icon (medical services & psychiatric check up)  events */

    const icon1 = animalAdd.firstElementChild;

    icon1.addEventListener('click', () => {
        x.Karakter = prompt("What did you find out about the dog's personality?");
        console.log(x.Karakter);
        container.dispatchEvent(update);
        saveData(animals)
        
    })

    icon1.nextElementSibling.addEventListener('click', () => {
        x.gezondheid = 'goed';
        container.dispatchEvent(update)
    })

    if (position != null) {
        position.appendChild(animalAdd)
    }
}

function removeAnimal(x) {

    const index = animals.findIndex((ani) => {
        return ani.Id == x;
    })

    animals.splice(index, 1);
    saveData(animals);
    container.dispatchEvent(update);
}

function Caretaking() {
    const feedbackposition = document.querySelector('.Feedback_Caretaker');
    const feedbackelement = document.createElement('article');
    
    if(animals !=null) 
        {
       
            animals.forEach((x) => {
        const chance = Math.floor(Math.random() * 100);
        if (chance < 20 && x.gezondheid == 'kritiek') {

            removeAnimal(x.Id)


            feedbackelement.innerHTML += `<p>${x.Naam} is gestorven</p>`;
            if (feedbackposition != null) {
                feedbackposition.appendChild(feedbackelement);

            }

        }


        if (chance < 20 && x.gezondheid == 'slecht') {
            x.gezondheid = 'kritiek'
            feedbackelement.innerHTML += `<p>De gezondheid van ${x.Naam} is kritiek</p>`;
            if (feedbackposition != null) {
                feedbackposition.appendChild(feedbackelement);

            }

        }
        if (chance < 20 && x.gezondheid == 'goed') {
            x.gezondheid = 'slecht'
            feedbackelement.innerHTML += `<p>De gezondheid van ${x.Naam} is achteruit gegaan</p>`;
            if (feedbackposition != null) {
                feedbackposition.appendChild(feedbackelement);

            }


        }
          })

        }
    




  
        
    updateAnimals();
    saveData(animals);
    infoHonden();

}

function updateAnimals() {
    container.innerHTML = '';
    animals.forEach(showAnimal);
    infoHonden();

}

function infoHonden() {
    const info = document.querySelector('#ziekeHonden');
    const info2 = document.querySelector('#aantalHonden');

    if (info != null) {
        info.innerText = 'Aantal honden in asiel:';
    }


    if (info2 != null) {
        info2.innerText = 'Aantal zieke honden in asiel: ';
    }


    let teller = 0;

    if (animals != null) {
        animals.forEach((x) => {
            if (x.gezondheid != 'goed') {
                teller++;
            }
        })


        if (info != null) {
            info2.innerText += teller;
        }
        if (info2 != null) {
            info.innerText += animals.length;
        }


    }


}

