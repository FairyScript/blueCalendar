import { IAssetTable } from './ITextTable'

export type ILocationTable = IAssetTable<{
  TextTable: ILocation[]
}>

export interface ILocation {
  Id: ILocationID
  Text: string
  MetaData: any[]
  Version: ILocationVersion
}

export interface ILocationID {
  IdString: string
  FallbackId: string
  IdNumber: number
}

export interface ILocationVersion {
  Versions: [number, number, number]
}
