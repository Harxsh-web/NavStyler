#!/bin/bash

file="client/src/hooks/use-content.tsx"

# Create a temporary file
temp_file=$(mktemp)

# Process the file and replace all success toasts
while IFS= read -r line; do
  if [[ $line == *"toast({"* ]]; then
    # Start of toast
    in_toast=1
    toast_lines=("$line")
  elif [[ $in_toast -eq 1 ]]; then
    toast_lines+=("$line")
    if [[ $line == *"title: \"Success\","* ]]; then
      is_success=1
    elif [[ $line == *"variant: "* ]]; then
      has_variant=1
    elif [[ $line == *"});"* ]]; then
      # End of toast, output processed toast
      if [[ $is_success -eq 1 && $has_variant -ne 1 ]]; then
        # This is a success toast without variant, add variant before the closing
        for ((i=0; i<${#toast_lines[@]}-1; i++)); do
          echo "${toast_lines[$i]}" >> "$temp_file"
        done
        echo "        variant: \"success\"," >> "$temp_file"
        echo "${toast_lines[-1]}" >> "$temp_file"
      else
        # Output original toast
        for line in "${toast_lines[@]}"; do
          echo "$line" >> "$temp_file"
        done
      fi
      # Reset variables
      in_toast=0
      is_success=0
      has_variant=0
      unset toast_lines
    fi
  else
    # Regular line, output as is
    echo "$line" >> "$temp_file"
  fi
done < "$file"

# Update the original file
mv "$temp_file" "$file"

