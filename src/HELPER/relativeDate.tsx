export default function relativeDate(date: number) {
  const delta = Math.round(+new Date() / 1000 - date);
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  
  if (delta < 30) {
    return "just now";
  } else if (delta < minute) {
    return delta + " seconds ago";
  } else if (delta < 2 * minute) {
    return "a minute ago";
  } else if (delta < hour) {
    return Math.floor(delta / minute) + " minutes ago";
  } else if (Math.floor(delta / hour) == 1) {
    return "an hour ago";
  } else if (delta < day) {
    return Math.floor(delta / hour) + " hours ago";
  } else if (delta < day * 2) {
    return "yesterday";
  } else if (delta < month) {
    return Math.floor(delta / day) + " days ago";
  } else if (delta < month * 2) {
    return "1 month ago";
  } else if (delta < year) {
    return Math.floor(delta / month) + " months ago";
  } else if (delta < year * 2) {
    return "1 year ago";
  } else {
    return Math.floor(delta / year) + " years ago";
  }
}