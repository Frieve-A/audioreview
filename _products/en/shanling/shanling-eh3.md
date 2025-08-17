---
layout: product
title: "Shanling EH3 製品レビュー"
target_name: "Shanling EH3"
company_id: shanling
lang: ja
ref: shanling-eh3
date: 2025-08-16
rating: [3.3, 0.7, 0.8, 0.4, 0.6, 0.8]
price: 123800
summary: "フラッグシップES9039PRO搭載の高性能デスクトップDAC/アンプ兼ネットワークプレーヤー。公称値では透明クラスですが、第三者測定未整備のため実力は留保評価です。"
tags: [デスクトップ, DAC, アンプ, ストリーミング, バランス, ES9039PRO]
permalink: /products/ja/shanling-eh3/
---

## 概要

Shanling EH3は、ESS ES9039PRO 8ch DACとフルバランス増幅段を採用した据え置き一体型DAC/ヘッドホンアンプです。Wi-Fi（DLNA/AirPlay 1）およびBluetooth受信（LDAC/aptX HD/aptX/AAC/SBC）に対応し、USB/同軸/光/I²S入力、RCAアナログ入力、プリアウト（XLR/RCA）も備えます。ヘッドホン出力はシングルエンド（3.5/6.35mm）とバランス（4.4mm/4pin XLR）を装備し、バランス時32Ωで最大5.3W出力、PCM 32bit/768kHzとDSD512までサポートします [1]。

## 科学的有効性

$$ \Large \text{0.7} $$

第三者測定の集積が確認できないため、評価はカタログ値ベースの**留保付き**です。公称仕様ではTHD+N ≈ 0.0005%（A特性、条件依存）、SNR/ダイナミックレンジはおおむね**123dB級**、周波数特性は**20Hz〜40kHz（−0.5dB）**、最大出力は**5.3W@32Ω（バランス）/0.7W@300Ω**とされています [1][2][3]。これらは可聴閾値を十分下回る値で、**透明再生が期待**できますが、実測値との乖離可能性を考慮し0.7にとどめます。

## 技術レベル

$$ \Large \text{0.8} $$

最新世代ES9039PRO、自社FPGAとKDS水晶、XMOS XU316、アナログ/デジタル独立電源、4×OPA1612によるフルバランス構成など、現行ハイエンド相当の実装です。ネットワーク受信（DLNA/AirPlay 1）とローカル再生、豊富な入出力、4系統ヘッドホン端子を単体筐体で統合しており、実用性も高いです [1]。

## コストパフォーマンス

$$ \Large \text{0.4} $$

評価対象の市場価格は日本国内で**123,800円**（代表値）です [4]。同等のユーザー向け機能を**最小構成の組み合わせ**で安価に実現できます。具体的には、ヘッドホン用DAC/AMPとして**TOPPING DX5 II**（Bluetooth受信はあるが**ネットワークストリーミングは非搭載**）と、ネットワーク受信を担う**WiiM Mini**（DLNA/AirPlay、24bit/192kHzのビットパーフェクトSPDIF出力に対応）を組み合わせます [5][6][7][12]。  
米国市場の代表価格はDX5 IIが**299 USD**、WiiM Miniが**89 USD**、EH3が**889 USD**で、**(299 USD + 89 USD) / 889 USD = 0.436… → 0.4**（小数第1位丸め）となります [5][6][2]。DX5 IIは**THD+N < 0.00006%**、**SNR/DNR 133dB**等の公称を持ち [6]、WiiM Miniの24/192ビットパーフェクト出力で機能差を補えます [7][12]。以上から、本機のコストパフォーマンスは0.4と評価します。

## 信頼性・サポート

$$ \Large \text{0.6} $$

メーカーはEH3向けにOTA/USBによるファームウェア更新（Wi-Fi接続改善、DLNA調整、機能追加等）を提供しています [9][10]。保証は販売店基準で一般的に1年が目安です（地域/販売店に依存） [3]。専用アプリEddict Playerも提供されています [11]。一方で長期の独立RMAデータや故障率の公開は乏しく、サポート体制は販売チャネル依存の側面が残ります。

## 設計思想の合理性

$$ \Large \text{0.8} $$

高SNR/低THD+N志向の回路、十分な出力余裕、ジッタ対策、入出力とネットワーク受信の統合など、**音質と使い勝手の合理的向上**に資する要素で構成されています [1][2]。ただし同等機能は汎用ストリーマと高性能DAC/AMPの組み合わせで低コストに実現可能であり、価格面の優位は相対的に弱いです。

## アドバイス

強力な内蔵アンプとネットワーク受信を**単体で完結**させたい、配線/設置を簡素にしたい用途ではEH3は適しています。コスト最優先で同等機能を得るなら、**DX5 II + WiiM Mini**の組み合わせが有力です。能率の低い平面駆動型ヘッドホンでも余裕が欲しい場合はEH3の高出力が安心材料です。一方で将来の拡張性や買い替えの柔軟さを重視するなら、分離構成（ストリーマ部とDAC/AMP部の別体）も検討に値します。

## 参考情報

[1] Shanling. “Introducing Shanling EH3.” https://en.shanling.com/article-IntroEH3.html （参照 2025-08-16）  
[2] SHENZHENAUDIO. “SHANLING EH3 ES9039SPRO Desktop Streamer（仕様・価格の一例）.” https://shenzhenaudio.com/products/shanling-eh3-es9030pro-desktop-streamer （参照 2025-08-16）  
[3] Audiophonics. “Shanling EH3 – Specifications（SNRほか）.” https://www.audiophonics.fr/en/desktop-headphone-amplifiers/shanling-eh3-p-19148.html （参照 2025-08-16）  
[4] 価格.com. “SHANLING EH3 最安価格.” https://kakaku.com/item/K0001578858/ （参照 2025-08-16）  
[5] TOPPING Official Store. “DX5 II – Price and Overview.” https://www.topping.store/products/topping-dx5-ii-hi-res-dac-headphone-amp-combo （参照 2025-08-16）  
[6] SHENZHENAUDIO. “TOPPING DX5 II – Specs（THD+N/SNR/出力）.” https://shenzhenaudio.com/products/topping-dx5-ii-dual-es9039q2m-desktop-dac-headphone-amplifier （参照 2025-08-16）  
[7] WiiM FAQ. “Is the bit-perfect 192kHz, 24-bit music supported?” https://faq.wiimhome.com/en/support/solutions/articles/72000524942-is-the-bit-perfect-192khz-24-bit-music-supported- （参照 2025-08-16）  
[9] Shanling. “EH3 Firmware Update（V1.6）.” https://en.shanling.com/article-EH3ET3FirmSep24.html （参照 2025-08-16）  
[10] Shanling Download. “EH3 Firmware V1.7 / Updatelist.” https://en.shanling.com/download/101 （参照 2025-08-16）  
[11] Apple App Store. “Eddict Player.” https://apps.apple.com/us/app/eddict-player/id1529232239 （参照 2025-08-16）  
[12] WiiM FAQ. “What is the maximum bit and sample rate from the optical SPDIF/coaxial output?” https://faq.wiimhome.com/en/support/solutions/articles/72000524935-what-is-the-maximum-bit-and-sample-rate-from-the-optical-spdif-coaxial-output- （参照 2025-08-16）

(2025.8.16)

