import { serve } from "bun";
import path from "node:path";

import index from "./index.html";

const server = serve({
  port: 3000,
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        // console.log("import.meta.dir", import.meta.dir);
        // const file = Bun.file(path.join(import.meta.dir, "some-data.json"));
        // console.log("bruh", file);
        // const data = await file.json();

        // console.log("bruh data", data);
        return Response.json({
          message: "Hello world from Vercel Bun!",
          bunVersion: Bun.version,
          method: "GET",
          // data,
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
        bunVersion: Bun.version,
      });
    },
  },

  development: {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log("Server running on port", server.url.toString());
