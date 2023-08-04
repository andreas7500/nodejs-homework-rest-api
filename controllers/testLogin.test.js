// const {
//   describe,
//   afterAll,
//   test,
//   beforeAll,
//   expect,
// } = require("@jest/globals");

// const request = require("supertest");
// require("dotenv").config();

// const controllers = require("./auth-controller/auth-controller");

// const mongoose = require("mongoose");

// const { DB_HOST } = process.env;

// const app = require("../app");

// app.post("/users/login", controllers.login);

// describe("test login controller", () => {
//   beforeAll(() =>
//     mongoose
//       .connect(DB_HOST)
//       .then(() =>
//         app.listen(3000, () => {
//           console.log("Connection successful!");
//         })
//       )
//       .catch((error) => {
//         console.log(error.message);
//         process.exit(1);
//       })
//   );
//   afterAll(() => {
//     mongoose.disconnect();
//   });

//   test("login return status code 200", async () => {
//     const response = await request(app).post("/users/login").send({
//       email: "Jhironimo@gmail.com.com",
//       password: 123456,
//     });

//     expect(200);
//     expect("string");

//     console.log(response.status);
//     console.log(response.body);
//   });
// });
