import { Room, Booking } from './index';

describe('Testing class Room', () => {
  it('isOccupied is true cuando la habitacion esta ocupada en una fecha dada', ()=> {
    const room = new Room('Habitacion 1', [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room);

    const bookings = [ booking1, booking2, ]
    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const isOccupiedTest1 = room1.isOccupied('2023-10-10');
    expect(isOccupiedTest1).toBeTruthy()
  })
  it('isOccupied is false cuando la habitacion no esta ocupada en una fecha dada ', () => {
    const room = new Room('Habitacion 2', [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room);
    const bookings = [ booking1, booking2, ]
    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const isOccupiedTest1 = room1.isOccupied('2023-10-18');
    expect(isOccupiedTest1).toBeFalsy()
    
  });
  it('isOccupied is boolean sin importar el dato que le pasemos', () => {
    const room = new Room('Habitacion 3', [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room);
    const bookings = [ booking1, booking2, ]

    const room2 = new Room(room.name, bookings, room.rate, room.discount);
    const isOccupiedTest1 = room2.isOccupied('Hola');
    const isOccupiedTest2 = room2.isOccupied('0');
    expect(typeof isOccupiedTest1).toBe('boolean')
    expect(typeof isOccupiedTest2).toBe('boolean')
  })
  it("occupancyPercentage devuelve el % de ocupacion dependiendo dependiendo las fechas pasadas", () => {
    const room = new Room("Room1", [], 150, 10);
    const booking1 = new Booking("booking 1", "bok@bok.es", "2023-09-01", "2023-09-15", 10, room );
    const booking2 = new Booking("booking 2", "bok2@bok.es", "2023-09-16", "2023-09-30", 10, room );

    const bookings = [booking1, booking2];
    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const percentage = room1.occupancyPercentage("2023-09-01", "2023-09-30");

    expect(percentage).toBe(100);
  });
  it("occupancyPercentage devuelve el % de ocupacion dependiendo dependiendo las fechas pasadas", () => {
    const room = new Room("Room1", [], 150, 10);
    const booking1 = new Booking( "booking 1", "bok@bok.es", "2023-08-14", "2023-08-16", 10, room );
    const booking2 = new Booking( "booking 2", "bok2@bok.es", "2023-08-18", "2023-09-20", 10, room );

    const bookings = [booking1, booking2];
    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const percentage = room1.occupancyPercentage("2023-08-16", "2023-08-18");

    expect(percentage).toBe(66.7);
  });
  it('totalOccupancyPercentage nos devuelve el porcentaje promedio de ocupacion de todas las habitaiones', () => {
    const roomA = new Room("Room1", [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-10', 10, roomA);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-11', '2023-10-15', 10, roomA);
    const bookingsA = [ booking1, booking2 ]

    const roomB = new Room("Room1", [], 150, 10);
    const booking3 = new Booking('booking 3', 'booking3@bo.com', '2023-10-16', '2023-10-22', 10, roomB);
    const booking4 = new Booking('booking 4', 'booking4@bo.com', '2023-10-23', '2023-10-31', 10, roomB);
    
    const bookingsB = [ booking3, booking4 ]
    const room_1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room_2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);
    const arrayOfRooms = [room_1, room_2]
    const totalOccupPer = Room.totalOccupancyPercentage(arrayOfRooms, '2023-10-01', '2023-10-31');
    expect(totalOccupPer).toBe(50)
  })
  it('totalOccupancyPercentage nos devuelve el porcentaje promedio de ocupacion de todas las habitaiones', () => {
    const roomA = new Room("Room1", [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-05-01', '2023-05-06', 10, roomA);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-05-07', '2023-06-10', 10, roomA);
    const bookingsA = [ booking1, booking2, ]

    const roomB = new Room("Room1", [], 150, 10);
    const booking3 = new Booking('booking 3', 'booking3@bo.com', '2023-05-11', '2023-05-14', 10, roomB);
    const booking4 = new Booking('booking 4', 'booking4@bo.com', '2023-05-15', '2023-05-17', 10, roomB);
    const bookingsB = [ booking3, booking4, ]

    const room_1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room_2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);
    const arrayOfRooms = [room_1, room_2]
    const totalOccupPer = Room.totalOccupancyPercentage(arrayOfRooms, '2023-05-01', '2023-05-30');
    expect(totalOccupPer).toBe(61.6)
  })
  it('availableRooms nos devuelve un array de las rooms que no estan ocupadas', () => {
    const roomA = new Room("Room1", [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-03', 10, roomA);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-04', '2023-10-06', 10, roomA);
    const bookingsA = [ booking1, booking2, ]

    const roomB = new Room("Room1", [], 150, 10);
    const booking3 = new Booking('booking 3', 'booking3@bo.com', '2023-10-10', '2023-10-14', 10, roomB);
    const booking4 = new Booking('booking 4', 'booking4@bo.com', '2023-10-15', '2023-10-17', 10, roomB);
    const bookingsB = [ booking3, booking4, ]

    const room_1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room_2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);
    const arrayOfRooms = [room_1, room_2]
    const freeRooms = Room.availableRooms(arrayOfRooms, '2023-10-18', '2023-10-30');
    expect(freeRooms).toEqual([room_1, room_2])
  })
  it('availableRooms nos devuelve un array de las rooms que no estan ocupadas', () => {
    const roomA = new Room("Room1", [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-03', 10, roomA);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-04', '2023-10-06', 10, roomA);
    const bookingsA = [ booking1, booking2 ]
    
    const roomB = new Room("Room1", [], 150, 10);
    const booking3 = new Booking('booking 3', 'booking3@bo.com', '2023-10-07', '2023-10-10', 10, roomB);
    const booking4 = new Booking('booking 4', 'booking4@bo.com', '2023-10-11', '2023-10-15', 10, roomB);
    const bookingsB = [ booking3, booking4 ]

    const room_1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room_2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);
    const arrayOfRooms = [room_1, room_2]
    const freeRooms = Room.availableRooms(arrayOfRooms, '2023-10-11', '2023-10-20');
    expect(freeRooms).toEqual([room_1])
  })
  it('availableRooms nos devuelve un array vacio ya que las rooms estan ocupadas', () => {
    const roomA = new Room("Room1", [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-03', 10, roomA);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-04', '2023-10-06', 10, roomA);
    const bookingsA = [ booking1, booking2, ]

    const roomB = new Room("Room1", [], 150, 10);
    const booking3 = new Booking('booking 3', 'booking3@bo.com', '2023-10-07', '2023-10-10', 10, roomB);
    const booking4 = new Booking('booking 4', 'booking4@bo.com', '2023-10-11', '2023-10-15', 10, roomB);
    const bookingsB = [ booking3, booking4, ]

    const room_1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room_2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);
    const arrayOfRooms = [room_1, room_2]
    const freeRooms = Room.availableRooms(arrayOfRooms, '2023-10-04', '2023-10-10');
    expect(freeRooms).toEqual([])
  })
  it('availableRooms nos devuelve un array de las 2 rooms que no estan ocupadas', () => {
    const roomA = new Room("Room1", [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-03', 10, roomA);
    const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-04', '2023-10-06', 10, roomA);
    const bookingsA = [ booking1, booking2 ]

    const roomB = new Room("Room1", [], 150, 10);
    const booking3 = new Booking('booking 3', 'booking3@bo.com', '2023-10-07', '2023-10-10', 10, roomB);
    const booking4 = new Booking('booking 4', 'booking4@bo.com', '2023-10-11', '2023-10-15', 10, roomB);
    const bookingsB = [ booking3, booking4 ]

    const room_1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room_2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);
    const arrayOfRooms = [room_1, room_2]
    const freeRooms = Room.availableRooms(arrayOfRooms, '2023-11-04', '2023-11-10');
    expect(freeRooms).toEqual([room_1, room_2])
  })
})

describe('Testing Booking Class', () => {
  it('Calculando el precio/rate de la room, segun el discount de la clase booking', () => {
    const roomA = new Room('Habitacion 1', [], 150, 10);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-03', 10, roomA);
    const rate = booking1.getFee()
    expect(rate).toBe(121.5)
  })
  it('Calculando el precio/rate de la room, segun el discount de la clase booking', () => {
    const roomA = new Room('Habitacion 1', [], 150, 0);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-03', 0, roomA);
    const rate = booking1.getFee()
    expect(rate).toBe(150)
  })
  it('Calculando el precio/rate de la room, segun el discount de la clase booking', () => {
    const roomA = new Room('Habitacion 1', [], 150, 0);
    const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-03', 50, roomA);
    const rate = booking1.getFee()
    expect(rate).toBe(75)
  })
})