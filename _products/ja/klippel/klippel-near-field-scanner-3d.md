---
layout: product
title: "Klippel Near Field Scanner 3D 製品レビュー"
target_name: "Klippel Near Field Scanner 3D"
company_id: klippel
lang: ja
ref: klippel-near-field-scanner-3d
date: 2026-07-17
rating: [4.3, 0.7, 1.0, 1.0, 0.6, 1.0]
price: 18504145
summary: "無響室を使わず直接音と指向性を自動測定する特許取得済みロボット式近接場ホログラフィシステムですが、室内反射分離を含む構成には別売ソフトウェア、アナライザー、マイク、アンプが必要です。"
tags: [プロフェッショナル, プロオーディオ, ドイツ, リファレンス]
permalink: /products/ja/klippel-near-field-scanner-3d/
---
## 概要

Klippel Near Field Scanner 3D（NFS、ハードウェアモデル名C8 Near Field Scanner）は、Klippel GmbHのプロフェッショナル向けロボット式音響測定システムです[1]。被測定機器を動かさずに3次元スキャンし、音響ホログラフィによって近接場、遠方界、指向性、音響パワーを再構成します。メーカー仕様は角度分解能1度未満、静止した500kg未満の被測定機器に対応し、一般的な2ウェイスピーカーの標準3Dスキャンを20分未満としています[1]。通常の室内で直接音を測る構成には、スキャナー、KA3アナライザー、TRFモジュール、NFSソフトウェア、測定マイク、パワーアンプ、Direct Sound Separationライセンスが必要です[1][2]。

## 科学的有効性

$$ \Large \text{0.7} $$

NFSは測定システムであるため、科学的有効性では再構成した音場が被測定機器の実際の放射をどれだけ正確に表すかが重要です。Klippelは、標準的な1kHz正弦波・94dB SPLの条件で、最大音圧方向の代表的なレベル精度を±0.1dB、全方向を±1dBとしています[8]。Direct Sound Separation使用時の公称システム帯域は無響・非無響環境とも10Hz〜20kHzですが、標準構成の非無響環境では下限が2kHzです。マイクの指向性は補償されず、高域の指向性測定精度が重要な場合は小型1/4インチカプセルが推奨されています[8]。

メーカーの検証画像も確認しました。ラインアレイの比較では、7m・16,000点の無響基準に対し、4,000点のNFS近接場スキャンを7mへ外挿しています。1kHzと5kHzのバルーンプロットは視覚的に近く、差分は主ローブより20dB以上低いと説明されています[8]。2.5kHzの極座標曲線は前方で密接に一致し、背面の大きな差は軸上より約30dB低い領域です。軸上曲線は低域から20kHzまで概ね重なりますが、20Hz付近に差があり、Klippelは基準無響室の室内モードに起因すると説明しています。これは第三者による再現ではなくメーカー試験であり、信頼区間、個体差、独立したシステム誤差測定はありません。定量精度、帯域、基準比較は良好ですが、独立検証の欠如により評価を限定します。

## 技術レベル

$$ \Large \text{1.0} $$

NFSは、自社開発のロボットハードウェアに、独自の近接場音響ホログラフィ、フィールド分離、フィールド外挿ソフトウェアを統合しています。KlippelはDE102013000684、US 9,584,939 B2、CN 201410079512.1を含むドイツ、米国、中国の特許を明記しています[1]。Direct Sound Separationは反射自由周波数より下で直接音と反射音を推定し、近接場から遠方界への外挿はスキャンから遠方界の指向性と音響パワーを導出します[1]。精密な多軸動作、測定回路、空間再構成、可視化、標準化された指向性出力を統合したシステムは新規参入者が短期間で再現しにくく、特許も追加の参入障壁になります。基礎となる特許技術は成熟していますが、ソフトウェアのリリースは2026年まで継続し[7]、完成した作業工程を上回る代替技術は確認できません。特許に裏付けられた独自性、自社設計、電気音響の知見、継続的なハードウェア・ソフトウェア統合により最高評価です。

## コストパフォーマンス

$$ \Large \text{1.0} $$

2026年6月1日発効のKlippel価格表によると、通常室内で直接音を測る最小公表部品構成の小計は正味EXWで99,490 EURです[2]。内訳はNFS carousel 53,800 EUR、必須TRF 1,310 EUR、NFS Basic 10,890 EUR、Direct Sound Separation 23,960 EUR、KA3 SXアナライザー6,420 EUR、Mic 301E 48V set 1,960 EUR、掲載された最安のパワーアンプ候補SL900 1,150 EURです。2026年7月16日のECB参照レートでは18,504,145円（114,085.18 USD）です[3]。PC、ケーブル、税金、関税、輸送、サポートは別途必要なため、構成別見積もりが必要です。

66,000 EURはcarousel、TRF、NFS Basicだけのハードウェア・Basic小計です。Basicに含まれるのはRobotics、Visualization、Comparison、Field Identificationであり、通常室内の直接音測定に必要なDirect Sound Separationは別ライセンスです[2]。低価格のゲート処理式回転測定装置には同等の反射分離と近接場から遠方界へのホログラフィ再構成がなく、自動フルスペーススキャン、1度未満の出力、500kg未満の静止DUT対応、通常室内での直接音分離、公称10Hz〜20kHz帯域、全方向±1dBのレベル精度を併せ持つ完成品で、より安価なものは確認できませんでした。したがってNFS構成が同等以上の機能と公表性能を備える最も安価な選択肢であり、コストパフォーマンスは1.0です。

## 信頼性・サポート

$$ \Large \text{0.6} $$

Klippelの2026年標準取引条件では、物的瑕疵請求の時効を1年と定めています[6]。メーカー直接のサポートがあり、ハードウェアの修理・校正はドイツへの返送または指定販売代理店での校正が必要です[4]。ソフトウェア購入後3ヶ月以内に公開された更新は更新料なしで利用できますが、その後の継続更新と迅速な支援には年間有償サポート契約が必要で、契約がなければKlippelが支援を断る場合があります[4][5]。ソフトウェアのリリースは2026年まで継続しています[7]。精密な多軸スキャナーは可動部を持ちますが、機種別のRMA、MTBF、修理所要期間、独立した長期故障率データは公開されていません。短い瑕疵請求期間と機械的複雑さを、直接サポートと継続的なソフトウェア保守が補っています。

## 設計思想の合理性

$$ \Large \text{1.0} $$

KlippelのNFS設計は測定重視かつエビデンスベースであり、制御されたロボット動作、電気・音響データ取得、ホログラフィ処理、フィールド分離、可視化、標準化された出力を一つの作業工程に統合しています[1]。コストは装飾的な材料ではなく、精密なスキャニングハードウェア、測定回路、再構成ソフトウェアに向けられています。フィールド分離は直接音と反射音を分けることで通常の室内測定の具体的な制約に対処し、近接場から遠方界への外挿は大型無響施設で行う多くの測定を反復可能な自動工程で代替します。独自アルゴリズム、ロボティクス、ソフトウェア、客観的な出力を組み合わせた、科学的に意味のある革新的な専用音響機器であり、主観的・非音響的な主張に依存していません。

## アドバイス

NFSは、大型無響室を使わずに自動フルスペース指向性と音響パワーを必要とするラウドスピーカー・トランスデューサーメーカー、音響R&D研究所、測定機関に適しています。66,000 EURのスキャナー・Basic小計には、Direct Sound Separation、KA3、測定マイク、パワーアンプが含まれません。購入時には、これらに加えてPC・ケーブル、輸送、税金、年間サポートを含む構成別見積もりを取得すべきです。利用できる精度仕様と検証グラフは第三者による再現ではなくメーカー資料であるため、厳密な不確かさ管理が必要な研究所は校正、再現性、基準比較データを購入前に確認すべきです。

## 参考情報

[1] Klippel — Near Field Scanner System (NFS) — https://www.klippel.de/products/rd-system/modules/nfs-near-field-scanner.html — 2026年7月17日参照；メーカー仕様、必要構成、特許、Direct Sound Separationグラフを画像確認

[2] Klippel — Klippel Analyzer System価格表（2026年6月1日発効）— https://www.klippel.de/fileadmin/klippel/Bilder/allgemein/Preisliste%20aktuell/KLIPPEL%20Analyzer%20System%20Price%20List.pdf — 2026年7月17日参照；公式EUR正味・EXW価格、4ページのNFS・ソフトウェア項目およびマイク項目を画像確認

[3] 欧州中央銀行 — ユーロ外国為替参照レート — https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html — 2026年7月17日参照；2026年7月16日は1 EUR = 1.1467 USD、185.99円

[4] Klippel — Product Support — https://www.klippel.de/support/product-support.html — 2026年7月17日参照；メーカーサポート、修理、校正情報

[5] Klippel — Prices + Terms — https://www.klippel.de/support/prices-terms.html — 2026年7月17日参照；ソフトウェア更新およびサポート契約条件

[6] Klippel — Standard Business Terms 2026 — https://www.klippel.de/fileadmin/klippel/Files/Support/Klippel_Standard_business-terms_2026.pdf — 2026年7月17日参照；物的瑕疵請求の時効

[7] Klippel — New software update available: dB-Lab 212 / QC 7 — https://www.klippel.de/service/news/newsdetails/article/new-software-update-available-db-lab-212-qc-7.html — 2026年7月17日参照；2026年のソフトウェアリリース

[8] Klippel — C8 Near Field Scanner System — https://www.klippel.de/fileadmin/klippel/Bilder/Our_Products/R-D_System/PDF/C8%20Near%20Field%20Scanner%20System.pdf — 2026年7月17日参照；8、35、36ページを画像確認；メーカー公表の精度、帯域、マイク制約、無響基準との検証条件

(2026.7.17)
