---
layout: product
title: "Klippel Near Field Scanner 3D Product Review"
target_name: "Klippel Near Field Scanner 3D"
company_id: klippel
lang: en
ref: klippel-near-field-scanner-3d
date: 2026-07-17
rating: [4.3, 0.7, 1.0, 1.0, 0.6, 1.0]
price: 114085.18
summary: "Patented robotic near-field holography system for automated direct-sound and directivity measurement without an anechoic chamber; its advertised room-separation workflow requires separately priced software, analyzer, microphone, and amplifier components."
tags: [Professional, Pro Audio, Germany, Reference]
permalink: /products/en/klippel-near-field-scanner-3d/
---
## Overview

The Klippel Near Field Scanner 3D (NFS), hardware model C8 Near Field Scanner, is a professional robotic acoustic-measurement system from Klippel GmbH [1]. It scans a stationary device under test in three dimensions and reconstructs near-field, far-field, directivity, and sound-power data through acoustical holography. Klippel specifies angular resolution below 1 degree, support for stationary devices under 500 kg, and a standard 3D scan time below 20 minutes for a typical two-way loudspeaker [1]. The advertised ordinary-room direct-sound workflow requires the scanner, KA3 analyzer, TRF module, NFS software, measurement microphone, power amplifier, and Direct Sound Separation license [1][2].

## Scientific Validity

$$ \Large \text{0.7} $$

The NFS is a measurement system, so the relevant scientific question is whether its reconstructed acoustic field accurately represents the device under test. Klippel specifies typical level accuracy of ±0.1 dB in the maximum-SPL direction and ±1 dB in all directions under its typical 1 kHz sinusoidal, 94 dB SPL conditions [8]. With Direct Sound Separation, the stated system bandwidth is 10 Hz-20 kHz in both anechoic and non-anechoic environments; without it, the standard non-anechoic lower limit is 2 kHz. The document notes that the system does not compensate microphone directivity and recommends a small 1/4-inch capsule where high-frequency polar accuracy matters [8].

The manufacturer's validation images were also inspected. A line-array comparison uses a 16,000-point, 7 m anechoic reference and a 4,000-point NFS near-field scan extrapolated to 7 m: the 1 kHz and 5 kHz balloon plots are visually close, with the stated difference more than 20 dB below the main lobe [8]. At 2.5 kHz, the polar curves align closely in front, while larger rear differences occur roughly 30 dB below on-axis level. The on-axis curves broadly overlap from the bass through 20 kHz, with a visible difference near 20 Hz that Klippel attributes to a reference-chamber room mode. These are manufacturer tests rather than independent replication, and confidence intervals, unit variation, and third-party system-error measurements remain unavailable. The quantitative accuracy, bandwidth, and reference comparison support a good result, but the lack of independent verification limits the score.

## Technology Level

$$ \Large \text{1.0} $$

The NFS combines in-house robotic hardware with proprietary near-field acoustical holography, field-separation, and field-extrapolation software. Klippel identifies patent protection in Germany, the United States, and China, including DE102013000684, US 9,584,939 B2, and CN 201410079512.1 [1]. Direct Sound Separation estimates direct and reflected components below the reflection-free frequency, while near-to-far extrapolation derives far-field directivity and sound power from the scan [1]. Integrating precision multi-axis motion, measurement electronics, spatial reconstruction, visualization, and standardized directivity output is difficult for a new entrant to reproduce, and the patented algorithms create an additional barrier. The original patent work is mature, but active software releases continued through 2026 [7], and no technically superior replacement for this complete workflow was identified. The combination of patent-backed originality, in-house ownership, accumulated electroacoustic know-how, and sustained hardware-software integration supports the maximum score.

## Cost-Performance

$$ \Large \text{1.0} $$

Klippel's price list effective 2026-06-01 places the minimum published-component subtotal for the ordinary-room direct-sound configuration at 99,490 EUR net, EXW [2]. This comprises the NFS carousel (53,800 EUR), required TRF module (1,310 EUR), NFS Basic (10,890 EUR), Direct Sound Separation (23,960 EUR), KA3 SX analyzer (6,420 EUR), Mic 301E 48V set (1,960 EUR), and the lowest listed power-amplifier candidate, SL900 (1,150 EUR). At the ECB reference rate for 2026-07-16, this is 114,085.18 USD [3]. A PC, cables, tax, duty, freight, and support are additional, so buyers need a configuration-specific quotation.

The 66,000 EUR hardware-and-Basic subtotal contains only the carousel, TRF, and NFS Basic. Basic includes Robotics, Visualization, Comparison, and Field Identification; the Direct Sound Separation function required for the claimed ordinary-room direct-sound workflow is a separate license [2]. Lower-cost gated rotation rigs do not provide the same reflection separation and holographic near-to-far reconstruction, while no lower-priced finished commercial system was confirmed to combine automated full-space scanning, sub-degree output, stationary-DUT capacity below 500 kg, ordinary-room direct-sound separation, the stated 10 Hz-20 kHz bandwidth, and ±1 dB all-direction level accuracy. The NFS configuration is therefore the cheapest confirmed option with equivalent-or-better functions and documented performance, so Cost-Performance is 1.0.

## Reliability & Support

$$ \Large \text{0.6} $$

Klippel's 2026 standard business terms set a one-year limitation period for material-defect claims [6]. Manufacturer-direct support is available, while hardware repair and calibration require return to Germany or calibration through selected distributors [4]. Software released within three months of a software purchase is available without an update fee; continued updates and prompt assistance thereafter require a paid annual support agreement, and Klippel may decline support without one [4][5]. Releases continued through 2026 [7]. The precision multi-axis scanner has moving hardware, but no model-specific RMA, MTBF, repair-turnaround, or independent long-term failure-rate data is published. The short defect-claim period and mechanical complexity are balanced by direct support and continuing software maintenance.

## Rationality of Design Philosophy

$$ \Large \text{1.0} $$

Klippel's NFS design is measurement-focused and evidence-based, integrating controlled robotic movement, electrical and acoustic acquisition, holographic processing, field separation, visualization, and standardized output in one workflow [1]. Spending is directed toward precision scanning hardware, measurement electronics, and reconstruction software rather than decorative materials. Field separation addresses a concrete limitation of ordinary-room measurements by distinguishing direct sound from reflected sound, while near-to-far extrapolation replaces many large anechoic-facility measurements with a repeatable automated process. This combination of proprietary algorithms, robotics, software, and objective output is an innovative, scientifically relevant use of specialized audio equipment, with no reliance on subjective or non-audio claims.

## Advice

The NFS suits loudspeaker and transducer manufacturers, acoustic R&D laboratories, and measurement organizations that need automated full-space directivity and sound-power data without a large anechoic chamber. The 66,000 EUR scanner-and-Basic subtotal does not include the Direct Sound Separation license, KA3 analyzer, microphone, or power amplifier required for the workflow described here. Buyers should obtain a configuration-specific quotation covering those components, PC and cabling needs, freight, tax, and annual support. The available accuracy specifications and validation graphs are manufacturer-generated rather than independently replicated, so laboratories with strict uncertainty requirements should request calibration, repeatability, and reference-comparison data before purchase.

## References

[1] Klippel — Near Field Scanner System (NFS) — https://www.klippel.de/products/rd-system/modules/nfs-near-field-scanner.html — accessed 2026-07-17; manufacturer specifications, requirements, patents, and Direct Sound Separation graph visually inspected

[2] Klippel — Klippel Analyzer System Price List, effective 2026-06-01 — https://www.klippel.de/fileadmin/klippel/Bilder/allgemein/Preisliste%20aktuell/KLIPPEL%20Analyzer%20System%20Price%20List.pdf — accessed 2026-07-17; official net/EXW EUR prices; NFS and software entries on page 4 and microphone entry visually inspected

[3] European Central Bank — Euro foreign exchange reference rates — https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html — accessed 2026-07-17; 2026-07-16 rate: 1 EUR = 1.1467 USD

[4] Klippel — Product Support — https://www.klippel.de/support/product-support.html — accessed 2026-07-17; manufacturer support, repair, and calibration information

[5] Klippel — Prices + Terms — https://www.klippel.de/support/prices-terms.html — accessed 2026-07-17; software-update and support-agreement terms

[6] Klippel — Standard Business Terms 2026 — https://www.klippel.de/fileadmin/klippel/Files/Support/Klippel_Standard_business-terms_2026.pdf — accessed 2026-07-17; material-defect claim limitation period

[7] Klippel — New software update available: dB-Lab 212 / QC 7 — https://www.klippel.de/service/news/newsdetails/article/new-software-update-available-db-lab-212-qc-7.html — accessed 2026-07-17; 2026 software-release evidence

[8] Klippel — C8 Near Field Scanner System — https://www.klippel.de/fileadmin/klippel/Bilder/Our_Products/R-D_System/PDF/C8%20Near%20Field%20Scanner%20System.pdf — accessed 2026-07-17; pages 8, 35, and 36 visually inspected; manufacturer accuracy, bandwidth, microphone limitation, and anechoic-reference validation conditions

(2026.7.17)
