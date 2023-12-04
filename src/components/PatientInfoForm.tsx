import React, { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { supabase } from './AuthBuilder';
import { PatientService } from '../services/Patient'
import { AuthService, useAuthService } from "../services/Auth";

// const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
export default function PatientInfoForm(props: {submitCallback: (info:any)=>Promise<void>, toggleable: boolean}) {
  const {submitCallback, toggleable} = {...props}

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sex, setSex] = useState('');
  const [phone, setPhone] = useState('');
  const [insurance, setInsurance] = useState('');

  useEffect(()=> {
    const fetchData = async() => {
      try {
          const {
              data: { user },
          } = await supabase.auth.getUser();

          let patient = await service.getPatientByEmail(user?.email??"");
          setEmail(patient?.email??"");
          setFirstName(patient?.first_name??"");
          setLastName(patient?.last_name??"");
          setBirthDate(patient?.birth??"");
          setSex(patient?.sex??"");
          setPhone(patient?.phone??"");
          setInsurance(patient?.insurance??"");
  
      } catch (error) {
          console.log('error :( ' + error);
      }
  };
  var service = new PatientService();
  fetchData();
  }, []);

  const [mode, setMode] = useState(toggleable? 'view' : 'edit');

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (toggleable) {
      setMode(mode == 'view'? 'edit':'view');
    }
    if (mode == 'edit') {
      await submitCallback({
        email:email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        sex: sex,
        phone: phone,
        insurance: insurance
      });
    }
  }

  return (
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
              {!toggleable? 
              <Field
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              /> : 
              <label>{email}</label>}
            {errors.email && touched.email ? (
                <div className="text-red-500">{errors.email}</div>
                ) : null}
          </div>

          {!toggleable? 
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
          : <></>}

          <div className="flex flex-col">
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
            {mode == 'edit'? 
            <Field
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              /> :
              <label>{firstName}</label>}
            {errors.firstName && touched.firstName ? (
                <div className="text-red-500">{errors.firstName}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
            {mode=='edit'?
            <Field
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              /> : 
              <label>{lastName}</label>}
            {errors.lastName && touched.lastName ? (
              <div className="text-red-500">{errors.lastName}</div>
              ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="birthDate" className="block text-sm font-medium leading-6 text-gray-900">Birth Date</label>
           {mode == 'edit'? <Field
              id="birthDate"
              name="birthDate"
              type="date"
              value={birthDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              /> :
              <label>{birthDate}</label>}
            {errors.birthDate && touched.birthDate ? (
                <div className="text-red-500">{errors.birthDate}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900">Sex</label>
            {mode == 'edit'? <Field
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
            </Field> :
            <label>{sex}</label>}
            {errors.sex && touched.sex ? (
                <div className="text-red-500">{errors.sex}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
            {mode == 'edit'? <Field
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              /> :
              <label>{phone}</label>}
            {errors.phone && touched.phone ? (
                <div className="text-red-500">{errors.phone}</div>
                ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="insurance" className="block text-sm font-medium leading-6 text-gray-900">Insurance</label>
            {mode == 'edit'? <Field
              id="insurance"
              name="insurance"
              type="text"
              value={insurance}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInsurance(e.target.value)}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              /> :
              <label>{insurance}</label>}
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
            {mode == 'edit' ? "Submit" : "Update Info"}
          </button>
        </form>
      )}
    </Formik>        
  );
};

