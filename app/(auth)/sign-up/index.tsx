import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { signUpSchema, UserRegister, UserRegisterEnum } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalStep from "./personal-step";
import PasswordStep from "./password-step";
import BodyStep from "./body-step";
import GoalStep from "./goal-step";
import Button from "@/components/button";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";


const SignUp = () => {

  const {signUp} = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<UserRegister>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      step: UserRegisterEnum.personalData,
    },
  });

  const {
    watch,
    getValues,
    setValue,
    handleSubmit,
    
  } = form;



  const setStep = (step: UserRegisterEnum) => {
    setValue("step", step);
  };

  const step = watch("step");
  const isPersonalData = step === "personalData";
  const isPassowordData = step === "passwordData";
  const isBodyData = step === "bodyData";
  const isGoalData = step === "goalData";

  const createUser = async (user:CreateUserType) => {

    setIsSubmitting(true)

    const {data,error} = await signUp(user)

    if(data) {

      router.push('/success')

    } else {

      Alert.alert(error!)
      
    }

    setIsSubmitting(false)


  }

  const handleNextStep = async () => {
    switch (step) {
      case "personalData":
        setStep(UserRegisterEnum.passwordData);
        break;

      case "passwordData":
        setStep(UserRegisterEnum.bodyData);
        break;

      case "bodyData":
        setStep(UserRegisterEnum.goalData);

        break;

      case "goalData":
        const {personalData:{fullname,email,phone}} = getValues();
        const {bodyData:{age,height,wheight,gender}} = getValues();
        const {goalData:{goal,frequency}} = getValues();
        const {passwordData:{password}} = getValues();

        const body:CreateUserType = {
          fullname,
          email,
          password,
          phone_number: phone,
          wheight: parseInt(wheight),
          goal: parseInt(goal),
          height: parseInt(height),
          age: parseInt(age),
          gender,
          status: frequency
        }

        await createUser(body);

        break;

    }

  };

  const handleBackStep = async () => {
    switch (step) {

      case "passwordData":
        setStep(UserRegisterEnum.personalData);
        break;

      case "bodyData":
        setStep(UserRegisterEnum.passwordData);

        break;

      case "goalData":
        setStep(UserRegisterEnum.bodyData);

        break;

    }
  };

  
  return (

    <FormProvider {...form}>
      <SafeAreaView className="h-full">
        <ScrollView
          style={{
            paddingHorizontal: 20,
            height: '100%',
          }}
          
        >
          <View className="flex my-10 items-center justify-center">
            <Image
              source={images.appLogo}
              className="w-[100px] h-[100px] object-cover"
              resizeMode="contain"
            />
          </View>

          {isPersonalData && <PersonalStep />}
          {isPassowordData && <PasswordStep />}
          {isBodyData && <BodyStep />}
          {isGoalData && <GoalStep />}

          <Button
            onPress={handleSubmit(handleNextStep)}
            title={!isGoalData ? "Continuar" : "finalizar"}
            className="my-5"
            isLoading={isSubmitting}
          />

          {isPersonalData && (
            
            
            <View className='flex-row justify-center items-center '>
              <Text className='font-normal text-gray-500'>
               Já tem uma conta?
              </Text>
                <Link className='my-2 ms-1 underline text-p-blue' href={'/sign-in'}>
                Entrar
              </Link>
            </View>

          )}

          {!isPersonalData && (
        
            <Button
              variant={'text'}
              textClasses="text-gray-700 text-md underline font-light"
              onPress={handleBackStep}
              title={'Voltar'}
         
            />

          )}

        </ScrollView>

      </SafeAreaView>

    </FormProvider>
  );
};

export default SignUp;
