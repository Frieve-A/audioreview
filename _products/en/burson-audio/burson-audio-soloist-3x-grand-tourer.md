---
layout: product
title: "Burson Audio Soloist 3X Grand Tourer Product Review"
target_name: "Burson Audio Soloist 3X Grand Tourer"
company_id: burson-audio
lang: en
ref: burson-audio-soloist-3x-grand-tourer
date: 2026-06-25
rating: [2.1, 0.7, 0.6, 0.1, 0.5, 0.2]
price: 2499
summary: "A discontinued Class-A desktop headphone amplifier and preamplifier achieving good measured performance (SINAD 100.2 dB at the balanced headphone output), but whose 2,499 USD retail price is difficult to justify given that measurably superior alternatives exist at a fraction of the cost."
tags: [Balanced, Desktop, Headphone amplifier, Preamplifier]
permalink: /products/en/burson-audio-soloist-3x-grand-tourer/
---
## Overview

The Burson Audio Soloist 3X Grand Tourer is a fully balanced desktop headphone amplifier and preamplifier manufactured by Burson Audio of Melbourne, Australia. It served as the company's flagship headphone amplification product from its Q4 2021 introduction until it was discontinued in October 2024 following the announcement of the Soloist GT4 series [5]. The design centers on a symmetrical dual-mono architecture with two independently powered output stages, six user-replaceable proprietary V6 Vivid discrete op-amp modules, and five Max Current Power Supply (MCPS) units [2][6]. The unit draws approximately 74–90 W at idle and requires active cooling via a 120mm Noctua fan [1][2][6]. A 2023 revision updated the internal power supply regulators to Silent Power Modules (SP-01), replacing earlier designs with LT3094 and LT3045 LDOs, as confirmed by component-level teardown [1][2].

## Scientific Validity

$$ \Large \text{0.7} $$

Third-party measurements from Audio Science Review using an E1DA Cosmos ADC show SINAD of 100.2 dB at the 4-pin XLR balanced headphone output and 107.4 dB at the XLR pre-output, with THD+N of 0.0009772% and 0.0004266% respectively [1]. Both outputs demonstrate excellent distortion and noise figures. DC offset measured 0 mV at both headphone outputs [1]. Manufacturer specifications cite SNR of 109–116 dB depending on load impedance and frequency response of ±1 dB from 0 Hz to 48 kHz, neither of which has been independently verified [2][6]. The independently measured SINAD and THD+N values firmly establish strong amplifier performance at both output stages; the absence of independent frequency response verification prevents a higher evaluation.

## Technology Level

$$ \Large \text{0.6} $$

Burson Audio demonstrates credible in-house engineering capability backed by over 20 years of discrete component development. The V6 Vivid discrete op-amp modules represent the sixth generation of a proprietary modular format, offering two-pole compensation schemes unavailable in standard IC form and a user-swappable format with reverse-voltage protection. The MCPS power architecture is a proprietary chained SMPS pre-regulator with ultra-low-noise LDO post-regulators; the 2023 Silent Power Module revision replaced earlier regulator designs with LT3094 and LT3045 LDOs, a change confirmed by internal component examination [1]. The MUSES 72320 digital volume control ICs with discrete buffer stages are an established premium component pairing, and the hardware crossfeed circuit provides genuine functional value [2][6]. However, no confirmed patents exist across any of these technologies. The Class-A bipolar output stage using complementary 2SD2061/2SB1369 transistor pairs is a decades-old topology, and all key technologies were already established by the 2021 launch date. Competing manufacturers produce comparable discrete op-amp module formats, limiting exclusivity. The product contains no digital signal processing, AI, cloud connectivity, or software-defined functionality.

## Cost-Performance

$$ \Large \text{0.1} $$

The Burson Audio Soloist 3X Grand Tourer retails at 2,499 USD [2]. The Topping L70 at 279 USD [3][7] is a lower-cost comparator for the shared balanced headphone-amplifier and line-preamplifier use case, and it shows measurably superior performance on all available shared metrics. The L70 includes balanced 4-pin XLR and 6.35 mm headphone outputs, balanced XLR and unbalanced RCA preamp outputs, remote control, and 12V trigger [3][7]. It does not replicate the Soloist's hardware crossfeed or Head+Sub mode [2][6], so readers requiring those specific functions should treat this comparison as applying to ordinary headphone/preamp operation. Audio Science Review measurements show [1][4]:

- SINAD (balanced headphone output): 120.4 dB (L70) vs. 100.2 dB (Soloist 3X GT) — L70 exceeds by 20.2 dB
- THD+N (balanced headphone output): approximately 0.0000955% (L70, derived from SINAD) vs. 0.0009772% (Soloist 3X GT) — L70 approximately 10× lower

The L70's output impedance below 0.1 Ω [4] vs. the Soloist 3X GT's 0.5 Ω [2] yields a damping factor exceeding 320 at 32 Ω (L70) vs. 64 (Soloist 3X GT).

CP = 279 USD / 2,499 USD = 0.1116

Rounded to first decimal place: 0.1.

## Reliability & Support

$$ \Large \text{0.5} $$

Burson Audio's published support terms state a two-year warranty for completed products, with a one-year extension available for products registered within one month of purchase, and standard back-to-base service [8]. Dealer purchases are governed by local dealership policies [8]. The product was discontinued in October 2024 [5], and no official statement on post-discontinuation parts availability has been published, making long-term repair support uncertain. The Class-A thermal design creates a critical dependency on the 120mm Noctua fan as the primary mechanical wear component, so fan failure is a repair-relevant risk. No official RMA statistics or service bulletins have been published.

## Rationality of Design Philosophy

$$ \Large \text{0.2} $$

The Soloist 3X Grand Tourer is built around Class-A continuous bias for the full rated output range, incurring 74–90 W of idle power dissipation and mandatory active fan cooling in a category where fanless operation is standard. The independently measured SINAD of 100.2 dB at the balanced headphone output is a good result, but the Topping L70 at 279 USD achieves 120.4 dB SINAD at the same balanced headphone output [1][4] — a 20 dB advantage at approximately one-ninth the price. The 5 kg CNC-machined aluminum chassis, eight complementary transistor output pairs, and substantial power infrastructure represent extensive material investment that generates no measurable performance leadership over far less expensive alternatives. The MCPS power supply is a genuine engineering contribution, and the 2023 regulator replacement represents real, evidence-based iterative development as confirmed by teardown [1]. However, claims that V6 Vivid discrete op-amp modules provide audible superiority over premium IC alternatives have not been validated by blind testing or comparative SINAD measurement. The overall design direction prioritizes material-intensive Class-A construction over measured performance efficiency.

## Advice

The Soloist 3X Grand Tourer has been discontinued and is no longer available new at major retailers. At the 2,499 USD retail price, the Topping L70 at 279 USD delivers measurably superior performance across every independently measured metric: SINAD of 120.4 dB vs. 100.2 dB, THD+N approximately 10× lower, and damping factor exceeding 320 vs. 64. Buyers who specifically require maximum output power (10 W balanced at 16 Ω) for the most demanding headphone loads, hardware crossfeed, or the simultaneous headphone-plus-subwoofer output configuration will find functional capabilities in the Soloist 3X GT that the L70 does not replicate. The active cooling fan introduces ongoing mechanical wear risk that should be factored into the ownership cost of any discontinued product. For any use case where the L70's functions are sufficient, it is the superior choice by measured performance at a fraction of the price.

## References

[1] Audio Science Review - "Burson Soloist 3X Grand Tour 2023 – Teardown, personal thoughts and a few measurements" - https://www.audiosciencereview.com/forum/index.php?threads/burson-soloist-3x-grand-tour-2023-teardown-personal-thoughts-and-a-few-measurements.51731/ - accessed 2026-06-21; test equipment: E1DA Cosmos ADC; pre-out measured at 4V RMS XLR; headphone output at low gain

[2] Headphones.com - "Burson Audio Soloist 3x Grand Tourer" - https://headphones.com/products/burson-audio-soloist-3x-grand-tourer - accessed 2026-06-21; retailer page showing regular price 2,499 USD

[3] HiFiGo - "TOPPING L70 Full Balanced NFCA Headphone Amplifier" - https://hifigo.com/products/topping-l70 - accessed 2026-06-21; current price 279 USD

[4] Audio Science Review - "Topping L70 Headphone Amp Review" (Amir Majidimehr, Dec 5 2022) - https://www.audiosciencereview.com/forum/index.php?threads/topping-l70-headphone-amp-review.39767/ - accessed 2026-06-21; SINAD 120.4 dB balanced XLR headphone output; output impedance less than 0.1 Ω

[5] Burson Audio - "Introducing The All-New Burson Audio Grand Tourer Series: Soloist GT4, Conductor GT4 & Timekeeper GT4!" - https://www.bursonaudio.com/post/introducing-the-all-new-burson-audio-grand-tourer-series-soloist-gt4-conductor-gt4-timekeeper-gt4/ - published 2024-10-29; accessed 2026-06-21

[6] Addicted To Audio - "Burson Audio Soloist 3X Grand Tourer headphone amplifier review" - https://addictedtoaudio.com.au/blogs/reviews/burson-audio-soloist-3x-grand-tourer-headphone-amplifier-review - accessed 2026-06-23; documents MCPS architecture, active cooling, Noctua fan, crossfeed, and Head+Sub mode

[7] TOPPING Audio - "L70" - https://www.toppingaudio.com/product-item/l70 - accessed 2026-06-23; official product page for comparator product

[8] Burson Audio - "Return & Warranty Policy" - https://bursonaudio.com/shop/return-warranty-policy/ - accessed 2026-06-23; support terms for completed products, warranty extension, direct purchases, dealer purchases, and back-to-base service

(2026.6.25)
