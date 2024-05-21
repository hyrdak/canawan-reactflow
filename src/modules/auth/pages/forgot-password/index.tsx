
import React, { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  supabase: SupabaseClient;
}

const ForgotPassword: React.FC<Props> = ({ supabase }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const forget_password = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        toast.error('Lỗi khi gửi mail');
      } else {
        toast.success('Gửi thành công!');
      }
    } catch (error) {
      console.error('Error:', (error as Error).message);
      toast.error('Lỗi khi gửi mail');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    forget_password();
  };

  return (
    // <div>
    //   <ToastContainer />
    //   <div className="absolute inset-0 flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 to-blue-300">
    //     <div className="bg-white shadow-lg rounded-lg px-40 pt-6 pb-8">
    //       <h2 className="text-2xl mb-4 text-center">Quên mật khẩu</h2>
    //       <form onSubmit={handleSubmit}>
    //         <div className="mb-4">
    //           <label htmlFor="email">Email:</label>
    //           <input
    //             type="email"
    //             id="email"
    //             value={email}
    //             onChange={handleEmailChange}
    //             className="w-full p-2 border border-gray-300 rounded"
    //             style={{ backgroundColor: 'white' }}
    //             required
    //           />
    //         </div>
    //         <button
    //           type="submit"
    //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-16"
    //         >
    //           Gửi yêu cầu
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    //   <ToastContainer position="top-center"/>
    // </div>
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
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md dark:border dark:border-gray-700 p-6 space-y-4">
        <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          Quên mật khẩu
        </h1>
        <form className="space-y-4" action="#" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              className="bg-gray-700 border border-gray-600 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="email"
              type="email"
              placeholder="Nhập địa chỉ email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          
          <button
             type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-16"
             >
               Gửi yêu cầu
             </button>
        </form>
        
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ForgotPassword;
