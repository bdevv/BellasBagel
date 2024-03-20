const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const apiToken =
  "cc5d048b20458561d8f5a15c42c26cf537f4bc67075188b2b399dcaa7173cce7";
app.post("/api/getAmount", async (req, res) => {
  try {
    const { collectionId, itemId } = req.body;
    const response = await axios.get(
      "https://api.webflow.com/v2/collections/" +
        collectionId +
        "/items/" +
        itemId,
      {
        headers: {
          Authorization: "Bearer " + apiToken,
          "Content-Type": "application/json",
          // Add more headers as needed
        },
      }
    );
    const data = response.data;
    res.json({ bagelamount: data.fieldData.amount });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.post("/api/setAmount", async (req, res) => {
  try {
    const { bagelamount, collectionId, itemId } = req.body;
    const response = await axios.patch(
      "https://api.webflow.com/v2/collections/" +
        collectionId +
        "/items/" +
        itemId,
      {
        fieldData: {
          amount: bagelamount,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + apiToken,
          "Content-Type": "application/json",
          Accept: "application/json",
          // Add more headers as needed
        },
      }
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
const port = 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
