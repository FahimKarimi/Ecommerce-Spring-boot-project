import React from 'react'
import axios from "axios"
import toast from "react-hot-toast"
import {useForm} from "react-hook-form";
import {z} from 'zod'
import Link from "next/link";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input, Spinner} from "@nextui-org/react";
import {BsEyeFill, BsEyeSlashFill, BsFillLockFill} from "react-icons/bs";
import {useRouter} from "next/navigation";
import {MdEmail} from "react-icons/md";
import {FaUserAlt} from "react-icons/fa";

const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter valid email"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

type FormValuesType = z.infer<typeof schema>

export default function SignUp() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
    } = useForm<FormValuesType>({resolver: zodResolver(schema)})
    const [isVisible, setIsVisible] = React.useState(false);
    const router = useRouter();
    const toggleVisibility = () => setIsVisible(!isVisible);

    const registerUser = async (values: any) => {
        await axios.post('/api/register', values)
            .then(() => {
                toast.success('User has been registered!');
                router.push('/api/auth/signin');
                reset();
            })
            .catch(() => toast.error('Something went wrong!'))
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-200">
                        Register for an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(registerUser)}>
                        <Input
                            {...register('name')}
                            type="text"
                            size={'lg'}
                            label="Name"
                            placeholder="John"
                            errorMessage={errors?.name && errors?.name.message}
                            labelPlacement="outside"
                            startContent={
                                <FaUserAlt className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                            }
                        />

                        <Input
                            {...register('email')}
                            type={'email'}
                            size={'lg'}
                            label="Email"
                            placeholder="Example@gmail.com"
                            errorMessage={errors?.email && errors?.email.message}
                            labelPlacement="outside"
                            startContent={
                                <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
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
                                <BsFillLockFill
                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
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
                                Register
                                {isSubmitting && <Spinner className={'ml-1'} size={'sm'} color={'default'}/>}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login"
                              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}