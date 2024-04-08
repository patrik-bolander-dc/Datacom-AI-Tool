export async function POST(request: Request) {

    const ifError = false
    if (ifError) {
        return new Response("Failed to process file", { status: 500 });
    } 
    
    return new Response("File Uploaded", { status: 200 });
    
}

export async function GET(request: Request) {
    return new Response("Hello World!", { status: 200 });
}