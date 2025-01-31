export const titles = [
  "Mantenha suas calorias e mantenha-se saudável!",
  "Escaneie sua comida e saiba suas calorias",
  "Acompanhe suas estatísticas de ganho e perda de peso aqui",
];

export const activityStatus = [
  {
    label: 'Sendentário 📺',
    value: 'sedentary',
  },
  {
    label: 'Pouco ativo 😩',
    value: 'slightly_active',
  },
  {
    label: 'Moderadamente ativo 🚶‍♂️',
    value: 'moderately_active',
  },
  {
    label: 'Muito ativo 🤸‍♀️',
    value: 'very_active',
  },
  {
    label: 'Extremamente ativo 💪',
    value: 'extremely_active',
  },
  
]

export const mealsEnum = {
  BREAKFAST: 0,
  LUNCH: 1,
  DINNER: 2,
  SNACK: 3
} as const

export const getMealName = (meal: number) => {
  switch (meal) {
    case 0:
      return 'Cafe da manha'
    case 1:
      return 'Almoço'
    case 2:
      return 'Jantar'
    case 3:
      return 'Lanche'
  }
}

export const getStringMealName = (meal:string) => {

  switch (meal) {
    case 'breakfast':
      return 'Cafe da manha'
    case 'lunch':
      return 'Almoço'
    case 'dinner':
      return 'Jantar'
    case 'snack':
      return 'Lanches'
  }
}

export const mealArray = [
  {
    
    label: 'Café da manha',
    value: 0,
  },
  {
    label: 'Almoço',
    value: 1,
  },
  {
    label: 'Jantar',
    value: 2,
  },
  {
    label: 'lanches',
    value: 3,
  },
]

