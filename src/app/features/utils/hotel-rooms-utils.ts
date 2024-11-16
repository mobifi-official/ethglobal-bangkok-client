function groupRatesByRoomType(rates: any[]) {
    return rates.reduce((acc, rate) => {
        const roomType = rate.room_data_trans.main_room_type;

        if (!acc[roomType]) {
            acc[roomType] = {
                roomType,
                rates: [],
            };
        }

        acc[roomType].rates.push(rate);

        return acc;
    }, {});
}

export {
    groupRatesByRoomType,
}