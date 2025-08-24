---
layout: product
title: "Loxjie D20 Product Review"
target_name: "Loxjie D20"
company_id: loxjie
lang: en
ref: loxjie-d20
date: 2025-08-24
rating: [2.7, 0.6, 0.5, 0.8, 0.4, 0.4]
price: 240
summary: "Desktop DAC/headphone amplifier with AK4497; third-party measurements show THD+N at the transparent threshold but modest overall SINAD and a high-impedance headphone stage."
tags: [AK4497, DAC, Desktop, Headphone amplifier]
permalink: /products/en/loxjie-d20/
---
## Overview

The Loxjie D20 is a desktop digital-to-analog converter and headphone amplifier using AKM’s AK4497EQ DAC. It supports PCM up to 32-bit/768 kHz and DSD512, and provides USB, optical, and coaxial inputs with both line and headphone outputs. An OLED display shows format information and a remote control is included.

## Scientific Validity

$$ \Large \text{0.6} $$

Independent measurements report a **SINAD around 83 dB** at typical test level (≈2.83 V), corresponding to **THD+N ≈ 0.008%**; this **meets the 0.01% THD+N “transparent” threshold** but indicates higher overall noise/distortion than modern transparent DACs. The **headphone output impedance ≈ 21 Ω** is substantially above best practice and will cause frequency-response variance with many low/medium-impedance headphones and multi-driver IEMs. Reducing output level to 1 V improves SINAD only to about **90 dB**, still short of transparent-level S/N performance. These data imply that **line-out can be audibly transparent by THD+N**, while the **headphone stage is measurably compromised**. [1]

## Technology Level

$$ \Large \text{0.5} $$

The AK4497EQ and XMOS USB implementation are competent but not cutting-edge. The design adds a discrete transistor headphone driver and a toroidal power transformer in a machined aluminum chassis. However, measured performance suggests implementation challenges limit the chip’s potential rather than any architectural constraint. Format support is comprehensive (PCM 768 kHz / DSD512).

## Cost-Performance

$$ \Large \text{0.8} $$

**Comparator (cheapest equal-or-better): TOPPING DX3 Pro+ — 199 USD (regular price).**  
Functions: USB/optical/coax DAC, line-out, integrated headphone amp (Bluetooth extra).  
Performance: transparent-class measured output and low headphone output impedance. [2][3]

**CP calculation:** 199 USD ÷ 240 USD = **0.83 → 0.8** (rounded).  
Given the DX3 Pro+ delivers equal or better user-facing functions and superior measured results at a lower regular price, the D20’s cost-performance is limited.

## Reliability & Support

$$ \Large \text{0.4} $$

Loxjie is a younger brand with less global service infrastructure. Construction is solid, but broad, long-term reliability data are limited. Distribution is primarily online; warranty/support pathways are less established than major competitors.

## Rationality of Design Philosophy

$$ \Large \text{0.4} $$

Effort was invested in enclosure, power supply, and a discrete headphone stage, but these choices do not translate into superior measured transparency. The high output impedance of the headphone section runs counter to engineering best practices for load control. Overall, the direction does not efficiently advance transparent reproduction.

## Advice

As a **pure DAC line-out**, the D20 can be effectively transparent by THD+N, but its **overall noise (SINAD)** and **headphone stage** are well behind current best practice. At **240 USD**, stronger all-in-one options exist that add features and improve measurements. Prefer the **TOPPING DX3 Pro+** for a drop-in DAC/amp replacement with optical/coax inputs and transparent-class results. If you specifically need only a DAC, many standalone DACs at 150–200 USD achieve superior transparency.

## References

[1] Audio Science Review, “Review and Measurements of LOXJIE D20 DAC and Headphone Amp”, https://www.audiosciencereview.com/forum/index.php?threads/review-and-measurements-of-loxjie-d20-dac-and-headphone-amp.6011/, accessed 2025-08-24.  
[2] Apos Audio, “TOPPING DX3 Pro+ Bluetooth DAC/Amp”, https://apos.audio/products/topping-dx3-pro-plus-bluetooth-dac-amp, accessed 2025-08-24.  
[3] Audio Science Review, “Topping DX3 Pro+ Review (DAC & Headphone Amp)”, https://www.audiosciencereview.com/forum/index.php?threads/topping-dx3-pro-review-dac-headphone-amp.27148/, accessed 2025-08-24.

(2025.8.24)

