// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdFqmIZ3OYLUgTAOYjFLSurWabGVwHII8",
    authDomain: "productos-precios-tienda.firebaseapp.com",
    databaseURL: "https://productos-precios-tienda-default-rtdb.firebaseio.com",
    projectId: "productos-precios-tienda",
    storageBucket: "productos-precios-tienda.appspot.com",
    messagingSenderId: "449436581613",
    appId: "1:449436581613:web:9888850bf60624b651d6e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js"

const tr = document.createElement('tr');
tr.className = 'producto';
const parentNode = document.querySelector('.contenedor');

// Getting data from firebase
const dbRef = ref(getDatabase());
get(child(dbRef, "ProductosYPrecios/"))
    .then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            snapshot.forEach(child => {
                let name = child.val().NombreProducto;
                let category = child.val().Categoria;
                let cost = child.val().Costo;
                let price = child.val().Precio;
                console.log(name);
                tr.innerHTML += (`
                <th>
                    <div class="nombre">${name}</div>
                </th>
                <th>
                    <div class="categoria">${category}</div>
                </th>
                <th>
                    <div class="costo">${cost}</div>
                </th>
                <th>
                    <div class="precio-sugerido">${price} sugerido</div>
                </th>
                `);
                tr.style.cssText = ""
                parentNode.appendChild(tr);
            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });