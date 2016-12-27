export interface Button {
    // The button name in a tooltip
    nameButton: string;
    // Icon name
    iconName: string;
    // A function to execute each time the event is triggered
    clickEvent: (event) => void;
}
