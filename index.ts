import { initMonitoring } from "./src/lib/monitoring";

import "expo-router/entry";

// Before expo-router/entry, so a failure while the router itself is starting
// up is still reported rather than lost.
initMonitoring();

if (__DEV__) {
  require("./src/lib/ReactotronConfig");
}
