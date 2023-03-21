import { list } from 'postcss';
import { useState } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;


export default function App() {

  // The url used for requests 
  const URL = `https://api.thedogapi.com/v1/images/search?api_key=${API_KEY}?include_breeds=true&has_breeds=true`;

  // name, image url, weight, height and lifespan respectively 
  const [name, setName] = useState([]);
  const [url, setUrl] = useState(null);
  const [weight, setWeight] = useState([]);
  const [height, setHeight] = useState([])
  const [lifespan, setLifespan] = useState([])

  // banneditems, previously seen things, and the name of the current dog 
  const [bannedItems, setBannedItems] = useState([]);
  const [oldItems, setOldItems] = useState([]);
  const [current_name, setCurrentName] = useState([]);

  const main_content = (
    <div >
      <div className='flex gap-2'>
        <button className="bg-blue-200 font-bold p-2 rounded-md" onClick={() => update_ban_list(name)}><p>Breed: {name}</p></button>
        <button className="bg-blue-200 font-bold p-2 rounded-md" onClick={() => update_ban_list(weight)}><p>Weight: {weight}</p></button>
        <button className="bg-blue-200 font-bold p-2 rounded-md" onClick={() => update_ban_list(height)}><p>Height: {height}</p></button>
        <button className="bg-blue-200 font-bold p-2 rounded-md" onClick={() => update_ban_list(lifespan)}><p>Lifespan: {lifespan}</p></button>
      </div>
      <div className='flex justify-center'>

      <img className='w-100 h-60' src={url} alt="" />
      </div>
    </div>)

  function getNewData() {
    fetch(URL).then((response) => response.json())
      .then((data) => {
        let func_url = data[0].url;
        let fucn_weight = data[0].breeds[0].weight.imperial;
        let func_height = data[0].breeds[0].height.imperial;
        let func_name = data[0].breeds[0].name;
        let func_lifespan = data[0].breeds[0].life_span


        if (bannedItems.includes(fucn_weight) || bannedItems.includes(func_height) || bannedItems.includes(func_name) || bannedItems.includes(func_lifespan)) {
          getNewData()
        } else {
          setUrl(func_url);
          setWeight(fucn_weight);
          setHeight(func_height);
          setName(func_name);
          setLifespan(func_lifespan);
          setCurrentName(func_name)
          get_Current_name()
        }

      })
  }


// updates the banned items list, takes in the value of what it clicks 
  function update_ban_list(item) {
    if (bannedItems.includes(item)) {
    } else {
      setBannedItems([...bannedItems, item]);
    }
  }

  // gets the name ofthe current dog so as to add it to previously sseen when needed 
  function get_Current_name() {
    if (current_name.length >= 1) {
      setOldItems([...oldItems, current_name]);
    }
  }


  return (
    <div>
      <h1 className='text-3xl font-bold'>Veni Vici!</h1>
      <h1 className='text-xl font-bold'>Daily dose of Dogs</h1>
      <div className='flex h-screen'>

        <div className='flex-1 bg-gray-100'>
          <div className='flex flex-col gap-1  pb-2'>
            <h1 className='text-lg font-bold'>Previously Seen Items</h1>
            {oldItems.map((item, index) => (
              <ul className="bg-red-100 p-2 rounded-md" key={index}>{item}</ul>
            ))}

          </div>
        </div>


        <div className='flex-1 bg-gray-200'>
          {url ? main_content : "Click the button to start"}
          <br />
          <br />
          <br />
          <button onClick={getNewData} className="bg-yellow-200 p-2 rounded-md">Next Dog</button>
        </div>

        <div className='flex-1 bg-gray-100'>
          <div className='flex flex-col gap-1  pb-2'>
            <h1 className='text-lg font-bold'>Banned Items</h1>
            {bannedItems.map((item, index) => (
              <ul className="bg-red-100 p-2 rounded-md" key={index}>{item}</ul>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

