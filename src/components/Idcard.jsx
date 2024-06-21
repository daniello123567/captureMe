import { useState,useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import QRCode from 'react-qr-code'
import cam from '../assets/camera.png'
import Alt from '../assets/altschool.png'
function Idcard(){
  const [goat,setGoat] = useState(false)
  const [imgUrl, setImgurl] = useState("");
  const [visibilty,setVisibilty] = useState(false);
  const [done,setDone] = useState(false);
  const [backgroundisBlack,setBackground] = useState(false)
  const [backGroundisWhite,setBackW] = useState(false)
  const setBlack = ()=>{
    const card  =document.querySelector(".doug");
    const bro= document.querySelector(".bro");
    const saka = document.querySelector(".saka");
    card.style.background = 'black';
    card.style.border = '1px solid black';
    bro.style.background = 'whitesmoke';
    saka.style.background = 'whitesmoke';
    setBackground(true);
  }
  const setWhite = ()=>{
    const card=document.querySelector(".doug");
    const bro= document.querySelector(".bro");
    const saka= document.querySelector(".saka");
    card.style.background = 'rgb(209 213 219 / 300)';
    card.style.border = 'none';
    bro.style.background = 'black';
    saka.style.background = 'black';
    setBackground(true);
  }
  useEffect(()=>{
    if(backgroundisBlack)setBlack();
    if(goat)setWhite()
  },[backgroundisBlack,goat])
  const [info, setInfo] = useState({
    name: "daniel",
    imageUrl: imgUrl,
    track: "frontend",
    nationality: "nigerian",
    position: "school president",
    studentId: "alt-2024"
  })
  const Dowloadimage = ()=>{
    if(imgUrl && info.name){
    const element = document.querySelector('.doug');
    html2canvas(element).then((card)=>{
      const link= document.createElement("a");
      link.download = "altschoolIdcard.png";
      link.href = card.toDataURL();
      link.click()
    })}else{
      alert("complete form")
    }
  }
  const handleInfo = (e) => {
    e.preventDefault();
      setInfo({...info,[e.target.name]:e.target.value})
  }
  const handleImg = (e) => {
    const url= URL.createObjectURL(e.target.files[0])
    setImgurl(url)
  }
  const ImgEntered = () => {
    return <div className='w-[80%] h-[18em] overflow-hidden'>
      <img className='w-full object-cover h-full' src={imgUrl} alt="" />
    </div>
  }
  const Form = () => {
    return <label className="cursor-pointer" htmlFor="img">
      <img className='w-[2em]' src={cam} alt="" />
      <input onChange={handleImg} className="inp" id="img" type="file" />
    </label>
  }
  const Qrcode = ()=>{
    return <QRCode style={{width:'100%',height:'5em'}} value={info.studentId}/>

  }
  const dr = useRef();
  useEffect(()=>{
    dr?.current?.focus()
  },[dr.current?.value])
  const Study = ()=>{
    return <div className='bg-green-500 w-[25em] flex flex-col px-4 py-4 justify-center rounded h-[20em] mx-auto relative -top-[35em]'>
      <input ref={dr} value={info.studentId} onChange={handleInfo} name="studentId" placeholder='enter your student id' className='focus:outline focus:outline-green-700 h-[3em] mb-4 px-2  rounded-md' type="text" />
      <p className='text-slate-300'>Your studentID will be used to generate a QRcode</p>
      <button onClick={()=>{setVisibilty(!visibilty);setDone(true)}} className='bg-green-600 text-white font-bold w-[max-content] px-4 py-5 mx-auto mt-6 rounded'>Done</button>
    </div>
  }
  console.log(info)
  return (
    <div className="parent">
      <div className="doug ">
        <div className='saka w-[100%] bg-black h-[2em] flex justify-center'>
          <img className='w-[3em] rounded-full -mt-3 h-[3em] object-cover' src={Alt} alt="" /></div>
        <div className="bro"></div>
        <div className="daniel grid shadow-inner place-items-center">
          {!imgUrl ? <Form /> : <ImgEntered />}
          <div className="hello overflow-hidden">
            <input name="name"  onChange={handleInfo} placeholder='enter your name here' className='px-2 font-bold uppercase placeholder:text-sm text-xl text-center h-full focus:outline-2 rounded-full focus:outline-blue-700 w-full' type="text" />
          </div>
        </div>
        <div className="kid">
          <div className="howfar px-4 py-2">
            <label className='labeller' htmlFor="Track">Track:</label>
            <input onChange={handleInfo} value={info.track} className='ing' name="track" id="Track" type="text" />
            <label className='labeller' htmlFor="nationality">Nationality:</label>
            <input onChange={handleInfo} value={info.nationality} className='ing' name="nationality" id="nationality" type="text" />
            <label className='labeller' htmlFor="position">Position:</label>
            <input onChange={handleInfo} value={info.position} className='ing' name="position" id="position" type="text" />
          </div>
          <div className="sup grid place-items-center px-2 py-3">

         <Qrcode/>
         {!done ?<button onClick={()=>{setVisibilty(!visibilty)}} className='w-[max-content]  h-[max-content] text-sm font-bold px-2 py-2 rounded text-white bg-blue-900'>enter studentID</button>: <p>{info.studentId}</p>}
          </div>
        </div>
      </div>
      {visibilty && <Study />}
      <div className='w-full gap-4 flex justify-center mt-[3em]'>
        {!backgroundisBlack && <button onClick={()=>{setBackground(!backgroundisBlack);setBackW(!backGroundisWhite)}} className='bg-blue-900 text-white font-bold px-4 py-4 rounded'>{backgroundisBlack ? 'white' : 'Black'} Background?</button>}
        {backGroundisWhite && <button onClick={()=>setGoat(!goat)} className='bg-blue-900 text-white font-bold px-4 py-4 rounded'>{backgroundisBlack ? 'white' : 'Black'} blackground</button>}
        <button onClick={Dowloadimage} className='bg-blue-900 text-white font-bold px-4 py-4 rounded'>Download Your ID !❤</button>
      </div>
    </div>
  )
}

export default Idcard
