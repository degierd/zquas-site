# Local monitoring: a synthetic walkthrough

> A synthetic example of local transaction monitoring: incoming payments, onward movement, a pattern score, an analyst queue, a signed decision and the bank's decision.

Source: https://zquas.ai/use-case.html
Site: https://zquas.ai

---
Use case · Synthetic walkthrough

# From a local pattern
to a bank decision.

Follow one account through local transaction monitoring. Several payers in, money out within a day, a pattern score, and a decision the bank can check.

TRL 6. Synthetic data only. No production deployments.

[Follow the example ↓](#walkthrough)[Explore the pilot →](founding-partner.html)
**Synthetic throughout.** All people, accounts and payments in this walkthrough are fictional. It illustrates the sequence of work. The local monitor has not yet been measured on the full synthetic worlds. No detection rates or alert counts are claimed here.

1.

Step 01 Synthetic example

## Several payers in

Several synthetic payers send money into the same account. The bank uses the incoming payments recorded in its own journal.

Synthetic example

Payer APayer BPayer C↓Account A

2.

Step 02 Synthetic example

## Money out within a day

In this synthetic example, money is debited out of the account within a day of arriving. The local monitor uses the bank's own records. An outgoing debit is not proof that another bank received it.

Synthetic example

Account A↓Money debited outWithin a day of the incoming payments

3.

Step 03 Synthetic example

## The pattern score

The local monitor scores a funnel or rapid pass-through pattern using the bank's own observations and a frozen calibration. With sufficient history, the score combines movement with context from earlier activity. The score can nominate work for review. It does not establish that a crime occurred.

Synthetic example

ObservedSeveral payers inFollow-upMoney out within a dayOutputLocal pattern score

4.

Step 04 Synthetic example

## The analyst queue

The score can nominate the customer for review. The queue ranks nominations and admits work within the bank's daily analyst-time limit and monthly investigation allowance. This local monitoring step does not hold a payment.

Synthetic example

**Account A**Local pattern nominated for review

Admission depends on rank, the daily analyst-time limit and the monthly allowance.

5.

Step 05 Synthetic example

## The signed decision line

The monitor writes a tm-alert line in the decision log for a new queue entry, an admission or an expiry. Review and refusal decisions carry a proof, and the institution signs the log head. The supervisor can check the record using the institution's public key. This example uses synthetic data and development keys.

Synthetic example

CustomerSynthetic account AEvidenceLocal movement patternRecordtm-alert in the signed decision logKeyDevelopment key

Illustration of the record, not an exported log.

6.

Step 06 Synthetic example

## The bank decides

The analyst examines the bank's own evidence and follows its investigation procedures. The bank decides what action is justified. The synthetic pattern alone does not establish wrongdoing.

Synthetic example

✓**The bank decides**

Its evidence. Its policy. Its decision.

A checkable record

## The decision stays with the bank.

The prototype supports bounded information sharing and signed decision records under the stated trust model.

The check covers the signed record. It does not establish that a transaction is criminal or that an investigation has reached the right conclusion.

Optional network phase

## Start locally. Decide separately about sharing.

The prototype supports bounded information sharing and signed decision records under the stated trust model.

Current federation security is semi-honest: it assumes participants follow the protocol. The network adds reviews, never automatic holds.

One pilot offer

## 12 weeks locally. A network phase by agreement.

Start with local transaction monitoring on your institution's own data and infrastructure. Review the results before deciding whether to explore an optional network phase.

[See the pilot scope and what your team needs →](founding-partner.html)

The next step

## Explore a local pilot.

12 weeks inside your institution. An optional network phase follows only by agreement.

[Discuss your pilot ↗](contact.html?audience=banks)
