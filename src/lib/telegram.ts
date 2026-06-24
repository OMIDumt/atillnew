export const TELEGRAM_USERNAME = "MahdiPourabdollah_Ai";
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;

export const telegramBuyLink = (subject: string) =>
  `${TELEGRAM_URL}?text=${encodeURIComponent(`سلام، برای خرید/سفارش «${subject}» در ATiLLAi.com تماس می‌گیرم.`)}`;
