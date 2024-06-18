import React from 'react';
import { QUERY_KEYS, ROUTE_PATHS } from 'constants-es';

import { DeleteOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import confirm from 'antd/es/modal/confirm';

import { useMutationDeleteWorkflow } from 'modules/work-flows/data/queries/use-query-remove-workflow';

type Props = { data: any };

const ButtonDelete = ({ data }: Props) => {
    const mutationDelete = useMutationDeleteWorkflow();
    const queryClient = useQueryClient();

    const handleRemove = () => {
        Modal.confirm({
            title: '',
            type: 'warning',
            content: 'Are you sure to delete this item?',
            okText: 'OK',
            cancelText: 'Cancel',
            onOk() {
                return mutationDelete.mutateAsync(data.id, {
                    onSuccess: (response: any) => {
                        if (response.success) {
                            queryClient.invalidateQueries({
                                queryKey: [QUERY_KEYS.WORKFLOWS]
                            });
                        }
                    }
                });
            }
        });
    };

    return (
        <>
            {' '}
            <Button
                loading={mutationDelete.isPending}
                icon={<DeleteOutlined />}
                type="primary"
                danger
                onClick={handleRemove}
            ></Button>
        </>
    );
};

export default ButtonDelete;
