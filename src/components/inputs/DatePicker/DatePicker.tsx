import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  Modal,
} from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { useTheme } from "@/providers/ThemeProvider";
import { createDatePickerStyles } from "./DatePicker.styles";
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
const PLACEHOLDER_DATE = "jj/mm/aaaa";

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

  const handleDateSelect = (date: {
    timestamp: number;
    dateString: string;
  }) => {
    const selectedDate = new Date(date.timestamp);
    onChangeText(selectedDate);
    setShowCalendar(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDER_DATE}
          placeholderTextColor={theme.colors.text.secondary}
          value={value ? format(value, DateFormat.DISPLAY, { locale: fr }) : ""}
          onChangeText={parseInputDate}
          onBlur={onBlur}
          keyboardType={
            Platform.OS === "ios" ? "numbers-and-punctuation" : "default"
          }
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ouvrir le calendrier"
          style={styles.calendarButton}
          onPress={() => setShowCalendar(!showCalendar)}
          hitSlop={10}
        >
          <FontAwesome
            name="calendar"
            size={20}
            color={theme.colors.text.secondary}
          />
        </Pressable>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={
                value
                  ? {
                      [format(value, DateFormat.KEY)]: {
                        selected: true,
                      },
                    }
                  : {}
              }
              theme={{
                backgroundColor: theme.colors.background.paper,
                calendarBackground: theme.colors.background.paper,
                textSectionTitleColor: theme.colors.calendar.textSectionTitle,
                selectedDayBackgroundColor: theme.colors.secondary.main,
                selectedDayTextColor: theme.colors.secondary.contrastText,
                todayTextColor: theme.colors.primary.light,
                dayTextColor: theme.colors.calendar.dayText,
                textDisabledColor: theme.colors.calendar.textDisabled,
                dotColor: theme.colors.secondary.main,
                selectedDotColor: theme.colors.secondary.contrastText,
                arrowColor: theme.colors.primary.light,
                monthTextColor: theme.colors.text.primary,
                indicatorColor: theme.colors.primary.light,
              }}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fermer le calendrier"
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePicker;
