export function returnCurrentMenuMember(): MemberMenuInterface {
    const menuMember = {
        id: 1,
        idMember: 1,
        idMenu: 1,
        active: true,
        dateCriation: '',
    }

    const menu = {
        id: 1,
        name: 'Cardapio',
        qtdDays: 1,
        active: true,
        dateCriation: '',
    }

    const menuItem = [
        { id: 25, descripition: 'Mamão', typeMealId: 1, menuId: 1, dateCriation: '' },
        { id: 26, descripition: 'Frango e salada', typeMealId: 2, menuId: 1, dateCriation: '' },
        { id: 27, descripition: 'Crepioca e cafe', typeMealId: 3, menuId: 1, dateCriation: '' },
        { id: 28, descripition: 'Rodela de Abacaxi', typeMealId: 4, menuId: 1, dateCriation: '' },

        { id: 1, descripition: 'Mamão', typeMealId: 1, menuId: 1, dateCriation: '' },
        { id: 2, descripition: 'Frango e salada', typeMealId: 2, menuId: 1, dateCriation: '' },
        { id: 3, descripition: 'Crepioca e cafe', typeMealId: 3, menuId: 1, dateCriation: '' },
        { id: 4, descripition: 'Rodela de Abacaxi', typeMealId: 4, menuId: 1, dateCriation: '' },

        { id: 21, descripition: 'Bolacha e Café', typeMealId: 1, menuId: 1, dateCriation: '' },
        { id: 22, descripition: 'Carne e verduras', typeMealId: 2, menuId: 1, dateCriation: '' },
        { id: 23, descripition: 'Mamão', typeMealId: 3, menuId: 1, dateCriation: '' },
        { id: 24, descripition: 'Laranja', typeMealId: 4, menuId: 1, dateCriation: '' },

        { id: 5, descripition: 'Bolacha e Café', typeMealId: 1, menuId: 1, dateCriation: '' },
        { id: 6, descripition: 'Carne e verduras', typeMealId: 2, menuId: 1, dateCriation: '' },
        { id: 7, descripition: 'Mamão', typeMealId: 3, menuId: 1, dateCriation: '' },
        { id: 8, descripition: 'Laranja', typeMealId: 4, menuId: 1, dateCriation: '' },

        { id: 17, descripition: 'Mamão', typeMealId: 1, menuId: 1, dateCriation: '' },
        { id: 18, descripition: 'Frango e salada', typeMealId: 2, menuId: 1, dateCriation: '' },
        { id: 19, descripition: 'Crepioca e cafe', typeMealId: 3, menuId: 1, dateCriation: '' },
        { id: 20, descripition: 'Rodela de Abacaxi', typeMealId: 4, menuId: 1, dateCriation: '' },

        { id: 9, descripition: 'Mamão', typeMealId: 1, menuId: 1, dateCriation: '' },
        { id: 10, descripition: 'Frango e salada', typeMealId: 2, menuId: 1, dateCriation: '' },
        { id: 11, descripition: 'Crepioca e cafe', typeMealId: 3, menuId: 1, dateCriation: '' },
        { id: 12, descripition: 'Rodela de Abacaxi', typeMealId: 4, menuId: 1, dateCriation: '' },

        { id: 13, descripition: 'Bolacha e Café', typeMealId: 1, menuId: 1, dateCriation: '' },
        { id: 14, descripition: 'Carne e verduras', typeMealId: 2, menuId: 1, dateCriation: '' },
        { id: 15, descripition: 'Mamão', typeMealId: 3, menuId: 1, dateCriation: '' },
        { id: 16, descripition: 'Laranja', typeMealId: 4, menuId: 1, dateCriation: '' },

        { id: 29, descripition: 'Mamão', typeMealId: 1, menuId: 1, dateCriation: '' },
        { id: 30, descripition: 'Frango e salada', typeMealId: 2, menuId: 1, dateCriation: '' },
        { id: 31, descripition: 'Crepioca e cafe', typeMealId: 3, menuId: 1, dateCriation: '' },
        { id: 32, descripition: 'Rodela de Abacaxi', typeMealId: 4, menuId: 1, dateCriation: '' },
    ];

    const menuItemDay = [
        { id: 1, idDay: 7, numberDay: 7, idMenuItem: 25, dateCriation: '' },
        { id: 2, idDay: 7, numberDay: 7, idMenuItem: 26, dateCriation: '' },
        { id: 3, idDay: 7, numberDay: 7, idMenuItem: 27, dateCriation: '' },
        { id: 4, idDay: 7, numberDay: 7, idMenuItem: 28, dateCriation: '' },

        { id: 5, idDay: 1, numberDay: 1, idMenuItem: 1, dateCriation: '' },
        { id: 6, idDay: 1, numberDay: 1, idMenuItem: 2, dateCriation: '' },
        { id: 7, idDay: 1, numberDay: 1, idMenuItem: 3, dateCriation: '' },
        { id: 8, idDay: 1, numberDay: 1, idMenuItem: 4, dateCriation: '' },

        { id: 9, idDay: 6, numberDay: 6, idMenuItem: 21, dateCriation: '' },
        { id: 10, idDay: 6, numberDay: 6, idMenuItem: 22, dateCriation: '' },
        { id: 11, idDay: 6, numberDay: 6, idMenuItem: 23, dateCriation: '' },
        { id: 12, idDay: 6, numberDay: 6, idMenuItem: 24, dateCriation: '' },

        { id: 13, idDay: 2, numberDay: 2, idMenuItem: 5, dateCriation: '' },
        { id: 14, idDay: 2, numberDay: 2, idMenuItem: 6, dateCriation: '' },
        { id: 15, idDay: 2, numberDay: 2, idMenuItem: 7, dateCriation: '' },
        { id: 16, idDay: 2, numberDay: 2, idMenuItem: 8, dateCriation: '' },

        { id: 17, idDay: 5, numberDay: 5, idMenuItem: 17, dateCriation: '' },
        { id: 18, idDay: 5, numberDay: 5, idMenuItem: 18, dateCriation: '' },
        { id: 19, idDay: 5, numberDay: 5, idMenuItem: 19, dateCriation: '' },
        { id: 20, idDay: 5, numberDay: 5, idMenuItem: 20, dateCriation: '' },

        { id: 21, idDay: 3, numberDay: 3, idMenuItem: 9, dateCriation: '' },
        { id: 22, idDay: 3, numberDay: 3, idMenuItem: 10, dateCriation: '' },
        { id: 23, idDay: 3, numberDay: 3, idMenuItem: 11, dateCriation: '' },
        { id: 24, idDay: 3, numberDay: 3, idMenuItem: 12, dateCriation: '' },

        { id: 25, idDay: 4, numberDay: 4, idMenuItem: 13, dateCriation: '' },
        { id: 26, idDay: 4, numberDay: 4, idMenuItem: 14, dateCriation: '' },
        { id: 27, idDay: 4, numberDay: 4, idMenuItem: 15, dateCriation: '' },
        { id: 28, idDay: 4, numberDay: 4, idMenuItem: 16, dateCriation: '' },

        { id: 29, idDay: 1, numberDay: 8, idMenuItem: 29, dateCriation: '' },
        { id: 30, idDay: 1, numberDay: 8, idMenuItem: 30, dateCriation: '' },
        { id: 31, idDay: 1, numberDay: 8, idMenuItem: 31, dateCriation: '' },
        { id: 32, idDay: 1, numberDay: 8, idMenuItem: 32, dateCriation: '' },
    ]

    // --- Logica --- \\
    const menuMemberDTO: MemberMenuInterface = {
        menuId: menu.id,
        menuName: menu.name,
        days: []
    }

    const numberDays = menuItemDay.map(itemDay => itemDay.numberDay);
    const numberDayFilter = Array.from(new Set(numberDays)).sort();

    numberDayFilter.forEach(numberDay => {
        const day = menuItemDay.filter(itemDay => itemDay.numberDay === numberDay)[0];

        const newDay = {
            dayId: day.idDay,
            dayName: DayEnum[day.idDay],
            numberDay: day.numberDay,
            meals: [] as MealInterface[]
        }

        menuMemberDTO.days.push(newDay);
    })

    menuMemberDTO.days.forEach(itemDay => {
        const mealsDay = menuItemDay.filter(x => itemDay.numberDay === x.numberDay);

        mealsDay.forEach(mealtem => {
            if (itemDay.numberDay === mealtem.numberDay) {
                const meal = menuItem.find(item => item.id === mealtem.idMenuItem) as any;

                const newMeal = {
                    typeMealName: TypeMealEnum[meal.typeMealId],
                    typeMealId: meal.typeMealId,
                    descripition: meal.descripition,
                } as MealInterface

                itemDay.meals.push(newMeal)
            }
        })
    });

    return menuMemberDTO
}


export interface MemberMenuInterface {
    menuId: number
    menuName: string,
    days: DayMenuInterface[]
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

enum DayEnum {
    'Domingo' = 1,
    'Segunda-Feira' = 2,
    'Terça-Feira' = 3,
    'Quarta-Feira' = 4,
    'Quinta-Feira' = 5,
    'Sexta-Feira' = 6,
    'Sabado' = 7,
}

enum TypeMealEnum {
    'Café da Manhã' = 1,
    'Almoço' = 2,
    'Café da Tarde' = 3,
    'Janta' = 4
}