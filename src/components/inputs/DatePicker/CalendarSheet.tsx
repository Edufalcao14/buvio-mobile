import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { format } from "date-fns";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useTheme } from "@/providers/ThemeProvider";
import { currentLocale, t } from "@/i18n";
import { createDatePickerStyles } from "./DatePicker.styles";
import { DateFormat } from "./utils";

// The calendar ships English-only; both app locales are declared once here.
LocaleConfig.locales.fr = {
  monthNames: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ],
  monthNamesShort: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
  dayNames: [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ],
  dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  today: "Aujourd’hui",
};
LocaleConfig.locales.en = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};
LocaleConfig.defaultLocale = currentLocale();

interface CalendarSheetProps {
  visible: boolean;
  value: Date | null;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

/** The month grid in a centred sheet, shared by the date field and the chips. */
export const CalendarSheet: React.FC<CalendarSheetProps> = ({
  visible,
  value,
  onSelect,
  onClose,
}) => {
  const theme = useTheme();
  const styles = createDatePickerStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.calendarContainer}>
          <Calendar
            firstDay={1}
            onDayPress={(day: { timestamp: number }) =>
              onSelect(new Date(day.timestamp))
            }
            markedDates={
              value
                ? { [format(value, DateFormat.KEY)]: { selected: true } }
                : {}
            }
            theme={{
              backgroundColor: theme.colors.background.elevated,
              calendarBackground: theme.colors.background.elevated,
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
            accessibilityLabel={t("datePicker.closeA11y")}
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>{t("datePicker.close")}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarSheet;
