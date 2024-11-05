import { useState } from "react";
import { deleteBookCover } from "../features/bookSlice"
import { useDispatch } from "react-redux"
export default function CoverDisplayer({covers,bookId})
{
    const dispatch = useDispatch();

    const [coversToDisplay,setCoversToDisplay] = useState(covers);

    const handleCoverDeletion = (cover,book)=>{
        if(window.confirm("Are you sure you wanna delete this cover ?")){
          dispatch(deleteBookCover({cover,book}))
          .then(result =>{
            if(result.payload){
              setCoversToDisplay(coversToDisplay.filter(x=> x.fileID !== cover))
            }
          })
        }
        
        
      }



    return <table>
    <thead>
      <tr>
        <th>Cover</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {coversToDisplay && coversToDisplay.map(img => <tr key={img.fileID}>
      <td><img src={img.src} alt={`${img.src} cover`} width={"100px"} /></td>
      <td>
        <button onClick={()=>handleCoverDeletion(img.fileID,bookId)}>Delete Cover</button>
      </td>
    </tr> )} 
    </tbody>
  </table>  
}   