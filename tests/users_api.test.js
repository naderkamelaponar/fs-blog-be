// بسم الله الرحمن الرحيم
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/users_model");
const userHelper = require("../utils/users_test_helper");
beforeAll(async () => {
await User.deleteMany({});
const userObjects = userHelper.initUsers.map((user) => new User(user));
const promiseObjects = userObjects.map((user) => user.save());
await Promise.all(promiseObjects);
});

describe(" Verify that the user list application ", () => {
test("returns the correct amount of user posts in the JSON format.", async () => {
const res = await api.get("/api/users");
expect(res.header["content-type"]).toContain("application/json");
});
test(" the unique identifier property of the user posts is named id ", async () => {
const res = await api.get("/api/users");
expect(res["_body"][0].id).toBeDefined();
});
describe("making an HTTP POST request to the /api/users url ", () => {
test("successfully creates a new user post.", async () => {
const newuser = {
title: "nb  Title 1",
author: "nb Author 1",
url: "nb Url 1",
likes: 1,
};
await api.post("/api/users").send(newuser).expect(201);
});
test("total number of users in the system is increased by one.  ", async () => {
const res = await api.get("/api/users");
expect(res["_body"].length).toBe(userHelper.initUsers.length + 1);
});
let id2Delete = "";
describe("if the likes property is missing from the request, ", () => {
test("it will default to the value 0", async () => {
const newuser = userHelper.initUsers[0];
newuser["likes"] = "";
const res = await api.post("/api/users").send(newuser);
expect(res["_body"]["likes"]).toBe(0);
id2Delete = res["_body"].id;
});
});

describe("handling a specifc user id ", () => {
test("get respond should return 200 if id exist", async () => {
await api.get(`/api/users/${id2Delete}`).expect(200);
});
test("get request should return 404 if id NOT exist", async () => {
const notExist = await userHelper.idNotExist();
await api.delete(`/api/users/${notExist}`).expect(404);
});

test("delete request should return 404 if id NOT exist", async () => {
await api.delete(`/api/users/${id2Delete}`).expect(404);
});
});
test("users length to be 2 ", async () => {
const res = await api.get("/api/users");
expect(res["_body"].length).toBe(2);
});
});
});
afterAll(() => {
mongoose.connection.close();
});
