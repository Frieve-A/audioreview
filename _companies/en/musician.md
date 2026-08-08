---
layout: company
title: "Musician Company Review"
target_name: "Musician"
company_id: musician
lang: en
ref: musician
date: 2026-07-17
rating: [2.7, 0.7, 0.3, 1.0, 0.5, 0.2]
summary: "Musician's current catalog centers on discrete-R2R DACs. Pegasus III and Aquarius publish strong manufacturer specifications, but neither current model has cited independent bench data. Their cost-performance comparison must preserve their complete input-format support, while Musician's own warranty page gives contradictory warranty durations."
tags: [DAC, R2R, Balanced, FPGA]
permalink: /companies/en/musician/
---

## Overview

Musician is an audio-electronics brand whose current catalog emphasizes discrete R2R (resistor-ladder) DACs, together with amplifiers, digital interfaces, a player, and loudspeakers [1]. On 2026-07-17, Aoshida Audio listed 16 current Musician products. The DAC range included Delphinus, Draco III, Pegasus III, Aquarius, and Taurus [1]. The earlier Pegasus and Pegasus II were not in that current catalog and are therefore not used as representative products in this company evaluation.

Construction details vary by model. The current Pegasus III page describes a balanced 24-bit R2R design using 0.1%-tolerance resistors, FPGA control, dual TCXO oscillators, and digital isolators [2][4]. The evidence does not establish one resistor tolerance or one FPGA generation for every current Musician DAC, so the evaluation uses product-specific specifications.

## Scientific Validity

$$ \Large \text{0.7} $$

No cited independent bench measurements apply to either current representative model. Pegasus III is specified by the seller/manufacturer at THD+N below 0.002% (A-weighted), SNR at least 120 dB (A-weighted), dynamic range at least 121 dB, channel-separation magnitude at least 110 dB, and 20 Hz–75 kHz frequency response (+1/−3 dB) [2]. Aquarius is specified at 0.002% THD through XLR and 0.01% through RCA, 128 dB A-weighted XLR SNR, more than 121 dB dynamic range, and −110 dB crosstalk [3].

If reproduced under disclosed, comparable conditions, those figures would indicate low noise and distortion. The cited product pages do not provide a full set of signal-level, load, bandwidth, and weighting conditions, however, and no current-model third-party sweep confirms frequency response, IMD, or unit-to-unit consistency. The 0.7 score therefore reflects the strength of the published numbers while preserving the uncertainty attached to manufacturer-only evidence; measurements of the earlier original Pegasus are not transferred to the current models.

## Technology Level

$$ \Large \text{0.3} $$

Pegasus III combines a discrete balanced R2R ladder, FPGA control, dual TCXO clocking, digital isolation, and a remote-operated digital interface [2]. Aquarius likewise combines discrete conversion with a broad input stage, including USB, AES/EBU, coaxial, and two I2S inputs [3]. This is a coherent specialist implementation, but resistor-ladder conversion, FPGA switching, clock isolation, and linear power supplies are established DAC techniques rather than a newly demonstrated platform.

The cited technical materials provide neither a patent number nor a technical paper that would establish a unique conversion algorithm or a difficult-to-reproduce process. Digital control, clocking, isolation, and analog circuitry are integrated appropriately, but the implementation remains based on mature techniques and does not document a recent technical advance that would be difficult for another DAC manufacturer to reproduce. Musician demonstrates competent integration, but the public evidence does not establish durable technical differentiation.

## Cost-Performance

$$ \Large \text{1.0} $$

Pegasus III and Aquarius are selected as the representative products because both are current and together cover the catalog's central 1,200 USD class and upper-tier 3,000 USD class of discrete-R2R DACs [1][2][3]. No model-level sales mix is public, so each receives a 50% weight rather than assigning unsupported popularity weights.

**Musician Pegasus III — 1,199.99 USD**

The current US market price is 1,199.99 USD [1]. Pegasus III provides USB, optical, coaxial, AES/EBU, one HDMI-format I2S input, RCA/XLR outputs, remote operation, and NOS/OS selection [2][4]. USB and I2S accept up to PCM 1536 kHz and DSD1024, while the other digital inputs accept up to PCM 192 kHz and DSD64 via DoP [4]. Its published performance set is THD+N below 0.002% A-weighted, dynamic range of at least 121 dB, channel-separation magnitude of at least 110 dB, and 20 Hz–75 kHz response at +1/−3 dB [2].

Lower-priced candidates were excluded if they supported only lower PCM/DSD rates or left any relevant function or performance axis unverified. No cheaper currently purchasable finished DAC or compatibility-documented bundle was verified with all of Pegasus III's inputs, outputs, remote operation, format ceilings, and equal-or-better performance. Pegasus III itself is therefore the least expensive fully documented equivalent option. Because its performance figures are manufacturer specifications rather than independent measurements, this conclusion is provisional.

**Musician Aquarius — 3,135 USD**

The current US market price is 3,135 USD [3]. Aquarius provides USB, optical, AES/EBU, coaxial, two HDMI-format I2S inputs, RCA/XLR outputs, and NOS/OS selection [3][5]. USB and I2S accept up to PCM 1536 kHz and DSD1024 [5]. Its published performance set includes 0.002% XLR THD, 0.01% RCA THD, 128 dB A-weighted XLR SNR, more than 121 dB dynamic range, and −110 dB crosstalk [3].

Cheaper single-box and bundled candidates were excluded when two compatible I2S inputs, the remaining digital and analog connections, the supported formats, or one of the relevant performance axes was not fully documented. No cheaper currently purchasable finished DAC or compatibility-documented bundle was verified as equal-or-better on the complete set. Aquarius itself is therefore the least expensive fully documented equivalent option. This conclusion remains provisional because its performance figures are manufacturer specifications rather than independent measurements.

**Company CP (weighted average):**

Using the documented 50%/50% weights:

Company CP = (0.5 × 1.0) + (0.5 × 1.0) = **1.0**

## Reliability & Support

$$ \Large \text{0.5} $$

Musician's own warranty page says that all products have a three-year warranty, but a later non-returnable-products clause describes the warranty as lasting one year [6]. The contradiction prevents either duration from being treated as dependable. The same page documents a 30-day return period, a possible 25% deduction when returned packaging or accessories are incomplete, customer-paid return shipping to a warehouse in China, and paid repair after warranty coverage ends [6]. These terms establish a manufacturer support path but leave the central warranty duration unclear. No RMA-rate, MTBF, regional service-center network, or long-term parts-supply commitment is documented.

## Rationality of Design Philosophy

$$ \Large \text{0.2} $$

Pegasus III is marketed with claims of a more "natural" or "analog-like" presentation and an absence of harshness [2]. The cited page provides no level-matched blind test or current-model independent measurement tying those descriptions to an audible improvement. Its digital isolators, dual TCXO oscillators, and selectable processing modes are concrete design features, but the available evidence does not show that they produce better audible fidelity than a lower-cost, well-measured integrated-DAC design.

Pegasus III's PCM 1536 kHz and DSD1024 support and Aquarius's second I2S input are genuine format and connection functions and are retained in the CP evaluation [4][5]. They are useful only when a buyer has matching source material or transports, however, and neither feature is evidence of more accurate or audibly better digital-to-analog conversion.

The cited Pegasus III and Aquarius pages focus on DAC conversion and source selection and do not document streaming, room correction, parametric EQ, or app-level DSP control [2][3]. Overall, the product direction foregrounds a discrete ladder architecture and subjective sound language without current independent evidence of an audible advantage. Practical connection options and isolation are useful, but the design philosophy remains conservative and only weakly measurement-led.

## Advice

No cited independent bench test verifies Pegasus III or Aquarius, so their strong published THD+N, SNR, dynamic-range, and crosstalk figures should be treated as manufacturer claims rather than confirmed current-model results [2][3]. The original Pegasus's historical measurements are not evidence for either current unit.

Pegasus III's 1.0 CP result means that no cheaper currently purchasable option was verified with its full input/output set, remote, PCM 1536 kHz and DSD1024 support, and equal-or-better performance [2][4]. It does not show that those extreme sample-rate limits improve audibility. Buyers who do not require that complete format and connection set should compare less expensive DACs rather than treating the discrete-R2R implementation as a fidelity requirement.

Aquarius's 1.0 CP result has the same narrow meaning: at 3,135 USD it is the least expensive fully documented current option retaining two I2S inputs, the other cited inputs, RCA/XLR outputs, PCM 1536 kHz and DSD1024 support, and its published performance set [3][5]. It does not mean that Aquarius has better measured conversion than cheaper one-I2S DACs. Buyers who do not need two simultaneous I2S connections can spend much less. Musician's contradictory one-year/three-year warranty wording also warrants obtaining the applicable terms in writing before purchase [6].

## References

[1] Aoshida Audio - Musician product collection (current lineup and US prices) - https://aoshida-audio.com/collections/musician-20 - accessed 2026-07-17

[2] The HiFi Cat - Musician Pegasus III product page (price, functions, and manufacturer specifications) - https://thehificat.com/products/musician-pegasus-iii - accessed 2026-07-17

[3] Aoshida Audio - Musician Aquarius product page (US price, functions, and manufacturer specifications) - https://aoshida-audio.com/products/musician-aquarius - accessed 2026-07-17

[4] Musician Audio - Pegasus III official product page (input-format support and architecture) - http://www.musician-audio.com/en/col.jsp?id=160 - accessed 2026-07-17

[5] Musician Audio - Aquarius official product page (inputs, outputs, and input-format support) - http://www.musician-audio.com/en/col.jsp?id=134 - accessed 2026-07-17

[6] Musician Audio - Warranty & Return Policy - http://www.musician-audio.com/en/col.jsp?id=115 - accessed 2026-07-17

(2026.7.17)
