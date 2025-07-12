
import argparse
import os
import re
from pathlib import Path

# Define project root directory
ROOT_DIR = Path(__file__).parent.parent

# Define directories for product files
PRODUCTS_DIR_EN = ROOT_DIR / '_products/en'
PRODUCTS_DIR_JA = ROOT_DIR / '_products/ja'


# --- English Tag Normalization Rules ---
# Goal: Enforce consistency (e.g., plurals, capitalization, common aliases).
normalization_rules_en = {
    # Singular to Plural
    'Headphone': 'Headphones',
    'Earphone': 'Earphones',
    'Speaker': 'Speakers',
    'Bookshelf speaker': 'Bookshelf speakers',
    'Floorstanding speaker': 'Floorstanding speakers',
    'Studio monitor': 'Studio monitors',
    'Active speaker': 'Active speakers',
    'Passive speaker': 'Passive speakers',
    'In-ear monitor': 'In-ear monitors',
    'True wireless earbud': 'True wireless earbuds',

    # Aliases and variations
    'IEMs': 'In-ear monitors',
    'IEM': 'In-ear monitors',
    'Streamer': 'Network streamer',
    'Player': 'Network player',
    'DAC/amp': 'DAC/Amp combo',
    'Record player': 'Turntable',
    'Noise-cancelling': 'Noise cancelling',
    'Open back': 'Open-back',
    'Closed back': 'Closed-back',
    'Entry level': 'Entry-level',
    'Mid range': 'Mid-range',
    'High end': 'High-end',
    'Summit fi': 'Summit-fi',

    # Capitalization
    'bluetooth': 'Bluetooth',
    'anc': 'ANC',
    'ldac': 'LDAC',
    'aptx': 'aptX',
    'usbc': 'USB-C',
    'usb-c': 'USB-C',
    'dsp': 'DSP',
}

# --- Normalization Rules for Japanese Tags ---
# Goal: Unify English terms and variations into standard Japanese tags.
normalization_rules_ja = {
    # Case variations, singular/plural forms, and minor variations
    'Headphone': 'ヘッドフォン',
    'Headphones': 'ヘッドフォン',
    'ヘッドホン': 'ヘッドフォン',
    'Earphone': 'イヤフォン',
    'Earphones': 'イヤフォン',
    'Speaker': 'スピーカー',
    'Speakers': 'スピーカー',
    'Noise-cancelling': 'ノイズキャンセリング',
    'Noise cancelling': 'ノイズキャンセリング',
    'Open-back': 'オープンバック',
    'Closed-back': '密閉型',
    'Fiio': 'FiiO',
    'Akm': 'AKM',
    'Ess': 'ESS',
    'Hdmi-arc': 'HDMI ARC',
    'Preamp': 'プリアンプ',
    'Touchscreen': 'タッチスクリーン',

    # English to Japanese translation/unification
    # Product Types
    'IEM': 'インイヤーモニター',
    'TWS': '完全ワイヤレスイヤホン',
    'DAP': 'デジタルオーディオプレーヤー',
    'Streamer': 'ネットワークストリーマー',
    'Turntable': 'レコードプレイヤー',
    'Amplifier': 'アンプ',
    'Portable DAC': 'ポータブルDAC',
    'Desktop DAC': 'デスクトップDAC',
    
    # Technology
    'ANC': 'アクティブノイズキャンセリング',
    'Wireless': 'ワイヤレス',
    'Dynamic driver': 'ダイナミックドライバー',
    'Adaptive EQ': 'アダプティブEQ',

    # Purpose
    'Budget': 'コストパフォーマンス',
    'Reference': 'リファレンス',
    'Portable': 'ポータブル',
    'Desktop': 'デスクトップ',
    'Gaming': 'ゲーミング',
    'Studio': 'スタジオ',
    'Monitoring': 'モニタリング',
    'Professional': 'プロフェッショナル',

    # Region
    'America': 'アメリカ',
    'UK': 'イギリス',
    'Germany': 'ドイツ',
    'Japan': '日本',
    'China': '中国',
    'Canada': 'カナダ',
    'Taiwan': '台湾',
    'France': 'フランス',
    'Italy': 'イタリア',
    'Korea': '韓国'
}


def extract_front_matter(content):
    """Extracts the front matter from file content."""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if match:
        # Return the front matter content and the index where it ends
        return match.group(1), match.end()
    return None, 0


def process_tags(tags, rules):
    """Normalizes a list of tags according to the provided rules."""
    normalized_tags = set()
    changes_made = False
    original_tags_set = set(tags)

    for tag in tags:
        # Get the normalized tag, defaulting to the original if not in rules
        normalized_tag = rules.get(tag, tag)
        normalized_tags.add(normalized_tag)

    # Check if the final set of tags is different from the original
    if normalized_tags != original_tags_set:
        changes_made = True
    
    # Return sorted list to maintain a consistent order
    return sorted(list(normalized_tags)), changes_made


def normalize_tags_in_file(file_path, rules, dry_run=True):
    """Reads a file, normalizes its tags, and writes back if changed."""
    try:
        content = file_path.read_text(encoding='utf-8')
        
        front_matter_str, content_start_index = extract_front_matter(content)
        if not front_matter_str:
            return False

        # Find the tags line using a more robust regex
        tags_match = re.search(r'tags:\s*(\[.*?\]|.*)', front_matter_str)
        if not tags_match:
            return False
        
        original_tags_line = tags_match.group(0)
        original_tags_content = tags_match.group(1).strip()

        # Handle both list format `[tag1, tag2]` and simple format `tag1, tag2`
        if original_tags_content.startswith('[') and original_tags_content.endswith(']'):
            tags_str = original_tags_content[1:-1]
        else:
            tags_str = original_tags_content

        tags = [tag.strip().strip("'\"") for tag in tags_str.split(',') if tag.strip()]

        if not tags:
            return False

        normalized_tags, changes_made = process_tags(tags, rules)

        if changes_made:
            print(f"--- Changes for: {file_path.relative_to(ROOT_DIR)}")
            print(f"  FROM: {sorted(list(set(tags)))}")
            print(f"  TO:   {normalized_tags}")
            
            if not dry_run:
                # Create the new tags string, ensuring it's a valid YAML list
                new_tags_list_str = f"[{', '.join(normalized_tags)}]"
                new_tags_line = f"tags: {new_tags_list_str}"

                # Replace the old tags line in the front matter string
                updated_front_matter_str = front_matter_str.replace(original_tags_line, new_tags_line, 1)

                # Reconstruct the file content
                new_content = f"---\n{updated_front_matter_str}\n---\n" + content[content_start_index:]

                # Write the updated content back to the file
                file_path.write_text(new_content, encoding='utf-8')
                print("  -> Fixed.")
            else:
                print("  -> (Dry run)")
            print("") # Newline for readability
            return True

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
    
    return False


def main():
    parser = argparse.ArgumentParser(description="Normalize tags in product markdown files for all languages.")
    parser.add_argument('--dry-run', action='store_true', help="Show what would be changed without actually modifying files.")
    parser.add_argument('--fix', action='store_false', dest='dry_run', help="Apply the changes to the files.")
    parser.set_defaults(dry_run=True)
    
    args = parser.parse_args()

    print(f"Starting tag normalization for all articles...")
    print(f"Mode: {'Dry Run' if args.dry_run else 'Fix'}")
    print("=" * 40)

    # Dictionary mapping language to its directory and ruleset
    processing_map = {
        'en': (PRODUCTS_DIR_EN, normalization_rules_en),
        'ja': (PRODUCTS_DIR_JA, normalization_rules_ja)
    }
    
    total_files_to_change = 0

    for lang, (directory, rules) in processing_map.items():
        print(f"--- Processing language: {lang.upper()} ---")
        if not directory.exists():
            print(f"Directory not found, skipping: {directory}")
            print("-" * 40)
            continue
        
        files_to_change_lang = 0
        all_files = sorted(list(directory.glob('**/*.md')))

        for file_path in all_files:
            if file_path.is_file():
                if normalize_tags_in_file(file_path, rules, args.dry_run):
                    files_to_change_lang += 1
        
        if files_to_change_lang > 0:
            print(f"Found {files_to_change_lang} files with tags to normalize for {lang.upper()}.")
        else:
            print(f"No changes needed for {lang.upper()}.")
        
        total_files_to_change += files_to_change_lang
        print("-" * 40)

    print("=" * 40)
    if total_files_to_change > 0:
        print(f"TOTAL: Found {total_files_to_change} files with tags to normalize across all languages.")
        if args.dry_run:
            print("\nRun with --fix to apply these changes.")
    else:
        print("No tags needed normalization in any language. Everything looks good!")

if __name__ == '__main__':
    main() 