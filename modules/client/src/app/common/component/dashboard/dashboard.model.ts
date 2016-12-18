export class AdminDashboardModel {
    constructor(public type: string,
                public contains: string,
                public title: string,
                public colorScheme: string,
                public iconName: string,
                public data: any) {
    }
}