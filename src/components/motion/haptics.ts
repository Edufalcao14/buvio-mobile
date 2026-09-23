import * as Haptics from "expo-haptics";

/**
 * One haptic per user action, always paired with a visual, never the only
 * feedback (DESIGN.md). Every call swallows its promise: the Simulator and
 * most Android hardware have no engine, and a rejected promise there must
 * not surface as an unhandled error.
 */
const quiet = (p: Promise<void>) => {
  p.catch(() => {});
};

/** A value ticked past a step: a candidate picked, a segment chosen. */
export const tapSelection = () => quiet(Haptics.selectionAsync());

/** Something committed under the finger: a primary action, a copy. */
export const tapImpact = () =>
  quiet(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));

/** The operation the user was waiting on landed. */
export const notifySuccess = () =>
  quiet(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));

export const notifyError = () =>
  quiet(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error));
