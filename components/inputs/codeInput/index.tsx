import React from "react";
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputKeyPressEventData,
  View,
  Text,
} from "react-native";
import { createStyles } from "./style";
import { useTheme } from "../../../providers/ThemeProvider";
import { createRef, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";

interface JoinTeamProps {
  code: string;
  control: any;
  name: string;
  errors: any;
}

export default function CodeInput({
  code,
  control,
  name,
  errors,
}: JoinTeamProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Create an array of refs properly
  const inputRefs = useRef<Array<React.RefObject<TextInput>>>([]);

  // Initialize the refs array
  useEffect(() => {
    inputRefs.current = Array(5)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || createRef<TextInput>());
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboard}
      keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 0}
    >
      <View style={styles.container}>

        <View style={styles.characterBoxesContainer}>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => {
              // Parse the single string value into individual characters
              const codeArray = value ? value.split("") : Array(5).fill("");

              return (
                <>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <View
                      key={index}
                      style={[
                        styles.characterBox,
                        codeArray[index] ? styles.filledCharacterBox : null,
                      ]}
                    >
                      <TextInput
                        ref={inputRefs.current[index]}
                        style={styles.characterInput}
                        maxLength={1}
                        value={codeArray[index] || ""}
                        onChangeText={(text) => {
                          if (text.length <= 1) {
                            const newCodeArray = [...codeArray];
                            newCodeArray[index] = text.toUpperCase();

                            // Update the full code string
                            const newCode = newCodeArray.join("");
                            onChange(newCode);

                            // Auto-advance to next input
                            if (text.length === 1 && index < 4) {
                              setTimeout(() => {
                                const nextInputRef =
                                  inputRefs.current[index + 1]?.current;
                                if (nextInputRef) {
                                  nextInputRef.focus();
                                }
                              }, 0);
                            }
                          }
                        }}
                        onKeyPress={(
                          e: NativeSyntheticEvent<TextInputKeyPressEventData>
                        ) => {
                          if (
                            e.nativeEvent.key === "Backspace" &&
                            index > 0 &&
                            !codeArray[index]
                          ) {
                            // Move to previous input on backspace
                            const newCodeArray = [...codeArray];
                            newCodeArray[index - 1] = "";

                            const newCode = newCodeArray.join("");
                            onChange(newCode);

                            setTimeout(() => {
                              const prevInputRef =
                                inputRefs.current[index - 1]?.current;
                              if (prevInputRef) {
                                prevInputRef.focus();
                              }
                            }, 0);
                          }
                        }}
                        autoCapitalize="characters"
                        keyboardType="default"
                      />
                    </View>
                  ))}
                </>
              );
            }}
          />
        </View>

        <View>
          {errors[name] && (
            <Text style={styles.errorText}>{errors[name].message}</Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
