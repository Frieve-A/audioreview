// Common tag definitions - single source of truth for all categories

// Product Type Tags
const productTypeTags_en = [
    'In-ear monitors', 'Headphones', 'DAC', 'Studio monitors', 'Earphones', 'Bookshelf speakers',
    'Active speakers', 'Integrated amplifier', 'Audio interface', 'Headphone amplifier',
    'Wireless earphones', 'Speakers', 'Amplifiers', 'Passive speakers', 'Home Theater', 'AV Receiver',
    'Subwoofer', 'Power amplifier', 'Network streamer', 'True wireless earbuds', 'Wireless headphones', 'Wireless Earbuds',
    'Network audio', 'Floorstanding speakers', 'USB DAC', 'Portable speaker', 'Turntable', 'Preamps',
    'Over-ear', 'Preamplifier', 'Open-ear', 'Portable DAC', 'Desktop DAC', 'Soundbar', 'Microphones',
    'Audio Accessories', 'Earbuds', 'DAP', 'Network player', 'Wired earphones', 'Desktop speaker',
    'Portable recorder', 'Measurement Equipment', 'MC cartridge', 'Phono cartridge', 'DAC/Amp combo',
    'Digital audio player', 'home theater', 'Monitor earphones', 'Center speaker', 'In-Ear Monitors',
    'Tweeter', 'Streaming amplifier', 'Portable amplifier', 'Portable turntable', 'MM cartridge',
    'Cables', 'DAW', 'Digital mixer', 'Headset'
];

const productTypeTags_ja = [
    'インイヤーモニター', 'ヘッドホン', 'DAC', 'スタジオモニター', 'イヤホン', 'ブックシェルフスピーカー',
    'アクティブスピーカー', '完全ワイヤレスイヤホン', 'オーディオインターフェース', 'ヘッドホンアンプ',
    'スピーカー', 'ワイヤレスイヤホン', 'アンプ', 'ホームシアター', 'パッシブスピーカー', 'AVレシーバー',
    'インテグレーテッドアンプ', 'サブウーファー', 'フロアスタンディングスピーカー', 'パワーアンプ',
    'プリメインアンプ', 'プリアンプ', 'ワイヤレスヘッドホン', 'ネットワークオーディオ', 'USB DAC',
    'ネットワークストリーマー', 'ポータブルスピーカー', 'ターンテーブル', 'オーバーイヤー', 'ポータブルDAC',
    'デスクトップDAC', 'オープンイヤー', 'サウンドバー', 'デジタルオーディオプレーヤー', 'マイクロホン',
    'デスクトップスピーカー', 'カートリッジ', 'ストリーマー', 'ネットワークプレーヤー', 'オーディオアクセサリー',
    'ポータブルレコーダー', 'ポータブルアンプ', '有線イヤホン', '測定機器', 'MCカートリッジ',
    'モニターイヤホン', 'センタースピーカー', 'ツイーター', 'ストリーミングアンプ', 'レコードプレイヤー',
    'ポータブルターンテーブル', 'MMカートリッジ', 'ケーブル', 'DAW', 'デジタルミキサー', 'ヘッドセット',
    'DAC/アンプ一体型'
];

// Region Tags
const regionTags_en = [
    'America', 'United Kingdom', 'Denmark', 'Germany', 'Japan', 'China', 'Canada',
    'Taiwan', 'France', 'Italy', 'Austria', 'Switzerland', 'Norway', 'Hong Kong', 'Korea'
];

const regionTags_ja = [
    'アメリカ', 'イギリス', 'デンマーク', 'ドイツ', '日本', '中国', 'カナダ',
    '台湾', 'フランス', 'イタリア', 'オーストリア', 'スイス', 'ノルウェー', '香港', '韓国'
];

// Technology Tags
const technologyTags_en = [
    'Planar magnetic', 'Electrostatic', 'Dynamic driver', 'Balanced armature',
    'Multi-BA', 'Hybrid technology', 'Hybrid', 'Hybrid IEM', 'Coaxial driver', 'Bone conduction',
    'Ribbon-type', 'Horn tweeter', 'Titanium tweeter', 'AMT', 'Uni-Q', 'C-CAM', 'Wood Fiber',
    'DLC', 'ZYLON', 'Active noise cancelling', 'Noise cancelling', 'ANC', 'Open-back', 'Closed-back',
    'Open design', 'Wireless', 'Bluetooth', 'LDAC', 'aptX', 'aptX HD', 'aptX Adaptive', 'AirPlay',
    'LHDC', 'Bluetooth LE Audio', 'DSP', 'Room correction', 'Equalizer', 'EQ', 'PEQ', 'Acourate',
    'Audiolense XO', 'FIR Filter', 'CustomTune', 'Adaptive EQ', 'USB-C', 'USB', 'Balanced output',
    'Dolby Atmos', 'DTS:X', 'Spatial audio', 'Virtual surround', 'Direct-drive', 'Belt-drive',
    'Bi-amp', 'Class A', 'Class AB', 'Class D', 'Full Digital', 'AKM', 'ESS', 'Velvet-sound', 'S-Master Pro', 'H1 Chip',
    'H2 Chip', 'V2 Processor', 'VRM Technology', 'SMC Technology', 'Harmonious-Diaphragm',
    'Hi-res', 'Hi-Res', 'High-Resolution', 'Analog', 'Analog Audio', 'Analog Equipment',
    'Waterproof', 'IPX5', 'IPX7 Waterproof', 'IP67 Waterproof', '1DD+4BA', '1DD+3BA', '1DD+2BA',
    '1DD+1BA', '2DD+2BA', '2DD+1BA', '2DD', '3DD', '4DD', '1BA', '2BA', '3BA', '4BA', '5BA', '6BA',
    '7BA', '8BA', '2-Way', '3-Way', 'Dual Subwoofer', 'Built-in Subwoofer', 'Hybrid driver',
    'Vacuum tube', 'R2R', 'Room correction', 'Planar magnetic', 'Beryllium', 'Bookshelf'
];

const technologyTags_ja = [
    '平面駆動型', 'コンデンサー型', 'ダイナミック型', 'ダイナミックドライバー', 'バランスドアーマチュア',
    'マルチBA', 'ハイブリッド構成', 'ハイブリッド', '同軸ドライバー', '骨伝導', '軟骨伝導',
    'リボン型', 'ホーンツイーター', 'チタンツイーター', 'アクティブノイズキャンセリング',
    'ノイズキャンセリング', 'ノイキャン', 'オープンバック', '密閉型', '開放型', 'オープンデザイン',
    'ワイヤレス', 'Bluetooth', 'LDAC', 'aptX', 'aptX HD', 'aptX Adaptive', 'AirPlay', 'DSP',
    'ルーム音響補正', 'イコライザー', 'FIRフィルター', 'バランス出力', 'Dolby Atmos',
    '空間オーディオ', 'バーチャルサラウンド', 'ダイレクトドライブ', 'ベルトドライブ', 'バイアンプ',
    'A級', 'AB級', 'D級', 'フルデジタル', 'VRM技術', 'SMC技術', 'ハーモニアス・ダイアフラム', 'ハイレゾ',
    'ハイレゾリューション', 'アナログ', 'アナログオーディオ', '防水', 'IPX5', 'IPX7防水',
    'IP67防水', '1DD+4BA', '1DD+3BA', '1DD+2BA', '1DD+1BA', '2DD+2BA', '2DD+1BA', '2DD',
    '3DD', '4DD', '1BA', '2BA', '3BA', '4BA', '5BA', '6BA', '7BA', '8BA', '2ウェイ', '3ウェイ',
    'デュアルサブウーファー', '内蔵サブウーファー', 'ハイブリッドドライバー', '真空管', 'R2R',
    'ルーム補正', 'プラナーマグネティック', 'ベリリウム', 'ブックシェルフ'
];

// Purpose Tags
const purposeTags_en = [
    'Budget', 'Mid-range', 'High-end', 'Summit-fi', 'Premium', 'Entry-level',
    'Gaming', 'Studio', 'Monitoring', 'Mixing', 'Mastering', 'Music Production', 'Recording',
    'DTM', 'DJ', 'Professional', 'Professional Equipment', 'Pro Audio', 'Portable',
    'Portable Speakers', 'Desktop', 'Nearfield', 'Sports', 'Fit', 'Classic',
    'Retro', 'Reference', 'Collaboration', 'Luxury', 'Legacy product', 'Discontinued',
    'Limited edition', 'Revolutionary'
];

const purposeTags_ja = [
    'コストパフォーマンス', 'ミドルレンジ', 'ハイエンド', 'サミットファイ', 'プレミアム', 'エントリークラス',
    'ゲーミング', 'スタジオ', 'モニタリング', 'ミキシング', 'マスタリング', '音楽制作',
    '録音', 'プロ用', 'プロオーディオ', 'プロフェッショナル', 'ポータブル',
    'デスクトップ', 'ニアフィールド', 'スポーツ', 'フィット',
    'クラシック', 'レトロ', '低価格', '高価格', 'リファレンス', 'コラボレーション', '高級',
    'レガシー製品', '廃盤', '限定版', '革命的製品'
];

// Helper function to escape regex special characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Generate category rules from tag arrays
function generateCategoryRules(language) {
    const productTypeTags = language === 'ja' ? productTypeTags_ja : productTypeTags_en;
    const regionTags = language === 'ja' ? regionTags_ja : regionTags_en;
    const technologyTags = language === 'ja' ? technologyTags_ja : technologyTags_en;
    const purposeTags = language === 'ja' ? purposeTags_ja : purposeTags_en;
    
    return {
        region: new RegExp(`^(${regionTags.map(escapeRegex).join('|')})$`, 'i'),
        productType: new RegExp(`^(${productTypeTags.map(escapeRegex).join('|')})$`, 'i'),
        technology: new RegExp(`^(${technologyTags.map(escapeRegex).join('|')})$`, 'i'),
        purpose: new RegExp(`^(${purposeTags.map(escapeRegex).join('|')})$`, 'i')
    };
}

// Utility functions
function getCategoryRules(language) {
    return generateCategoryRules(language);
}

function getProductTypeTags(language) {
    return language === 'ja' ? productTypeTags_ja : productTypeTags_en;
}

function getRegionTags(language) {
    return language === 'ja' ? regionTags_ja : regionTags_en;
}

function getTechnologyTags(language) {
    return language === 'ja' ? technologyTags_ja : technologyTags_en;
}

function getPurposeTags(language) {
    return language === 'ja' ? purposeTags_ja : purposeTags_en;
}

function getAllTags(language) {
    return {
        productType: getProductTypeTags(language),
        region: getRegionTags(language),
        technology: getTechnologyTags(language),
        purpose: getPurposeTags(language)
    };
}

function getCategory(tag, language) {
    const rules = getCategoryRules(language);
    
    for (const category in rules) {
        if (rules[category].test(tag)) {
            return category;
        }
    }
    
    // Special cases that don't fit regex well
    if (tag.endsWith('BA') || tag.endsWith('DD')) return 'technology';
    if (tag.includes('Channel') || tag.includes('チャンネル')) return 'technology';
    if (tag.match(/^\d+in\d+out$/)) return 'technology'; // For 18in20out, 2in2out

    return 'other';
}

// Export for use in other modules
window.TagUtils = {
    getCategoryRules,
    getProductTypeTags,
    getRegionTags,
    getTechnologyTags,
    getPurposeTags,
    getAllTags,
    getCategory
}; 