export class Pagination {
    constructor(public offset: number,
                public limit: number,
                public rowsPerPageOptions: number[]) {
    }
}