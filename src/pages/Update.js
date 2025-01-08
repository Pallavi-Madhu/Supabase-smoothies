import { useParams ,useNavigate} from 'react-router-dom'
import { useState , useEffect } from 'react'
import supabase from '../config/SupabaseClient'
const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title,setTitle] = useState('')
  const [method,setMethod] = useState('')
  const [rating,setRating] = useState('')
  const [formError,setFormError] = useState('')

  const handlesubmit = async (e) => {
      e.preventDefault()
      if(!title || !method || !rating){
        setFormError('Please fill in the details')
        return
      }

      const{ data,error} = await supabase
        .from('smoothies')
        .update({title,method,rating})
        .eq('id',id)

      if(data){
        console.log(data)
        setFormError(null)
        navigate('/')
      }
      if(error){
        console.log(error)
        setFormError('Please fill in the details')
      }

  }

  useEffect(() => {
    const fetchSmoothie = async () => {
        const {data,error} = await supabase
          .from("smoothies")
          .select()          //this will fetch everything so
          .eq('id' , id)     //by using .eq we fetch those data whose id = id in the Update fn
          .single()

        if(error){             //if there is error,navigate to a different page
          navigate('/' , {replace:true})  //we replace this route in history with homepage
        }

        if(data){
          setTitle(data.title)
          setMethod(data.method)
          setRating(data.rating)
          console.log(data)
        }
    }
    fetchSmoothie()
  } , [id,navigate])           //declaring dependencies id and navigate
  return (
    <>
      <div className="page-create">
      <form onSubmit={handlesubmit}>
        <label htmlFor='title'>Title</label>
        <input type="text"
         value={title}
         id="title"
         onChange={(e) => setTitle(e.target.value)}/>

        <label htmlFor='method'>Method</label>
        <input type="text"
         value={method}
         id="method"
         onChange={(e) => setMethod(e.target.value)}/>

        <label htmlFor='rating'>Rating</label>
        <input type="number"
          value={rating}
          id="rating"
          onChange={(e) => setRating(e.target.value)}/>

        <button>Update a recipe</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
      </div>
    <div className="page update">
      <h2>Update -{id}</h2>
    </div>
    </>
    
  )
}

export default Update