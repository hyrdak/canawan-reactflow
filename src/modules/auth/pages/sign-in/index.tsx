import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

import { SupabaseClient } from '@supabase/supabase-js';

interface Props {
  supabase: SupabaseClient;
}

const SignIn: React.FC<Props> = ({ supabase }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [username, setUsername] = useState('');


  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const signin_action = async () => {
    if (!email && !password) {
      toast.error('Vui lòng nhập email và mật khẩu');
      
return;
    }
    if (!email) {
      toast.error('Vui lòng nhập email');
      
return;
    }
    if (!password) {
      toast.error('Vui lòng nhập mật khẩu');
      
return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email không đúng định dạng');
      
return;
    }
    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      
return;
    }
    if (!emailRegex.test(email) && password.length < 6) {
      toast.error('Vui lòng nhập đúng định dạng email và mật khẩu');
      
return;
    }
try {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Error:', error.message);
    toast.error('Tên đăng nhập hoặc mật khẩu không đúng.');
  } else {
    toast.success('Đăng nhập thành công!');
    window.location.href = '/nodes';
  }
} catch (error) {
  console.error('Error:', (error as Error).message);
  toast.error('Đã xảy ra lỗi trong quá trình đăng nhập.');
} finally {
  setLoading(false); // Kết thúc quá trình đăng nhập, đặt trạng thái loading thành false
}
  };
  
return (
    <div className="absolute inset-0 bg-gradient-to-tl from-purple-600 to-cyan-400 flex items-center justify-center">
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:border dark:border-gray-700 p-6 space-y-4">
        <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
Đăng nhập
        </h1>
        <form className="space-y-4" action="#" onSubmit={(e) => { e.preventDefault(); signin_action(); }}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              className="bg-white border border-gray-600 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="email"
              type="email"
              placeholder="Nhập địa chỉ email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Mật khẩu</label>
            <input
              className="bg-white border border-gray-600 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            onClick={signin_action}
            className="bg-gradient-to-l from-purple-600 to-cyan-400  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            disabled={loading}
          >
            {loading ?
              <div className='flex'>
                <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> &ensp; Đang đăng nhập
              </div> : 'Đăng nhập'}
          </button>
        </form>
        <p className="mt-4 text-center text-black-100"> Quên mật khấu
          <Link to="/forgot-password" className="text-blue-700"> Bấm vào đây</Link>
        </p>
        <p className="mt-4 text-center text-black-100"> Chưa có tài khoản?
          <Link to="/sign-up" className="text-blue-700"> Đăng ký ngay</Link>
        </p>
      </div>
      
     
      
      <ToastContainer position="top-center" />
    </div>
    
  );
};

export default SignIn;