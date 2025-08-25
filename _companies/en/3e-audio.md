---
layout: company
title: "3e Audio 企業レビュー"
target_name: "3e Audio"
company_id: 3e-audio
lang: ja
ref: 3e-audio
date: 2025-08-25
rating: [4.3, 0.9, 0.8, 1.0, 0.7, 0.9]
summary: "Texas Instruments TPA3251/3255と最適化されたPFFBを採用するClass D完成品アンプを展開。第三者測定で歪み・負荷不変性とも最先端クラスを実証し、実用価格帯で提供しています。"
tags: [Class D, ODM, OEM, PFFB, TPA3251, TPA3255, アンプ, 深圳]
permalink: /companies/ja/3e-audio/
---
## 概要

3e Audioは「誰もが手に入れて楽しめる高音質・高性能」を掲げる深圳拠点のオーディオメーカーです。主にODM/OEMとDIY市場向けに、TIのTPA3251/3255を用いたClass Dアンプを提供し、最新の完成品（A5ステレオ／A7モノ／A7ステレオ）では**Post-Filter Feedback（PFFB）**を実装。歪み低減と負荷に対する周波数特性の不変性を重視し、見た目より**測定で裏付く性能**と実用機能を優先する姿勢が特徴です。

## 科学的有効性

$$ \Large \text{0.9} $$

独立測定で**透明レベル**に十分な余裕があります。A5ステレオは**4 Ω・5 W（XLR）でTHD+N約–104 dB**、A7 Monoは**4 Ω・5 W（XLR）で–100 dBを下回る**性能を示し、連続出力は**A5約120 W／A7 Mono約200 W（いずれも≤0.1% THD+N）**。**出力インピーダンスは可聴帯域平均で10 mΩ強**、**4 Ω換算ダンピングファクターは>300**、さらに**2/4/8 Ωおよび実スピーカー負荷でも周波数特性はほぼフラット**と、PFFBの狙い（負荷不変性）が測定で確認されます。RCA入力時はXLRより数 dB劣るものの依然優秀です。これらは歪み・雑音・出力インピーダンス・周波数特性の各観点で**十分に透明域**です。 [1][2]

## 技術レベル

$$ \Large \text{0.8} $$

自社チップではなく**実装品質**に投資する方針で、PFFBやゲイン設計、スイッチングノイズ制御を丁寧に最適化。A5は**TPA3251×2（PBTL）**で低歪み志向、A7は**TPA3255**で高出力志向。**DIP-8の交換可能オペアンプ（例：OPA1656等）**、**XLR/TRSとRCA**、**ボリュームバイパス**、**RCAゲイン切替**など実用機能も一通り備えます。競合も追随可能な領域ながら、実装ノウハウに基づく**測定で確認できる優位**が認められます。 [1][3]

## コストパフォーマンス

$$ \Large \text{1.0} $$

**代表製品と確認できた市場価格**（販売開始時の記載値）：
- **A5（ステレオ／38 V・5 A電源付）：240 USD**  
- **A7 Mono（48 V・5 A電源付）：180 USD** [2]

同等以上の**機能（完成品・バランス入力・PFFB相当の負荷不変性）**と**測定性能（4 Ω・5 WでTHD+N<–100 dB級）**を満たす**より安価**な比較対象を調査しましたが、**本日時点で該当製品は見当たりません**。たとえば**Fosi V3 Mono**は**XLRで約100 dB SINAD**、**Topping PA5 II/II+**も一般的には100 dB前後とされ、A5/A7の最良ケースを**上回る**には至りません。従って、**より安い同等以上品が存在しない**ため**CP=1.0**とします。 [2][4][5]

> 同等性メモ：出力・入出力などのユーザー機能が近くても、**4 Ω・5 WでのTHD+N<–100 dB**というベンチマークを**満たすか超える**必要があります。上記低価格品はこの条件を**満たさない**ため比較対象から除外しています。 [2][4][5]

## 信頼性・サポート

$$ \Large \text{0.7} $$

**外部GaN電源**を含む**シンプルなClass D構成**で、発熱・消耗要素が少なく保護動作も良好と報告されています。**保証は1年**で、**メール／Skype**による直接サポート窓口が公開されています。一方で発売からの期間が短く**長期実績データは限定的**で、保証期間も平均的です。総合して慎重寄りの高評価としました。 [1][3][6]

## 設計思想の合理性

$$ \Large \text{0.9} $$

**測定優先**で、PFFB・適切なゲイン設計・バランス入出力・品質部品等、**可聴影響に直結する項目**へコストを集中。外観や神秘性より**透明性と実用機能**を重視する思想は、読者利益に合致する**合理的アプローチ**です。 [1][3]

## アドバイス

**測定で透明域を堅実に達成**した小型パワーアンプを求める方に有力です。**最良の数値**や**負荷不変性**を特に重視するならA5/A7系が第一候補になります。コスト優先で「実用上の透明性」で十分な方は、Fosi/Aiyima/Topping等の**低価格モデル**でも満足できる場合がありますが、**A5/A7の<–100 dB級**までは届かないことが多い点は認識して選択してください。基本的には**XLR入力＋ボリュームバイパス**推奨、必要出力に応じてA5（低歪み志向）／A7 Mono（出力重視）を選ぶのが無難です。

## 参考情報

[1] Archimago’s Musings — *Part I: 3e Audio – A5 Stereo and A7 Mono…*, 参照日 2025-08-26。主要条件：**出力インピーダンス≈10 mΩ**、**DF>300（4 Ω）**、**負荷不変のFR**、入出力・ゲイン等。https://archimago.blogspot.com/2024/11/part-i-3e-audio-a5-stereo-and-a7-mono.html

[2] Archimago’s Musings — *Part II: 3e Audio – A5 Stereo and A7 Mono…*, 参照日 2025-08-26。主要条件：**A5 ~–104 dB THD+N @ 5 W / 4 Ω（XLR）**、**A7 Mono < –100 dB @ 5 W / 4 Ω（XLR）**、**~120 W／~200 W ≤0.1% THD+N**、ローンチ価格 **A5 240 USD／A7 Mono 180 USD**。https://archimago.blogspot.com/2024/12/part-ii-3e-audio-a5-stereo-and-a7-mono.html

[3] 3e Audio — *A5/A7/A7 Mono User Manual (PDF)*、参照日 2025-08-26。主要情報：**DIP-8交換式OPAMP（例：OPA1656）**、入出力／ゲイン、**1年保証**。https://www.3e-audio.com/wp-content/uploads/2024/11/A5_A7_A7-Mono-User-Manual_202411.pdf

[4] Audio Science Review — *Fosi Audio V3 Mono Amplifier Review*（スレッド）、参照日 2025-08-26。主要情報：**XLRで約100 dB SINAD**など。https://www.audiosciencereview.com/forum/index.php?threads/fosi-audio-v3-mono-amplifier-review.53474/

[5] Topping PA5 II / II+ — 製品・測定コミュニティ（市場動向と一般的性能の参考）、参照日 2025-08-26。https://www.audiosciencereview.com/forum/index.php?threads/topping-pa5-ii-stereo-amplifier-review.47362/ , https://www.amazon.com/LEAUDIO-Topping-Amplifier-Balanced-LEAUDIO-PA5II/dp/B0CQYD5BRS

[6] 3e Audio — *Contact Us*（サポート窓口）、参照日 2025-08-26。https://www.3e-audio.com/contact-us/

(2025.8.25)

