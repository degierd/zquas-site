# MPC and GDPR: The Question No Authority Has Answered

> No EU data protection authority has ruled on the status of MPC protocol messages. Obtaining a formal assessment from a national data protection authority is a stated objective, not an accomplished fact. Here is what is settled and what is not.

Source: https://zquas.ai/article-edpb-mpc-gdpr-accountability.html
Site: https://zquas.ai

---
[← Articles](articles.html)
        February 2026 · Privacy · 8 min read


# MPC and GDPR: The Question No Authority Has Answered



When banks discuss collaborative AML, the first objection is always GDPR. No EU data protection authority has ruled on the status of MPC protocol messages. Obtaining a formal assessment from a national data protection authority is a stated objective, not an accomplished fact. What follows separates what is settled from what is not.







## What Has and Has Not Been Decided



            No EU data protection authority has ruled on whether MPC protocol messages constitute personal data, and none has assessed this architecture. Published European data protection material describes multi-party computation as a privacy-enhancing technique, but description is not a determination and no such material addresses the ZQUAS design. Nothing here should be read as approval or endorsement by any authority.




            The technical description is not contested: MPC transforms inputs into values that are computationally indistinguishable from random and that are discarded once the computation completes. Whether those values are personal data in the hands of a recipient is precisely the open question. MPC does not transmit customer records between institutions. It transmits intermediate cryptographic values derived from that data, values that carry no intelligible information about individuals and are discarded once the computation completes.




            The output of an MPC computation, such as a cross-institutional risk signal indicating that a specific entity has elevated risk at multiple banks, is generated from the inputs without any institution ever holding or transmitting another institution's raw data. The intelligence is derived. The source data stays put.




## Data Minimisation Under Article 5(1)(c)



            GDPR Article 5(1)(c) requires that personal data be "adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed." Applied to collaborative AML, this means that the sharing of customer transaction data between banks must be limited to what is strictly necessary to achieve the detection objective.




            Conventional data sharing fails this test when applied broadly. Sharing transaction records, even pseudonymised, provides far more personal data than is necessary to generate a cross-institutional risk signal. The risk signal is what the compliance analyst needs. The underlying transaction detail is not.




            The argument that MPC satisfies Article 5(1)(c) is that the output, the risk intelligence, is generated without transmitting the input. It is an argument, not a ruling. The counter-argument deserves equal weight: the receiving institution has learned a new fact about its customer that could only have been produced using the counterparty's information, and a supervisor could reasonably hold that what matters is the information learned rather than the bytes transmitted.




## Pseudonymous, Not Anonymous



            Legal teams should assume the conservative position. Treat MPC intermediate values as pseudonymous rather than anonymous. Assume GDPR applies to the processing. The regulation is not disapplied simply because the data takes a cryptographic form during computation.




            The distinction matters for DPIAs. A Data Protection Impact Assessment for an MPC-based collaborative AML system must address the residual privacy risks. MPC is a technical safeguard that goes beyond basic pseudonymisation. It is not an exemption from GDPR obligations, and no authority has characterised it as one. Controllers remain accountable. Records of processing must be maintained. Data subject rights still apply to the underlying personal data held within each institution.




            For practical purposes, the residual risk is substantially lower than in conventional sharing arrangements. An institution receiving MPC-derived risk signals holds no additional personal data about the other institution's customers. The risk of re-identification, data breach, or misuse at the receiving institution is materially reduced.




## Legal Basis: AMLR Article 75 and GDPR Article 6(1)(c)



            MPC satisfies the technical requirements. The legal basis question requires separate analysis. GDPR Article 6(1)(c) permits processing that is "necessary for compliance with a legal obligation to which the controller is subject." AMLR Article 75 (Regulation 2024/1624), applying from July 10, 2027, provides that legal obligation for banks participating in information-sharing partnerships.




            Article 75 itself mandates pseudonymisation as a required safeguard under Article 75(4)(f). MPC delivers protection beyond that requirement. Whether the threshold output constitutes information sharing for Article 75 purposes is unresolved and goes to the competent authorities. DPOs drafting DPIAs should document both the argument and its counter-argument rather than assume the question is closed.




## Purpose Limitation



            GDPR Article 5(1)(b) requires that personal data be collected for specified, explicit, and legitimate purposes and not further processed in a manner incompatible with those purposes. Data collected for a business relationship, a bank account, a payment service, cannot automatically be processed for collaborative AML analytics.




            AMLR Article 75 provides the statutory compatibility that resolves this tension. AML/CFT monitoring is a legal obligation for banks. Processing customer data for AML purposes is compatible with the original collection purpose because the legal framework requires it. AMLR Article 75 makes the partnership-based sharing a specific extension of that obligation. The purpose limitation concern does not disappear, but it is answered by the statutory framework.




## Record Retention and the Right to Erasure



            AMLR requires five-year retention of AML records under Article 77. GDPR Article 17 grants data subjects the right to erasure. These two obligations are in tension for AML data. The resolution is well-established in EU law. Article 17(3)(b) GDPR carves out erasure obligations where processing is necessary for compliance with a legal obligation. The five-year AML retention period qualifies.




            After the retention period expires, the obligation reverses. Data that has served its AML retention purpose must be deleted or fully anonymised. Banks operating MPC-based collaborative monitoring must build this into their data lifecycle management. The cross-institutional risk signals generated by MPC are derived data. Their retention period and deletion requirements must be documented separately from the underlying transaction records.




## What This Means for Legal Teams



            The GDPR is not automatically a barrier to collaborative AML. It is a framework that demands specific technical safeguards and a documented legal basis. The legal analysis is not settled: whether MPC protocol traffic constitutes personal data processing, and whether the threshold output constitutes information sharing under Article 75, are open questions. Obtaining a formal assessment from a national data protection authority is a stated objective of the regulatory engagement programme.




            DPOs and legal teams should not wait for the July 2027 application date to begin DPIA work. Article 75 partnerships require documented legal analysis before go-live. The technical design determines much of that analysis. Banks that engage with the technical architecture now will have the DPIA documentation ready when the regulation applies.



            Danny de Gier

                Founder, ZQUAS. 18+ years in financial crime compliance at Tier-1 banks and fintechs.
                Professional Postgraduate Diploma in Financial Crime Compliance (ICA / University of Manchester).
