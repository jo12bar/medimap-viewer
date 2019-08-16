#!/usr/bin/env bash
#
# Downloads various Google fonts to /usr/local/share/fonts, and runs fc-cache.

COMMIT="724bf98e9f5cb98a1d3d5044f45a2e286b817401"
BASE_URL="https://raw.githubusercontent.com/google/fonts/$COMMIT/"

# Roboto
roboto_folder="apache/roboto"
declare -a roboto_fonts=("Black" "BlackItalic" "Bold" "BoldItalic" "Italic"
                         "Light" "LightItalic" "Medium" "MediumItalic" "Regular"
                         "Thin" "ThinItalic")

mkdir -p "/usr/local/share/fonts/$roboto_folder"
for font in "${roboto_fonts[@]}"; do
  echo "Downloading Roboto-$font.ttf"
  curl -o "/usr/local/share/fonts/$roboto_folder/Roboto-$font.ttf" "$BASE_URL$roboto_folder/Roboto-$font.ttf?raw=true"
done

# Roboto Mono
robotomono_folder="apache/robotomono"
declare -a robotomono_fonts=("Bold" "BoldItalic" "Italic" "Light" "LightItalic"
                             "Medium" "MediumItalic" "Regular" "Thin"
                             "ThinItalic")

mkdir -p "/usr/local/share/fonts/$robotomono_folder"
for font in "${robotomono_fonts[@]}"; do
  echo "Downloading RobotoMono-$font.ttf"
  curl -o "/usr/local/share/fonts/$robotomono_folder/RobotoMono-$font.ttf" "$BASE_URL$robotomono_folder/RobotoMono-$font.ttf?raw=true"
done

# Update font cache
fc-cache -f -v
