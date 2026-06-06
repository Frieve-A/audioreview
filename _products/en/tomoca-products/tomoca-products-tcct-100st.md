---
layout: product
title: "TOMOCA Products TCCT-100ST Product Review"
target_name: "TOMOCA Products TCCT-100ST"
company_id: tomoca-products
lang: en
ref: tomoca-products-tcct-100st
date: 2026-06-06
rating: [2.7, 0.5, 0.3, 1.0, 0.6, 0.3]
price: 612.55
summary: "Professional passive stereo fader with built-in transformer isolation for broadcast and studio use. The design is conservative and lacks device-level measurements, but no lower-priced confirmed equivalent was identified for the integrated stereo fader, transformer isolation, and deep attenuation range."
tags: [Attenuator, Balanced XLR, Broadcast, Fader, Professional, Studio, Transformer]
permalink: /products/en/tomoca-products-tcct-100st/
---
## Overview

The TOMOCA Products TCCT-100ST is a professional passive stereo fader box with built-in transformer isolation, manufactured by TOMOCA Electric Co., Ltd. (トモカ電気株式会社), a Tokyo-based professional broadcast and PA equipment company. The unit provides continuously variable level attenuation via a 100 mm stroke fader, with four NEUTRIK NTL1 1:1 audio transformers at both input and output stages providing galvanic isolation between source and destination. Balanced XLR connectivity (Neutrik NC3 High-End series) and 10 kΩ balanced impedance accommodate professional line-level signal chains. The device is fully passive, requiring no power supply, with a maximum input level of +19 dBu and an insertion loss of approximately 2.2 dB at the open fader position [1]. The current retail price is approximately 613 USD in Japan [2].

## Scientific Validity

$$ \Large \text{0.5} $$

No third-party device-level measurements or manufacturer audio performance specifications are publicly available for the TCCT-100ST as an assembled unit, making objective scientific evaluation impossible with current data.

## Technology Level

$$ \Large \text{0.3} $$

The TCCT-100ST is an in-house TOMOCA design, but all functional signal-path components — four NEUTRIK NTL1 audio transformers [3], a conductive plastic linear fader, and Neutrik NC3 High-End XLR connectors — are standard off-the-shelf catalog parts freely available to any manufacturer [1]. The transformer-coupled balanced fader topology was established in professional broadcast equipment from the 1950s–1970s and represents mature, stable technology. The signal path is entirely analog and mechanical, containing no digital or software elements. Independent third-party measurements of the NTL1 transformer document a notable distortion increase at low frequencies, confirming the inherent physical constraints of transformer-based audio designs [4]. Any competitor can replicate equivalent functionality using the same Neutrik components without licensing barriers, and no proprietary patents or unique technical know-how differentiate this implementation.

## Cost-Performance

$$ \Large \text{1.0} $$

The current retail price is approximately 613 USD in Japan [2]. The equivalence requirement is not merely "passive XLR level control"; it must include stereo balanced XLR input/output, transformer-based galvanic isolation, passive operation, continuously variable stereo control, and a deep attenuation range comparable to the TCCT-100ST's fader ∞ specification of -90 dB or below [1].

The Radial LX-2 is a lower-cost transformer-based passive line-level device, and two units would provide two channels at 559.98 USD using the Dale Pro Audio price of 279.99 USD each [5][6]. However, it is not an equivalent comparison target: each LX-2 is a mono line splitter rather than an integrated stereo fader, and its level control is a set-and-forget trim control for limited attenuation, not a 100 mm stereo fader with 0 to ∞ style operational range [5]. Lower-priced passive monitor controllers lack transformer isolation. Therefore no lower-priced product with equivalent-or-better confirmed user-facing functions was identified, so the TCCT-100ST is treated as the cheapest confirmed equivalent option; CP = 1.0.

## Reliability & Support

$$ \Large \text{0.6} $$

The fully passive signal path — a single fader, four transformers, and XLR connectors with no active electronics or power supply — is inherently resistant to failure [1]. No warranty period is publicly documented by TOMOCA or its authorized distributors. Support is available directly through TOMOCA Electric and authorized Japanese distributors [2], but coverage is Japan-only with no international distribution network. No hardware failures, recalls, or service bulletins have been identified; the product appears in professional rental inventories, consistent with adequate durability in demanding broadcast and live sound environments. All key components (NEUTRIK NTL1 transformers, NC3 connectors) are commercially available standard parts, facilitating repairability.

## Rationality of Design Philosophy

$$ \Large \text{0.3} $$

Transformer-based galvanic isolation addresses a genuine, measurable function — ground loop rejection — and the core functional premise is technically sound. However, throughout the plausible development period of this product, active balanced line drivers and passive resistive alternatives with demonstrably lower THD across the full audio frequency range were commercially mature and available at substantially lower cost. Independent measurements of the NTL1 transformer confirm significant distortion increase at low frequencies [4], a measurable limitation absent from modern active circuit alternatives. No documented successor models demonstrate performance progression for this product line. The design direction is technically functional but represents a static, conventional approach with no evidence of advancement toward improved measured performance.

## Advice

The TCCT-100ST fulfills one specific professional requirement: a single integrated unit providing balanced transformer isolation with continuously variable level control in a broadcast-compatible form factor. If transformer galvanic isolation, deep attenuation, and a self-contained stereo fader are confirmed technical necessities, this product performs its stated function and no lower-priced confirmed equivalent was identified. However, the price of approximately 613 USD is substantial for a fully passive device whose assembled signal-path audio performance specifications are not publicly documented. Buyers for whom transformer isolation or 0 to ∞ style fader operation is not a strict requirement would be better served by passive resistive attenuators, line isolators, or active balanced alternatives at lower cost. Those who do require transformer isolation should be aware that the NTL1 transformer exhibits measurably increased THD at bass frequencies [4], which may be relevant in low-frequency-critical monitoring or recording applications.

## References

[1] TOMOCA Electric Co., Ltd. - TCCT-100ST Official Product Page - https://www.tomoca.co.jp/brand/tomoca-p/top-audiof/tcct-100st/ - Accessed 2026-05-30
[2] RIZING - TOMOCA TCCT-100ST Product Listing - https://rizing.co.jp/?pid=154971974 - Accessed 2026-05-30; retail price 93,033 Japanese yen (tax included)
[3] Neutrik - NTL1 Transformer Datasheet (PDF) - https://www.neutrik.com/media/9750/download/specifications-ntl1-ntm1-ntm4.pdf?v=1 - Accessed 2026-05-30; 600Ω source/load test conditions
[4] akustik-messen.de - Small signal transformer Neutrik NTL-1 (APx555 measurement) - https://www.akustik-messen.de/index.php/en/background-information/audio-precision-apx555/selected-measurements-in-our-lab-with-the-apx555-from-audio-precision/small-signal-transformer-neutrik-ntl-1 - Accessed 2026-05-30; APx555 analyzer, NTL1 transformer component
[5] Radial Engineering - LX-2 Specifications - https://www.radialeng.com/product/lx-2/specifications - Accessed 2026-06-07; manufacturer specifications: passive transformer-based line splitter, 1 channel, 20 Hz-20 kHz +/-0.5 dB, THD <0.001% at 1 kHz, dynamic range 140 dB, maximum input +21 dBu
[6] Dale Pro Audio - Radial Engineering LX-2 Passive Line Splitter with Jensen Transformer - https://daleproaudio.com/products/radial-engineering-lx-2-passive-line-splitter-with-jensen-transformer - Accessed 2026-06-07; listed price 279.99 USD

(2026.6.6)
