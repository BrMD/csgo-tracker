// import toast from "react-toastify";

// export default async function getItemsCs({
//   steamId,
//   toDo,
// }: {
//   steamId: String;
//   toDo: Number;
// }) {
//   const res = await fetch(`/api/getItemsCs/${steamId}`);
//   const data = await res.json();

//   if (data === null) {
//     return toast.error(
//       "Error on getting Data from your Steam, please try again with a valid SteamID",
//       {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 4000,
//       }
//     );
//   }

//   const { success } = data;
//   if (success === 1) {
//     toast.success("Data retrieved successfully", {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: 1000,
//     });
//     setTimeout(() => {
//       router.push(`api/ListItems/${steamId}`);
//     }, 2000);
//   }
// }
