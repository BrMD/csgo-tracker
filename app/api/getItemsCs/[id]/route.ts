import { NextApiRequest } from "next";

export const GET = async (request: NextApiRequest, { params }: any) => {
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

// NAO MEXER NESSA PORRA PQ TA FUNCIONANDO MEU DEUS DO CEU FIQUEI 3 OU MAIS DIAS BATENDO NESSA MERDA ARIGATO
// export const GET = async (request: NextApiRequest) => {
//   const res = await fetch(
//     "https://steamcommunity.com/inventory/76561198275489648/730/2"
//   );
//   console.log(res);
//   const data = await res.json();
//   console.log(data);
//   return new Response(JSON.stringify(data));
// };
