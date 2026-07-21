import { sitePath } from "../site-path";

export const transformations = [
  {
    name: "Jesse",
    age: 36,
    role: "Personal Trainer",
    image: sitePath("/images/transformations/jesse-before-after.jpg"),
  },
  {
    name: "Andrew",
    age: 28,
    role: "Self Employed CEO",
    image: sitePath("/images/transformations/andrew-before-after.jpg"),
  },
  {
    name: "Janet",
    age: 32,
    role: "Executive Assistant",
    image: sitePath("/images/transformations/janet-before-after.jpg"),
  },
  {
    name: "Scott",
    age: 39,
    role: "IT Manager",
    image: sitePath("/images/transformations/scott-before-after.jpg"),
  },
  {
    name: "Crysta",
    age: 43,
    role: "Registered Nurse",
    image: sitePath("/images/transformations/crysta-before-after.jpg"),
  },
  {
    name: "Cameron",
    age: 22,
    role: "Student",
    image: sitePath("/images/transformations/cameron-before-after.jpg"),
  },
  {
    name: "Anthony",
    age: 31,
    role: "Customer Service",
    image: sitePath("/images/transformations/anthony-before-after.jpg"),
  },
  {
    name: "Roxy",
    age: 68,
    role: "Retired",
    image: sitePath("/images/transformations/roxy-before-after.jpg"),
  },
] as const;
