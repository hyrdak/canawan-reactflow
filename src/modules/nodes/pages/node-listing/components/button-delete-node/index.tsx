import React from 'react';
import { QUERY_KEYS } from 'constants-es';

import { DeleteOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Modal } from 'antd';

import { useMutationdeleteNode } from 'modules/nodes/data/use-query-remove-node'

type Props = { data: any };

const ButtonDelete = ({ data }: Props) => {
    const mutationDeleteN = useMutationdeleteNode();
    const queryClient = useQueryClient();

    const handleRemove = () => {
        Modal.confirm({
            title: '',
            type: 'warning',
            content: 'Are you sure to delete this item?',
            okText: 'OK',
            cancelText: 'Cancel',
            onCancel(...args) {
                console.log('delete');

            },
            onOk() {
                return mutationDeleteN.mutateAsync(data.id, {
                    onSuccess: (response: any) => {
                        queryClient.invalidateQueries({
                            queryKey: [QUERY_KEYS.NODES]
                        });

                    }
                });
            }
        });
    };

    return (
        <>
            {' '}
            <Button
                loading={mutationDeleteN.isPending}
                icon={<DeleteOutlined />}
                type="primary"
                danger
                onClick={handleRemove}
            ></Button>
        </>
    );
};

export default ButtonDelete;
