class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo(){
    console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} Km/h, ${this.isTrunkOpen}`);
  }

  go(){
  if(this.speed <= 200 && this.isTrunkOpen === false){
    this.speed += 5
  }
  }

  brake(){

  this.speed -= 5

  if(this.speed === 0){
   this.speed = 0;
  }
  }

  openTrunk(){
    if(this.speed > 0){
      this.isTrunkOpen = false;
    }
    else{
      this.isTrunkOpen = true;
    }
  }

  closeTrunk(){
    if(this.isTrunkOpen){
      this.isTrunkOpen = false;
    }
  }

}

class RaceCar extends Car {

  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  }

}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

const raceCar1 =  new RaceCar({
  brand: 'Mclaren',
  model: 'F1',
  acceleration: 20
})

car1.openTrunk();

car2.go();
car2.openTrunk();

car1.displayInfo()
car2.displayInfo()

raceCar1.go()
raceCar1.displayInfo()