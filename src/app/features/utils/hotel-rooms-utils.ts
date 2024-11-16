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

function deepEqual(obj1: { [x: string]: any; } | null, obj2: { [x: string]: any; } | null) {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

function mapRoomGroupsByAttributes(roomGroups: any[]) {
    return roomGroups.reduce((acc: { key: any; images: any; }[], group: { rgext: any; rg_ext: any; images: any; }) => {
        const rgKey = group.rgext || group.rg_ext;
        acc.push({ key: rgKey, images: group.images });
        return acc;
    }, []);
}

function integrateImagesIntoRates(rates: any[], roomGroups: any): any[] {
    const roomGroupMap = mapRoomGroupsByAttributes(roomGroups);
    return rates.map((rate: { rg_ext: any; }) => {
        const rateKey = rate.rg_ext;
        const matchedGroup = roomGroupMap.find((group: { key: any; }) => deepEqual(group.key, rateKey));
        console.log("matched group", matchedGroup)
        const images = matchedGroup ? matchedGroup.images : [];

        return {
            ...rate,
            images,
        };
    });
}

export {
    groupRatesByRoomType,
    integrateImagesIntoRates,
}