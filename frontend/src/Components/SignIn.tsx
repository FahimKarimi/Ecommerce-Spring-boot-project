'use client'
import React from 'react';
import {useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {BsEyeFill, BsEyeSlashFill, BsFillLockFill} from "react-icons/bs";
import {HiOutlineMail} from 'react-icons/hi'
import {Input, Spinner} from "@nextui-org/react";
import Link from "next/link";

const schema = z.object({
    email: z.string().email("Invalid email, please enter valid email"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

type FormValuesType = z.infer<typeof schema>

const Login = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<FormValuesType>({resolver: zodResolver(schema)});
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);


    const onSubmit = async () => {

        reset();
    }

    const Form = (
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register('email')}
                    type={'email'}
                    size={'lg'}
                    label="Email"
                    placeholder="Example@gmail.com"
                    errorMessage={errors?.email && errors?.email.message}
                    labelPlacement="outside"
                    startContent={
                        <HiOutlineMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                />

                <Input
                    {...register('password')}
                    size={'lg'}
                    label="Password"
                    placeholder={'*****'}
                    labelPlacement="outside"
                    errorMessage={errors?.password && errors?.password.message}
                    startContent={
                        <BsFillLockFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <BsEyeFill className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                />

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign In
                        {isSubmitting && <Spinner className={'ml-1'} size={'sm'} color={'default'}/>}
                    </button>
                </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Create an account?{' '}
                <Link href="/register"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign Up
                </Link>
            </p>
        </div>
    );


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-200">
                    Sign In
                </h2>
            </div>
            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                {Form}
            </div>
        </div>
    );
};

export default Login;