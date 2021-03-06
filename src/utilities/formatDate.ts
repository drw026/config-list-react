const formatDate = (date: string): string => {
    const currentDate = new Date(date);
    const {
        year, month, day, hour, minute,
    } = {
        day: (`0${currentDate.getDate()}`).slice(-2),
        hour: (`0${currentDate.getHours()}`).slice(-2),
        minute: (`0${currentDate.getMinutes()}`).slice(-2),
        month: (`0${currentDate.getMonth() + 1}`).slice(-2),
        year: currentDate.getFullYear(),

    };
    return `${day}-${month}-${year} - ${hour}:${minute}`
}

export default formatDate;
