import { useState } from "react"
import Header from "./components/Header"
import {db} from "./data/data.js"
import Guitar from "./components/Guitar"


const App = () => {
  const [guitar, setGuitar] = useState(db)
  return (
    <>
    <Header />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {
              guitar.map((guitar) => (
                <Guitar key={guitar.id} guitar={guitar} />
              ))
            }

            

         

          
        </div>
    </main>
    </>
  )
}

export default App