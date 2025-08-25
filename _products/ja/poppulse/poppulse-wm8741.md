---
layout: product
title: "Poppulse WM8741 製品レビュー"
target_name: "Poppulse WM8741"
company_id: poppulse
lang: ja
ref: poppulse-wm8741
date: 2025-08-24
rating: [2.0, 0.5, 0.3, 0.6, 0.4, 0.2]
price: 52500
summary: "生産終了のWolfson WM8741を用いた一体型DAC/ヘッドホンアンプ。カタログ値は妥当だが、最新機に比べデータとサポートが限定的です"
tags: [DAC, ヘッドホンアンプ, プリアンプ, USB, 光デジタル, 同軸デジタル, Wolfson, WM8741]
permalink: /products/ja/poppulse-wm8741/
---

## 概要

Poppulse WM8741は、Wolfson WM8741（24-bit/192 kHz）DACを採用した据え置き型のDAC・プリアンプ・ヘッドホンアンプ一体機です。USB入力はTE7022L（最大24/96）、光/同軸S/PDIF入力、TPA6120A2ベースのヘッドホン出力を備え、シンプルな構成で基本機能をまとめています [2][3][4]。

## 科学的有効性

$$ \Large \text{0.5} $$

完成品としての第三者測定は確認できていません。カタログ/販売ページ上の仕様はSNR 116 dB、ダイナミックレンジ118 dB、周波数特性15 Hz–20 kHz（偏差不明）です [2]。チップ単体のWM8741はSNR 125 dB、THD+N 0.002%（1 kHz）とされますが、チップ値から完成品のSINAD等を推定しません [1]。USBはTE7022L由来で24/96までですが、音楽再生上は透明域です [3]。装置レベルでSNRは十分ながらTHD/IMDやFR偏差の独立データが未確認のため、基準の0.5とします [1][2][3]。

## 技術レベル

$$ \Large \text{0.3} $$

WM8741（生産終了）、TE7022L（24/96）、TPA6120A2といった成熟パーツ中心で、独自フィルタやDSP、近年の高性能USB受け等の新規性は見られません。設計は2010年代相当の標準的実装で、技術的独創性や統合度は限定的です [1][2][3][4]。

## コストパフォーマンス

$$ \Large \text{0.6} $$

分母（レビュー対象価格）：**52,500円（350 USD）**。  
最安の**同等以上**比較対象：**TOPPING DX3 Pro+**、**199 USD**。USB/光/同軸入力とヘッドホンアンプを単体で備え、SNRやTHD+Nの公称/第三者測定も本機カタログ値以上です [5][6]。  
**計算：** 199 USD ÷ 350 USD = **0.568** → 四捨五入で **0.6**。

（同等性注記：DX3 Pro+はUSB/光/同軸入力とHPアンプを同一筐体に備え、SNR/THD+Nが同等以上です [5][6]。）

## 信頼性・サポート

$$ \Large \text{0.4} $$

WM8741は生産終了で、販売ページにも製品ディスコン/在庫僅少の記載があり、長期保守性の不確実性が増します [1][2]。グローバルな公式サポート体制は不透明です。単純なアナログ構成は本質的信頼性には寄与しますが、総合的なサポート面では大手より見劣りします [2]。

## 設計思想の合理性

$$ \Large \text{0.2} $$

TE7022LベースのUSBや生産終了DACチップの継続採用に合理的な優位は乏しく、測定上の優位を示さないコスト配分は保守的です。現代の統合DAC/AMPはより低価格で透明性能と入出力の充実を実現しており、本機の方向性は科学的合理性に乏しいと言えます [1][2][3][4][5]。

## アドバイス

WM8741実装にこだわりがある場合のみ選択肢になります。測定透明性と値頃感を重視するなら、**TOPPING DX3 Pro+（199 USD）**が基準解です [5][6]。出力余裕やバランス出力が欲しければ、USB/光/同軸を備える**FiiO K7（約219.99 USD）**も有力です [7]。

## 参考情報

[1] Wolfson Microelectronics, “WM8741 – 24-bit 192 kHz DAC (Rev 4.3),” データシート, 2013年. https://www.mouser.com/ds/2/76/WM8741_v4.3-532416.pdf （2025-08-24参照）

[2] Audiophonics（販売ページ）, 「PopPulse WM8741 – DAC / Preamp / Headphone Amplifier 24Bit / 192KHz」 仕様（SNR/DNR等）およびディスコン表示. https://www.audiophonics.fr/en/devices-hifi-audio-dac/poppulse-wm8741-dac-preamp-headphone-amplifier-24bit-192khz-p-6951.html （2025-08-24参照）

[3] Tenor, 「TE7022L USB Audio Controller – Product Brief」 対応最大24/96. https://static.qobuz.com/info/IMG/pdf/TE7022SL_PB-v21.pdf （2025-08-24参照）

[4] Texas Instruments, 「TPA6120A2 High Fidelity Headphone Amplifier」 データシート. https://www.ti.com/lit/ds/symlink/tpa6120a2.pdf （2025-08-24参照）

[5] Apos Audio, 「TOPPING DX3 Pro+ Bluetooth DAC/Amp」 仕様と価格（通常199 USD）. https://apos.audio/products/topping-dx3-pro-plus-bluetooth-dac-amp （2025-08-24参照）

[6] Audio Science Review, 「Topping DX3 Pro+ Review (DAC & Headphone Amp)」 詳細測定. https://www.audiosciencereview.com/forum/index.php?threads/topping-dx3-pro-review-dac-headphone-amp.27148/ （2025-08-24参照）

[7] FiiO, 「K7 – Parameters」 公式仕様；Apos価格ページ. https://www.fiio.com/k7_parameters ; https://apos.audio/products/fiio-k7 （2025-08-24参照）

(2025.8.24)

