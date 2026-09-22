---
layout: product
title: "Chord Electronics DAVE Product Review"
target_name: "Chord Electronics DAVE"
company_id: chord-electronics
lang: en
ref: chord-electronics-dave
date: 2026-09-12
rating: [3.6, 0.8, 0.6, 1.0, 0.7, 0.5]
price: 14900
summary: "Chord Electronics DAVE is a flagship FPGA-based DAC, digital preamplifier, and headphone amplifier evaluated on measured performance, technology level, cost-performance, reliability, and design philosophy."
tags: [DAC, Headphone Amplifier, Preamplifier, Chord Electronics, FPGA]
permalink: /products/en/chord-electronics-dave/
---

## Overview

Chord Electronics DAVE ("Digital to Analogue Veritas in Extremis") is the company's flagship desktop DAC, digital preamplifier, and headphone amplifier, launched in 2015. Its proprietary Pulse Array conversion stage is controlled by a Spartan-6 FPGA running a 164,000-tap WTA reconstruction filter developed by Rob Watts [1]. The current regular US new-unit price is 14,900 USD, with stock available at the cited retailer [4].

## Scientific Validity

$$ \Large \text{0.8} $$

GoldenSound measured line-output S/N Ratio of 119.0dB and Dynamic Range of 117.6dB using AES17 methodology. With a 1kHz USB signal attenuated by 1dB to avoid full-scale clipping, its balanced-output dashboard shows approximately 5.54Vrms and SINAD of 115.2/114.4dB. Its two-tone IMD result is -108/-107dB, approximately 0.0004% [2]. These are excellent line-level noise and distortion results. Audio Science Review's separate USB dashboard, at approximately 3.92Vrms into 200kΩ with a 22.4kHz measurement bandwidth, shows SINAD of 112.9/108.7dB; that review also found noise varying between measurement runs [3]. Different output levels and input attenuation limit direct comparison between the two laboratories.

GoldenSound's graphs show crosstalk around -120dB at 1kHz and -97dB at 20kHz, very low jitter-related artifacts, and approximately 1dB attenuation at 20kHz with the HF filter enabled [2]. The manufacturer's ±0.1dB frequency-response specification applies with that filter disabled. Its 127.5dB dynamic-range specification is A-weighted, so a direct subtraction from a differently weighted independent result does not establish a discrepancy [1][2].

Headphone performance deserves a separate qualification: Audio Science Review measured S/N Ratio of approximately 82dB at 50mV into 600Ω, making low-level noise more relevant for sensitive earphones. Its power sweeps show about 98mW into 300Ω and 0.94W into 33Ω before clipping, with low distortion below those limits [3]. Most results are strong, but low-level headphone noise, filter-dependent response, and the full-scale clipping behavior prevent an unqualified top-tier assessment. The cited GoldenSound results concern DAVE alone, not improvements from adding an M Scaler.

## Technology Level

$$ \Large \text{0.6} $$

The in-house Pulse Array conversion architecture and WTA filter embody original circuit and digital-signal-processing development and accumulated design knowledge. GoldenSound's filter plots confirm a very sharp reconstruction-filter transition, giving the implementation a concrete technical characteristic beyond its component count [1][2]. The Spartan-6 platform and the architecture introduced in 2015 are now mature. Neither independently established adoption of its intellectual property by other manufacturers nor a sustained lead across conversion-performance measurements has been demonstrated. The engineering originality is meaningful, but does not establish that this remains the most advanced available implementation.

## Cost-Performance

$$ \Large \text{1.0} $$

DAVE's current US new-unit price is 14,900 USD [4]. Its complete functionality includes four BNC digital inputs accepting PCM up to 384kHz, an AES input and two optical inputs supporting PCM up to 96kHz, USB PCM up to 768kHz and native DSD512, volume-controlled RCA/XLR outputs, a headphone amplifier, remote control, and adjustable crossfeed [1]. The BNC inputs also support paired operation with compatible high-rate sources such as the M Scaler [1][2]. A complete substitute must preserve these functions alongside DAVE's measured line-output dynamic range of 117.6dB, balanced-output SINAD of 114.4–115.2dB near 5.54Vrms, and headphone output of 98mW into 300Ω and 0.94W into 33Ω [2][3].

The Topping DX5 II and DX9 Discrete provide less expensive DAC/preamp/headphone-amplifier approaches, but their coaxial inputs stop at 192kHz; their crossfeed processing also has a 44.1–48kHz operating range [8][9]. Adding an input selector and AES conversion to such a unit can address connection count or connector format, but cannot extend its digital receiver to DAVE's 384kHz coaxial operation. A complete equivalent product or finished-product combination at a lower price was not established. DAVE itself is therefore the cheapest confirmed option with the complete functionality and measured performance, so CP is 1.0. This result concerns the complete input and processing feature set, rather than value for listeners who only need a USB DAC and headphone amplifier.

## Reliability & Support

$$ \Large \text{0.7} $$

DAVE carries a five-year manufacturer warranty, supported by Chord and its international distributor/dealer network [1][7]. The warranty requires an authorized purchase and proof of purchase; repair arrangements begin with the selling dealer. Purchases outside the buyer's country may need service in the original country of sale, with transport and import costs relevant to the buyer. Out-of-warranty repairs are offered subject to assessment and parts availability [7]. No aggregate failure-rate or MTBF data was identified, so long-term failure probability remains unquantified. The documented warranty and service arrangements are strengths.

## Rationality of Design Philosophy

$$ \Large \text{0.5} $$

Custom reconstruction filtering and Pulse Array conversion represent an innovative engineering direction, and the sharp measured filter transition is a real implementation result [1][2]. However, pursuing a bespoke conversion platform is a costly route to low noise and distortion: the chip-based DX5 II dashboard reaches SINAD of approximately 122.8/122.4dB at 4.19/4.15Vrms into 200kΩ, compared with DAVE's 112.9/108.7dB near 4V under comparable USB bandwidth conditions [3][5]. This engineering comparison weakens the justification for the additional development cost of the custom conversion stage. It does not establish an audible difference or make the DX5 II a replacement for DAVE's complete functionality. An unusually long filter does not by itself demonstrate an audible improvement. The assessment recognizes the innovative approach while questioning the efficiency of the custom conversion implementation.

## Advice

DAVE offers excellent line-output performance and an unusually extensive digital-input arrangement. Its appeal is strongest when those inputs and processing functions are actually needed. For sensitive earphones, consider the measured low-level noise; for demanding high-impedance headphones, check the available power. Avoid operating conditions that induce full-scale clipping [2][3]. If only USB conversion, volume-controlled balanced outputs, and headphone listening are required, the DX5 II is a relevant lower-cost option with better measured line-output SINAD, but it does not replace DAVE's full input capability [3][5][8].

## References

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
