import React,{useContext} from 'react'
import { LoginContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
function Option({deleteData}) {

  const { account, setAccount } = useContext(LoginContext);

  const history = useNavigate("");
  const removedata=async(id)=>{
    try {
      const res=await fetch(`http://localhost:8005/remove/${id}`,{
        method: "DELETE",
            mode: 'cors',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
           credentials: "include" // Include credentials to allow cookies
        
      });

      const data=await res.json();
      //console.log(data);
      
      if (res.status === 401 || !data) {
        console.log("Error");
        alert("Error");
    } else {
        console.log("User deleted")
        setAccount(data)
        console.log("I am in the option delete")
        console.log(account);
        if(account.carts.length === 0){
          history("/")
        }

    }
    } catch (error) {
      
    }
  }
  return (
    <div className='flex gap-x-5 justify-center mt-5'>
    <select className='add_remove_select p-1 rounded-lg'>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    <p className='text-blue-500 cursor-pointer' onClick={() => removedata(deleteData)}>Delete</p><span>|</span>
    <p className='text-blue-500 '>Save Or Later</p><span>|</span>
    <p className='text-blue-500 '>See More like this</p>
    </div>
    
  )
}

export default Option