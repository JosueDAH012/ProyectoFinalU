import React, { useEffect, useState } from "react";
import Inputs from "../components/Inputs";
import { useDispatch, useSelector } from 'react-redux'
//import Classnames from 'classnames'
import { AddProfile, GetProfile } from "../redux/actions/profileActions";
function Profile() {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const errors = useSelector(state=>state.errors)
  const profiles = useSelector(state=>state.profiles)
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const onChangeHandler = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e)=>{
  e.preventDefault();
  dispatch(AddProfile(form, setShow, setMessage))
  }

  useEffect(async ()=>{
   await dispatch(GetProfile())
   setForm(profiles.profile)
  },[])
  return (
    <div className="container p-4 mt-4">
      
        
          <div class="alert alert-success" role="alert" style={{ display: show ? "block" : "none"}}>
          {message}
        </div>
        
      
      <div className="row justify-content-evenly mt-4">
        <div className="col-lg-6 col-md-12 mt-4">
          <div className="d-flex">
            <i className="fa-solid fa-user fs-1 mx-2"></i> <h2>Profile</h2>
          </div>
          <div
            className="p-6 shadow-lg p-3 mb-5 bg-body rounded"
            style={{ backgroundColor: "white" }}
          >
            <form onSubmit={onSubmit}>
              <Inputs name="primerapellido" label="Primer Apellido" value={form && form.primerapellido ? form.primerapellido : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.primerapellido}/>
              <Inputs name="segundoapellido" label="Segundo Apellido" value={form && form.segundoapellido ? form.segundoapellido : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.segundoapellido}/>
              <Inputs name="numerotelefono" label="Numero Telefonico" value={form && form.numerotelefono ? form.numerotelefono : ""} type="text" onChangeHandler={onChangeHandler} errors={errors.numerotelefono}/>
              <Inputs name="celular" label="Celular" type="text" value={form && form.celular ? form.celular : ""} onChangeHandler={onChangeHandler} errors={errors.celular}/>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary">
                  Update <i className="fa-solid fa-floppy-disk"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
