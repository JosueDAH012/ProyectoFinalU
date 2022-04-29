import React from "react";
import { useDispatch } from "react-redux";
import { DeleteProfile } from "../redux/actions/profileActions";

function RowDetails({_id, user, primerapellido, segundoapellido, numerotelefono, celular, avatar}) {
   const dispatch =  useDispatch()
    const DeleteHandler = (id)=>{
      dispatch(DeleteProfile(id))
    }
  return (
    <tr>
      <th>{user.name}</th>
      <td>{user.email}</td>
      <td>{user.username}</td>
      <td>{user.role}</td>
      <td>{primerapellido}</td>
      <td>{segundoapellido}</td>
      <td>{numerotelefono}</td>
      <td>{celular}</td>
      <td>{avatar}</td>
      <td>
        <button class="btn btn-outline-danger" onClick={()=>DeleteHandler(_id)}>Delete</button>
      </td>
    </tr>
  );
}

export default RowDetails;
