function getRandomData(today, yesterday) {
  //
  // 40% разброс отзначения "сегодня"
  const maxDelta = today * 0.4;

  return Array(5)
    .fill(0)
    .map(() => Math.round(today + (Math.random() > 0.5 ? 1 : -1) * Math.random() * maxDelta))
    .concat([yesterday, today]);
}
