# Engine benchmarks and their limits

> Four scoped engine figures on synthetic data: detection, per-alert lifecycle, a loopback federation round and detection-pass GPU memory. Internal test evidence.

Source: https://zquas.ai/benchmark.html
Site: https://zquas.ai

---
Engine evidence · Synthetic data

# Four figures.
The scope of each.

These are internal engine test results with separate workloads and timing boundaries. They are not production performance guarantees or real-world detection rates.

TRL 6. Synthetic data only. No production deployments.

## Read each figure with its limits.

500K

### Entities under 2 seconds

500K entities under 2 seconds on the fixed synthetic fixture, with about 55K transactions. This is a detection test, not the full product cycle.

Synthetic data

Under 10 ms

### Alert lifecycle, per alert

Alert lifecycle under 10 ms per alert, from a detection result to a persisted, queryable alert. Batch results are amortised per alert.

Synthetic data

Under 10 seconds

### Federation bilateral round

Federation bilateral round under 10 seconds on TCP loopback development transport. Semi-honest security. This does not measure a real inter-bank network.

Synthetic data

Under 1 GB

### Measured detection-pass VRAM

VRAM under 1 GB in the measured detection-pass working set after warm-up. Resident ingestion and model inference are excluded. This is not total-system memory.

Synthetic data

## What the tests establish.

01

### Detection on a fixed fixture

The 500K test evaluates the full entity population on a synthetic fixture with about 55K transactions, after a warm-up. It times the detection cycle and verdict anchoring. It excludes the full product cycle with resident ingestion, persistence and model inference. Entity count alone does not establish performance on a denser workload.

02

### Alert handling after detection

The alert test creates, persists and queries alert records. Its bound is per alert. A batch can take longer in total, and the figure does not include the preceding detection cycle.

03

### A development federation round

The bilateral benchmark uses synthetic participant data over TCP loopback. Network latency and the secure transport used between separate institutions need their own measurement. The privacy model is semi-honest, not protection against a participant that deliberately deviates.

04

### One GPU working set

The memory result covers the measured detection pass after GPU context warm-up. It excludes the resident ingestion plane and model inference. The regression gate is 1 GiB, while the recorded detection-pass working set is below 1 GB. It must not be read as a cap on the complete application.

Verification

## Internal evidence, with an explicit boundary.

These results come from our own tests. They are not an external audit. Hardware and workload affect timings.

Every decision is signed, and the supervisor can verify it with a published check (synthetic data, development keys).

The performance statements were checked against the F1_ENGINE test definitions, claim register and retained run reports on 7 October 2026. The relevant tests are DetectionCycleThemis.Latency_500K_FullCycle, AlertLifecycleLatency, ThreeBankTMNL.RealisticScaleBenchmarkIknp and DetectionPeakVram.HardCap_500K_4M_UnderBound.

One pilot offer

## 12 weeks locally. A network phase by agreement.

Start with local transaction monitoring on your institution's own data and infrastructure. Review the results before deciding whether to explore an optional network phase.

[See the pilot scope and what your team needs →](founding-partner.html)

The next step

## Explore a local pilot.

12 weeks inside your institution. An optional network phase follows only by agreement.

[Discuss your pilot ↗](contact.html?audience=banks)
