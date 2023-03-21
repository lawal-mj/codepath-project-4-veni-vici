import { useState, useEffect } from 'react'
import './App.css'
import Mainpage from './components/Mainpage';
const API_KEY = import.meta.env.VITE_API_KEY;
import axios from 'axios';






function App() {
  // const [count, setCount] = useState(0)
  const url = `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=${API_KEY}`
  const [data, setData] = useState();
  const [catData, setCatData] = useState({
    name: "",
    url: "",
    breed: "",
    origin: "",
    imperialWeight: "",
  });

  const fetchData = async () => {
    const response = await axios.get(url);
    setData(response.data)
    console.log(data)
  }

    fetchData()
    
    
  return (
    <div>
       <div></div> {/* // history div  */}
       <div>
        <Mainpage props={catData} />
        </div> 
       <div></div> {/* // banned div  */}

    </div>

  )
}

export default App
