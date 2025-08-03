
import os
import re
from pathlib import Path
from collections import Counter
import yaml

# --- Configuration ---
# This script requires PyYAML. If not installed, run: pip install PyYAML
# You may also need to install chardet for better encoding detection: pip install chardet

# Define project root directory
ROOT_DIR = Path(__file__).parent.parent

# Define directories for product and company files
PRODUCT_DIRS = {
    'ja': [ROOT_DIR / '_products/ja', ROOT_DIR / '_companies/ja'],
    'en': [ROOT_DIR / '_products/en', ROOT_DIR / '_companies/en'],
}

# --- Category Rules (Ported from assets/js/tag-filter.js) ---

# English Category Rules
category_rules_en = {
    'region': re.compile(r"^(USA|America|American|UK|United Kingdom|British|Denmark|Danish|Germany|German|Japan|Japanese|Made-in-Japan|China|Chinese|Canada|Canadian|Taiwan|France|French|Italy|Italian|Austria)$", re.I),
    'productType': re.compile(r"^(Headphones?|Over-ear|Earphones?|In-ear monitors?|IEM|True wireless earbuds|Wireless Earphones?|Wired earphones?|Monitor earphones?|Open-Ear|Earbuds|Speakers?|Bookshelf speakers?|Floor-standing|Floorstanding speakers?|Studio monitors?|Active speakers?|Passive speakers?|Soundbar|Subwoofer|Portable Speaker|Desktop speaker|Center speaker|Amplifier|Integrated amplifier|Power amplifier|Headphone amplifier|Portable amplifier|Streaming amplifier|DAC|USB DAC|Desktop DAC|Portable DAC|DAC/Amp combo|Digital audio player|DAP|Network streamer|Network player|Turntable|Record-player|Portable Turntable|Phono cartridge|MM cartridge|MC cartridge|Audio interface|AV Receiver|Portable Recorder|Tweeter|Wireless headphones?)$", re.I),
    'technology': re.compile(r"^(Planar magnetic|Electrostatic|Dynamic driver|Balanced armature|Multi-BA|Hybrid technology|Coaxial driver|Bone conduction|Ribbon-type|Horn Tweeter|Titanium Tweeter|AMT|Uni-Q|C-CAM|Wood Fiber|DLC|ZYLON|Active noise cancelling|ANC|Noise-?cancelling|Open-back|Closed-back|Open design|Wireless|Bluetooth|LDAC|aptX|aptX HD|aptX Adaptive|AirPlay|LHDC|Bluetooth LE Audio|DSP|Room correction|Equalizer|EQ|PEQ|Acourate|Audiolense XO|FIR Filter|CustomTune|Adaptive EQ|USB-C|USB|Balanced output|Dolby Atmos|DTS:X|Spatial audio|Virtual Surround|Direct-drive|Belt-drive|Bi-amp|Class D|Full Digital|AKM|ESS|Velvet-sound|S-Master Pro|H1 Chip|H2 Chip|V2 Processor|VRM Technology|SMC Technology|Harmonious-Diaphragm|1DD\+4BA|1DD\+3BA|1DD\+2BA|1DD\+1BA|2DD\+2BA|2DD\+1BA|2DD|3DD|4DD|1BA|2BA|3BA|4BA|5BA|6BA|7BA|8BA|2-Way|3-Way|Dual Subwoofer|Built-in Subwoofer)$", re.I),
    'purpose': re.compile(r"^(Budget-friendly|Mid-range|High-end|Summit-fi|Premium|Entry-level|Gaming|Studio|Monitoring|Mixing|Mastering|Music Production|Recording|DTM|DJ|Professional|Portable audio|Desktop audio|Nearfield|Sports|Fit|Classic|Retro|Reference|Legacy product|Discontinued|Limited edition|Revolutionary|Collaboration)$", re.I)
}

# Japanese Category Rules (includes English terms for mapping)
category_rules_ja = {
    'region': re.compile(r"^(アメリカ|米国|イギリス|英国|デンマーク|ドイツ|独|日本|日本製|中国|中華|カナダ|台湾|フランス|イタリア|韓国|オーストリア|USA|UK|Germany|Japan|China|Canada|Taiwan|France|Italy|Korea|Austria)$", re.I),
    'productType': re.compile(r"^(ヘッドホン|ワイヤレスヘッドホン|オーバーイヤー|ヘッドホンアンプ|イヤホン|完全ワイヤレスイヤホン|ワイヤレスイヤホン|有線イヤホン|モニターイヤホン|オープンイヤー|インイヤーモニター|スピーカー|ブックシェルフスピーカー|フロア型スピーカー|スタジオモニター|ニアフィールドモニター|アクティブスピーカー|パッシブスピーカー|サウンドバー|サブウーファー|ポータブルスピーカー|デスクトップスピーカー|センタースピーカー|アンプ|プリメインアンプ|パワーアンプ|ポータブルアンプ|ストリーミングアンプ|DAC|USB DAC|デスクトップDAC|ポータブルDAC|DAC/アンプコンボ|デジタルオーディオプレーヤー|ネットワークストリーマー|ネットワークプレイヤー|レコードプレイヤー|ターンテーブル|ポータブルターンテーブル|カートリッジ|MCカートリッジ|MMカートリッジ|オーディオインターフェース|AVレシーバー|ポータブルレコーダー|ツイーター|Headphones?|Earphones?|IEM|TWS|Speakers?|Soundbar|Subwoofer|Amplifier|DAC|DAP|Turntable|Player|Recorder|Interface|Receiver)$", re.I),
    'technology': re.compile(r"^(平面駆動型|プラナーマグネティック|コンデンサー型|ダイナミック型|ダイナミックドライバー|バランスドアーマチュア|マルチBA|ハイブリッド構成|同軸ドライバー|骨伝導|軟骨伝導|リボン型|ホーンツイーター|チタンツイーター|アクティブノイズキャンセリング|ノイキャン|ノイズキャンセリング|オープンバック|密閉型|開放型|オープンデザイン|ワイヤレス|Bluetooth|LDAC|aptX|aptX HD|aptX Adaptive|AirPlay|DSP|ルーム音響補正|イコライザー|FIRフィルター|アダプティブEQ|バランス出力|空間オーディオ|バーチャルサラウンド|ダイレクトドライブ|ベルトドライブ|バイアンプ|D級アンプ|フルデジタル|Planar|Electrostatic|Dynamic|BA|Hybrid|Coaxial|Bone Conduction|ANC|Open-back|Closed-back|Wireless|Spatial Audio|USB-C|Dolby Atmos|DTS:X|VRM技術|SMC技術|ハーモニアス・ダイアフラム|1DD\+4BA|1DD\+3BA|1DD\+2BA|1DD\+1BA|2DD\+2BA|2DD\+1BA|2DD|3DD|4DD|1BA|2BA|3BA|4BA|5BA|6BA|7BA|8BA|2ウェイ|3ウェイ|デュアルサブウーファー|内蔵サブウーファー)$", re.I),
    'purpose': re.compile(r"^(コストパフォーマンス|ミッドレンジ|ハイエンド|プレミアム|エントリークラス|ゲーミング|スタジオ|モニタリング|ミキシング|マスタリング|音楽制作|レコーディング|DTM|プロ用|ポータブルオーディオ|デスクトップオーディオ|デスクトップ|ニアフィールド|スポーツ|フィット|クラシック|レトロ|低価格|高価格帯|リファレンス|レガシー製品|生産終了|限定版|革命的製品|コラボレーション|Budget|High-end|Gaming|Studio|Monitoring|Portable|Desktop)$", re.I)
}

# Combined rules for lookup
ALL_RULES = {
    'en': category_rules_en,
    'ja': category_rules_ja
}

def get_category(tag, lang):
    """Determine the category for a given tag based on the language."""
    rules = ALL_RULES.get(lang)
    if not rules:
        return 'other'

    for category, pattern in rules.items():
        if pattern.search(tag):
            return category

    # Special cases from JS logic
    if tag.endswith('BA') or tag.endswith('DD'):
        return 'technology'
    if 'Channel' in tag or 'チャンネル' in tag:
        return 'technology'
    if re.match(r'^\d+in\d+out$', tag):
        return 'technology'
        
    return 'other'

def extract_tags_from_file(file_path):
    """Extract tags from a Jekyll markdown file's front matter."""
    try:
        # Read with UTF-8, but fall back to detected encoding if it fails
        try:
            content = file_path.read_text(encoding='utf-8')
        except UnicodeDecodeError:
            import chardet
            raw_data = file_path.read_bytes()
            encoding = chardet.detect(raw_data)['encoding']
            content = raw_data.decode(encoding or 'utf-8')

        match = re.search(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
        if match:
            front_matter = yaml.safe_load(match.group(1))
            if isinstance(front_matter, dict) and 'tags' in front_matter and front_matter['tags']:
                # Ensure all tags are strings
                tags = front_matter['tags']
                if isinstance(tags, list):
                    return [str(tag) for tag in tags if tag is not None]
                elif isinstance(tags, str):
                    return [tags]
    except yaml.YAMLError as e:
        print(f"Error parsing YAML in {file_path}: {e}")
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
    return []

def analyze_tags():
    """Analyze tags for each language and print the results."""
    
    all_tags_by_lang = {
        'ja': [],
        'en': []
    }

    print("Starting tag analysis...")
    for lang, directories in PRODUCT_DIRS.items():
        for directory in directories:
            print(f"Scanning directory: {directory}")
            if not directory.exists():
                print(f"Warning: Directory not found, skipping: {directory}")
                continue

            files = list(directory.glob('**/*.md'))
            print(f"Found {len(files)} markdown files in '{directory.relative_to(ROOT_DIR)}'.")

            for file_path in files:
                tags = extract_tags_from_file(file_path)
                if tags:
                    all_tags_by_lang[lang].extend(tags)
    
    print("\n" + "="*50)
    print(" TAG ANALYSIS RESULTS")
    print("="*50 + "\n")

    for lang, tags in all_tags_by_lang.items():
        if not tags:
            print(f"--- No tags found for {lang.upper()} --- \n")
            continue

        categorized_tags = {
            'region': [],
            'productType': [],
            'technology': [],
            'purpose': [],
            'other': []
        }

        for tag in tags:
            category = get_category(tag, lang)
            categorized_tags[category].append(tag)

        print(f"--- Analysis for {lang.upper()} ({len(tags)} total tags from {len(set(tags))} unique tags) ---")
        
        for category, tag_list in categorized_tags.items():
            if not tag_list:
                continue
            
            print(f"\n  [{category.upper()}] - {len(tag_list)} tags ({len(set(tag_list))} unique)")
            counts = Counter(tag_list)
            for tag, count in counts.most_common():
                print(f"    - {tag}: {count}")
        
        print("\n" + "-"*50 + "\n")

if __name__ == '__main__':
    analyze_tags() 