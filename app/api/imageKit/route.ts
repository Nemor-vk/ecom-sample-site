import { envConfig } from "@/lib/envConfig"
import ImageKit  from "imagekit"
import { NextResponse } from "next/server";


const {env : { imageKit : {privateKey, publicKey, url}}} = envConfig;

const imagekit = new ImageKit({
  publicKey: publicKey,
  urlEndpoint: url,
  privateKey: privateKey
});



// export async function GET() {

//     try {
//         const authParams = imagekit.getAuthenticationParameters();
//         return NextResponse.json(authParams);
//     } catch (error) {
//         return NextResponse.json({text: 'Authentication failed for imageKit'}, {status:500})
//     }
// }

// 

export async function GET() {
  try {
    const imagekit = new ImageKit({
      publicKey: publicKey!,
      privateKey: privateKey!,
      urlEndpoint: url!,
    })

    // Generate authentication parameters
    const authenticationParameters = imagekit.getAuthenticationParameters();

    // Mock response for demo - replace with actual ImageKit auth
    // const authenticationParameters = {
    //   signature: "mock-signature",
    //   expire: Date.now() + 3600000, // 1 hour from now
    //   token: "mock-token",
    // }

    return NextResponse.json(authenticationParameters)
  } catch (error) {
    console.error("ImageKit auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
