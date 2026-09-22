---
layout: company
title: "Ampapa 企業レビュー"
target_name: "Ampapa"
company_id: ampapa
lang: ja
ref: ampapa
date: 2026-09-12
rating: [2.9, 0.6, 0.5, 1.0, 0.4, 0.4]
summary: "実用的な接続機能と従来型・現代型回路を組み合わせるデスクトップオーディオブランドです。代表製品は全機能を維持する比較では価格面に強みがありますが、測定性能と真空管を重視する訴求には注意が必要です。"
tags: [Amplifiers, DACs, Preamps, Bluetooth, Desktop Audio, China]
permalink: /companies/ja/ampapa/
---
## 概要

AmpapaはDouk Audioが販売するデスクトップオーディオブランドで、D1は両者の共同開発製品と明記されています [1][5]。製品構成は統合アンプD1、DAC/ヘッドホンアンプQ1、真空管フォノ/ラインプリアンプA1に加え、ケーブルとラックです。真空管ヘッドホンアンプH1も予約販売の表記で掲載されています [1][13]。本レビューでは、スピーカー駆動、デジタル音源、アナログ音源という異なる役割を代表する既存製品D1・Q1・A1を中心に評価し、H1も現在の設計方針の検討に含めます。

## 科学的有効性

$$ \Large \text{0.6} $$

D1の第三者測定では、バランス入力、1kHz、約5W/ch、測定帯域22.4kHzでTHD+N約0.0029%、SINAD 90.6～90.7dBです。4Ωの周波数応答曲線は20Hzで約-0.03dB、20kHzで約+0.66dBを示し、両チャンネル同時駆動の連続出力曲線は4Ωで約136W/chに達します [2]。8Ωでは20kHzで約+1.5dBです。20Hzの出力掃引では停止し、電源投入時には約10mVrmsの過渡信号も確認されています。通常出力時の歪みは低いものの、スピーカー負荷と超低域の出力余裕には注意が必要です。高出力時には左右の歪みに差も見られます。

Q1のヘッドホン出力は40Hz～15kHzで-0.1/+0.0dB、出力インピーダンス約0.2Ωです。1kHzのクロストークは15.8Ω負荷で-53.2/-52.8dB、300Ωで-78.2/-77.3dB、無負荷で-101.2/-100.4dBです。RAAの最大S/N比は5.6Vrms基準で106dBですが、32Ω・1mW基準では76.16dBです [4]。したがってノイズと分離性能は出力レベルや負荷に大きく依存します。THD対出力グラフでは30.5Ω・1Vrmsで約0.0008%、最大出力付近で約0.005%に上昇し、出力表では30.5Ωで1007.5mW、300Ωで104mWです [4]。メーカーの測定画像は1kHz・2.03VrmsでTHD+N約0.0002%、SINAD 112.1～113.3dB、S/N比121.5～121.7dBを示します [3]。ただし出力経路と測定帯域は特定されておらず、RAAの負荷を接続したヘッドホン測定の代わりにはできません。ライン出力の独立測定は確認できていません。

A1のメーカー仕様はライン周波数応答±0.5dB、RIAA偏差±2dB、S/N比はライン106dB以上、フォノ80dB以上です。THDは0.1%以下ですが、測定レベルや信号経路が明確ではありません [6]。これらは上限・下限であり、実際の歪みが0.1%、S/N比がちょうど80dBと測定されたことを意味しません。フォノ精度の規定がラインより緩いことは読み取れますが、評価は暫定的です。A1の歪み、ノイズ、分離、過負荷に関する独立測定は見つかっていません。

D1・Q1・A1の異なる信号経路上の役割を同等に重視します。D1の通常出力時の低歪み、Q1の負荷に依存する分離性能、A1の十分に特定されていない性能を総合すると、中程度の評価です。H1の公称THD+N 0.04%、S/N比113dB以上、周波数応答±0.7dBにも十分な動作条件がなく、独立した性能結論は出せません [13]。

## 技術レベル

$$ \Large \text{0.5} $$

D1はTPA3255アンプ、ポストフィルターフィードバック、可変ハイパスフィルター、デジタル制御を統合しています。Q1はESS9039Q2MとAK4493、XMOS XU316によるUSB処理、出力経路設定を組み合わせます [3][5]。これらは現代的な部品と回路・制御の実装であり、旧式技術だけに依存しているわけではありません。A1は従来型の真空管プリアンプとヘッドホンアンプICを使い、H1はディスクリートClass A出力段と音量制御ICを採用します [6][13]。従来型アナログ回路から現在のデジタル・アナログ混在実装までを扱っています。

Ampapa固有の特許や、他社が追随するまでに数年を要する技術的障壁は確認できませんでした。D1の共同開発とDAC-Q11からのQ1開発は、製品設計への取り組みを評価する根拠です [3][5]。一方、入手可能な汎用部品と既存の回路・制御技術による実装であり、競合が同等機能に追随する難度は比較的低いと考えられます。通常の現代的な設計能力は認められますが、技術上の差別化は限定的です。DACチップの切り替えによって音が変わるかどうかと、その実装の技術的複雑さは別の問題です。

## コストパフォーマンス

$$ \Large \text{1.0} $$

D1・Q1・A1はシステム内で異なる中核機能を担うため、それぞれ3分の1の重みとします。販売比率を意味する重みではありません。H1は公式掲載に予約販売の表記が残るため、この代表製品の価格平均には含めません。国内の現行価格を同一条件で確認できなかったため、比較は公式直販のUSD価格に統一します。円表示は9月11日公表のECBレート（1 EUR＝1.1592 USD、178.56円）から求めた1 USD＝154.037267円による1円単位の参考換算で、国内販売価格ではありません [16]。メーカー仕様しかない性能比較は暫定的です。

**D1：電源込み30,806円（199.99 USD）[5]。** バランスTRS/RCA入力、Bluetooth、リモコン、トーン調整、トリガー入力、スピーカー出力用30～200Hzハイパスフィルターを備えます。別系統のプリアウトはフルレンジで、フィルター付きサブウーファー出力ではありません。Douk A5は13,862円（89.99 USD）からですが、入力はRCAのみでBluetoothとリモコンがありません [14]。Bluetooth受信機を足すだけでは、バランス入力、トーン調整、連動制御を補えません。Fosi BT20A MAXは35,427円（229.99 USD）からで、バランス入力用インターフェースを追加する前からD1より高く、入力もバランスTRSではなくRCAです [8]。O-NOORUS D4 PROは48V/5A電源込み29,266円（189.99 USD）ですが、ハイパス設定は60/80/120Hzで、D1の30～200Hz連続調整をカバーしません [15]。フィルターと連動制御の追加が必要です。必要機能とD1の実測出力・性能を維持する安価な完成品の組み合わせは確認できず、調査した選択肢ではD1が同等条件で最安です。

**Q1：41,589円（269.99 USD）[3]。** USB UAC1/2、光/同軸、Bluetooth入力、ヘッドホン出力、RCA出力2組、バランスTRS出力2組、リモコン、12Vトリガー出力を条件とします。性能面ではQ1のヘッドホン応答、ノイズ、分離と30.5Ωで最大1007.5mWという実測を基準にします [4]。Fosi ZH3は30,806円（199.99 USD）ですが、Bluetoothとトリガー出力がなく、RCAとバランスライン出力は各1組です [9]。Bluetooth受信機と受動分岐ケーブルで接続の一部は補えますが、DACの電源に連動する制御は追加できず、完全な置き換えではヘッドホン実測性能も維持する必要があります。Topping DX5 IIはBluetooth、バランスライン出力、トリガー制御を備えますが、出力接続の追加前に46,057円（299 USD）です [10]。確認できた機能・測定情報では、より安い同等の完成システムは成立せず、この比較ではQ1が同等条件で最安です。

**A1：20,023円（129.99 USD）[6]。** MMフォノとライン入力、トーン調整、RCA/ヘッドホン同時出力を備えます。7,700円（49.99 USD）のT14-EQにはライン入力がなく、受動切替器だけではフォノ入力をA1のライン入力の公称ノイズ性能を持つ入力に変更できません [7]。両方の音源を共通の操作で扱うには別のライン/トーン/ヘッドホン段が必要で、公称応答・ノイズ・歪み範囲を満たす、より安価な完成品の組み合わせは確認できませんでした。Douk T9は20,793円（134.99 USD）で、ライン/フォノ応答、ノイズ、THDの公称範囲がA1と一致し、ヘッドホン出力も上回りますが、ヘッドホン接続時にはRCA出力を停止します [11]。同時出力を復元するには追加の増幅機器が必要で、既に高い価格がさらに増えます。これらのメーカー仕様に基づけば、必要機能をすべて残す選択肢ではA1が最安です。

代表3製品の比較結果はいずれも1.0となり、等重み平均も1.0です。これは全機能を維持する置き換えの評価であり、使わない機能を省いた簡単なシステムの費用を示すものではありません。

## 信頼性・サポート

$$ \Large \text{0.4} $$

Douk Audioの公表保証は製造上の不具合に対して24か月で、修理または交換、対象修理の往復送料を含みます。事故、無断改造、環境要因、誤使用は対象外で、有償対応の見積もりが提示される場合があります [12]。連絡手段はメールとWhatsAppです。地域別の専用修理網や、モデル別故障率・MTBF統計は確認できませんでした。

D1は第三者試験中の偶発的な短絡から復帰しています [2]。これは当該試験で保護機能が働いた証拠ですが、製品全体の故障率を示すものではありません。A1とH1には使用に伴って特性が劣化する交換可能な真空管があり、真空管を使わない同等回路にはない保守負担を伴います [6][13]。交換可能でも、この消耗自体は解消されません。保証は修理可能性を支えますが、長期耐久実績と部品供給期間は明らかではありません。

## 設計思想の合理性

$$ \Large \text{0.4} $$

D1のスピーカー用ハイパスフィルターとシステム制御、Q1の複数出力とUAC切り替え、フォノ/ライン/ヘッドホン機能の統合は、具体的な利用目的に対応しています [3][5][6]。汎用チップの活用は合理的な設計手段であり、それ自体が不合理さの証拠ではありません。

一方で、A1とH1は真空管による温かさや音作りを訴求し、Q1はESSとAKMのチップに主観的な音の性格を割り当てています [3][6][13]。こうしたチップや真空管に基づく音の性格の説明は、原音への忠実度向上を立証しません。実用的なシステム統合と主観的な部品選択の重視が併存しており、設計の方向が一貫して正確な再生に向いているとはいえません。表示器、筐体、装飾の費用割合は公開情報から分からず、外観だけを理由に費用配分を批判することはできません。

## アドバイス

D1はバランス入力、スピーカー用ハイパスフィルター、連動制御を使う場合に適していますが、負荷による応答差、電源投入時ノイズ、20Hzの出力制限には留意してください。Q1は4組のライン出力とUAC1対応が単純なDAC/ヘッドホンアンプとの違いであり、低インピーダンスのヘッドホンでは分離性能に注意が必要です。A1はヘッドホンとラインの同時出力を含む幅広いアナログ接続を備える一方、実際のフォノノイズと歪みは十分に特定されていません。追加機能が不要なら、より安価で簡単な機器を選べます。H1の予約販売表記とメーカー公称性能は、既存製品で得られた検証結果とは区別してください。

## 参考情報

[1] Douk Audio — Ampapa catalogue - https://doukaudio.com/collections/ampapa-1 - 参照日 2026-09-12

[2] Audio Science Review — Ampapa D1 bench measurements - https://www.audiosciencereview.com/forum/index.php?threads/ampapa-d1-stereo-amplifier-review.69682/ - 参照日 2026-09-12

[3] Douk Audio — Ampapa Q1 specifications and price - https://doukaudio.com/products/ampapa-q1 - 参照日 2026-09-12

[4] Reference Audio Analyzer — Q1 headphone-output measurements - https://reference-audio-analyzer.pro/en/report/amp/douk-audio-ampapa-q1.php - 参照日 2026-09-12

[5] Douk Audio — Ampapa D1 specifications and price - https://doukaudio.com/products/ampapa-d1-hifi-bluetooth-amplifier-with-digital-vu-meters-hpf - 参照日 2026-09-12

[6] Douk Audio — Ampapa A1 specifications and price - https://doukaudio.com/products/ampapa-a1-mini-5654-vacuum-tube-preamp-phono-turntable-amplifier-w-tone-control - 参照日 2026-09-12

[7] Douk Audio — T14-EQ specifications and price - https://doukaudio.com/products/douk-audio-t14-eq-mini-mm-mc-phono-stage-riaa-preamp-for-lp-vinyl-turntables-with-headphone-out - 参照日 2026-09-12

[8] Fosi Audio — BT20A MAX specifications and price - https://fosiaudio.com/products/bt20a-max - 参照日 2026-09-12

[9] Fosi Audio — ZH3 specifications and price - https://fosiaudio.com/products/zh3-dac-headphone-amp-preamp - 参照日 2026-09-12

[10] Topping — DX5 II specifications and price - https://www.topping.store/products/topping-dx5-ii-hi-res-dac-headphone-amp-combo - 参照日 2026-09-12

[11] Douk Audio — T9 specifications and price - https://doukaudio.com/products/douk-audio-t9-hifi-magic-6e2-vacuum-tube-stereo-preamp-mm-mc-phono-stage-for-turntable-amp - 参照日 2026-09-12

[12] Douk Audio — 24-month warranty - https://doukaudio.com/pages/24-month-warranty - 参照日 2026-09-12

[13] Douk Audio — Ampapa H1 presale specifications - https://doukaudio.com/products/ampapa-h1-class-a-headphone-amplifier-with-4000mw-output-trs-rca-preamp - 参照日 2026-09-12

[14] Douk Audio — A5 specifications and price - https://doukaudio.com/products/douk-audio-a5-tpa3255-stereo-amp-hifi-audio-class-d-amplifier-high-pass-filter - 参照日 2026-09-12

[15] O-NOORUS — D4 PRO specifications and power-supply pricing - https://www.o-noorus.com/products/o-noorus-d4-pro-tpa3255-pffb-stereo-hpf-lpf-amplifier-with-balance-hdmi-arc-bluetooth-usb-optical-coaxial-rca-input-3-band-stereo-eq-tone-and-bypass - 参照日 2026-09-12

[16] ECB — Euro foreign exchange reference rates, 11 September 2026 - https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html - 参照日 2026-09-12

(2026.9.12)
