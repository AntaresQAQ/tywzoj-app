export type IGravatarDefaultImage =
  | "404"
  | "mp"
  | "identicon"
  | "monsterid"
  | "wavatar"
  | "retro"
  | "robohash"
  | "blank";

export function generateGravatarImageUrl(
  cdnUrl: string,
  emailHash: string,
  size = 512,
  defaultImage: IGravatarDefaultImage = "404",
) {
  if (!emailHash) return null;
  if (cdnUrl.endsWith("/")) cdnUrl = cdnUrl.substring(0, cdnUrl.length - 1);
  return `${cdnUrl}/${emailHash}?s=${size}&d=${defaultImage}`;
}
