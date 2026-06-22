---
layout: product
title: "HiFiMAN HM-602 Product Review"
target_name: "HiFiMAN HM-602"
company_id: hifiman
lang: en
ref: hifiman-hm-602
date: 2026-06-22
rating: [1.1, 0.3, 0.2, 0.3, 0.2, 0.1]
price: 439
summary: "A 2010-era portable DAP built around a non-oversampling Philips TDA-1543 DAC. Stereophile measurements by John Atkinson confirm problematic frequency response rolloff above 16 kHz, missing DAC codes at low signal levels, granular noise floor, and a line output that clips into loads below 1 kΩ. Crosstalk is the sole strong metric. The Shanling M0 Pro at 148.99 USD delivers ASR-measured THD+N of 0.0006% and SNR of 118 dB, leaving the HM-602's 439 USD original price unsupported on measured performance grounds."
tags: [DAP, Digital audio player, Discontinued, HiFiMAN, NOS DAC, Portable]
permalink: /products/en/hifiman-hm-602/
---
## Overview

The HiFiMAN HM-602 is a portable digital audio player released in 2010 by HiFiMAN (then operating under the Head-Direct brand), founded by Dr. Fang Bian. It sat between the entry-level HM-601 and the flagship HM-801, priced at an original MSRP of 439 USD. The device is centered on a Philips TDA-1543 non-oversampling (NOS) DAC — a 16-bit chip originally designed for consumer CD players in the early 1990s — configured without a digital reconstruction filter, using only a slow-rolloff analog low-pass filter (OP275 and OPA2604 op-amps). The headphone amplifier stage uses an OPA2107 op-amp with a selectable high/low gain switch. Storage is provided via 8 or 16 GB internal flash and a microSD card slot (up to 32 GB). A USB DAC mode is included. The product is discontinued and no longer available through retail channels [1][2].

## Scientific Validity

$$ \Large \text{0.3} $$

Stereophile's John Atkinson measured the HM-602 using the Audio Precision SYS2722, with the results indicating consistently poor performance across most metrics [2].

Frequency response rolls off prematurely above approximately 16 kHz due to the NOS DAC's slow-rolloff analog low-pass filter operating without a digital reconstruction filter. This yields a problematic result against the 20 Hz–20 kHz standard.

THD at full-scale output shows harmonics in the -80 to -90 dB range (approximately 0.003–0.01%), approaching but not securely meeting the transparent threshold. At low signal levels (-90 dBFS), the TDA-1543 produces missing DAC codes, causing frequency-doubling behavior and elevated second-harmonic distortion with a left-channel negative amplitude error — a clearly problematic outcome at normal operating levels.

The manufacturer specifies S/N ratio at 92 dB, placing it between the Problematic threshold (80 dB) and the Transparent threshold (105 dB). Atkinson's measurements confirm an elevated, granular noise floor described as higher than desirable.

Dynamic range is fundamentally compromised by the missing-code behavior at -90 dBFS noted above, with no recoverable absolute figure available from any source — a problematic result.

The IMD spectral plot reveals a granular noise floor, and the line output is unable to drive loads below 1 kΩ at full level without asymmetrical clipping, placing IMD in the problematic range.

Crosstalk is the sole strong performer: Atkinson measured approximately 90 dB of midband channel separation at the headphone output, well above the transparent threshold. The manufacturer's line output specification of 74 dB crosstalk is also above the transparent threshold.

Atkinson explicitly concluded that the iPod Classic 160 GB measured significantly better in every parameter [2]. With four of six metrics at problematic levels, one intermediate metric, and only crosstalk at an excellent level, the score is 0.3.

## Technology Level

$$ \Large \text{0.2} $$

The HM-602 was designed in-house by Fang Bian, with per-model op-amp selection decisions documented and confirmed by Stereophile, ruling out a shared OEM reference board — this merits a positive adjustment. However, the core technology works strongly against the score. The Philips TDA-1543 was already 15–20 years old at the product's 2010–2011 launch date. The NOS topology using TDA-1543 was a well-established DIY community technique, not an industry-leading engineering advancement, and no proprietary patents have been identified. Because any competent electronics engineer could replicate a TDA-1543 NOS build — the DIY community had been doing so for years before the HM-602's release — no meaningful competitive advantage duration exists. The NOS approach was not adopted by the broader industry, Stereophile measurements confirmed inferior performance against contemporaneous alternatives, and there is no licensing interest from competitors. Technology integration is adequate (digital file playback, USB connectivity) but neither purely analog-only nor advanced [1][2].

## Cost-Performance

$$ \Large \text{0.3} $$

The HM-602 is discontinued; 439 USD (original launch MSRP) is used as the price basis, as no new-unit market price exists.

The Shanling M0 Pro at 148.99 USD (current Amazon listing, sold by SHANLING Official [4]) provides all essential functions of the HM-602 — headphone output (3.5mm), line output (firmware-switchable), USB DAC, SD card storage (up to 2 TB), volume control, gain modes, and 24-bit file playback — and additionally includes Bluetooth and parametric EQ not present on the HM-602. Audio Science Review measurements confirm the M0 Pro's THD+N at 0.0006% (3.5mm SE output) versus the HM-602's manufacturer-stated 0.09%, and SNR at 118 dB versus 92 dB — representing 26 dB of S/N improvement. Dynamic range measures 118 dB per ASR, compared to the problematic low-level linearity failure documented by Stereophile for the HM-602. Frequency response is confirmed flat from 20 to 40 kHz by ASR, versus the premature rolloff above approximately 16 kHz measured by Stereophile. All available metrics show the M0 Pro as equal or better [3][4].

CP = 148.99 USD ÷ 439 USD = 0.34, rounded to 0.3.

## Reliability & Support

$$ \Large \text{0.2} $$

HiFiMAN's warranty for portable players is 1 year, falling within the threshold for a negative adjustment. A user-reported Head-Fi discussion documents SD card reliability and compatibility concerns, including reports of unstable behavior with some 32 GB SDHC cards and questions about Class 10 card compatibility. Firmware support ended with version 0.12 in January 2013, and no manufacturer-authorized repair service is documented for this discontinued product, leaving owners reliant on general third-party repair shops. Warranty-period repair turnaround was reported at approximately two months from China in the same discussion. The plastic enclosure and SD card slot mechanism represent construction inherently prone to degradation. No statistical RMA or MTBF data are available, so no failure-rate adjustment is applied in either direction [5].

## Rationality of Design Philosophy

$$ \Large \text{0.1} $$

The HM-602's design philosophy is organized around subjective audiophile preference for the NOS topology and the TDA-1543 chip's perceived sonic character, rather than measured performance optimization. At the time of the product's 2010–2011 release, commercially mature delta-sigma DAC solutions were widely available and measurably superior — HiFiMAN's own HM-801 flagship used the more capable Burr-Brown PCM1704 — so the TDA-1543 NOS choice was a deliberate alignment with subjective preference over measurement performance. The TDA-1543 was a low-cost legacy chip available cheaply from secondary market stock; the price premium of the HM-602 over the contemporaneous iPod Classic (249 USD for the 160 GB model) was not supported by superior measured performance, with Stereophile confirming the iPod Classic superior in every measured metric. HiFiMAN marketed the NOS topology as providing better sound quality — a claim directly contradicted by third-party measurements — and marketed 24-bit/96 kHz hi-res playback despite internal 16-bit truncation at the DAC, and a USB DAC function that Stereophile's jitter measurements rendered effectively unusable for critical listening. These represent repeated claims of audible benefit for characteristics that third-party evidence shows are either inferior or non-functional. The design provides genuine audio playback functionality and therefore scores above zero, but accumulates four negative adjustments, resulting in a score of 0.1 after applying the functional product floor [1][2].

## Advice

The HiFiMAN HM-602 is a 2010-era discontinued DAP with Stereophile-documented problematic performance across frequency response, low-level linearity, dynamic range, and intermodulation distortion, available only on the used or secondary market. Its original 439 USD asking price is not supported against current-generation DAP alternatives, as the Shanling M0 Pro at 148.99 USD delivers ASR-measured performance that exceeds the HM-602 in every measured dimension cited here — THD+N 0.0006% versus 0.09% manufacturer-stated, SNR 118 dB versus 92 dB, and flat frequency response versus the premature top-octave rolloff inherent to the NOS DAC architecture. The TDA-1543's missing-code behavior at low signal levels is not a curable firmware or configuration issue; it is a fundamental limitation of using a 1990s consumer DAC chip in NOS configuration. Firmware support ended in January 2013, the SD card slot has user-reported reliability concerns, and no authorized repair service is available for this product. Buyers encountering this device on the used market should be aware that its measured performance falls below the iPod Classic 160 GB, which Stereophile described as 249 USD for the 160 GB model. The objective data do not support choosing the HM-602 over current alternatives when measured performance, support, and reliability are priorities.

## References

[1] HiFiMAN - HM-602 Official Product Page - https://www.hifiman.com/products/detail/74 - accessed 2026-06-17

[2] Stereophile - "Head-Direct HiFiMan HM-602 Digital Audio Player Measurements" (John Atkinson, Audio Precision SYS2722; line/headphone output measurements and low-level linearity tests) - https://www.stereophile.com/content/head-direct-hifiman-hm-602-digital-audio-player-measurements - accessed 2026-06-17

[3] Audio Science Review - Shanling M0 Pro DAP Review - https://www.audiosciencereview.com/forum/index.php?threads/shanling-m0-pro-dap-review.49351/ - accessed 2026-06-17

[4] Amazon.com - Shanling M0 Pro current listing (148.99 USD, sold by SHANLING Official) - https://www.amazon.com/SHANLING-M0-Pro-Portable-Bluetooth/dp/B0BPQT2R5F - accessed 2026-06-17

[5] Head-Fi - HiFiMAN HM-602 SD Card Problem and Warranty Discussion (user-reported compatibility and repair-turnaround discussion; not statistical failure-rate data) - https://www.head-fi.org/threads/a-possible-solution-for-sd-card-problem-of-hifiman-players.558884/ - accessed 2026-06-17

(2026.6.22)
