export interface DayExerciseMemberInterface {
    dayId: number,
    name: string,
    exercices: ItemExerciseMemberInterface[]
}

export interface ItemExerciseMemberInterface {
    id?: number,
    amount: number,
    isLink?: boolean,
    linkUrl: string,
    exercice?: {
        id: number,
        name: string,
    },
}