import qs from "qs";

export type QueryStyle =
  | "form"
  | "spaceDelimited"
  | "pipeDelimited"
  | "deepObject";
export interface EncodeQueryParamProps {
  name: string;
  value: any;
  style: QueryStyle;
  explode: boolean;
}

export function encodeQueryParam({
  name,
  value,
  style,
  explode,
}: EncodeQueryParamProps): string {
  switch (style) {
    case "form":
      return encodeForm(name, value, explode);
    case "spaceDelimited":
      return encodeSpaceDelimited(name, value, explode);
    case "pipeDelimited":
      return encodePipeDelimited(name, value, explode);
    case "deepObject":
      return encodeDeepObj(name, value, explode);
    default:
      throw new Error(`query param style '${style}' not implemented`);
  }
}

function encodeForm(name: string, value: any, explode: boolean): string {
  if (Array.isArray(value)) {
    return qs.stringify(
      { [name]: value },
      { arrayFormat: explode ? "repeat" : "comma" },
    );
  } else if (typeof value === "object" && value != null) {
    if (explode) {
      // explode form objects should be encoded like /users?key0=val0&key1=val1
      // the input param name will be omitted
      return Object.entries(value)
        .map(([k, v]) => qs.stringify({ [k]: v }))
        .join("&");
    } else {
      // non-explode form objects should be encoded like /users?id=key0,val0,key1,val1
      return qs.stringify(
        { [name]: Object.entries(value).flat() },
        { arrayFormat: "comma" },
      );
    }
  } else {
    return qs.stringify({ [name]: value });
  }
}

function encodeSpaceDelimited(
  name: string,
  value: any,
  explode: boolean,
): string {
  if (Array.isArray(value) && !explode) {
    // non-explode spaceDelimited arrays should be encoded like /users?id=3%204%205
    return qs.stringify({ [name]: value.map((v) => String(v)).join(" ") });
  } else {
    // according to the docs, spaceDelimited + explode=false only effects lists,
    // all other encodings are marked as n/a or are the same as `form` style
    // fall back on form style as it is the default for query params
    return encodeForm(name, value, explode);
  }
}

function encodePipeDelimited(
  name: string,
  value: any,
  explode: boolean,
): string {
  if (Array.isArray(value) && !explode) {
    // non-explode pipeDelimited arrays should be encoded like /users?id=3|4|5
    return qs.stringify({ [name]: value.map((v) => String(v)).join("|") });
  } else {
    // according to the docs, spaceDelimited + explode=false only effects lists,
    // all other encodings are marked as n/a or are the same as `form` style
    // fall back on form style as it is the default for query params
    return encodeForm(name, value, explode);
  }
}

function encodeDeepObj(name: string, value: any, explode: boolean): string {
  if ((Array.isArray(value) || typeof value === "object") && value != null) {
    return qs.stringify({ [name]: value });
  } else {
    // according to the docs, deepObject style only applies to
    // object encodes, encodings for primitives & arrays are listed as n/a,
    // fall back on form style as it is the default for query params
    return encodeForm(name, value, explode);
  }
}
