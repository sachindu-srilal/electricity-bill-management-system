import {findByAccount, readEntities, saveEntity} from '../dao/dao'
import {Record} from '../dto/record';
import {Display} from "../dto/display";

export async function saveRecord(entity: Record) {
    await saveEntity(entity);
}

export async function displayDetails(account: number) {
    const result = await readEntities(account);
    let currentDate = new Date(result[0].date);
    let previousReadingDate =new Date( result[1].date);
    let beforePreviousReadingDate =new Date(result[2].date);
    let numberOfDays = Math.floor((currentDate.getTime() - previousReadingDate.getTime()) / (24 * 3600 * 1000));
    let currentMeterReading = +result[0].reading;
    let previousMeterReading = +result[1].reading;
    let BeforePreviousMeterReading=+result[2].reading;
    let points = (currentMeterReading) - (previousMeterReading);
    let firstRangeBill: number;
    let secondRangeBill: number;
    let thirdRangeBill: number;
    let fixedRate: number
    let totalBill: number

    if (points <= numberOfDays) {
        firstRangeBill = points * 20;
        secondRangeBill = 0;
        thirdRangeBill = 0;
        fixedRate = 500;
        totalBill = firstRangeBill + fixedRate;
        return new Display(beforePreviousReadingDate.toLocaleDateString("ca-ca"), previousReadingDate.toLocaleDateString("ca-ca"), previousMeterReading, BeforePreviousMeterReading, fixedRate, firstRangeBill, secondRangeBill, thirdRangeBill, totalBill);

    } else if (points > numberOfDays && points <= 2 * numberOfDays) {
        firstRangeBill = numberOfDays * 20;
        secondRangeBill = (points - numberOfDays) * 35;
        thirdRangeBill = 0;
        fixedRate = 1000;
        totalBill = firstRangeBill + secondRangeBill + fixedRate;
        return new Display(beforePreviousReadingDate.toLocaleDateString("ca-ca"), previousReadingDate.toLocaleDateString("ca-ca"), previousMeterReading, BeforePreviousMeterReading, fixedRate, firstRangeBill, secondRangeBill, thirdRangeBill, totalBill);


    } else {
        firstRangeBill = numberOfDays * 20;
        secondRangeBill = (2 * numberOfDays) * 35;
        thirdRangeBill = (points - 3 * numberOfDays) * (40 * 2 + (points - 3 * numberOfDays - 1)) / 2;
        fixedRate = 1500;
        totalBill = firstRangeBill + secondRangeBill + thirdRangeBill + fixedRate;
        return new Display(beforePreviousReadingDate.toLocaleDateString("ca-ca"), previousReadingDate.toLocaleDateString("ca-ca"), previousMeterReading, BeforePreviousMeterReading, fixedRate, firstRangeBill, secondRangeBill, thirdRangeBill, totalBill);

    }

}

