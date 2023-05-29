import React, { createContext, useContext, useState, useEffect } from 'react';

const SalableContext = createContext(null);

export const SalableProvider = ({ children }) => {
  const [capabilities, setCapabilities] = useState([]);
  const [licensed, setLicensed] = useState(false);
  const [userId, setUserId] = useState(null);
  const [licenses, setLicenses] = useState([])
  
  // Query salable api to return capabilities in useEffect
  useEffect( () => {
    const makeQuery = async () => {
      try {
        const res = await fetch("/api/salable");
        const body = await res.json();
        console.dir(body)
        setCapabilities(body["capabilities"])
        setUserId(body["id"])
        setLicenses(body["licenses"])
        if (body.capabilities.includes("free")) {
          setLicensed(true)          
        } else {
          setLicensed(false)
        }
      } catch (e) {
        console.log("// There was an error with the request");    
        console.dir(e)
      }
    }
    makeQuery()   
  }, [])


    return (
      <SalableContext.Provider value={{capabilities, licensed, userId, licenses}}>
        {children}
      </SalableContext.Provider>
    );
};

// Create a custom hook to use the UserContext
export const useSalable = () => {
  return useContext(SalableContext);
};

export const IsLicensed = ({children, check}) => {
  const { capabilities } = useSalable();
  if (capabilities.includes(check)) {
    return children
  } 
  return null;
}

export const IsNotLicensed = ({children, check}) => {
  const { capabilities } = useSalable();
  if (capabilities.includes(check)) {
    return null
  } 
  return children;
}

//
// End Salable React Provider
//