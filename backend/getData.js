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
const parentNode = document.querySelector('.producto');

var txtBusqueda = document.getElementById("txtBusqueda");
var btnBuscar = document.getElementById("btnBusqueda");



// Getting data from firebase
const dbRef = ref(getDatabase());

function insertToHTML(prod) {
    let name = prod.val().NombreProducto;
    let category = prod.val().Categoria;
    let cost = prod.val().Costo.toFixed(2);
    let price = prod.val().Precio.toFixed(2);
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
            <div class="precio-sugerido">${price}</div>
        </th>
        `);
    tr.style.cssText = ""
    parentNode.appendChild(tr);
}

function getProducts() {
    tr.innerHTML = "";
    let bdBusqueda = '';
    if (txtBusqueda.value == '') {
        get(child(dbRef, 'ProductosYPrecios/'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    snapshot.forEach(child => {
                        insertToHTML(child);
                    });
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
    } else {
        get(child(dbRef, 'ProductosYPrecios/'))
            .then((snapshot) => {
                snapshot.forEach(child => {
                    let prname = child.val().NombreProducto.toLowerCase();
                    let srch = txtBusqueda.value.toLowerCase();
                    if (prname.includes(srch)) {
                        console.log(prname.toLowerCase());
                        insertToHTML(child);
                    }
                });
            }).catch((error) => {
                console.error(error);
            });
    }
    console.log(bdBusqueda)
}

window.onload = getProducts;
txtBusqueda.addEventListener('keydown', getProducts);
btnBuscar.addEventListener('click', getProducts);