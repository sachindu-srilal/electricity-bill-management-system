export class Display{
    constructor(
    public currentDate:string,
    public previousDate:string,
    public currentMeterReading:number,
    public previousReading:number,
    public fixedCharge:number,
    public firstBill:number,
    public secondBill:number,
    public thirdBill:number,
    public totalBill:number){}
}