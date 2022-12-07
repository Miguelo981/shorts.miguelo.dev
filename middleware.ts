import { NextRequest, NextResponse } from "next/server";
import Web3Token from "web3-token";
import { TOKEN_COOKIE_NAME } from "./config/auth";


export async function middleware(req: NextRequest) {
    const token = req.cookies.get(TOKEN_COOKIE_NAME);
    const url = req.nextUrl.clone()

    /* if (req.nextUrl.pathname.startsWith('/app')) {
        if (!token) {
            url.pathname = '/'
            return NextResponse.redirect(url);
        }
    
        const { address } = await Web3Token.verify(token.value);
    
        if (!address) {
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    } */

    //res.cookies.set(TOKEN_COOKIE_NAME, token.value);
    return NextResponse.next();
}