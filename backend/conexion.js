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

const db = getDatabase();

/* Refrences */
var nombre = document.getElementById("nombre");
var categoria = document.getElementById("categoria");
var costo = document.getElementById("costo");
var inventario = document.getElementById("inventario");

var insBtn = document.getElementById("Insbtn");
var selBtn = document.getElementById("Selbtn");
var updBtn = document.getElementById("Updbtn");
var delBtn = document.getElementById("Delbtn");

/* Functions */
function SuggestedPrice(cost, category) {
    let precio = 0
    let mar = '';
    switch (category) {
        case 'Abarrotes':
            mar = 1.38;
            precio = cost * mar;
            return precio;
            break;
        case 'FrutasVerduras':
            mar = 1.5;
            precio = cost * mar;
            return precio;
            break;
        case 'Farmacia':
            mar = 1.5;
            precio = cost * mar;
            return precio;
            break;
        case '18+':
            mar = 1.5;
            precio = cost * mar;
            return precio;
            break;
        case 'Higiene':
            mar = 1.38;
            precio = cost * mar;
            return precio;
            break;
        case 'Bebidas':
            mar = 1.26;
            precio = cost * mar;
            return precio;
            break;
        case 'Desechable':
            mar = 1.4;
            precio = cost * mar;
            return precio;
            break;
        case 'Sabritas':
            mar = 1.33;
            precio = cost * mar;
            return precio;
            break;
        case 'Gamesa':
            mar = 1.33;
            precio = cost * mar;
            return precio;
            break;
        case 'Barcel':
            mar = 1.33;
            precio = cost * mar;
            return precio;
            break;
        case 'Bimbo':
            mar = 1.33;
            precio = cost * mar;
            return precio;
            break;
        case 'Marinela':
            mar = 1.45;
            precio = cost * mar;
            return precio;
            break;
        case 'Especias':
            mar = 1.33;
            precio = cost * mar;
            return precio;
            break;
        case 'Yoplait':
            mar = 1.33;
            precio = cost * mar;
            return precio;
            break;
        case 'Regalos':
            mar = 1.38;
            precio = cost * mar;
            return precio;
            break;
        case 'Dulceria':
            mar = 1.38;
            precio = cost * mar;
            return precio;
            break;
        case 'Papeleria':
            mar = 1.5;
            precio = cost * mar;
            return precio;
            break;
        default:
            mar = 1.38;
            precio = cost * mar;
            return precio;
            break;
    }
}

function InsertData() {
    let costo2 = parseInt(costo.value) / parseInt(inventario.value);
    let precio = SuggestedPrice(costo2, categoria.value);
    set(ref(db, "ProductosYPrecios/" + nombre.value), {
            NombreProducto: nombre.value,
            Categoria: categoria.value,
            Costo: costo2,
            Precio: precio,
            Inventario: inventario
        })
        .then(() => {
            nombre.value = "";
            categoria.value = "";
            costo.value = "";
            inventario.value = "";
            console.log("Data stored succesfully!");
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}

function SelectData() {
    const dbref = ref(db);

    get(child(dbref, "ProductosYPrecios/" + nombre.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                nombre.value = snapshot.val().NombreProducto;
                categoria.value = snapshot.val().Categoria;
                costo.value = snapshot.val().Costo;

            } else {
                altert("No data found");
            }
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}

function UpdateData() {
    let costo2 = parseInt(costo.value) / parseInt(inventario.value)
    let precio = SuggestedPrice(costo2, categoria.value);
    update(ref(db, "TheStudents/" + nombre.value), {
            NombreProducto: nombre.value,
            Categoria: categoria.value,
            Costo: costo2,
            Precio: precio,
            Inventario: inventario
        }).then(() => {
            nombre.value = "";
            categoria.value = "";
            costo.value = "";
            inventario.value = "";
            console.log("Data updated succesfully!");
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}

function RemoveData() {
    const dbref = ref(db);
    remove(ref(db, "TheStudents/" + rollbox.value))
        .then(() => {
            alert("The student with RollNo " + rollbox.value + " was removed successfully!");
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        })
}

/* Assign events to btns */

insBtn.addEventListener('click', InsertData);
selBtn.addEventListener('click', SelectData);
updBtn.addEventListener('click', UpdateData);
delBtn.addEventListener('click', RemoveData);