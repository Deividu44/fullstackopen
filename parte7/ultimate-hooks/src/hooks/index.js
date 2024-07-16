import { useEffect, useState } from "react"
import dataService from "../services/dataService"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    dataService.getData(baseUrl)
      .then(data => setResources(data))
  }, [baseUrl])

  const create = (resource) => {
    dataService.createData(baseUrl, resource)
      .then(({data}) => {
        setResources(resources.concat(data)) 
      })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}