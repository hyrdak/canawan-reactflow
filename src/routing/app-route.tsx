import { useEffect, useState } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { ROUTE_PATHS } from 'constants-es';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { useAuth } from 'data/store/auth/use-auth';
import ForgotPassword from 'modules/auth/pages/forgot-password';
import RecoveryPassword from 'modules/auth/pages/recovery-password';
import SignIn from 'modules/auth/pages/sign-in';
import SignUp from 'modules/auth/pages/sign-up';
import ElementListingRoot from 'modules/elements/pages/element-listing';
import KindListingRoot from 'modules/kinds/pages/kind-listing';
import NodeListingRoot from 'modules/nodes/pages/node-listing';
import TypeListingRoot from "modules/types/pages/type-listing";
import WorkflowDetail from 'modules/work-flows/pages/work-flow-detail';
import WorkflowListingRoot from 'modules/work-flows/pages/work-flow-listing';
import AppLayout from 'components/layouts/app-layout';
import PrivateLayout from 'components/layouts/private-layout';

import PrivateRoute from './private-route';

const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWJyd3FrY29vdGllYWd1endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQyNDcsImV4cCI6MjAyODEzMDI0N30.fEo-ddluC6l2HNPqIjcHBFHTYdIWoE8vjfjIX9KPbPI';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
const AppRoutes = () => {
    const [user_log, setUser_log] = useState<any>('');
    const AccessToken = !!localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            if (user_log === '') {
                try {
                    const { data: { user }, error } = await supabase.auth.getUser();
                    if (error) {
                        console.error('Lỗi:', error.message);
                    } else {
                        if (user !== null) {
                            setUser_log(user);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching data:', (error as Error).message);
                }
            }
        };
        fetchData();
    }, [user_log]);      
    
    const { isAuthenticated } = useAuth();

    const router = createBrowserRouter(
        createRoutesFromElements(
            AccessToken ? (
            <Route 
            element={<PrivateLayout supabase={supabase} users={user_log}>
                <Outlet />
                </PrivateLayout>
            }
            >
                <Route path={'*'} element={<Navigate to={AccessToken ? ROUTE_PATHS.WORK_FLOWS : ROUTE_PATHS.SIGN_IN} />} />
                <Route index path={ROUTE_PATHS.WORK_FLOWS} element={<WorkflowListingRoot />} />
                <Route path={ROUTE_PATHS.WORK_FLOWS_DETAIL} element={<WorkflowDetail />} />
                <Route path={ROUTE_PATHS.NODES} element={<NodeListingRoot />} />
                <Route path={ROUTE_PATHS.KINDS} element={<KindListingRoot />} />
                <Route path={ROUTE_PATHS.TYPES} element={<TypeListingRoot />} />
                <Route path={ROUTE_PATHS.ELEMENTS} element={<ElementListingRoot />} />
                </Route>) : (
                <Route>
                    <Route path="*" element={<Navigate to={AccessToken ? ROUTE_PATHS.WORK_FLOWS : ROUTE_PATHS.SIGN_IN} />} />
                <Route path={ROUTE_PATHS.SIGN_IN} element={<SignIn supabase={supabase} />} />
                <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUp supabase={supabase} />} />
                <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPassword supabase={supabase} />} />
                <Route path={ROUTE_PATHS.RECOVERY_PASSWORD} element={<RecoveryPassword supabase={supabase} user={user_log} />} />
                <Route path="sign-in" element={<Navigate to={ROUTE_PATHS.SIGN_IN} />} />



            </Route>
             )          
        )
    ); 
    
return <RouterProvider router={router} />;
};

export default AppRoutes;


// import {
//     createBrowserRouter,
//     createRoutesFromElements,
//     Navigate,
//     Outlet,
//     Route,
//     RouterProvider,
// } from 'react-router-dom';
// import { ROUTE_PATHS } from 'constants-es';
// import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { useEffect, useState } from "react";

// import { useAuth } from 'data/store/auth/use-auth';
// import ForgotPassword from 'modules/auth/pages/forgot-password';
// import RecoveryPassword from 'modules/auth/pages/recovery-password';
// import SignIn from 'modules/auth/pages/sign-in';
// import SignUp from 'modules/auth/pages/sign-up';
// import ElementListingRoot from 'modules/elements/pages/element-listing';
// import KindListingRoot from 'modules/kinds/pages/kind-listing';
// import NodeListingRoot from 'modules/nodes/pages/node-listing';
// import WorkflowDetail from 'modules/work-flows/pages/work-flow-detail';
// import WorkflowListingRoot from 'modules/work-flows/pages/work-flow-listing';
// import AppLayout from 'components/layouts/app-layout';
// import PrivateLayout from 'components/layouts/private-layout';
// import PrivateRoute from './private-route';
// import AuthContext from './auth-context'; // Import AuthContext

// const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWJyd3FrY29vdGllYWd1endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQyNDcsImV4cCI6MjAyODEzMDI0N30.fEo-ddluC6l2HNPqIjcHBFHTYdIWoE8vjfjIX9KPbPI';
// const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// const AppRoutes = () => {
//     const [token, setToken] = useState<string | null>(null); // State để lưu token
//     const { user } = useAuth(); // Sử dụng hook useAuth để lấy thông tin người dùng

//     useEffect(() => {
//         // Kiểm tra xem token đã được lưu trong localStorage hay không
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//             setToken(storedToken);
//         }
//     }, []);

//     const router = createBrowserRouter(
//         createRoutesFromElements(
//             <Route element={<AppLayout />}>
//                 <Route path="*">
//                     {/* Sử dụng AuthContext.Provider để cung cấp token và user cho các components */}
//                     <AuthContext.Provider value={{ token, user }}> 
//                         <Outlet />
//                     </AuthContext.Provider>
//                 </Route>

//                 {/* Các route */}
//                 <Route index path={ROUTE_PATHS.WORK_FLOWS} element={<WorkflowListingRoot />} />
//                 <Route path={ROUTE_PATHS.WORK_FLOWS_DETAIL} element={<WorkflowDetail />} />
//                 <Route path={ROUTE_PATHS.NODES} element={<NodeListingRoot />} />
//                 <Route path={ROUTE_PATHS.KINDS} element={<KindListingRoot />} />
//                 <Route path={ROUTE_PATHS.TYPES} element={<NodeListingRoot />} />
//                 <Route path={ROUTE_PATHS.ELEMENTS} element={<ElementListingRoot />} />

//                 {/* Các route cho đăng nhập và quên mật khẩu */}
//                 <Route path={ROUTE_PATHS.SIGN_IN} element={<SignIn supabase={supabase} />} />
//                 <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUp supabase={supabase} />} />
//                 <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPassword supabase={supabase} />} />
//                 <Route path={ROUTE_PATHS.RECOVERY_PASSWORD} element={<RecoveryPassword supabase={supabase} />} />
//             </Route>
//         )
//     );

//     return <RouterProvider router={router} />;
// };

// export default AppRoutes;
