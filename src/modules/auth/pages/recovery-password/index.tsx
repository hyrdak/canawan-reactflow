

import React, { useEffect, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { toast,ToastContainer } from 'react-toastify';

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
            window.location.href="/login";
        } catch (error) {
            console.error('Lỗi khi gọi phương thức updateUser:');
        }
    };

    return (
        
        <section className="bg-gray-400 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Đổi mật khẩu
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={updateUser}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email của bạn</label>
                            <input 
                            type="email"
                            name="newemail"
                            id="newemail"
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNewEmail(e.target.value)}
                            value={newEmail}
                            required
                            readOnly
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
            </div>
        </div>
        <ToastContainer position="top-center"/>
      </section>
//     <div className="absolute inset-0 bg-gradient-to-tl from-purple-600 to-cyan-400 flex items-center justify-center">
//     <ToastContainer
//       position="top-center"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//     />
//     <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md dark:border dark:border-gray-700 p-6 space-y-4">
//       <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
//         Đổi Mật Khẩu
//       </h1>
//       <form className="space-y-4" action="#" onSubmit={updateUser}>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//           <input
//             className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             id="email"
//             type="email"
//             placeholder="Nhập địa chỉ email"
//             value={newEmail}
//             onChange={(e) => setNewEmail(e.target.value)}
//             required
//             readOnly
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Mật khẩu</label>
//           <input
//             className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             id="password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//                                     value={password}/>
//         </div>
//         <button 
//      type="submit" 
//     className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
//     >Đổi mật khẩu</button>
//       </form>
     
//     </div>
//     <ToastContainer position="top-center" />
//   </div>
    );
};

export default RecoveryPassword;
