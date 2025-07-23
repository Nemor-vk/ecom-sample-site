import { envConfig } from "@/lib/envConfig"
import ImageKit  from "imagekit"
import { NextResponse } from "next/server";


const {env : { imageKit : {privateKey, publicKey, url}}} = envConfig;

const imagekit = new ImageKit({
  publicKey: publicKey,
  urlEndpoint: url,
  privateKey: privateKey
});



export async function GET() {

    try {
        const authParams = imagekit.getAuthenticationParameters();
        return NextResponse.json(authParams);
    } catch (error) {
        return NextResponse.json({text: 'Authentication failed for imageKit'}, {status:500})
    }
}