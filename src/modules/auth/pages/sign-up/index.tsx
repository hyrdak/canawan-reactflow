import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SupabaseClient } from '@supabase/supabase-js';
import { toast, ToastContainer } from 'react-toastify';
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
    const displayNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (displayNameInputRef.current) {
            displayNameInputRef.current.focus();
        }
    }, []);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    };

    const handleDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setDisplayName(newName);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
    };

    const validateEmail = (email: string): boolean => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const showMessage = (msg: string) => {
        toast(msg);
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
                if (error.message.includes('email')) {
                    showMessage('Email đã được sử dụng. Vui lòng chọn email khác.');
                } else {
                    showMessage(`Lỗi đăng ký: ${error.message}`);
                }
                return;
            }
            showMessage('Đăng ký thành công! Một email xác nhận đã được gửi.');
            window.location.href = '/sign-in'; // Redirect to sign-in page after successful signup
        } catch (error: any) {
            setLoading(false);
            showMessage(`Lỗi đăng ký:tên ${error.message}`);
            console.error('Lỗi đăng ký:', error.message);
        }[]
    };

    const dangnhap = async () => {
        if (!email && !password) {
            toast.error('Vui lòng nhập email và mật khẩu');
            return;
        } else if (password.length < 6) {
            toast.error('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        } else if (!validateEmail(email)) {
            toast.error('Email không đúng định dạng');
            return;
        } else if (!validateEmail(email) && password.length < 6) {
            toast.error('Vui lòng nhập đúng định dạng email và mật khẩu');
            return;
        }
        try {
            // Thực hiện đăng nhập hoặc các hành động khác nếu cần
        } catch (error: any) {
            toast.error(`Lỗi: ${error.message}`);
        }
    };

    const validateFields = () => {
        if (!email || !displayName || !password || !confirmPassword) {
            toast.error('Vui lòng nhập đầy đủ thông tin.');
            return false;
        } else if (confirmPassword !== password) {
            toast.error('Mật khẩu không khớp.');
            return false;
        } else if (!validateEmail(email)) {
            toast.error('Email chưa hợp lệ.');
            return false;
        }
        return true;
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
                        <form className="grid grid-cols-2" action="#" onSubmit={(e) => { e.preventDefault(); signup_action(); }}>
                            <div className='col-span-1'>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên hiển thị</label>
                                    <input
                                        ref={displayNameInputRef}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="name"
                                        type="text"
                                        placeholder="Vui lòng nhập tên của bạn"
                                        value={displayName}
                                        onChange={handleDisplayNameChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <br /><label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="email"
                                        type="email"
                                        placeholder="Nhập địa chỉ email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Mật khẩu</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="password"
                                        type="password"
                                        placeholder="Vui lòng nhập mật khẩu"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <div>
                                    <br /><label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Vui lòng nhập lại mật khẩu"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                </div>
                            </div>
                        </form>
                        <button
                            onClick={signup_action}
                            className="bg-gradient-to-l from-purple-600 to-cyan-400  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="button"
                            disabled={loading}
                        >
                            {loading ?
                                <div className='flex'>
                                    <svg className="animate-spin ml-64 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg> &ensp; Đang đăng ký
                                </div> : 'Đăng ký'}
                        </button>
                        <p className="mt-4 text-right text-black-100"> Bạn đã có tài khoản?
                            <Link to="/sign-in" className="text-blue-700"> Đăng nhập</Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* {message && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-white bg-opacity-75 py-2 px-4 rounded shadow">
                    {message}
                </div>
            )} */}
            <ToastContainer position="top-center" />
        </div>
        );
    };
    export default SignUp;
        /* <section className="bg-gray-400 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng ký
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={(e)=>{ e.preventDefault(); signup_action(); }}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên tài khoản</label>
                                    <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="test" 
                                    required
                                   
                                    value={displayName}
                                    onChange={handleDisplayNameChange}/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gmail</label>
                                    <input 
                                    type="text" 
                                    name="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="test@gmail.com" 
                                    required
                                    value={email}
                                    onChange={handleEmailChange}/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                    <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}/>
                                </div>
                                <div>
                                    <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
                                    <input 
                                    type="password" 
                                    name="confirmpassword" 
                                    id="confirmpassword" 
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}/>
                                </div>
                                <button 
                                type="submit" 
                                className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                               >Đăng ký</button>
                                <p className="text-sm font-light text-gray-900">
                                    Đã có tài khoản? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to="/login">Đăng nhập</Link></a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-center" />
              </section> */
//     );
// };
// export default SignUp;