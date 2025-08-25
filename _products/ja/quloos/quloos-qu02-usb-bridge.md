---
layout: product
title: "Quloos QU02 USB Bridge 製品レビュー"
target_name: "Quloos QU02 USB Bridge"
company_id: quloos
lang: ja
ref: quloos-qu02-usb-bridge
date: 2025-08-25
rating: [3.3, 0.5, 0.6, 1.0, 0.5, 0.7]
price: 62864
summary: "I2S/AES/同軸/光の全デジタル出力を備えたUSB DDC。ガルバニックアイソレーションと高性能クロック（AS338）を採用し、スマホ/PC接続からのノイズ伝搬抑制を重視した設計です。第三者の総合測定は未確認のため科学的有効性は保留評価ですが、機能面と市場価格の組み合わせは強力で、同等以上の測定実績を持つ競合機はいずれも高価です。"
tags: [USB Bridge, Digital Interface, I2S, SPDIF, AES/EBU, DSD512]
permalink: /products/ja/quloos-qu02-usb-bridge/
---

## 概要

QU02はUSB入力をI2S（HDMI LVDS）、AES/EBU、同軸×2、光に変換するDDC（デジタル→デジタル）です。USB側のガルバニックアイソレーション、AmaneroベースのUSB受け、2基のAccusilicon AS338クロック、I2S極性/フラグ設定用DIPスイッチなど、PC・スマホ起点のデジタル系の安定化に主眼を置いた設計です[5]。国内実売は約62,864円（2025-08-25時点、Amazon）を確認しました[8]。

## 科学的有効性

$$ \Large \text{0.5} $$

第三者機関による包括的なジッタ/スペクトラム測定は未確認のため、本項は保留基準の0.5からの評価です（測定未知時の基準）。一方、公開仕様ではAS338クロックのジッタ38fs/10Hz位相雑音-109.5dBc/Hz、同軸出力ジッタ約80psなど、低ジッタ志向の数値が示されています（いずれもメーカー公表値の引用）[5]。ただし、ジッタの絶対値は測定手法・帯域に依存し、DAC側PLL/ASRCの設計にも左右されるため、聴感上の差異の大きさは第三者測定が出揃うまで断定しません。

## 技術レベル

$$ \Large \text{0.6} $$

ガルバニックアイソレーション採用、Amanero USBレシーバ、CPLD分周、分離電源区画、LT系レギュレータ、I2S可変DIP（K1–K4）など、実装は妥当で近年の良作DDCの文脈に沿っています[5]。自社特許や新規性の高い方式の提示は限定的なため+加点は控え、平均（0.5）に対し設計の丁寧さで+0.1としました。

## コストパフォーマンス

$$ \Large \text{1.0} $$

**結論：CP=1.0。** I2S/AES/同軸/光の**全出力**と同等水準の**第三者ジッタ測定実績**を持つ競合のうち、最安はSingxer SU-2（I2S/AES/同軸/光、GoldenSoundで良好測定）で、実売は469–470 USD帯[1][2][6][9]。一方、QU02の代表的市場価格は389.99 USD（HiFiGoの通常価格を採用、セール価格は除外）です[3]。この条件下で**同等以上の機能・測定実績を持つより安い代替は見当たりません**。よって本サイトの定義に基づき、QU02は当該条件で**最安**となりCPは上限の1.0とします。  
補足：より高価な同等以上の例として、Matrix X-SPDIF 3（499 USD）があります[7]。

## 信頼性・サポート

$$ \Large \text{0.5} $$

公称の長期実績やRMA比は不明です。販売店基準で**2年保証**の表記を確認（ShenzhenAudio）[4]。ファーム更新必須のカテゴリーではなく、構造も可動部がないため平均と判断しました。

## 設計思想の合理性

$$ \Large \text{0.7} $$

ガルバニックアイソレーション、独立電源分離、低位相雑音クロックなど、**聴感上の悪影響になり得る要因（電源・ジッタ由来の変調）を低減する方向**は合理的です[5]。専用機の存在意義（多系統デジタル出力/I2S可変）も明確で、過剰装飾要素は見られません。

## アドバイス

I2S対応DACやAES入力を活用したい方、USB源のガルバニック分離を図りたい方に有力です。I2Sの極性/フラグはDAC側実装差があるため、導入前に自機のI2S配列を確認し、到着後はDIPで確実に整合させてください[5]。すでに高性能USB入力を持つDACでは体感差が小さい可能性があります。**価格面では同等以上の実測評価がある競合（SU-2/499 USD級）がすべて高価**で、QU02の位置づけは堅いです[1][2][6][7]。  

**重要な注意**：本機の価値は、「複数のデジタル出力が必要」「ホスト（PC/スマホ）側のグラウンド経由ノイズやUSB給電の問題を断ちたい」といった**用途要件**がある場合に成立します。**DACの手前にDDCを挟むだけで音質が良くなることは基本的に期待すべきではありません。** 現行の多くのUSB DACは非同期USB、強力なPLL/ASRC、アイソレーション等によりUSB由来のジッタ/ノイズ影響は可聴域で十分小さく設計されています。**純粋に音質（測定性能）向上が目的なら、同等以下の総コストで最新の高測定性能USB DACに入れ替える方が有利**となるケースが多いです。

## 参考情報

[1] GoldenSound, “Singxer SU-6 Measurements”, 2021-08-01, https://goldensound.audio/2021/08/01/singxer-su6-measurements/  
[2] GoldenSound, “Singxer SU-2 KTE Measurements”, 2021-09-27, https://goldensound.audio/2021/09/27/singxer-su2-measurements/  
[3] HiFiGo, “QULOOS QLS QU02 USB Digital Audio Interface”, accessed 2025-08-25, https://hifigo.com/products/quloos-qu02  
[4] ShenzhenAudio, “QULOOS QU02 USB Interface” （保証2年表記）, accessed 2025-08-25, https://shenzhenaudio.com/products/quloos-qu02-usb-digital-audio-interface-to-spdif-aes-ebu-i2s-supporting-dsd512  
[5] Audiophonics, “Quloos QU02 – Accusilicon AS338, isolation, specs”, accessed 2025-08-25, https://www.audiophonics.fr/en/digital-interfaces/quloos-qu02-digital-interface-usb-to-spdif-i2s-accusilicon-as338-black-p-17112.html  
[6] Kitsune HiFi, “Singxer SU-2 – Price”, accessed 2025-08-25, https://kitsunehifi.com/products/singxer-su-2-dsd1024-usb-digital-interface-femto-second-clock-interface-pcm-768k-hdmi-i2s-ddc-arm-processor  
[7] Apos Audio, “Matrix X-SPDIF 3 – Price”, accessed 2025-08-25, https://apos.audio/products/matrix-x-spdif-3-usb-interface  
[8] Amazon.co.jp, “QULOOS QU02（国内価格例）”, accessed 2025-08-25, https://www.amazon.co.jp/-/en/QULOOS-QU02-Digital-Audio-Interface/dp/B0C5X35KG7  
[9] Amazon.co.jp, “Singxer SU-2（国内価格例）”, accessed 2025-08-25, https://www.amazon.co.jp/Singxer-USB%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%82%A4%E3%82%B9-%E3%83%95%E3%82%A7%E3%83%A0%E3%83%88%E7%A7%92%E3%82%AF%E3%83%AD%E3%83%83%E3%82%AF%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%82%A4%E3%82%B9-PCM768K/dp/B0836SQJCB

(2025.8.25)

