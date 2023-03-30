/* eslint-disable prettier/prettier */
const countDaysLeft = (maxDateTimeStamp: any) => {
    const fistDate = new Date();
    const lastDate = new Date(
        maxDateTimeStamp.length === 13
            ? parseInt(`${maxDateTimeStamp}`, 10)
            : maxDateTimeStamp * 1000,
    );

    const selisih = lastDate.getTime() - fistDate.getTime();

    const totalDayLeft = Math.ceil(selisih / (1000 * 3600 * 24));

    return `${totalDayLeft}`;
};

export default countDaysLeft;
