#!/usr/bin/env bash
#
# Capture PantryPilot app screens from the booted iOS Simulator.
#
# Why this exists: simctl can screenshot and record, but it cannot tap. idb
# (which would) needs an Xcode Command Line Tools update and a source build, so
# this drives the Simulator window directly with cliclick instead.
#
# REQUIREMENTS
#   brew install cliclick
#   System Settings -> Privacy & Security -> Accessibility -> enable the app
#   that runs this script (Visual Studio Code, iTerm, Terminal...). Without it
#   cliclick silently does nothing and every capture is the same screen.
#   You must also already be signed in to PantryPilot on the simulator.
#
# USAGE
#   ./scripts/capture-app-screens.sh [output_dir]
#
set -euo pipefail

OUT="${1:-public/screens}"
BUNDLE="app.pantrypilot.ios"
SETTLE="${SETTLE:-2.2}"   # seconds to let a screen animate in before capturing

command -v cliclick >/dev/null || { echo "cliclick not installed: brew install cliclick"; exit 1; }

SIM_UDID="$(xcrun simctl list devices booted -j | python3 -c '
import json,sys
d=json.load(sys.stdin)["devices"]
for rt in d.values():
    for dev in rt:
        if dev.get("state")=="Booted": print(dev["udid"]); raise SystemExit
print("", end="")
')"
[ -n "$SIM_UDID" ] || { echo "No booted simulator."; exit 1; }
echo "Simulator: $SIM_UDID"

# Bring the Simulator forward and read its window frame in screen points.
read -r WIN_X WIN_Y WIN_W WIN_H <<<"$(osascript <<'AS'
tell application "Simulator" to activate
delay 0.6
tell application "System Events" to tell process "Simulator"
  set {x, y} to position of window 1
  set {w, h} to size of window 1
end tell
return (x as text) & " " & (y as text) & " " & (w as text) & " " & (h as text)
AS
)"
echo "Window: ${WIN_W}x${WIN_H} at ${WIN_X},${WIN_Y}"

# The device screen sits inside the window below the title bar. Everything below
# is expressed as a fraction of the device screen, so it survives a resize.
TITLE_H=28
SCREEN_H=$(( WIN_H - TITLE_H ))

tap() { # tap <fraction_x> <fraction_y>
  local fx="$1" fy="$2"
  local px py
  px=$(python3 -c "print(int($WIN_X + $WIN_W * $fx))")
  py=$(python3 -c "print(int($WIN_Y + $TITLE_H + $SCREEN_H * $fy))")
  cliclick "c:${px},${py}" >/dev/null
  sleep "$SETTLE"
}

shot() { # shot <name>
  mkdir -p "$OUT"
  xcrun simctl io "$SIM_UDID" screenshot --type=png "$OUT/$1.png" >/dev/null 2>&1
  echo "  captured $1"
}

# Bottom tab bar, as fractions of the device screen.
TAB_Y=0.945
HOME_X=0.11; PANTRY_X=0.325; PLAN_X=0.695; STATS_X=0.89

xcrun simctl terminate "$SIM_UDID" "$BUNDLE" >/dev/null 2>&1 || true
xcrun simctl launch "$SIM_UDID" "$BUNDLE" >/dev/null
sleep 4

echo "Capturing…"
tap $HOME_X $TAB_Y;   shot home-dashboard
tap $PANTRY_X $TAB_Y; shot pantry-list
tap $PLAN_X $TAB_Y;   shot planner-week
tap $STATS_X $TAB_Y;  shot stats-overview

# Quick actions live on Home; their row sits around 62% down the dashboard.
tap $HOME_X $TAB_Y
tap 0.15 0.62; shot shopping-list;   tap 0.08 0.075   # back
tap $HOME_X $TAB_Y
tap 0.38 0.62; shot ai-suggestions;  tap 0.08 0.075
tap $HOME_X $TAB_Y
tap 0.62 0.62; shot scan-barcode;    tap 0.08 0.075

echo
echo "Done. Files in $OUT:"
ls -1 "$OUT" 2>/dev/null | sed 's/^/  /'
echo
echo "CHECK EVERY FILE before wiring it into the site — if Accessibility"
echo "permission is off, cliclick does nothing and these will all be identical."
