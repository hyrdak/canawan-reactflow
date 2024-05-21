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
import WorkflowDetail from 'modules/work-flows/pages/work-flow-detail';
import WorkflowListingRoot from 'modules/work-flows/pages/work-flow-listing';
import AppLayout from 'components/layouts/app-layout';
import PrivateLayout from 'components/layouts/private-layout';
import PrivateRoute from './private-route';
import { useEffect, useState } from "react";

const supabaseUrl = 'https://ismbrwqkcootieaguzwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbWJyd3FrY29vdGllYWd1endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NTQyNDcsImV4cCI6MjAyODEzMDI0N30.fEo-ddluC6l2HNPqIjcHBFHTYdIWoE8vjfjIX9KPbPI';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const AppRoutes = () => {
    const [user_log, setUser_log] = useState<any>('');

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

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<PrivateLayout><Outlet /></PrivateLayout>}>
                <Route path={'*'} element={<Navigate to={ROUTE_PATHS.WORK_FLOWS} />} />
                <Route index path={ROUTE_PATHS.WORK_FLOWS} element={<WorkflowListingRoot />} />
                <Route path={ROUTE_PATHS.WORK_FLOWS_DETAIL} element={<WorkflowDetail />} />
                <Route path={ROUTE_PATHS.NODES} element={<NodeListingRoot />} />
                <Route path={ROUTE_PATHS.KINDS} element={<KindListingRoot />} />
                <Route path={ROUTE_PATHS.TYPES} element={<NodeListingRoot />} />
                <Route path={ROUTE_PATHS.ELEMENTS} element={<ElementListingRoot />} />
         
                <Route path={ROUTE_PATHS.SIGN_IN} element={<SignIn supabase={supabase} />} />
                <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUp supabase={supabase} />} />
                <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPassword supabase={supabase} />} />
                <Route path={ROUTE_PATHS.RECOVERY_PASSWORD} element={<RecoveryPassword supabase={supabase} user={user_log} />} />
                <Route path="sign-in" element={<Navigate to={ROUTE_PATHS.SIGN_IN} />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default AppRoutes;
