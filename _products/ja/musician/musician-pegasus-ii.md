---
layout: product
title: "Musician Pegasus II 製品レビュー"
target_name: "Musician Pegasus II"
company_id: musician
lang: ja
ref: musician-pegasus-ii
date: 2026-06-26
rating: [1.9, 0.7, 0.2, 0.5, 0.4, 0.1]
price: 170000
summary: "ディスクリートバランスR2R方式のデスクトップDAC（170,000円）。Pegasus II固有の独立した第三者測定データは存在せず、メーカー仕様のみが流通している。設計思想は測定性能の優位性よりも主観的なアーキテクチャへの嗜好を中心に構築されている。"
tags: [Balanced, DAC, FPGA, R2R, デスクトップ]
permalink: /products/ja/musician-pegasus-ii/
---
## 概要

Musician Pegasus IIは、広州楽智家科技有限公司（ブランド名：Musician Audio）が2024年初頭に発売したスタンドアロン型デスクトップDACで、価格は170,000円です。Altera Cyclone IV FPGAによって制御される1チャンネルあたり4系統の独立したR2Rネットワークを備えたディスクリートバランスR2R抵抗ラダー方式を採用し、USB音声処理にはSTM32F446 ARMマイクロコントローラを、電源には多段絶縁を施した線形トロイダル電源を搭載しています。デジタル入力はUSB-B、同軸、光、AES/EBU、およびHDMI/LVDS経由のI2Sに対応します。アナログ出力はXLRバランス（3.55 Vrms）とRCAアンバランス（2.2 Vrms）です。USB・I2S経由で32ビット/1536 kHzのPCMおよびDSD1024をサポートし、NOSとOSの動作モードを切り替えられ、OSモードでは最大16倍アップサンプリングが可能です。本体はCNC加工アルミシャーシで重量3.9 kg、消費電力は最大20 Wです。Pegasus IIはオリジナルのPegasusの後継機にあたり、電解コンデンサの定数変更と電源配線の改良が施されています [1]。

## 科学的有効性

$$ \Large \text{0.7} $$

Musician Pegasus IIについての独立した第三者ベンチ測定は一切公表されていません。現在流通しているすべての性能数値はメーカー公称仕様に由来するものであり、測定条件は開示されていません。メーカーはTHD+N 0.002%、S/N比123 dB（A加重）、ダイナミックレンジ120 dB超、周波数特性10 Hz〜60 kHzを公称していますが、これらの数値に対する負荷インピーダンス、信号レベル、測定帯域幅はいずれも示されていません [1]。仮にTHD+N 0.002%およびSNR 123 dBの数値が正確であれば、DACとして非常に高い性能水準ですが、測定条件が非開示であるため確認はできません。オリジナルのMusician Pegasus（V1）はAudioScienceReviewのコミュニティメンバーによってAPx555Bアナライザで2020年に測定されており、SINAD、THD+N、ダイナミックレンジ、周波数特性、SMPTE IMD、マルチトーンのグラフベース結果が公表されています。ただし、Pegasus IIはハードウェアが改訂されたモデルであり、独立した再検証なしにそれらの測定値を現行製品に適用することはできません [2]。Pegasus IIの数値はメーカー公称かつ条件限定の情報にとどまるため、強い公称仕様を踏まえても評価は保守的です。

## 技術レベル

$$ \Large \text{0.2} $$

Pegasus IIは、R2Rネットワーク切り替えおよびFIRフィルタリングに独自FPGAファームウェアを用いた自社設計を採用しています。しかし、FPGA + R2Rラダーというコアトポロジーは、商業用オーディオファイルDAC分野においてHolo Audio（2016年）およびDenafrips（2017年）によってすでに確立されており、Pegasus IIの2024年発売時点では中国製ディスクリートDAC各社の間で一般的なパターンとなっていました。使用されているAltera Cyclone IV FPGAは2009年に市販開始されたデバイスであり、DenafripsやMusician自社ラインナップを含む複数の競合製品にも採用されています。同一のSTM32F446 USBインターフェース構成とFPGA + R2Rの組み合わせは、オリジナルのPegasusで早くも2020年に登場しており、Pegasus IIではパッシブ部品の交換以外にアーキテクチャ上の変更は一切導入されていません。DenafripsやGustard、Holo Audioを含む競合他社も同等のFPGA制御R2R設計を実装しており、このトポロジー自体は差別化要素ではなく、複製困難な技術でもありません。NOS/OS選択モード、FIFOジッターバッファ、線形トロイダル電源はいずれも、本製品の発売以前から長年にわたって確立された技術です。

## コストパフォーマンス

$$ \Large \text{0.5} $$

確認された最安値の適格比較対象はSMSL D400ES（85,000円）です [3]。同製品はAudioScienceReviewにてAmir Majidimehrによる第三者レビューが完備されています [4]。D400ESはPegasus IIが備えるすべての主要接続機能を網羅しています。すなわち、バランスXLR出力、RCA出力、USB入力、AES/EBU入力、同軸入力、光入力、HDMI経由I2S入力、ネイティブDSDサポートです。測定性能においては、D400ESはTHD+N 0.00005%（Pegasus IIメーカー公称0.002%に対して）、SNR/ダイナミックレンジ133 dB XLRバランス（Pegasus IIメーカー公称123 dB / 120 dB超に対して）を達成しており、IMDハンプも存在しません。これらはすべてASRにより第三者確認済みです。なお、オリジナルのPegasus V1のASR測定ではR2R方式特有のIMDハンプが確認されています [2]。

Pegasus IIの170,000円に対してD400ESは85,000円であり、コストパフォーマンス比較は0.50です。

この比較には、入手可能なデータによる制約があります。Pegasus IIにはメーカー公称仕様しか存在しない一方、D400ESはASR確認済みの測定値を持っており、Pegasus IIの実際の性能を独立検証したデータは公表されていないためです。

## 信頼性・サポート

$$ \Large \text{0.4} $$

Musician Pegasus IIの保証期間は、Aoshida Audioを通じた1年間の限定保証であり、国際発送を前提とするデスクトップDACとしては短めです [5]。Aoshidaの返品・保証手続きでは、サポートによる事前承認、顧客負担の返送、チケット提出後48時間以内の回答目標、受領後3〜6営業日でのアフターサービス処理が示されています [5]。本製品にはファームウェア更新可能なコンポーネントが2つ（Altera Cyclone IV FPGAおよびSTM32F446 MCU）搭載されており、オリジナルのPegasusでファームウェア更新によって解決したスタッター/スキップ不具合の前例があることから、アップデート提供の実現可能性は確認されています。ただし、Pegasus IIの公開ファームウェア改訂履歴は存在しません。入手可能なメーカー/販売代理店資料では、Pegasus II固有のリコール情報は示されていません。筐体については主観評価ではなく、CNC加工アルミシャーシ、重量3.9 kg、Furutech金メッキIECソケットという仕様として確認できます [1]。

## 設計思想の合理性

$$ \Large \text{0.1} $$

Pegasus IIの設計思想は、測定性能の優位性ではなく「自然」「有機的」「アナログライク」といった主観的な表現を主な根拠としてR2Rディスクリート方式を選択することを中心に据えています。2024年時点では、SINAD 120 dBを超えるデルタシグマDACチップが部品コストの何分の一かで商業的に入手可能であり、170,000円というR2Rアーキテクチャの性能的優位性は公表された測定データによって裏付けられていません。V1からPegasus IIへの改良点として挙げられる金メッキACソケットと単結晶銅電源配線は音質向上として提示されていますが、それを裏付ける前後の測定データは一切存在しません。メーカーが主張する300時間のバーンイン要件は、公表された測定データによる裏付けがなく、精密金属皮膜抵抗の既知の安定特性とも一致しません。電解コンデンサの化成は300時間よりはるかに短い時間で完了します。Pegasus IIとV1の比較では、アーキテクチャ上の進歩、新機能の追加、測定性能の向上はいずれも確認されず、パッシブ部品の交換にとどまっています。ファームウェアレベルの機能追加、DSP統合、測定検証済み性能目標への取り組みもなく、全体として保守的なアプローチが一貫しています。本製品は動作するDACとして機能しますが、測定重視の観点では設計根拠が弱い製品です。

## アドバイス

Musician Pegasus IIは、ディスクリートR2R方式を設計上の嗜好として特定の理由から選ぶ購入者にのみ推奨できます。測定DAC性能をコストあたりの主要基準とする購入者には、SMSL D400ES（85,000円）がASR確認済みのTHD+N 0.00005%、SNR 133 dB XLR、Pegasus IIの170,000円に対する同等の接続性を提供しています [3][4]。Pegasus II固有の独立した第三者ベンチ測定が一切存在しないため、メーカー公称のTHD+N 0.002%およびSNR 123 dBの数値を独立確認することはできず、購入者は170,000円で未検証の性能主張を受け入れることになります。1年間の保証期間と中国への返送が必要なサービス体制は、この製品を国際購入する際の所有リスクとして無視できません。HDMI経由I2S、AES/EBU、DSD1024といった接続の幅広さをすでにR2R好みのリスニングシステムで活用している購入者には機能的な選択肢となりますが、測定性能重視の代替製品と比較した場合の価値は、入手可能なデータでは支持されません。

## 参考情報

[1] Aoshida Audio - Musician Pegasus II 製品ページ, https://aoshida-audio.com/products/musician-pegasusii, accessed 2026-06-17, メーカー/販売代理店価格・仕様

[2] Audio Science Review - Musician Pegasus R2R DAC 測定記録（オリジナルV1、WolfX-700、APx555B使用）, https://www.audiosciencereview.com/forum/index.php?threads/measurements-of-musician-pegasus-r2r-dac.18786/, accessed 2026-06-17

[3] Aoshida Audio - SMSL D400ES 製品ページ（価格参照）, https://aoshida-audio.com/products/smsl-d400es, accessed 2026-06-17

[4] Audio Science Review - SMSL D400ES DAC レビュー（Amir Majidimehr）, https://www.audiosciencereview.com/forum/index.php?threads/smsl-d400es-dac-review.40884/, accessed 2026-06-17, XLRバランス測定

[5] Aoshida Audio - Return and Warranty Policy, https://aoshida-audio.com/pages/warranty-policy, accessed 2026-06-17, 保証・返品手続き・サポート対応時間

(2026.6.26)
