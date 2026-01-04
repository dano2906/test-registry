export default {
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (url.pathname === "/health") {
      return new Response("OK", {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
    }
  },
};
