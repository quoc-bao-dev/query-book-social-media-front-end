/**
 * Hàm trích xuất hashtag từ nội dung
 * @param {string} content - Nội dung văn bản cần lấy hashtag
 * @returns {string[]} - Danh sách hashtag
 */
export function extractHashtags(content: string) {
  if (typeof content !== 'string') {
    throw new Error('Nội dung phải là một chuỗi!');
  }

  // Regex tìm các hashtag (bắt đầu bằng #, theo sau là các chữ cái, số hoặc _)
  const hashtagRegex = /#\w+/g;

  // Sử dụng match để tìm các hashtag
  const hashtags = content.match(hashtagRegex);

  // Trả về mảng hashtag, nếu không có thì trả về mảng rỗng
  return hashtags?.map((hashtag) => hashtag.slice(1)) || [];
}
