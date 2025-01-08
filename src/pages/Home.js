import supabase from "../config/SupabaseClient"
import { useState,useEffect } from "react"

//components
import SmoothieCard from "../Components/SmoothieCard"

const Home = () => {
  const[fetchError,setFetchError] = useState(null)
  const[smoothies,setSmoothies] = useState(null)
  const [orderBy ,setOrderBy] = useState('created_at')

  const handleDelete = async(id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter(sm => sm.id !== id )
    })
  }

  useEffect(() => {
     const fetchSmoothies = async() => {
    const {data , error} = await supabase
       .from('smoothies')
       .select()
       .order(orderBy , {ascending:orderBy ==="title"})//orderBy property is given inside the useEffect,the data wil re-render on screen
                                                       //without initializing,it didnt WORK .order(orderBy, { ascending: orderBy === "title" });


        if (error) {
          setFetchError(`Could not fetch: ${error.message}`);
          setSmoothies(null);
          console.log(error); // Log the error for more info
        }

       if(data){
        console.log('fetched data:',data)
        setSmoothies(data)
        setFetchError(null)
        
       }
     }
  

     fetchSmoothies()
  },[orderBy])             //dependancies
  console.log(smoothies)
  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            {orderBy}
          </div>
          <div className="smoothie-grid">
          {smoothies.map((smoothie) =>  {
            return <SmoothieCard 
              key={smoothie.id} 
              smoothie={smoothie}
              onDelete={handleDelete}/>
          }
          )};
          </div>
        </div>

      )}
    </div>
  )
}

export default Home