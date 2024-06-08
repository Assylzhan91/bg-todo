import {typeAction} from './edit'

export class Category {
  constructor(
    public id: number,
    public title: string,
  ) {}
}

export type ActionType = {typeAction: (typeof typeAction)[number]}
export type TypeActionOrTile = ActionType | {title: string}
