const params = new URLSearchParams(window.location.search);
const data = await (await fetch(params.get('src'))).json();
console.log(data);

document.title = data.title;
document.querySelector('h1').innerText = data.title;

const flashcardsDiv = document.getElementById('flashcards');
let first = true;
for (const card of data.cards) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('flashcard');
    if (first) {
        cardDiv.classList.add('selected');
        first = false;
    }

    const cardQuestion = document.createElement('h2');
    cardQuestion.classList.add('question');
    cardQuestion.innerText = card.question;
    cardDiv.appendChild(cardQuestion);

    const cardAnswer = document.createElement('h2');
    cardAnswer.classList.add('answer');
    cardAnswer.innerText = card.answer;
    cardDiv.appendChild(cardAnswer);

    cardDiv.addEventListener('click', () => {
        cardDiv.classList.toggle('show-answer');
    });

    flashcardsDiv.appendChild(cardDiv);
}

document.getElementById('control-back').addEventListener('click', () => {
    const selected = document.querySelector('.flashcard.selected');
    if (selected.previousElementSibling !== null) {
        selected.classList.remove('selected');
        selected.classList.remove('show-answer');
        selected.previousElementSibling.classList.add('selected');
    }
});

document.getElementById('control-next').addEventListener('click', () => {
    const selected = document.querySelector('.flashcard.selected');
    if (selected.nextElementSibling !== null) {
        selected.classList.remove('selected');
        selected.classList.remove('show-answer');
        selected.nextElementSibling.classList.add('selected');
    }
});