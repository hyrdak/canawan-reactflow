

import React, { useEffect, useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';

import { SupabaseClient } from '@supabase/supabase-js';

interface Props {
    supabase: SupabaseClient;
    user:any,
}

const RecoveryPassword: React.FC<Props> = ({ supabase,user }) => {
    const [newEmail, setNewEmail] = useState<string>("")
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (user !== '') {
          const fetchData = async () => {
           setNewEmail(user.user_metadata.email);
          };
          fetchData();
        }
      }, [user]);
    const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.updateUser({
                email:newEmail,
                password,
                data: { hello: 'world' },
            });
            if (error) {
                toast.error('Lỗi khi cập nhật thông tin người dùng:');
                
return;
            }
            toast.success('Thông tin người dùng đã được cập nhật thành công!');
            window.location.href="/sign-in";
        } catch (error) {
            console.error('Lỗi khi gọi phương thức updateUser:');
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
            Đặt lại mật khẩu
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={updateUser}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email của bạn</label>
                            <input 
                            type="email" 
                            name="newemail" 
                            id="newemail" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                            value={newEmail}
                            disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới</label>
                            <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                        </div>
                        <button 
                        type="submit" 
                        className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >Đổi mật khẩu</button>
                    </form>
          
        </div>
        <ToastContainer position="top-center" />
      </div>
    );
};

export default RecoveryPassword;
