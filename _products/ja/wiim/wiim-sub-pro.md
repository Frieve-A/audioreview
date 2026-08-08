---
layout: product
title: "WiiM Sub Pro 製品レビュー"
target_name: "WiiM Sub Pro"
company_id: wiim
lang: ja
ref: wiim-sub-pro
date: 2026-07-17
rating: [3.4, 0.4, 0.6, 1.0, 0.6, 0.8]
price: 77000
summary: "RoomFit自動音場補正、汎用RCA入力、10バンド・パラメトリックEQを備えたワイヤレス駆動サブウーファー"
tags: [Subwoofer, Class D, Room correction, Wi-Fi, Wireless]
permalink: /products/ja/wiim-sub-pro/
---
## 概要

WiiM Sub Proは同社初のパワード・サブウーファーです。8インチドライバーと250W RMSのClass-Dアンプに、汎用RCAライン入力、Wi-Fi 6/Ethernet接続、スマートフォンまたは外部マイクの音響スイープでEQ、クロスオーバー、位相、レベル、遅延を調整するRoomFit自動補正を組み合わせています [1]。公式仕様はBluetooth 5.3 LEを記載する一方、製品ページのFAQはBluetoothを将来対応と説明しており、現時点での利用可否は明確ではありません [1]。一般的なラインレベル音源から使用できるほか、対応するWiiM製品とはワイヤレスで統合できます [1]。

## 科学的有効性

$$ \Large \text{0.4} $$

Erin's Audio CornerはCEA-2010-A、Klippel Distortion Analyzer 2/TBM、LFEバイパス、2mグラウンドプレーンのピークSPLという条件で最大出力を測定しています [2]。WiiM Sub Proは20Hzで歪み閾値を超過し、25Hzで82.9dB、31.5Hzで91.5dB、40Hzで100.2dB、50Hzで104.6dB、63Hzで106.7dB、80Hzで106.5dB、100Hzで105.3dB、125Hzで104.1dB、160Hzで100.6dBを記録し、40Hz-80Hz平均は104.5dB、25Hz-100Hz平均は100.0dBでした [2]。同条件では、SVS 3000 Microが各帯域で102.7dBと98.0dB、KEF KC62が96.9dBと95.0dBでした [2]。中低域には実用的なヘッドルームがありますが、31.5Hz未満での急激な出力制限は深低域効果に対する可聴上の制約です。メーカーは35Hz-200Hz ±3dB、25Hzで-6dB、最大音圧104dB、THD+N 1%未満を公称していますが、周波数特性と最大音圧のレベルや測定条件、THD+Nの測定周波数とSPLは示していません [1]。S/N比、一定レベルでの独立した周波数特性、通常出力時の歪み、圧縮、群遅延のデータもありません。40Hz以上の出力だけでは深低域の制約と測定項目の不足を補えないため、科学的有効性は0.4です。

## 技術レベル

$$ \Large \text{0.6} $$

WiiM Sub Proは、スマートフォンまたは外部マイクを用いるRoomFit補正をアプリベースのDSP制御、Wi-Fi 6、Ethernet接続と統合しています [1]。室内測定をEQ、クロスオーバー、位相、レベル、遅延の調整へ結び付ける構成は、音響測定、組み込みDSP、ソフトウェア、ネットワーク制御を実用的に組み合わせたものです。一方、引用した技術資料からは新規の補正手法や競合が再現しにくい実装までは確認できず、強みは技術的な飛躍より統合にあります。

## コストパフォーマンス

$$ \Large \text{1.0} $$

**現在の日本市場価格: 77,000円 (US市場価格449 USD)。** [1][4]

必須のユーザー向け機能は、汎用RCAライン入力、マイクを使うRoomFit自動補正、10バンド・パラメトリックEQ、アプリによるクロスオーバー、位相、レベル、遅延の調整、Wi-Fi 6/Ethernet接続です [1]。比較に用いる実測出力は、レビュー対象のCEA-2010-A測定による25Hzの82.9dB、31.5Hzの91.5dB、40Hz-80Hz平均の104.5dBです [2]。機能が近いSonos Sub Miniは64,800円ですが、対応するSonos製品との接続に限られ、汎用ライン入力、Ethernet、10バンド・パラメトリックEQを備えないため、より安価でも同等ではありません [3]。77,000円未満で、機能一式とこれらの実測出力を同等以上に満たす製品は確認できませんでした。WiiM Sub Proが確認できた最安の同等選択肢であるため、CPは1.0です。

## 信頼性・サポート

$$ \Large \text{0.6} $$

WiiMは直接のメーカーサポートとOTAファームウェア保守を提供しています。リリースノートには、2025年7月から2026年3月までに6回のSub Pro向け更新が掲載され、起動、音量、スタンバイ、再生クラッシュ、RoomFit、RCA同期の修正が含まれます [5]。当初購入者に対する限定保証は1年間で、正規販売店からの購入品は購入証明を用意して販売店経由で手続きします [6]。引用した資料には故障率、RMA、MTBFの統計がなく、長期的なハードウェア信頼性はまだ定量化できません。

## 設計思想の合理性

$$ \Large \text{0.8} $$

WiiM Sub Proは、マイクによる音響スイープを使ってEQ、クロスオーバー、位相、レベル、遅延を調整する、測定ベースの補正を設計の中心に据えています [1]。室内の影響へ直接対処しつつ、汎用RCA入力で一般的な音源機器との互換性を保ち、アプリとネットワーク接続で操作とワイヤレスシステムへの統合をまとめています [1]。公開された設計の中心は、測定可能な室内応答と操作性へ向けたDSP補正と実用的な統合です。

## アドバイス

WiiM Sub Proは、ワイヤレス対応サブウーファーに汎用RCA互換性、アプリ制御のDSP、自動音場補正を必要とする購入者、特にWiiMシステムへ組み込む場合に適しています。40Hz-80Hzの実測平均は同じ表のSVS 3000 MicroとKEF KC62より高い一方、31.5Hz未満では急激に制限されました。この深低域で強い出力が必要な場合は、条件のない25Hzまでの再生帯域表示よりCEA-2010-A実測値を優先すべきです。必要な出力が主に40Hz以上で実測ヘッドルーム内に収まる場合、補正機能と統合機能には実用的な価値があります。

## 参考情報

[1] WiiM Sub Pro — 公式製品ページおよびSpecsタブ。参照日 2026-07-17。https://www.wiimhome.com/wiim-sub-pro  
[2] Audio Science Review — Erin's Audio CornerのCEA-2010-A測定表転載。測定日 2026-05-31、参照日 2026-07-17。Klippel Distortion Analyzer 2/TBM、LFEバイパス、2mグラウンドプレーンのピークSPL。https://www.audiosciencereview.com/forum/index.php?threads/wiim-sub-pro.64372/page-8#post-2616404  
[3] Sonos — Sub Mini製品ページ。参照日 2026-07-17。https://www.sonos.com/ja-jp/shop/sub-mini  
[4] Amazon.co.jp — WiiM Sub Pro製品ページ。参照日 2026-07-17。https://www.amazon.co.jp/dp/B0FD2RKN7P  
[5] WiiM Sub Proファームウェア・リリースノート — ヘルプセンター。参照日 2026-07-17。https://faq.wiimhome.com/en/support/solutions/articles/72000646373-wiim-sub-pro-firmware-release-notes  
[6] WiiM — 返品・返金・保証ポリシー。参照日 2026-07-17。https://www.wiimhome.com/refund-policy

(2026.7.17)
