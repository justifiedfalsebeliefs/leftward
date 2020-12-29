import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as mapping } from "../config/themeMapping.json";
import { default as dark } from "../config/dark.json";
import { default as light } from "../config/light.json";

function ThemeAndIconProvider({ children }) {
  // Update to get theme from user info from cognito - also update toggle button to restart app.
  // don't forget to update AppNavigator for the flash - make it sensitive to a Theme value

  return (
    <ApplicationProvider {...eva} customMapping={mapping} theme={light}>
      <IconRegistry icons={EvaIconsPack} />
      {children}
    </ApplicationProvider>
  );
}

export default ThemeAndIconProvider;
