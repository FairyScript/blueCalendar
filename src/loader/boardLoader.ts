import type { IBoardData, IBoardPanel, IBoardQuest } from '@/@types/IBoard'
import { getBoardData, getBoardPanel, getBoardQuest } from '@/api/boardData'
import { getLocationTable } from '@/api/getLocationName'
import { getTexts } from '@/api/text'

export async function boardDataLoader() {
  const [boardDataRaw, boardPanelRaw, boardQuestRaw, textsRaw, locationRaw] =
    await Promise.all([
      getData(getBoardData()),
      getData(getBoardPanel()),
      getData(getBoardQuest()),
      getData(getTexts()),
      getData(getLocationTable()),
    ])

  //text id: ITextItem
  const texts: Record<string, Record<number, string>> = {}
  for (const group of textsRaw) {
    const data: Record<number, string> = {}
    for (const textItem of group.texts) {
      data[textItem.id] = textItem.text
    }
    texts[group.name] = data
  }

  //id: IBoardData
  const boardData: Record<number, IBoardDataRich> = {}
  for (const data of boardDataRaw) {
    const d = data as IBoardDataRich
    d.name_text = texts.master_adventure_boards_text[data.name]
    d.quest_panel = []
    boardData[data.id] = d
  }

  //note: board_panel_id = board_quest_id

  //id: IBoardPanel
  const boardPanel: Record<number, IBoardPanel> = {}
  for (const data of boardPanelRaw) {
    boardPanel[data.id] = data
    //add quest_panel to boardData
    boardData[data.board_id].quest_panel.push(data.id)
  }

  //id: IBoardQuestRich
  const boardQuest: Record<number, IBoardQuestRich> = {}
  for (const data of boardQuestRaw) {
    const d = data as IBoardQuestRich
    d.quest_text = texts.master_adventure_board_quests_text[data.quest_name]
    boardQuest[data.id] = d

    // add board_id to boardQuest
    d.board_id = boardPanel[data.id].board_id

    //add condition_list & map_id to boardData
    // if (!boardData[d.board_id].condition_list)
    //   boardData[d.board_id].condition_list = []
    // if (!boardData[d.board_id].map_id_list)
    //   boardData[d.board_id].map_id_list = []

    // const condition_type = parseInt(
    //   d.quest_achievement_condition.condition_type
    // )
    // const map_id = d.quest_achievement_condition.map_id
    // boardData[d.board_id].condition_list.push(condition_type)
    // if (map_id) boardData[d.board_id].map_id_list.push(map_id)
  }

  // location_id: location_name
  const locationName: Record<string, string> = {}
  const locationTable = locationRaw[0].Properties.TextTable
  for (const item of locationTable) {
    const id = item.Id.IdString
    const name = item.Text
    locationName[id] = name
  }

  return {
    boardData,
    boardPanel,
    boardQuest,
    texts,
    locationName,
  }
}

export type IBoardLoaderData = Awaited<ReturnType<typeof boardDataLoader>>

function getData<T extends {}>(loader: Promise<{ data: T }>) {
  return loader.then(res => res.data as T)
}

export interface IBoardDataRich extends IBoardData {
  name_text: string
  quest_panel: number[]
  // condition_list: number[]
  // map_id_list: string[]
}

export interface IBoardQuestRich extends IBoardQuest {
  quest_text: string
  board_id: number
}
