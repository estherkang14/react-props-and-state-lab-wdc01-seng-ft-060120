import React from 'react'

import Pets from '../data/pets'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

const URL = '/api/pets'
const QUERYURL = URL + '?type=' 


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    e.preventDefault()
    
    this.setState({
      filters: {
        type: e.target.value
      }
    }, () => console.log(this.state.filters))
    
  }

  onFindPetsClick = (e) => {
    e.preventDefault()
    
    if (this.state.filters.type === "all") {
      fetch(URL)
      .then(response => response.json())
      .then(data => this.setState( {pets: data}))
    } else {
      fetch(QUERYURL + this.state.filters.type)
      .then(response => response.json())
      .then(data => this.setState( {pets: data}))
    }

  }

  onAdoptPet = (e, petId) => {
    
      let petIndex = this.state.pets.findIndex(pet => pet.id === petId)

      let newArray = [...this.state.pets]
      newArray[petIndex] = {...newArray[petIndex], isAdopted: true}
      this.setState({
        pets: newArray
      })
   }

  render() {
    return (
      
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
