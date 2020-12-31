import * as Amplitude from "expo-analytics-amplitude";
import useMountEffect from "../hooks/useMountEffect";

export default async function telemetry(
  eventTitle,
  onMount = false,
  props = false
) {
  if (props) {
    Amplitude.logEventWithPropertiesAsync(eventTitle, props);
    if (onMount) {
      useMountEffect(() => {
        Amplitude.logEventWithPropertiesAsync(eventTitle, props);
      });
    }
  } else {
    if (onMount) {
      useMountEffect(() => {
        Amplitude.logEventAsync(eventTitle);
      });
    } else {
      Amplitude.logEventAsync(eventTitle);
    }
  }
}
