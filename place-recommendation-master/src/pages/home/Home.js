import axios from 'axios';
import React, { useState } from 'react'
import PlaceBox from '../../components/PlaceBox';
import "./Home.css";
import data from '../../assets/tourist_places_data.json';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';


export default function Home() {

    const [keyWord, setKeyWord] = useState('');
    const [list, setList] = useState([])
    const [filterData, setFilteredData] = useState([]);

   
    const fetchData = async (e) => {
        e.preventDefault()
        console.log("Data");
        console.log(keyWord);
        const result = await axios(`https://touristsplacesapi.herokuapp.com/places?name=${keyWord}`)
        console.log(result.data);
        setList(result.data)
        console.log(list);
       
    } 

    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setKeyWord(searchWord);
      const newFilter = data.filter((value) => {
        return (value.name).toLowerCase().includes(searchWord.toLowerCase());
      });

      if(searchWord === ""){
        setFilteredData([]);
      }else{
        setFilteredData(newFilter);
      }
    };

    const clearInput = () => {
      setFilteredData([]);
      setKeyWord("");
    };

    const setWord = (word) => {
      setKeyWord(word)
      setFilteredData([])
    }

  return (
    <div className="home">
    
        <form className="searchbox" onSubmit={fetchData}>
        <div className="input-box">
          <div className="input-field">
          <input 
            className="input-f"
            type="text"
            onChange={handleFilter}
            value={keyWord}
            placeholder="Place name">
              
            </input>
            <div className="searchIcon">
            {filterData.length === 0 ? (
              <SearchIcon />
             ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
             )} 
          </div> 

          </div>
       
        {filterData.length !== 0 && (
          <div className = "dataResult">
            {filterData.slice(0, 15).map((value, key) => {
              return (
                <div className = "dataItem">
                  <p onClick={() => setWord(value.name.toLowerCase())}>{(value.name).toLowerCase()}</p>
                </div>
              )
            })}
          </div>
        )}
        </div>
          
            <button className="btn">Search</button>
        </form>

        <div className="box-container">
            {list.map((place) => <PlaceBox key={place.Name} place={place}/>)   }
        </div>
    </div>
  )
}
