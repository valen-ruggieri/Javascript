

// Productos del menu

const productosMenu = [
  {
      id: 1,
      nombre: 'Hamburgesa',
      precio: 50,
      imagen: '/imagenes/Hamburgesa.png',
      tamaño: 'col-lg-3'
  },
  {
      id: 2,
      nombre: 'Lomito',
      precio: 60,
      imagen: '/imagenes/Lomo.png',
      tamaño: 'col-lg-3'
  },
  {
      id: 3,
      nombre: 'Pizza',
      precio: 30,
      imagen: '/imagenes/Pizza.png',
      tamaño: 'col-lg-3'
  },
  {
      id: 4,
      nombre: 'Papas',
      precio: 20,
      imagen: '/imagenes/Papas.png',
      tamaño: 'col-lg-3'
  },
  {
      id: 5,
      nombre: 'Promo Hamburgesa',
      precio: 80,
      imagen: '/imagenes/PromoHamburgesa.png',
      tamaño: 'col-lg-6'
  },
  {
    id: 6,
    nombre: 'Promo Lomitos',
    precio: 100,
    imagen: '/imagenes/PromoLomito.png',
    tamaño: 'col-lg-6'
  },

];

// Items y Carrito para menu y carro de compras
const items = document.getElementById ("items");
const shopCarrito =document.getElementById ("shopCarrito")

// Funcio para actualizar los productos que aprecen en el menu
function renderizarProductos() {
  productosMenu.forEach((info) => {
  
     
      // Columnas del menu
      const colDOM = document.createElement('div');
      colDOM.classList.add('col-12', info.tamaño );
      // items del menu
      const itemDOM = document.createElement('div');
      itemDOM.classList.add('item', 'shadow', 'mb-4',"bg-gradient");
      // Imagenes de los productos
      const imgDOM = document.createElement('img');
      imgDOM.classList.add('item-image');
      imgDOM.setAttribute('src', info.imagen);
      // Titulo de los productos
      const titleDOM = document.createElement('h3');
      titleDOM.classList.add('item-title');
      titleDOM.textContent = info.nombre;
      // Detalle de los productos
      const detailDOM = document.createElement('div');
      detailDOM.classList.add('item-details');
      // Precio de los productos
      const precioDOM = document.createElement('h4');
      precioDOM.classList.add('item-price');
      precioDOM.textContent = '$ '+ info.precio ;
      // Boton de agregar productos
      const botonDOM = document.createElement('button');
      botonDOM.classList.add('item-button', 'btn', 'addToCart',);
      botonDOM.textContent = 'Agregar';
      botonDOM.setAttribute('marcador', info.id);
      
      // Insertamos en items (cards)
    
      itemDOM.appendChild(titleDOM);
      itemDOM.appendChild(imgDOM);
      itemDOM.appendChild(detailDOM);

      // Insertamos en detalle de los productos

      detailDOM.appendChild(botonDOM);
      detailDOM.appendChild(precioDOM);

      // Insertamos los items en cada columna
     
      colDOM.appendChild(itemDOM);
      
      // Insertamos las columnas denntro del elemento items anteriormente declarado
      
      items.appendChild(colDOM);
  });

 // Carrito 
 const carritoDOM = document.createElement('section');
 carritoDOM.classList.add('container', 'bg-dark', 'bg-gradient', 'text-warning' ,'rounded-3','carritoBck' );
 // Barra de detalles precio0 casntidad y producto
 const productoDOM = document.createElement('h1');
 productoDOM.classList.add("text-center");
 productoDOM.innerHTML= `<h1 class="text-center colorTextOrange">CARRITO</h1>
 <hr>
 <div class="row">
     <div class="col-4">
         <div class="shopping-cart-header colorTextOrange">
             <h3>Producto</h6>
         </div>
     </div>
     <div class="col-4">
         <div class="shopping-cart-header colorTextOrange">
             <h3 class="text-truncate">Precio</h6>
         </div>
     </div>
     <div class="col-4">
         <div class="shopping-cart-header colorTextOrange">
             <h3>Cantidad</h6>
         </div>
     </div>
 </div>`;

// Items del carrito
const itemsCard = document.createElement('div');
productoDOM.classList.add("shopping-cart-items", "itemsContainer");
// Total mde carrito
const totalCard = document.createElement('div');
totalCard.classList.add("row");
// Columna del total carrito
const totalColCard = document.createElement('div');
totalColCard.classList.add("col-12");
// Contenido de total carrito
const totalContenidoCard = document.createElement('div');
totalContenidoCard.classList.add("shopping-cart-total", "d-flex", "align-items-center");

totalContenidoCard.innerHTML = `<h3 class="mb-0">Total</h3>
<h3 class="ml-4 mb-0 totalCarrito">$0</h3>
 
<button class=" ml-auto comprarButton item-button"  data-toggle="modal"
data-target="#comprarModal">Comprar</button>
`
// Insertamos el contenido dentro de las columnas y las columnas dentro del row

totalColCard.appendChild(totalContenidoCard);
totalCard.appendChild(totalColCard);
carritoDOM.appendChild(productoDOM)
carritoDOM.appendChild(totalCard);

// Insertamos todo dentro del elemento declarado anteriormente
shopCarrito.appendChild(carritoDOM);


}

// Actualizamos los productos para que aparescan una vez cargue la pagina
renderizarProductos();


// Añadimos al carrito mediate los botones con su clase

const addCarrito = document.querySelectorAll('.addToCart');
addCarrito.forEach((addButton) => {
  addButton.addEventListener('click', addCarritoClick);
});

// Evento de comprar 
const mostrar = document.querySelector(".comprarButton");
mostrar.addEventListener("click", comprarBotonClick)

// Seleccionamos el contendedor de los items
const itemsContainer = document.querySelector('.itemsContainer');


// Funcion para añadir mediante click al carrito y pasar parametros

function addCarritoClick(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitulo = item.querySelector('.item-title').textContent;
  
  const itemPrecio = item.querySelector('.item-price').textContent;
  
  const itemImagen = item.querySelector('.item-image').src;

  addCarritoItem(itemTitulo, itemPrecio, itemImagen);
}

// Funcion para añadir productos al carrito mediante evento ty que no se repitan
function addCarritoItem(itemTitulo, itemPrecio, itemImagen) {
  const elementosTitle = itemsContainer.getElementsByClassName(
    'itemTituloAdd'
  );
  for (let i = 0; i < elementosTitle.length; i++) {
    if (elementosTitle[i].innerText === itemTitulo) {
      let elementosCantidad = elementosTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.itemCantidad'
      );
      elementosCantidad.value++;
      $('.toast').toast('show');
      cargarCarrito();
      return;
    }
  }

// Creamnos el producto a añadir que figura en el carrito 
// Utilizamos loas parametros anteriores tomados (titulo,imagen y precio)
// Tambien añadimos el boton de quitar del carrito
  const productoDOM = document.createElement('div');
  const shopCarrContenido = `
  <div class="row itemCarrShop colorTextOrange">
        <div class="col-4">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom border-warning  pb-2 pt-3">
                <img src=${itemImagen} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title itemTituloAdd text-truncate ml-3 mb-0">${itemTitulo}</h6>
            </div>
        </div>
        <div class="col-4">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom border-warning pb-2 pt-3">
                <p class="item-price mb-0 itemPrecio">${itemPrecio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom border-warning pb-2 pt-3">
                <input class="inputCantidad itemCantidad bg-ligth border-dark" type="number"
                    value="1">
                
<button class="noselect"><span class="text">Quitar</span><span class="icon buttonDelete"><svg viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
            </div>
        </div>
    </div>`;
// Insertamos el anterior dentro del elemto producto donde aparecera cada iterm agregado
  productoDOM.innerHTML = shopCarrContenido;
  itemsContainer.append(productoDOM);

  productoDOM
    .querySelector('.buttonDelete')
    .addEventListener('click', vaciarCarrito);

  productoDOM
    .querySelector('.itemCantidad')
    .addEventListener('change', cambioDeCantidad );

  cargarCarrito();
}

// Funcion para actualizar el carrito y sus elementos
function cargarCarrito() {
  let total = 0;
  const totalCarrito = document.querySelector('.totalCarrito');

  const itemsCarrito = document.querySelectorAll('.itemCarrShop');

  itemsCarrito.forEach((shopItem) => {
    const elementosPrecio = shopItem.querySelector(
      '.itemPrecio'
    );
    const itemPrecio = Number(
      elementosPrecio.textContent.replace('$', '')
    );
    const elementosCantidad = shopItem.querySelector(
      '.itemCantidad'
    );
    const itemCantidad = Number(
      elementosCantidad.value
    );
    total = total + itemPrecio * itemCantidad;
  });
  totalCarrito.innerHTML = `$${total.toFixed(2)}`;
}

// Funcion para vaciar el item del carrito
function vaciarCarrito(event) {
  const botonClick = event.target;
  botonClick.closest('.itemCarrShop').remove();
  cargarCarrito();
}
//Funcion para cambiar de cantidad de productos y evita que sea 0 o negativo
function cambioDeCantidad (event) {
  const input = event.target;
  if (input.value <= 0) {input.value = 1} 
 
  cargarCarrito();
}

// Funcion para comprar y reiniciar el carro
function comprarBotonClick() {
  itemsContainer.innerHTML = '';
  cargarCarrito();
}


// Evento para llamar a la funcion mostrarDatos
const enviarDatos = document.getElementById("datos")
enviarDatos.addEventListener('click', validarCampos );

// Funcion para validar campos de formulario
function validarCampos(){
  let validacion = false;
  const valorName = document.getElementById("nombre").value;
  const valorTel = document.getElementById("telefono").value;
  const valorDircc = document.getElementById("direccion").value;
  const valorDist = document.getElementById("distancia").value;
  const valorCod = document.getElementById("codigoPostal").value;
  while(validacion==false){
  if ((valorName && valorTel && valorDircc && valorDist && valorCod) != "" ) {validacion=true;mostrarDatos()  }
  
  else {alert("No llenaste todos los campos");validacion=true;
        break;}}

  
  
}
/// Funcion para mostrar los datos pedidos en el formulario
function mostrarDatos (){
      
         
      let formulario = document.forms["formularioDatos"];
      let textoForm = "";
      let nombreForm = formulario["nombre"];
      let telefonoForm = formulario["telefono"];
      let direccionForm = formulario["direccion"];
      let codigoPostalForm = formulario["codigoPostal"];
      let distanciaForm = formulario["distancia"];
 
        

      textoForm =
      '<h3 class="colorTextOrange ">Nombre : ' +"<h5 class='text-light'>"+nombreForm.value+ "</h5>"+"</h3><br>"+
      '<h3 class="colorTextOrange">Telefono : ' + "<h5 class='text-light'>"+telefonoForm.value+ "</h5>"+"</h3><br>"+ 
      '<h3 class="colorTextOrange">Direccion : ' + "<h5 class='text-light'>"+direccionForm.value +"</h5>"+"</h3><br>" + 
      '<h3 class="colorTextOrange">Distancia : ' + "<h5 class='text-light'>"+distanciaForm.value +"</h5>"+"</h3><br>"+
      '<h3 class="colorTextOrange">CodigoPostal : ' +"<h5 class='text-light'>"+ codigoPostalForm.value+"</h5>"+"</h3>";
      document.getElementById ("mostrarDatos").innerHTML = textoForm
    
    } 

// Evento para finalizar la compra llmando a la funcion
const finComprar = document.getElementById("finCompra")
finComprar.addEventListener("click", refrescar ) 
  
// Funcion para finalizar y recargar la pagina
 function refrescar (){

  location.reload() 

}