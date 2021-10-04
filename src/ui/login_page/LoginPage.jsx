import { Button, Card,  Modal, notification, Result, Spin } from 'antd'
import React, { useRef, useState } from 'react'
import faceRec from "../../assets/images/face_rec.jpg"
import { CameraFilled, CameraOutlined, LoginOutlined } from "@ant-design/icons"
import Webcam from 'react-webcam'
import axios from 'axios'


const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const LoginPage = () => {
    const [hasPicture,setHasPicture]= useState(false)
    const [openCamera,setOpenCamera] = useState("notOpened")
    const  [img,setImage] = useState(null)
    const camRef = useRef(null)
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("")

    const oOpenCamera = ()=>{
        setOpenCamera("videoMode")

    }
    const onTakeSnapShot=()=>{
        setOpenCamera("picureTaken")
      const image =  camRef.current.getScreenshot()
      setImage(image)
      setHasPicture(true)

    }

    const onRetakeSnapshot=()=>{
        setOpenCamera("videoMode")
        setHasPicture(false)
    }

    const onLogin=()=>{
        setLoading(true)
        const URL = "http://127.0.0.1:8000/face_detector/detect"
        const data={
            image:img
        }
        const config  = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        axios.post(URL,data,config)
        .then(res=>{
            setLoading(false)

        }).catch(err=>{
            console.log(err.response);
             setLoading(false)
             if(err.response){
                 if(err.response.status ===400){
                    setErrorMessage("No face was detected in the image provided. Check you background light and retake pciture")
                 }else{
                     setErrorMessage(err.response.data.detail)
                 }
             }
             else if (err.request){
                 notification.error({
                     message:"Unexpected error occured",
                     description:err.message
                 })
             }

        })


    }

    const errorDrawer =()=> <Modal 
    onCancel = {()=>setErrorMessage("")}
    visible = {errorMessage !== ""} footer = {null} >
        <Result  status="error" title = "Login failed" subTitle = {errorMessage}  />
    </Modal>

    return (
        <div  style = {{background:"royalblue",height:"100vh",display:"grid",placeItems:"center"}} >
            {errorDrawer()}
            <Card style = {{width:"500px",height:"500px"}} >
            <Spin spinning = {loading} >

                <h4 className = "text-center" >Login With face</h4>
                {openCamera === "notOpened"?<img width = "100%" height  ="250px" src={faceRec} alt="logo-here" />
                :openCamera === "videoMode"? <Webcam videoConstraints={videoConstraints} screenshotFormat="image/jpeg" width = "100%" height = "250px" ref = {camRef} />
                :<img src = {img} width = "100%" height = "250px" alt = "captured" />}
                
                <div className="mt-4 d-flex justify-content-evenly ">
                    {openCamera === "notOpened"? <Button onClick = {oOpenCamera} style  ={{height:"50px"}} icon = {<CameraOutlined style = {{fontSize:"1.3rem"}} />} type = "primary" shape = "round" >Open Camera</Button>
                    :openCamera === "videoMode"?  <Button onClick = {onTakeSnapShot} style  ={{height:"50px"}} icon = {<CameraFilled style = {{fontSize:"1.3rem"}} />} type = "primary" shape = "round" >Take snapshot</Button>:
                     <Button onClick = {onRetakeSnapshot} style  ={{height:"50px"}} icon = {<CameraFilled style = {{fontSize:"1.3rem"}} />} type = "primary" shape = "round" >Retake snapshot</Button>
                    }
                     <Button onClick = {onLogin} disabled = {!hasPicture} style  ={{height:"50px"}} icon = {<LoginOutlined style = {{fontSize:"1.3rem"}} />} type = "primary" shape = "round" >Login to dashboard</Button>

                </div>
        </Spin>
            </Card>
        </div>
    )
}

export default LoginPage
