// Shared deployment constants, so the plugins and the build scripts agree
// on where the site lives.
//
// Defaults point at the Chinese mirror, www.hasscn.top/contributors. The
// environment variables let another deployment, like the upstream root
// deploy, use the same checkout unchanged.

export const SITE_URL = process.env.SITE_URL || "https://www.hasscn.top";
export const BASE_PATH = process.env.SITE_BASE_PATH || "/contributors";
