// use a pattern to match json content type to handle
// base case of application/json as well as vendor specific
// headers e.g. application/vnd.github+json
export const JSON_PATTERN = /^application\/(.+\+)?json/;

// use a pattern to match text types to handle base case
// of text/plain as well as more specific cases e.g. text/html
export const TEXT_PATTERN = /^text\/(.+)/;

export const MULTIPART_FORM = "multipart/form-data";

export const URL_FORM = "application/x-www-form-urlencoded";
