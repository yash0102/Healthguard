export class ReminderModel {
    constructor( name,number,time,medicineName ) {
        this.name = name;
        this.number = number;
        this.time = time;
        this.medicineName = medicineName;
    }
}

export class AppoinmentModel {
    constructor( name, date, time, email ) {
        this.name = name;
        this.date = date;
        this.time = time;
        this.email = email;
    }
}