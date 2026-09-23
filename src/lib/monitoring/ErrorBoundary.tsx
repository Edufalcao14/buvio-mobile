import React from "react";
import { Text, View } from "react-native";
import { Button } from "@/components/buttons/button";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { reportError } from "./index";
import { t } from "@/i18n";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * The last line before a white screen.
 *
 * A render failure anywhere below this used to unmount the whole tree and
 * report nothing. Now it shows the player something in the app's own voice
 * and sends the stack somewhere a human will see it.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    reportError(error, "render");
    // The component stack is what makes a minified release stack readable.
    reportError(
      new Error(info.componentStack ?? "no component stack"),
      "render-stack"
    );
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          gap: 16,
        }}
      >
        <MascotBubble line={t("errorBoundary.mascot")} />
        <Text style={{ textAlign: "center" }}>{t("errorBoundary.text")}</Text>
        <Button
          text={t("common.retry")}
          onPress={async () => this.setState({ hasError: false })}
        />
      </View>
    );
  }
}
