const supertest = require("supertest");
const app = require("./app");
const request = supertest(app);
const LittleLink = require("./api/littleLink.js");
const stats = require("./api/littleLink.js");
const fs = require("fs").promises;

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

beforeAll(async () => {
  await fs.writeFile("testDatabase.json", JSON.stringify(testData, null, 2));
});

describe("Get by short url should redirect", () => {
  it("Success redirect", async () => {
    const response = await request.get("/api/littlelink/hairsince");
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("https://www.ynet.co.il");
  });
  it("fail due to non existing shorturl", async () => {
    const response = await request.get("/api/littlelink/notexisitingurl");
    expect(response.status).toBe(404);
  });
});
// it("Corrupted file in server", async () => {
//     await fs.writeFile("./backend/testdata.json", "[");
//     const response = await request.post('/api/shorturl/new').type('form').send({url:"https://www.youtube.com/"});
//     expect(response.status).toBe(500);
// });
