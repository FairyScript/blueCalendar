import { ITexts } from '@/@types/ITexts'
import axios from 'axios'

//testData
function getText(lang: string) {
  return `https://cdn.jsdelivr.net/gh/FairyScript/bp-datamine/apiext/texts/${lang}.json` //new URL(`../testData/texts/${lang}.json`, import.meta.url).href
}

const jpText = getText('ja_JP')

export function getTexts() {
  return axios.get<ITexts[]>(jpText)
}
