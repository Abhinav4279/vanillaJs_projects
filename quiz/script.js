const quiz = [
    {
        'ques': "Q1",
        'a': "a",
        'b': "b",
        'c': "c",
        'd': "d",
    },
    {
        'ques': "Q2",
        'a': "a",
        'b': "b",
        'c': "c",
        'd': "d",
    },
    {
        'ques': "Q3",
        'a': "a",
        'b': "b",
        'c': "c",
        'd': "d",
    },
    {
        'ques': "Q4",
        'a': "a",
        'b': "b",
        'c': "c",
        'd': "d",
    },
      
];

const quesEl = document.getElementById("ques");
const aEl = document.getElementById('a');
const bEl = document.getElementById('b');
const cEl = document.getElementById('c');
const dEl = document.getElementById('d');

let cnt = 0;
function getQues() {
    const currData = quiz[cnt];
    quesEl.innerText = currData.ques;
    aEl.innerText = currData.a;
    bEl.innerText = currData.b;
    cEl.innerText = currData.c;
    dEl.innerText = currData.d;

};

getQues();
const btEl = document.getElementById('submit');
btEl.addEventListener('click', () => {
    cnt++;

    if(cnt >= quiz.length)
        alert("Quiz Over!");
    else    //Results
        getQues();
});