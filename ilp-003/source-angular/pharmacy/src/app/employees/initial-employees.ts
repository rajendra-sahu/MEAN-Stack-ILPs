export class Init {
  load() {
    if (localStorage.getItem('employees') === null || localStorage.getItem('employees') == undefined) {
      console.log("Creating the initial set of employees ...");
      /*var employees = [
        {
          id: 1,
          name: "Paracetamol",
          manufacturer: "Ranbaxy",
          type: "Tablet",
          batchno: "89/25",
          expdate: "9/04/2021",
          price: "146"
        },
        {
          id: 2,
          name: "Sinarest",
          manufacturer: "GSK",
          type: "Tablet",
          batchno: "89/79",
          expdate: "29/06/2021",
          price: "100"
        },
        {
          id: 3,
          name: "Viagra",
          manufacturer: "Pfizer",
          type: "Capsule",
          batchno: "12/68",
          expdate: "08/08/2021",
          price: "125"
        }
      ];*/
      //localStorage.setItem('employees', JSON.stringify(employees));
    }
    else {
      console.log("Loaded the employees from local storage ...");
    }
  }
}
