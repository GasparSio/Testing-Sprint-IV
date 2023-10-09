const { Room, Booking } = require('./index.js');

describe('Testing class Room', () => {
  it('isOccupied is true cuando la habitacion esta ocupada en una fecha dada', ()=> {
    const room = {
      name: 'Habitacion 1',
      rate: 150,
      discount: 10,
    };
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room);
    const bookings = [
      booking1,
      booking2,
    ]
    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const isOccupiedTest1 = room1.isOccupied('2023-10-10');
    expect(isOccupiedTest1).toBeTruthy()
  })
  it('isOccupied is false cuando la habitacion no esta ocupada en una fecha dada ', () => {
    const room = {
      name: 'Habitacion 1',
      rate: 150,
      discount: 10,
    };
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room);
    const bookings = [
      booking1,
      booking2,
    ]
    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const isOccupiedTest1 = room1.isOccupied('2023-10-18');
    expect(isOccupiedTest1).toBeFalsy()
    
  });
  it('isOccupied is boolean sin importar el dato que le pasemos', () => {
    const room = {
      name: 'Habitacion 1',
      rate: 150,
      discount: 10,
    };
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room);
    const bookings = [
      booking1,
      booking2,
    ]
    const room2 = new Room(room.name, bookings, room.rate, room.discount);
    const isOccupiedTest1 = room2.isOccupied('Hola');
    const isOccupiedTest2 = room2.isOccupied(0);
    expect(typeof isOccupiedTest1).toBe('boolean')
    expect(typeof isOccupiedTest2).toBe('boolean')
  })
  it('occupancyPercentage nos retornar el porcentaje de dias ocupado, segun el rango de fechas que pasemos', () => {
    const room = {
      name: 'Habitacion 1',
      rate: 150,
      discount: 10,
    };
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room);
    const bookings = [
      booking1,
      booking2,
    ]
    const room3 = new Room(room.name, bookings, room.rate, room.discount);
    const percentageNumber = room3.occupancyPercentage('2023-10-01', '2023-10-15')
    const percentageNumber2 = room3.occupancyPercentage('2023-10-01', '2023-11-10')
    const percentageNumber3 = room3.occupancyPercentage('2023-09-26', '2023-09-01')
    expect(percentageNumber).toBe(100.0)
    expect(percentageNumber2).toBe(36.6)
    expect(percentageNumber3).toBe(0)
  })
})
