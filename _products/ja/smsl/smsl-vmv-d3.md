---
layout: product
title: "SMSL VMV D3 製品レビュー"
target_name: "SMSL VMV D3"
company_id: smsl
lang: ja
ref: smsl-vmv-d3
date: 2025-08-28
rating: [2.6, 0.8, 0.6, 0.4, 0.6, 0.2]
price: 525000
summary: "SINAD 98dBで可聴域の透明性は満たす一方、I2Sと10MHz外部クロック入力を備え測定性能で優れるGustard A26（226,900円）と比較すると価格妥当性は低いです。"
tags: [DAC, R-2R, PCM1704, ハイエンド, SMSL]
permalink: /products/ja/smsl-vmv-d3/
---

## 概要

SMSL VMV D3は、廃番となったBurr-Brown PCM1704U-Jを各チャンネル2基ずつ計4基用いたフルバランスR-2R DACです。ヴィンテージDACコアに、XMOS XU216、超低位相ノイズ発振器×2、SM5847、TI OPA1612×7などの現代的な周辺回路を組み合わせ、USB-B、I2S（HDMI）、光/同軸、AES/EBU、**外部クロック入力**まで備えます。筐体はCNCアルミで電源部を分離しています。 [2]

## 科学的有効性

$$ \Large \text{0.8} $$

第三者測定でVMV D3は**SINAD 98dB**を示します[1]。これは **THD+N ≈ 10^(-98/20) ≈ 0.00126%** に相当し、可聴域で一般的な透明基準（約0.01%＝-80dB）を十分に下回ります。メーカー公称のダイナミックレンジも**約112dB**で透明域に整合します[2]。

## 技術レベル

$$ \Large \text{0.6} $$

R-2RのPCM1704U-Jという成熟技術に、低ジッタークロックやCPLD処理、XU216などを組み合わせた丁寧な実装です。最新の変換方式というより、堅実な上位実装です。 [2]

## コストパフォーマンス

$$ \Large \text{0.4} $$

**比較対象（最安の同等以上）**：**Gustard A26** — **I2S（HDMI）**と**10MHz外部クロック入力**を備え、**THD+N ≤0.0001%**、**ダイナミックレンジ >127dB**と測定性能で優れます[3]。国内外の一般販売価格として**226,900円**（参考価格）を確認しました[5]。  
**計算**：**226,900円 ÷ 525,000円 = 0.432… → 0.4**。 [4][5]

## 信頼性・サポート

$$ \Large \text{0.6} $$

CNC筐体や分離電源は堅牢で、標準保証・流通網もあります。一方、**PCM1704U-Jの廃番**により将来の部品確保には不確実性が残ります。 [2]

## 設計思想の合理性

$$ \Large \text{0.2} $$

R-2Rの希少性を重視する一方で、測定上の優位は限定的です。外部クロック対応など機能は充実するものの、制御試験で優位性が明確でないため設計合理性評価は低めです。 [1][2]

## アドバイス

PCM1704U-J実装や外部クロック連携を嗜好するならD3は候補です。客観的フィデリティと価格対効果を重視するなら、**Gustard A26**が**機能同等以上かつ測定性能で優位**、しかも価格比**約0.43**で強力な代替です。 [1][3][4][5]

## 参考情報

[1] Audio Science Review, 「SMSL VMV D3 Review (R2R DAC)」, 2025年8月アクセス. https://www.audiosciencereview.com/forum/index.php?threads/smsl-vmv-d3-review-r2r-dac.30277/  
[2] SMSL, 「VMV D3 Official Specifications」, 2025年8月アクセス. https://www.smsl-audio.com/portal/product/detail/id/750.html  
[3] Gustard, 「A26 User Manual」, 2025年8月アクセス. （10MHz外部クロック入力/IIS、主要仕様を確認）https://download.shenzhenaudio.com/download/63b3d0ea90b69.pdf  
[4] SHENZHENAUDIO, 「GUSTARD A26 Dual AK4499EX Digital to Analog Convertor (DAC)」, 2025年8月アクセス（USD価格の参考、製品情報）。https://shenzhenaudio.com/products/gustard-a26-dac-mqa-dual-ak4499ex-chip-with-streamer-renderer-pcm768-dsd512-xmos-high-performance-audio-decoder  
[5] TheHiFiCat, 「Gustard A26 MQA Decoder…」, 2025年8月アクセス（**226,900円**の参考価格）。https://thehificat.com/ko-jp/products/gustard-a26

(2025.8.28)

