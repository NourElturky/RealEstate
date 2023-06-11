import React, { useState, useEffect, createContext }
  from 'react';

// import { houseData } from '../data'
import { housesData } from '../data'
export const HouseContext = createContext()


const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState('Location (any)')
  const [countries, setCountries] = useState([])
  const [property, setProperty] =
    useState('Property type (any)')
  const [properties, setProperties] =
    useState([])

  const [price, setPrice] = useState('Price range (any)')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country
    })

    const uniqueCountries = ['Location (any)', ...
      new Set(allCountries)]


    setCountries(uniqueCountries)

  }, [])


  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type
    })

    const uniqueProperties = ['Location (any)', ...
      new Set(allProperties)]

    setProperties(uniqueProperties)
  }, [])

  const handleClick = () => {
    //set loading
    setLoading(true)

    //create a function that checks if the string includes '(any)'
    const isDefault = (str) => {
      return str.split(' ').includes('(any)')
    }

    // console.log(price)
    // console.log(!isDefault(country))
    const minPrice = parseInt(price.split(' ')[0])
    const maxPrice = parseInt(price.split('-')[1])
    console.log(maxPrice)

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price)
      // console.log(housePrice)

      //if all values are selected
      if (house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house
      }
      //if all values are default
      if (isDefault(country) &&
        isDefault(property) &&
        isDefault(price)) {
        return house
      }

      //if country is not default
      if (!isDefault(country) &&
        isDefault(property) &&
        isDefault(price)) {
        return house.country === country
      }


      //if property is not default
      if (!isDefault(property) &&
        isDefault(country) &&
        isDefault(price)) {
        return house.type === property
      }

      //if price is not default
      if (!isDefault(price) &&
        isDefault(country) &&
        isDefault(property)) {

        if (housePrice >= minPrice &&
          housePrice <= maxPrice) {
          return house
        }
      }

      //if property &country is not default

      if (!isDefault(country) &&
        !isDefault(property) &&
        isDefault(price)) {
        return house.country === country &&
          house.type === property
      }

      //if price &country is not default

      if (!isDefault(country) &&
        isDefault(property) &&
        !isDefault(price)) {
        if (housePrice >= minPrice &&
          housePrice <= maxPrice) {
          return house.country === country
        }
      }

      //if price &property is not default

      if (isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price)) {
        if (housePrice >= minPrice &&
          housePrice <= maxPrice) {
          return house.type === property
        }
      }
    })

    setTimeout(() => {
      return newHouses.length < 1 ? setHouses([]) :
        setHouses(newHouses),
        setLoading(false)
    }, 1000);
    console.log(newHouses)
  }

  return (
    <HouseContext.Provider value={{
      country,
      setCountry,
      countries,
      property,
      setProperty,
      properties,
      price,
      setPrice,
      houses,
      loading,
      handleClick,
      loading,
    }}>
      {children}
    </HouseContext.Provider>
  )

};

export default HouseContextProvider;
