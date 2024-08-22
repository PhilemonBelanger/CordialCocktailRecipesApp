import * as Linking from "expo-linking";
import * as Application from "expo-application";
import { SUPPORT_EMAIL } from "~/Constants/constants";

export const contactSupport = () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const url = `mailto:${SUPPORT_EMAIL}?subject=Support Request&body=App Version: ${
    Application.nativeApplicationVersion
  } Pro\nDatetime locale: ${today.toLocaleString()}\nDatetime GMT: ${today.toUTCString()}\n\n----------\n\nPlease describe your issue, question or comment here:\n`;
  Linking.openURL(url);
};
