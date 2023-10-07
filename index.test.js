const Room = require('./index.js');

describe('Is room occupied?', () => {
  it('isOccupied is true cuando la habitacion esta ocupada en una fecha dada', ()=> {
    const room1 = new Room('habitacion 1', [
      {date: '2023-10-02'}, 
      {date: '2023-10-03'}, 
      {date: '2023-10-04'}, 
      {date: '2023-10-05'}, 
      {date: '2023-10-06'}
    ], 150, 10);
    const isOccupiedTest1 = room1.isOccupied('2023-10-06');
    expect(isOccupiedTest1).toBeTruthy()
  })
  it('isOccupied is false cuando la habitacion no esta ocupada en una fecha dada', () => {
    const room1 = new Room('habitacion 1', [
      {date: '2023-10-02'}, 
      {date: '2023-10-03'}, 
      {date: '2023-10-04'}, 
      {date: '2023-10-05'}, 
      {date: '2023-10-06'}
    ], 140, 10);
    const isOccupiedTest2 = room1.isOccupied('2023-10-10');
    expect(isOccupiedTest2).toBeFalsy();
  })
  it('obtener el porcentage de ocupacion entre un rango de fechas', () => {
    
    const room2 = new Room('habitacion 2', [
      {date: '2023-10-02'}, 
      {date: '2023-10-03'}, 
      {date: '2023-10-04'}, 
      {date: '2023-10-05'}, 
      {date: '2023-10-06'}
    ], 140, 10);
    const startDate = '2023-10-01'
      const endDate = '2023-10-07'
    const percentageRoom = room2.occupancyPercentage(startDate, endDate)
    expect(percentageRoom).toBe(84)
  })
})