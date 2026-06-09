from bs4 import BeautifulSoup
from gtts import gTTS
import os

HTML_FILE = os.path.join(os.path.dirname(__file__), "..", "Charkha - Mera Ae Charkha Naulakha.html")
OUTPUT_DIR = os.path.dirname(__file__)

LANGUAGES = [
    ("content-en", "en", "charkha_en.mp3"),
    ("content-hi", "hi", "charkha_hi.mp3"),
    ("content-pa", "pa", "charkha_pa.mp3"),
    ("content-de", "de", "charkha_de.mp3"),
]

with open(HTML_FILE, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for section_id, lang_code, filename in LANGUAGES:
    section = soup.find(id=section_id)
    if not section:
        print(f"Section #{section_id} not found, skipping.")
        continue

    # Remove lyrics blockquote so it is not read aloud
    for lyrics in section.find_all(class_="lyrics"):
        lyrics.decompose()

    text = section.get_text(separator="\n", strip=True)

    output_path = os.path.join(OUTPUT_DIR, filename)
    print(f"Generating {filename} (lang={lang_code})...")
    tts = gTTS(text=text, lang=lang_code, slow=False)
    tts.save(output_path)
    print(f"  Saved to: {output_path}")

print("\nDone!")
