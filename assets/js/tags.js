// Common tag definitions and categorization helpers.

const productTypeTags_en = [
  'In-ear monitors', 'In-Ear Monitors', 'Headphones', 'Earphones', 'Earbuds',
  'True wireless earbuds', 'Wireless Earbuds', 'Wireless earphones', 'Wireless headphones',
  'Speakers', 'Bookshelf speakers', 'Floorstanding speakers', 'Active speakers',
  'Passive speakers', 'Studio monitors', 'Monitor earphones', 'Subwoofer', 'Center speaker',
  'Soundbar', 'Amplifiers', 'Integrated amplifier', 'Power amplifier', 'Preamplifier',
  'Headphone amplifier', 'Portable amplifier', 'DAC', 'USB DAC', 'Desktop DAC',
  'Portable DAC', 'DAC/Amp combo', 'Audio interface', 'DAP', 'Digital audio player',
  'Network player', 'Network streamer', 'Turntable', 'Phono cartridge', 'MC cartridge',
  'MM cartridge', 'Microphones', 'Audio Accessories', 'Cables', 'Headset'
];

const productTypeTags_ja = [
  'イヤホン', 'ヘッドホン', 'ワイヤレスイヤホン', '完全ワイヤレスイヤホン',
  'ワイヤレスヘッドホン', 'スピーカー', 'ブックシェルフスピーカー',
  'フロアスタンディングスピーカー', 'アクティブスピーカー', 'パッシブスピーカー',
  'スタジオモニター', 'サブウーファー', 'センタースピーカー', 'サウンドバー',
  'アンプ', 'プリメインアンプ', 'パワーアンプ', 'プリアンプ', 'ヘッドホンアンプ',
  'ポータブルアンプ', 'DAC', 'USB DAC', 'デスクトップDAC', 'ポータブルDAC',
  'DAC/アンプ一体型', 'オーディオインターフェース', 'DAP', 'ネットワークプレーヤー',
  'ネットワークストリーマー', 'ターンテーブル', 'フォノカートリッジ',
  'MCカートリッジ', 'MMカートリッジ', 'マイク', 'アクセサリー', 'ケーブル',
  'ヘッドセット'
];

const regionTags_en = [
  'America', 'United States', 'United Kingdom', 'Denmark', 'Germany', 'Japan',
  'China', 'Canada', 'Taiwan', 'France', 'Italy', 'Austria', 'Switzerland',
  'Norway', 'Hong Kong', 'Korea'
];

const regionTags_ja = [
  'アメリカ', '米国', 'イギリス', 'デンマーク', 'ドイツ', '日本', '中国',
  'カナダ', '台湾', 'フランス', 'イタリア', 'オーストリア', 'スイス',
  'ノルウェー', '香港', '韓国'
];

const technologyTags_en = [
  'Planar magnetic', 'Electrostatic', 'Dynamic driver', 'Balanced armature',
  'Hybrid technology', 'Hybrid', 'Hybrid IEM', 'Coaxial driver', 'Bone conduction',
  'AMT', 'Active noise cancelling', 'Noise cancelling', 'ANC', 'Open-back',
  'Closed-back', 'Open design', 'Wireless', 'Bluetooth', 'LDAC', 'aptX',
  'aptX HD', 'aptX Adaptive', 'AirPlay', 'LHDC', 'Bluetooth LE Audio', 'DSP',
  'Room correction', 'Equalizer', 'EQ', 'PEQ', 'FIR Filter', 'USB-C',
  'Balanced output', 'Dolby Atmos', 'DTS:X', 'Spatial audio', 'Direct-drive',
  'Belt-drive', 'Bi-amp', 'Class A', 'Class AB', 'Class D', 'Full Digital',
  'AKM', 'ESS', 'Hi-res', 'Hi-Res', 'High-Resolution', 'Analog', 'Waterproof',
  'Vacuum tube', 'R2R', 'Beryllium'
];

const technologyTags_ja = [
  '平面磁界型', '静電型', 'ダイナミック型', 'バランスドアーマチュア',
  'ハイブリッド', '同軸ドライバー', '骨伝導', 'AMT', 'ノイズキャンセリング',
  'ANC', '開放型', '密閉型', 'ワイヤレス', 'Bluetooth', 'LDAC', 'aptX',
  'DSP', 'ルーム補正', 'イコライザー', 'バランス出力', '空間オーディオ',
  'ダイレクトドライブ', 'ベルトドライブ', 'バイアンプ', 'A級', 'AB級',
  'D級', 'フルデジタル', 'ハイレゾ', 'アナログ', '防水', '真空管', 'R2R',
  'ベリリウム'
];

const purposeTags_en = [
  'Budget', 'Mid-range', 'High-end', 'Summit-fi', 'Premium', 'Entry-level',
  'Gaming', 'Studio', 'Monitoring', 'Mixing', 'Mastering', 'Music Production',
  'Recording', 'DTM', 'DJ', 'Professional', 'Pro Audio', 'Portable', 'Desktop',
  'Nearfield', 'Sports', 'Reference', 'Collaboration', 'Luxury', 'Legacy product',
  'Discontinued', 'Limited edition'
];

const purposeTags_ja = [
  '低価格', 'ミドルレンジ', 'ハイエンド', 'プレミアム', 'エントリー',
  'ゲーミング', 'スタジオ', 'モニタリング', 'ミキシング', 'マスタリング',
  '音楽制作', '録音', 'DTM', 'DJ', 'プロ用', 'ポータブル', 'デスクトップ',
  'ニアフィールド', 'スポーツ', 'リファレンス', 'コラボレーション',
  '高級', '生産終了', '限定版'
];

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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

  if (tag.endsWith('BA') || tag.endsWith('DD')) return 'technology';
  if (/^\d+in\d+out$/i.test(tag)) return 'technology';
  if (/Bluetooth|LDAC|aptX|DAC|DSP|ANC|USB|Class|Driver|BA|DD/i.test(tag)) return 'technology';

  return 'other';
}

window.TagUtils = {
  getCategoryRules,
  getProductTypeTags,
  getRegionTags,
  getTechnologyTags,
  getPurposeTags,
  getAllTags,
  getCategory
};
