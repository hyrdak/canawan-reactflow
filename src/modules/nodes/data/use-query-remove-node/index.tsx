import { useMutation } from '@tanstack/react-query'

import deleteNode from './fetch'

export function useMutationdeleteNode() {
    return useMutation({
        mutationFn: deleteNode,
    })
}
export { }

