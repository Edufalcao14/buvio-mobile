import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useTheme } from "@/providers/ThemeProvider";
import { PressableScale } from "@/components/motion/PressableScale";
import { CalendarSheet } from "@/components/inputs/DatePicker/CalendarSheet";
import { currentLocale, t } from "@/i18n";
import type { Theme } from "@/theme";

interface DateChipsProps {
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
}

/**
 * The next week as one row of chips — today, tomorrow, then the weekday and
 * day number — plus a calendar chip for anything further. Picking a date is
 * one tap in the thumb zone instead of a keyboard and a typed slash-date.
 */
export const DateChips: React.FC<DateChipsProps> = ({
  value,
  onChange,
  error,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const locale = currentLocale() === "fr" ? fr : enUS;
  const today = startOfDay(new Date());
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));
  const inStrip = value ? days.some((d) => isSameDay(d, value)) : false;

  // "Today", then weekday abbreviations: a word like "Tomorrow" does not fit a
  // 64pt chip in either language, and the day number already says it.
  const labelFor = (date: Date, index: number) =>
    index === 0
      ? t("match.create.today")
      : format(date, "EEE", { locale }).replace(".", "");

  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {days.map((date, index) => {
          const selected = value ? isSameDay(date, value) : false;
          return (
            <PressableScale
              key={date.toISOString()}
              haptic
              onPress={() => onChange(date)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={format(date, "PPP", { locale })}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text
                style={[styles.chipLabel, selected && styles.chipLabelSelected]}
                numberOfLines={1}
              >
                {labelFor(date, index)}
              </Text>
              <Text
                style={[styles.chipDay, selected && styles.chipDaySelected]}
              >
                {format(date, "d")}
              </Text>
            </PressableScale>
          );
        })}
        <PressableScale
          haptic
          onPress={() => setCalendarOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={t("datePicker.open")}
          style={[
            styles.chip,
            styles.chipCalendar,
            value && !inStrip && styles.chipSelected,
          ]}
        >
          <Feather
            name="calendar"
            size={18}
            color={
              value && !inStrip
                ? theme.colors.background.default
                : theme.colors.text.primary
            }
          />
          <Text
            style={[
              styles.chipDay,
              styles.chipCalendarText,
              value && !inStrip && styles.chipDaySelected,
            ]}
          >
            {value && !inStrip
              ? format(value, "d MMM", { locale })
              : t("match.create.pickDate")}
          </Text>
        </PressableScale>
      </ScrollView>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CalendarSheet
        visible={calendarOpen}
        value={value}
        onSelect={(date) => {
          onChange(date);
          setCalendarOpen(false);
        }}
        onClose={() => setCalendarOpen(false)}
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    wrap: { gap: theme.spacing.xs },
    row: { gap: theme.spacing.xs, paddingRight: theme.spacing.md },
    chip: {
      width: 64,
      height: 68,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.grey[300],
      backgroundColor: theme.colors.background.paper,
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
    },
    // Selected = the same gold as the action, so the form has one accent.
    chipSelected: {
      backgroundColor: theme.colors.secondary.main,
      borderColor: theme.colors.secondary.main,
    },
    chipCalendar: { width: 92, flexDirection: "column" },
    chipLabel: {
      fontFamily: theme.typography.fontFamily.semiBold,
      fontSize: 11,
      letterSpacing: theme.typography.letterSpacing.wide,
      textTransform: "uppercase",
      color: theme.colors.text.secondary,
    },
    chipLabelSelected: {
      color: theme.colors.secondary.contrastText,
      opacity: 0.7,
    },
    chipDay: {
      fontFamily: theme.typography.fontFamily.numeric,
      fontSize: theme.typography.fontSize.xl,
      lineHeight: theme.typography.fontSize.xl + 2,
      color: theme.colors.text.primary,
    },
    chipCalendarText: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: 18,
    },
    chipDaySelected: { color: theme.colors.secondary.contrastText },
    error: {
      fontFamily: theme.typography.fontFamily.regular,
      color: theme.colors.error.main,
      fontSize: theme.typography.fontSize.sm,
    },
  });

export default DateChips;
