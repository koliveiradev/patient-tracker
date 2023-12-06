import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { supabase } from '../components/AuthBuilder';
import { AuthService, useAuthService } from "../services/Auth";

// const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
export default function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sex, setSex] = useState('');
  const [phone, setPhone] = useState('');
  const [insurance, setInsurance] = useState('');

  const authService = useAuthService();

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior
    await authService.signUpWithEmail(email, password, firstName, lastName, birthDate, sex, phone, insurance);
  };

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-indigo-500 w-12 h-12 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>

        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Patient Signup
        </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
    <Formik
      initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          birthDate: '',
          sex: '',
          phone: '',
          insurance: '',
        }}
        onSubmit={handleSubmit}
        >
      {({ values, errors, touched, isSubmitting }) => (
          <form className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              autoComplete="email"
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              />
            {errors.email && touched.email ? (
                <div className="text-red-500">{errors.email}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              />
            {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              />
            {errors.firstName && touched.firstName ? (
                <div className="text-red-500">{errors.firstName}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              />
            {errors.lastName && touched.lastName ? (
              <div className="text-red-500">{errors.lastName}</div>
              ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="birthDate" className="block text-sm font-medium leading-6 text-gray-900">Birth Date</label>
            <Field
              id="birthDate"
              name="birthDate"
              type="date"
              value={birthDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              />
            {errors.birthDate && touched.birthDate ? (
                <div className="text-red-500">{errors.birthDate}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900">Sex</label>
            <Field
              as="select"
              id="sex"
              name="sex"
              value={sex}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSex(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
            {errors.sex && touched.sex ? (
                <div className="text-red-500">{errors.sex}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
            <Field
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              />
            {errors.phone && touched.phone ? (
                <div className="text-red-500">{errors.phone}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="insurance" className="block text-sm font-medium leading-6 text-gray-900">Insurance</label>
            <Field
              id="insurance"
              name="insurance"
              type="text"
              value={insurance}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInsurance(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              />
            {errors.insurance && touched.insurance ? (
                <div className="text-red-500">{errors.insurance}</div>
                ) : null}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={isSubmitting}
            onClick={handleSubmit}
            >
            Submit
          </button>
        </form>
      )}
    </Formik>
      </div>
      </div>
                </>
  );
};


