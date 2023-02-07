import { Dimensions } from "react-native";
import theme, { COLORS, SIZES, FONTS, STYLES } from "./theme";
import { BATTERY_LIFE_TIPS, CLEAN_GUIDE } from "./data";
import moment from "moment";

export const headerHeight = 50;

export const { width, height } = Dimensions.get('window');

export const tabHeight = 70;

export const convertLocalIdentifierToAssetLibrary = (localIdentifier, ext) => {
  const hash = localIdentifier.split('/')[0];
  return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
};

export const minuteSecond = (time) => {
  const duration = moment.duration(time, 'seconds');
  const minutes = duration.asMinutes().toFixed(0).toString().padStart(2, '0');
  const second = duration.seconds().toFixed(0).toString().padStart(2, '0');
  return minutes + ':' + second;
}

export const getFileName = (path) => {
  const paths = path.split('/');
  return paths[paths.length - 1];
};

export default function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

export { theme, COLORS, SIZES, FONTS, STYLES, BATTERY_LIFE_TIPS, CLEAN_GUIDE };
