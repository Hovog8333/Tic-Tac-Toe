
// SELECTS
let body = document.querySelector('body');
const game = document.getElementById('game');
const input = document.getElementById('input');
const submit = document.getElementById('submit');
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const submit1 = document.getElementById('submit1');
const submit2 = document.getElementById('submit2');
let name1 = document.getElementById('name1');
let name2 = document.getElementById('name2');
let result1 = document.getElementById('result1');
let result2 = document.getElementById('result2');
const box = document.getElementById('box');
const winner = document.querySelector('.winner');
const winresult = document.getElementById('winresult');
const close = document.getElementById('close');
const w = document.getElementById('w');
let xod = document.querySelector('.xod');
let who = document.querySelector('.who');
let txt = document.getElementById('txt');
let imgArr = [
    "url('images/img1.jpg')",
    "url('images/img2.jpg')",
    "url('images/img3.jpg')",
    "url('images/img4.png')",
    "url('images/img5.jpg')",
    "url('images/img6.jpg')",
    "url('images/img7.jpg')",
    "url('images/img8.jpg')",

];

// EVENTS
submit.addEventListener('click', generator);
game.addEventListener('click', add);
submit1.addEventListener('click', submit1Func);
submit2.addEventListener('click', submit2Func);
close.addEventListener('click', closeFunc);

setTimeout(() => {
    body.style.backgroundImage = imgArr[Math.floor(Math.random() * imgArr.length)];
    let i = setInterval(() => {
        body.style.backgroundImage = imgArr[Math.floor(Math.random() * imgArr.length)];
    }, 3000);

});

// FUNCTIONS
function generator(e) {
    // e.preventDefault();

    let v = input.value;
    game.innerHTML = '';
    for (let i = 0; i < (v * v); i++) {
        game.innerHTML += '<div class="block"></div>';
    }

    game.style.width = game.style.height = (v * 70) + 'px';
    game.style.backgroundColor = 'rgba(0,0,255,0.2)';
    game.style.display = 'block';

    text1.setAttribute('disabled', 'true');
    text2.setAttribute('disabled', 'true');
    // input.setAttribute('disabled', 'true');
    submit1.setAttribute('disabled', 'true');
    submit2.setAttribute('disabled', 'true');
    // submit.setAttribute('disabled', 'true');
    if (name1.innerHTML == '') name1.innerHTML = 'X';
    if (name2.innerHTML == '') name2.innerHTML = 'O';
    // input.value = '';

}

let n = 0;
function add(e) {
    let matrix = getMatrix();
    text1.setAttribute('disabled', 'true');
    text2.setAttribute('disabled', 'true');
    input.setAttribute('disabled', 'true');
    submit1.setAttribute('disabled', 'true');
    submit2.setAttribute('disabled', 'true');
    submit.setAttribute('disabled', 'true');

    if (n % 2 == 0) {
        if (e.target.innerHTML !== '') return;
        e.target.innerHTML = 'X';
        who.style.right = '0px';
    } else if (n % 2 != 0) {
        if (e.target.innerHTML !== '') return;
        e.target.innerHTML = 'O';
        who.style.left = '0px';
    }
    n++;

    // console.log(matrix);
    stugel();
}

function getMatrix(v) {
    v = input.value;
    const arr = document.querySelectorAll('.block'); // 2 array
    const matrix = [];
    let k = [];
    for (let i = 0; i < arr.length; i++) {
        k.push(arr[i]);
        if (k.length == v) {
            matrix.push(k);
            k = [];
        }
    }
    return matrix;
}


function stugel() {
    const matrix = getMatrix();
    const v = input.value;

    let nichia = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].innerHTML == 'X' || matrix[i][j].innerHTML == 'O') nichia++;
        }
        if (nichia == v * v) end('*');
    }


    let toxX;
    for (let i = 0; i < matrix.length; i++) {
        toxX = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].innerHTML == 'X') {
                toxX++;
            }
        }
        if (toxX == v) {
            end('X');
            break;
        }
    }

    let syunX;
    for (let i = 0; i < matrix.length; i++) {
        syunX = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[j][i].innerHTML == 'X') {
                syunX++;
            }
        }
        if (syunX == v) {
            end('X');
            break;
        }
    }

    let ank1 = 0;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][i].innerHTML == 'X') {
            ank1++;
        }
    }
    if (ank1 == v) end('X');

    let ank2 = 0;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][matrix.length - 1 - i].innerHTML == 'X') {
            ank2++;
        }
    }
    if (ank2 == v) end('X');

    // FOR O

    let toxO;
    for (let i = 0; i < matrix.length; i++) {
        toxO = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].innerHTML == 'O') {
                toxO++;
            }
        }
        if (toxO == v) {
            end('O');
            break;
        }
    }

    let syunO;
    for (let i = 0; i < matrix.length; i++) {
        syunO = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[j][i].innerHTML == 'O') {
                syunO++;
            }
        }
        if (syunO == v) {
            end('O');
            break;
        }
    }

    let ank1O = 0;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][i].innerHTML == 'O') {
            ank1O++;
        }
    }
    if (ank1O == v) end('O');

    let ank2O = 0;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][matrix.length - 1 - i].innerHTML == 'O') {
            ank2O++;
        }
    }
    if (ank2O == v) end('O');


}
let k = 2;
let count1 = 0;
let count2 = 0;
function end(item) {
    input.removeAttribute('disabled');
    let name;
    if (item == 'X') {
        console.log('Winner x');
        result1.innerHTML = count1 + 1;
        count1++;
        name = n1 ? n1 : 'X';
        winresult.innerHTML = count1;
    } else if (item == 'O') {
        result2.innerHTML = count2 + 1;
        count2++;
        name = n2 ? n2 : 'O';
        winresult.innerHTML = count2;
    } else if (item == '*') {
        name = 'nichia';
        txt.innerHTML = 'NICHIA';
        winresult.innerHTML = result1.innerHTML + ' - ' + result2.innerHTML;
    }
    // game.style.opacity = '0';
    if (k % 2 == 0) {
        game.style.display = 'none';
        winner.style.marginRight = 'calc(50% - 75px)'
        winner.style.marginTop = '150px'
        winner.style.opacity = '.9';
        w.innerHTML = name;
    } else {
        game.style.display = 'none';
        winner.style.marginLeft = 'calc(50% - 75px)'
        winner.style.marginTop = '150px'
        winner.style.opacity = '.9';
        w.innerHTML = name;
    }
    k++;

    n = 0;

    // rAttribute();
}

let n1;
function submit1Func(e) {
    e.preventDefault();
    let m = text1.value;

    n1 = m ? (text1.value[0].toUpperCase() + text1.value.slice(1)) : '';


    if (name1.innerHTML === '') {
        name1.innerHTML += n1;
        text1.value = '';
    } else {
        name1.innerHTML = n1;
        text1.value = '';
    }

}

let n2;
function submit2Func(e) {
    e.preventDefault();
    let m = text2.value;
    n2 = m ? (text2.value[0].toUpperCase() + text2.value.slice(1)) : '';
    if (name2.innerHTML === '') {
        name2.innerHTML += n2;
        text2.value = '';
    } else {
        name2.innerHTML = n2;
        text2.value = '';
    }
}

function closeFunc() {
    if (k % 2 !== 0) {
        winner.style.marginLeft = '50px';
        winner.style.marginTop = '60px';      // dzx qinaly
        winner.style.opacity = '0';
    } else {
        winner.style.marginTop = '60px';
        winner.style.marginRight = '50px';
        winner.style.opacity = '0';

    }


    // winner.style.marginRight = '50px'
    // winner.style.marginTop = '150px'

    rAttribute();



}
function rAttribute() {
    text1.removeAttribute('disabled');
    text2.removeAttribute('disabled');
    input.removeAttribute('disabled');
    submit1.removeAttribute('disabled');
    submit2.removeAttribute('disabled');
    submit.removeAttribute('disabled');

}