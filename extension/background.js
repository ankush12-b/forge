chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== 'ENHANCE_PROMPT') return;

  (async () => {
    try {
      const { groqApiKey } = await chrome.storage.sync.get(['groqApiKey']);
      if (!groqApiKey) {
        sendResponse({ ok: false, error: 'No Groq API key set. Click the extension icon to add one.' });
        return;
      }

      const systemPrompt = buildSystemPrompt(msg.platform);

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          temperature: 0.4,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: msg.text }
          ]
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        sendResponse({ ok: false, error: `Groq error (${res.status}): ${errText.slice(0, 200)}` });
        return;
      }

      const data = await res.json();
      const enhanced = data.choices?.[0]?.message?.content?.trim();
      if (!enhanced) {
        sendResponse({ ok: false, error: 'Empty response from Groq.' });
        return;
      }
      sendResponse({ ok: true, enhanced });
    } catch (err) {
      sendResponse({ ok: false, error: String(err) });
    }
  })();

  return true; // keep the message channel open for async sendResponse
});

function buildSystemPrompt(platform) {
  const base = `You are a prompt engineering assistant. Rewrite the user's rough prompt into a clear, well-structured, effective prompt for an AI assistant. 
Rules:
- Preserve the user's original intent and requested language exactly — never change what they're asking for.
- Add missing context, structure, and specificity where it's obviously helpful.
- If the task is complex, suggest a clear format for the answer (steps, sections, etc).
- Do not answer the prompt yourself. Only output the rewritten prompt, nothing else — no preamble, no quotes, no explanation.`;

  const platformNotes = {
    claude: 'Target model: Claude. Claude responds well to clear structure and explicit formatting instructions (e.g. XML-like tags for distinct sections) when the prompt is complex.',
    chatgpt: 'Target model: ChatGPT. Favor concise, direct instructions with markdown formatting (headers, bullet points) for multi-part requests.',
    gemini: 'Target model: Gemini. Favor explicit step-by-step instructions and clearly separated context vs task.'
  };

  return `${base}\n${platformNotes[platform] || ''}`;
}
