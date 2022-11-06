const eleGrid = document.querySelector('.grid');
const eleCell = document.querySelector('.cell');
const title = document.querySelector('#title');
const select = document.querySelector('#select');
const btnPlay = document.querySelector('#play-btn');
const btnHelp = document.querySelector('#help-btn');
const win = document.querySelector('#win');
const lost = document.querySelector('#lost');
let arrMines = [];
let score;
let maxScore;

//Al click del bottone Play crea la griglia
btnPlay.addEventListener('click', function() {
    const numCells = parseInt(select.value);
    const nMines = 16;
    score = 0;
    maxScore = numCells - nMines;
	arrMines = generateMines(nMines, 1, numCells);
	console.log(arrMines.sort((a, b) => a - b)); //print ordine crescente

    eleGrid.classList.remove('hidden');
    title.classList.add('hidden');
    eleGrid.innerHTML = ''; //reset
    
    //creo le celle dinamicamente
    const sideSquare = Math.sqrt(numCells); 
    eleGrid.style.setProperty('--sideSquare', sideSquare); 
    
    for (let i = 1; i <= numCells; i++) { 
        //creazione div e classe delle celle
        const eleCell = document.createElement('div');
        eleCell.classList.add('cell');
        eleCell.classList.add('number');
        eleCell.innerHTML = i; //scrive i numeri dentro le celle
        eleGrid.append(eleCell);

        //Colora le celle al click
        eleCell.addEventListener('click', toggleCell) 
        }
    }
)

//Bottone Help
btnHelp.addEventListener('click', ()=> {
    //se c'é scritto Show Help torna alla schermata principale
    if(btnHelp.dataset.state == 'show-help') {
        btnHelp.dataset.state = 'show-game';
        btnHelp.innerHTML = 'Back to game';
        eleGrid.classList.add('hidden');
        title.classList.remove('hidden');
    } //altrimenti torna al gioco 
    else if (btnHelp.dataset.state == 'show-game') { 
        btnHelp.dataset.state = 'show-help';
        btnHelp.innerHTML = 'Show Help';
        eleGrid.classList.remove('hidden');
        title.classList.add('hidden');
        }
    }
)

//funzione click sulla cella
function toggleCell() {
	// funzione per determinare l'elemento a cui determinare il tipo di cella
	const cellNumber = parseInt(this.innerHTML);

	if (arrMines.includes(cellNumber)) { 
		this.classList.add('bomb');
		disableAllCells(true);
        lost.classList.remove('hidden');
        lost.innerHTML = `Hai perso! Il tuo punteggio é ${score}`
	} else {
		this.removeEventListener('click', toggleCell); // 
		score++; // incremento score 
		this.classList.add('ok');
		if (score == maxScore) {
			disableAllCells(false);
            win.classList.remove('hidden');
            win.innerHTML = `Hai vinto! Il tuo punteggio é ${score}`
		}
	}
}

//Funzione per generare le mine    
function generateMines(nMines, min, max) {
	const arrRandoms = [];
    //forse serve dichiarare 
    let randomNumber;
	for (let i = 0; i < nMines; i++) {
		do {
			randomNumber = getRandomInteger(min, max);
		} while (arrRandoms.includes(randomNumber))
		arrRandoms.push(randomNumber);
	    }
	return arrRandoms;
}

//funzione genera numero random
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function disableAllCells(showMines) {
	const listCells = eleGrid.querySelectorAll('.cell');
	// console.log(listCells);
	for (let i = 0; i < listCells.length; i++) {
		// se é una bomba la illumina
		const cellNumber = parseInt(listCells[i].innerHTML);
		// console.log(cellNumber);
		if (showMines && arrMines.includes(cellNumber)) {
			listCells[i].classList.add('mine');
		} listCells[i].removeEventListener('click', toggleCell);
	}
}