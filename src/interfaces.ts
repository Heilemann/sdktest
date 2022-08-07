import { FieldValues } from "react-hook-form"

export type TDocument = {
  _id: string // UID
  type: string // e.g. 'chararacter' or 'spell'
  creator: string // user ID
  access: string[] // list of userIds 
  values: TValues
}

export type TValues = {
  // info: {
  //   name: string
  //   occupation: string
  //   residence: string
  //   birthplace: string
  //   pronouns: string
  //   age: string
  // }
  [key: string]: any
  weapons?: TWeapon[]
}

export type TWeapon = {
  name: string
  damage: number
  range: number
  weight: number
  cost: number
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
  editMode: 'view' | 'edit'
  document: TDocument
  documents: TDocument[]
  assets: TAsset[],
  messageToApp?: (message: string, data?: any) => void
}

export type TReducerAction =
  | {
    type: 'LOAD'
    payload: Partial<TState>
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
  } | {
    message: 'sendMessage'
    data: { message: string }
  }
