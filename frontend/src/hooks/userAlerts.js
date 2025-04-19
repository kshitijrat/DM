"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const useAlerts = () => {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/alerts")
      .then((response) => setAlerts(response.data))
      .catch((error) => console.error(error))
  }, [])

  return alerts
}

export default useAlerts
