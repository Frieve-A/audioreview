---
layout: product
title: "Akizuki Denshi Tsusho USB Audio DA Converter Kit Rev-C Product Review"
target_name: "Akizuki Denshi Tsusho USB Audio DA Converter Kit Rev-C"
company_id: akizuki-denshi-tsusho
lang: en
ref: akizuki-denshi-tsusho-usb-audio-da-converter-kit-rev-c
date: 2025-10-02
rating: [2.1, 0.5, 0.2, 0.6, 0.6, 0.2]
price: 18
summary: "Educational DIY USB DAC kit using outdated PCM2704 chip with inferior cost-performance compared to modern ready-made alternatives"
tags: [USB DAC, DIY Kit, PCM2704, Akizuki]
permalink: /products/en/akizuki-denshi-tsusho-usb-audio-da-converter-kit-rev-c/
---

## Overview

The Akizuki Denshi Tsusho USB Audio DA Converter Kit Rev-C is a DIY electronics kit featuring the Texas Instruments PCM2704 DAC chip. Released in 2012, this kit requires soldering assembly and targets hobbyist and educational markets. The kit provides USB Audio Class compliant functionality with RCA analog output, S/PDIF digital output, and USB bus power operation. At 18 USD, it represents an outdated approach to USB DAC implementation that has been superseded by superior commercial alternatives offering better performance at lower cost.

## Scientific Validity

$$ \Large \text{0.5} $$

The PCM2704 chip specifications show mixed measured performance. Frequency response achieves excellent ±0.04dB pass-band ripple, exceeding transparent levels. However, S/N ratio and dynamic range at 98dB fall between problematic (80-90dB) and transparent (105dB) levels per measurement criteria. THD performance varies significantly with load impedance: excellent 0.006% at high impedance loads but degraded 0.025% at typical 32-ohm headphone loads. The 16-bit/48kHz maximum resolution limitation represents significant constraint compared to modern high-resolution standards. Third-party user reports [1] indicate carrier frequency noise filtering issues requiring additional low-pass filter implementation for optimal performance. As manufacturer specifications rather than third-party measurements, conservative evaluation adjustment applied.

## Technology Level

$$ \Large \text{0.2} $$

The kit utilizes the PCM2704, a 16-bit delta-sigma DAC from 2012 representing outdated technology approach. While Akizuki's PCB design demonstrates competent layout with separated digital and analog ground planes and customizable analog section, the core chip selection reflects conservative approach using superseded components. Modern alternatives like Cirrus CS43131 or CX31993 provide superior performance, higher resolution support, and better integration. The kit lacks modern digital features, advanced oversampling, or contemporary connectivity options. The technology offers no competitive advantage and would take minimal time for competitors to replicate or exceed using current-generation components.

## Cost-Performance

$$ \Large \text{0.6} $$

This site evaluates based solely on functionality and measured performance values, without considering driver types or configurations. At 18 USD current market price, the kit faces strong competition from superior ready-made alternatives. The Apple USB-C to 3.5mm adapter at 9.99 USD offers equivalent-or-better functionality with 113dB S/N ratio, lower distortion, and immediate usability without assembly requirements [2]. CP = 9.99 USD ÷ 18 USD = 0.6. The comparison target is equipped with USB DAC functionality and analog output, with S/N ratio and distortion performance equivalent-or-better than the review target. The kit's DIY format adds complexity and potential assembly failure modes without corresponding performance benefits over current commercial alternatives offering superior specifications at significantly lower cost.

## Reliability & Support

$$ \Large \text{0.6} $$

Akizuki Denshi Tsusho operates as established Japanese electronics distributor since 1978, providing reliable track record in hobbyist and educational markets [3]. The simple PCB design with few moving parts offers inherently good reliability potential. However, the DIY assembly requirement introduces user error risks and potential assembly-related failure modes that wouldn't exist in factory-assembled products. The kit targets educational market with typical dealer-based support rather than manufacturer warranty coverage. Component availability and basic replacement parts remain accessible through standard electronic component channels.

## Rationality of Design Philosophy

$$ \Large \text{0.2} $$

The design philosophy reflects educational and hobbyist market focus rather than optimal audio performance pursuit. While costs directly contribute to circuit function, the underlying technology choice represents conservative approach using superseded components without evidence of advancement since 2012. The DIY format presents questionable value proposition when superior ready-made alternatives exist at lower cost. The kit utilizes outdated PCM2704 technology from 2012 without adoption of modern improvements or cutting-edge features. This conservative approach without innovation fails to provide justification for existence as dedicated audio equipment when general-purpose alternatives achieve superior functions and measured performance.

## Advice

This kit serves educational purposes for electronics hobbyists interested in DIY audio projects and circuit assembly experience. However, for practical audio applications, superior alternatives exist at lower cost with better measured performance and immediate usability. The Apple USB-C adapter or similar modern dongles provide significantly better price-performance ratio. Consider this kit only if primary goal is learning electronics assembly rather than achieving optimal audio performance. For pure audio quality pursuit, investment in commercial DACs or high-quality headphones provides better cost-effectiveness.

## References

[1] Bokuraku, "Akizuki DAC Review - Performance Assessment," https://bokuraku.com/aki-dac-review/, accessed 2025-10-02, carrier frequency noise filtering analysis with 40kHz cutoff filter implementation (note: pricing information may be outdated; refer to official source for current pricing)
[2] Audio Science Review, "Review: Apple vs Google USB-C Headphone Adapters," https://www.audiosciencereview.com/forum/index.php?threads/review-apple-vs-google-usb-c-headphone-adapters.5541/, December 2018, CS46L06 measurements: 98dB SINAD, 113dB SNR
[3] Akizuki Denshi Tsusho, "USB Audio DA Converter Kit Rev-C Product Page," https://akizukidenshi.com/catalog/g/gK-05369/, accessed 2025-10-02, official specifications and kit details

(2025.10.2)