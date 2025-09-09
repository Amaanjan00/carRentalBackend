'use client';
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [contracts, setContracts] = useState<any[] | null>(null);
  const [cars, setCars] = useState<any[] | null>(null);
  const [fines, setFines] = useState<any[] | null>(null);
  const [salik, setSalik] = useState<any[] | null>(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contracts`)
      .then(response => {
        setContracts(response.data);
      })
      .catch(error => {
        console.error("Error fetching contracts:", error);
      });
  }, []);
  
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cars`)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fines`)
      .then(response => {
        setFines(response.data);
      })
      .catch(error => {
        console.error("Error fetching fines:", error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/salik`)
      .then(response => {
        setSalik(response.data);
      })
      .catch(error => {
        console.error("Error fetching salik:", error);
      });
  }, []);

  return (
    <>
      <div className="m-2 w-full">
        <h1>Total Number of Contracts: {contracts ? contracts.length : 0}</h1>
        <h1>Total Number of Cars: {cars ? cars.length : 0}</h1>
        <h1>Total Number of Fines: {fines ? fines.length : 0}</h1>
        <h1>Total Number of Salik: {salik ? salik.length : 0}</h1>
      </div>
    </>
  );
}


