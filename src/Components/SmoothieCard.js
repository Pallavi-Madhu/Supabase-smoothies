
import { Link } from 'react-router-dom'
import React from 'react'
import supabase from '../config/SupabaseClient'

const SmoothieCard = ({smoothie , onDelete}) => {
  const handleDelete = async() => {
    const {data,error} = await supabase
    .from('smoothies')
    .delete()
    .eq('id' ,smoothie.id)   //so while deleting,the record gets deleted only after we refresh the page which is not user-friendly.So we have to update the local state

    if(data){
      console.log(data)
      onDelete(smoothie.id)
    }
    if(error){
      console.log(error)
    }
  }


  return (
    <div className='smoothie-card'>
      <h3> {smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className='rating'>{smoothie.rating}</div>
      <div className="buttons">           
        <Link to={'/' + smoothie.id}> 
          <i className='material-icons'>edit</i> 
        </Link>  
        <i className='material-icons' onClick={handleDelete}>delete</i> 
      </div>
    </div>
  )
}

export default SmoothieCard



/*The <i> tag for the edit icon is outside the Link. If you want the icon to be clickable and navigate to the same route, place it inside the Link:
jsx
Copy code
<Link to={'/' + smoothie.id}>
  <i className='material-icons'>edit</i>
</Link>*/