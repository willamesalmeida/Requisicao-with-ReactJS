import { useEffect, useState } from 'react'

export const useDelete = (url) => {
  const [config, setConfig ] = useState(null)
  const [data, setData] = useState(null)
  const [status, setStatus] = useState(null)

  const httpDelete = (method) => {
    if (method === 'DELETE'){
      setConfig({
        method,
      })
    }
  }

  useEffect(() => {
    const fetchData = async ()  => {
      const fetchMethod = [url, config]
      const data = await fetch(...fetchMethod)
      const dataJson = await data.json()
      setData(dataJson)
      setStatus("deletado com sucesso!")
    }
    fetchData()
  },[url, config])



  return [httpDelete, data, status]
}

