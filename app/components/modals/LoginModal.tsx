"use client";


// Stop Time 1:27:16 - Install  react-hot-toast

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc'
import { useState,  useCallback} from 'react';
import { signIn } from 'next-auth/react'
import {
    FieldValues, 
    SubmitHandler, 
    useForm
} from "react-hook-form";

import { useRouter } from 'next/navigation';

import useRegisterModel from '@/app/hooks/useRegisterModel';

import Modal from './Modal'
import Heading from '../Heading';
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    // Router
    const router = useRouter();

    const registerModal = useRegisterModel();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,  
        }).then(callback => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success(`Logged in successfully as ${data?.email}`);
                router.refresh();
                loginModal.onClose();
            } 
            if (callback?.error) {
                toast.error(callback.error);

            }
        })
    }


    const bodyContent = (
        <div className="flex flex-col gap-5 ">
            <Heading center title='Welcome Back' subtitle='Login to your account' />
            <Input 
                id="email" 
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            
            <Input 
                id="password" 
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )


    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <br />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={
                    () => signIn("google", {redirect: false}).then(callback => {
                        console.log(callback?.ok)
                        // if (callback?.ok){
                        //     toast.success("Successful")
                        // } 
                        // if (callback?.error) {
                        //     toast.error(callback.error);
            
                        // }
                        
                    })
                }
            />
            <Button 
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div className="
                text-neutral-500 text-center ml-4 font-light
            ">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>Do not have an account?</div>
                    <div
                        onClick={() => {
                            loginModal.onClose()
                            setTimeout(() => {
                                registerModal.onOpen()
                            }, 100)
                            
                        }}  
                        className='text-neutral-800 cursor-pointer hover:underline'
                    >
                        Register
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Login"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        /> 
    )
}

export default RegisterModal