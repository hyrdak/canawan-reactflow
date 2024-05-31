// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { SupabaseClient } from '@supabase/supabase-js';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;

// interface Props {
//     supabase: SupabaseClient;
// }

// const SignUp: React.FC<Props> = ({ supabase }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [displayName, setDisplayName] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const displayNameInputRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//         if (displayNameInputRef.current) {
//             displayNameInputRef.current.focus();
//         }
//     }, []);

//     const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newEmail = event.target.value;
//         setEmail(newEmail);
//     };

//     const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newPassword = event.target.value;
//         setPassword(newPassword);
//     };

//     const handleDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newName = event.target.value;
//         setDisplayName(newName);
//     };

//     const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newConfirmPassword = event.target.value;
//         setConfirmPassword(newConfirmPassword);
//     };

//     const validateEmail = (email: string): boolean => {
//         const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return pattern.test(email);
//     };

//     const showMessage = (msg: string) => {
//         toast(msg);
//     };

//     const signup_action = async () => {
//         if (!validateFields()) {
//             return;
//         }
//         setLoading(true);
//         try {
//             const { error } = await supabase.auth.signUp({
//                 email: email,
//                 password: password,
//             });
//             setLoading(false);
//             if (error) {
//                 if (error.message.includes('email')) {
//                     showMessage('Email đã được sử dụng. Vui lòng chọn email khác.');
//                 } else {
//                     showMessage(`Lỗi đăng ký: ${error.message}`);
//                 }
//                 return;
//             }
//             showMessage('Đăng ký thành công! Một email xác nhận đã được gửi.');
//             window.location.href = '/sign-in'; // Redirect to sign-in page after successful signup
//         } catch (error: any) {
//             setLoading(false);
//             showMessage(`Lỗi đăng ký:tên ${error.message}`);
//             console.error('Lỗi đăng ký:', error.message);
//         }[]
//     };

//     const dangnhap = async () => {
//         if (!email && !password) {
//             toast.error('Vui lòng nhập email và mật khẩu');
//             return;
//         } else if (password.length < 6) {
//             toast.error('Mật khẩu phải có ít nhất 6 ký tự');
//             return;
//         } else if (!validateEmail(email)) {
//             toast.error('Email không đúng định dạng');
//             return;
//         } else if (!validateEmail(email) && password.length < 6) {
//             toast.error('Vui lòng nhập đúng định dạng email và mật khẩu');
//             return;
//         }
//         try {
//             // Thực hiện đăng nhập hoặc các hành động khác nếu cần
//         } catch (error: any) {
//             toast.error(`Lỗi: ${error.message}`);
//         }
//     };

//     const validateFields = () => {
//         if (!email || !displayName || !password || !confirmPassword) {
//             toast.error('Vui lòng nhập đầy đủ thông tin.');
//             return false;
//         } else if (confirmPassword !== password) {
//             toast.error('Mật khẩu không khớp.');
//             return false;
//         } else if (!validateEmail(email)) {
//             toast.error('Email chưa hợp lệ.');
//             return false;
//         }
//         return true;
//     };

//     return (
//         <div className="absolute inset-0 bg-gradient-to-tl from-purple-600 to-cyan-400">
//             <ToastContainer
//                 position="top-center"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//             />
//             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                 <div className="w-full bg-white rounded-lg shadow dark:border md:mt-1 sm:max-w-3xl xl:p-1 dark:bg-gray-800 dark:border-gray-700">
//                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8 grid">
//                         <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
//                             Đăng ký tài khoản
//                         </h1>
//                         <form className="grid grid-cols-2" action="#" onSubmit={(e) => { e.preventDefault(); signup_action(); }}>
//                             <div className='col-span-1'>
//                                 <div>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên hiển thị</label>
//                                     <input
//                                         ref={displayNameInputRef}
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                         id="name"
//                                         type="text"
//                                         placeholder="Vui lòng nhập tên của bạn"
//                                         value={displayName}
//                                         onChange={handleDisplayNameChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <br /><label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                                     <input
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                         id="email"
//                                         type="email"
//                                         placeholder="Nhập địa chỉ email"
//                                         value={email}
//                                         onChange={handleEmailChange}
//                                     />
//                                 </div>
//                             </div>
//                             <div className='col-span-1'>
//                                 <div>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Mật khẩu</label>
//                                     <input
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                         id="password"
//                                         type="password"
//                                         placeholder="Vui lòng nhập mật khẩu"
//                                         value={password}
//                                         onChange={handlePasswordChange}
//                                     />
//                                 </div>
//                                 <div>
//                                     <br /><label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="confirmPassword">Nhập lại mật khẩu</label>
//                                     <input
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                         id="confirmPassword"
//                                         type="password"
//                                         placeholder="Vui lòng nhập lại mật khẩu"
//                                         value={confirmPassword}
//                                         onChange={handleConfirmPasswordChange}
//                                     />
//                                 </div>
//                             </div>
//                         </form>
//                         <button
//                             onClick={signup_action}
//                             className="bg-gradient-to-l from-purple-600 to-cyan-400  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                             type="button"
//                             disabled={loading}
//                         >
//                             {loading ?
//                                 <div className='flex'>
//                                     <svg className="animate-spin ml-64 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg> &ensp; Đang đăng ký
//                                 </div> : 'Đăng ký'}
//                         </button>
//                         <p className="mt-4 text-right text-black-100"> Bạn đã có tài khoản?
//                             <Link to="/sign-in" className="text-blue-700"> Đăng nhập</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             {/* {message && (
//                 <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-white bg-opacity-75 py-2 px-4 rounded shadow">
//                     {message}
//                 </div>
//             )} */}
//             <ToastContainer position="top-center" />
//         </div>
//         );
//     };
//     export default SignUp;



// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { SupabaseClient } from '@supabase/supabase-js';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;

// interface Props {
//     supabase: SupabaseClient;
// }

// const SignUp: React.FC<Props> = ({ supabase }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [displayName, setDisplayName] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const [emailError, setEmailError] = useState<boolean>(false);
//     const [passwordError, setPasswordError] = useState<boolean>(false);
//     const [displayNameError, setDisplayNameError] = useState<boolean>(false);
//     const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);

//     const displayNameInputRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//         if (displayNameInputRef.current) {
//             displayNameInputRef.current.focus();
//         }
//     }, []);

//     const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newEmail = event.target.value;
//         setEmail(newEmail);
//         setEmailError(!newEmail); // Đặt trạng thái lỗi cho email thành true nếu không có dữ liệu
//     };

//     const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newPassword = event.target.value;
//         setPassword(newPassword);
//         setPasswordError(!newPassword); // Đặt trạng thái lỗi cho password thành true nếu không có dữ liệu
//     };

//     const handleDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newName = event.target.value;
//         setDisplayName(newName);
//         setDisplayNameError(!newName); // Đặt trạng thái lỗi cho display name thành true nếu không có dữ liệu
//     };

//     const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newConfirmPassword = event.target.value;
//         setConfirmPassword(newConfirmPassword);
//         setConfirmPasswordError(!newConfirmPassword); // Đặt trạng thái lỗi cho confirm password thành true nếu không có dữ liệu
//     };

//     const validateEmail = (email: string): boolean => {
//         const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return pattern.test(email);
//     };

//     const showMessage = (msg: string) => {
//         toast(msg);
//     };

//     const signup_action = async () => {
//         if (!validateFields()) {
//             return;
//         }
//         setLoading(true);
//         try {
//             const { error } = await supabase.auth.signUp({
//                 email: email,
//                 password: password,
//             });
//             setLoading(false);
//             if (error) {
//                 if (error.message.includes('email')) {
//                     showMessage('Email đã được sử dụng. Vui lòng chọn email khác.');
//                 } else {
//                     showMessage(`Lỗi đăng ký: ${error.message}`);
//                 }
//                 return;
//             }
//             showMessage('Đăng ký thành công! Một email xác nhận đã được gửi.');
//             window.location.href = '/sign-in';
//         } catch (error: any) {
//             setLoading(false);
//             showMessage(`Lỗi đăng ký: ${error.message}`);
//             console.error('Lỗi đăng ký:', error.message);
//         }
//     };

//     const validateFields = () => {
//         let isValid = true;

//         setEmailError(!email); // Kiểm tra và đặt trạng thái lỗi cho email
//         setPasswordError(!password); // Kiểm tra và đặt trạng thái lỗi cho password
//         setDisplayNameError(!displayName); // Kiểm tra và đặt trạng thái lỗi cho display name
//         setConfirmPasswordError(!confirmPassword); // Kiểm tra và đặt trạng thái lỗi cho confirm password

//         if (confirmPassword !== password) {
//             setConfirmPasswordError(true);
//             isValid = false;
//         }

//         if (!validateEmail(email)) {
//             setEmailError(true);
//             isValid = false;
//         }

//         return isValid;
//     };

//     return (
//         <div className="absolute inset-0 bg-gradient-to-tl from-purple-600 to-cyan-400">
//             <ToastContainer
//                 position="top-center"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//             />
//             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                 <div className="w-full bg-white rounded-lg shadow dark:border md:mt-1 sm:max-w-3xl xl:p-1 dark:bg-gray-800 dark:border-gray-700">
//                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8 grid">
//                         <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
//                             Đăng ký tài khoản
//                         </h1>
//                         <form className="grid grid-cols-2">
//                             <div className='col-span-1'>
//                                 <div>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên hiển thị</label>
//                                     <input
//                                         ref={displayNameInputRef}
//                                         className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${displayNameError ? 'border-red-500' : ''}`}
//                                         id="name"
//                                         type="text"
//                                         placeholder="Vui lòng nhập tên của bạn"
//                                         value={displayName}
//                                         onChange={handleDisplayNameChange}
//                                     />
//                                     {displayNameError && <p className="text-red-500">Vui lòng nhập tên của bạn</p>}
//                                 </div>
//                                 <div>
//                                     <br /><label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                                     <input

//                                         className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${emailError ? 'border-red-500' : ''}`}
//                                         id="email"
//                                         type="email"
//                                         placeholder="Nhập địa chỉ email"
//                                         value={email}
//                                         onChange={handleEmailChange}
//                                     />
//                                     {emailError && <p className="text-red-500">Vui lòng nhập địa chỉ email hợp lệ</p>}
//                                 </div>
//                             </div>
//                             <div className='col-span-1'>
//                                 <div>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Mật khẩu</label>
//                                     <input
//                                         className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${passwordError ? 'border-red-500' : ''}`}
//                                         id="password"
//                                         type="password"
//                                         placeholder="Vui lòng nhập mật khẩu"
//                                         value={password}
//                                         onChange={handlePasswordChange}
// />
//                                     {passwordError && <p className="text-red-500">Vui lòng nhập mật khẩu</p>}
//                                 </div>
//                                 <div>
//                                     <br /><label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="confirmPassword">Nhập lại mật khẩu</label>
//                                     <input
//                                         className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${confirmPasswordError ? 'border-red-500' : ''}`}
//                                         id="confirmPassword"
//                                         type="password"
//                                         placeholder="Vui lòng nhập lại mật khẩu"
//                                         value={confirmPassword}
//                                         onChange={handleConfirmPasswordChange}
//                                     />
//                                     {confirmPasswordError && <p className="text-red-500">Mật khẩu không khớp</p>}
//                                 </div>
//                             </div>
//                         </form>
//                         <button
//                             onClick={signup_action}
//                             className="bg-gradient-to-l from-purple-600 to-cyan-400  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                             type="button"
//                             disabled={loading}
//                         >
//                             {loading ?
//                                 <div className='flex'>
//                                     <svg className="animate-spin ml-64 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg> &ensp; Đang đăng ký
//                                 </div> : 'Đăng ký'}
//                         </button>
//                         <p className="mt-4 text-right text-black-100"> Bạn đã có tài khoản?
//                             <Link to="/sign-in" className="text-blue-700"> Đăng nhập</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             {/* {message && (
//                 <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-white bg-opacity-75 py-2 px-4 rounded shadow">
// {message}
//                 </div>
//             )} */}
//             <ToastContainer position="top-center" />
//         </div>
//     );
// };

// export default SignUp;


import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

import { SupabaseClient } from '@supabase/supabase-js';

import 'react-toastify/dist/ReactToastify.css';

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
        try {
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            setLoading(false);
            if (error) {
                if (error.message.includes('already registered')) {
                    showMessage('Email đã được sử dụng. Vui lòng chọn email khác.');
                } else {
                    showMessage(`Lỗi đăng ký: ${error.message}`);
                }
                
return;
            }
            showMessage('Đăng ký thành công');
            
            window.location.href = '/sign-in';
        } catch (error: any) {
            setLoading(false);
            showMessage(`Lỗi đăng ký: ${error.message}`);
            console.error('Lỗi đăng ký:', error.message);
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




