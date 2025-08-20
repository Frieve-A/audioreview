---
layout: product
title: "Mutec REF10 SE120 Product Review"
target_name: "Mutec REF10 SE120"
company_id: mutec
lang: en
ref: mutec-ref10-se120
date: 2025-08-20
rating: [3.2, 0.5, 0.8, 1.0, 0.7, 0.2]
price: 5499
summary: "Ultra-precision 10MHz reference clock with eight isolated outputs and sub-Hz-optimized phase-noise performance"
tags: [10MHz, Digital Audio, Master Clock, OCXO, Professional, Reference Clock]
permalink: /products/en/mutec-ref10-se120/
---
## Overview

The REF10 SE120 is Mutec’s most ambitious 10 MHz reference clock. It uses a specially selected OCXO and a sub-Hz-optimized power architecture. Key specs published by the manufacturer include phase noise of < −120 dBc/Hz at 1 Hz offset and eight galvanically isolated BNC outputs (2× 50 Ω, 6× 75 Ω). Mutec also highlights a very high slew-rate **square-wave** output intended to improve lock precision versus sine-wave outputs used by many competitors [1][2][3].

## Scientific Validity

$$ \Large \text{0.5} $$

The SE120’s **oscillator** performance (e.g., < −120 dBc/Hz @ 1 Hz) is excellent by manufacturer data [1][2], but controlled evidence that such a 10 MHz reference **improves audible performance or DAC output metrics** in typical one-DAC playback chains remains limited. Many modern DACs use robust jitter-rejection (e.g., Benchmark UltraLock2/3), and their makers state that external jitter devices/clocks have **no positive effect** on the DAC’s clocking; improvements are not expected and can be nil [6]. Pro-audio guidance further notes that external word clocks tend to operate below PLL “jitter-cancellation” corner frequencies, limiting practical benefit in single-device use [7]. Accordingly, we keep the score at a neutral 0.5 until controlled, system-level downstream improvements (THD/SINAD/jitter at DAC output) are demonstrated.

## Technology Level

$$ \Large \text{0.8} $$

Selected SC-cut OCXO with long calibration, sub-Hz-optimized supplies, eight **galvanically isolated** outputs with mixed 50/75 Ω impedances, and a high-slew square-wave output reflect sophisticated engineering beyond commodity 10 MHz boxes [1][2][3]. These are strong, modern design choices, albeit evolutionary rather than fundamentally novel.

## Cost-Performance

$$ \Large \text{1.0} $$

US market price: **5,499 USD** [4]. We looked for cheaper products that **match or exceed** the SE120’s user-facing functions (multiple 10 MHz outputs with 50/75 Ω support) **and** its headline low-offset phase-noise. The closest contender, **Cybershaft OP21A-D** (4 outputs, spec −121 dBc/Hz @ 1 Hz), lists at **6,300 USD**—higher than the SE120 [5]. We did not find any cheaper model with equal or better performance and comparable multi-output capability. Therefore, no cheaper equivalent exists → **CP = 1.0**.

## Reliability & Support

$$ \Large \text{0.7} $$

Mutec has an established pro-audio footprint. Construction, grounding, and I/O choices are robust, and distribution through multiple US dealers implies predictable support. As with all niche reference clocks, service options are narrower than mass-market gear.

## Rationality of Design Philosophy

$$ \Large \text{0.2} $$

Mutec’s own page repeatedly frames the SE120 as delivering **audible sound-quality improvements** for audiophile playback (e.g., “significantly increases the quality of digital music playback,” “noticeable impact on the sonic result”) [1]. In **single-DAC consumer use**, contemporary engineering consensus and manufacturer guidance indicate such claims are not supported: modern DACs’ jitter-rejection typically nullifies benefits from external 10 MHz references [6][7]. While the product remains **rational for multi-device sync** in professional workflows, actively promoting sonic gains for hi-fi listening without controlled downstream evidence is an irrational direction for consumer design; therefore the score is lowered to **0.2**.

## Advice

- **Buy it for sync**: If you must synchronize multiple 10 MHz-capable devices (server/transport, DAC, DDC, network hub), the SE120’s eight isolated outputs and mixed 50/75 Ω support make system design easier.  
- **Check your DAC**: If your DAC employs strong asynchronous clocking/jitter isolation (e.g., UltraLock-style), expect **no measurable benefit** from an external 10 MHz reference in a single-DAC chain [6].  
- **Alternatives**: If four outputs suffice, Cybershaft’s OP21A-D offers comparable published low-offset noise at a **higher** price [5]; rubidium-based options like Aurender MC10 are far more expensive while still providing four 10 MHz outputs [8].  
- **Evidence first**: Prioritize purchases where system-level measurements (DAC output jitter/SINAD) improve under controlled A/B conditions.

## References

[1] Mutec — “REF10 SE120” product page. Accessed 2025-08-19. https://www.mutec-net.com/product_ref10_se120.php  
[2] Mutec — “REF10 SE120 Information Sheet (PDF).” Accessed 2025-08-19. https://www.mutec-net.com/downloads/manuals/MUTEC_REF10_SE120_Infoblatt_E.pdf  
[3] Mutec — “REF10 SE120 Manual (PDF).” Accessed 2025-08-19. https://www.mutec-net.com/downloads/manuals/MUTEC_REF10_SE120_Manual_V1_E_screen.pdf  
[4] Crux Audio — “Mutec REF10 SE120 — 5,499 USD.” Accessed 2025-08-19. https://cruxaudio.com/collections/mutec  
[5] Cybershaft — “OP21A-D Ultra Precision OCXO 10 MHz (4-output) — 6,300 USD, spec −121 dBc/Hz @1 Hz.” Accessed 2025-08-19. https://cybershaft.shop/products/op21a-ultra-precision-ocxo-4-output-10mhz-master-clock  
[6] Benchmark Media — “Inside the DAC2 – Analog Processing.” Statement that external jitter devices do not affect DAC2 clock performance. Accessed 2025-08-19. https://benchmarkmedia.com/blogs/application_notes/149341191-inside-the-dac2-part-1-analog-processing  
[7] Yamaha Pro Audio Micro-Tutorial — “Time is Precious – Where did the external word clock go?” Accessed 2025-08-19. https://in.yamaha.com/en/products/contents/proaudio/training_support/micro_tutorial/20170518/index.html  
[8] Music Direct — “Aurender MC10 Master Clock — 17,600 USD.” Accessed 2025-08-19. https://www.musicdirect.com/equipment/accessories/aurender-mc10-master-clock/

(2025.8.20)

