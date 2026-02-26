import type { RouteQuery } from "./types/route";

export function compilePath(path: string): {
  regex: RegExp;
  paramNames: string[];
} {
  const paramNames: string[] = [];

  // /users/:id/posts/:postId → /users/([^/]+)/posts/([^/]+)
  // /docs/**                 → /docs/(.*)
  const regexStr = path
    .replace(/\*\*/g, "(.*)")
    .replace(/:([^/]+)/g, (_: string, name: string) => {
      paramNames.push(name);
      return "([^/]+)";
    });

  return {
    regex: new RegExp(`^${regexStr}$`),
    paramNames,
  };
}

export function parseQuery(search: string): RouteQuery {
  const query: RouteQuery = {};
  if (!search || search === "?") return query;
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );
  params.forEach((value, key) => {
    query[key] = value;
  });
  return query;
}
