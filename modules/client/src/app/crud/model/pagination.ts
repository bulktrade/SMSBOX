export class Pagination {
    constructor(public skip: number,
                public limit: number,
                public total: number,
                public data: any) {
    }
}
