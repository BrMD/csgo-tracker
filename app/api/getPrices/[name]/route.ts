import { NextApiRequest } from "next";

export const GET = async (request: NextApiRequest, { params }: any) => {
  try {
    const res = await fetch(
      `http://csgobackpack.net/api/GetItemPrice/?currency=USD&id=${params.name}`
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
