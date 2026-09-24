import './App.css'
import calculateArea, { PI } from './math';
import { useEffect, useState } from 'react';
import ChatBox from "./components/ChatBox";

class Animal {
  constructor(name) {
    this.name = name;
    console.log(`[Animal Constructor] Đã khởi tạo lớp Animal cho: ${this.name}`);
  }

  makeSound() {
    return 'Animal makes a sound';
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); 
    this.breed = breed;
    console.log(`[Dog Constructor] Đã khởi tạo lớp Dog với giống: ${this.breed}`);
  }

  makeSound() {
    return 'Woof Woof!';
  }
}


function App() {
  const myDog = new Dog("Buddy", "Golden Retriever");
   myDog.makeSound();
  const arr1 = [1, 2];
  const arr2 = [3, 4];
  const newArr = [...arr1,...arr2];
  const handleButton = (e) => {console.log(sum(1,2,3,4,5))};
  const user = { name: "Lan", age: 22 };
  const newuser = {...user, age: 23};

  function sum(first, ...rest){
    return rest.reduce((total,current) => total + current, first);
  }
  
  return (
    <div>
      <h1>Hello world</h1>
      <button onClick={handleButton}></button>
      <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <h1>OpenRouter Chatbot</h1>
      <ChatBox />
    </div>
    </div>
  )
}

export default App
