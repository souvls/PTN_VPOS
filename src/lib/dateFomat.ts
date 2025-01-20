export function displayLaoDate(timeStamp: string) {
    const daysLao = [
        "ວັນອາທິດ",
        "ວັນຈັນ",
        "ວັນອັງຄານ",
        "ວັນພຸດ",
        "ວັນພະຫັດ",
        "ວັນ​ສຸກ",
        "ວັນເສົາ"
    ];
    const currentDate = new Date(timeStamp);
    const dayIndex = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const todayLao = daysLao[dayIndex];
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adjust month index for Lao calendar (0-based vs. 1-based)
    const year = currentDate.getFullYear();
    const laoDate = `${todayLao},${day}/${month}/${year} ${currentDate.toLocaleTimeString()}`;
    return laoDate;
}
export function displayLaoDateNoTime(timeStamp: string) {
    const daysLao = [
        "ວັນອາທິດ",
        "ວັນຈັນ",
        "ວັນອັງຄານ",
        "ວັນພຸດ",
        "ວັນພະຫັດ",
        "ວັນ​ສຸກ",
        "ວັນເສົາ"
    ];
    const currentDate = new Date(timeStamp);
    const dayIndex = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const todayLao = daysLao[dayIndex];
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adjust month index for Lao calendar (0-based vs. 1-based)
    const year = currentDate.getFullYear();
    const laoDate = `${todayLao},${day}/${month}/${year}`;
    return laoDate;
}
