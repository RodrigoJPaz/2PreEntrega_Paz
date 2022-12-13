alert("Bienvenido a MacDovals!")

/*********** CLASES ***********/
class Producto {
  constructor(id, nombre, precio){
      this.id = id
      this.nombre = nombre
      this.precio = precio
  };

  descuento = () => this.precio -= this.precio * 0.20
}

class Carrito {
  constructor(saldo, propietarioCarrito){
      this.saldo = saldo
      this.propietarioCarrito = propietarioCarrito
      this.productos = []
  }
}
 // --------------- CLASES --------------- 

// ------------ MAIN --------------

let saldoInicial = 10000;

//PRODUCTOS
const productos = [
  new Producto(1, "1 - Doble Cuarto de Kilogramo", 1990),
  new Producto(2, "2 - Cajita Alegre", 1099),
  new Producto(3, "3 - Small Mac", 1550),
  new Producto(4, "4 - Nuggets Chicken", 2000),
  new Producto(5, "5 - Papas Crispy", 999)
]

const nombreCompleto = consultarNombreYApellido()

const carrito1 = new Carrito(saldoInicial, nombreCompleto)

alert("Hola " + nombreCompleto + "!!" + "\n\nPor ser tu primer ingreso, te regalamos 10.000 creditos!\n\n (Deberan ser utilizados en un plazo no mayor a 15 dias)")

consultarSaldo()
menu()

console.log("------ ITEMS DEL PEDIDO ------")
carrito1.productos.forEach(producto => console.log(producto))

const carritoResultado = carrito1.productos.map(producto => producto.nombre)

//FINALIZACION
console.log("\n------FIN DE LA COMPRA------");
console.log("Cliente: " + carrito1.propietarioCarrito)
console.log("Compra: " + carritoResultado.join)
console.log("Saldo: " + carrito1.saldo)
console.log("Total: " + carrito1.productos.reduce((total, producto) => total + producto.precio, 0))
console.log("--------------------------------")

document.write("<section><h2>Tu compra!</h2>")
document.write("<p><strong>Cliente :</strong> " + carrito1.propietarioCarrito + "</p>")
document.write("<p><strong>Compra:</strong> " + carritoResultado.join(" - ") + "</p>")
document.write("<p><strong>Saldo:</strong> $" + carrito1.saldo + "</p>")
document.write("<p><strong>Total:</strong> $" + carrito1.productos.reduce((total, producto) => total + producto.precio, 0) + "</p></section>")

// FUNCIONES 

function consultarNombreYApellido(){
  let nombre = ""
  let apellido = ""
  let nombreCompleto = ""

  do{
      nombre = prompt("Ingresa tu Nombre")
      apellido = prompt("Ingrese tu Apellido")

      if ((nombre!="") && (apellido!="")){
          nombreCompleto = nombre.trim() + " " + apellido.trim()
      } else{
          alert("Algo salio mal, volve a intentarlo...")
      }
  }while((nombre=="") || (apellido==""))

  return nombreCompleto
}

function menu(){   
  let opcion = 0
  do{
      console.log("\n------------- MENU -------------") 
      console.log("ELEGI UNA OPCIÓN:")
      console.log("1 Comprar.")
      console.log("2 Consultar Pedido.")
      console.log("3 Consultar Saldo.")
      console.log("4 Salir.")
      opcion = Number(prompt("ELEGIR UNA OPCION:\n1) Comprar.\n2) Consultar Pedido.\n3) Consultar Saldo.\n4) Salir."))

      switch(opcion){
          case 1:
              console.log("INGRESANDO A COMPRAS")
              comprar()
          break;

          case 2:
              consultarProductos(carrito1.productos);
          break;

          case 3:
              consultarSaldo()
              menu()
          break;

          case 4:
              alert("Gracias por tu visita!!")
              alert("\nA continuación podras imprimir el resumen de tu Compra. Que tenga un buen día.")
          break;

          default:
              alert("Algo salio mal! Volve a intentarlo.")
      }

  }while((opcion<1) || (opcion>4) || (isNaN(opcion)))
}

function comprar(){   
  let item = 0
  let retorno = true

  do{
      console.log("\n------------------------ COMPRAS ------------------------")
      console.log("Elegi el producto que quieras comprar (1-5): PRESIONA CUALQUIER OTRO NUEMRO PARA IR AL MENU PRINCIPAL")
      productos.forEach(producto => console.log(producto.id + ")\n " + producto.nombre + " ($" + producto.precio + ")"))
      console.log("Todas las Opciones vienen con Bebida ilimitada gratis!! \n\n Comprando dos  o mas combos iguales tenes un 10% off")

      const pago = productos.map(producto => producto.nombre)

      item = Number(prompt("ELEGI UN PRODUCTO (1-5):\nPRESIONA CUALQUIER OTRO NUEMRO PARA IR AL MENU PRINCIPAL\n" + pago.join(" - ") + "\n\nTodas las Opciones vienen con Bebida ilimitada gratis!!\n\n Comprando dos o mas combos iguales tenes un 10% off"))

      if ((item>0) && (item<productos.length+1)){
          retorno = validarPago(productos.find(producto => producto.id==item))
      } else{
          alert("INGRESANDO A MENU")
          menu()
      }
      
  }while((item>0) && (item<productos.length+1) && (retorno == true))

  if(retorno == false){
      menu()
  }
}

//----------------FUNCIONES--------------------

function validarPago(pago){

  let ret = true
  let aux = new Producto(pago.id, pago.nombre, pago.precio)

  if (carrito1.productos.some(producto => producto.nombre==aux.nombre)){
      aux.descuento()
  }

  if(carrito1.saldo >= aux.precio){
      carrito1.saldo -= aux.precio
      carrito1.productos.push(aux)
      confirmacionCompra(aux)
  } else {
      ret = false;
      alert("No te queda mas saldo, Carga y segui compra.")
      consultarSaldo()
  }

  return ret;
}

function consultarProductos(productos){
  let elegido = " "
  productos.forEach(producto => elegido += producto.nombre + " - ")
  console.log("\n------------------------------------- CONSULTA PRODUCTOS -------------------------------------")
  console.log("Productos adquiridos hasta ahora: " + elegido)
  alert("PRODUCTOS ADQUIRIDOS:\n" + elegido)
  menu()
}

function confirmacionCompra(producto){
  alert("Compraste: "+ producto.nombre + "\nSaldo: " + carrito1.saldo)
  console.log("\nEstas llevando: " + producto.nombre + "!!!")
}

function consultarSaldo(){
  alert("Saldo Actual: " + carrito1.saldo + "creditos!")
  console.log("Saldo: " + carrito1.saldo + "creditos!")
}
