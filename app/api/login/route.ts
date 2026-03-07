import { getIronSession, IronSessionData } from "iron-session";
import { cookies, headers } from "next/headers";
import { sessionOptions } from "@/lib/config/ironSessionConfig";
import { Session, User } from "next-auth";
import {  } from "@/lib/ironSession";
import { auth } from "@/lib/config/auth.config";

export async function POST(req: Request) {

  // 🧊 Save to iron-session
  const ironSession = await saveUserSessionToIronSession();
  // const result = await ironSession.save().finally( () => console.log("iron session - after save SESSION DATA ::", ironSession));
  // const session = await createIronSession(await req.json())
  console.log("IRON SESSION - AT API :", ironSession);

  return new Response(JSON.stringify({ success: true, ironSession:ironSession }),{
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// export async function DELETE() {
//   // const ironSession = await getIronSessionDecodedCookie();
//   const ironSession = await getIronSession<IronSessionData>(await cookies(), sessionOptions);
//   ironSession.destroy(); // This clears the session cookie

//   console.log("iron session after delete at api ", ironSession )

//   return new Response(JSON.stringify({ success: true }), {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/json',
//       'Cache-Control': 'no-store', // 👈 prevent caching
//       'Set-Cookie': 'user_session_vk'

//     }
//   });
// }

const saveUserSessionToIronSession = async(): Promise<IronSessionData> => {
  
  const ironSession = await getIronSession<IronSessionData>(await cookies(), sessionOptions);
  const authSession = await auth();
  console.log("iron session - AUTH SESSION DATA ::", authSession)

  if(authSession?.user) {
    ironSession.user = authSession?.user;
    ironSession.isAuthenticated = true;
  } else {
    ironSession.isAuthenticated = false
  }

  const result = await ironSession.save().finally( () => console.log("iron session - after save SESSION DATA ::", ironSession));
  // console.log("iron session - after save SESSION DATA ::", ironSession)

  return ironSession;
}

