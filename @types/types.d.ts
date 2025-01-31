


declare global {

    type CreateUserType = {
        fullname:string,
        email: string,
        password: string,
        phone_number: string,
        wheight: number,
        goal: number
        height: number,
        age: number,
        gender: string,
        status: string
    }

    type User = {
        id: number;
        fullname: string;
        email: string;
        password_digest: string;
        phone_number: string;
        wheight: number;
        created_at: string; 
        updated_at: string; 
        goal: number;
        height: number;
        age: number;
        gender: string
        total_calories: number;
        status: string
      };

    type ServerResponse = {
        error?:string,
        data?:any
    }

    type Recipe = {
        id: number,
        created_at: string
        updated_at: string
        name: string,
        description: string,
        calories: number,
        picture: string
        user_id: number,
    }

    type Food = {
        category: string;
        categoryLabel: string;
        foodId: string;
        image: string;
        knownAs: string[]; 
        label: string;
        nutrients: {
          CHOCDF: number;
          ENERC_KCAL: number;
          FAT: number;
          FIBTG: number;
          PROCNT: number;
        };
    }

    type FoodNutrition = {
        calories: number;
        cautions: string[];
        co2EmissionsClass: string;
        cuisineType: string[];
        dietLabels: string[];
        dishType: string[];
        healthLabels: string[];
        ingredients: { parsed: any[]; text: string }[];
        mealType: string[];
        totalCO2Emissions: number;
        totalDaily: {
          CA: { label: string; quantity: number; unit: string };
          CHOCDF: { label: string; quantity: number; unit: string };
          CHOLE: { label: string; quantity: number; unit: string };
          ENERC_KCAL: { label: string; quantity: number; unit: string };
          FASAT: { label: string; quantity: number; unit: string };
          FAT: { label: string; quantity: number; unit: string };
          FE: { label: string; quantity: number; unit: string };
          FOLDFE: { label: string; quantity: number; unit: string };
          K: { label: string; quantity: number; unit: string };
          MG: { label: string; quantity: number; unit: string };
          NA: { label: string; quantity: number; unit: string };
          NIA: { label: string; quantity: number; unit: string };
          P: { label: string; quantity: number; unit: string };
          PROCNT: { label: string; quantity: number; unit: string };
          RIBF: { label: string; quantity: number; unit: string };
          THIA: { label: string; quantity: number; unit: string };
          VITB12: { label: string; quantity: number; unit: string };
          VITB6A: { label: string; quantity: number; unit: string };
          VITC: { label: string; quantity: number; unit: string };
          VITD: { label: string; quantity: number; unit: string };
          ZN: { label: string; quantity: number; unit: string };
        };
        totalNutrients: {
          CA: { label: string; quantity: number; unit: string };
          CHOCDF: { label: string; quantity: number; unit: string };
          'CHOCDF.net': { label: string; quantity: number; unit: string };
          CHOLE: { label: string; quantity: number; unit: string };
          ENERC_KCAL: { label: string; quantity: number; unit: string };
          FAMS: { label: string; quantity: number; unit: string };
          FAPU: { label: string; quantity: number; unit: string };
          FASAT: { label: string; quantity: number; unit: string };
          FAT: { label: string; quantity: number; unit: string };
          FE: { label: string; quantity: number; unit: string };
          FOLAC: { label: string; quantity: number; unit: string };
          FOLDFE: { label: string; quantity: number; unit: string };
          FOLFD: { label: string; quantity: number; unit: string };
          K: { label: string; quantity: number; unit: string };
          MG: { label: string; quantity: number; unit: string };
          NA: { label: string; quantity: number; unit: string };
          NIA: { label: string; quantity: number; unit: string };
          P: { label: string; quantity: number; unit: string };
          PROCNT: { label: string; quantity: number; unit: string };
          RIBF: { label: string; quantity: number; unit: string };
          THIA: { label: string; quantity: number; unit: string };
          VITB12: { label: string; quantity: number; unit: string };
          VITB6A: { label: string; quantity: number; unit: string };
          VITC: { label: string; quantity: number; unit: string };
          VITD: { label: string; quantity: number; unit: string };
          WATER: { label: string; quantity: number; unit: string };
          ZN: { label: string; quantity: number; unit: string };
        };
        totalNutrientsKCal: {
          CHOCDF_KCAL: { label: string; quantity: number; unit: string };
          ENERC_KCAL: { label: string; quantity: number; unit: string };
          FAT_KCAL: { label: string; quantity: number; unit: string };
          PROCNT_KCAL: { label: string; quantity: number; unit: string };
        };
        totalWeight: number;
        uri: string;
        yield: number;
        
    }

    type ExpoImageType = {
      uri:string
      mimeType:string
      fileName:string
    }

    type ImageType = {
      assetId?: string;
      base64?: string;
      duration?: string;
      exif?: string;
      fileName: string;
      fileSize: number;
      height: number;
      mimeType: string;
      rotation?: number;
      type: string;
      uri: string;
      width: number;
    }


    type FoodOnMeal = {
      id:number
      calories: number,
      name:string,
      food_id: string,
      grams: number,
      quantity: number
      meal_id: number
    }
    
    type Meal = {
      id?:number
      date: string
      total_calories: number,
      meal_type: string | number,
      foods?: FoodOnMeal[]
    }

    type CreateFood = {
      meal_id:number,
      name: string,
      calories: number,
      quantity:number,
      grams: number
      food_id:string
    }

}

export {}
