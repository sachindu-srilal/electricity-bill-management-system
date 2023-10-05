import {findByAccount, readEntities, saveEntity} from '../dao/dao'
import {Record} from '../dto/record';
import {Display} from "../dto/display";
import {string} from "joi";

export async function saveRecord(entity: Record) {
    await saveEntity(entity);
}

export async function displayDetails(account: number) {
    const result = await readEntities(account);
    let currentDate = new Date(result[0].date);
    let currentMeterReading = +result[0].reading;
    let firstRangeBill: number;
    let secondRangeBill: number;
    let thirdRangeBill: number;
    let fixedRate: number;
    let totalBill: number;
    let previousReadingDate:any;
    let previousMeterReading:any;
    let numberOfDays:number;
    let points:number;


    if (result.length > 1){
        previousReadingDate =new Date( result[1].date);
        previousMeterReading = +result[1].reading;
        numberOfDays = Math.floor((currentDate.getTime() - previousReadingDate.getTime()) / (24 * 3600 * 1000));
        points = (currentMeterReading) - (previousMeterReading);

        if (points <= numberOfDays) {
            firstRangeBill = points * 20;
            secondRangeBill = 0;
            thirdRangeBill = 0;
            fixedRate = 500;
            totalBill = firstRangeBill + fixedRate;
            return new Display( currentDate.toLocaleDateString("ca-ca"),previousReadingDate.toLocaleDateString("ca-ca"),
                currentMeterReading, previousMeterReading, fixedRate, firstRangeBill, secondRangeBill, thirdRangeBill, totalBill);

        } else if (points > numberOfDays && points <= 2 * numberOfDays) {
            firstRangeBill = numberOfDays * 20;
            secondRangeBill = (points - numberOfDays) * 35;
            thirdRangeBill = 0;
            fixedRate = 1000;
            totalBill = firstRangeBill + secondRangeBill + fixedRate;
            return new Display(currentDate.toLocaleDateString("ca-ca"), previousReadingDate.toLocaleDateString("ca-ca"),
                currentMeterReading, previousMeterReading, fixedRate, firstRangeBill, secondRangeBill,
                thirdRangeBill, totalBill);

        } else {
            firstRangeBill = numberOfDays * 20;
            secondRangeBill = (2 * numberOfDays) * 35;
            thirdRangeBill = (points - 3 * numberOfDays) * (40 * 2 + (points - 3 * numberOfDays - 1)) / 2;
            fixedRate = 1500;
            totalBill = firstRangeBill + secondRangeBill + thirdRangeBill + fixedRate;
            return new Display(currentDate.toLocaleDateString("ca-ca"),previousReadingDate.toLocaleDateString("ca-ca"),
                currentMeterReading, previousMeterReading,fixedRate, firstRangeBill, secondRangeBill,
                thirdRangeBill, totalBill);
        }
    } else {
        previousReadingDate= 0;
        previousMeterReading = 0;
        numberOfDays = 25;
        points = currentMeterReading;

        if (points <= numberOfDays) {
            firstRangeBill = points * 20;
            secondRangeBill = 0;
            thirdRangeBill = 0;
            fixedRate = 500;
            totalBill = firstRangeBill + fixedRate;
            return new Display( currentDate.toLocaleDateString("ca-ca"),previousReadingDate,
                currentMeterReading, previousMeterReading, fixedRate, firstRangeBill, secondRangeBill, thirdRangeBill, totalBill);

        } else if (points > numberOfDays && points <= 2 * numberOfDays) {
            firstRangeBill = numberOfDays * 20;
            secondRangeBill = (points - numberOfDays) * 35;
            thirdRangeBill = 0;
            fixedRate = 1000;
            totalBill = firstRangeBill + secondRangeBill + fixedRate;
            return new Display(currentDate.toLocaleDateString("ca-ca"), previousReadingDate,
                currentMeterReading, previousMeterReading, fixedRate, firstRangeBill, secondRangeBill,
                thirdRangeBill, totalBill);

        } else {
            firstRangeBill = numberOfDays * 20;
            secondRangeBill = (2 * numberOfDays) * 35;
            thirdRangeBill = (points - 3 * numberOfDays) * (40 * 2 + (points - 3 * numberOfDays - 1)) / 2;
            fixedRate = 1500;
            totalBill = firstRangeBill + secondRangeBill + thirdRangeBill + fixedRate;
            return new Display(currentDate.toLocaleDateString("ca-ca"),previousReadingDate,
                currentMeterReading, previousMeterReading,fixedRate, firstRangeBill, secondRangeBill,
                thirdRangeBill, totalBill);
        }
    }
}

