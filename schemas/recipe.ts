import { z } from "zod";




const nameSchema = z.object({
    name: z.string({required_error: 'O nome da receita é necessário!'}).min(1,'O nome é necessário!'),
    quantity: z.string({required_error: 'A quantidade de porções da receita é necessária!'}).min(1,'A quantidade não pode ser vazia!'),
    picture: z.custom().optional()
})

const ingredientSchema = z.object({
    facts: z.string({required_error: 'Os ingredientes da receita é indispensável!'}).min(1,'Os ingredientes da receita é indispensável!'),
})

export enum CreateRecipeEnum {
    nameData = 'nameData',
    ingredientData = 'ingredientData'
}

export const createRecipeSchema = z.discriminatedUnion('step', [
    z.object({
        step: z.literal(CreateRecipeEnum.nameData),
        nameData:nameSchema
    }),
    z.object({
        step: z.literal(CreateRecipeEnum.ingredientData),
        ingredientData:ingredientSchema
    }),
])

export type CreateRecipeType = {
    step: CreateRecipeEnum,
    nameData: z.infer<typeof nameSchema>
    ingredientData: z.infer<typeof ingredientSchema>
}