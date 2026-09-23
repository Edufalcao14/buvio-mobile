import React, { createRef, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputKeyPressEventData,
  View,
  Text,
} from "react-native";
import { createStyles } from "./CodeInput.styles";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { t } from "@/i18n";

interface CodeInputProps<T extends FieldValues> {
  code: string;
  control: Control<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
}

export default function CodeInput<T extends FieldValues>({
  code,
  control,
  name,
  errors,
}: CodeInputProps<T>) {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Create an array of refs properly
  const inputRefs = useRef<React.RefObject<TextInput>[]>([]);

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
                        testID={`code-input-${index}`}
                        accessibilityLabel={t("team.join.cellA11y", {
                          index: index + 1,
                        })}
                        style={styles.characterInput}
                        // No native maxLength: a fast typist's second key
                        // would be dropped before focus moves on. The
                        // handler below keeps one character per cell and
                        // spreads the rest forward.
                        value={codeArray[index] || ""}
                        onChangeText={(text) => {
                          // A paste, an autofill, or a fast typist lands more
                          // than one character in a single cell. Spread them
                          // across the cells from here on instead of keeping
                          // only the first and dropping the rest.
                          const chars = text
                            .toUpperCase()
                            .replace(/[^A-Z0-9]/g, "")
                            .slice(0, 5 - index)
                            .split("");
                          const newCodeArray = [...codeArray];

                          if (chars.length === 0) {
                            newCodeArray[index] = "";
                          } else {
                            chars.forEach((char, offset) => {
                              newCodeArray[index + offset] = char;
                            });
                          }

                          onChange(newCodeArray.join(""));

                          // Focus follows the last character written.
                          const last = Math.min(4, index + chars.length);
                          if (last !== index) {
                            setTimeout(() => {
                              inputRefs.current[last]?.current?.focus();
                            }, 0);
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
          {typeof errors[name]?.message === "string" ? (
            <Text style={styles.errorText}>
              {String(errors[name]?.message)}
            </Text>
          ) : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
