let age: any = 36; //any lets you pass any kind of value. Use it as last resort

age = '37';

//Uniion types if we want to avoid any but allow more than one dt we an use union types

let foo : string|number|object;   //this now allows string or number but no any other datatypes.

foo = "Test";
foo = 32;
foo = {};

const myTable = ["10", 3]; //in case or array with initial values, the data types are applied frominitial values
//in above the accepted datatypes for array above are "string" and "number" only! myTable.push(true); => this goes kaboom

myTable.push("23");

let users :string[]; 
let usersMix :(string | number)[]; // array that accepts numbers or strings 

//Alternative way of declaring datatypes array

let usersTableAlternativeDeclaration: Array<string | number>; //we apply generics of array and set that accepts string and number
//Tuples - if you want to set that your array will be a specific number of values
let possibleResults:[number, number] // need array that accepts only 2 entries that should be numbers . 
// In the baove example the first entry must be number and the second one also a number. but if for example the dt type declaration was :[string, number]  the first must be string and the second must be number


//objects And Typescript

let user = {
    name: "max",
    age: 38
}; //=> ts now says that user must be an object tha has name as string prop and age as number

let secondUser :{name:string, age: string|number, coupons: Array<string | number>, additonalDetails: {address: string, postalCode: string|number}};

let val: {} = "this will work"; //when used as datatype, yhe means any type that is not undefined or null

let myObject: Record<string, number | string>; //=>this means by using record: I want an object that has two properties, th first property can have any name and must be string and the second property can have any name and must be either string or number