import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { supabase } from '../components/AuthBuilder';
import { AuthService, useAuthService } from "../services/Auth";
import PatientInfoForm from '../components/PatientInfo';

// const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
export default function SignUp() {


  const authService = useAuthService();

  const submitCallback = async (info: any) => {
    await authService.signUpWithEmail(info.email, info.password, info.firstName, info.lastName, info.birthDate, info.sex, info.phone, info.insurance);
};

  return (
    <>

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-indigo-500 w-12 h-12 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>

            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Signup Doctor Dashboard
            </h2>
    </div>
    </div>
    </div>
    <PatientInfoForm submitCallback={submitCallback} toggleable={false}/>
    
    </>
  );
};


