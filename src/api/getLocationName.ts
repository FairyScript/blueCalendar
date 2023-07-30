import { ILocationTable } from '@/@types/ILocation'
import axios from 'axios'

//testData
const url = `https://cdn.jsdelivr.net/gh/FairyScript/bp-datamine/Content/Text/LocationName.json`

export function getLocationTable() {
  return axios.get<ILocationTable[]>(url)
}
