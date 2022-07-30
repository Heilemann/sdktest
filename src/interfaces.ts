export type TDocument = {
  _id: string // UID
  type: string // e.g. 'chararacter' or 'spell'
  creator: string // user ID
  access: string[] // list of userIds 
  values: {
    [key: string]: any
  }
}

export type TPostMessage =
  | {
    message: 'load'
  } | {
    message: 'save'
    document: TDocument
  }