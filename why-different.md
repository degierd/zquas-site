# Why the Current Approach Fails

> Banks spend billions on compliance. Detection rates remain below 2%. The architecture is the problem. ZQUAS replaces isolated monitoring with cross-institutional detection.

Source: https://zquas.ai/why-different.html
Site: https://zquas.ai

---
The Architecture Problem


# Why the Current Approach Fails



            Financial crime costs the global economy trillions per year. Banks spend billions on compliance. Detection rates remain below 2%. The architecture is the problem.








Today, every bank fights financial crime alone. Each institution monitors its own transactions, flags its own alerts, and files its own reports. Criminals exploit this by spreading activity across multiple banks. The transfer that looks normal at one bank is part of a laundering chain visible only when you combine the picture across institutions. But combining that picture means sharing customer data, which privacy law prohibits.



This is not a new problem. In the Netherlands, five major banks created TMNL to pool transaction data for joint monitoring. TMNL encountered unresolved legal and proportionality objections. The Dutch data protection authority was critical of population-scale joint monitoring, the Council of State concluded that necessity and proportionality had not been demonstrated for the proposed statutory basis and advised its removal, and the bill carrying that basis was declared controversial after the government fell. With the AMLR applying from 10 July 2027, TMNL is winding down its existing model and redesigning to reconcile with it. The technology concept was sound. The architecture was wrong. Centralising data creates the very privacy problem it tries to solve.



The prototype supports bounded information sharing and signed decision records under the stated trust model.





        Capability Comparison


## What Changes






|
                        Capability |
                        Traditional AML Systems |
                        ZQUAS
|
                            Visibility |
                            Each bank monitors only its own transactions. |
                            Detection runs across all participating institutions.

                            Criminal networks move money between banks. Monitoring one bank means missing the pattern that spans three.
|
                            Data Sharing |
                            Collaboration requires sharing customer data. |
                            The prototype supports bounded information sharing and signed decision records under the stated trust model.

                            The prototype supports bounded information sharing and signed decision records under the stated trust model.
|
                            Detection Model |
                            Static rules tested against historical transactions. |
                            Real-time federated analysis across the network.

                            Suspicious patterns are detected as they form, not months later during a manual investigation.
|
                            Processing Speed |
                            Batch processing. Overnight or hourly cycles. |
                            500K entities under 2 seconds on the fixed synthetic fixture, with about 55K transactions. This is a detection test, not the full product cycle.

                            GPU-native computation evaluates the entire entity population continuously. There is no queue. There is no overnight batch.
|
                            Compliance Assurance |
                            Systems produce logs and reports for auditors. |
                            The prototype supports bounded information sharing and signed decision records under the stated trust model.

                            The prototype supports bounded information sharing and signed decision records under the stated trust model.
|
                            Security Testing |
                            Periodic penetration testing and vulnerability scans. |
                            Continuous adversarial self-testing built into the engine.

                            The system attacks its own detection logic continuously, finding weaknesses before criminals do.
|
                            Knowledge Sharing |
                            Laundering typologies shared slowly via industry reports. |
                            New patterns propagate across the network automatically.

                            When one institution discovers a new laundering tactic, every participating institution benefits immediately.
|
                            Regulatory Audits |
                            Audits rely on documentation and sampling. |
                            Audit evidence is machine-verifiable.

                            The prototype supports bounded information sharing and signed decision records under the stated trust model.
|
                            AI Integration |
                            ML models bolted onto existing rule engines. |
                            AI sits inside the same governance perimeter as the rule engine, with the same audit trail and the same constraints.

                            The prototype supports bounded information sharing and signed decision records under the stated trust model.
|
                            Scalability |
                            Scale by adding servers and databases. |
                            Single GPU: 8 million accounts. Adding banks does not increase processing time.

                            Parallel execution means the system processes 5 banks as fast as 2 banks. Scale is a hardware property, not an infrastructure project.
|
                            Multi-Industry |
                            Separate products for each regulation and sector. |
                            Industry-agnostic governance engine. Financial crime is the first application.

                            The same engine governs any domain where autonomous entities must operate under verifiable rules.
|
                            Philosophy |
                            Each bank fights financial crime alone. |
                            Collective defence across institutions.

                            Criminal networks cooperate globally. The financial system must do the same, without sacrificing privacy.
        Measured, Not Projected


## The Numbers


            **500K**

Entities under 2 seconds in a fixed synthetic test, about 55K transactions. Detection test only.


                <10ms
                per-alert handling after detection, synthetic test

            **Under 1 GB**

Measured detection-pass working set only. Synthetic data. Resident ingestion and model inference excluded.


                TRL 6
                synthetic data, no production deployments




Internal tests on synthetic data. Each figure has a separate scope. Federation timing uses loopback development transport.




        The Regulatory Moment


## July 2027




AMLR Article 75 applies on July 10, 2027. Banks that want to participate in cross-institutional detection must have the infrastructure in place by that date. The European Data Protection Board has identified multi-party computation as an accountability tool for privacy-preserving data processing. The Netherlands Court of Audit (Algemene Rekenkamer) found that current AML controls involve 13,000 FTE and 530,000 annual reports with no measurable insight into effectiveness. The technology to change this exists today.








The difference between monitoring transactions and governing entities is architectural. It cannot be retrofitted.
