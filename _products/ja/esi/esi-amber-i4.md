---
layout: product
title: "ESI Amber i4 製品レビュー"
target_name: "ESI Amber i4"
company_id: esi
lang: ja
ref: esi-amber-i4
date: 2025-10-06
rating: [3.4, 0.6, 0.6, 1.0, 0.6, 0.6]
price: 38000
summary: "ESI Amber i4は、デュアルClass-Aマイクプリ、ADMによるゼロレイテンシー直接モニタリング、双方向MIDI、ループバック、115 dB(A)級の公称DRを備える4in/4out USB-CオーディオIFで、独立測定で実力が確認された同等性能帯の競合と比べても価格優位です。"
tags: [オーディオインターフェース, USB-C, 24bit/192kHz, 4in/4out, DTM]
permalink: /products/ja/esi-amber-i4/
---

## 概要

Amber i4は**24bit/192kHz**対応のデスクトップ型**4入力4出力**インターフェースで、**Class-Aマイクプリアンプ×2**、**独立48V**、**双方向（Auto-detect）MIDIポート×2**、**OUTPUT A/B切替によるデュアル出力系統**、**LCD**、**大型エンコーダ**を装備します [1][2]。ESI独自の**ADM（Advanced Direct Monitoring）**により、**完全ゼロレイテンシーのハードウェアミックス**を本体または**Amber i4 Control**アプリから構築でき、**仮想チャンネルとループバック**で配信・画面録画用途にも対応します [1][2]。**USBクラスコンプライアント**（macOS/iOSはCoreAudio）、Windowsは**EWDM ASIO**ドライバ（ASIO 2.0 / WDM / MME / DirectSound）を提供。**Bitwig Studio 8-Track / Steinberg WaveLab LE / Cubasis LE**のレジストレーションが付属し、**USB-C↔C**／**USB-A↔C**ケーブル同梱です [2]。メーカーは**115 dB(A)ダイナミックレンジ**を公表しています [1][2]。

### 端子・操作系（マニュアル準拠）

- **フロント:** **XLR/TRSコンボ×2（Mic/Line/Hi-Z）**、各**GAIN**、**48 V**、**LCD**、**SELECT / MONITORING / MIX / OUTPUT A/B**キー、**メインエンコーダ** [2]。  
- **リア:** **LINE OUT A（1/2）・B（3/4）**、**MIDI 1–2（各ポートをIN/OUTどちらにも設定可）**、**USB-C**、**電源スイッチ**、任意の**5 V DC**入力 [2]。  
- **ソフト:** Amber i4 Controlで**ファーム更新**、**サンプルレート**、**ADMミキサー**、**ループバック**を制御。**“DAW-Control”**という内部MIDIポートはハード/ソフト連携用で、DAWでは無効化推奨 [2]。

## 科学的有効性

$$ \Large \text{0.6} $$

本機に関して**第三者の網羅的測定は未確認**です。公式ドキュメントは**115 dB(A) DR**や低THD+Nなど具体的数値を明示しており、**達成されていれば**一般的制作における透明性目標を満たします [1][2]。独立測定不在時の基準**0.5**に、**具体的数値**の提示を加味して**0.6**としました。

## 技術レベル

$$ \Large \text{0.6} $$

**24bit/192kHz**、**Class-Aプリ**、**ADMハードウェアミックス**、**仮想CH/ループバック**、**双方向MIDI**、**デュアル出力バス**、**クラスコンプライアント**など、現行4×4として十分にモダンです [1][2]。一方で、**採用ADC/DACの型番・独自DSPの詳細は公的情報に記載がなく**、技術的革新性は平均的と評価します。

## コストパフォーマンス

$$ \Large \text{1.0} $$

Amber i4の実勢は**約240 USD**です [5][1]。比較は、**同等以上の測定性能が第三者で検証**された中で**最も安価**な製品に対して行います。基準機として**MOTU M4**（出力**≈120 dB**の独立測定結果で著名）を採用し [3]、米主要量販での価格は**269.95 USD**です [4][6]。本機と同等以上の測定性能を**より安価**に示す4×4製品は確認できなかったため、Amber i4はこの性能帯で**最安**と判断し**1.0**を付与します。

**比較アンカー**  
- **Amber i4** — 約**240 USD**、公称**115 dB(A)**、ADM/ループバック、双方向MIDI [1][2][5]。  
- **MOTU M4** — **269.95 USD**、独立測定**≈120 dB**、測定面の安全札 [3][4][6]。

## 信頼性・サポート

$$ \Large \text{0.6} $$

**Amber i4 Control**による**ドライバ/ファーム更新**、Windows 10/11・macOS 10.13+（Apple Silicon対応）の記載があり [2]、基礎サポートは良好です。Amberシリーズは**同一PCで複数同時使用不可**のナレッジベース記載あり [7]。一方、**MTBF/故障率等の公開データは不足**し、大手と比べた**サービス網の小ささ**もあり、総合して平均評価です。

## 設計思想の合理性

$$ \Large \text{0.6} $$

**低レイテンシーのハードウェア監視（ADM）**、**配信対応のループバック**、**MIDIの柔軟性**、**デュアル出力バス**という制作・配信の実務を重視した設計で、低価格帯に的確に最適化されています [1][2]。

## アドバイス

**MIDIとループバックを含む4×4を低予算で**導入したい方に強力な候補です。**独立測定で裏付けられた最高水準**を最優先するなら、価格は上がりますが**MOTU M4**が堅実です [3][4][6]。公称値ベースでコストを抑えたいなら、Amber i4は**価格対性能に優れた選択**です。

## 参考文献

[1] ESI — Amber i4 製品ページ: https://www.esi-audio.com/products/amberi4/  
[2] ESI — Amber i4 ユーザーマニュアル（PDF）: https://download.esi-audiotechnik.com/download/ESI/Amber_i4/Amber_i4-English.pdf  
[3] Audio Science Review — MOTU M4 測定: https://www.audiosciencereview.com/forum/index.php?threads/motu-m4-audio-interface-review.15757/  
[4] B&H — MOTU M4 価格: https://www.bhphotovideo.com/c/product/1514483-REG/motu_3140_m4_4x4_usb_c_audio.html  
[5] Thomann — Amber i4 製品ページ（実勢）: https://www.thomannmusic.com/esi_amber_i4.htm  
[6] Sweetwater — MOTU M4 価格: https://www.sweetwater.com/store/detail/M4--motu-m4-4x4-usb-c-audio-interface  
[7] ESIナレッジベース — Amberシリーズの同時使用可否: https://download.esi-audiotechnik.com/tools/readme.asp?file=KB00338EN&key=lywp%3C03%7Czw0fwn653%2Fhj2d%7Boerlc1gev2pfg2fvpAhsyr%3DMC4563%3AFR

(2025.10.6)
