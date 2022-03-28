import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Workout"
  },
  {
    _id: uuid(),
    categoryName: "Diet plan"
  },
  {
    _id: uuid(),
    categoryName: "Nutrition fact"
  },
  {
    _id:uuid(),
    categoryName: "Workout music"
  }
];
