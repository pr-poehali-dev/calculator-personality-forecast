export interface TaroResult {
  birthDate: string;
  taroCode: string;
  destinyCards: string[];
  thirdDestinyCard: string;
  resourceCard: string;
  mainLessonCard: string;
  lifeResultCard: string;
  lifePeriods: LifePeriod[];
  karmaCards: string[];
  destinyAtmosphere: string;
  karmaAtmosphere: string;
  currentPeriod: number;
  gifts: string[];
  obstacles: string[];
  cardGender: 'мужских' | 'женских';
  positiveSwitch: string;
  negativeSwitch: string;
  pastLifeWho: string;
  pastLifeWhat: string;
  pastLifeGoals: string;
  pastLifeEnd: string;
  pastLifeMistake: string;
  destinyBurden: string;
  resourceBurden: string;
  giftsBurden: string;
  obstaclesBurden: string;
  periodsBurden: string;
  personalityPortrait: PersonalityPosition[];
  position12: string;
  position13: string;
  position14: string;
  position36: string;
  karmicPositions: KarmicPosition[];
  shadowPositions: ShadowPosition[];
  additionalShadowPositions: AdditionalShadowPosition[];
  higherPortrait: HigherPosition[];
  psychomatrix: Psychomatrix;
}

export interface LifePeriod {
  period: number;
  ageRange: string;
  card: string;
}

export interface PersonalityPosition {
  position: number;
  card: string;
  description: string;
}

export interface KarmicPosition {
  position: number;
  card: string;
  description: string;
}

export interface ShadowPosition {
  position: string;
  positionNumber: number;
  card: string;
  description: string;
}

export interface AdditionalShadowPosition {
  position: string;
  card: string;
  description: string;
}

export interface HigherPosition {
  position: number;
  card: string;
  description: string;
}

export interface Psychomatrix {
  code1: { number: number; description: string };
  code2: { number: number; description: string };
  code3: { number: number; description: string };
  code4: { number: number; description: string };
  mainMission: string;
  ancestralMission: string;
}

const ARCANA_NAMES: { [key: number]: string } = {
  0: "0 Шут",
  1: "I Маг",
  2: "II Верховная Жрица",
  3: "III Императрица",
  4: "IV Император",
  5: "V Верховный Жрец",
  6: "VI Влюбленные",
  7: "VII Колесница",
  8: "VIII Сила",
  9: "IX Отшельник",
  10: "X Колесо Фортуны",
  11: "XI Справедливость",
  12: "XII Повешенный",
  13: "XIII Смерть",
  14: "XIV Умеренность",
  15: "XV Дьявол",
  16: "XVI Башня",
  17: "XVII Звезда",
  18: "XVIII Луна",
  19: "XIX Солнце",
  20: "XX Суд",
  21: "XXI Мир",
  22: "XXII Шут"
};

function reduceToArcana(num: number): number {
  while (num > 22) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num === 0 ? 22 : num;
}

function getArcanaName(num: number): string {
  return ARCANA_NAMES[num] || `${num} Аркан`;
}

export function calculateTaroCode(birthDate: Date): TaroResult {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  const sum1 = day + month + year;
  const card1 = reduceToArcana(sum1);
  
  const sum2 = day + month;
  const card2 = reduceToArcana(sum2);
  
  const card3 = reduceToArcana(Math.abs(card1 - card2));

  const taroCode = `${card1}.${card2}.${card3}`;
  
  const destinyCard1 = reduceToArcana(card1 + card2);
  const destinyCard2 = card3;
  
  const thirdDestinyCard = reduceToArcana(card1 + card2 + card3);
  const resourceCard = reduceToArcana(day + month + card1);
  const mainLessonCard = reduceToArcana(destinyCard1 + thirdDestinyCard);
  const lifeResultCard = reduceToArcana(card1 + card2 + card3 + day);

  const age = new Date().getFullYear() - year;
  const lifePeriods: LifePeriod[] = [
    { period: 1, ageRange: `0 — ${Math.floor(age / 4)}`, card: getArcanaName(reduceToArcana(day)) },
    { period: 2, ageRange: `${Math.floor(age / 4)} — ${Math.floor(age / 2)}`, card: getArcanaName(reduceToArcana(month)) },
    { period: 3, ageRange: `${Math.floor(age / 2)} — ${Math.floor(age * 3 / 4)}`, card: getArcanaName(reduceToArcana(year % 100)) },
    { period: 4, ageRange: `${Math.floor(age * 3 / 4)} — конец жизни`, card: getArcanaName(card1) }
  ];

  const currentPeriod = age < Math.floor(age / 4) ? 1 : age < Math.floor(age / 2) ? 2 : age < Math.floor(age * 3 / 4) ? 3 : 4;

  const karmaCards = [
    getArcanaName(reduceToArcana(card1 + 5)),
    getArcanaName(reduceToArcana(card2 + 7))
  ];

  const gifts = [getArcanaName(reduceToArcana(day + month + 3))];
  const obstacles = [getArcanaName(reduceToArcana(year % 100 + 2))];

  const femaleCards = [2, 3, 8, 11, 14, 17, 18];
  const cardGender = femaleCards.includes(card1) ? 'женских' : 'мужских';

  const personalityPortrait: PersonalityPosition[] = [
    { position: 1, card: getArcanaName(reduceToArcana(day)), description: 'детство, юность, первый период жизни' },
    { position: 2, card: getArcanaName(reduceToArcana(month)), description: 'взрослый период жизни, зрелый возраст' },
    { position: 3, card: getArcanaName(card1), description: 'итог жизни, конечная цель' },
    { position: 4, card: getArcanaName(reduceToArcana(year % 100)), description: 'слабая позиция, комплексы, страхи, подсознание' },
    { position: 5, card: getArcanaName(card2), description: 'сознание, укрепляющая позиция, стремления, цели' },
    { position: 6, card: getArcanaName(card3), description: 'влияние на человека, скрытые способности, высшие покровители' },
    { position: 7, card: getArcanaName(destinyCard1), description: 'Миссия, главная задача в жизни' },
    { position: 8, card: getArcanaName(thirdDestinyCard), description: 'Способ выполнения миссии и главной задачи' }
  ];

  const karmicPositions: KarmicPosition[] = [
    { position: 9, card: getArcanaName(reduceToArcana(card1 + 9)), description: 'Показывает, кем человек был в предыдущем воплощении' },
    { position: 10, card: getArcanaName(reduceToArcana(card2 + 10)), description: 'Что делал человек в предыдущем воплощении' },
    { position: 11, card: getArcanaName(reduceToArcana(card3 + 11)), description: 'Какие цели, которые человек ставил перед собой в прошлой жизни' },
    { position: 15, card: getArcanaName(reduceToArcana(card1 + card2 + 15)), description: 'Данная позиция показывает, как отработать карму' },
    { position: 16, card: getArcanaName(reduceToArcana(day + month + 16)), description: 'Точка цикличности. Кармические грабли' },
    { position: 17, card: getArcanaName(reduceToArcana(card1 + card3)), description: 'Точка кармического комфорта и баланса' },
    { position: 18, card: getArcanaName(reduceToArcana(destinyCard1 + 3)), description: 'Способы работы с миссией в текущем воплощении' },
    { position: 35, card: getArcanaName(reduceToArcana(card1 + card2 + card3 + 5)), description: 'Показывает, как человек относится к своей собственной карме' }
  ];

  const shadowPositions: ShadowPosition[] = [
    { position: 'A', positionNumber: 22, card: getArcanaName(reduceToArcana(year % 100 + day)), description: 'Позиция показывает, что имеет наибольшее влияние на человека с подсознательного уровня' },
    { position: 'B', positionNumber: 23, card: getArcanaName(reduceToArcana(day + month + year % 100)), description: 'Травмированная часть нашей психики, основная травма детства, болевая энергия внутри вас' },
    { position: 'C', positionNumber: 24, card: getArcanaName(reduceToArcana(card2 + card3)), description: 'Вытесненная и неосознаваемая самая главная потребность в жизни' },
    { position: 'D', positionNumber: 25, card: getArcanaName(reduceToArcana(card1 + year % 100)), description: 'Показывает, как себя будет вести человек в состоянии аффекта, в стрессовых ситуациях' },
    { position: 'E', positionNumber: 26, card: getArcanaName(reduceToArcana(card1 + card2 + day)), description: 'Компульсивное поведение, как человек проживает свою тревогу и стресс на автомате' },
    { position: 'F', positionNumber: 27, card: getArcanaName(reduceToArcana(month + year % 100)), description: 'Часть, которую наша психика отвергает, что человек категорически не хочет признавать в себе' },
    { position: 'G', positionNumber: 28, card: getArcanaName(reduceToArcana(card1 + card3 + 5)), description: 'Чего может достичь человек, если на полную реализует свой потенциал. Сверхмиссия' },
    { position: 'H', positionNumber: 29, card: getArcanaName(reduceToArcana(card1 + card2 + card3 + 10)), description: 'Показывает сферу, в которой происходят разрушения' }
  ];

  const additionalShadowPositions: AdditionalShadowPosition[] = [
    { position: 'I', card: getArcanaName(reduceToArcana(day + card1)), description: 'Показывает «волшебный пинок», то, что даст человеку мощный заряд для дальнейшего развития' },
    { position: 'J', card: getArcanaName(reduceToArcana(month + card2)), description: 'Показывает через что можно достучаться до человека, какие слова сказать' },
    { position: 'K', card: getArcanaName(reduceToArcana(card1 + card2 + 8)), description: 'Показывает, что разрушает психику, что не дает избавиться от кармических долгов' },
    { position: 'T2', card: getArcanaName(reduceToArcana(card3 + year % 100)), description: 'Мощный поток энергии из бессознательного, который спрятан и может прорваться' }
  ];

  const higherPortrait: HigherPosition[] = [
    { position: 19, card: getArcanaName(reduceToArcana(card1 + 19)), description: 'То, что находится вне сознания человека' },
    { position: 20, card: getArcanaName(reduceToArcana(card2 + 20)), description: 'Через что может произойти контакт с Высшим Я' },
    { position: 21, card: getArcanaName(reduceToArcana(card1 + card2 + 21)), description: 'Самое главное в жизни для человека. Но здесь и самая большая ответственность' },
    { position: 30, card: getArcanaName(reduceToArcana(day + month + 8)), description: 'Точка психического дискомфорта. То, что человека раздражает' },
    { position: 31, card: getArcanaName(reduceToArcana(card1 + card3)), description: 'Судьба. Фундамент жизни' },
    { position: 32, card: getArcanaName(reduceToArcana(day + card2)), description: 'Отношение человека к деньгам. Здесь кроется, что мешает человеку иметь деньги' },
    { position: 33, card: getArcanaName(reduceToArcana(month + card1)), description: 'Отношение человека к партнерству и отношениям' },
    { position: 34, card: getArcanaName(reduceToArcana(year % 100 + card3)), description: 'Отношение человека к семье и традициям' }
  ];

  const code1Value = reduceToArcana(day + month + year);
  const code2Value = reduceToArcana(code1Value);
  const code3Value = reduceToArcana(day + month);
  const code4Value = reduceToArcana(code3Value);

  return {
    birthDate: `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`,
    taroCode,
    destinyCards: [getArcanaName(destinyCard1), getArcanaName(destinyCard2)],
    thirdDestinyCard: getArcanaName(thirdDestinyCard),
    resourceCard: getArcanaName(resourceCard),
    mainLessonCard: getArcanaName(mainLessonCard),
    lifeResultCard: getArcanaName(lifeResultCard),
    lifePeriods,
    karmaCards,
    destinyAtmosphere: getArcanaName(reduceToArcana(destinyCard1 + 1)),
    karmaAtmosphere: getArcanaName(reduceToArcana(card3 + 2)),
    currentPeriod,
    gifts,
    obstacles,
    cardGender,
    positiveSwitch: getArcanaName(reduceToArcana(card1 + 4)),
    negativeSwitch: getArcanaName(reduceToArcana(card2 + 6)),
    pastLifeWho: getArcanaName(reduceToArcana(day + 9)),
    pastLifeWhat: getArcanaName(reduceToArcana(month + 10)),
    pastLifeGoals: getArcanaName(reduceToArcana(year % 100 + 11)),
    pastLifeEnd: getArcanaName(reduceToArcana(card1 + card2 + 13)),
    pastLifeMistake: getArcanaName(reduceToArcana(card3 + 14)),
    destinyBurden: Math.random() > 0.7 ? getArcanaName(reduceToArcana(card1 + 15)) : 'Нет',
    resourceBurden: Math.random() > 0.7 ? getArcanaName(reduceToArcana(card2 + 16)) : 'Нет',
    giftsBurden: Math.random() > 0.7 ? getArcanaName(reduceToArcana(card3 + 17)) : 'Нет',
    obstaclesBurden: Math.random() > 0.7 ? getArcanaName(reduceToArcana(day + 18)) : 'Нет',
    periodsBurden: Math.random() > 0.7 ? getArcanaName(reduceToArcana(month + 19)) : 'Нет',
    personalityPortrait,
    position12: getArcanaName(reduceToArcana(card1 + card2 + card3 + 12)),
    position13: getArcanaName(reduceToArcana(day + card1)),
    position14: getArcanaName(reduceToArcana(month + card2)),
    position36: getArcanaName(reduceToArcana(card1 + card2 + card3 + 14)),
    karmicPositions,
    shadowPositions,
    additionalShadowPositions,
    higherPortrait,
    psychomatrix: {
      code1: { number: code1Value, description: `${code1Value}. Урок признания` },
      code2: { number: code2Value, description: `${code2Value}. Защита супружеских отношений` },
      code3: { number: code3Value, description: `${code3Value}. Родовая задача` },
      code4: { number: code4Value, description: `${code4Value}. Родовая миссия` },
      mainMission: getArcanaName(code2Value),
      ancestralMission: getArcanaName(code4Value)
    }
  };
}
