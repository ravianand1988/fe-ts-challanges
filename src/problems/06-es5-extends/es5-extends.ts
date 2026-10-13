function myExtends(superType: Function, subType: Function): Function {
  // Step 1: Create a new constructor function MyType(this, ...args)
  function extendedType(this: any, ...args: any[]) {
    const target = Object.create(subType.prototype);
    superType.apply(target, args);
    subType.apply(target, args);
    return target;
  }

  // Step 2: Setup prototype chain
  Object.setPrototypeOf(subType.prototype, superType.prototype);
  // Step 3: Set up static/constructor inheritance
  Object.setPrototypeOf(extendedType, superType);
  // Step 4: Return MyType
  return extendedType;
}

function Animal(this: any, name: string) {
  this.name = name;
}
Animal.prototype.greet = function () {
  return `Hello, ${this.name}`;
};
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

function Dog(this: any) {
  this.breed = "Labrador";
}
Animal.prototype.bark = function () {
  return `${this.name}: says Woof woof..`;
};

const ExtendedDog = myExtends(Animal, Dog);
const dogA = new (ExtendedDog as any)("Buddy");
console.log(dogA.name); // Expected: "Rex"
console.log(dogA.breed); // Expected: "Labrador"
console.log(dogA.greet()); // Expected: "Hello, Rex"
console.log(dogA.bark()); // Expected: "Rex says Woof!"
console.log(dogA instanceof Animal); // Expected: true

export { Animal, Dog, myExtends };
