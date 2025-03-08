export const tutorialFolders = [
  {
    id: 'basics',
    name: 'Basics',
    files: [
      {
        id: 'basics/variables.js',
        name: 'variables.js',
        content: `// Variables and Data Types
// In JavaScript, we can declare variables using let, const, or var

// let - for variables that can be reassigned
let age = 25;
age = 26; // This is allowed

// const - for constants that cannot be reassigned
const PI = 3.14159;
// PI = 3.15; // This would cause an error

// Different data types
let name = "John";           // String
let isStudent = true;        // Boolean
let height = 1.75;          // Number
let hobbies = ["reading", "gaming"];  // Array
let person = {              // Object
  name: "John",
  age: 25
};

// Logging different types
console.log("String:", name);
console.log("Boolean:", isStudent);
console.log("Number:", height);
console.log("Array:", hobbies);
console.log("Object:", person);`
      },
      {
        id: 'basics/operators.js',
        name: 'operators.js',
        content: `// Operators in JavaScript

// Arithmetic Operators
let a = 10;
let b = 5;

console.log("Addition:", a + b);        // 15
console.log("Subtraction:", a - b);     // 5
console.log("Multiplication:", a * b);   // 50
console.log("Division:", a / b);        // 2
console.log("Modulus:", a % b);         // 0
console.log("Exponent:", a ** b);       // 100000

// Comparison Operators
console.log("Equal to:", a == b);           // false
console.log("Not equal to:", a != b);       // true
console.log("Greater than:", a > b);        // true
console.log("Less than:", a < b);           // false
console.log("Greater or equal:", a >= b);   // true
console.log("Less or equal:", a <= b);      // false

// Logical Operators
let x = true;
let y = false;

console.log("AND:", x && y);    // false
console.log("OR:", x || y);     // true
console.log("NOT:", !x);        // false`
      }
    ]
  },
  {
    id: 'array-methods',
    name: 'Array Methods',
    files: [
      {
        id: 'array-methods/basic-methods.js',
        name: 'basic-methods.js',
        content: `// Array Methods in JavaScript

// Sample array for demonstrations
let fruits = ['apple', 'banana', 'orange', 'grape'];
console.log('Original array:', fruits);

// Adding and removing elements
fruits.push('mango');           // Add to end
console.log('After push:', fruits);

fruits.pop();                   // Remove from end
console.log('After pop:', fruits);

fruits.unshift('pear');        // Add to start
console.log('After unshift:', fruits);

fruits.shift();                // Remove from start
console.log('After shift:', fruits);

// Slicing and splicing
console.log('Slice (1,3):', fruits.slice(1, 3));  // Extract portion
console.log('Original array:', fruits);  // slice doesn't modify original

fruits.splice(1, 1, 'kiwi');   // Remove and insert elements
console.log('After splice:', fruits);

// Finding elements
console.log('Index of orange:', fruits.indexOf('orange'));
console.log('Includes grape?', fruits.includes('grape'));`
      },
      {
        id: 'array-methods/iterative-methods.js',
        name: 'iterative-methods.js',
        content: `// Array Iterative Methods

const numbers = [1, 2, 3, 4, 5];

// forEach - Execute function for each element
console.log('forEach example:');
numbers.forEach((num, index) => {
  console.log(\`Element at \${index}: \${num}\`);
});

// map - Create new array with transformed elements
const doubled = numbers.map(num => num * 2);
console.log('\\nmap - Doubled numbers:', doubled);

// filter - Create new array with elements that pass test
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('\\nfilter - Even numbers:', evenNumbers);

// reduce - Reduce array to single value
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('\\nreduce - Sum of numbers:', sum);

// find - Find first element that passes test
const firstEven = numbers.find(num => num % 2 === 0);
console.log('\\nfind - First even number:', firstEven);

// some - Check if any element passes test
const hasEven = numbers.some(num => num % 2 === 0);
console.log('\\nsome - Has even numbers?', hasEven);

// every - Check if all elements pass test
const allPositive = numbers.every(num => num > 0);
console.log('\\nevery - All numbers positive?', allPositive);`
      },
      {
        id: 'array-methods/practical-examples.js',
        name: 'practical-examples.js',
        content: `// Practical Array Method Examples

// Example 1: Processing user data
const users = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 20, active: true },
  { id: 4, name: 'Alice', age: 35, active: true }
];

// Get active users' names
const activeUsers = users
  .filter(user => user.active)
  .map(user => user.name);
console.log('Active users:', activeUsers);

// Calculate average age
const averageAge = users
  .reduce((sum, user) => sum + user.age, 0) / users.length;
console.log('Average age:', averageAge);

// Example 2: Data transformation
const orders = [
  { id: 1, items: ['book', 'pen'], total: 25 },
  { id: 2, items: ['laptop'], total: 1000 },
  { id: 3, items: ['desk', 'chair'], total: 500 }
];

// Get all unique items
const allItems = orders
  .flatMap(order => order.items)
  .filter((item, index, array) => array.indexOf(item) === index);
console.log('\\nAll unique items:', allItems);

// Get total revenue
const totalRevenue = orders
  .reduce((sum, order) => sum + order.total, 0);
console.log('Total revenue:', totalRevenue);

// Example 3: Chaining methods
const numbers = [1, -5, 2, -4, 3, -1, 4, -2, 5, -3];

// Get sum of positive numbers squared
const sumOfSquares = numbers
  .filter(num => num > 0)
  .map(num => num * num)
  .reduce((sum, square) => sum + square, 0);
console.log('\\nSum of squares of positive numbers:', sumOfSquares);`
      }
    ]
  },
  {
    id: 'closures',
    name: 'Closures',
    files: [
      {
        id: 'closures/closure-basics.js',
        name: 'closure-basics.js',
        content: `// Understanding Closures in JavaScript

// Basic Closure Example
function createCounter() {
  let count = 0;  // This variable is "closed over"
  
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log('Counter 1:', counter()); // 1
console.log('Counter 2:', counter()); // 2
console.log('Counter 3:', counter()); // 3

// Closure with Parameters
function multiply(x) {
  return function(y) {
    return x * y;
  };
}

const multiplyByTwo = multiply(2);
const multiplyByThree = multiply(3);

console.log('\\n2 × 5 =', multiplyByTwo(5));   // 10
console.log('3 × 5 =', multiplyByThree(5));  // 15

// Private Variables using Closures
function createPerson(name) {
  let age = 0;  // Private variable
  
  return {
    getName: function() {
      return name;
    },
    getAge: function() {
      return age;
    },
    setAge: function(newAge) {
      if (newAge >= 0) {
        age = newAge;
      }
    }
  };
}

const person = createPerson('John');
person.setAge(25);
console.log('\\nName:', person.getName());
console.log('Age:', person.getAge());
console.log('Direct access to age:', person.age);  // undefined`
      },
      {
        id: 'closures/practical-closures.js',
        name: 'practical-closures.js',
        content: `// Practical Applications of Closures

// Example 1: Memoization
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log('Fetching from cache');
      return cache[key];
    } else {
      console.log('Calculating result');
      const result = fn.apply(this, args);
      cache[key] = result;
      return result;
    }
  };
}

// Example function to memoize
const fibonacci = memoize(function(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log('Fibonacci 5:', fibonacci(5));  // First calculation
console.log('Fibonacci 5:', fibonacci(5));  // From cache

// Example 2: Event Handler Factory
function createButtonHandler(buttonId) {
  let clickCount = 0;
  
  return function() {
    clickCount++;
    console.log(\`Button \${buttonId} clicked \${clickCount} times\`);
  };
}

const button1Handler = createButtonHandler('btn1');
const button2Handler = createButtonHandler('btn2');

// Simulate button clicks
button1Handler();
button1Handler();
button2Handler();

// Example 3: Module Pattern
const calculator = (function() {
  let result = 0;
  
  return {
    add: function(x) {
      result += x;
      return this;
    },
    subtract: function(x) {
      result -= x;
      return this;
    },
    getResult: function() {
      return result;
    }
  };
})();

console.log('\\nCalculator example:');
calculator.add(5).subtract(2).add(10);
console.log('Result:', calculator.getResult());  // 13`
      }
    ]
  },
  {
    id: 'hoisting',
    name: 'Hoisting',
    files: [
      {
        id: 'hoisting/function-hoisting.js',
        name: 'function-hoisting.js',
        content: `// Function Hoisting in JavaScript

// Function Declaration Hoisting
console.log(add(2, 3));  // Works! Output: 5

function add(a, b) {
  return a + b;
}

// Function Expression - Not Hoisted!
try {
  console.log(subtract(5, 2));  // Error!
} catch (e) {
  console.log('Error:', e.message);
}

const subtract = function(a, b) {
  return a - b;
};

// Arrow Functions - Also Not Hoisted!
try {
  console.log(multiply(3, 4));  // Error!
} catch (e) {
  console.log('Error:', e.message);
}

const multiply = (a, b) => a * b;

// Correct Usage (after declaration)
console.log('\\nCorrect usage:');
console.log('Subtract:', subtract(5, 2));
console.log('Multiply:', multiply(3, 4));

// Function Declaration vs Variable Declaration
console.log('\\nFunction vs Variable Declaration:');

console.log(greet);  // [Function: greet]
console.log(message);  // undefined

var message = "Hello";
function greet() {
  return "Hi!";
}

// Function Hoisting in Blocks
console.log('\\nFunction Hoisting in Blocks:');

console.log(blockFunc());  // "Outside"

{
  console.log(blockFunc());  // "Inside"
  
  function blockFunc() {
    return "Inside";
  }
}

console.log(blockFunc());  // "Inside"`
      },
      {
        id: 'hoisting/variable-hoisting.js',
        name: 'variable-hoisting.js',
        content: `// Variable Hoisting in JavaScript

// var Hoisting
console.log('x before declaration:', x);  // undefined
var x = 5;
console.log('x after declaration:', x);   // 5

// let and const - Temporal Dead Zone (TDZ)
try {
  console.log('y before declaration:', y);  // Error!
} catch (e) {
  console.log('Error accessing y:', e.message);
}

let y = 10;
console.log('y after declaration:', y);

// Multiple var Declarations
var a = 1;
console.log('\\nFirst a:', a);

{
  console.log('a before second declaration:', a);
  var a = 2;
  console.log('a after second declaration:', a);
}

console.log('Final a:', a);

// let and Block Scope
let b = 'outer';
console.log('\\nOuter b:', b);

{
  // console.log(b);  // Would cause TDZ error
  let b = 'inner';
  console.log('Inner b:', b);
}

console.log('Outer b again:', b);

// Function Scope vs Block Scope
function scopeTest() {
  var functionScoped = 'I am function scoped';
  let blockScoped = 'I am block scoped';
  
  console.log('\\nInside function:');
  console.log(functionScoped);
  console.log(blockScoped);
  
  {
    var functionScoped2 = 'Still function scoped';
    let blockScoped2 = 'Another block scoped';
    console.log('Inside block:');
    console.log(functionScoped2);
    console.log(blockScoped2);
  }
  
  console.log('\\nBack to function:');
  console.log(functionScoped2);  // Still accessible
  try {
    console.log(blockScoped2);  // Error!
  } catch (e) {
    console.log('Error:', e.message);
  }
}

scopeTest();`
      }
    ]
  },
  {
    id: 'oop',
    name: 'OOP',
    files: [
      {
        id: 'oop/classes.js',
        name: 'classes.js',
        content: `// Object-Oriented Programming with Classes

// Basic Class Definition
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound\`);
  }
}

const dog = new Animal('Dog');
dog.speak();  // "Dog makes a sound"

// Inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(\`\${this.name} barks: Woof!\`);
  }
  
  fetch() {
    console.log(\`\${this.name} fetches the ball\`);
  }
}

const rex = new Dog('Rex', 'German Shepherd');
console.log('\\nDog example:');
console.log('Name:', rex.name);
console.log('Breed:', rex.breed);
rex.speak();
rex.fetch();

// Getters and Setters
class BankAccount {
  constructor(initialBalance = 0) {
    this._balance = initialBalance;
  }
  
  // Getter
  get balance() {
    return this._balance;
  }
  
  // Setter
  set balance(value) {
    if (value < 0) {
      throw new Error('Balance cannot be negative');
    }
    this._balance = value;
  }
  
  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }
  
  withdraw(amount) {
    this.balance -= amount;
    return this.balance;
  }
}

console.log('\\nBank Account example:');
const account = new BankAccount(1000);
console.log('Initial balance:', account.balance);
console.log('After deposit:', account.deposit(500));
console.log('After withdrawal:', account.withdraw(200));

// Static Methods
class MathHelper {
  static square(x) {
    return x * x;
  }
  
  static cube(x) {
    return x * x * x;
  }
  
  static sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
  }
}

console.log('\\nMath Helper example:');
console.log('Square of 5:', MathHelper.square(5));
console.log('Cube of 3:', MathHelper.cube(3));
console.log('Sum of 1,2,3,4:', MathHelper.sum(1, 2, 3, 4));`
      },
      {
        id: 'oop/prototypes.js',
        name: 'prototypes.js',
        content: `// Prototypal Inheritance in JavaScript

// Constructor Function
function Animal(name) {
  this.name = name;
}

// Adding methods to prototype
Animal.prototype.speak = function() {
  console.log(\`\${this.name} makes a sound\`);
};

// Creating instances
const cat = new Animal('Cat');
cat.speak();  // "Cat makes a sound"

// Inheritance using prototypes
function Dog(name, breed) {
  // Call parent constructor
  Animal.call(this, name);
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add specific method for Dog
Dog.prototype.bark = function() {
  console.log(\`\${this.name} barks: Woof!\`);
};

// Create a dog instance
const rex = new Dog('Rex', 'German Shepherd');
console.log('\\nDog example:');
console.log('Name:', rex.name);
console.log('Breed:', rex.breed);
rex.speak();
rex.bark();

// Object.create example
const animalProto = {
  speak() {
    console.log(\`\${this.name} makes a sound\`);
  },
  eat(food) {
    console.log(\`\${this.name} eats \${food}\`);
  }
};

const lion = Object.create(animalProto);
lion.name = 'Lion';
console.log('\\nLion example:');
lion.speak();
lion.eat('meat');

// Property Descriptors
console.log('\\nProperty Descriptors:');
const person = {
  name: 'John'
};

Object.defineProperty(person, 'age', {
  value: 30,
  writable: false,
  enumerable: true,
  configurable: false
});

console.log('Person:', person);
person.age = 40;  // Won't change due to writable: false
console.log('Age after attempted change:', person.age);

// Prototype Chain
console.log('\\nPrototype Chain:');
console.log('Is rex an instance of Dog?', rex instanceof Dog);
console.log('Is rex an instance of Animal?', rex instanceof Animal);
console.log('Is rex an instance of Object?', rex instanceof Object);`
      },
      {
        id: 'oop/encapsulation.js',
        name: 'encapsulation.js',
        content: `// Encapsulation in JavaScript

// Using Closures for Private Members
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log('Counter:', counter.increment());  // 1
console.log('Counter:', counter.increment());  // 2
console.log('Counter:', counter.decrement());  // 1
console.log('Direct access to count:', counter.count);  // undefined

// Using Symbols for Private Properties
const _count = Symbol('count');
const _increment = Symbol('increment');

class Counter {
  constructor() {
    this[_count] = 0;
  }
  
  [_increment]() {
    this[_count]++;
  }
  
  increment() {
    this[_increment]();
    return this[_count];
  }
  
  getCount() {
    return this[_count];
  }
}

console.log('\\nSymbol Privacy:');
const c = new Counter();
console.log('Count:', c.increment());
console.log('Count:', c.increment());
console.log('Direct access:', c[_count]);  // Still accessible, but harder to guess

// Private Class Fields (Modern JavaScript)
class BankAccount {
  #balance = 0;  // Private field
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  get balance() {
    return this.#balance;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }
  
  #validateWithdrawal(amount) {  // Private method
    return amount > 0 && amount <= this.#balance;
  }
  
  withdraw(amount) {
    if (this.#validateWithdrawal(amount)) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }
}

console.log('\\nPrivate Fields:');
const account = new BankAccount(1000);
console.log('Initial balance:', account.balance);
account.deposit(500);
console.log('After deposit:', account.balance);
account.withdraw(200);
console.log('After withdrawal:', account.balance);
// console.log(account.#balance);  // SyntaxError
// account.#validateWithdrawal(100);  // SyntaxError`
      }
    ]
  },
  {
    id: 'dom-events',
    name: 'DOM & Events',
    files: [
      {
        id: 'dom-events/dom-basics.html',
        name: 'dom-basics.html',
        content: `<!DOCTYPE html>
<html>
<head>
  <title>DOM Basics</title>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background-color: #3b82f6;
      margin: 20px;
      transition: all 0.3s ease;
    }
    .box.active {
      background-color: #22c55e;
      transform: scale(1.1);
    }
    .controls {
      margin: 20px;
    }
    button {
      padding: 8px 16px;
      margin-right: 10px;
      background-color: #4b5563;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #374151;
    }
  </style>
</head>
<body>
  <div class="controls">
    <button onclick="toggleBox()">Toggle Box</button>
    <button onclick="changeColor()">Random Color</button>
    <button onclick="addBox()">Add Box</button>
  </div>
  <div id="box" class="box"></div>

  <script>
    // Toggle box active state
    function toggleBox() {
      const box = document.getElementById('box');
      box.classList.toggle('active');
    }

    // Change box color randomly
    function changeColor() {
      const box = document.getElementById('box');
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      box.style.backgroundColor = randomColor;
    }

    // Add a new box
    function addBox() {
      const newBox = document.createElement('div');
      newBox.className = 'box';
      document.body.appendChild(newBox);
      
      // Add click handler to new box
      newBox.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    }
  </script>
</body>
</html>`
      },
      {
        id: 'dom-events/event-handling.js',
        name: 'event-handling.js',
        content: `// Event Handling Examples

// Create button element
const button = document.createElement('button');
button.textContent = 'Click me!';
button.style.cssText = 'padding: 10px 20px; margin: 10px; cursor: pointer;';
document.body.appendChild(button);

// Create event display div
const display = document.createElement('div');
display.style.cssText = 'margin: 10px; padding: 10px; border: 1px solid #ccc;';
document.body.appendChild(display);

// 1. Basic click event
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
  console.log('Event type:', event.type);
  console.log('Target:', event.target.tagName);
  display.textContent = 'Last event: click at ' + new Date().toLocaleTimeString();
});

// 2. Mouse events
button.addEventListener('mouseover', function() {
  console.log('Mouse over button');
  this.style.backgroundColor = '#e5e7eb';
});

button.addEventListener('mouseout', function() {
  console.log('Mouse left button');
  this.style.backgroundColor = '';
});

// 3. Keyboard events
document.addEventListener('keydown', function(event) {
  console.log('Key pressed:', event.key);
  if (event.key === 'Enter') {
    console.log('Enter key pressed!');
    button.click(); // Programmatically trigger button click
  }
});

// 4. Event bubbling example
const outer = document.createElement('div');
outer.style.cssText = 'padding: 20px; background: #f3f4f6; margin: 10px;';
const inner = document.createElement('div');
inner.style.cssText = 'padding: 20px; background: #e5e7eb;';
inner.textContent = 'Click me to see event bubbling';

outer.appendChild(inner);
document.body.appendChild(outer);

inner.addEventListener('click', function(event) {
  console.log('Inner div clicked');
});

outer.addEventListener('click', function(event) {
  console.log('Outer div clicked');
});

// 5. Event delegation
const list = document.createElement('ul');
list.style.cssText = 'margin: 10px; padding: 0; list-style: none;';

// Add some list items
['Item 1', 'Item 2', 'Item 3'].forEach(text => {
  const li = document.createElement('li');
  li.textContent = text;
  li.style.cssText = 'padding: 10px; margin: 5px; background: #f3f4f6; cursor: pointer;';
  list.appendChild(li);
});

document.body.appendChild(list);

// Instead of adding event listener to each li,
// we add one listener to the parent ul
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('Clicked:', event.target.textContent);
    event.target.style.backgroundColor = '#e5e7eb';
    
    // Reset color after 500ms
    setTimeout(() => {
      event.target.style.backgroundColor = '#f3f4f6';
    }, 500);
  }
});

// 6. Custom events
const customButton = document.createElement('button');
customButton.textContent = 'Trigger Custom Event';
customButton.style.cssText = 'padding: 10px 20px; margin: 10px; cursor: pointer;';
document.body.appendChild(customButton);

// Create and dispatch custom event
customButton.addEventListener('click', function() {
  const customEvent = new CustomEvent('awesome', {
    detail: { message: 'This is a custom event!' }
  });
  
  document.dispatchEvent(customEvent);
});

// Listen for custom event
document.addEventListener('awesome', function(event) {
  console.log('Custom event received:', event.detail.message);
  display.textContent = 'Custom event triggered at ' + new Date().toLocaleTimeString();
});`
      },
      {
        id: 'dom-events/form-handling.html',
        name: 'form-handling.html',
        content: `<!DOCTYPE html>
<html>
<head>
  <title>Form Handling</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      color: #374151;
    }
    input, select, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #3b82f6;
      ring: 2px solid #3b82f6;
    }
    button {
      background-color: #3b82f6;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    button:hover {
      background-color: #2563eb;
    }
    .error {
      color: #dc2626;
      font-size: 12px;
      margin-top: 4px;
    }
    #formData {
      margin-top: 20px;
      padding: 15px;
      background-color: #f3f4f6;
      border-radius: 4px;
      display: none;
    }
  </style>
</head>
<body>
  <h2>Registration Form</h2>
  <form id="registrationForm">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required>
      <div class="error" id="usernameError"></div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
      <div class="error" i d="emailError"></div>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required>
      <div class="error" id="passwordError"></div>
    </div>

    <div class="form-group">
      <label for="country">Country</label>
      <select id="country" name="country" required>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
      </select>
    </div>

    <div class="form-group">
      <label for="bio">Bio</label>
      <textarea id="bio" name="bio" rows="4"></textarea>
    </div>

    <button type="submit">Register</button>
  </form>

  <div id="formData"></div>

  <script>
    const form = document.getElementById('registrationForm');
    const formData = document.getElementById('formData');

    // Real-time validation
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    username.addEventListener('input', function() {
      const error = document.getElementById('usernameError');
      if (this.value.length < 3) {
        error.textContent = 'Username must be at least 3 characters long';
      } else {
        error.textContent = '';
      }
    });

    email.addEventListener('input', function() {
      const error = document.getElementById('emailError');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value)) {
        error.textContent = 'Please enter a valid email address';
      } else {
        error.textContent = '';
      }
    });

    password.addEventListener('input', function() {
      const error = document.getElementById('passwordError');
      if (this.value.length < 6) {
        error.textContent = 'Password must be at least 6 characters long';
      } else {
        error.textContent = '';
      }
    });

    // Form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Basic validation
      let isValid = true;
      const errors = document.getElementsByClassName('error');
      for (let error of errors) {
        if (error.textContent) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        console.log('Form has validation errors');
        return;
      }

      // Collect form data
      const formValues = {
        username: username.value,
        email: email.value,
        password: password.value,
        country: document.getElementById('country').value,
        bio: document.getElementById('bio').value
      };

      // Display form data
      formData.style.display = 'block';
      formData.innerHTML = '<h3>Form Data:</h3>' +
        Object.entries(formValues)
          .map(([key, value]) => key !== 'password' ? 
            \`<p><strong>\${key}:</strong> \${value}</p>\` : 
            \`<p><strong>\${key}:</strong> ********</p>\`)
          .join('');

      // Log to console
      console.log('Form submitted:', formValues);

      // Reset form
      form.reset();
    });
  </script>
</body>
</html>`
      },
      {
        id: 'dom-events/interactive-todo.html',
        name: 'interactive-todo.html',
        content: `<!DOCTYPE html>
<html>
<head>
  <title>Interactive Todo List</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f3f4f6;
    }
    .container {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #1f2937;
      margin-bottom: 20px;
    }
    .input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    input[type="text"] {
      flex: 1;
      padding: 10px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
    }
    button {
      padding: 10px 20px;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    }
    button:hover {
      background-color: #2563eb;
    }
    .todo-list {
      list-style: none;
      padding: 0;
    }
    .todo-item {
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: #f9fafb;
      margin-bottom: 8px;
      border-radius: 4px;
      transition: all 0.2s;
    }
    .todo-item:hover {
      transform: translateX(5px);
    }
    .todo-item.completed {
      background-color: #d1fae5;
    }
    .todo-item.completed .todo-text {
      text-decoration: line-through;
      color: #6b7280;
    }
    .todo-checkbox {
      margin-right: 10px;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    .todo-text {
      flex: 1;
      color: #374151;
    }
    .todo-delete {
      padding: 4px 8px;
      background-color: #ef4444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }
    .todo-delete:hover {
      background-color: #dc2626;
    }
    .filters {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .filter-btn {
      background-color: #e5e7eb;
      color: #374151;
    }
    .filter-btn.active {
      background-color: #3b82f6;
      color: white;
    }
    .todo-count {
      margin-top: 20px;
      color: #6b7280;
      font-size: 14px;
    }
    .drag-handle {
      cursor: move;
      padding: 0 10px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Todo List</h1>
    
    <div class="input-group">
      <input type="text" id="todoInput" placeholder="Add a new todo...">
      <button onclick="addTodo()">Add</button>
    </div>

    <div class="filters">
      <button class="filter-btn active" onclick="filterTodos('all')">All</button>
      <button class="filter-btn" onclick="filterTodos('active')">Active</button>
      <button class="filter-btn" onclick="filterTodos('completed')">Completed</button>
    </div>

    <ul id="todoList" class="todo-list"></ul>
    
    <div class="todo-count">
      <span id="todoCount">0</span> items left
    </div>
  </div>

  <script>
    let todos = [];
    let currentFilter = 'all';
    let draggedItem = null;

    // Add todo
    function addTodo() {
      const input = document.getElementById('todoInput');
      const text = input.value.trim();
      
      if (text) {
        const todo = {
          id: Date.now(),
          text: text,
          completed: false
        };
        
        todos.push(todo);
        input.value = '';
        renderTodos();
      }
    }

    // Toggle todo completion
    function toggleTodo(id) {
      todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      renderTodos();
    }

    // Delete todo
    function deleteTodo(id) {
      todos = todos.filter(todo => todo.id !== id);
      renderTodos();
    }

    // Filter todos
    function filterTodos(filter) {
      currentFilter = filter;
      
      // Update filter buttons
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === filter);
      });
      
      renderTodos();
    }

    // Render todos
    function renderTodos() {
      const todoList = document.getElementById('todoList');
      const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
      });

      todoList.innerHTML = filteredTodos.map(todo => \`
        <li class="todo-item \${todo.completed ? 'completed' : ''}"
            draggable="true"
            data-id="\${todo.id}">
          <span class="drag-handle">☰</span>
          <input type="checkbox"
                 class="todo-checkbox"
                 \${todo.completed ? 'checked' : ''}
                 onchange="toggleTodo(\${todo.id})">
          <span class="todo-text">\${todo.text}</span>
          <button class="todo-delete" onclick="deleteTodo(\${todo.id})">Delete</button>
        </li>
      \`).join('');

      // Update count
      const activeCount = todos.filter(todo => !todo.completed).length;
      document.getElementById('todoCount').textContent = activeCount;

      // Add drag and drop listeners
      const items = todoList.getElementsByClassName('todo-item');
      Array.from(items).forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
      });
    }

    // Drag and drop handlers
    function handleDragStart(e) {
      draggedItem = e.target;
      e.target.style.opacity = '0.5';
    }

    function handleDragOver(e) {
      e.preventDefault();
      const todoItem = e.target.closest('.todo-item');
      if (todoItem && draggedItem !== todoItem) {
        const rect = todoItem.getBoundingClientRect();
        const midpoint = (rect.bottom - rect.top) / 2;
        const relativeY = e.clientY - rect.top;
        
        todoItem.style.borderTop = relativeY < midpoint ? '2px solid #3b82f6' : 'none';
        todoItem.style.borderBottom = relativeY >= midpoint ? '2px solid #3b82f6' : 'none';
      }
    }

    function handleDrop(e) {
      e.preventDefault();
      const todoItem = e.target.closest('.todo-item');
      if (todoItem && draggedItem !== todoItem) {
        const allItems = [...document.getElementsByClassName('todo-item')];
        const draggedIdx = allItems.indexOf(draggedItem);
        const droppedIdx = allItems.indexOf(todoItem);
        
        // Reorder todos array
        const [movedTodo] = todos.splice(draggedIdx, 1);
        todos.splice(droppedIdx, 0, movedTodo);
        
        renderTodos();
      }
    }

    function handleDragEnd(e) {
      draggedItem = null;
      // Clean up any remaining drag styling
      document.querySelectorAll('.todo-item').forEach(item => {
        item.style.borderTop = '';
        item.style.borderBottom = '';
        item.style.opacity = '';
      });
    }

    // Enter key handler
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTodo();
      }
    });

    // Initial render
    renderTodos();
  </script>
</body>
</html>`
      }
    ]
  }
];