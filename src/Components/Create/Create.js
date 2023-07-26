import React, { Fragment,useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase/config';
import { addDoc,collection,getFirestore } from 'firebase/firestore';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';


const Create = () => {

const [name, setname] = useState('')
const [category, setcategory] = useState('')
const [price, setprice] = useState('')
const [image, setimage] = useState()
const [imageurl, setimageurl] = useState()


const{user}=useContext(AuthContext)
const firestore=getFirestore(firebase)
const firestorage=getStorage(firebase)
const navigate = useNavigate();





const handleImage = (e)=> {
  const file = e.target.files[0];
  const blob = new Blob([file], {type: file.type});
  setimage(file);
  const reader = new FileReader();
  reader.onload =() => {
    const url = reader.result;
    setimageurl(url);
  }
  reader.readAsDataURL(blob);
}
const handlesubmit = (e)=> {
  e.preventDefault();
  const date = new Date()
 
  if(user){

    const storage = ref(firestorage, `/images/${image.name}`)
  
    const imageBlob = new Blob([image], {type: image.type});
   
  uploadBytes(storage, imageBlob).then((response)=> {
      
      getDownloadURL(ref(firestorage, `/images/${image.name}`)).then(async(url)=> {
        console.log(url);
      await addDoc(collection(firestore, "products"), {
        name: name,
        category: category,
        price: price,
        image: url,
        createdDate: date.toDateString(),
        userId: user.id
      });
      console.log("success  ll")
      navigate('/');
      })
    })
  }else{
    console.log("user not loged In")
  }
}









  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setname(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setcategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
             type="number"
              id="fname"
              value={price} 
              onChange={(e)=>setprice(e.target.value)}
              name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={imageurl ? imageurl : ""}></img>
          <form>
            
            <br />
            <input onChange={handleImage} type="file" /> 
            <br />
            <button onClick={handlesubmit}  className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
