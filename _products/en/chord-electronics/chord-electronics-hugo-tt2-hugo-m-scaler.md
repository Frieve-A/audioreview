---
layout: product
title: "Chord Electronics Hugo TT2 / Hugo M Scaler Product Review"
target_name: "Chord Electronics Hugo TT2 / Hugo M Scaler"
company_id: chord-electronics
lang: en
ref: chord-electronics-hugo-tt2-hugo-m-scaler
date: 2026-07-02
rating: [2.9, 0.8, 0.8, 0.0, 0.8, 0.5]
price: 10945
summary: "The Hugo TT2 / Hugo M Scaler combined system pairs Chord Electronics' flagship FPGA-based tabletop DAC, headphone amplifier, and preamplifier with a standalone 1,015,808-tap digital upsampler connected via dual BNC. Third-party measurements confirm excellent TT2 line-output performance (SINAD 115 dB), while the M Scaler upsamples source content to 705.6–768 kHz using Chord's WTA filter architecture."
tags: [DAC, Desktop, FPGA, Headphone amplifier, Preamplifier, Upsampler]
permalink: /products/en/chord-electronics-hugo-tt2-hugo-m-scaler/
---
## Overview

The Hugo TT2 (5,695 USD) is Chord Electronics' flagship tabletop DAC, headphone amplifier, and preamplifier, manufactured in Kent, England. It uses a custom FPGA implementation developed by Rob Watts, replacing the conventional DAC chip design approach Chord has pursued since 1999. The Hugo M Scaler (5,250 USD) is a companion standalone digital upsampling processor that feeds the TT2 via dual-BNC connection, applying a 1,015,808-tap WTA filter to upsample source content to 705.6–768 kHz. The combined system is priced at 10,945 USD. Both products were released in 2018–2019, extending Chord's FPGA-based conversion architecture introduced with the Chord DAC64 in 1999.

## Scientific Validity

$$ \Large \text{0.8} $$

Third-party measurements by Audio Science Review confirm the Hugo TT2's balanced XLR line output achieves SINAD of 115 dB [3], indicating excellent noise and distortion performance. The manufacturer specifies THD of 0.00008% (at 2.5 V RMS into 300 Ω) [1], which ASR corroborates as distortion well below audibility across the output range [3]. Manufacturer-specified dynamic range is 127 dB (A-weighted) [1], and crosstalk is −138 dB (at 9 V RMS into 300 Ω) [1]. ASR's measurements confirm frequency response is consistent and well-controlled across all four filter modes at 44.1–192 kHz input, with IMD below the noise floor rather than distortion-limited [3].

One documented limitation is the headphone amplifier's noise floor at low output levels. The manufacturer specifies 1.7 µV A-weighted noise in low gain mode [1]; ASR's measurements rate the HP amplifier noise as elevated compared to competing products at 50 mV output [3], making this a practical concern for sensitive in-ear monitors.

The Hugo M Scaler is a purely digital device with no analog output stage; conventional audio quality metrics (THD, SNR, dynamic range) are not applicable to it. GoldenSound's measurements using an Audio Precision APx555 confirmed the M Scaler's 1,015,808-tap WTA filter achieves over 100 dB stop-band attenuation within 15 Hz of the Nyquist frequency [4] — exceptional filter performance. However, the same measurements found the M Scaler's digital signal quality inferior to software-based upsampling alternatives [4], and no controlled ABX evidence establishes audible improvement from the M Scaler's filter over the TT2's native 98,304-tap filter.

## Technology Level

$$ \Large \text{0.8} $$

The Hugo TT2 employs no off-the-shelf DAC chip; a Xilinx Artix 7 FPGA running 86 parallel 208 MHz cores implements all signal processing — WTA filtering, Pulse Array modulation, and noise-shaping — through code authored entirely by Rob Watts. The TT2's 98,304-tap WTA filter operates at 16× the sample rate in a 10-element design. The M Scaler implements the same algorithm at 1,015,808 taps on a Xilinx XC7A200T with 740 DSP cores; GoldenSound's AP APx555 measurements confirmed exceptional stop-band characteristics [4]. Both products are entirely in-house designs with no OEM involvement.

No competitor has replicated Chord's FPGA-only DAC architecture in the intervening period, establishing genuine long-duration technical differentiation.

These products are seven years old as of this review. The FPGA-only DAC approach has not been commercially adopted by other manufacturers. Technology integration is FPGA with appropriate analog circuitry, without AI or cloud components.

## Cost-Performance

$$ \Large \text{0.0} $$

The Hugo TT2 + Hugo M Scaler combined system is priced at 10,945 USD. The Topping DX5 II, available at 299 USD [5], provides equivalent or superior user-facing functions and measured performance.

The DX5 II provides balanced XLR and RCA line outputs with preamp mode and volume control, USB/optical/coaxial digital inputs supporting 44.1–768 kHz PCM, and balanced headphone outputs including 4.4mm and 4-pin XLR. The Hugo M Scaler's digital upsampling function is replicated at no additional cost by software (SoX, Roon DSP) fully compatible with the DX5 II's native 768 kHz USB input; GoldenSound's AP APx555 measurements found software alternatives produce superior digital signal quality compared to the M Scaler hardware [4]. The DX5 II additionally includes a 10-band parametric EQ and Bluetooth LDAC input not available on the TT2 + M Scaler stack.

Measured performance of the Topping DX5 II versus the Hugo TT2 (DX5 II measurements from Audio Science Review [5]):

- SINAD: DX5 II ≥120 dB (provisional; ASR placed it in the top-20 best USB DACs ever measured, with THD+N <0.00006% implying approximately 124 dB) vs. Hugo TT2 115 dB [3] — better
- THD: DX5 II <0.00006% vs. Hugo TT2 0.00008% [1] — better
- Dynamic Range: DX5 II 133 dB vs. Hugo TT2 127 dB (A-weighted) [1] — better
- Frequency Response: DX5 II rated "perfect filter" by ASR [5] vs. Hugo TT2 "very good" [3] — equal-or-better
- IMD: DX5 II "exceptional" per ASR [5] vs. Hugo TT2 noise-limited per ASR [3] — equivalent-or-better

The DX5 II comparison is marked provisional pending an explicit SINAD numeric publication from ASR, but ASR's measurement-based conclusions leave no ambiguity regarding equivalence. Equipped with equivalent-or-better user-facing functions and confirmed superior measured performance, the Topping DX5 II represents the cheapest available equivalent.

CP = 299 USD / 10,945 USD = 0.0273

Rounded to the first decimal place: 0.0.

## Reliability & Support

$$ \Large \text{0.8} $$

Both products carry 3-year manufacturer warranties, transferable with proof of purchase, with all repair work guaranteed for 6 months following service [1][2]. Chord Electronics publicly states it maintains parts stock sufficient to service products "that are decades old" — placing long-term serviceability well above the typical industry window. A global authorized distributor network covers the Americas, Europe, Asia-Pacific, and the Middle East [1][2].

A documented inrush-limiter hardware failure affected a subset of Hugo TT2 units from a specific production run, attributed to COVID-era supply chain component quality; Chord Electronics resolved affected units by board replacement under warranty, with no new reports surfacing in approximately two years. The M Scaler's bundled BNC cables have widely reported connection quality issues; replacement with aftermarket cables is the standard resolution. The 1–2 second initial track delay on the M Scaler is a design-inherent behavior resulting from the 1M-tap filter buffer fill time, acknowledged by Chord as expected.

No field-updatable FPGA firmware exists for either product. Windows USB drivers are actively maintained, with a 2025 update confirmed available [1].

## Rationality of Design Philosophy

$$ \Large \text{0.5} $$

The Hugo TT2 and M Scaler are built on a solid-state, FPGA-based engineering foundation with filter characteristics confirmed by independent measurement. An FPGA-only DAC without a commodity conversion chip, and a standalone hardware upsampler as a product category, reflect a distinctive engineering direction; however, distinctiveness alone does not support rationality of design philosophy when equivalent-or-better measured performance and functionality are already achievable at lower cost through commodity chip DACs and software upsampling.

Several factors reduce rationality further. Chord makes audibility claims for higher WTA tap counts that have not been verified by controlled ABX testing — neither the TT2's tap-count advantage over conventional filters, nor the M Scaler's 1,015,808-tap filter over the TT2's native 98,304-tap filter, has been demonstrated as perceptible under controlled conditions. Rob Watts has described a "−178 dB noise floor" for the TT2's FPGA implementation; this describes internal computational headroom, not system output performance — the independently measured SINAD at the output is 115 dB [3]. A substantial fraction of the combined 10,945 USD price is absorbed by UK small-batch hand-assembly and CNC aluminum enclosures that do not translate to commensurate gains in measured output performance, given that superior SINAD is achievable at 299 USD. Most concretely, the Hugo M Scaler (5,250 USD) lacks justification as dedicated hardware: its digital FIR upsampling function is fully replicated by free software compatible with any modern DAC accepting 768 kHz USB PCM input, and GoldenSound's measurements confirmed the hardware produces inferior digital signal quality compared to software alternatives [4].

## Advice

The Hugo TT2 delivers genuinely excellent line-output performance — SINAD 115 dB, THD 0.00008%, and dynamic range 127 dB demonstrate that the FPGA-based conversion approach produces real engineering results. The 3-year warranty, long-term parts support, and global distributor coverage are above average for the category.

However, the same measured performance level — and in several key metrics, superior measured performance — is available from the Topping DX5 II at 299 USD, with free software upsampling replicating the M Scaler's function at equal or better digital signal quality. The M Scaler specifically cannot be justified on objective grounds: hardware upsampling at 5,250 USD is outperformed by free software alternatives, adds an audibility claim with no controlled supporting evidence, and contributes to a combined system cost approximately 37× that of an equivalent alternative. Users evaluating the Hugo TT2 standalone face the same fundamental comparison for DAC and line-output performance. Those committed to the Hugo TT2 specifically should note that sensitive IEM users may encounter the elevated HP amplifier noise floor at low output levels.

## References

[1] Chord Electronics — Hugo TT2 Official Product Page — https://chordelectronics.co.uk/product/hugott2 — accessed 2026-06-28

[2] Chord Electronics — Hugo M Scaler Official Product Page — https://chordelectronics.co.uk/product/hugo-mscaler — accessed 2026-06-28

[3] Audio Science Review — CHORD Hugo TT2 Review (DAC & HP Amp) — https://www.audiosciencereview.com/forum/index.php?threads/chord-hugo-tt2-review-dac-hp-amp.36745/ — published 2022-08-24; test conditions: low gain, XLR and RCA outputs, 32Ω and 300Ω loads

[4] GoldenSound — Chord Hugo M-Scaler Measurements and Technical Evaluation — https://goldensound.audio/2022/03/17/chord-hugo-m-scaler-measurements-and-technical-evaluation/ — published 2022-03-17; test equipment: Audio Precision APx555 B-Series

[5] Audio Science Review — Topping DX5 II Balanced DAC and Headphone Amp Review — https://www.audiosciencereview.com/forum/index.php?threads/topping-dx5ii-balanced-dac-and-headphone-amp-review.64264/ — published 2025-07-20; price at review: 299 USD

(2026.7.2)
