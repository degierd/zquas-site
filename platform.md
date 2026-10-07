# The ZQUAS platform: a governance engine for automated decisions

> ZQUAS applies an institution's rules to decisions made by automated systems and AI agents, at GPU speed, with proofs a supervisor can verify. Financial crime first.

Source: https://zquas.ai/platform.html
Site: https://zquas.ai

---
The platform


# A governance engine for decisions made by machines.



        ZQUAS applies an institution's rules to decisions made by automated systems and AI agents. It runs on GPUs. Alerts carry proofs that a supervisor can verify. Financial crime is the first use. Other industries come next.



        What the engine is


## Rules, limits and proofs



The prototype supports bounded information sharing and signed decision records under the stated trust model.





### Rules



Policies are written as code and applied the same way every time. The same policy on the same data gives the same verdict.





### Limits



The institution sets how many payments or decisions may be held or reviewed. The engine stays inside them.





### Proofs



Alerts carry proofs that a supervisor can verify with a public key and a standalone tool. The verifier is written by ZQUAS and currently links the CUDA runtime. A CPU-only verifier is planned.






        Measured on the engine


## Four measured figures



            These internal test results have different workloads and measurement boundaries. Read each figure with its scope.




                500,000 entities under 2 seconds
                Detection on a fixed fixture


500K entities under 2 seconds on the fixed synthetic fixture, with about 55K transactions. This is a detection test, not the full product cycle. Every entity is evaluated, not sampled. Method on the [benchmark page](benchmark.html).



                Alert lifecycle under 10 ms
                Per-alert handling after detection


Alert lifecycle under 10 ms per alert, from a detection result to a persisted, queryable alert. Batch results are amortised per alert.



                Federation round under 10 seconds
                Bilateral round between two institutions


Federation bilateral round under 10 seconds on TCP loopback development transport. Semi-honest security. This does not measure a real inter-bank network.



                GPU memory under 1 GB
                Detection pass working set


VRAM under 1 GB in the measured detection-pass working set after warm-up. Resident ingestion and model inference are excluded. This is not total-system memory. The regression gate is 1 GiB.





Methodology per figure on the [benchmark page](benchmark.html).




        Why it is general


## The same three needs across industries



            Decisions made by automated systems and AI agents need the same three things across industries: rules, limits and a record of why. The engine keeps those apart from the domain. A domain supplies its entities, its events and its policies. The engine supplies GPU evaluation, limits, federation between institutions and proofs.





        Where we start


## Financial crime first. Other industries next.



            Financial crime is where ZQUAS starts. Our measured results are on scam payments and mule accounts, on synthetic data. Money laundering detection follows. Other industries come after, where automated decisions need rules, limits and an audit trail.





        Position today


## TRL 6, on synthetic data



            TRL 6 means an integrated prototype demonstrated in a controlled relevant environment. All validation is on synthetic data. There are no production deployments and no live counterparty data. Security is semi-honest only. Protection against a participant that deliberately deviates from the protocol needs malicious-adversary security, which is not implemented for bilateral or multi-party federation.





        Next step


## Talk to us


            [Talk to us](contact.html)
            [Technical overview](technology.html)
            [Benchmark](benchmark.html)
