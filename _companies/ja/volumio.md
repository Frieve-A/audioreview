---
layout: company
title: "Volumio 企業レビュー"
target_name: "Volumio"
company_id: volumio
lang: ja
ref: volumio
date: 2025-08-22
rating: [3.1, 0.8, 0.7, 0.3, 0.8, 0.5]
summary: "オープンソースOSとプレミアム機を展開し、第三者測定で高いアナログ出力性能が確認される一方、ソフトウェア安定性は賛否があり、同等機能の低価格製品が多いためコストパフォーマンスは弱めです。"
tags: [ストリーミング, DAC, ネットワークプレーヤー, オープンソース, イタリア, ソフトウェア]
permalink: /companies/ja/volumio/
---

## 概要

Volumioはフィレンツェ拠点の企業で、オープンソースのストリーミングOSと自社ハードを提供します。ユーザーは約65万人で、Primo（DAC内蔵）やRivo/Rivo Plus（トランスポート）を展開し、Roon Ready対応やPCM 768kHz・DSD再生などの仕様を備えます（メーカー記載および第三者情報）[1][2][3][4][5]。

## 科学的有効性

$$ \Large \text{0.8} $$

第三者測定ではPrimoのアナログ出力が客観的に透明域です。最大出力1.72 V（RCA）、出力インピーダンス約99 Ω、二次高調波が約−110 dB（≈0.0003%）と極めて低く、チャンネルセパレーションも優秀です。一方、内蔵SBC由来の同軸S/PDIFジッターは2.733 ns（16-bit J-Test）と大きめで、トランスポート用途では経路差が出ます[1]。総合的には測定整合性が高く、聴感上の忠実度に資する数値です。

## 技術レベル

$$ \Large \text{0.7} $$

Rivo PlusはS/PDIF/AES-EBUを専用ASICで生成し、MEMSクロックやI2S over HDMIを追加した純トランスポートで、DACは非搭載です。Volumio OSの機能群やRoon Ready認証、OEMモジュール（StreamPlay）など、広範な実装は堅実ですが、革新性は標準域です[2][3][4]。

## コストパフォーマンス

$$ \Large \text{0.3} $$

企業横断の代表機で算出し、**同等以上の機能・測定性能を満たす**市場最安を採用しました。

- **デジタルトランスポート**：Volumio **Rivo Plus**（AES-EBU・I2S対応）**1,399 USD**[5] に対し、**SMSL SD-9**（AES-EBU・I2S対応、メーカー公称）**343.99 USD**[6]。  
  計算：**343.99 USD ÷ 1,399 USD = 0.246**。

- **ストリーミング一体型アンプ**：Volumio **Integro** **1,199 USD**[7] に対し、**WiiM Amp Pro**（60 W/8 Ω、ストリーミング内蔵。Amp/Amp Pro系の測定実績あり）**379 USD**[8][9][10]。  
  計算：**379 USD ÷ 1,199 USD = 0.316**。

企業CP（単純平均）：**(0.246 + 0.316)/2 = 0.281 → スコア 0.3**。低価格の同等手段が存在するため不利です。

## 信頼性・サポート

$$ \Large \text{0.8} $$

公式ヘルプやフォーラムが整備され、アップデート提供も継続しています[11]。一方で、クラウド機能の不安定さやクラッシュ報告など、運用事例はまちまちで、安定という報告も存在します[12][13][14][15][16]。問題は主にソフトウェア層・環境依存で、ハード起因の系統的欠陥は有意には見当たりません。

## 設計思想の合理性

$$ \Large \text{0.5} $$

透明性の高い測定結果とネットワーク機能の実用性を重視する方針は合理的です。トランスポートのジッター対策（専用ASIC・MEMS）も目的合理性があります。ただし、ユーザー視点で同等機能を低価格で実現する代替が容易な分、価格戦略の妥当性は相対的に下がります。

## アドバイス

Volumio OSの機能群（プラグイン／Fusion DSP等）とRoon Ready、筐体品質を重視するなら選択価値があります。費用対効果を最優先する場合は、トランスポートはSMSL SD-9、一体型はWiiM Amp Proのほうが同等機能を低コストで満たしやすいです。USB出力経路はジッター面で有利であり、同軸S/PDIF利用時は外部DDC併用も選択肢です[1]。

## 参考情報

[1] Stereophile「Volumio Primo… Measurements」, https://www.stereophile.com/content/volumio-primo-music-playerstreamer-measurements, 2021-01-29。Audio Precision SYS2722、S/PDIFジッター2.733 ns、最大1.72 V/99 Ω 等。

[2] Volumio – OEM/StreamPlay（“approximately 650k users”）, https://volumio.com/oem-custom-solutions/, 参照日: 2025-08-22。

[3] Roon – Volumioパートナーページ（対応機種一覧）, https://roon.app/partners/108/volumio, 参照日: 2025-08-22。

[4] Volumio Shop – Rivo Plus（ASIC/MEMS/I2S、「Volumio Premium内蔵」等）, https://shop.volumio.com/product/rivo-plus/, 参照日: 2025-08-22。

[5] HiFi Pig – “Volumio Rivo+ Digital Transport”（USD 1,399 記載）, https://www.hifipig.com/volumio-rivo-digital-transport/, 参照日: 2025-08-22。

[6] Apos Audio – “SMSL SD-9 HiFi Network Music Player”（AES-EBU・I2S、価格）, https://apos.audio/products/smsl-sd-9-hifi-network-music-player, 参照日: 2025-08-22。

[7] SoundStage! Simplifi – “Volumio Integro…”, https://www.soundstagesimplifi.com/index.php/equipment-reviews/242-volumio-integro-streaming-integrated-amplifier, 2023-09-15（1,199 USD）。

[8] Crutchfield – “WiiM Amp Pro”（価格・仕様）, https://www.crutchfield.com/p_228AMPPR/WiiM-Amp-Pro.html, 参照日: 2025-08-22。

[9] Audio Science Review – “WiiM Amp Pro… Review”, https://www.audiosciencereview.com/forum/index.php?threads/wiim-amp-pro-streaming-stereo-amplifier-review.57257/, 2024-09-26。

[10] WiiM Forum – “Measurements and comparison of WiiM Amp Pro and …”, https://forum.wiimhome.com/threads/measurements-and-comparison-of-wiim-amp-pro-and-wiim-amp-ultra-and-more.7830/, 2025-08-01。

[11] Volumio Help – “Most common issues…”, https://help.volumio.com/help/volumio-troubleshootings, 参照日: 2025-08-22。

[12] Volumio Community – “Play.volumio not so stable”, https://community.volumio.com/t/play-volumio-not-so-stable/66995, 2024-05-17。

[13] Volumio Community – “Latest Volumio Update…”, https://community.volumio.com/t/latest-volumio-update-many-problems-what-a-joke/64632, 2024-01-01。

[14] Volumio Community – “Crashes get more frequent”, https://community.volumio.com/t/crashes-get-more-frequent/63051, 2023-09-30。

[15] Volumio Community – “Volumio Rivo first impressions”, https://community.volumio.com/t/volumio-rivo-first-impressions/57816?page=18, 2022-09-12。

[16] Volumio Community – “Too many issues with Volumio 3”, https://community.volumio.com/t/too-many-issues-with-volumio-3/54826, 2022-03-15。

(2025.8.22)

