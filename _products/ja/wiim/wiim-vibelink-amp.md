---
layout: product
title: "WiiM Vibelink Amp 製品レビュー"
target_name: "WiiM Vibelink Amp"
company_id: wiim
lang: ja
ref: wiim-vibelink-amp
date: 2025-09-01
rating: [4.0, 0.6, 0.7, 1.0, 0.8, 0.9]
price: 45000
summary: "ESS DACとPFFBを採用したコンパクトなクラスD一体型アンプ。測定志向で合理的な設計が特徴です"
tags: [DAC, D級, ESS, アンプ, インテグレーテッド, 予算重視]
permalink: /products/ja/wiim-vibelink-amp/
---
## 概要

WiiM Vibelink Ampは、2025年3月に299 USD（45,000円相当）で発表された小型ステレオ一体型アンプです。ストリーミング機能を省き、増幅品質へ集中した設計で、TI TPA3255出力段とESS ES9039Q2M DAC、TI OPA1612×6を組み合わせ、透明性を志向します。RCAアナログと同軸/光デジタル入力を備え、8 Ωで100 W（4 Ωで200 W）を実現します[1][2][3]。

## 科学的有効性

$$ \Large \text{0.6} $$

メーカー公称値は、8 Ω100 W（4 Ω200 W）、SNR 120 dB（A-weighted）、THD+N −105 dB（0.0005%）、S/PDIFは192 kHz/24-bit対応、アナログ入力は純アナログ経路（ADC非介在）です。独立測定はまだ限定的であり、利用可能な第三者レビューは参照に留めます。本評価は未知ベース0.5から、条件付きメーカー数値の明示(+0.1)で0.6としています[1][2][4][5]。

## 技術レベル

$$ \Large \text{0.7} $$

2018年代以降の成熟技術（TPA3255）と現行DAC（ES9039Q2M）、OPA1612×6にPFFBを組み合わせ、負荷依存性を抑えた堅実な実装です。独自アルゴリズム等の革新は限定的ですが、熱設計を含め統合の巧みさは評価できます[1][3]。

## コストパフォーマンス

$$ \Large \text{1.0} $$

**定義:** CP = MIN(1.0, 同等以上の最安製品価格 ÷ 本製品価格)。計算はUSD基準で整合させます（本記事は45,000円（299 USD）を価格情報として併記）。

**同等条件:** 利用者視点で**RCA + 光/同軸デジタル入力**を備え、かつ**測定性能（SNR/THD+N）が同等以上**。

- **SMSL AO300（DAC/アンプ、光/同軸/ARC/サブ出力）**は機能は豊富ですが、**公称SNR約107 dB、THD+N約0.003%**と性能が劣るため同等以上の要件を満たしません[6][7]。  
- **SMSL AO200 MKII**は価格と出力は魅力ですが、**S/PDIF入力がない（USB/BT中心）**ため、テレビ等のS/PDIF用途で**機能同等**を満たしません[8][9]。

**結論:** 同等以上でより安価な製品は確認できず ⇒ **CP = 1.0**。

*最小要件の同等性注記:* S/PDIF対応一体型DAC/アンプの範囲で、AO300はVibelinkのメーカー公称値と比べSNR/THD+Nが劣るため同等以上に該当しません[1][6][7]。

## 信頼性・サポート

$$ \Large \text{0.8} $$

WiiM（Linkplay）は2014年創業の実績があり、フォーラムやFAQなどサポート情報が整っています。主要販売チャネルでは**1年保証**が一般的です。アルミ筐体と受動冷却、クラスD構成は信頼性に寄与しますが、本機としての長期実績はこれからのため、やや保守的な評価です[10][11][12][13]。

## 設計思想の合理性

$$ \Large \text{0.9} $$

ストリーミングやサブ出力などの周辺機能を敢えて省き、測定上の透明性に資源を集中。必要に応じ外部ストリーマー（例：WiiM Ultra）を組み合わせる分業設計で、費用対効果と目的適合性を優先する合理的アプローチです[2][3][5]。

## アドバイス

S/PDIFまたはRCA中心で**小型・中出力の透明志向**を求める方に適しています。HDMI ARCやサブ出力、ヘッドホン機能を一体で求める場合はSMSL AO300が便利ですが、**測定性能はVibelinkの公称値に劣る**ため、機能重視か忠実度重視かを用途で選び分けてください。PCのUSB主体でバランス入力が必要ならAO200 MKIIも候補ですが、S/PDIF入力の有無が用途適合の分かれ目です。ストリーミングやルーム補正等が必要なら、VibelinkにWiiM Ultraを組み合わせる構成が拡張性に優れます[6][8][14][5]。

## 参考情報

[1] WiiM — *Vibelink Amp* 仕様/概要（公式）: 出力、入出力、構成。https://www.wiimhome.com/wiimvibelink/specs ; https://www.wiimhome.com/wiimvibelink/overview（2025-09-01参照）。  
[2] WiiM Blog — “WiiM Talks Vibelink Amp”（2025-04-02）: ESS 9039Q2M、TPA3255、OPA1612、PFFB等。https://www.blog.wiimhome.com/post/wiim-talks-vibelink-amp（2025-09-01参照）。  
[3] Amazon — *WiiM Vibelink Amp* 製品シート（PDF）: SNR 120 dB（A-wt）、THD+N −105 dB、純アナログ入力、192 kHz/24-bit。https://m.media-amazon.com/images/I/A14ajzCKZoL.pdf（2025-09-01参照）。  
[4] Audio Science Review（ASR）— *WiiM Vibelink Amp Review* スレッド（2025-03）: 独立測定の存在を参照（数値引用なし）。https://www.audiosciencereview.com/forum/index.php?threads/wiim-vibelink-amp-review.61343/（2025-09-01参照）。  
[5] Tom’s Guide — 「入門に最適なアンプ」記事（2025-06）: 入出力、サブ出力/リモコンの有無の言及。https://www.tomsguide.com/audio/speakers/i-test-audio-gear-for-a-living-and-i-found-the-perfect-amp-for-those-getting-into-hifi（2025-09-01参照）。  
[6] Amazon — *SMSL AO300* 製品ページ: THD+N ≈ 0.003%、SNR ≈ 107 dB、85 W/8 Ω、165 W/4 Ω、ARC/サブ/光/同軸。https://www.amazon.com/AO300-MA5332MS-Amplifier-Headphone-Subwoofer/dp/B0CHRTDJMR（2025-09-01参照）。  
[7] HiFiGo — *SMSL AO300* 仕様まとめ（2024-01-05）: 出力・機能確認。https://hifigo.com/products/smsl-ao300（2025-09-01参照）。  
[8] SMSL — *AO200 MKII* 製品ページ: MA5332、入出力の概略（S/PDIF非搭載）。https://www.smsl-audio.com/portal/product/detail/id/840.html（2025-09-01参照）。  
[9] ExtremeHiFi — *AO200 MKII* 機能概要（XLR/USB/BT、S/PDIFなし）。https://www.extremehifi.com/product/smsl-ao200-mk-ii-262S（2025-09-01参照）。  
[10] HTD — WiiM製品の保証例: 「WiiM warranties this product for 1-year.」https://www.htd.com/wiimpro2_2（2025-09-01参照）。  
[11] Amazon — *WiiM Pro Plus* 保証説明「1 Year Warranty」。https://www.amazon.com/WiiM-Receiver-Chromecast-Multiroom-Streamer/dp/B0CC2HWC7N（2025-09-01参照）。  
[12] Linkplay — 企業概要（WiiMブランドの親会社）。https://www.linkplay.com/aboutus（2025-09-01参照）。  
[13] WiiM Support — サポート/マニュアル。https://www.wiimhome.com/support（2025-09-01参照）。  
[14] Amazon — *WiiM Ultra* 機能（ストリーミング/プリ/ルーム補正）。https://www.amazon.com/WiiM-Streamer-Touchscreen-Compatible-Headphone/dp/B0D41YCLW8（2025-09-01参照）。

(2025.9.1)

