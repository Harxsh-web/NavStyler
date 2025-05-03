#!/bin/bash

file="client/src/hooks/use-content.tsx"

# Backup the file
cp "$file" "$file.bak"

# Use sed to replace all success toast calls to include variant: "success"
sed -i 's/toast({\n[ ]*title: "Success",\n[ ]*description: "[^"]*",\n[ ]*});/toast({\n        title: "Success",\n        description: "&",\n        variant: "success",\n      });/g' "$file"

# Display diff
diff "$file.bak" "$file"
