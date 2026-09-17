# ADR 0001 - Session tokens live in the platform secure store

**Status:** accepted · **Date:** 2026-09-17

## Context

The access token and the long-lived refresh token were written to
AsyncStorage, which is an unencrypted file inside the app sandbox: a plain
SQLite database on Android and a plain file in the iOS container. The Android
manifest also left `allowBackup` enabled, so that file was eligible for
extraction through an automatic device backup.

On an ordinary device the OS sandbox still protects it. On a rooted or
jailbroken phone, or through a backup, the refresh token was readable and
replayable for its full server-side lifetime - and because logout called no
revocation, signing out did not shorten that window.

## Decision

Tokens are stored with `expo-secure-store` (iOS Keychain, Android Keystore),
under `WHEN_UNLOCKED_THIS_DEVICE_ONLY`: not readable while the device is
locked, and never synced to the user's other devices.

`loadAuthState` migrates an existing AsyncStorage session on first read and
deletes the plaintext copy, so shipping this does not sign everybody out.

Logout now clears three things rather than one: the stored credential, the
Apollo cache (which held the previous user's profile, their squad's data and
every ballot) and the authenticated socket.

## Consequences

- Reads are asynchronous and slightly slower than AsyncStorage. Irrelevant:
  they happen once at launch and once per token refresh.
- `expo-secure-store` caps a value at 2048 bytes. A token pair is far under it,
  but a future addition to the stored session must respect that ceiling.
- The secure store is unavailable on web. Buvio ships to phones; if a web
  target is ever added, it needs its own decision.
