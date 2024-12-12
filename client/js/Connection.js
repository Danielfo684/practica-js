export class Connection {
  constructor(url) {
    this._url = url;
    this._lastQueryStatus = null;
  }

  getCards(onSuccesCallBack, onErrorCallBack) {
    fetch(`${this._url}/`).then(
      (datos) => {
        datos.json().then(
          (datos) => {
            datos.forEach((card) => {
              const cardElement = document.querySelector(`#${card.id}`);
              if (cardElement) {
                cardElement.style.left = `${card.position.x}px`;
                cardElement.style.top = `${card.position.y}px`;
              }
            });
            this._lastQueryStatus = true;
            onSuccesCallBack(datos.lista);
          },
          (error) => {
            this._lastQueryStatus = false;
            onErrorCallBack("JSONException");
          }
        );
      },
      (error) => {
        this._lastQueryStatus = false;
        onErrorCallBack("ConnectionException");

      }
    );
  }

  sendCards() {
    fetch('http://localhost:3000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Nuevo Ítem'
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Ítem creado:', data);
        })
        .catch(error => {
          console.error('Error al crear el ítem:', error);
        });
  }
}