const eleGrid = document.querySelector('.grid');
const eleCell = document.querySelector('.cell');
const title = document.querySelector('#title');
const select = document.querySelector('#select');
const btn = document.querySelector('#play-btn');

btn.addEventListener('click', function() {
    eleGrid.classList.remove('hidden');
    title.classList.add('hidden');
    eleGrid.innerHTML = '';

    const numCells = parseInt(select.value);
    const sideSquare = Math.sqrt(numCells);
    eleGrid.style.setProperty('--sideSquare', sideSquare); 
    
    const arrNumFound = []; //array numeri trovati, fuori dal ciclo o viene resettato sempre.
    for (let i = 1; i <= numCells; i++) { 
        
        let randomNumber;
        do {   //verifica numero 
            randomNumber = getRandomNum(1, numCells); //genera numero da 1 a select.value
            //ciclo for per creare 16 numeri random
            
            //se è incluso rieseguo il blocco, altrimenti vado sul while;
        } while (arrNumFound.includes(randomNumber)) //finché array == numero generato
        arrNumFound.push(randomNumber); //pusha il numero nell'array

        //creazione div e classe delle celle
        const eleCell = document.createElement('div');
        eleCell.classList.add('cell');
        eleGrid.append(eleCell);
        
        //creazione numeri
        let cellNumber = i;
        eleCell.classList.add('number');
        eleCell.innerHTML += cellNumber;

        //funzione toogle per colorare i quadrati sul click
        eleCell.addEventListener('click', function(){
            if (arrNumFound.includes(randomNumber)) {
                eleCell.classList.remove('ok');
                eleCell.classList.add('boom');
            } else {
                eleCell.classList.remove('boom');
                eleCell.classList.add('ok');
            }
            //output numero cliccato in console
            console.log(cellNumber)
        })}

        console.log(arrNumFound);
    //funzione creazione numeri random
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

})
