import { NextRequest } from "next";

export const GET = async (request: NextRequest, { params }: any) => {
  try {
    const res = await fetch(
      `https://steamcommunity.com/inventory/${params.id}/730/2`
    );

    const data = await res.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

