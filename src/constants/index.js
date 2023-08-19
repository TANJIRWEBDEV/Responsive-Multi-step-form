import arcade from "../assets/icon-arcade.svg";
import advanced from "../assets/icon-advanced.svg";
import pro from "../assets/icon-pro.svg";

const plansD = [
  {
    id: 0,
    img: arcade,
    name: "Arcade",
    price: [9, 90],
    duration: ["mo", "yr"],
  },
  {
    id: 1,
    img: advanced,
    name: "Advanced",
    price: [12, 120],
    duration: ["mo", "yr"],
  },
  {
    id: 2,
    img: pro,
    name: "Pro",
    price: [15, 150],
    duration: ["mo", "yr"],
  },
];

const addsD = [
  {
    name: "Online service",
    info: "Access to multiplayer games",
    price: [1, 10],
    duration: ["mo", "yr"],
  },
  {
    name: "Large storage",
    info: "Extra 1TB of cloud save",
    price: [2, 20],
    duration: ["mo", "yr"],
  },

  {
    name: "Customizable profile",
    info: "Custom theme on your profile",
    price: [2, 20],
    duration: ["mo", "yr"],
  },
];

const stepData = [
  {
    id: 1,
    name: "STEP 1",
    info: "YOUR INFO",
  },
  {
    id: 2,
    name: "STEP 2",
    info: "SELECT PLAN",
  },

  {
    id: 3,
    name: "STEP 3",
    info: "ADD-ONS",
  },
  {
    id: 4,
    name: "STEP 4",
    info: "SUMMARY",
  },
];

export { plansD, addsD, stepData };
