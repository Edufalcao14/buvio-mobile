import React from "react";
import { View, Text, TextInput, Pressable, Platform } from "react-native";
import { format } from "date-fns";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { t } from "@/i18n";
import { createDatePickerStyles } from "./DatePicker.styles";
import { CalendarSheet } from "./CalendarSheet";
import { DateFormat, parseInputDate } from "./utils";

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChangeText: (date: Date | null) => void;
  onBlur?: () => void;
  error?: string;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
}

/** A typed date field with a calendar button. The chips variant lives in the match form. */
const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  showCalendar,
  setShowCalendar,
}) => {
  const theme = useTheme();
  const styles = createDatePickerStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder={t("datePicker.placeholder")}
          placeholderTextColor={theme.colors.text.secondary}
          value={value ? format(value, DateFormat.DISPLAY) : ""}
          onChangeText={(text) => onChangeText(parseInputDate(text))}
          onBlur={onBlur}
          keyboardType={
            Platform.OS === "ios" ? "numbers-and-punctuation" : "default"
          }
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("datePicker.open")}
          style={styles.calendarButton}
          onPress={() => setShowCalendar(!showCalendar)}
          hitSlop={10}
        >
          <Feather
            name="calendar"
            size={20}
            color={theme.colors.text.secondary}
          />
        </Pressable>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <CalendarSheet
        visible={showCalendar}
        value={value}
        onSelect={(date) => {
          onChangeText(date);
          setShowCalendar(false);
        }}
        onClose={() => setShowCalendar(false)}
      />
    </View>
  );
};

export default DatePicker;
