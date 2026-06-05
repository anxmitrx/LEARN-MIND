const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // We will lock this down later
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    // Handle OPTIONS requests (CORS preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    return new Response("Hello from Cloudflare Worker!", {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain",
      },
    });
  },
};
