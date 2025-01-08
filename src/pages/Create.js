import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../config/SupabaseClient'
const Create = () => {
  const navigate = useNavigate()       //to redirect to home page
  const [title,setTitle] = useState('')
  const [method,setMethod] = useState('')
  const [rating,setRating] = useState('')
  const [formError,setFormError] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!title || !method || !rating){
      setFormError("pls fill in all the forms correctly")
      return
    }
    //console.log(title,method,rating)
    const{data,error} = await supabase
    .from('smoothies')
    .insert([{title,method,rating}])

    if(error){
      console.log(error)
      setFormError("pls fill in the forms correctly")
    }
    if(data){
      console.log(data)
      setFormError(null)
      navigate('/')      //after getting a successfull data,redirect to home page
    }
  
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
         type="text"
         id="title"
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         />

         <label htmlFor='method'>Method</label>
         <input 
           type="text"
           value={method}
           id="method"
           onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor='rating'>Rating</label>
        <input 
          type="number"
          value={rating}
          id="rating"
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create a smoothie recipe</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
      <h2>Create</h2>
    </div>
  )
}

export default Create