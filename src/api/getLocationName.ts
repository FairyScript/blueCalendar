import { ILocationTable } from '@/@types/ILocation'
import axios from 'axios'

//testData
const url = new URL(`../testData/LocationName.json`, import.meta.url).href

export function getLocationTable() {
  return axios.get<ILocationTable[]>(url)
}
