const supertest = require("supertest");
const app = require("./app");
const request = supertest(app);
const LittleLink = require('./api/littleLink.js');
const stats = require('./api/littleLink.js');
const fs = require("fs").promises;

const testDataBase = [
    {
      "originUrl": "https://www.ynet.co.il",
      "shortUrl": "hairsince",
      "creationDate": "2021-03-05T18:36:48.962Z",
      "redirectCount": 2
    },
    {
      "originUrl": "https://www.google.com",
      "shortUrl": "cracknose",
      "creationDate": "2021-03-05T18:36:59.903Z",
      "redirectCount": 0
    }
  ]

beforeAll(async () => {
    await fs.writeFile("./testdata.json", testDataBase);
  });

  describe("Get by short url should redirect", () => {
    it("Success redirect", async () => {
        const response = await request.get('/api/littlelink/').type('form').send({url:"https://www.youtube.com/"});
        expect(response.status).toBe(201);
    });
    it("The URL is illegal", async () => {
        const response = await request.post('/api/shorturl/new').type('form').send({url:"utubecom/?hl=iw&gl=IL"});
        expect(response.status).toBe(400);
    });
    it("Corrupted file in server", async () => {
        await fs.writeFile("./backend/testdata.json", "[");
        const response = await request.post('/api/shorturl/new').type('form').send({url:"https://www.youtube.com/"});
        expect(response.status).toBe(500);
    });
});

