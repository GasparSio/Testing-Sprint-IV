//Con esta falta modificar alguna que otra cosa del resultado

static totalOccupancyPercentage(rooms, startDate, endDate) {
    //Verificamos si el parámetro rooms es un arreglo y si todos los elementos del arreglo son instancias de la clase Room
      if (!Array.isArray(rooms) || rooms.every(room => !(room instanceof Room))) {
        return 0;
      }
  //calculamos el número de días entre esas dos fechas, El resultado se incrementa en 1 para asegurarnos de incluir el último día en el cálculo.
      const countDays = (startDate, endDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
      };
  
      const totalDaysInRange = countDays(new Date(startDate), new Date(endDate));
  
      if (totalDaysInRange === 0) {
        return 0;
      }
  
      const totalOccupiedDays = rooms.reduce((total, room) => {
        return total + room.occupancyPercentage(startDate, endDate);
      }, 0);
  
      const percentage = ((totalOccupiedDays / rooms.length) * 100).toFixed(1);
  
      return parseFloat(percentage);
    }
  }










//Con esta funciona! 

  occupancyPercentage(startingDate, endingDate) {
    const startDate = new Date(startingDate);
    const endDate = new Date(endingDate);
    //Se establece la startDate a las 00:00:00.000 y la endDate 23:59:59.999
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    let totalDaysInRange = 0;
    let occupiedDays = 0;
    //Ciclo que aumenta el contador de totalDaysInRange hasta que el startDate es mayor al endDate
    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        
      totalDaysInRange++;

      let isOccupied = false;
//bucle interno que recorre todas las reservas, Para cada reserva, se convierten en objetos Date
      for (const booking of this.bookings) {
        const bookingStartDate = new Date(booking.checkin);
        const bookingEndDate = new Date(booking.checkout);
        bookingStartDate.setHours(0, 0, 0, 0);
        bookingEndDate.setHours(23, 59, 59, 999);
//Se verifica si la currentDate está dentro del rango de fechas de alguna reserva. Si es así, se establece isOccupied en true
        if (currentDate >= bookingStartDate && currentDate <= bookingEndDate) {
          isOccupied = true;
          break;
        }
      }
//isOccupied es true después de recorrer todas las reservas, significa que la habitación está ocupada en la currentDate, por lo que se incrementa occupiedDays.
      if (isOccupied) {
        occupiedDays++;
      }
    }

    if (totalDaysInRange === 0) {
      return 0;
    }

    const percentage = (occupiedDays / totalDaysInRange) * 100;
    
    return parseFloat(percentage.toFixed(1));
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {

    function countDays(startDate, endDate) {
      const oneDay = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
    }

    let totalOccupiedDays = 0;
    let totalDaysInRange = countDays(new Date(startDate), new Date(endDate));

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