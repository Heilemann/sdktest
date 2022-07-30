import { FieldValues } from "react-hook-form"

export type TDocument = {
  _id: string // UID
  type: string // e.g. 'chararacter' or 'spell'
  creator: string // user ID
  access: string[] // list of userIds 
  values: {
    [key: string]: any
  }
}

export type TAsset = {
  _id: string
  name: string
  fileurl: string
  filesize: number
  filetype: string
  width: number
  height: number
  creator: string
}

export type TState = {
  document: TDocument
  documents: TDocument[]
  assets: TAsset[],
}

export type TReducerAction =
  | {
    type: 'LOAD'
    payload: TState
  } | {
    type: 'UPDATE_DOCUMENT_VALUES',
    payload: {
      values: FieldValues
    }
  }

export type TContext = {
  state: TState
  dispatch: React.Dispatch<TReducerAction>
}

export type TPostMessage =
  | {
    message: 'load'
  } | {
    message: 'save'
    document: TDocument
  }
