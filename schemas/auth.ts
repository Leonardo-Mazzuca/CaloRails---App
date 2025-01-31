import {z} from 'zod'



export const signInSchema = z.object({
    email: z.string({required_error: 'O email é necessário!'}).email('E-mail inválido inserido!'),
    password: z.string({required_error: 'A senha é indispensável!'}).min(1),
})

export type SignInType = z.infer<typeof signInSchema>

const personalDataSchema = z.object({
    fullname: z.string({required_error: 'O nome completo é indispensável!'}).min(1),
    phone: z.string({required_error: 'O telefone é indispensável!'}).min(1),
    email: z.string({required_error: 'O email é indispensável!'}).email('E-mail inválido inserido!'),
})

export type PersonalData = z.infer<typeof personalDataSchema>

const passwordDataSchema = z.object({
    password: z.string({required_error: 'A senha é indispensável!'}).min(1),
    confirmPassword: z.string({required_error: 'A confirmação da senha é indispensável!'}),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais!',
    path: ['confirmPassword'],
})

export type PassowordData = z.infer<typeof passwordDataSchema>

const bodyDataSchema = z.object({
    wheight: z.string({required_error: 'O peso é indispensável!'}).min(1),
    height: z.string({required_error: 'A altura é indispensável!'}).min(1),
    age: z.string({required_error: 'A idade é indispensável!'}).min(1),
    gender: z.string({required_error: 'O sexo é indispensável!'}),
})

export type BodyData = z.infer<typeof bodyDataSchema>

const goalDataSchema = z.object({
    goal: z.string({required_error: 'O objetivo é indispensável!'}),
    frequency: z.string({required_error: 'A frequência é indispensável!'}),
})

export type GoalData = z.infer<typeof goalDataSchema>

export enum UserRegisterEnum {
    personalData = 'personalData',
    passwordData = 'passwordData',
    bodyData = 'bodyData',
    goalData = 'goalData',
}

const signUpSchema = z.discriminatedUnion('step', [
    z.object({
        step: z.literal(UserRegisterEnum.personalData),
        personalData: personalDataSchema
    }),
    z.object({
        step: z.literal(UserRegisterEnum.passwordData),
        passwordData: passwordDataSchema
    }),
    z.object({
        step: z.literal(UserRegisterEnum.bodyData),
        bodyData: bodyDataSchema
    }),
    z.object({
        step: z.literal(UserRegisterEnum.goalData),
        goalData: goalDataSchema
    }),
])

export type UserRegister = {
    step: UserRegisterEnum
    personalData:PersonalData
    passwordData: PassowordData
    bodyData: BodyData
    goalData: GoalData
}

export {
    personalDataSchema,
    passwordDataSchema,
    bodyDataSchema,
    goalDataSchema,
    signUpSchema,
}