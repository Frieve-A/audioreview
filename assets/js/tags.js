// Common tag definitions - single source of truth for all categories

// Product Type Tags
const productTypeTags_en = [
    'Headphones', 'Over-ear', 'Earphones', 'In-ear monitors', 'IEM', 'True wireless earbuds',
    'Wireless Earphones', 'Wired earphones', 'Monitor earphones', 'Open-Ear', 'Earbuds',
    'Speakers', 'Bookshelf speakers', 'Floorstanding speakers', 'Studio monitors',
    'Active speakers', 'Passive speakers', 'Soundbar', 'Subwoofer', 'Portable Speaker',
    'Desktop speaker', 'Center speaker', 'Amplifier', 'Integrated amplifier', 'Power amplifier',
    'Headphone amplifier', 'Portable amplifier', 'Streaming amplifier', 'Preamp', 'Preamplifier',
    'Phono Preamp', 'DAC', 'USB DAC', 'Desktop DAC', 'Portable DAC', 'DAC/Amp combo',
    'Digital audio player', 'DAP', 'Network streamer', 'Network player', 'Turntable',
    'Record-player', 'Portable Turntable', 'Phono cartridge', 'MM cartridge', 'MC cartridge',
    'Audio interface', 'AV Receiver', 'Portable Recorder', 'Tweeter', 'Wireless Headphones',
    'Wireless-Headphones'
];

const productTypeTags_ja = [
    'ヘッドホン', 'オーバーイヤー', 'ヘッドホンアンプ', 'イヤホン', '完全ワイヤレスイヤホン',
    'ワイヤレスイヤホン', '有線イヤホン', 'モニターイヤホン', 'オープンイヤー', 'インイヤーモニター',
    'スピーカー', 'ブックシェルフスピーカー', 'フロアスタンディングスピーカー', 'スタジオモニター',
    'アクティブスピーカー', 'パッシブスピーカー', 'サウンドバー', 'サブウーファー', 'ポータブルスピーカー',
    'デスクトップスピーカー', 'センタースピーカー', 'アンプ', 'プリメインアンプ', 'プリアンプ',
    'パワーアンプ', 'ポータブルアンプ', 'ストリーミングアンプ', 'DAC', 'USB DAC', 'デスクトップDAC',
    'ポータブルDAC', 'DAC/アンプコンボ', 'デジタルオーディオプレーヤー', 'ネットワークストリーマー',
    'ネットワークプレイヤー', 'レコードプレイヤー', 'ポータブルターンテーブル', 'カートリッジ',
    'MCカートリッジ', 'MMカートリッジ', 'オーディオインターフェース', 'AVレシーバー',
    'ポータブルレコーダー', 'ツイーター', 'ワイヤレスヘッドホン'
];

// Region Tags
const regionTags_en = [
    'USA', 'America', 'American', 'UK', 'United Kingdom', 'British', 'Denmark', 'Danish',
    'Germany', 'German', 'Japan', 'Japanese', 'Made-in-Japan', 'China', 'Chinese', 'Canada',
    'Canadian', 'Taiwan', 'France', 'French', 'Italy', 'Italian', 'Austria'
];

const regionTags_ja = [
    'アメリカ', '米国', 'イギリス', '英国', 'デンマーク', 'ドイツ', '独', '日本', '日本製',
    '中国', '中華', 'カナダ', '台湾', 'フランス', 'イタリア', '韓国', 'オーストリア'
];

// Technology Tags
const technologyTags_en = [
    'Planar magnetic', 'Electrostatic', 'Dynamic driver', 'Dynamic Driver', 'Balanced armature',
    'Multi-BA', 'Hybrid technology', 'Hybrid', 'Hybrid IEM', 'Coaxial driver', 'Bone conduction',
    'Ribbon-type', 'Horn Tweeter', 'Titanium Tweeter', 'AMT', 'Uni-Q', 'C-CAM', 'Wood Fiber',
    'DLC', 'ZYLON', 'Active noise cancelling', 'Active noise cancellation', 'Noise Canceling',
    'Noise cancelling', 'ANC', 'Open-back', 'Closed-back', 'Open design', 'Wireless', 'Bluetooth',
    'LDAC', 'aptX', 'aptX HD', 'aptX Adaptive', 'AirPlay', 'LHDC', 'Bluetooth LE Audio', 'DSP',
    'Room correction', 'Equalizer', 'EQ', 'PEQ', 'Acourate', 'Audiolense XO', 'FIR Filter',
    'CustomTune', 'USB-C', 'USB', 'Balanced output', 'Dolby Atmos', 'DTS:X', 'Spatial audio',
    'Virtual Surround', 'Direct-drive', 'Belt-drive', 'Bi-amp', 'Class D', 'Full Digital',
    'AKM', 'ESS', 'Velvet-sound', 'S-Master Pro', 'H1 Chip', 'H2 Chip', 'V2 Processor',
    'VRM Technology', 'SMC Technology', 'Harmonious-Diaphragm', 'Hi-res', 'Hi-Res',
    'High-Resolution', 'Analog', 'Analog Audio', 'Analog Equipment', 'Waterproof', 'IPX5',
    'IPX7 Waterproof', 'IP67 Waterproof', '1DD+4BA', '1DD+3BA', '1DD+2BA', '1DD+1BA',
    '2DD+2BA', '2DD+1BA', '2DD', '3DD', '4DD', '1BA', '2BA', '3BA', '4BA', '5BA', '6BA',
    '7BA', '8BA', '2-Way', '3-Way', 'Dual Subwoofer', 'Built-in Subwoofer'
];

const technologyTags_ja = [
    '平面駆動型', 'コンデンサー型', 'ダイナミック型', 'ダイナミックドライバー', 'バランスドアーマチュア',
    'マルチBA', 'ハイブリッド構成', 'ハイブリッド', '同軸ドライバー', '骨伝導', '軟骨伝導',
    'リボン型', 'ホーンツイーター', 'チタンツイーター', 'アクティブノイズキャンセリング',
    'ノイズキャンセリング', 'ノイキャン', 'オープンバック', '密閉型', '開放型', 'オープンデザイン',
    'ワイヤレス', 'Bluetooth', 'LDAC', 'aptX', 'aptX HD', 'aptX Adaptive', 'AirPlay', 'DSP',
    'ルーム音響補正', 'イコライザー', 'FIRフィルター', 'バランス出力', 'Dolby Atmos',
    '空間オーディオ', 'バーチャルサラウンド', 'ダイレクトドライブ', 'ベルトドライブ', 'バイアンプ',
    'D級アンプ', 'フルデジタル', 'VRM技術', 'SMC技術', 'ハーモニアス・ダイアフラム', 'ハイレゾ',
    'ハイレゾリューション', 'アナログ', 'アナログオーディオ', '防水', 'IPX5', 'IPX7防水',
    'IP67防水', '1DD+4BA', '1DD+3BA', '1DD+2BA', '1DD+1BA', '2DD+2BA', '2DD+1BA', '2DD',
    '3DD', '4DD', '1BA', '2BA', '3BA', '4BA', '5BA', '6BA', '7BA', '8BA', '2ウェイ', '3ウェイ',
    'デュアルサブウーファー', '内蔵サブウーファー'
];

// Purpose Tags
const purposeTags_en = [
    'Budget-friendly', 'Mid-range', 'High-end', 'Summit-fi', 'Premium', 'Entry-level',
    'Gaming', 'Studio', 'Monitoring', 'Mixing', 'Mastering', 'Music Production', 'Recording',
    'DTM', 'DJ', 'Professional', 'Professional Equipment', 'Pro Audio', 'Portable audio',
    'Portable', 'Portable Speakers', 'Desktop audio', 'Nearfield', 'Sports', 'Fit', 'Classic',
    'Retro', 'Reference', 'Collaboration'
];

const purposeTags_ja = [
    'コストパフォーマンス', 'ミッドレンジ', 'ハイエンド', 'プレミアム', 'エントリークラス',
    'ゲーミング', 'スタジオ', 'モニタリング', 'ミキシング', 'マスタリング', '音楽制作',
    'レコーディング', 'プロ用', 'プロオーディオ', 'プロフェッショナル', 'ポータブルオーディオ',
    'ポータブル', 'デスクトップオーディオ', 'ニアフィールド', 'スポーツ', 'フィット',
    'クラシック', 'レトロ', '低価格', '高価格', 'リファレンス', 'コラボレーション'
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