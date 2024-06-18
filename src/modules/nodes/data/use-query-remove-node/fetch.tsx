import databaseService from 'databaseService'

import { FetcherResponse } from 'interfaces/fetcher';
import axiosInstance from 'utils/fetcher';

const deleteNode = async (id: any) => {
    const datadelete = databaseService.deleteNodeByID(id)

    return datadelete;
};

export default deleteNode;
