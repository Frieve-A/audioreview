---
layout: product
title: "Aoshida Dilvpoetry DAC DT-1 Product Review"
target_name: "Aoshida Dilvpoetry DAC DT-1"
company_id: aoshida
lang: en
ref: aoshida-aoshida-dilvpoetry-dac-dt-1
date: 2026-07-05
rating: [2.2, 0.6, 0.2, 0.9, 0.4, 0.1]
price: 219
summary: "A hybrid tube/solid-state desktop DAC and headphone amplifier with Bluetooth, balanced output, and multiple digital inputs. The headphone amplifier's solid-state path measures reasonably well in key metrics, but the vacuum tube stage measurably degrades all performance indicators, every core technology is an outdated commodity component, and a FiiO K11 plus 1Mii B06Ultra Bluetooth receiver bundle delivers better measured DAC/headphone-amp performance with comparable Bluetooth connectivity at 202.98 USD versus this product's 219 USD."
tags: [DAC, Headphone Amplifier, Desktop, Bluetooth, Balanced Output, Tube Hybrid]
permalink: /products/en/aoshida-aoshida-dilvpoetry-dac-dt-1/
---

## Overview

The Dilvpoetry DAC DT-1 is a desktop DAC and headphone amplifier co-produced by Dilvpoetry (Shenzhen Dilvshi Electronic Technology Co., Ltd.) and distributed exclusively by Aoshida Audio (Shenzhen Aoshida Electronic Technology Co., Ltd.). Released in early 2022 and priced at 219 USD, it is the flagship model in the Dilvpoetry lineup. The unit provides USB-B, optical (Toslink), coaxial (RCA), and Bluetooth 5.0 digital inputs; balanced 4.4mm TRRRS and single-ended 6.35mm headphone outputs; and RCA line output. A switchable 6N3 dual-triode vacuum tube buffer stage can be engaged or bypassed remotely. Supported Bluetooth codecs include aptX HD, aptX, aptX Low Latency, LDAC, AAC, and SBC. A remote control is included [1].

## Scientific Validity

$$ \Large \text{0.6} $$

Third-party bench measurements from AVMENTOR show the headphone amplifier in solid-state (opamp) mode delivers good distortion performance: THD of 0.004% at 1kHz into 32Ω and crosstalk of −85 dB at 10kHz [2]. A-weighted noise in the headphone amplifier measures −93 dBr(A) at one-third maximum power into 32Ω—an acceptable SNR for a desktop headphone amplifier. Frequency response in opamp mode is flat within the audible band, with roll-off appearing only above 60kHz [2].

The DAC line output performs less strongly: AVMENTOR measures line output THD of approximately 0.03%—notably higher than the headphone amplifier path—and the noise floor reaches approximately −100 dBFS in opamp mode, which is acceptable but below the best-performing products in this category [2].

Activating the tube stage measurably degrades every measured metric: DAC output noise rises from 62.7 µVrms to 90.4 µVrms, the noise floor worsens from approximately −100 dBFS to approximately −90 dBFS, frequency response shows −1 dB at 20 Hz, and THD+N at 20 Hz reaches approximately 0.1% [2].

The manufacturer specifies frequency response of 10 Hz–40 kHz (±0.3 dB), THD of 0.0006%, and SNR of ≥117 dB [1]. These figures are unverified by independent measurement; AVMENTOR's measured headphone amplifier THD of 0.004%–0.007% is substantially higher than the stated 0.0006%, and the manufacturer test conditions are not disclosed [2].

## Technology Level

$$ \Large \text{0.2} $$

According to Aoshida's published component list, the DT-1 is built around commodity off-the-shelf parts: an ESS ES9038Q2M DAC, XMOS XU208 USB receiver, Texas Instruments TPA6120A2 headphone amplifier ICs, OPA1656 op-amps, Qualcomm CSR8675 Bluetooth SoC, and a 6N3 tube stage [1]. These are established audio components rather than proprietary architecture or current platform integration, and the design shows no evidence of in-house patents, novel DSP/software integration, or a technical barrier that would be difficult for another manufacturer to replicate.

The product is a brand co-production with no documented proprietary or patented technology. The 6N3 dual-triode tube stage is legacy vacuum tube technology; AVMENTOR's measurements confirm it degrades the noise floor and increases THD relative to the solid-state bypass path under tested conditions [2], providing no performance benefit. As of 2026, the DT-1's architecture remains a conventional assembly of commodity digital, analog, Bluetooth, and tube blocks rather than a differentiated technical platform.

## Cost-Performance

$$ \Large \text{0.9} $$

The DT-1 is priced at 219 USD [1]. The comparison basis is a FiiO K11 (CS43198 version) at 142.99 USD plus a 1Mii B06Ultra Bluetooth receiver at the regular 59.99 USD price, for 202.98 USD total [4][5]. The B06Ultra normalizes the DT-1's integrated Bluetooth function with Bluetooth 5.3, LDAC, aptX HD, aptX Low Latency, AAC, SBC, and optical/coaxial/AUX outputs [5]. The FiiO K11 provides USB, optical, and coaxial digital inputs, balanced 4.4mm and single-ended 6.35mm headphone outputs, and RCA line output, matching the DT-1's core audio connectivity after Bluetooth normalization [3][4][5].

Pragmatic Audio's third-party measurements and FiiO's manufacturer specifications support the following comparison [3][4]:

- SINAD (headphone amp, balanced 4.4mm): 97 dB (K11) vs. approximately 87 dB estimated for the DT-1 (derived from AVMENTOR's measured THD of 0.004% and noise of −93 dBr(A) in opamp mode)
- THD+N (line output): 0.00035% (K11) vs. approximately 0.03% (DT-1)
- SINAD (line output): 108.57 dB (K11) vs. approximately −100 dBFS noise floor (DT-1, opamp mode)
- Frequency response: manufacturer spec within 0.2 dB from 20 Hz–50 kHz for K11 headphone outputs [4], equivalent to the DT-1's opamp-mode performance
- Crosstalk: manufacturer spec ≥106 dB for K11 balanced headphone output and ≥120 dB for line output [4] vs. AVMENTOR's measured −85 dB at 10 kHz for the DT-1 headphone output [2]

CP = 202.98 USD / 219 USD = 0.927

## Reliability & Support

$$ \Large \text{0.4} $$

Aoshida Audio provides manufacturer-direct global support via an online ticket system, with a documented response within 48 hours and out-of-warranty paid maintenance service available [1]. However, the warranty covers only 1 year, below the 2-year industry average.

The hybrid design introduces structural reliability concerns. Aoshida describes the 6N3 tubes as freely replaceable [1], which also means consumable tube hardware remains part of ownership. AVMENTOR describes the internal construction as disciplined and industrial-quality [2], but exposed tubes and additional socket/contact surfaces create more mechanical wear points than a purely solid-state DAC/amplifier. No publicly available statistical failure-rate, MTBF, or DT-1 firmware update history was found.

## Rationality of Design Philosophy

$$ \Large \text{0.1} $$

The DT-1's design is explicitly built around adding subjective tube coloring to a digital audio signal. The manufacturer's marketing for the 6N3 tube stage relies entirely on subjective language—described as "soft, mellow and sweet, especially suitable for vocals, strings, light music, classical music"—with no scientific evidence, no ABX blind-test data, and no measurement-based substantiation of audible benefit [1]. AVMENTOR's lab data confirms the tube stage raises DAC output noise from 62.7 µVrms to 90.4 µVrms and increases THD in every measured condition relative to the solid-state bypass path [2]. The tube stage adds bill-of-materials cost and mechanical complexity while measurably degrading the signal path.

By the product's early-2022 market availability, solid-state desktop DAC/amplifier alternatives at comparable or lower prices offered measurably superior noise floors and distortion figures, making the tube-stage approach irrational from a fidelity standpoint from the outset. The overall design relies entirely on commodity components without novel circuit architecture, DSP integration, or software-based signal processing. Manufacturer claims of "high-end DSD decoder" and "fever-grade audio dedicated electronic tube" are unsupported by the available measurement record [1].

## Advice

The DT-1's solid-state signal path produces measurably good headphone amplifier distortion and crosstalk performance, but the vacuum tube stage—the product's central selling point—degrades every measured metric relative to bypassing it. Users seeking a desktop DAC and headphone amplifier with Bluetooth, balanced output, and multiple digital inputs can obtain substantially better measured DAC/headphone-amp performance at lower cost: the FiiO K11 plus 1Mii B06Ultra bundle delivers a headphone SINAD of 97 dB (balanced 4.4mm), line output THD+N of 0.00035%, and comparable Bluetooth codec coverage at 202.98 USD total, versus this product's 219 USD [3][4][5]. The 1-year warranty and vacuum tube component lifespan add further long-term risk. The DT-1 is appropriate only for users who specifically want the visual and tactile presence of exposed vacuum tubes and are prepared to accept the associated measured performance trade-offs; from a fidelity standpoint, better-value alternatives are readily available.

## References

[1] Aoshida Audio - Dilvpoetry DAC DT-1 Official Product Page and Warranty Policy - https://aoshida-audio.com/products/dilvpoetry-dac-dt-1 ; https://aoshida-audio.com/pages/warranty-policy - Accessed 2026-07-05 - Product price/specifications: 219 USD, chip list, 6N3 tube stage, frequency response/THD/SNR; warranty: one-year duration and response within 48 hours

[2] AVMENTOR - Aoshida Dilvpoetry DAC DT-1 Lab Evaluation - https://avmentor.net/reviews/2022/aoshida_dilvpoetry_dac_dt1_2.shtml - Accessed 2026-07-05 - Test conditions: 32Ω/600Ω load, 2Vrms input, 1kHz test tone, A-weighted noise measurement

[3] Pragmatic Audio - FiiO K11 Review - https://www.pragmaticaudio.com/reviews/2023/11/fiio-k11/ - Accessed 2026-07-05 - Third-party measurements: SINAD balanced 97 dB, SE 104.5 dB, line output SINAD 108.57 dB, line output THD+N 0.00035%

[4] FiiO / Amazon.com - FiiO K11 Official Parameters and Amazon Product Page - https://www.fiio.com/k11_parameters ; https://www.amazon.com/FiiO-K11-Headphone-Amplifier-Balanced/dp/B0CJFG3DC7 - Accessed 2026-07-05 - Manufacturer specs: USB/optical/coaxial inputs, 4.4mm/6.35mm headphone outputs, RCA line-out, crosstalk ≥106 dB (4.4mm) and ≥120 dB (RCA); representative Amazon new price: 142.99 USD

[5] Amazon.com - 1Mii B06Ultra Bluetooth Receiver Product Page - https://www.amazon.com/1Mii-B06Ultra-Bluetooth-Receiver-Audiophile/dp/B0CF12LGPS - Accessed 2026-07-05 - Regular price: 59.99 USD; Bluetooth receiver with LDAC, aptX HD/Low Latency, AAC, SBC, optical/coaxial/AUX outputs

(2026.7.5)
