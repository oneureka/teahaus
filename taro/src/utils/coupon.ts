export function getDaysUntilExpire(expireDate: string): number {
  const expire = new Date(expireDate);
  const now = new Date();
  return Math.floor(
    (expire.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function isExpiringSoon(expireDate: string): boolean {
  const days = getDaysUntilExpire(expireDate);
  return days <= 30 && days >= 0;
}

export function isExpired(expireDate: string): boolean {
  return getDaysUntilExpire(expireDate) < 0;
}
