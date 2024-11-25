import moment from "moment-timezone";

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const generateTimestampGMT7 = () => {
  const suffix = '+07:00';
  const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss') + suffix;
  return timestamp;
}