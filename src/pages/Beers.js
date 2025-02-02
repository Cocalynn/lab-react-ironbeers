import HeaderLink from "../components/headerLink"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Beers() {

  const [beers, setBeers] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("https://ih-beers-api2.herokuapp.com/beers")
    .then((res) => {
      setBeers(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })

    // fetch("https://ih-beers-api2.herokuapp.com/beers")
    // .then((res) => res.json())
    // .then((data) => {
    //   setBeers(data)
    //   console.log(data)
    // }).catch((err) => {
    //   console.log(err)
    // })
  }, [])

  useEffect(() => {
    axios.get(`https://ih-beers-api2.herokuapp.com/beers/search?q=${search}`)
    .then((res) => {
      setBeers(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [search])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
        <HeaderLink />
        <input placeholder="Search for beers" value={search} onChange={handleChange}/>
        {beers.map((beer) => {
          return (
            <div key={beer._id} className="beer-card">
              <img src={beer.image_url} alt={beer.name} />
              <div className="beer-info">
                <Link to={`/beers/${beer._id}`}>
                  <h2>{beer.name}</h2>
                  <p>{beer.tagline}</p>
                  <p>{beer.contributed_by}</p>
                </Link>
              </div>
            </div>
          )
        })}

        
    
    </div>
  )
}

export default Beers