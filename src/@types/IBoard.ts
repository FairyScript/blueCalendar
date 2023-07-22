export interface IBoardData {
  id: number
  board_type: number
  name: number
  icon_id: number
  bg_id: number
  complete_reward_id_list: IBoardReward[]
  challenge_term_id: string
  acceptance_term_id: string
  class_type: number
  sort_id: number
  board_version: string
  desc: number
}

export interface IBoardReward {
  reward_id: string
}

export interface IBoardPanel {
  id: number
  board_id: number
  icon_id: number
  ui_pos_x: number
  ui_pos_y: number
  type: number
  mission_id: string
  required_count: number
  reward_ids: IRewardID[]
  next_panel_ids: INextPanelID[]
}

export interface INextPanelID {
  panel_id: string
}

export interface IRewardID {
  reward_id: string
}

export interface IBoardQuest {
  id: number
  quest_group_id: string
  quest_id: string
  quest_name: number
  quest_reward_id: null
  quest_valid_term_id: string
  quest_rarity: number
  is_always_selected: number
  season_id: string
  season_pass_type: number
  challengeable_character_class: number
  adventure_rank_required_from: number
  adventure_rank_required_to: number
  grant_rank_point: number
  quest_achieved_token_id: number
  quest_achieved_token_count: number
  quest_achievement_condition: IQuestAchievementCondition
  active: number
  debug: number
}

export interface IQuestAchievementCondition {
  quest_achievement_condition_id: string
  condition_type: string
  complete_value: string
  item_type?: string
  map_id?: string
}
