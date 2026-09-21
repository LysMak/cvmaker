/** Formats a phone number as the user types into "+xxx xxx xxx xxx". */
export function formatPhone(value: string): string {
  const hasDigits = /\d/.test(value);
  const digits = value.replace(/\D/g, '').slice(0, 12);
  if (!hasDigits) return value.trim().startsWith('+') ? '+' : '';

  const groups = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9), digits.slice(9, 12)].filter(Boolean);
  return `+${groups.join(' ')}`;
}
