export const DASHBOARD_BOXES = [
    {
        "type": "status",
        "contains": "users",
        "title": "dashboardStatus.usersTitle",
        "colorScheme": "#697882",
        "iconName": "fa-users",
        "data": 587
    },
    {
        "type": "status",
        "contains": "profit",
        "title": "dashboardStatus.profitTitle",
        "colorScheme": "#3287a9",
        "iconName": "fa-cart-plus",
        "data": "€ 1.567,95"
    },
    {
        "type": "status",
        "contains": "sms",
        "title": "dashboardStatus.smsTitle",
        "colorScheme": "#e65141",
        "iconName": "fa-comments",
        "data": 231
    },
    {
        "type": "chart",
        "contains": "users",
        "title": "dashboardChart.usersTitle",
        "colorScheme": "#4189e6",
        "iconName": "fa-user",
        "data": {
            "labels": ["January", "February", "March", "April", "May", "June", "July"],
            "datasets": [
                {
                    "label": "Registered",
                    "data": [65, 59, 60, 10, 56, 55, 40],
                    "fill": false,
                    "borderColor": "#4bc0c0"
                }
            ]
        }
    },
    {
        "type": "chart",
        "contains": "profit",
        "title": "dashboardChart.profitTitle",
        "colorScheme": "#dca131",
        "iconName": "fa-cart-plus",
        "data": {
            "labels": ["January", "February", "March", "April", "May", "June", "July"],
            "datasets": [
                {
                    "label": "Income",
                    "data": [65, 59, 80, 81, 56, 55, 40],
                    "fill": false,
                    "borderColor": "#4bc0c0"
                }
            ]
        }
    },
    {
        "type": "chart",
        "contains": "sms",
        "title": "dashboardChart.smsTitle",
        "colorScheme": "#7165c5",
        "iconName": "fa-comments",
        "data": {
            "labels": ["January", "February", "March", "April", "May", "June", "July"],
            "datasets": [
                {
                    "label": "Outgoing",
                    "data": [94, 59, 43, 20, 54, 55, 40],
                    "fill": false,
                    "borderColor": "#4bc0c0"
                }
            ]
        }
    }
];
