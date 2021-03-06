const supertest = require("supertest");
const app = require("./app");
const request = supertest(app);
const LittleLink = require("./api/littleLink.js");
const stats = require("./api/littleLink.js");
const fs = require("fs").promises;
const DataBase = require("./models/database.js");

const testData = [
  {
    originUrl: "https://www.ynet.co.il",
    shortUrl: "hairsince",
    creationDate: "2021-03-05T18:36:48.962Z",
    redirectCount: 2,
  },
  {
    originUrl: "https://www.google.com",
    shortUrl: "cracknose",
    creationDate: "2021-03-05T18:36:59.903Z",
    redirectCount: 0,
  },
];

const urlsToTest = {
  urlInDatabase: "https://www.google.com",
  goodTestUrl: "https://www.facebook.com",
  wontValidateUrl: "https:/www.facebook",
  notExistingUrl: "https://www.doesnotexist.co.il",
};

beforeAll(async () => {
  await fs.writeFile("testDatabase.json", JSON.stringify(testData, null, 2));
});

afterAll(async () => {
  await fs.writeFile("testDatabase.json", JSON.stringify(testData, null, 2));
});

describe("Get without an short URL provided should return error", () => {
  expect.assertions(1);
  it("fail due to no short URL", async () => {
    const response = await request.get("/api/littlelink/");
    expect(response.status).toBe(404);
    expect(JSON.parse(response.text)).toStrictEqual({
      error: "Error No shortUrl given",
    });
  });
});

describe("Get by short url should redirect", () => {
  expect.assertions(2);
  it("Success redirect", async () => {
    const response = await request.get("/api/littlelink/cracknose");
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(urlsToTest.urlInDatabase);
  });

  it("fail due to non existing shorturl", async () => {
    expect.assertions(1);
    const response = await request.get("/api/littlelink/notexisitingurl");
    expect(response.status).toBe(404);
  });
});

describe("POST of URL to new should add it to the database", () => {
  it("Success POST", async () => {
    expect.assertions(2);
    const response = await request
      .post("/api/littlelink/new")
      .type("form")
      .send({ url: urlsToTest.goodTestUrl });
    expect(response.status).toBe(200);
    const urlData = await DataBase.readDataBaseByUrl(
      urlsToTest.goodTestUrl,
      true
    );
    expect(urlData[0].originUrl).toBe(urlsToTest.goodTestUrl);
  });

  it("POST url already in database, should return proper data", async () => {
    expect.assertions(2);
    const response = await request
      .post("/api/littlelink/new")
      .type("form")
      .send({ url: urlsToTest.urlInDatabase });
    expect(response.status).toBe(200);
    expect(response.body[0].originUrl).toBe(urlsToTest.urlInDatabase);
  });

  it("POST invalid url, should return error", async () => {
    expect.assertions(3);
    const response = await request
      .post("/api/littlelink/new")
      .type("form")
      .send({ url: urlsToTest.wontValidateUrl });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Bad URL entered");
    expect(response.body.success).toBe(false);
  });
});
