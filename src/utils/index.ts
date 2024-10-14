export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    } else {
        return num.toString();
    }
}
export function areObjectsEqual(obj1: { [key: string]: any }, obj2: { [key: string]: any }): boolean {
    for (const key in obj1) {
        if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
            return false;
        }
    }

    for (const key in obj2) {
        if (obj1.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}
export function convertDate(dateString: string): string {
    const dateParts = dateString.split(' ');
    const date = dateParts[0].split('-');
    const year = parseInt(date[0], 10);
    const month = parseInt(date[1], 10);
    const day = parseInt(date[2], 10);
    const timeParts = dateParts[1].split(':');
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();
    const monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (year === todayYear && month === todayMonth && day === todayDay) {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    } else {
        return `${monthNames[month - 1]} ${day}`;
    }
}