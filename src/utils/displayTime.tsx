export const displayTime = (created: number) => {
  const time = new Date(created * 1000);
  let hoursTime = time.getHours();
  let textTime = ``;
  switch (hoursTime) {
    case 0: {
      hoursTime = time.getMinutes();
      if ((hoursTime = 1 || 21 || 31 || 41 || 51)) {
        textTime = `минуту назад`;
        return `${hoursTime} ${textTime}`;
      } else if (
        (hoursTime =
          2 ||
          3 ||
          4 ||
          22 ||
          23 ||
          24 ||
          32 ||
          33 ||
          34 ||
          42 ||
          43 ||
          44 ||
          52 ||
          53 ||
          54)
      ) {
        textTime = `минуты назад`;
        return `${hoursTime} ${textTime}`;
      } else {
        textTime = `минут назад`;
        return `${hoursTime} ${textTime}`;
      }
    }
    case 1:
    case 21:
      textTime = 'час назад';
      break;
    case 2:
    case 3:
    case 4:
    case 22:
    case 23:
    case 24:
      textTime = 'часа назад';
      break;
    default:
      textTime = 'часов назад';
      break;
  }
  return `${hoursTime} ${textTime}`;
};
