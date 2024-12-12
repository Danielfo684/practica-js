import { Connection } from './Connection.js';


export const uiDrag = {
    init: (dropZones, notes) => {

        const cardPositions = [];

        document.getElementById('post-positions').addEventListener('click', () => {
           
            const cardPositionsJson = JSON.stringify(cardPositions);
            Connection.sendCards(cardPositionsJson);
        });
        //Notes Section
        document.querySelectorAll(notes).forEach((note) => {
            // Ensure each note has a unique ID
            // Draggable
            note.setAttribute('draggable', 'true');
            switch (note.dataset.suit) {
                case 'basto':
                    note.style.backgroundImage = 'url("images/as-bastos.png")';
                    note.style.backgroundSize = 'cover';
                    break;
                case 'copa':
                    note.style.backgroundImage = 'url("images/copa.jpg")';
                    note.style.backgroundSize = 'cover';
                    break;
                case 'espada':
                    note.style.backgroundImage = 'url("images/espadas.jpg")';
                    note.style.backgroundSize = 'cover';
                    break;
                case 'oro':
                    note.style.backgroundImage = 'url("images/oro.jpg")';
                    note.style.backgroundSize = 'cover';
                    break;
            }

            //DragStart event
            note.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', event.target.id);
                note.classList.add('dragging');
            });

            //DragEnd event
            note.addEventListener('dragend', () => {
                note.classList.remove('dragging');
            });
        });

        //Drop Zones Section
        document.querySelectorAll(dropZones).forEach((zone) => {
            //DragOver event
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.style.backgroundColor = '#e0f7fa';
            });

            zone.addEventListener('dragleave', () => {
                zone.style.backgroundColor = '#f4f4f4';
            });

            let espadas = [];
            let copas = [];
            let oros = [];
            let bastos = [];
let droppedCards = [espadas, copas, oros, bastos];

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                let card = e.dataTransfer.getData('text/plain');
                let idCard = document.getElementById(card);
                if (zone.id === idCard.dataset.suit) {
                    // let extension = zone.getElementsByClassName('card').length;
                    // if (idCard.dataset.value == (1 + zone.getElementsByClassName('card').length) ) {


                    const draggingNote = document.querySelector('.dragging');
                    //    const x = e.clientX - zone.getBoundingClientRect().left -50;
                    const x = e.clientX - zone.getBoundingClientRect().left - (draggingNote.offsetWidth / 2);
                    const y = e.clientY - zone.getBoundingClientRect().top - (draggingNote.offsetWidth / 2);

                    draggingNote.style.position = 'absolute';
                    draggingNote.style.left = `${x}px`;
                    draggingNote.style.top = `${y}px`;

                    const cardPosition = {
                        "id": card,
                        "suit": zone.id,
                        "x": draggingNote.style.left,
                        "y": draggingNote.style.top
                    };


                    // IMPORTANTE: Aquí se envía la posición de la carta al servidor. Está comentada porque se envía con la posición incorrecta.
                    //Probar la conexión con el servidor descomentando la siguiente línea
                 
                    //  Connection.sendCards(cardPosition);

                    zone.appendChild(draggingNote);

                    // }
                }


                //   Cambia el color de la nota dependiendo de la zona


                zone.style.backgroundColor = '#fff';
            });
        });

    }
}