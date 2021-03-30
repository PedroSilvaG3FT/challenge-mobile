export interface MemberMenuInterface {
    menuId: number
    qtdDays: number
    menuName: string,
    menuMemberId: number,
    days: DayMenuInterface[],
}

export interface DayMenuInterface {
    dayId: number,
    dayName: string,
    numberDay: number,
    meals: MealInterface[]
}
export interface MealInterface {
    menuItemId: number,
    typeMealName: string,
    typeMealId: number,
    descripition: string,
    imageItem: string,
    feedback?: string,
    rating?: number,
}