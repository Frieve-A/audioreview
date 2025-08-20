---
layout: product
title: "Focusrite ISA428 MkII 製品レビュー"
target_name: "Focusrite ISA428 MkII"
company_id: focusrite
lang: ja
ref: focusrite-isa428-mkii
date: 2025-08-20
rating: [3.0, 0.5, 0.8, 0.5, 0.8, 0.4]
price: 299000
summary: "ISAシリーズの4chトランス入力マイクプリです。可変インピーダンス（600Ω/1.4kΩ/2.4kΩ/6.8kΩ）、各chにHPF/位相/インサート/DI、そして最大192kHz対応の8ch A-Dカード（ISA ADN8）を後付け可能という構成で、堅実な技術実装と実運用の配慮が光ります。第三者の包括的計測は限定的なため、本レビューでは公称値を基に科学的有効性を中立的に評価しつつ、同等以上の測定性能と機能を持つ現行代替（Clarett+ OctoPre）との比較でCPを算定します。"
tags: [Analog, Focusrite, ISA, Mic Preamp, スタジオ]
permalink: /products/ja/focusrite-isa428-mkii/
---
## 概要

ISA428 MkIIは、Focusriteの変圧器入力マイクプリを4chまとめた2Uラック機です。可変インピーダンス、各ch独立のハイパスフィルター、インサート、DI、LEDメーターを備え、オプションのISA ADN8カードを装着すればAES3/ADAT/Danteで最大192kHz出力に対応します[1][2]。長年のスタジオ運用で評価された系譜に属し、堅牢さと扱いやすさを両立しています。

## 科学的有効性

$$ \Large \text{0.5} $$

第三者計測の網羅性は限定的なため、公称仕様を基準に中立評価します。Mic入力でS/N 122 dB（A-weighted, typical）、周波数特性20 Hz–20 kHz ±0.2 dB（10 Hz–110 kHz ±1.5 dB）、THD+N −92 dB（0.0025%）@ −1 dBr、EIN < −123 dBu（A-weighted, max gain）とされ、いずれも可聴域での透明性目標に近い値です[1]。ただし独立ラボの最新測定の蓄積が乏しいため、スコアは0.5起点から慎重に据え置いています。

## 技術レベル

$$ \Large \text{0.8} $$

可変インピーダンス（600Ω/1.4kΩ/2.4kΩ/6.8kΩ）によりマイクとの相互作用を能動的に最適化でき、各chの18 dB/oct HPFや独立インサートなど、実務に直結する設計です[1]。A-D拡張ではISA ADN8により8ch・24-bit/192 kHz、AES3/ADAT/Dante、Word Clock I/Oを追加可能で、現場のシステム統合性にも配慮があります[2][3]。最新の設計思想を大きく外さないため0.8としました。

## コストパフォーマンス

$$ \Large \text{0.5} $$

本体の市場価格は299,000円（1999 USD相当、US実売）です[4][5]。同等以上の機能・測定性能を備える代替として **Focusrite Clarett+ OctoPre**（8ch、EIN −129 dBu、THD+N −110 dB、DR 118 dB、ADAT入出力、Airによるインピーダンス変更/高域ブースト）を選定します[6][7]。**計算**：899.99 USD ÷ 1999 USD = 0.45 → 小数第一位で **0.5**。機能面はISAよりチャンネル数とAD/DA拡張性で優り、測定面も同等以上（条件は出典記載の通り）であるため比較対象として妥当です。

## 信頼性・サポート

$$ \Large \text{0.8} $$

Focusriteは全製品に3年保証を提供しており、長期運用の実績とサポート体制が確立しています[8][9]。本機はアナログ機器のためファームウェア更新の要件はありません。堅牢な筐体と実績に鑑み、0.8としました。

## 設計思想の合理性

$$ \Large \text{0.4} $$

本機のトランス入力はガルバニックアイソレーションや同相成分の扱いなど合理的な目的を持ち、可変インピーダンスもマイクの電気的負荷を最適化する実務的機能です。各chのHPF・インサートの配置、後付けでDante/AES3/ADATに拡張できる設計もワークフロー合理性に寄与します。一方で、透明性の最大化と価格破壊を狙った方向性ではなく「音色活用」に比重があるため満点評価には至りません。総合して、非オカルトで実務合理は担保されるが、価格対性能の純粋最適化ではない水準として **0.4** とします。

## アドバイス

高品質な多目的フロントエンドとして、可変インピーダンスやトランスの質感を活かした収録を重視する現場には適しています。透明性重視・コスト最適の観点では、8chプリ＋ADATを内蔵するClarett+ OctoPreなどの選択肢が強力です。既存のISA環境やDante/AES3での統合が要件であれば、ADカードの追加で拡張しやすく、将来のシステム移行にも対応しやすいです。逆に、色付けを求めず価格最優先なら、同等以上の測定性能を持つインターフェース系プリの方が費用対効果は高くなります。

## 参考情報

[1] Focusrite, “ISA 428 MkII User Guide,” p.16（Performance and Specifications）, https://fael-downloads-prod.focusrite.com/customer/test/s3fs-public/downloads/ISA%20428%20MkII%20User%20Guide%201.1%20English%20-%20EN.pdf （参照日: 2025-08-19）  
[2] Focusrite, “ISA 428 MkII,” https://us.focusrite.com/products/isa-428-mkii （参照日: 2025-08-19）  
[3] Focusrite, “ISA ADN8,” https://us.focusrite.com/products/isa-adn8 （参照日: 2025-08-19）  
[4] Sweetwater, “Focusrite ISA428 MkII,” https://www.sweetwater.com/store/detail/ISA428mk2--focusrite-isa428-mkii （参照日: 2025-08-19）  
[5] Full Compass, “Focusrite Pro ISA 428 MkII,” https://www.fullcompass.com/prod/175734-focusrite-pro-isa-428-mkii-4-channel-microphone-instrument-preamplier （参照日: 2025-08-19）  
[6] Focusrite, “Clarett+ OctoPre,” 技術仕様（EIN/THD+N/DR等）, https://userguides.focusrite.com/hc/en-gb/articles/25435532741906-Clarett-Octopre-technical-specifications （参照日: 2025-08-19）  
[7] Focusrite, “Clarett+ OctoPre（製品ページ・価格）,” https://us.focusrite.com/products/clarett-plus-octopre （参照日: 2025-08-19）  
[8] Focusrite, “Three-year Warranty On All Focusrite Products,” https://us.focusrite.com/articles/threeyear-warranty-on-all-focusrite-products/ （参照日: 2025-08-19）  
[9] Focusrite, “Warranty,” https://us.focusrite.com/warranty （参照日: 2025-08-19）

(2025.8.20)

