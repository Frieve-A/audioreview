---
layout: company
title: "Singxer 企業レビュー"
target_name: "Singxer"
company_id: singxer
lang: ja
ref: singxer
date: 2025-08-16
rating: [3.9, 0.8, 0.9, 0.7, 0.6, 0.9]
summary: "2011年設立の中国デジタルオーディオ専門企業。DAC、USB-DDC、アンプに注力。技術実装は高水準だが、アフターは販売店依存。"
tags: [AKM, DAC, XMOS, アンプ, デジタルインターフェース, 中国]
permalink: /companies/ja/singxer/
---
## 概要

Singxer（Guangzhou Singxer Electronics Co., Ltd.）は2011年創業の中国メーカーで、広州市番禺区に拠点を置きます。ODM/OEMと自社ブランドの双方で高性能デジタル機器を展開し、XMOS USB実装、クロック／PLL設計、デジタルI/Oに強みがあります。製品はDAC、USBデジタルインターフェース（DDC）、バランス駆動対応ヘッドホンアンプが中心です。

## 科学的有効性

$$ \Large \text{0.8} $$

**測定上の性能**は概ね優秀で、再生系電子機器として透明域に達する（もしくは近い）水準です。  
- **SA-1アンプ**：メーカー公称でSNR **147 dB**、THD+N **−120 dB**（A-wt, 1 kHz）。32 Ωで最大5.5 W（バランス）。電子機器としての透明閾値を大きく満たします[1]。  
- **SU-6 DDC**：GoldenSoundが**当時テストした中で最良**と結論。**RMSジッター約75 ps、ピーク約224 ps**、ノイズフロア**約−148.9 dBFS**などの結果が示されています[2]。  
- **SDA-6 PRO/PRO2 DAC**：ガルバニックUSB絶縁、複数水晶によるクロック設計、PRO2は**AK4499EX×2**構成と**10 MHz外部クロック入力（USB）**対応など、理にかなった高機能を実装。ただしPRO2の包括的な第三者測定はまだ限定的です[4][5]。

注意点：SU-6のようなDDCは**測定上**の改善が得られても、現代的DACでは**可聴差**が小さいケースが多いことから、本項は**0.8**に据え置きます。

## 技術レベル

$$ \Large \text{0.9} $$

温度安定化したローカルクロック、**Crystek CCHD-957**フェムト秒発振器（SU-6は**2基**）、FPGA/CPLDによるFIFO・再クロック、**7.5 F**スーパーキャパシタ電源（SU-6）など、合理的な実装が目立ちます[3]。**SDA-6 PRO2**は**4系統独立低ジッター水晶**に加えて**10 MHz外部クロック（USB）**をサポートし、上位機で見られる機能を取り入れています[4]。**SDA-6 PRO**のUSBは**ガルバニック絶縁**で、設計方針の一貫性も確認できます[5]。すべてが最強というわけではないものの、測定に直結する箇所へ資源を投下する姿勢は高評価です。

## コストパフォーマンス

$$ \Large \text{0.7} $$

**企業横断**のCPは、代表3機種の**「最安の同等以上」÷「対象価格」**（1.0上限）を平均して算出しました。*同等以上*は**ユーザー視点の機能**と**測定性能**で判断しています。

1) **SA-1（USD 599）** — 比較対象：**Topping A70 Pro（USD 499）**。  
   *同等以上の理由*：いずれもフルバランス据置アンプ。A70 Proは公称**THD+N < 0.00005%**（約−126 dB）かつ**SNR/DNR 147 dB**を掲示し、歪率はSA-1の公称を上回りつつ価格も低いです[6][7]。  
   **CP = 499 ÷ 599 = 0.83 → 0.8**

2) **SU-6（USD 750）** — **同等以上かつより安価**なDDCは未確認。  
   - **Gustard U18（USD 499）**はGoldenSound測定で**SU-6より劣る**指標があり、同等以上に該当しません[8]。  
   **CP = 1.0**

3) **SDA-6 PRO2（USD 1,299）** — 比較対象：**SMSL DO300（USD 549）**。  
   *同等理由*：バランスXLRと**I²S**入力を備え、独立レビュー／公式資料で**低THD+N**かつ**約147 dB級**のDNRを確認。機能・測定とも実用同等の最新DACです[9][10][11]。  
   **CP = 549 ÷ 1,299 = 0.42 → 0.4**

**企業CP = 平均(0.8, 1.0, 0.4) = 0.73 → 0.7。**

## 信頼性・サポート

$$ \Large \text{0.6} $$

ハードの作りは良好ですが、**アフターは販売店依存**です。大手販売店（例：ShenzhenAudio）は**30日返品**や**2年保証**を案内しており一定の安心感はある一方、地域や販売店により対応速度はばらつきます[1][4]。メーカー公式の一元的なサポート窓口は限定的で、情報収集は販売店ページ中心となります。

## 設計思想の合理性

$$ \Large \text{0.9} $$

USB絶縁、電源ノイズ対策、クロック安定化、再クロックといった**測定で意味のある要素**に注力しており、訴求も具体的です。DDCの**可聴差**は慎重評価としつつ、設計方針は総じて合理的・測定志向と言えます。

## アドバイス

- **USB–DDC**が必要ならSU-6は依然有力。**AES/EBU、BNC/RCA S/PDIF、RJ45/HDMI-I²S、WCLK/MCLK**まで備え、**温度安定化**クロックと**スーパーキャパシタ**電源が特徴です[3]。  
- **バランス駆動アンプ**の費用対効果重視なら**Topping A70 Pro**が本クラスの本命。Singxerのディスクリート構成や操作感が好みなら**SA-1**でも満足度は高いでしょう[1][6][7]。  
- **I²S対応の最新DAC**を低コストで、なら**SMSL DO300**が有力。SingxerのUSB絶縁やクロック機能に魅力を感じるならSDA-6系も選択肢です[9][10][11]。  
- **外部／高精度クロックについて**：クロック精度は**機器間の同期用途以外では音質改善を生みません**。10 MHzなどの外部クロックは、システムが**共通クロック同期を必要とする場合のみ**利用してください。そうでなければ可聴上の改善は期待できません。

## 参考情報

[1] ShenzhenAudio — “SINGXER SA-1 Headphone Amplifier & Preamplifier.” https://shenzhenaudio.com/products/singxer-sa-1-fully-balanced-class-a-pre-amplifier-headphone-amplifier（最終アクセス: 2025-08-17）

[2] GoldenSound — “Singxer SU-6 Measurements.” https://goldensound.audio/2021/08/01/singxer-su6-measurements/（公開日: 2021-08-01）

[3] ShenzhenAudio — “SINGXER SU-6 USB Interface.” https://shenzhenaudio.com/collections/singxer/products/singxer-su-6-xmos-xu208-cpld-femtosecond-clock-usb-digital-interface（最終アクセス: 2025-08-17）

[4] ShenzhenAudio — “SINGXER SDA-6 PRO 2 Dual AK4499EX DAC.” https://shenzhenaudio.com/products/singxer-sda-6-pro-2-dual-ak4499ex-digital-to-analog-convertor-dac（最終アクセス: 2025-08-17）

[5] Soundnews — “Singxer SDA-6 PRO Review – Clean? Transparent? Linear? Singxer!” https://soundnews.net/sources/dacs/singxer-sda-6-pro-review-clean-transparent-linear-singxer/（公開日: 2022-02-17）

[6] Apos Audio — “TOPPING A70 Pro Fully Balanced Headphone Amplifier.” https://apos.audio/products/topping-a70pro-headphone-amplifier（最終アクセス: 2025-08-17）

[7] ShenzhenAudio — “TOPPING A70PRO Headphone Amplifier.” https://shenzhenaudio.com/products/topping-a70pro-amplifier-fully-balanced-r2r-volume-control-module-headphone-amp（最終アクセス: 2025-08-17）

[8] GoldenSound — “Gustard U18 DDC Measurements.” https://goldensound.audio/2022/04/07/gustard-u18-ddc-measurements/（公開日: 2022-04-07）

[9] SMSL — “DO300（公式製品ページ）.” https://www.smsl-audio.com/portal/product/detail/id/815.html（最終アクセス: 2025-08-17）

[10] Aoshida Audio — “SMSL DO300 DAC.” https://aoshida-audio.com/products/smsl-do300（最終アクセス: 2025-08-17）

[11] Amazon — “SMSL DO300 Full Balanced DAC Preamp with ES9039MSPRO.” https://www.amazon.com/DO300-Balanced-ES9039MSPRO-Digital-Converter/dp/B0BWJK38MM（最終アクセス: 2025-08-17）

(2025.8.16)

