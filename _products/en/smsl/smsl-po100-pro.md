---
layout: product
title: "SMSL PO100 PRO Product Review"
target_name: "SMSL PO100 PRO"
company_id: smsl
lang: en
ref: smsl-po100-pro
date: 2026-05-16
rating: [3.2, 0.5, 0.4, 1.0, 0.5, 0.8]
price: 69.99
summary: "Compact XMOS XU316 USB DDC at 69.99 USD with I²S/coaxial/optical outputs, MQA decoding, UAC1/UAC2 switching, native DSD512, and third-party-verified transparent digital conversion."
tags: [DDC, USB-Interface, SPDIF, I2S, MQA, XMOS, SMSL]
permalink: /products/en/smsl-po100-pro/
---

## Overview

The PO100 PRO is a compact, USB-bus-powered Digital-to-Digital Converter (DDC) from SMSL. It accepts a USB Type-C audio input from a host (PC, smartphone, PS4/PS5, Nintendo Switch, TV) and outputs digital audio over I²S (HDMI-LVDS), coaxial S/PDIF, and optical Toslink for feeding an external DAC. The unit is built around the XMOS XU316 USB audio controller and supports PCM up to 32-bit/768 kHz and native DSD512 via I²S, with MQA decoding and a UAC1/UAC2 mode switch for console and mobile compatibility. Despite some retailer titles, the PO100 PRO has no analog output stage and is a digital interface only [1]. It was released in November 2022 and currently retails at 69.99 USD [1][2].

## Scientific Validity

$$ \Large \text{0.5} $$

The PO100 PRO has no analog output stage, so its audible role is limited to passing the digital bitstream into a downstream DAC without introducing degradation. Third-party chain measurements from Audio Science Review (signal routed through the PO100 PRO into a reference DAC) report THD+N of -121.7 dB, frequency response deviation of +0.01/-0.02 dB across 40 Hz–15 kHz, dynamic range of 124.7 dB(A), and a noise floor of -125.2 dB(A); J-Test jitter sidebands were reported at levels deemed inaudible [3]. Manufacturer specifications state typical clock jitter of 75 ps on the official product page [1], and digital-path THD+N of 0.000008% (-141.7 dB) in the user manual without disclosed test conditions [5]. No defects or out-of-spec behavior are confirmed, and the device makes no high-priced audibility claims, so the score reflects an unproblematic baseline appropriate to a basic-price digital interface.

## Technology Level

$$ \Large \text{0.4} $$

The PO100 PRO is an in-house SMSL design assembled almost entirely from standard third-party building blocks: the XMOS XU316 USB audio controller (current-generation but mainstream silicon since 2021), licensed MQA decoding firmware, an industry-standard HDMI-LVDS I²S output, and an undisclosed off-the-shelf clock [1][4]. There are no proprietary patents, no unique circuit work, and nothing that differentiates the product from numerous competing XU316-based DDCs from Topping, Douk, Gustard, and Singxer. The architecture is easy to replicate and many vendors already have, leaving no meaningful competitive moat or know-how that other manufacturers would seek to license. MQA support remains functional but its real-world relevance has declined sharply after Tidal removed MQA in 2024 and MQA Ltd. entered administration in 2023. The in-house design effort earns modest credit, but the commoditized component selection and absence of differentiation pull the technology level below the average mark.

## Cost-Performance

$$ \Large \text{1.0} $$

The PO100 PRO's current market price is 69.99 USD [2]. A search of the USB DDC category from the lowest-priced products upward identified no product priced below 69.99 USD that simultaneously satisfies both requirements: (a) equivalent-or-better measured performance with credible third-party verification, and (b) equivalent-or-better user-facing functions, namely USB-C input; I²S over HDMI-LVDS at 32-bit/768 kHz with native DSD512; coaxial and optical S/PDIF outputs; MQA decoding; and UAC1/UAC2 mode switching. The cheaper SMSL PO100 and PO100 AK have equivalent chain-transparency measurements but lack the I²S high-resolution digital output that is the central purpose of the review target, capping their digital output at 24-bit/192 kHz and DSD64 (DoP). The similarly priced Douk U2 PRO (2025) advertises comparable core I/O on paper but has no third-party measurement data, so it cannot serve as a comparator while the review target has independently verified measurements [3]. Higher-priced equivalents such as the Matrix X-SPDIF 2 sit at roughly 5× the review target's price and offer no cheaper path. Result: CP = 1.0 (no cheaper equivalent-or-better product exists).

## Reliability & Support

$$ \Large \text{0.5} $$

The product carries a 1-year manufacturer warranty for normal-use defects per the official user manual, which is shorter than the typical 2-year period [5]. Construction is mechanically simple: a compact aluminum-shelled, USB-bus-powered, fanless, battery-less SMT assembly with no moving parts, which is inherently resistant to mechanical degradation. Support is primarily routed through authorized dealers (Linsoul, HiFiGo, Apos), with the manufacturer providing drivers, manuals, and firmware through its official site; this is typical dealer-based coverage rather than a unified global manufacturer service system. Firmware updates exist but are released occasionally rather than on a regular cadence, and no separate PO100 PRO-specific firmware entry is currently published. Forum-reported USB drop-outs, MQA mode-switch glitches, and intermittent USB-C host compatibility issues are anecdotal rather than statistical, with no published RMA ratio, MTBF, recall, or service bulletin, so they do not trigger a negative adjustment under an evidence-based standard. The net result lands at the average level.

## Rationality of Design Philosophy

$$ \Large \text{0.8} $$

The PO100 PRO embodies a measurement-first, objectively-specified design with no subjective or nostalgic elements: no vacuum tubes, no R2R ladder, no Class A pretense, and no oversized chassis or "audio-grade" material claims. Costs are directed at functional building blocks (the current-generation XMOS XU316 USB receiver, three digital output paths including HDMI-LVDS I²S, dual UAC1/UAC2 modes, and dual I²S pin-mode switches), while enclosure, aesthetics, and brand premium are minimal and consistent with the 69.99 USD price. The model progression from the original PO100 to the PRO is rational: added I²S over HDMI, expanded PCM/DSD ceilings to 32-bit/768 kHz and DSD512, MQA decoding, and UAC1/UAC2 mode switching, all extending functional capability without irrational cost additions. The dedicated-equipment justification holds because the I²S output and console-friendly UAC1 mode address concrete use cases that a generic USB chain cannot directly serve. The 75 ps typical jitter figure, although marketing-flavored, is consistent with third-party verification of inaudible jitter levels [3]. MQA decoding is a licensed feature rather than a pseudo-science claim, so its diminished real-world relevance does not constitute a philosophical irrationality.

## Advice

The PO100 PRO is a sensible choice for users who own an I²S-input DAC and want a compact USB-to-I²S bridge at native DSD512 and 32-bit/768 kHz PCM, or who need a clean S/PDIF feed from a console (PS5, Nintendo Switch) via UAC1. Third-party chain measurements confirm transparent digital conversion, and there is currently no cheaper option that combines the same digital outputs, MQA decoding, and dual UAC modes [3]. Buyers should weigh the 1-year warranty and the dealer-based support model against the simple, low-failure-mode construction. If the destination DAC already has a competent USB input, adding a DDC offers no measurable audible benefit; the device's value is functional (filling a missing input type, or providing console/mobile compatibility) rather than sonic. MQA decoding should be treated as a legacy feature given Tidal's 2024 removal of MQA support.

## References

[1] SMSL Official Product Page — PO100 Pro — https://www.smsl-audio.com/portal/product/detail/id/808.html — accessed 2026-05-12

[2] TheHiFiCat — SMSL PO100 PRO product listing (USD 69.99) — https://thehificat.com/products/smsl-po100-pro — accessed 2026-05-12

[3] Audio Science Review — VintageFlanker, "S.M.S.L PO100, PO100 PRO & PO100 AK — Measurements (Digital Interfaces & DAC)" — https://www.audiosciencereview.com/forum/index.php?threads/s-m-s-l-po100-po100-pro-po100-ak-measurements-digital-interfaces-dac.40483/ — posted 2022-12-29, accessed 2026-05-12. Test conditions: E1DA Cosmos Grade B ADC, RMAA 6.4.5 PRO, Topping E70 reference DAC; signal routed through PO100 PRO to E70 analog output; frequency response table range 40 Hz–15 kHz.

[4] XMOS — XU316-1024 xcore.ai Datasheet (rev. 2025/01/13) — https://www.xmos.com/download/XU316-1024-xcore_ai-Datasheet(2_0_0).pdf/ — accessed 2026-05-12

[5] SMSL — PO100 PRO User Manual [ZH] — https://www.smsl-audio.com/upload/portal/download/PO100PROManual.pdf — accessed 2026-05-12 (1-year warranty for normal use)

(2026.5.16)
