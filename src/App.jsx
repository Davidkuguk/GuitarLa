import {useState } from "react"
import Header from "./Components/Header"
import Guitar from "./Components/Guitar"
import { db } from "./data/db.js";
function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  const MAX_ELEM = 5;
  const MIN_ELEM = 0;

  //creamos la funcion que añade un elemento al carrito
  function  addToCart(item){

    //almacenamos la posicion del elemento en el carrito
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
    if(itemExist >= 0){
      const updateCart = [...cart]
      updateCart[itemExist].quantity++
      setCart(updateCart)
    }else{
      item.quantity = 1
      console.log(item.quantity);
      setCart([...cart, item])
    }
    
  }

  function increaseQuantity(id){
    const updateCart = cart.map(item =>{
      if(item.id === id && item.quantity < MAX_ELEM){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id){
    const updateCart = cart.map(item =>{
      if(item.id === id && item.quantity > MIN_ELEM){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !=id))
  }

  function cleanCart(){
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

       <div className="row mt-5">
          {data.map((guitar) =>

            <Guitar
             key={guitar.id} 
             guitar={guitar} 
             cart={cart}
             setCart={setCart}
             addToCart={addToCart}
             />

          )}
      </div>

      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
