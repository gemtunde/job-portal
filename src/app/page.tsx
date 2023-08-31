//server side rendering
//rendering a server component

//import { Button, Space, message } from "antd";
import axios from "axios";
import { cookies } from "next/headers";

//get user from server
export async function getUser() {
  try {
    const token = cookies().get("token");
    console.log("my token is ", token);
    const response = await axios.get(
      //`${process.env.BASE_URL}/api/users/currentuser`,
      "http://localhost:3000/api/users/currentuser",
      {
        headers: {
          Cookie: `token=${token?.value}`,
        },
      }
    );
    //  return response.data.data;
    return response.data.data;
  } catch (error: any) {
    console.error(error);
  }
}
export default async function Home() {
  //get current users
  const user: any = await getUser();

  return (
    <div>
      <h2>Job portal</h2>
      <p>user name : {user && user.name}</p>
    </div>
  );
}

//use this method for client side rendering or rendering a client component

// "use client";
// import { Button, Space, message } from "antd";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Home() {
//   const [user, setUser] = useState<any>([]);

//   //get current users
//   const getUser = async () => {
//     try {
//       const response = await axios.get("/api/users/currentuser");
//       setUser(response.data.data);
//     } catch (error: any) {
//       message.error(error.response.data.message);
//     }
//   };
//   useEffect(() => {
//     getUser();
//   }, []);

//   return (
//     <div>
//       <h2>Job portal</h2>
//       <p>user name : {user && user.name}</p>

//       <Button type="primary" onClick={() => confirm("are you sure")}>
//         Primary Button
//       </Button>
//     </div>
//   );
// }
