import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { useTheme } from "../../../providers/ThemeProvider";
import { createDatePickerStyles } from "./DatePicker.style";
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
          placeholderTextColor={theme.colors.grey[200]}
          value={value ? format(value, DateFormat.DISPLAY, { locale: fr }) : ""}
          onChangeText={parseInputDate}
          onBlur={onBlur}
          keyboardType={
            Platform.OS === "ios" ? "numbers-and-punctuation" : "default"
          }
        />
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setShowCalendar(!showCalendar)}
          hitSlop={10}
        >
          <FontAwesome name="calendar" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

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
                      [format(value, DateFormat.DISPLAY, { locale: fr })]: {
                        selected: true,
                      },
                    }
                  : {}
              }
              theme={{
                backgroundColor: theme.colors.background.default,
                calendarBackground: theme.colors.background.default,
                textSectionTitleColor: theme.colors.calendar.textSectionTitle,
                selectedDayBackgroundColor: theme.colors.primary.main,
                selectedDayTextColor: theme.colors.background.default,
                todayTextColor: theme.colors.primary.main,
                dayTextColor: theme.colors.calendar.dayText,
                textDisabledColor: theme.colors.calendar.textDisabled,
                dotColor: theme.colors.primary.main,
                selectedDotColor: theme.colors.background.default,
                arrowColor: theme.colors.primary.main,
                monthTextColor: theme.colors.primary.main,
                indicatorColor: theme.colors.primary.main,
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePicker;
