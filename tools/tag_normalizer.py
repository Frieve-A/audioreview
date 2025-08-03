
import argparse
import os
import re
from pathlib import Path

# Define project root directory
ROOT_DIR = Path(__file__).parent.parent

# Define directories for product and company files
PRODUCTS_DIR_EN = ROOT_DIR / '_products/en'
PRODUCTS_DIR_JA = ROOT_DIR / '_products/ja'
COMPANIES_DIR_EN = ROOT_DIR / '_companies/en'
COMPANIES_DIR_JA = ROOT_DIR / '_companies/ja'


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
    'Studio Monitor': 'Studio monitors',
    'Active Speaker': 'Active speakers',
    'Passive Speaker': 'Passive speakers',
    'Bookshelf Speaker': 'Bookshelf speakers',
    'Floor-standing Speaker': 'Floorstanding speakers',
    'In-Ear Monitor': 'In-ear monitors',
    'True Wireless Earbuds': 'True wireless earbuds',

    # Technical specifications - Standardize format
    '1DD4BA': '1DD+4BA',
    '1DD+4BA': '1DD+4BA',
    '2DD': '2DD',
    '3DD': '3DD',
    '4DD': '4DD',
    '1BA': '1BA',
    '2BA': '2BA',
    '3BA': '3BA',
    '4BA': '4BA',
    '5BA': '5BA',
    '6BA': '6BA',
    '7BA': '7BA',
    '8BA': '8BA',
    '1DD1BA': '1DD+1BA',
    '1DD+1BA': '1DD+1BA',
    '1DD2BA': '1DD+2BA',
    '1DD+2BA': '1DD+2BA',
    '1DD3BA': '1DD+3BA',
    '1DD+3BA': '1DD+3BA',
    '1DD5BA': '1DD+5BA',
    '1DD+5BA': '1DD+5BA',
    '1DD6BA': '1DD+6BA',
    '1DD+6BA': '1DD+6BA',
    '2DD1BA': '2DD+1BA',
    '2DD+1BA': '2DD+1BA',
    '2DD2BA': '2DD+2BA',
    '2DD+2BA': '2DD+2BA',

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
    'Bluetooth': 'Bluetooth',
    'ANC': 'ANC',
    'LDAC': 'LDAC',
    'aptX': 'aptX',
    'USB-C': 'USB-C',
    'DSP': 'DSP',
    
    # Additional normalizations from analysis results
    # Product type variations (high frequency tags)
    'Wireless Headphones': 'Wireless headphones',
    'Wireless Earphones': 'Wireless earphones',
    'Wired Earphones': 'Wired earphones',
    'Monitor Earphones': 'Monitor earphones',
    'Open-Ear': 'Open-ear',
    'Earbuds': 'Earbuds',
    'Bookshelf Speakers': 'Bookshelf speakers',
    'Floor-standing': 'Floor-standing',
    'Floorstanding Speakers': 'Floorstanding speakers',
    'Studio Monitors': 'Studio monitors',
    'Active Speakers': 'Active speakers',
    'Passive Speakers': 'Passive speakers',
    'Soundbar': 'Soundbar',
    'Subwoofer': 'Subwoofer',
    'Portable Speaker': 'Portable speaker',
    'Desktop Speaker': 'Desktop speaker',
    'Center Speaker': 'Center speaker',
    'Integrated Amplifier': 'Integrated amplifier',
    'Power Amplifier': 'Power amplifier',
    'Headphone Amplifier': 'Headphone amplifier',
    'Portable Amplifier': 'Portable amplifier',
    'Streaming Amplifier': 'Streaming amplifier',
    'USB DAC': 'USB DAC',
    'Desktop DAC': 'Desktop DAC',
    'Portable DAC': 'Portable DAC',
    'Digital Audio Player': 'Digital audio player',
    'Network Streamer': 'Network streamer',
    'Network Player': 'Network player',
    'Portable Turntable': 'Portable turntable',
    'Phono Cartridge': 'Phono cartridge',
    'MM Cartridge': 'MM cartridge',
    'MC Cartridge': 'MC cartridge',
    'Audio Interface': 'Audio interface',
    'AV Receiver': 'AV Receiver',
    'Portable Recorder': 'Portable recorder',
    '2-Way': '2-Way',
    '3-Way': '3-Way',
    'Tweeter': 'Tweeter',
    'Over-ear': 'Over-ear',
    
    # Technology variations (high frequency tags)
    'Planar Magnetic': 'Planar magnetic',
    'Electrostatic': 'Electrostatic',
    'Dynamic Driver': 'Dynamic driver',
    'Balanced Armature': 'Balanced armature',
    'Multi-BA': 'Multi-BA',
    'Hybrid Technology': 'Hybrid technology',
    'Coaxial Driver': 'Coaxial driver',
    'Bone Conduction': 'Bone conduction',
    'Ribbon-type': 'Ribbon-type',
    'Horn Tweeter': 'Horn tweeter',
    'Titanium Tweeter': 'Titanium tweeter',
    'Active Noise Cancelling': 'Active noise cancelling',
    'Open Design': 'Open design',
    'aptX HD': 'aptX HD',
    'aptX Adaptive': 'aptX Adaptive',
    'AirPlay': 'AirPlay',
    'LHDC': 'LHDC',
    'Bluetooth LE Audio': 'Bluetooth LE Audio',
    'Room Correction': 'Room correction',
    'Equalizer': 'Equalizer',
    'PEQ': 'PEQ',
    'Acourate': 'Acourate',
    'Audiolense XO': 'Audiolense XO',
    'FIR Filter': 'FIR Filter',
    'CustomTune': 'CustomTune',
    'Adaptive EQ': 'Adaptive EQ',
    'Balanced Output': 'Balanced output',
    'Dolby Atmos': 'Dolby Atmos',
    'DTS:X': 'DTS:X',
    'Spatial Audio': 'Spatial audio',
    'Virtual Surround': 'Virtual surround',
    'Direct-drive': 'Direct-drive',
    'Belt-drive': 'Belt-drive',
    'Bi-amp': 'Bi-amp',
    'Class D': 'Class D',
    'Full Digital': 'Full Digital',
    'Velvet-sound': 'Velvet-sound',
    'S-Master Pro': 'S-Master Pro',
    'H1 Chip': 'H1 Chip',
    'H2 Chip': 'H2 Chip',
    'V2 Processor': 'V2 Processor',
    'VRM Technology': 'VRM Technology',
    'SMC Technology': 'SMC Technology',
    'Harmonious-Diaphragm': 'Harmonious-Diaphragm',
    'Uni-Q': 'Uni-Q',
    'C-CAM': 'C-CAM',
    'Wood Fiber': 'Wood Fiber',
    'DLC': 'DLC',
    'ZYLON': 'ZYLON',
    'AMT': 'AMT',
    'EQ': 'EQ',
    
    # Purpose variations (high frequency tags)
    'Budget-friendly': 'Budget-friendly',
    'Mid-range': 'Mid-range',
    'Summit-fi': 'Summit-fi',
    'Premium': 'Premium',
    'Entry-level': 'Entry-level',
    'Gaming': 'Gaming',
    'Studio': 'Studio',
    'Monitoring': 'Monitoring',
    'Mixing': 'Mixing',
    'Mastering': 'Mastering',
    'Music Production': 'Music Production',
    'Recording': 'Recording',
    'DTM': 'DTM',
    'DJ': 'DJ',
    'Professional': 'Professional',
    'Portable Audio': 'Portable',
    'Desktop Audio': 'Desktop',
    'Nearfield': 'Nearfield',
    'Sports': 'Sports',
    'Fit': 'Fit',
    'Classic': 'Classic',
    'Retro': 'Retro',
    'Reference': 'Reference',
    'Legacy Product': 'Legacy product',
    'Discontinued': 'Discontinued',
    'Limited Edition': 'Limited edition',
    'Revolutionary': 'Revolutionary',
    'Collaboration': 'Collaboration',
    
    # Region variations (high frequency tags)
    'USA': 'America',
    'America': 'America',
    'American': 'America',
    'UK': 'United Kingdom',
    'United Kingdom': 'United Kingdom',
    'British': 'United Kingdom',
    'Denmark': 'Denmark',
    'Danish': 'Denmark',
    'Germany': 'Germany',
    'German': 'Germany',
    'Japan': 'Japan',
    'Japanese': 'Japan',
    'Made-in-Japan': 'Japan',
    'China': 'China',
    'Chinese': 'China',
    'Canada': 'Canada',
    'Canadian': 'Canada',
    'Taiwan': 'Taiwan',
    'France': 'France',
    'French': 'France',
    'Italy': 'Italy',
    'Italian': 'Italy',
    'Austria': 'Austria',
    'Korea': 'Korea',
}

# --- Normalization Rules for Japanese Tags ---
# Goal: Unify English terms and variations into standard Japanese tags.
normalization_rules_ja = {
    # Technical specifications - Standardize format
    '1DD4BA': '1DD+4BA',
    '1DD+4BA': '1DD+4BA',
    '2DD': '2DD',
    '3DD': '3DD',
    '4DD': '4DD',
    '1BA': '1BA',
    '2BA': '2BA',
    '3BA': '3BA',
    '4BA': '4BA',
    '5BA': '5BA',
    '6BA': '6BA',
    '7BA': '7BA',
    '8BA': '8BA',
    '1DD1BA': '1DD+1BA',
    '1DD+1BA': '1DD+1BA',
    '1DD2BA': '1DD+2BA',
    '1DD+2BA': '1DD+2BA',
    '1DD3BA': '1DD+3BA',
    '1DD+3BA': '1DD+3BA',
    '1DD5BA': '1DD+5BA',
    '1DD+5BA': '1DD+5BA',
    '1DD6BA': '1DD+6BA',
    '1DD+6BA': '1DD+6BA',
    '2DD1BA': '2DD+1BA',
    '2DD+1BA': '2DD+1BA',
    '2DD2BA': '2DD+2BA',
    '2DD+2BA': '2DD+2BA',

    # Case variations, singular/plural forms, and minor variations
    'Headphone': 'ヘッドホン',
    'Headphones': 'ヘッドホン',
    'ヘッドフォン': 'ヘッドホン',
    'Earphone': 'イヤホン',
    'Earphones': 'イヤホン',
    'イヤフォン': 'イヤホン',
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

    # Product Types - Basic variations
    'IEM': 'インイヤーモニター',
    'IEMs': 'インイヤーモニター',
    'TWS': '完全ワイヤレスイヤホン',
    'DAP': 'デジタルオーディオプレーヤー',
    'Streamer': 'ネットワークストリーマー',
    'Turntable': 'レコードプレイヤー',
    'Amplifier': 'アンプ',
    'Portable DAC': 'ポータブルDAC',
    'Desktop DAC': 'デスクトップDAC',
    
    # Product Types - Detailed variations
    'Studio Monitor': 'スタジオモニター',
    'Studio Monitors': 'スタジオモニター',
    'Active Speaker': 'アクティブスピーカー',
    'Active Speakers': 'アクティブスピーカー',
    'Passive Speaker': 'パッシブスピーカー',
    'Passive Speakers': 'パッシブスピーカー',
    'Bookshelf Speaker': 'ブックシェルフスピーカー',
    'Bookshelf Speakers': 'ブックシェルフスピーカー',
    'Floor-standing Speaker': 'フロアスタンディングスピーカー',
    'Floor-standing': 'フロア型スピーカー',
    'Floorstanding Speakers': 'フロア型スピーカー',
    'フロアスタンディングスピーカ': 'フロアスタンディングスピーカー',
    'フロア型スピーカー': 'フロアスタンディングスピーカー',
    'In-Ear Monitor': 'インイヤーモニター',
    'In-ear Monitor': 'インイヤーモニター',
    'In-ear monitor': 'インイヤーモニター',
    'インイヤーモニター': 'インイヤーモニター',
    'True Wireless Earbuds': '完全ワイヤレスイヤホン',
    'Network streamer': 'ネットワークストリーマー',
    'Network player': 'ネットワークプレーヤー',
    'DAC/Amp combo': 'DAC/アンプ一体型',
    'Wireless Headphones': 'ワイヤレスヘッドホン',
    'Wireless Earphones': 'ワイヤレスイヤホン',
    'Wired Earphones': '有線イヤホン',
    'Monitor Earphones': 'モニターイヤホン',
    'Open-Ear': 'オープンイヤー',
    'Earbuds': 'イヤホン',
    'Soundbar': 'サウンドバー',
    'Subwoofer': 'サブウーファー',
    'Portable Speaker': 'ポータブルスピーカー',
    'Desktop Speaker': 'デスクトップスピーカー',
    'Center Speaker': 'センタースピーカー',
    'Integrated Amplifier': 'プリメインアンプ',
    'Power Amplifier': 'パワーアンプ',
    'Headphone Amplifier': 'ヘッドホンアンプ',
    'ヘッドフォンアンプ': 'ヘッドホンアンプ',
    'Portable Amplifier': 'ポータブルアンプ',
    'Streaming Amplifier': 'ストリーミングアンプ',
    'USB DAC': 'USB DAC',
    'Digital Audio Player': 'デジタルオーディオプレーヤー',
    'Portable Turntable': 'ポータブルターンテーブル',
    'Phono Cartridge': 'カートリッジ',
    'MM Cartridge': 'MMカートリッジ',
    'MC Cartridge': 'MCカートリッジ',
    'Audio Interface': 'オーディオインターフェース',
    'オーディオインターフェイス': 'オーディオインターフェース',
    'AV Receiver': 'AVレシーバー',
    'Portable Recorder': 'ポータブルレコーダー',
    '2-Way': '2ウェイ',
    '3-Way': '3ウェイ',
    'Tweeter': 'ツイーター',
    'Over-ear': 'オーバーイヤー',
    
    # Technology - Basic variations
    'ANC': 'アクティブノイズキャンセリング',
    'Wireless': 'ワイヤレス',
    'Dynamic driver': 'ダイナミックドライバー',
    'Adaptive EQ': 'アダプティブEQ',
    
    # Technology - Detailed variations
    'Planar Magnetic': '平面駆動型',
    'Electrostatic': 'コンデンサー型',
    'Dynamic Driver': 'ダイナミックドライバー',
    'Balanced Armature': 'バランスドアーマチュア',
    'Multi-BA': 'マルチBA',
    'Hybrid Technology': 'ハイブリッド構成',
    'Coaxial Driver': '同軸ドライバー',
    'Bone Conduction': '骨伝導',
    'Ribbon-type': 'リボン型',
    'Titanium Tweeter': 'チタンツイーター',
    'Active Noise Cancelling': 'アクティブノイズキャンセリング',
    'Open Design': 'オープンデザイン',
    'LDAC': 'LDAC',
    'aptX HD': 'aptX HD',
    'aptX Adaptive': 'aptX Adaptive',
    'aptX': 'aptX',
    'AirPlay': 'AirPlay',
    'LHDC': 'LHDC',
    'Bluetooth LE Audio': 'Bluetooth LE Audio',
    'Bluetooth': 'Bluetooth',
    'Room Correction': 'ルーム音響補正',
    'Equalizer': 'イコライザー',
    'PEQ': 'PEQ',
    'Acourate': 'Acourate',
    'Audiolense XO': 'Audiolense XO',
    'FIR Filter': 'FIRフィルター',
    'CustomTune': 'CustomTune',
    'Balanced Output': 'バランス出力',
    'Dolby Atmos': 'Dolby Atmos',
    'DTS:X': 'DTS:X',
    'Spatial Audio': '空間オーディオ',
    'Virtual Surround': 'バーチャルサラウンド',
    'Direct-drive': 'ダイレクトドライブ',
    'Belt-drive': 'ベルトドライブ',
    'Bi-amp': 'バイアンプ',
    'Class D': 'D級アンプ',
    'Full Digital': 'フルデジタル',
    'Velvet-sound': 'Velvet-sound',
    'S-Master Pro': 'S-Master Pro',
    'H1 Chip': 'H1チップ',
    'H2 Chip': 'H2チップ',
    'V2 Processor': 'V2プロセッサー',
    'VRM Technology': 'VRM技術',
    'SMC Technology': 'SMC技術',
    'Harmonious-Diaphragm': 'ハーモニアス・ダイアフラム',
    'Uni-Q': 'Uni-Q',
    'C-CAM': 'C-CAM',
    'Wood Fiber': 'ウッドファイバー',
    'DLC': 'DLC',
    'ZYLON': 'ZYLON',
    'AMT': 'AMT',
    'EQ': 'EQ',
    'USB-C': 'USB-C',
    'DSP': 'DSP',
    'Horn Tweeter': 'ホーンツイーター',
    
    # Purpose - Basic variations
    'Budget': 'コストパフォーマンス',
    'Reference': 'リファレンス',
    'Portable': 'ポータブル',
    'Desktop': 'デスクトップ',
    'Gaming': 'ゲーミング',
    'Studio': 'スタジオ',
    'Monitoring': 'モニタリング',
    'Professional': 'プロ用',
    
    # Purpose - Detailed variations
    'Budget-friendly': 'コストパフォーマンス',
    'Mid-range': 'ミドルレンジ',
    'Summit-fi': 'サミットファイ',
    'Premium': 'プレミアム',
    'Entry-level': 'エントリーレベル',
    'Entry-Level': 'エントリーレベル',
    'Mixing': 'ミキシング',
    'Mastering': 'マスタリング',
    'Music Production': '音楽制作',
    'Recording': '録音',
    'DTM': 'DTM',
    'DJ': 'DJ',
    'Portable Audio': 'ポータブル',
    'Desktop Audio': 'デスクトップ',
    'Nearfield': 'ニアフィールド',
    'Sports': 'スポーツ',
    'Fit': 'フィット',
    'Classic': 'クラシック',
    'Retro': 'レトロ',
    'Legacy Product': 'レガシー製品',
    'Discontinued': '廃盤',
    'Limited Edition': '限定版',
    'Limited edition': '限定版',
    'Revolutionary': '革命的製品',
    'Collaboration': 'コラボレーション',
    'High-end': 'ハイエンド',
    'ヴィンテージ': 'ビンテージ',
    '低価格帯': '低価格',
    '高価格帯': '高価格',
    
    # Region - All variations unified
    'USA': 'アメリカ',
    'America': 'アメリカ',
    'American': 'アメリカ',
    'UK': 'イギリス',
    'United Kingdom': 'イギリス',
    'British': 'イギリス',
    'Denmark': 'デンマーク',
    'Danish': 'デンマーク',
    'Germany': 'ドイツ',
    'German': 'ドイツ',
    'Japan': '日本',
    'Japanese': '日本',
    'Made-in-Japan': '日本製',
    'China': '中国',
    'Chinese': '中国',
    'Canada': 'カナダ',
    'Canadian': 'カナダ',
    'Taiwan': '台湾',
    'France': 'フランス',
    'French': 'フランス',
    'Italy': 'イタリア',
    'Italian': 'イタリア',
    'Austria': 'オーストリア',
    'Korea': '韓国',
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

    # Dictionary mapping language to its directories and ruleset
    processing_map = {
        'en': ([PRODUCTS_DIR_EN, COMPANIES_DIR_EN], normalization_rules_en),
        'ja': ([PRODUCTS_DIR_JA, COMPANIES_DIR_JA], normalization_rules_ja)
    }
    
    total_files_to_change = 0

    for lang, (directories, rules) in processing_map.items():
        print(f"--- Processing language: {lang.upper()} ---")
        files_to_change_lang = 0
        
        for directory in directories:
            if not directory.exists():
                print(f"Directory not found, skipping: {directory}")
                continue
            
            print(f"Processing directory: {directory.relative_to(ROOT_DIR)}")
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