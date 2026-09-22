---
layout: product
title: "Chord Electronics DAVE 製品レビュー"
target_name: "Chord Electronics DAVE"
company_id: chord-electronics
lang: ja
ref: chord-electronics-dave
date: 2026-09-12
rating: [3.6, 0.8, 0.6, 1.0, 0.7, 0.5]
price: 3520000
summary: "Chord Electronics DAVEは、フラッグシップのFPGAベースDAC・デジタルプリアンプ・ヘッドホンアンプであり、測定性能、技術レベル、コストパフォーマンス、信頼性、設計思想の合理性の観点から評価しています。"
tags: [DAC, ヘッドホンアンプ, プリアンプ, Chord Electronics, FPGA]
permalink: /products/ja/chord-electronics-dave/
---

## 概要

Chord Electronics DAVE（「Digital to Analogue Veritas in Extremis」の略）は、2015年発売のフラッグシップDAC、デジタルプリアンプ、ヘッドホンアンプです。Rob Watts氏が開発した164,000タップのWTA再構成フィルターをSpartan-6 FPGAで実行し、独自のPulse Array変換段を制御します[1]。現在の国内通常新品価格は税込3,520,000円です。掲載店では即納在庫ではなく取り寄せ注文となります[6]。

## 科学的有効性

$$ \Large \text{0.8} $$

GoldenSoundはライン出力でS/N比119.0dB、ダイナミックレンジ117.6dB（AES17方式）を測定しています。フルスケールでのクリッピングを避けるため1kHzのUSB信号を1dB減衰させたバランス出力のダッシュボードでは、約5.54VrmsでSINAD 115.2/114.4dBです。2トーンIMDは-108/-107dB、約0.0004%でした[2]。ライン出力のノイズと歪みは優秀です。一方、Audio Science Reviewの別のUSB測定では、200kΩ負荷、測定帯域上限22.4kHz、約3.92VrmsでSINAD 112.9/108.7dBを示し、測定回によるノイズ変動も報告されています[3]。出力電圧と入力信号の減衰量が異なるため、両者の直接比較には制約があります。

GoldenSoundのグラフでは、クロストークは1kHzで約-120dB、20kHzで約-97dBで、ジッター由来の成分も非常に低く抑えられています。HFフィルターを有効にした周波数特性は20kHzで約1dB減衰します[2]。メーカーの周波数特性±0.1dBという仕様はこのフィルターを無効にした条件です。また、メーカーのダイナミックレンジ127.5dBはA特性のため、重み付けの異なる独立測定値との差だけでは不整合を示せません[1][2]。

ヘッドホン出力には別の注意点があります。Audio Science Reviewの50mV、600Ω負荷でのS/N比は約82dBで、高感度イヤホンでは低音量時のノイズがより重要になります。出力掃引グラフではクリッピング前に300Ωで約98mW、33Ωで約0.94Wが得られ、その範囲内の歪みは低く抑えられています[3]。大半の結果は良好ですが、低音量時のヘッドホン出力ノイズ、フィルター設定による周波数特性、フルスケールでのクリッピングがあるため、無条件に最上位の性能とは評価できません。ここで引用したGoldenSoundの結果はDAVE単体のもので、M Scaler追加による改善を含めていません。

## 技術レベル

$$ \Large \text{0.6} $$

自社開発のPulse Array変換方式とWTAフィルターには、独自の回路・デジタル信号処理開発と蓄積された設計知識が反映されています。GoldenSoundのフィルター特性グラフでも非常に急峻な遷移が確認でき、部品数以外に具体的な技術的特徴があります[1][2]。一方、Spartan-6と2015年に導入されたアーキテクチャは現在では成熟した技術です。他社による知的財産の採用や、変換性能全般にわたる持続的な優位性は独立に確立されていません。設計の独自性には価値がありますが、それだけで現在も最先端の実装であるとはいえません。

## コストパフォーマンス

$$ \Large \text{1.0} $$

DAVEの現在の国内通常新品価格は税込3,520,000円です[6]。機能全体にはPCM最大384kHzに対応する4系統のBNC入力、PCM最大96kHzに対応するAES入力と2系統の光入力、USBのPCM最大768kHz・ネイティブDSD512対応、音量調整付きRCA/XLR出力、ヘッドホンアンプ、リモコン、調整可能なクロスフィードが含まれます[1]。BNC入力はM Scalerなどの対応ソースと組み合わせた高サンプルレートの2本接続にも対応します[1][2]。完全な代替には、これらの機能とともに、実測ダイナミックレンジ117.6dB、約5.54Vrmsでのバランス出力SINAD 114.4～115.2dB、300Ωで98mW・33Ωで0.94Wのヘッドホン出力を維持する必要があります[2][3]。

Topping DX5 IIとDX9 Discreteはより低価格のDAC・プリアンプ・ヘッドホンアンプですが、同軸入力は192kHzまでで、クロスフィード処理にも44.1～48kHzという動作範囲があります[8][9]。入力切替器とAES変換を追加すれば接続数や端子形式を補えても、受信回路をDAVEの384kHz同軸入力対応へ拡張することはできません。より低価格で機能全体を満たす単体製品または完成品の組み合わせは確認できなかったため、機能全体と実測性能を満たす確認済みの選択肢ではDAVE自身が最安であり、CPは1.0です。この結果は入力と信号処理の機能全体を維持する場合のもので、USB DACとヘッドホンアンプだけを必要とする場合の割安さを意味しません。

## 信頼性・サポート

$$ \Large \text{0.7} $$

DAVEには5年間のメーカー保証があり、Chordと国際的な代理店・販売店網によるサポートが提供されます[1][7]。保証には正規販売店での購入と購入証明が必要で、修理は購入店への相談から始まります。国外で購入した場合は元の販売国での修理が必要になることがあり、輸送費や輸入関連費用にも留意が必要です。保証期間後の修理も診断と部品の入手可能性に応じて提供されます[7]。集計された故障率やMTBFのデータは確認できず、長期的な故障確率は定量化できません。確認できた保証と修理体制は強みです。

## 設計思想の合理性

$$ \Large \text{0.5} $$

独自の再構成フィルターとPulse Array変換は革新的な開発方向であり、測定された急峻なフィルター特性も実際の成果です[1][2]。ただし、専用の変換基盤を開発することは低ノイズ・低歪みを得るためのコストがかかる方法です。チップベースのDX5 IIは200kΩ負荷、4.19/4.15VrmsでSINAD約122.8/122.4dBを示し、同程度のUSB測定帯域と約4V出力におけるDAVEの112.9/108.7dBを上回ります[3][5]。この技術的な比較では、独自の変換段に追加の開発費を投じる合理性が弱まります。ただし、可聴上の差を示したり、DX5 IIがDAVEの全機能を置き換えられることを示したりするものではありません。非常に長いフィルターであることだけでは可聴上の改善を示せません。革新的な姿勢を認めつつ、専用変換方式の効率を疑問視する評価です。

## アドバイス

DAVEは優れたライン出力性能と豊富なデジタル入力を備え、それらの入力や処理機能を実際に必要とする場合に魅力があります。高感度イヤホンでは低音量時のノイズ、高インピーダンスで駆動の難しいヘッドホンでは出力余裕を確認してください。フルスケールでクリッピングする動作条件も避ける必要があります[2][3]。USB変換、音量調整付きバランス出力、ヘッドホン再生が目的なら、ライン出力のSINADで上回るDX5 IIは低価格の候補ですが、DAVEの入力機能全体を置き換えるものではありません[3][5][8]。

## 参考情報

[1] Chord Electronics - DAVE - https://chordelectronics.co.uk/product/dave - accessed 2026-09-12
[2] GoldenSound - Chord DAVE Measurements with M Scaler - https://goldensound.audio/2022/03/14/chord-dave-measurements-with-mscaler/ - published 2022-03-14, accessed 2026-09-12 - APx555B, USB, DAVE alone; balanced line output into 200kΩ, 1kHz at -1dBFS for cited SINAD
[3] Audio Science Review - Chord DAVE Review (DAC & HP Amp) - https://www.audiosciencereview.com/forum/index.php?threads/chord-dave-review-dac-hp-amp.35974/ - published 2022-07-23, accessed 2026-09-12 - USB 44.1kHz, balanced line output into 200kΩ, bandwidth below 10Hz–22.4kHz; separate headphone tests
[4] Upscale Audio - Chord DAVE - https://upscaleaudio.com/products/chord-dave-dac-preamplifier-headphone-amplifier - accessed 2026-09-12 - regular new-unit US price, in stock
[5] Audio Science Review - Topping DX5 II Balanced DAC and Headphone Amplifier Review - https://www.audiosciencereview.com/forum/index.php?threads/topping-dx5ii-balanced-dac-and-headphone-amp-review.64264/ - published 2025-07-20, accessed 2026-09-12 - USB 44.1kHz, XLR into 200kΩ, bandwidth below 10Hz–22.4kHz
[6] Fujiya Avic - Chord Electronics DAVE - https://www.fujiya-avic.co.jp/shop/g/g200000033592/?ismodesmartphone=on - accessed 2026-09-12 - regular new-unit Japanese price including tax; available to order, member discount excluded
[7] Chord Electronics - Warranty Policy - https://chordelectronics.co.uk/warranty-policy - accessed 2026-09-12
[8] Topping - DX5 II User Manual V1.6 - https://dl.topping.audio/um/dx5_ii.pdf - accessed 2026-09-12 - input formats and crossfeed operating range
[9] Topping - DX9 Discrete User Manual V1.2 - https://dl.topping.audio/um/DX9_Discrete.pdf - accessed 2026-09-12 - input formats and crossfeed operating range

(2026.9.12)
