#!/bin/bash

echo "🔍 Creating missing log folders and README stubs..."

folders="checkins checkouts beacons keeper-wisdom return-points sprints"

for folder in $folders; do
  dir="logs/$folder"
  readme="$dir/README.md"

  mkdir -p "$dir"

  if [ -f "$readme" ]; then
    echo "✅ $readme already exists – skipping."
  else
    echo "# $(echo "$folder" | tr '-' ' ' | sed 's/.*/\u&/') Log Folder" > "$readme"
    echo "" >> "$readme"
    
    case "$folder" in
      checkins)
        echo "This folder contains daily check-in logs. Each file includes signals, weather, focus, and anchor points." >> "$readme"
        ;;
      checkouts)
        echo "End-of-day reflections, next steps, and optional return cues." >> "$readme"
        ;;
      beacons)
        echo "Weekly or monthly summary logs using the Lighthouse Matrix. Each entry reflects energy and momentum flow." >> "$readme"
        ;;
      keeper-wisdom)
        echo "System-generated or user-noted insights during flow moments. Used for reminders and quote generation." >> "$readme"
        ;;
      return-points)
        echo "Short, clear cues for returning to a task or flow state after a pause." >> "$readme"
        ;;
      sprints)
        echo "Logs of active or completed sprints with classifications (e.g., Beam in Motion, Drifted Off Course)." >> "$readme"
        ;;
    esac

    echo "📄 Created $readme"
  fi
done

echo "🎉 Stub generation complete."
