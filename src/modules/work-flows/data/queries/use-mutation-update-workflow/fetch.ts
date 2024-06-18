
import { FetcherResponse } from 'interfaces/fetcher'
import axiosInstance from 'utils/fetcher'

import { UpdateWorkflowParams, UpdateWorkflowResponseData } from './interfaces'

const updateWorkflow = async (
  params: UpdateWorkflowParams,
): Promise<FetcherResponse<UpdateWorkflowResponseData>> => {

  const { data: responseData } = await axiosInstance.patch<FetcherResponse<UpdateWorkflowResponseData>>('/rest/v1/Workflows?id=eq.' + params.id, params)


  return responseData
}

export default updateWorkflow
