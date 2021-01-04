export interface DayExerciseMemberInterface {
    dayId: number,
    name: string,
    exercices: ItemExerciseMemberInterface[]
}

export interface ItemExerciseMemberInterface {
    id?: number,
    amount: number,
    exercice?: {
        id: number,
        name: string,
    },
}