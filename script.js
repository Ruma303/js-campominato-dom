const eleGrid = document.querySelector('.grid');
const eleCell = document.querySelector('.cell');
const title = document.querySelector('#title');
const select = document.querySelector('#select');
const btn = document.querySelector('#play-btn');
const arrNumFound = []; //array numeri trovati, fuori dal ciclo o viene resettato sempre.

const numCells = parseInt(select.value);
const sideSquare = Math.sqrt(numCells);

//ciclo per creare un'array di 16 numeri da 1 a max
let randomNumber;
for (let e = 1; e<=16; e++) {
    do {  //verifica numero 
        randomNumber = getRandomNum(1, numCells); //genera numero da 1 a select.value
        //se è incluso rieseguo il blocco, altrimenti vado sul while;
    } while (arrNumFound.includes(randomNumber)) //finché array == numero generato
    arrNumFound.push(randomNumber); //pusha il numero nell'array
}
console.log(arrNumFound);

//funzione creazione numeri random
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
btn.addEventListener('click', function() {
    eleGrid.classList.remove('hidden');
    title.classList.add('hidden');
    eleGrid.innerHTML = '';

    eleGrid.style.setProperty('--sideSquare', sideSquare); 
    
    for (let i = 1; i <= numCells; i++) { 

        //creazione div e classe delle celle
        const eleCell = document.createElement('div');
        eleCell.classList.add('cell');
        eleGrid.append(eleCell);
        
        //creazione numeri nelle celle
        let cellNumber = i;
        eleCell.classList.add('number');
        eleCell.innerHTML += cellNumber;
        
        //evento per colorare i quadrati sul click
        eleCell.addEventListener('click', function(){
            console.log(cellNumber)
            if (arrNumFound.includes(randomNumber)) {
                //eleCell.classList.add('boom');
            } else {
                eleCell.classList.remove('boom');
                eleCell.classList.add('ok');
            }
        })}

})
