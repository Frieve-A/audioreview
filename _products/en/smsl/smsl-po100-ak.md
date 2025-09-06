---
layout: product
title: "SMSL PO100-AK Product Review"
target_name: "SMSL PO100-AK"
company_id: smsl
lang: en
ref: smsl-po100-ak
date: 2025-09-06
rating: [1.7, 0.3, 0.4, 0.2, 0.2, 0.6]
price: 90
summary: "Budget USB DAC with excellent THD+N performance but severely compromised frequency response and poor cost-performance"
tags: [DAC, USB, Portable, AK4493S, XMOS]
permalink: /products/en/smsl-po100-ak/
---

## Overview

The SMSL PO100-AK is a compact USB Digital Interface DAC launched in 2022 at 89.99 USD, featuring the AK4493S DAC chip and XMOS XU316 USB interface. This portable unit supports high-resolution PCM up to 32bit/768kHz, native DSD and DoP decoding, plus MQA support, targeting budget-conscious users seeking digital conversion capabilities. While SMSL has established itself as a measurement-focused manufacturer in the Chinese audio market, the PO100-AK represents both the potential and pitfalls of aggressive price optimization in DAC design.

## Scientific Validity

$$ \Large \text{0.3} $$

Third-party measurements reveal a mixed performance picture. Audio Science Review testing confirms excellent THD+N performance at -116dB, matching manufacturer specifications with consistent left-right channel behavior [1]. The AK4493S implementation demonstrates competent distortion control well within transparent levels. However, the device suffers from a critical frequency response deficiency, exhibiting nearly 5.1dB amplitude loss at 20kHz across both channels, with roll-off beginning at 9kHz [1]. This deviation far exceeds the ±3.0dB problematic threshold established for audio transparency. The unit uses only the AK4493's Slow Roll-Off filter with no user-selectable options, preventing correction of this fundamental limitation. While other specifications including the 75ps jitter claim appear reasonable, the severe frequency response compromise places this product significantly below acceptable scientific validity standards.

## Technology Level

$$ \Large \text{0.4} $$

The PO100-AK employs standard contemporary components without notable innovation. The AK4493S DAC chip represents appropriate but not cutting-edge technology, paired with the industry-standard XMOS XU316 USB interface. The implementation appears to be a straightforward combination of available chipsets without proprietary enhancements or unique design elements. No evidence exists of patent technology adoption, advanced circuit design, or technical differentiation beyond basic component selection. The product demonstrates competent engineering execution within conventional design parameters but lacks the innovation or technical sophistication that would elevate it above average industry implementation levels.

## Cost-Performance

$$ \Large \text{0.2} $$

At 90 USD, the PO100-AK demonstrates exceptionally poor cost-performance when evaluated against equivalent alternatives. The Apple USB-C to 3.5mm adapter at 19 USD provides superior frequency response (flat to 20kHz), excellent output impedance (0.3Ω), and supports high-resolution PCM up to 24bit/48kHz [2]. While lacking the PO100-AK's digital outputs and extended PCM support, the Apple adapter delivers fundamentally superior audio performance where it matters most - transparent frequency response without the severe 5.1dB roll-off at 20kHz that compromises the SMSL unit. For users requiring only analog output with transparent performance, the Apple adapter represents equivalent core functionality at vastly lower cost. The calculation yields CP = 19 USD ÷ 90 USD = 0.2, demonstrating the PO100-AK's fundamental failure to justify its price premium even when accounting for additional digital connectivity features.

## Reliability & Support

$$ \Large \text{0.2} $$

Multiple consumer reports indicate significant warranty support deficiencies, particularly affecting North American customers [3]. Documentation suggests SMSL lacks factory repair facilities in the US, with some distributors providing only 30-day return periods beyond manufacturer warranty. Customer service quality receives criticism for language barriers and inadequate technical support responses. While the product's simple electronic construction suggests reasonable inherent reliability, the support infrastructure limitations and documented customer service problems place this product well below industry average for post-purchase support expectations.

## Rationality of Design Philosophy

$$ \Large \text{0.6} $$

SMSL demonstrates a measurement-focused design philosophy emphasizing scientific approaches to audio engineering. The company's commitment to achieving specific performance targets and responsive engineering support for technical issues reflects rational priorities. However, the PO100-AK's execution reveals compromises that undermine this philosophical foundation. The frequency response limitation suggests insufficient attention to comprehensive performance optimization, while the lack of filter selection options limits user control over critical parameters. Despite sound scientific intentions, the specific implementation demonstrates incomplete realization of measurement-based design principles.

## Advice

The SMSL PO100-AK cannot be recommended due to fundamental frequency response limitations that compromise audio reproduction quality. Users seeking budget DAC solutions should consider the Apple USB-C to 3.5mm adapter at 19 USD, which delivers superior frequency response and transparent performance at a fraction of the cost. For those requiring digital outputs, investing in higher-performance options that maintain flat frequency response is essential rather than accepting critical measurement compromises. The severe cost-performance disadvantage combined with fundamental technical limitations makes alternative selection imperative for informed audio enthusiasts.

## References

1. Audio Science Review, S.M.S.L PO100 AK - Measurements / Round 2 (DAC), https://www.audiosciencereview.com/forum/index.php?threads/s-m-s-l-po100-ak-measurements-round-2-dac.42982/, March 2023, AP analyzer measurements with various test loads and conditions
2. Head-Fi, Apple USB-C to 3.5 mm Headphone Jack Adapter Review, https://www.head-fi.org/showcase/apple-usb-c-to-3-5-mm-headphone-jack-adapter.23420/reviews, accessed September 6, 2025, comprehensive measurements showing 0.3Ω output impedance, 1.4V peak voltage, flat frequency response, 24bit/48kHz support
3. Audio Science Review Forum, What's been your experience with SMSL/Topping reliability & warranty support?, https://www.audiosciencereview.com/forum/index.php?threads/whats-been-your-experience-with-smsl-topping-reliability-warranty-support.32379/, accessed 2025, user experience reports on warranty service quality

(2025.9.6)