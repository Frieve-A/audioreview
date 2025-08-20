---
layout: product
title: "Mutec REF10 SE120 製品レビュー"
target_name: "Mutec REF10 SE120"
company_id: mutec
lang: ja
ref: mutec-ref10-se120
date: 2025-08-20
rating: [3.2, 0.5, 0.8, 1.0, 0.7, 0.2]
price: 748000
summary: "8系統ガルバニック絶縁出力とサブHz最適化電源を備えた超精密10MHzリファレンスクロック"
tags: [Reference Clock, Master Clock, Digital Audio, 10MHz, OCXO, Professional Audio]
permalink: /products/ja/mutec-ref10-se120/
---

## 概要

REF10 SE120は、特別選別OCXOとサブHz最適化の電源アーキテクチャを採用したMutecの最上位10 MHzリファレンスクロックです。メーカー公称で1 Hzオフセットにおける位相ノイズ < −120 dBc/Hz、BNC出力はガルバニック絶縁の8系統（50 Ω×2、75 Ω×6）を装備し、競合の正弦波方式に対してロック精度向上を狙った**方形波**出力を採用しています [1][2][3]。

## 科学的有効性

$$ \Large \text{0.5} $$

OCXO単体としての低オフセット位相ノイズは非常に優秀です（メーカー公称）[1][2]。一方、一般的な**1台DAC再生**では、強力なジッター除去を備える機種が多く、外部10 MHz参照の追加でDAC出力のTHD/SINAD/ジッターなどが**客観的に改善する根拠は限定的**です。Benchmarkは外部ジッター機器がDAC内部クロック性能に**影響しない**と明記しており [6]、プロ音響の解説でも外部ワードクロックの有効帯域がPLLのジッターキャンセル周波数より低く、効果が限られる旨が示されています [7]。よって、下流機器の測定改善が統制条件で示されるまでは中立の0.5とします。

## 技術レベル

$$ \Large \text{0.8} $$

長期校正で選別したSC-cut OCXO、サブHz最適化電源、50/75 Ω混在の**8系統ガルバニック絶縁出力**、高スルーレート方形波出力など、一般的な10 MHz機を超える周到な実装です [1][2][3]。革新性は段階的ながら完成度は高いと評価します。

## コストパフォーマンス

$$ \Large \text{1.0} $$

国内実勢価格：**748,000円** [9]。同等以上のユーザー機能（複数10 MHz出力・50/75 Ω対応）と**低オフセット位相ノイズ**を満たす競合のうち、より安価な製品は確認できません。例えば **Cybershaft OP21A-D**（4出力、−121 dBc/Hz @1 Hz公称）は**1,015,000円**でより高価です [10]。したがって「同等以上でより安価」が存在せず、**CP＝1.0**とします。参考までに米国価格ではSE120が5,499 USD [4]、OP21A-Dが6,300 USD [5] です。

## 信頼性・サポート

$$ \Large \text{0.7} $$

Mutecはプロ用途の実績があり、筐体・接地・入出力の設計も堅実です。流通とサポートは安定していますが、製品特性上ニッチであるため一般的なオーディオ機器に比べサービス選択肢は限定的です。

## 設計思想の合理性

$$ \Large \text{0.2} $$

メーカー自身のページで、SE120が**オーディオ再生の音質を有意に高める**と繰り返し謳われています（例：「デジタル音楽再生の品質を大幅に高める」「音質に顕著な影響」など）[1]。しかし**家庭の単体DAC再生**では、現代のDACのジッター除去により外部10 MHz参照の効果は原理上期待しにくいことが技術的見解として示されています [6][7]。プロの**同期用途**としての合理性は認められる一方、一般オーディオ向けに音質向上を積極に主張する方向性は科学的整合性を欠きます。したがって本項目は**0.2**まで引き下げます。

## アドバイス

- **同期目的なら有力**：10 MHz入力を持つサーバー/トランスポート、DAC、DDC、ネットワーク機器を同時同期したい場合、8出力と50/75 Ω対応は構成自由度が高いです。  
- **DAC仕様を確認**：非同期USBや強力なジッター除去を持つDACでは、外部10 MHz参照の追加で**測定が向上しない**可能性が高いです [6]。  
- **代替検討**：4出力で足りるならCybershaft OP21A-Dは公称低オフセット位相ノイズで競合しますが、価格は高めです [5][10]。  
- **まずエビデンス**：導入前に自系統でDAC出力のジッター/SINAD等が**統制条件で**改善するか確認することを推奨します。

## 参考情報

[1] Mutec — 製品ページ「REF10 SE120」, 2025-08-19参照. https://www.mutec-net.com/product_ref10_se120.php  
[2] Mutec — 「REF10 SE120 Information Sheet (PDF)」, 2025-08-19参照. https://www.mutec-net.com/downloads/manuals/MUTEC_REF10_SE120_Infoblatt_E.pdf  
[3] Mutec — 「REF10 SE120 取扱説明書 (PDF/英語)」, 2025-08-19参照. https://www.mutec-net.com/downloads/manuals/MUTEC_REF10_SE120_Manual_V1_E_screen.pdf  
[4] Crux Audio — 「Mutec REF10 SE120 — 5,499 USD」, 2025-08-19参照. https://cruxaudio.com/collections/mutec  
[5] Cybershaft — 「OP21A-D Ultra Precision OCXO 10 MHz (4-output) — 6,300 USD, −121 dBc/Hz @1 Hz」, 2025-08-19参照. https://cybershaft.shop/products/op21a-ultra-precision-ocxo-4-output-10mhz-master-clock  
[6] Benchmark Media — 「Inside the DAC2 – Analog Processing」, 外部ジッター機器はDAC2のクロック性能に影響しない旨, 2025-08-19参照. https://benchmarkmedia.com/blogs/application_notes/149341191-inside-the-dac2-part-1-analog-processing  
[7] Yamaha Pro Audio — 「Time is Precious – Where did the external word clock go?」, 2025-08-19参照. https://in.yamaha.com/en/products/contents/proaudio/training_support/micro_tutorial/20170518/index.html  
[8] Music Direct — 「Aurender MC10 — 17,600 USD」, 2025-08-19参照. https://www.musicdirect.com/equipment/accessories/aurender-mc10-master-clock/  
[9] フジヤエービック — 「Mutec REF10 SE120 アルミ」販売価格 748,000円, 2025-08-19参照. https://www.fujiya-avic.co.jp/shop/g/g200000052419/  
[10] Yahoo!ショッピング（Cybershaft直営）— 「OP21A-D」販売価格 1,015,000円, 2025-08-19参照. https://store.shopping.yahoo.co.jp/cybershaft/upocxo-op21a-d.html

(2025.8.20)

