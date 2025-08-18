
import argparse
import os
import re
from pathlib import Path
from datetime import datetime, time

# Define project root directory
ROOT_DIR = Path(__file__).parent.parent

# Define directories for product and company files
PRODUCTS_DIR_EN = ROOT_DIR / '_products/en'
PRODUCTS_DIR_JA = ROOT_DIR / '_products/ja'
COMPANIES_DIR_EN = ROOT_DIR / '_companies/en'
COMPANIES_DIR_JA = ROOT_DIR / '_companies/ja'


# --- English Tag Normalization Rules ---
# Goal: Enforce consistency for audio product tags only.
normalization_rules_en = {
    # Essential product type normalizations (singular to plural)
    'headphone': 'Headphones',
    'earphone': 'Earphones',
    'speaker': 'Speakers',
    'bookshelf speaker': 'Bookshelf speakers',
    'floorstanding speaker': 'Floorstanding speakers',
    'studio monitor': 'Studio monitors',
    'active speaker': 'Active speakers',
    'passive speaker': 'Passive speakers',
    'in-ear monitor': 'In-ear monitors',
    'true wireless earbud': 'True wireless earbuds',
    'amplifier': 'Amplifiers',
    'microphone': 'Microphones',
    'subwoofer': 'Subwoofers',
    'cartridge': 'Cartridges',
    'converter': 'Converters',
    'processor': 'Processors',
    'recorder': 'Recorders',
    'mixer': 'Mixers',
    'interface': 'Interfaces',
    'receiver': 'Receivers',
    'streamer': 'Streamers',
    'player': 'Players',
    'preamp': 'Preamps',
    'equalizer': 'Equalizers',
    'compressor': 'Compressors',
    'cable': 'Cables',
    'accessory': 'Accessories',

    # Technical specifications - Standardize format
    '1dd4ba': '1DD+4BA',
    '1dd+4ba': '1DD+4BA',
    '2dd': '2DD',
    '3dd': '3DD',
    '4dd': '4DD',
    '1ba': '1BA',
    '2ba': '2BA',
    '3ba': '3BA',
    '4ba': '4BA',
    '5ba': '5BA',
    '6ba': '6BA',
    '7ba': '7BA',
    '8ba': '8BA',
    '1dd1ba': '1DD+1BA',
    '1dd+1ba': '1DD+1BA',
    '1dd2ba': '1DD+2BA',
    '1dd+2ba': '1DD+2BA',
    '1dd3ba': '1DD+3BA',
    '1dd+3ba': '1DD+3BA',
    '1dd5ba': '1DD+5BA',
    '1dd+5ba': '1DD+5BA',
    '1dd6ba': '1DD+6BA',
    '1dd+6ba': '1DD+6BA',
    '2dd1ba': '2DD+1BA',
    '2dd+1ba': '2DD+1BA',
    '2dd2ba': '2DD+2BA',
    '2dd+2ba': '2DD+2BA',

    # Essential aliases and variations
    'iems': 'In-ear monitors',
    'iem': 'In-ear monitors',
    'streamer': 'Network streamer',
    'player': 'Network player',
    'dac/amp': 'DAC/Amp combo',
    'record player': 'Turntable',
    'noise-cancelling': 'Noise cancelling',
    'noise canceling': 'Noise cancelling',
    'active noise cancellation': 'Active noise cancelling',
    'anc leading': 'Active noise cancelling',
    'active-noise-cancellation': 'Active noise cancelling',
    'noise-canceling': 'Noise cancelling',
    'open back': 'Open-back',
    'closed back': 'Closed-back',
    'entry level': 'Entry-level',
    'entry-level': 'Entry-level',
    'entry model': 'Entry-level',
    'entry-model': 'Entry-level',
    'entry-class': 'Entry-level',
    'entry': 'Entry-level',
    'mid range': 'Mid-range',
    'mid-range': 'Mid-range',
    'mid-price': 'Mid-range',
    'mid-price range': 'Mid-range',
    'high end': 'High-end',
    'high-end audio': 'High-end',
    'high-price': 'High-end',
    'high-end': 'High-end',
    'summit fi': 'Summit-fi',
    'summit-fi': 'Summit-fi',
    'budget-friendly': 'Budget',
    'budget focused': 'Budget',
    'budget-focused': 'Budget',
    'budget-oriented': 'Budget',
    'budget range': 'Budget',
    'budget segment': 'Budget',
    'low cost': 'Budget',
    'low-price': 'Budget',
    'low-price range': 'Budget',
    'low price': 'Budget',
    'cost performance': 'Budget',
    'cost-performance': 'Budget',
    'high cost performance': 'Budget',
    'high cost-performance': 'Budget',

    # Essential product type variations
    'wireless headphones': 'Wireless headphones',
    'wireless earphones': 'Wireless earphones',
    'wired earphones': 'Wired earphones',
    'monitor earphones': 'Monitor earphones',
    'open-ear': 'Open-ear',
    'earbuds': 'Earbuds',
    'bookshelf speakers': 'Bookshelf speakers',
    'floor-standing': 'Floor-standing',
    'floorstanding speakers': 'Floorstanding speakers',
    'studio monitors': 'Studio monitors',
    'active speakers': 'Active speakers',
    'passive speakers': 'Passive speakers',
    'soundbar': 'Soundbar',
    'subwoofer': 'Subwoofer',
    'portable speaker': 'Portable speaker',
    'desktop speaker': 'Desktop speaker',
    'center speaker': 'Center speaker',
    'integrated amplifier': 'Integrated amplifier',
    'power amplifier': 'Power amplifier',
    'headphone amplifier': 'Headphone amplifier',
    'portable amplifier': 'Portable amplifier',
    'streaming amplifier': 'Streaming amplifier',
    'usb dac': 'USB DAC',
    'desktop dac': 'Desktop DAC',
    'portable dac': 'Portable DAC',
    'digital audio player': 'Digital audio player',
    'network streamer': 'Network streamer',
    'network player': 'Network player',
    'portable turntable': 'Portable turntable',
    'phono cartridge': 'Phono cartridge',
    'mm cartridge': 'MM cartridge',
    'mc cartridge': 'MC cartridge',
    'audio interface': 'Audio interface',
    'av receiver': 'AV Receiver',
    'portable recorder': 'Portable recorder',
    '2-way': '2-Way',
    '3-way': '3-Way',
    'tweeter': 'Tweeter',
    'over-ear': 'Over-ear',
    
    # Essential technology variations
    'planar magnetic': 'Planar magnetic',
    'electrostatic': 'Electrostatic',
    'dynamic driver': 'Dynamic driver',
    'balanced armature': 'Balanced armature',
    'multi-ba': 'Multi-BA',
    'hybrid technology': 'Hybrid technology',
    'coaxial driver': 'Coaxial driver',
    'bone conduction': 'Bone conduction',
    'ribbon-type': 'Ribbon-type',
    'horn tweeter': 'Horn tweeter',
    'titanium tweeter': 'Titanium tweeter',
    'active noise cancelling': 'Active noise cancelling',
    'open design': 'Open design',
    'aptx hd': 'aptX HD',
    'aptx adaptive': 'aptX Adaptive',
    'airplay': 'AirPlay',
    'lhdc': 'LHDC',
    'bluetooth le audio': 'Bluetooth LE Audio',
    'room correction': 'Room correction',
    'equalizer': 'Equalizer',
    'peq': 'PEQ',
    'acourate': 'Acourate',
    'audiolense xo': 'Audiolense XO',
    'fir filter': 'FIR Filter',
    'customtune': 'CustomTune',
    'adaptive eq': 'Adaptive EQ',
    'balanced output': 'Balanced output',
    'dolby atmos': 'Dolby Atmos',
    'dts:x': 'DTS:X',
    'spatial audio': 'Spatial audio',
    'virtual surround': 'Virtual surround',
    'direct-drive': 'Direct-drive',
    'belt-drive': 'Belt-drive',
    'bi-amp': 'Bi-amp',
    'class a': 'Class A',
    'class-a': 'Class A',
    'class ab': 'Class AB',
    'class a b': 'Class AB',
    'class a/b': 'Class AB',
    'class d': 'Class D',
    'class-d': 'Class D',
    'full digital': 'Full Digital',
    'velvet-sound': 'Velvet-sound',
    's-master pro': 'S-Master Pro',
    'h1 chip': 'H1 Chip',
    'h2 chip': 'H2 Chip',
    'v2 processor': 'V2 Processor',
    'vrm technology': 'VRM Technology',
    'smc technology': 'SMC Technology',
    'harmonious-diaphragm': 'Harmonious-Diaphragm',
    'uni-q': 'Uni-Q',
    'c-cam': 'C-CAM',
    'wood fiber': 'Wood Fiber',
    'dlc': 'DLC',
    'zylon': 'ZYLON',
    'amt': 'AMT',
    'eq': 'EQ',
    'ladder dac': 'R2R',
    'hi-res': 'Hi-Res',
    'hi-res audio': 'Hi-Res',
    
    # Essential purpose variations
    'budget-friendly': 'Budget',
    'mid-range': 'Mid-range',
    'summit-fi': 'Summit-fi',
    'premium': 'Premium',
    'entry-level': 'Entry-level',
    'gaming': 'Gaming',
    'studio': 'Studio',
    'monitoring': 'Monitoring',
    'mixing': 'Mixing',
    'mastering': 'Mastering',
    'music production': 'Music Production',
    'recording': 'Recording',
    'dtm': 'DTM',
    'dj': 'DJ',
    'professional': 'Professional',
    'portable audio': 'Portable',
    'desktop audio': 'Desktop',
    'nearfield': 'Nearfield',
    'sports': 'Sports',
    'fit': 'Fit',
    'classic': 'Classic',
    'retro': 'Retro',
    'reference': 'Reference',
    'legacy product': 'Legacy product',
    'discontinued': 'Discontinued',
    'limited edition': 'Limited edition',
    'revolutionary': 'Revolutionary',
    'collaboration': 'Collaboration',
    
    # Essential region variations
    'usa': 'America',
    'america': 'America',
    'american': 'America',
    'uk': 'United Kingdom',
    'united kingdom': 'United Kingdom',
    'british': 'United Kingdom',
    'denmark': 'Denmark',
    'danish': 'Denmark',
    'germany': 'Germany',
    'german': 'Germany',
    'japan': 'Japan',
    'japanese': 'Japan',
    'made in japan': 'Japan',
    'made-in-japan': 'Japan',
    'japanese brand': 'Japan',
    'japanese manufacturer': 'Japan',
    'china': 'China',
    'chinese': 'China',
    'chinese audio': 'China',
    'chinese brand': 'China',
    'chinese manufacturer': 'China',
    'canada': 'Canada',
    'canadian': 'Canada',
    'taiwan': 'Taiwan',
    'france': 'France',
    'french': 'France',
    'italy': 'Italy',
    'italian': 'Italy',
    'austria': 'Austria',
    'korea': 'Korea',
    'korean': 'Korea',
    'hong kong': 'Hong Kong',
    
    # Essential purpose and category variations
    'premium audio': 'Premium',
    'premium audio company': 'Premium',
    'professional audio': 'Professional',
    'entry model': 'Entry-level',
    'entry level': 'Entry-level',
    'entry-level': 'Entry-level',
    'headset': 'Headset',
    'chifi': 'Chi-Fi',
    'network audio': 'Network audio',
}

# --- Normalization Rules for Japanese Tags ---
# Goal: Unify English terms and variations into standard Japanese tags.
normalization_rules_ja = {
    # Technical specifications - Standardize format
    '1dd4ba': '1DD+4BA',
    '1dd+4ba': '1DD+4BA',
    '2dd': '2DD',
    '3dd': '3DD',
    '4dd': '4DD',
    '1ba': '1BA',
    '2ba': '2BA',
    '3ba': '3BA',
    '4ba': '4BA',
    '5ba': '5BA',
    '6ba': '6BA',
    '7ba': '7BA',
    '8ba': '8BA',
    '1dd1ba': '1DD+1BA',
    '1dd+1ba': '1DD+1BA',
    '1dd2ba': '1DD+2BA',
    '1dd+2ba': '1DD+2BA',
    '1dd3ba': '1DD+3BA',
    '1dd+3ba': '1DD+3BA',
    '1dd5ba': '1DD+5BA',
    '1dd+5ba': '1DD+5BA',
    '1dd6ba': '1DD+6BA',
    '1dd+6ba': '1DD+6BA',
    '2dd1ba': '2DD+1BA',
    '2dd+1ba': '2DD+1BA',
    '2dd2ba': '2DD+2BA',
    '2dd+2ba': '2DD+2BA',

    # Case variations, singular/plural forms, and minor variations
    'headphone': 'ヘッドホン',
    'headphones': 'ヘッドホン',
    'ヘッドフォン': 'ヘッドホン',
    'earphone': 'イヤホン',
    'earphones': 'イヤホン',
    'イヤフォン': 'イヤホン',
    'speaker': 'スピーカー',
    'speakers': 'スピーカー',
    'noise-cancelling': 'ノイズキャンセリング',
    'noise cancelling': 'ノイズキャンセリング',
    'open-back': 'オープンバック',
    'closed-back': '密閉型',
    'fiio': 'FiiO',
    'akm': 'AKM',
    'ess': 'ESS',
    'hdmi-arc': 'HDMI ARC',
    'preamp': 'プリアンプ',
    '統合アンプ': 'インテグレーテッドアンプ',
    'touchscreen': 'タッチスクリーン',

    # Product Types - Basic variations
    'iem': 'インイヤーモニター',
    'iems': 'インイヤーモニター',
    'tws': '完全ワイヤレスイヤホン',
    'dap': 'デジタルオーディオプレーヤー',
    'streamer': 'ネットワークストリーマー',
    'turntable': 'レコードプレイヤー',
    'amplifier': 'アンプ',
    'portable dac': 'ポータブルDAC',
    'desktop dac': 'デスクトップDAC',
    
    # Product Types - Detailed variations
    'studio monitor': 'スタジオモニター',
    'studio monitors': 'スタジオモニター',
    'active speaker': 'アクティブスピーカー',
    'active speakers': 'アクティブスピーカー',
    'passive speaker': 'パッシブスピーカー',
    'passive speakers': 'パッシブスピーカー',
    'bookshelf speaker': 'ブックシェルフスピーカー',
    'bookshelf speakers': 'ブックシェルフスピーカー',
    'floor-standing speaker': 'フロアスタンディングスピーカー',
    'floor-standing': 'フロア型スピーカー',
    'floorstanding speakers': 'フロア型スピーカー',
    'floorstanding speaker': 'フロア型スピーカー',
    'フロアスタンディングスピーカ': 'フロアスタンディングスピーカー',
    'フロア型スピーカー': 'フロアスタンディングスピーカー',
    'in-ear monitor': 'インイヤーモニター',
    'インイヤーモニター': 'インイヤーモニター',
    'true wireless earbuds': '完全ワイヤレスイヤホン',
    'network streamer': 'ネットワークストリーマー',
    'network player': 'ネットワークプレーヤー',
    'dac/amp combo': 'DAC/アンプ一体型',
    'wireless headphones': 'ワイヤレスヘッドホン',
    'wireless earphones': 'ワイヤレスイヤホン',
    'wired earphones': '有線イヤホン',
    'monitor earphones': 'モニターイヤホン',
    'open-ear': 'オープンイヤー',
    'earbuds': 'イヤホン',
    'soundbar': 'サウンドバー',
    'subwoofer': 'サブウーファー',
    'portable speaker': 'ポータブルスピーカー',
    'desktop speaker': 'デスクトップスピーカー',
    'center speaker': 'センタースピーカー',
    'integrated amplifier': 'プリメインアンプ',
    'power amplifier': 'パワーアンプ',
    'headphone amplifier': 'ヘッドホンアンプ',
    'ヘッドフォンアンプ': 'ヘッドホンアンプ',
    'portable amplifier': 'ポータブルアンプ',
    'streaming amplifier': 'ストリーミングアンプ',
    'usb dac': 'USB DAC',
    'usb-dac': 'USB DAC',
    'digital audio player': 'デジタルオーディオプレーヤー',
    'portable turntable': 'ポータブルターンテーブル',
    'phono cartridge': 'カートリッジ',
    'mm cartridge': 'MMカートリッジ',
    'mc cartridge': 'MCカートリッジ',
    'audio interface': 'オーディオインターフェース',
    'オーディオインターフェイス': 'オーディオインターフェース',
    'av receiver': 'AVレシーバー',
    'portable recorder': 'ポータブルレコーダー',
    'マイクロフォン': 'マイクロホン',
    '2-way': '2ウェイ',
    '3-way': '3ウェイ',
    'tweeter': 'ツイーター',
    'over-ear': 'オーバーイヤー',
    
    # Technology - Basic variations
    'anc': 'アクティブノイズキャンセリング',
    'wireless': 'ワイヤレス',
    'dynamic driver': 'ダイナミックドライバー',
    'adaptive eq': 'アダプティブEQ',
    
    # Technology - Detailed variations
    'planar magnetic': '平面駆動型',
    'electrostatic': 'コンデンサー型',
    'balanced armature': 'バランスドアーマチュア',
    'multi-ba': 'マルチBA',
    'hybrid technology': 'ハイブリッド構成',
    'coaxial driver': '同軸ドライバー',
    'bone conduction': '骨伝導',
    'ribbon-type': 'リボン型',
    'titanium tweeter': 'チタンツイーター',
    'active noise cancelling': 'アクティブノイズキャンセリング',
    'open design': 'オープンデザイン',
    'ldac': 'LDAC',
    'aptx hd': 'aptX HD',
    'aptx adaptive': 'aptX Adaptive',
    'aptx': 'aptX',
    'airplay': 'AirPlay',
    'lhdc': 'LHDC',
    'bluetooth le audio': 'Bluetooth LE Audio',
    'bluetooth': 'Bluetooth',
    'room correction': 'ルーム音響補正',
    'equalizer': 'イコライザー',
    'peq': 'PEQ',
    'acourate': 'Acourate',
    'audiolense xo': 'Audiolense XO',
    'fir filter': 'FIRフィルター',
    'customtune': 'CustomTune',
    'balanced output': 'バランス出力',
    'dolby atmos': 'Dolby Atmos',
    'dts:x': 'DTS:X',
    'spatial audio': '空間オーディオ',
    'virtual surround': 'バーチャルサラウンド',
    'direct-drive': 'ダイレクトドライブ',
    'belt-drive': 'ベルトドライブ',
    'bi-amp': 'バイアンプ',
    'クラスa': 'A級',
    'class a': 'A級',
    'クラスab': 'AB級',
    'class ab': 'AB級',
    'class d': 'D級',
    'class-d': 'D級',
    'd級アンプ': 'D級',
    'クラスd': 'D級',
    'class d アンプ': 'D級',
    'full digital': 'フルデジタル',
    'velvet-sound': 'Velvet-sound',
    's-master pro': 'S-Master Pro',
    'h1 chip': 'H1チップ',
    'h2 chip': 'H2チップ',
    'v2 processor': 'V2プロセッサー',
    'vrm technology': 'VRM技術',
    'smc technology': 'SMC技術',
    'harmonious-diaphragm': 'ハーモニアス・ダイアフラム',
    'uni-q': 'Uni-Q',
    'c-cam': 'C-CAM',
    'wood fiber': 'ウッドファイバー',
    'dlc': 'DLC',
    'zylon': 'ZYLON',
    'amt': 'AMT',
    'eq': 'EQ',
    'usb-c': 'USB-C',
    'dsp': 'DSP',
    'horn tweeter': 'ホーンツイーター',
    'ラダーdac': 'R2R',
    
    # Purpose - Basic variations
    'budget': 'コストパフォーマンス',
    'reference': 'リファレンス',
    'portable': 'ポータブル',
    'desktop': 'デスクトップ',
    'gaming': 'ゲーミング',
    'studio': 'スタジオ',
    'monitoring': 'モニタリング',
    'professional': 'プロ用',
    
    # Purpose - Detailed variations
    'budget-friendly': 'コストパフォーマンス',
    '高コスパ': 'コストパフォーマンス',
    'mid-range': 'ミドルレンジ',
    'summit-fi': 'サミットファイ',
    'premium': 'プレミアム',
    'entry-level': 'エントリーレベル',
    'mixing': 'ミキシング',
    'mastering': 'マスタリング',
    'music production': '音楽制作',
    'recording': '録音',
    'dtm': 'DTM',
    'dj': 'DJ',
    'portable audio': 'ポータブル',
    'desktop audio': 'デスクトップ',
    'network audio': 'ネットワークオーディオ',
    'nearfield': 'ニアフィールド',
    'sports': 'スポーツ',
    'fit': 'フィット',
    'classic': 'クラシック',
    'retro': 'レトロ',
    'legacy product': 'レガシー製品',
    'discontinued': '廃盤',
    'limited edition': '限定版',
    'revolutionary': '革命的製品',
    'collaboration': 'コラボレーション',
    'high-end': 'ハイエンド',
    'ハイエンドオーディオ': 'ハイエンド',
    'ヴィンテージ': 'ビンテージ',
    '低価格帯': '低価格',
    'budget audio': '低価格',
    '高価格帯': '高価格',
    'ハイレゾ対応': 'ハイレゾ',
    'Hi-Res Audio': 'ハイレゾ',
    'Hi-Res': 'ハイレゾ',
    
    # Region - All variations unified
    'usa': 'アメリカ',
    'america': 'アメリカ',
    'アメリカ製': 'アメリカ',
    'american': 'アメリカ',
    'uk': 'イギリス',
    'united kingdom': 'イギリス',
    'british': 'イギリス',
    '英国': 'イギリス',
    'denmark': 'デンマーク',
    'danish': 'デンマーク',
    'germany': 'ドイツ',
    'german': 'ドイツ',
    'japan': '日本',
    'japanese': '日本',
    'made-in-japan': '日本',
    '日本製': '日本',
    '日本ブランド': '日本',
    '日本メーカー': '日本',
    'japanese brand': '日本',
    'china': '中国',
    'chinese': '中国',
    '中国メーカー': '中国',
    '中華メーカー': '中国',
    '中国ブランド': '中国',
    '中華ブランド': '中国',
    '中華オーディオ': '中国',
    'chinese audio': '中国',
    'canada': 'カナダ',
    'canadian': 'カナダ',
    'taiwan': '台湾',
    'france': 'フランス',
    'french': 'フランス',
    'italy': 'イタリア',
    'italian': 'イタリア',
    'austria': 'オーストリア',
    'korea': '韓国',
    '韓国メーカー': '韓国',
    'hong kong': '香港',
    
    # Product type variations
    '高級オーディオ': '高級',
    '高級機器': '高級',
    '高級機': '高級',
    'エントリーモデル': 'エントリークラス',
    'エントリーレベル': 'エントリークラス',
    'headset': 'ヘッドセット',

    # Company
    'sony': 'ソニー',
    'panasonic': 'パナソニック',
    'technics': 'テクニクス',
    'yamaha': 'ヤマハ',
    'denon': 'デノン',
    'marantz': 'マランツ',
    'pioneer': 'パイオニア',
    'onkyo': 'オンキヨー',
    'accuphase': 'アキュフェーズ',
    'luxman': 'ラックスマン',
    'esoteric': 'エソテリック',
    'teac': 'ティアック',
    'audio-technica': 'オーディオテクニカ',
    'final': 'ファイナル',
    'stax': 'スタックス',
    'fostex': 'フォステクス',
    'rotel': 'ローテル',
    'tad': 'タッド',
    'triode': 'トライオード',
    'phasemation': 'フェーズメーション',
    'soulnote': 'ソウルノート',
    'ortofon': 'オルトフォン',

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

    # Create case-insensitive lookup dictionary for better performance
    case_insensitive_rules = {key.lower(): value for key, value in rules.items()}

    for tag in tags:
        # Get the normalized tag using case-insensitive matching
        normalized_tag = case_insensitive_rules.get(tag.lower(), tag)
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

        # Date filter: if --before is specified globally, skip files dated after it
        before_dt = globals().get("__BEFORE_DATETIME__", None)
        if before_dt is not None:
            # Expect YAML date in YYYY-MM-DD
            m = re.search(r'^date:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})\s*$', front_matter_str, re.MULTILINE)
            if m:
                try:
                    file_date = datetime.strptime(m.group(1), "%Y-%m-%d")
                    if file_date > before_dt:
                        print(f"[SKIP] {file_path.relative_to(ROOT_DIR)} (metadata date '{m.group(1)}' is after --before)")
                        return False
                except ValueError:
                    print(f"[SKIP] {file_path.relative_to(ROOT_DIR)} (invalid metadata date '{m.group(1)}' with --before)")
                    return False
            else:
                print(f"[SKIP] {file_path.relative_to(ROOT_DIR)} (no metadata date with --before)")
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
    parser = argparse.ArgumentParser(description="Normalize tags in product/company markdown files.")
    parser.add_argument('--dry-run', action='store_true', help="Show what would be changed without actually modifying files.")
    parser.add_argument('--fix', action='store_false', dest='dry_run', help="Apply the changes to the files.")
    parser.add_argument('--before', type=str, help="Process only files whose metadata date is on/before this datetime (YYYY-MM-DD[THH:MM[:SS]])")
    parser.add_argument('--file', type=str, action='append', help="Process only the specified file path (relative to project root). Can be used multiple times.")
    parser.set_defaults(dry_run=True)
    
    args = parser.parse_args()

    # Parse --before argument
    def _parse_before_datetime(before: str):
        formats = [
            "%Y-%m-%d",
            "%Y-%m-%dT%H:%M",
            "%Y-%m-%d %H:%M",
            "%Y-%m-%dT%H:%M:%S",
            "%Y-%m-%d %H:%M:%S",
        ]
        for fmt in formats:
            try:
                dt = datetime.strptime(before, fmt)
                if fmt == "%Y-%m-%d":
                    return datetime.combine(dt.date(), time.min)
                return dt
            except ValueError:
                continue
        print(f"[WARNING] '--before' has an unrecognized format: {before}. Expected YYYY-MM-DD[THH:MM[:SS]]")
        return None

    before_dt = _parse_before_datetime(args.before) if args.before else None
    # Expose to normalize_tags_in_file without refactoring many signatures
    globals()["__BEFORE_DATETIME__"] = before_dt

    # Handle multiple file processing
    if args.file:
        print(f"Processing {len(args.file)} specified file(s)...")
        print(f"Mode: {'Dry Run' if args.dry_run else 'Fix'}")
        print("=" * 40)
        
        files_processed = 0
        files_changed = 0
        
        for file_path_str in args.file:
            file_path = ROOT_DIR / file_path_str
            if not file_path.exists():
                print(f"Error: File not found: {file_path_str}")
                continue
            
            # Determine language and rules based on file path
            if '/en/' in file_path_str:
                rules = normalization_rules_en
                lang = 'en'
            elif '/ja/' in file_path_str:
                rules = normalization_rules_ja
                lang = 'ja'
            else:
                print(f"Error: Cannot determine language for file: {file_path_str}")
                print("File must be in a directory containing '/en/' or '/ja/'")
                continue
            
            print(f"Processing: {file_path_str} ({lang.upper()})")
            
            if normalize_tags_in_file(file_path, rules, args.dry_run):
                files_changed += 1
            files_processed += 1
        
        print("=" * 40)
        print(f"Processed {files_processed} file(s), {files_changed} file(s) changed.")
        if args.dry_run and files_changed > 0:
            print("Run with --fix to apply these changes.")
        return

    print(f"Starting tag normalization for all articles...")
    print(f"Mode: {'Dry Run' if args.dry_run else 'Fix'}")
    if before_dt is not None:
        print(f"Filter: on/before {before_dt.isoformat(sep=' ')}")
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