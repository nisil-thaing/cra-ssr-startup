export const SUPPORTED_LANGUAGE_CODES = {
  ENGLISH: 'en',
  VIETNAMESE: 'vn',
  CHINESE_SIMPLIFY: 'cn',
  ARABIC: 'ar'
};

export const TEXT_DIRECTIONS = {
  LEFT_TO_RIGHT: 'ltr',
  RIGHT_TO_LEFT: 'rtl'
};

export const SUPPORTED_LANGUAGES = [
  {
    value: SUPPORTED_LANGUAGE_CODES.ENGLISH,
    label: 'English',
    direction: TEXT_DIRECTIONS.LEFT_TO_RIGHT
  },
  {
    value: SUPPORTED_LANGUAGE_CODES.VIETNAMESE,
    label: 'Tiếng Việt',
    direction: TEXT_DIRECTIONS.LEFT_TO_RIGHT
  },
  {
    value: SUPPORTED_LANGUAGE_CODES.CHINESE_SIMPLIFY,
    label: '简体中文',
    direction: TEXT_DIRECTIONS.LEFT_TO_RIGHT
  },
  {
    value: SUPPORTED_LANGUAGE_CODES.ARABIC,
    label: 'عربى',
    direction: TEXT_DIRECTIONS.RIGHT_TO_LEFT
  }
];
