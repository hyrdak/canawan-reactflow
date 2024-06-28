import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import databaseService from 'databaseService';

import { SupabaseClient } from '@supabase/supabase-js';

import 'react-toastify/dist/ReactToastify.css';

//
// import React, { useEffect, useRef, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { SupabaseClient } from '@supabase/supabase-js';
// import sign_up from 'databaseService'; // Loại bỏ import thứ hai

// import 'react-toastify/dist/ReactToastify.css';

// const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;

// interface Props {
//     supabase: SupabaseClient;
// }

const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

interface Props {
    supabase: SupabaseClient;
}

const SignUp: React.FC<Props> = ({ supabase }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [displayNameError, setDisplayNameError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

    const displayNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (displayNameInputRef.current) {
            displayNameInputRef.current.focus();
        }
    }, []);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setEmailError(''); // Clear email error
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordError(''); // Clear password error
    };

    const handleDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setDisplayName(newName);
        setDisplayNameError(''); // Clear display name error
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        setConfirmPasswordError(''); // Clear confirm password error
    };

    const validateEmail = (email: string): boolean => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
return pattern.test(email);
    };

    const showMessage = (msg: string) => {
toast(msg);
    };

    const validateFields = (): boolean => {
        let isValid = true;

        if (!email.trim()) {
            setEmailError('Vui lòng nhập địa chỉ email hợp lệ.');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Email không hợp lệ.');
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError('Vui lòng nhập mật khẩu.');
            isValid = false;
        }

        if (!displayName.trim()) {
            setDisplayNameError('Vui lòng nhập tên của bạn.');
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Vui lòng nhập lại mật khẩu.');
            isValid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Mật khẩu không khớp.');
            isValid = false;
        }

        return isValid;
    };

    const signup_action = async () => {
        if (!validateFields()) {
            return;
        }
        setLoading(true);
        const result = await databaseService.sign_up(supabase, email, password);
        setLoading(false);
        if (result.success) {
            showMessage(result.message);
            window.location.href = '/sign-in';
        } else {
            showMessage(result.message);
        }
    };

    return (
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-600 to-cyan-400">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-1 sm:max-w-3xl xl:p-1 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 grid">
                        <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                            Đăng ký tài khoản
                        </h1>
                        <form className="grid grid-cols-2 gap-4" action="#" onSubmit={(e) => { e.preventDefault(); signup_action(); }}>
                            <div className='col-span-1'>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên hiển thị</label>
                                    <input
                                        ref={displayNameInputRef}
className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${displayNameError ? 'border-red-500' : ''}`}
                                        id="name"
                                        type="text"
                                        placeholder="Vui lòng nhập tên của bạn"
                                        value={displayName}
                                        onChange={handleDisplayNameChange}
                                    />
                                    {displayNameError && <p className="text-red-500">{displayNameError}</p>}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${emailError ? 'border-red-500' : ''}`}
                                        id="email"
                                        type="email"
                                        placeholder="Nhập địa chỉ email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {emailError && <p className="text-red-500">{emailError}</p>}
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Mật khẩu</label>
                                    <input
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${passwordError ? 'border-red-500' : ''}`}
                                        id="password"
                                        type="password"
                                        placeholder="Vui lòng nhập mật khẩu"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
{passwordError && <p className="text-red-500">{passwordError}</p>}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                                    <input
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${confirmPasswordError ? 'border-red-500' : ''}`}
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Vui lòng nhập lại mật khẩu"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                    {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
                                </div>
                            </div>
                            <div className='col-span-2'>
                                <button
                                    onClick={signup_action}
                                    className="bg-gradient-to-l from-purple-600 to-cyan-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                    type="button"
                                    disabled={loading}
                                >
                                    {loading ?
                                        <div className='flex items-center justify-center'>
                                            <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Đang đăng ký
                                        </div> : 'Đăng ký'}
                                </button>
                            </div>
                        </form>
                        <p className="mt-4 text-right text-black-100">Bạn đã có tài khoản?
                            <Link to="/sign-in" className="text-blue-700"> Đăng nhập</Link>
                        </p>
                    </div>
</div>
            </div>
        </div>
    );
};

export default SignUp;