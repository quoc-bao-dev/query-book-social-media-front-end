import { formatDistanceToNow, isValid, parseISO } from 'date-fns';

export function isValidDate(date: any): boolean {
  if (date instanceof Date) {
    return isValid(date); // Kiểm tra nếu là đối tượng Date hợp lệ
  }

  if (typeof date === 'string') {
    const parsedDate = parseISO(date);
    return isValid(parsedDate) && date === parsedDate.toISOString();
  }

  return false; // Không phải Date hoặc chuỗi ngày hợp lệ
}

export const toDuration = (date: string): string => {
  if (!date) return 'Invalid date';

  try {
    const parsedDate = parseISO(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch (error: any) {
    return 'Invalid date';
  }
};
