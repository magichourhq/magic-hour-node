export interface Runtime {
  type: "browser" | "node" | "unknown";
}

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";
const isNode =
  typeof process !== "undefined" &&
  Boolean(process.version) &&
  Boolean(process.versions?.node);

function getRuntime(): Runtime {
  if (isBrowser) {
    return { type: "browser" };
  } else if (isNode) {
    return { type: "node" };
  } else {
    return { type: "unknown" };
  }
}

export const RUNTIME = getRuntime();
