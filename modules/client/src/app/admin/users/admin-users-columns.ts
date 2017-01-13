import { ColDef } from "ag-grid";
import { ColFormDefs } from "../../crud/model/column/column-form";

export namespace AdminUsersColDefs {

    export const colGridDefs: ColDef[] = [
        {
            field: 'id',
            headerName: 'user.id',
            editable: true
        },
        {
            field: 'email',
            headerName: 'user.email',
            editable: true
        },
        {
            field: 'telephoneNumber',
            headerName: 'user.telephoneNumber',
            editable: true
        },
        {
            field: 'permissions',
            headerName: 'user.permissions',
            editable: true
        }
    ];

    export const colFormDefs: ColFormDefs[] = [
        {
            field: 'email',
            headerName: 'user.email',
            type: 'Input'
        },
        {
            field: 'telephoneNumber',
            headerName: 'user.telephoneNumber',
            type: 'Input'
        },
        {
            field: 'permissions',
            headerName: 'user.permissions',
            type: 'Selection',
            options: [
                { label: '', value: '' },
                { label: 'ADMIN', value: 'ADMIN' },
                { label: 'USER', value: 'USER' },
                { label: 'GUEST', value: 'GUEST' }
            ]
        },
        {
            field: 'password',
            headerName: 'user.password',
            type: 'Input'
        }
    ];

}
