import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RowDetails from '../components/RowDetails'
import { GetProfiles } from '../redux/actions/profileActions'

function Admin() {
  
  const profiles = useSelector(state => state.profiles)
  const dispatch  = useDispatch()
  useEffect(async()=>{
    await dispatch(GetProfiles())
  },[])
  return (
    
     
      <div class="container p-4 mt-4">
        <div class="row justify-content-evenly mt-4">
           
           <div class="col-lg-12 col-md-12 mt-4">
               <div class="d-flex">
                <i class="fa-solid fa-user fs-1 mx-2"></i> <h2>Profiles list</h2>
               </div>
               <div class="shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">role</th>
                        <th scope="col">telephone</th>
                        <th scope="col">primerapellido</th>
                        <th scope="col">segundoapellido</th>
                        <th scope="col">numerotelefono</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        profiles.profiles.map(({_id, user, celular, primerapellido, segundoapellido, numerotelefono})=>(
                           <RowDetails _id={_id} user={user} celular={celular} primerapellido={primerapellido} segundoapellido={segundoapellido} numerotelefono={numerotelefono} />
                        ))
                      }
                      
                    </tbody>
                  </table>
            </div>
           </div>
       </div>
   </div>
   
  )
}

export default Admin