export class Room {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;

  constructor(name: string, bookings: Booking[], rate: number, discount: number) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }
  isOccupied(date: string): boolean {
    const myDate = new Date(date);

    for (let i = 0; i < this.bookings.length; i++) {
      const startDate = new Date(this.bookings[i].checkin);
      const endDate = new Date(this.bookings[i].checkout);

      if (myDate >= startDate && myDate <= endDate) {
        return true;
      }
    }

    return false;
  }

  occupancyPercentage(startingDate: string, endingDate: string): number {
//Creamos el objeto Date a partir de las fechas recibidas como parametro
    const startDate = new Date(startingDate);
    const endDate = new Date(endingDate);
//establecemos la hora de startDate a las 00:00:00.000 y de endDate a las 23:59:59.999 para que incluya todo el dia
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
//Seguimiento de los días totales en el rango y los días ocupados dentro de ese rango, 
    let totalDaysInRange = 0;
    let occupiedDays = 0;
//Iteramos a traves de todas las reservas de los bookings
    for (const booking of this.bookings) {
//creamos objetos Date a partir del checkin y checkout para cada reserva
      const bookingStartDate = new Date(booking.checkin);
      const bookingEndDate = new Date(booking.checkout);

      bookingStartDate.setHours(0, 0, 0, 0);
      bookingEndDate.setHours(23, 59, 59, 999);
//verificamos si existe una interseccion entre el rango de fechas por parametro y el rango de fechas de la reserva. 
//Si hay una intersección, significa que la reserva afecta al rango de fechas especificado.
      if (startDate <= bookingEndDate && endDate >= bookingStartDate) {
//Si hay interseccion, se calcula la fecha de inicio y finalizacion entre los dos rangos de fechas. 
      const intersectionStartDate = new Date(Math.max(startDate.getTime(), bookingStartDate.getTime()));
      const intersectionEndDate = new Date(Math.min(endDate.getTime(), bookingEndDate.getTime()));
      
      const intersectionStartDateMs = intersectionStartDate.getTime();
      const intersectionEndDateMs = intersectionEndDate.getTime();

// Calcula la diferencia en milisegundos entre intersectionEndDate y intersectionStartDate
      const differenceMs = intersectionEndDateMs - intersectionStartDateMs;

// Calcula la duración en días de la intersección
      const daysInIntersection = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
//Agregamos el numero de dias al occupiedDays
      occupiedDays += daysInIntersection;
      }
    }

    const startDateMs = startDate.getTime();
    const endDateMs = endDate.getTime();
// Calcula la diferencia en milisegundos entre endDate y startDate
    const differenceMs = endDateMs - startDateMs;
//Luego del bucle calculamos el número total de días en el rango especificado entre endDate y startDate por la cantidad de milisegundos en un día.
    totalDaysInRange = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
//Si es igual a 0 significa que el rango especificado no contiene ningún día,
    if (totalDaysInRange === 0) {
      return 0;
    }
//se calcula el porcentaje de ocupación dividiendo occupiedDays entre totalDaysInRange
    const percentage = (occupiedDays / totalDaysInRange) * 100;
    return parseFloat(percentage.toFixed(1));
  }

  static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
    function countDays(startDate: string, endDate: string): number {
      const oneDay = 24 * 60 * 60 * 1000;
      const startTimestamp = new Date(startDate).getTime(); // Convertir a timestamp
      const endTimestamp = new Date(endDate).getTime();  
      return Math.round(Math.abs((startTimestamp - endTimestamp) / oneDay)) + 1;
    }

    let totalOccupiedDays = 0;
    let totalDaysInRange = countDays(startDate, endDate);
    if (totalDaysInRange === 0) {
      return 0;
    }
    //Se recorre el rooms, se iran sumando los porcentajes segun el metodo occupancyPercentage
    rooms.forEach((room) => {
      totalOccupiedDays += room.occupancyPercentage(startDate, endDate);
    });
    //Calculamos el promedio y redondeamos a 1 decimal
    const percentage = (totalOccupiedDays / rooms.length).toFixed(1);
    //lo convertimos a numero
    return parseFloat(percentage);
  }

  static availableRooms(rooms: Room[], startDate: string, endDate: string): Room[]{
    const availableRooms: Room[] = [];

    for (const room of rooms) {
//En cada iteracion evaluamos si la room esta ocupada en cualquiera de las dos fechas
      const isOccupied = room.isOccupied(startDate) || room.isOccupied(endDate);

      if (!isOccupied) {
        availableRooms.push(room);
      }
    }
    return availableRooms;
  }
}

export class Booking{
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  discount: number;
  room: Room;

  constructor(name: string, email: string, checkin: string, checkout: string, discount: number, room: Room) {
    this.name = name;
    this.email = email;
    this.checkin = checkin;
    this.checkout = checkout;
    this.discount = discount;
    this.room = room;
  }
  getFee(): number {
    // Obtén la tarifa base de la habitación desde la instancia de room
    const baseRate = this.room.rate;

    // Calcula el valor del descuento aplicado a la tarifa base
    const discountRoom = (baseRate * this.room.discount) / 100;

    // Resta el valor del descuento a la tarifa base para obtener el precio final
    const finalRateRoom = baseRate - discountRoom;

    const discountBooking = (finalRateRoom * this.discount) / 100

    const finalRate = finalRateRoom - discountBooking
    
    return finalRate;

  }
}
