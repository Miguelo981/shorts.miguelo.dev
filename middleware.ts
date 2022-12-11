import { NextRequest, NextResponse } from "next/server";
import Web3Token from "web3-token";
import { TOKEN_COOKIE_NAME } from "./config/auth";
import { ShortURLStatus } from "./models/shortUrl.model";
import { getOriginalShortURL } from "./services/short-api";


export async function middleware(req: NextRequest) {
    const token = req.cookies.get(TOKEN_COOKIE_NAME);
    const url = req.nextUrl.clone()

    if (req.nextUrl.pathname.startsWith('/link')) {
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.redirect(url.origin)
        }

        const res = await getOriginalShortURL(id);

        if (res.error) {
            return NextResponse.redirect(url.origin);
        }

        if (res.status < ShortURLStatus.Published) {
            return NextResponse.redirect(url.origin + '/app');
        }

        return NextResponse.redirect(res.originalURL);
    }

    if (req.nextUrl.pathname.startsWith('/app')) {
        if (!token) {
            url.pathname = '/'
            return NextResponse.redirect(url);
        }
    
        const { address } = await Web3Token.verify(token.value);
    
        if (!address) {
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }

    //res.cookies.set(TOKEN_COOKIE_NAME, token.value);
    return NextResponse.next();
}