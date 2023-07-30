import { ITexts } from '@/@types/ITexts'
import axios from 'axios'

//testData
function getText(lang: string) {
  return `https://cdn.jsdelivr.net/gh/FairyScript/bp-datamine/apiext/texts/${lang}.json`
}

const jpText = getText('ja_JP')

export function getTexts() {
  return axios.get<ITexts[]>(jpText)
}
