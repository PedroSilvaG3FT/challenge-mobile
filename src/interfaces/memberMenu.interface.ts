export interface MemberMenuInterface {
    menuId: number
    qtdDays: number
    menuName: string,
    menuMemberId: number,
    days: DayMenuInterface[],
}

interface DayMenuInterface {
    dayId: number,
    dayName: string,
    numberDay: number,
    meals: MealInterface[]
}
interface MealInterface {
    typeMealName: string,
    typeMealId: number,
    descripition: string
}