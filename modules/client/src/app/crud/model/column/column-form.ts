import { SelectItem } from "primeng/components/common/api";

export interface ColFormDefs {
    field: string;
    headerName: string;
    type: string;
    options?: SelectItem[]
}
