import { IBoardData, IBoardPanel, IBoardQuest } from '@/@types/IBoard'
import axios from 'axios'

//testData
function getTestUrl(name: string) {
  return new URL(`../testData/${name}.json`, import.meta.url).href
}

const boardData = getTestUrl('master_adventure_board')
const boardPanel = getTestUrl('master_adventure_board_panel')
const boardQuest = getTestUrl('master_adventure_board_quest')

export function getBoardData() {
  return axios.get<IBoardData[]>(boardData)
}

export function getBoardPanel() {
  return axios.get<IBoardPanel[]>(boardPanel)
}

export function getBoardQuest() {
  return axios.get<IBoardQuest[]>(boardQuest)
}
