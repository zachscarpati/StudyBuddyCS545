let idx = 0;
let correct = 0;
let number = 6;
let counter = 0;

let problem = documnet.querySelector('.problem');
let problemImg = document.querySelector('.problem img');
let pOptions = document.querySelector('.buttons');
let pArray = document.querySelector('.buttons button');
let notification = document.querySelector('.buttons p.notification');
let results = document.querySelector('.result');
let score = document.querySelector('.result .score span');
let header = document.querySelector('header');
let questions


function newGame(section) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            questions = JSON.parse(this.responseText);
            questions = questions.sort(() => Math.random() - Math.random()).slice(0, number);
            dataADD(questions[idx], number, section);
            pArray.forEach(button => {
                button.addEventListener('click', () => {
                    if (counter == 0) {
                        let answer = questions[idx].answer;
                        button.classList.add('selected');
                        idx++;
                        setTimeout(() => {
                            check(answer);
                        }, 500);
                        setTimeout(() => {
                            let next = document.getElementById('next')
                            if (idx < number) {
                                next.classList.remove('hidden')
                            }
                        }, 1000);
                        counter++
                    } else {

                    }
                    setTimeout(() => {
                        getResult(number);
                    }, 5000);
                });
            });
        }
    }
    request.open("GET", `/src/data${section}.json`, true);
    request.send();
}

function dataADD(arr, cnt, section) {
    if (idx < cnt) {
        problemImg.src =  `/src/images/sections/${section}/${arr.img}`;
        pArray.forEach((button, i) => {
            button.id = `answer_${i+1}`;
            button.dataset.options = arr[`options`][i];
            button.innerHTML = arr[`options`][i];
        });
    }
}

function result(cnt) {
    if (idx === cnt) {
        pOptions.style.display = 'none'
        problem.style.display = 'none'
        results.style.display = 'block'
        score.innerHTML = correct;
        header.style.display = 'none';
    }
}


function levelNext(section) {
    counter -= 1
    problemImg.src = '';
    pArray.forEach(button => {
        button.classList.remove('selected');
        button.classList.remove('right');
        button.classList.remove('wrong');
        button.classList.remove('showright');
    })
    dataADD(questions[idx], number, section);
    let next = document.getElementById('next')
    next.classList.add('hidden')
}

function notifications(notif) {
    notification.classList.add('notify');
    notification.innerHTML = notif
    setTimeout(function () {
        notification.classList.remove('notify');
    }, 1000); 
}

function checkQ(ans) {
    for (let i=0; i<pArray; i++) {
        if (pArray[i].classList.contains('selected')) {
            let selectedOp = pArray[i].dataset.options;
            if (selectedOp === ans) {
                pArray[i].classList.add('right');
                notifications("&#10004")
                correct++;
            } else {
                pArray[i].classList.add('wrong');
                for (let i=0; i<pArray.length; i++) {
                    if (pArray[i].dataset.options === ans) {
                        pArray[i].classList.add('showright');
                    }
                }
                notifications("&#10006");
            }
        }
    }
}
