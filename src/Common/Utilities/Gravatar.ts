export function generateGravatarImageUrl(cdnUrl: string, emailHash: string, size = 512) {
  return emailHash ? `${cdnUrl}/${emailHash}?s=${size}&d=404` : null;
}
