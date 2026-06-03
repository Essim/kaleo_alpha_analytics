const REALM = "Kaleotopia Analytics";

function unauthorized(message = "Authentication required") {
  return new Response(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store"
    }
  });
}

function decodeBasicAuth(header) {
  if (!header || !header.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    if (separator === -1) return null;
    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1)
    };
  } catch {
    return null;
  }
}

function constantTimeEqual(a, b) {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  let diff = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let i = 0; i < length; i += 1) {
    diff |= (left[i] || 0) ^ (right[i] || 0);
  }
  return diff === 0;
}

export default {
  async fetch(request, env) {
    const password = env.ACCESS_PASSWORD;
    if (!password) {
      return new Response("ACCESS_PASSWORD is not configured.", {
        status: 503,
        headers: { "Cache-Control": "no-store" }
      });
    }

    const credentials = decodeBasicAuth(request.headers.get("Authorization"));
    if (!credentials || !constantTimeEqual(credentials.password, password)) {
      return unauthorized();
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    headers.set("Referrer-Policy", "no-referrer");
    headers.set("X-Content-Type-Options", "nosniff");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
