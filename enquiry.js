(() => {
  'use strict';
  const recipient = 'danny@zquas.ai';
  const audiences = {
    banks: {
      ending: 'your pilot.', lede: 'Start with the question your team wants to answer.',
      title: 'Explore a pilot for your institution.',
      description: 'Tell me what your team wants to investigate. We can discuss your use case, the evidence and what a pilot would need.',
      topics: [['Your use case', 'The payments, accounts or scam patterns you want to investigate.'], ['The evidence', 'Results on synthetic data, and the questions they leave open.'], ['A possible pilot', "Your team's requirements and what you would want to evaluate."]],
      subject: 'ZQUAS pilot enquiry: bank or payment firm',
      body: "Hi Danny,\n\nI'd like to discuss a ZQUAS pilot for our bank or payment firm.\n\nOrganisation:\nMy role:\nThe question we'd like to explore:"
    },
    exchanges: {
      ending: 'your pilot.', lede: 'Start with the question your exchange wants to answer.',
      title: 'Explore a pilot for your exchange.',
      description: 'Tell me what your team wants to investigate. We can discuss crypto withdrawals, the evidence and what a pilot would need.',
      topics: [['Your use case', 'The crypto withdrawals or scam patterns you want to investigate.'], ['The evidence', 'Results will be published when the test is complete.'], ['A possible pilot', "Your team's requirements and what you would want to evaluate."]],
      subject: 'ZQUAS pilot enquiry: crypto exchange',
      body: "Hi Danny,\n\nI'd like to discuss a ZQUAS pilot for our crypto exchange.\n\nOrganisation:\nMy role:\nThe question we'd like to explore:"
    },
    investors: {
      ending: 'what comes next.', lede: 'A direct conversation about ZQUAS and your interest.',
      title: 'Discuss investment or a partnership.',
      description: 'Tell me a little about your organisation and your interest in ZQUAS. We can discuss the evidence, current development and your questions.',
      topics: [['Your interest', 'Your investment focus or the partnership you have in mind.'], ['The evidence', 'Measured results on synthetic data and the current limits.'], ['The next conversation', 'The technical or commercial questions you would like to explore.']],
      subject: 'ZQUAS: investment or partnership enquiry',
      body: "Hi Danny,\n\nI'd like to discuss ZQUAS from an investment or partnership perspective.\n\nOrganisation:\nMy role:\nOur interest and questions:"
    }
  };
  const buttons = [...document.querySelectorAll('[data-audience]')];
  const subject = document.querySelector('#email-subject');
  const body = document.querySelector('#email-body');
  const status = document.querySelector('#copy-status');
  const drafts = new Map();
  let selected;

  function updateLink() {
    const message = body.value.replace(/\r?\n/g, '\r\n');
    document.querySelector('#open-email').href = `mailto:${recipient}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(message)}`;
    status.textContent = '';
  }
  function selectAudience(key, updateUrl = true) {
    if (!Object.hasOwn(audiences, key)) key = 'banks';
    if (selected) drafts.set(selected, {subject: subject.value, body: body.value});
    selected = key;
    const item = audiences[key];
    buttons.forEach(button => {
      const active = button.dataset.audience === key;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    document.querySelector('#audience-panel').setAttribute('aria-labelledby', `tab-${key}`);
    for (const [id, text] of [['hero-ending', item.ending], ['hero-description', item.lede], ['context-title', item.title], ['context-description', item.description]]) document.getElementById(id).textContent = text;
    item.topics.forEach(([title, description], i) => {
      document.getElementById(`topic-${i+1}-title`).textContent = title;
      document.getElementById(`topic-${i+1}-description`).textContent = description;
    });
    const draft = drafts.get(key) || item;
    subject.value = draft.subject;
    body.value = draft.body;
    updateLink();
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('audience', key);
      history.replaceState(null, '', url);
    }
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => selectAudience(button.dataset.audience));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        buttons[next].focus();
        selectAudience(buttons[next].dataset.audience);
      }
    });
  });
  subject.addEventListener('input', updateLink);
  body.addEventListener('input', updateLink);
  document.querySelector('#copy-email').addEventListener('click', async () => {
    const text = `To: ${recipient}\nSubject: ${subject.value}\n\n${body.value}`;
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = 'Email copied. Paste it into your email app.';
    } catch {
      body.focus(); body.select();
      status.textContent = 'Select and copy the draft. Email it to danny@zquas.ai.';
    }
  });
  selectAudience(new URLSearchParams(location.search).get('audience'), false);
})();
