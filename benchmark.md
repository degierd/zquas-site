# Benchmark: 500,000-Entity Detection Cycle in 667 ms

> Documented GPU benchmark of the ZQUAS engine. 500K entities in under 2 seconds on NVIDIA RTX 5090. Alert lifecycle under 10ms.

Source: https://zquas.ai/benchmark.html
Site: https://zquas.ai

---
Benchmark Study


# 500,000 entities. 56-policy catalogue. 667 ms.



            A documented benchmark of the ZQUAS engine. 667 ms median of three runs for a 500,000-entity full detection cycle against the 56-policy catalogue, enforced under a 2-second regression bound in CI. NVIDIA RTX 5090, CUDA 13.1, Linux. Sustained throughput across that cycle is 750,000 complex events per second, where one unit is one entity evaluated against the full policy set and cryptographic attestation generation sits inside the measured path. Synthetic data throughout. Every decision signed.


        Hardware: NVIDIA RTX 5090 (Blackwell, sm_100, 170 SMs, 32GB VRAM) · CUDA 13.1 · Linux · Synthetic data
        ZQUAS is a member of the NVIDIA Inception program.





## Test Configuration





### Hardware


                    GPU
                    NVIDIA RTX 5090


                    Architecture
                    Blackwell (sm_100)


                    CUDA Cores
                    21,760


                    VRAM
                    32 GB GDDR7


                    Host CPU
                    AMD Ryzen 9 9950X


                    Host RAM
                    64 GB DDR5


                    OS
                    Linux (CUDA 13.1)





### Policy Set


                    Policy catalogue
                    56 logical policies (static-assertion pinned)


                    Scale corpus
                    128 policies (34 screening, 94 detection)


                    Policy language
                    CPL (59-opcode register VM)


                    Evaluation model
                    N entities × M policies (parallel)


                    Termination
                    Guaranteed (forward-only jumps)


                    CPU/GPU agreement
                    Verified (all 59 opcodes)


                    CPL tests
                    288









## What the Throughput Figure Means



The engine sustains 750,000 complex events per second across a full 500,000-entity detection cycle, where one unit is one entity evaluated against the full policy set and cryptographic attestation generation sits inside the measured path. Policy-set size is not used as a multiplier. Merkle root construction and Ed25519 signing sit inside the measured region rather than being excluded. Both choices make the reported figure smaller than the alternatives, and both are deliberate.



The key metric for AML monitoring is not raw throughput but latency from event to triage. An alert that takes 24 hours to reach an analyst is an alert that arrives after the money has moved. A single cold alert completes its local decision path in 7 to 8 ms, against a 10-millisecond bound. Amortised across a batch, the figure is 0.25 ms per alert.



This matters for real-time payment rails. SEPA Instant requires settlement in under 10 seconds. The local decision completes in 7 to 8 ms for a cold alert. The triage decision is available before the settlement window closes.




500,000 entities against the full 56-policy catalogue in 667 ms, with cryptographic attestation generated inside that window.








## Policy Set Composition



The detection cycle runs against a 56-policy logical catalogue, pinned by static assertion to the catalogue array. A 128-policy corpus (34 fail-closed screening, 94 detection) is used for scale characterisation. The catalogue spans these compliance domains:



                01


#### AML Transaction Monitoring



Structuring detection, velocity analysis, counterparty risk, geographic risk



                02


#### Sanctions Screening



Name matching, list-based screening, fuzzy matching thresholds



                03


#### Fraud Detection



Anomaly scoring, device correlation, behavioural deviation



                04


#### KYC/KYB



Customer risk classification, beneficial ownership verification, PEP screening



                05


#### Correspondent Banking



Nested correspondent detection, payment chain analysis, jurisdiction risk



                06


#### Trade-Based Money Laundering



Invoice manipulation, over/under pricing, phantom shipments



                06


#### Regulatory Reporting



SAR trigger conditions, threshold-based filing requirements, cross-domain aggregation





These are representative compliance domains. The specific rules, thresholds, and scenarios are not disclosed. The policy set is designed to reflect the breadth and complexity of a real Tier-1 bank monitoring configuration.






## Results



### Single Node — Entity Evaluation at Scale



                667 ms
                500K-entity full detection cycle, 56-policy catalogue


                750K
                Complex events/sec across the 500K-entity cycle


                < 10ms
                Alert lifecycle: ingestion to triage




            **Local decision latency:** 7 to 8 ms for a single cold alert. 0.25 ms amortised per alert.
                        **Peak VRAM, detection pass working set:** 562 to 616 MB against a 1 GB bound enforced in CI (under 2% of the 32 GB card).
            **Speedup vs. 24h batch:** Millions of times faster than a standard overnight batch cycle.




### Scaling Profile





| 
                    Entity Count | 
                    Policies | 
                    Wall-clock 
| 
                    500,000 | 
                    56 | 
                    667ms 
The 500,000-entity row is the current figure: 667 ms, median of three runs, against the 56-policy catalogue on NVIDIA RTX 5090, CUDA 13.1, Linux, under a 2-second regression bound enforced in CI. The smaller rows are from an earlier run on a different platform with a different timed function. They are not a comparable baseline and no before-and-after comparison should be drawn from them.



### GPU AI Agent System


            **50,000 agents:** 7ms total (kernel 9µs + readback 7.1ms)
            **10,000 agents:** 2.1ms total
            **1,000 agents:** 0.4ms total
            **Constitutional gate:** FILE_SAR → ESCALATE enforced. Agents cannot file SARs autonomously. Human MLRO approval required.



            **Determinism:** Verified. Same policy set, same input data, byte-identical verdicts across multiple runs.
            **Proof generation:** Each evaluation produces a cryptographic proof bundle, Ed25519 signed and Merkle-included, within the measured wall-clock time.
            **Conditions:** The 500,000-entity detection cycle is 667 ms, median of three runs, on NVIDIA RTX 5090, CUDA 13.1, Linux, with the full proof pipeline (Merkle + Ed25519) inside the measured path. Federation is measured on a TCP loopback transport, not a real inter-institution network. Other figures on this page were measured under different harness configurations.







## How It Was Measured



The benchmark uses a standalone governance benchmark harness that measures throughput, latency, determinism, and cryptographic proof generation under controlled conditions.



Transactions are synthetically generated with realistic parameter distributions (amount, currency, jurisdiction, counterparty type, temporal spacing). The generator produces a continuous stream at a rate exceeding the engine's processing capacity to ensure the benchmark measures engine throughput, not data generation throughput.



Timing uses CUDA events for GPU-side measurement, eliminating host-side timing noise. The measurement window excludes startup and warmdown periods. The reported figure is sustained throughput over the measurement window, not a burst or peak.



The benchmark harness is a standalone executable (benchmark runner) that runs independently of the full engine application. It isolates the policy evaluation pipeline: GPU context packet serialisation, kernel dispatch, verdict collection, and epoch commitment. It does not include data ingestion, entity graph updates, or rendering overhead. These subsystems operate concurrently in the full engine but are excluded from the policy evaluation benchmark to measure the adjudication pipeline in isolation.








## Why This Matters for Banks



A Tier-1 bank with 500,000 monitored entities evaluates its full portfolio against the 56-policy catalogue in 667 ms, median of three runs, under a 2-second regression bound enforced in CI. The same operation in overnight batch takes 24 hours.



For real-time payment rails, the relevant number is local decision latency. SEPA Instant requires settlement in under 10 seconds. A single cold alert completes in 7 to 8 ms, against a 10-millisecond bound. The analyst receives an alert with entity context, risk score, cross-institutional signal, and agent recommendation before the payment settles.



Peak VRAM for the detection pass working set is 562 to 616 MB, against a 1 GB bound enforced in CI. The RTX 5090 has 32GB. The vast majority of GPU memory is unused at the benchmark workload. Headroom exists for larger entity populations, simultaneous federation computation, and concurrent agent workloads.




One GPU. 500,000 entities. The full 56-policy catalogue. 667 ms for the complete detection cycle.









## Privacy-Preserving Federation



Federation benchmarks measure cross-institutional detection performance. The protocol is ECDH-PSI (X25519) for entity matching, combined with Yao's Garbled Circuits (Free-XOR) for risk comparison, and IKNP OT Extension (Chou-Orlandi base OT on P-256) for oblivious transfer. Transport is AES-256-GCM with X25519 key exchange. Security model: semi-honest.



At 100,000 entities per party, a bilateral round completes in 3,052 ms over a loopback development transport, against a 10-second bound enforced in continuous integration. No real-network inter-participant measurement exists. Real network conditions add latency, and the production mesh adds its secure-channel layer. Each bilateral round produces dual Ed25519 attestation: both parties sign, and a regulator can verify the result using only the public keys and the proof bundle. No engine access required.



What each bank learns from a federation round: which shared entities exceed the risk threshold. What each bank does not learn: the other bank's entity list (protected by ECDLP), the other bank's risk scores (protected by the garbled circuit), and the other bank's policy configuration (circuit is opaque). Inherent disclosures: entity count and intersection size (structural to PSI; mitigable by padding).



The protocol is exercised under a semi-honest threat model. Protection against a participant that deliberately deviates from the protocol requires malicious-adversary security, which is not implemented for bilateral or multi-party federation.








## Verification



The benchmark is deterministic. Running the benchmark suite with the same policy set on the same hardware produces identical results. The benchmark executable is subject to the same build attestation as the main engine: embedded BLAKE3 and SHA-256 hashes, compiler version, git commit, and Ed25519 signature.



Benchmark results are covered by an automated test suite spanning adversarial fuzzing, semantic graph, compliance policy language, GPU policy evaluation, AI agent triage, federation, UI, GPU resource management, cryptography, and decision pipelines. Crypto KAT tests cover Ed25519 (RFC 8032), SHA-256 (FIPS 180-4), and Blake3 (official vectors). Hardware differences will affect absolute throughput but not determinism or correctness.



Cryptographic proof bundles are independently verifiable. A regulator with the public key can verify any proof bundle offline, without relying on the running production engine or its internal state. Field-level tamper detection tests confirm that any modification to the proof bundle is detectable.







            For benchmark reproduction, detection fidelity details, or technical due diligence: [danny@zquas.ai](mailto:danny@zquas.ai)






            **Three Founding Partner slots available**


12 weeks from signature to results. Joint regulatory sandbox engagement included. No customer data leaves your infrastructure.



            [View Programme](founding-partner.html)
            [Position Paper](article-75.html)
