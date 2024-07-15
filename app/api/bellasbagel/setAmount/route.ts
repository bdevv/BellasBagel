import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
// Config CORS
// ========================================================
/**
 *
 * @param origin
 * @returns
 */
const getCorsHeaders = (origin: string) => {
  // Default options
  const headers = {
    "Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
    "Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
    "Access-Control-Allow-Origin": `*`,
  };

  // If no allowed origin is set to default server origin
  if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

  // If allowed origin is set, check if origin is in allowed origins
  const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

  // Validate server origin
  if (allowedOrigins.includes("*")) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  // Return result
  return headers;
};

// Endpoints
// ========================================================
/**
 * Basic OPTIONS Request to simuluate OPTIONS preflight request for mutative requests
 */
export const OPTIONS = async (request: NextRequest) => {
  // Return Response
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: getCorsHeaders(request.headers.get("origin") || ""),
    }
  );
};
export const POST = async (req: NextRequest, res: NextResponse) => {
  const apiKey = process.env.WEBFLOW_API_KEY;
  try {
    const reqData = await req.json();
    const response = await axios.patch(
      "https://api.webflow.com/v2/collections/" +
        reqData.collectionId +
        "/items/" +
        reqData.itemId,
      {
        fieldData: {
          amount: reqData.bagelamount,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
          // Add more headers as needed
        },
      }
    );
    const data = response.data;
    return NextResponse.json(
      { bagelamount: data.fieldData.amount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
