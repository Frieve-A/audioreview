---
layout: company
title: "Frieve Company Review"
target_name: "Frieve"
company_id: frieve
lang: en
ref: frieve
date: 2025-08-11
rating: [2.9, 0.5, 0.4, 1.0, 0.4, 0.6]
summary: "Japanese software company developing audio processing applications including EffeTune real-time processor and discontinued Frieve Audio player"
tags: [Audio Software, Real-time Processing, Audio Player, Japanese Developer, Open Source]
permalink: /companies/en/frieve/
---

## Overview

Frieve is a Japanese software company specializing in audio processing applications. The company previously developed Frieve Audio, a high-quality music player optimized for PC playback that supported advanced features like linear phase FIR filtering and room correction. Development of Frieve Audio has ended, with the company now focusing on EffeTune, a real-time audio effect processor available as both web and desktop applications. EffeTune provides frequency response measurement, parametric EQ (up to 15 bands), and multi-channel processing capabilities [1]. Frieve also developed Music Studio, a DAW software with both free and commercial versions.

## Scientific Validity

$$ \Large \text{0.5} $$

EffeTune provides frequency response measurement and parametric EQ correction features that can be verified by measurement workflows. The software recommends operating at a sample rate of 96 kHz or higher for nonlinear effects [1], and includes a professional parametric equalizer with up to 15 fully configurable bands along with a 5-band dynamic EQ [1]. Multi-channel processing and output are supported [1]. However, no independent third-party measurements of internal processing quality (e.g., THD+N, crosstalk, dynamic range) are publicly available. The discontinued Frieve Audio claimed linear phase FIR filtering and room correction, but lacked independent verification of end-to-end audio performance metrics.

## Technology Level

$$ \Large \text{0.4} $$

Frieve's software demonstrates moderate technical implementation with features like linear phase FIR filtering, convolution-style processing, and real-time audio effects. EffeTune's web-based architecture using modern browser technologies represents contemporary development practices. The frequency response measurement and automatic EQ correction generation show practical engineering application. However, the technology level remains at industry standard rather than innovative, utilizing established DSP techniques (e.g., 15-band PEQ, 5-band dynamic EQ, multiband dynamics) without clear advancement over established audio software vendors.

## Cost-Performance

$$ \Large \text{1.0} $$

EffeTune is free (0 USD) on both web and desktop. For equivalent speaker measurement and correction functionality, a relevant comparator is Sonarworks SoundID Reference For Speakers & Headphones, priced at 249 EUR (275 USD) at review time [2]. As no cheaper product with equal-or-better measurement and correction capability is identified and the review target is free, it is the world's cheapest equivalent option; therefore CP = 1.0.

## Reliability & Support

$$ \Large \text{0.4} $$

Frieve has a mixed track record with product continuity, having discontinued their main Frieve Audio product line. EffeTune is actively maintained on GitHub with recent updates including Version 1.61.0 (Aug 2, 2025) [1], indicating ongoing development activity. However, as a small Japanese developer, long-term support and reliability remain uncertain. The open-source nature of EffeTune on GitHub provides some continuity assurance, but formal warranty or enterprise support is not available.

## Rationality of Design Philosophy

$$ \Large \text{0.6} $$

Frieve's current direction with EffeTune is explicitly measurement-driven and rejects audiophile myths ("No audiophile myths, just pure science"), aligning with a software-first approach that minimizes hardware dependency and enables low-cost realization of useful, verifiable functions (frequency response measurement and EQ correction) [1]. This orientation is consistent with rational, science-based sound quality improvement and price disruption through software. However, the lack of published third-party measurements for processing transparency and the past unverified claims around the discontinued Frieve Audio prevent a higher score at this time.

## Advice

Frieve's EffeTune offers a reasonable entry point for users seeking free real-time audio processing with basic room correction capabilities. The frequency response measurement feature provides practical value for speaker setup optimization. However, users requiring professional-grade audio processing with verified performance metrics should consider established alternatives like Acourate, SonarWorks, or similar commercial solutions that provide detailed technical specifications and professional support. The discontinuation of Frieve Audio raises concerns about long-term product commitment.

## References

[1] EffeTune GitHub Repository, https://github.com/Frieve-A/effetune, accessed 2025-08-11, technical specifications and capabilities
[2] SonarWorks SoundID Reference Pricing, https://www.sonarworks.com/soundid-reference/pricing, accessed 2025-08-11, starting price 99 EUR

(2025.8.11)