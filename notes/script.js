const notesLS = JSON.parse(localStorage.getItem('notes'));
if(notesLS) {
    notesLS.forEach(txt => {
        addNewNote(txt);
    });
}

const addBtn = document.getElementById('add');

addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(txt = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="tools">
            <button class="edit fas fa-edit"></button>
            <button class="delete fas fa-trash-alt"></button>
        </div>

        <div class="main ${txt ? '': "hidden"}"></div>
        <textarea class="${txt ? "hidden": ''}"></textarea>
    `;

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    
    const textarea = note.querySelector('textarea');
    const main = note.querySelector('.main');
    
    textarea.value = txt;
    main.innerHTML = marked.parse(txt);
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });
    
    textarea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked.parse(value);

        updateLS();
    });

    document.body.appendChild(note);
};

function updateLS() {
    const notesTxt = document.querySelectorAll('textarea');

    const notes = [];
    notesTxt.forEach(note => {
        notes.push(note.value);
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
};