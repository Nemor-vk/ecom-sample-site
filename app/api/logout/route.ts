import { sessionOptions } from "@/lib/config/ironSessionConfig";
import { getIronSession, IronSessionData } from "iron-session";
import { cookies } from "next/headers";

export async function POST() {
  // const ironSession = await getIronSessionDecodedCookie();
  const ironSession = await getIronSession<IronSessionData>(await cookies(), sessionOptions);
  ironSession.destroy(); // This clears the session cookie

  console.log("iron session after delete at api ", ironSession )

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store', // 👈 prevent caching
      'Set-Cookie': 'user_session_vk'

    }
  });
}
