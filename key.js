/* ============================================================
   Àppats — credencial d'IA d'escaneig (B.ai, compatible OpenAI)
   Aquest fitxer ve INCLOS amb l'aplicació i es publica al repo
   de GitHub: NOMÉS qui té accés al repo el pot canviar.
   Model: mimo-v2.6-flash. L'esforç de raonament ha de ser
   'minimal' per escanejar: amb 'medium' el model es queda
   pensant i torna JSON buit o truncat (mesurat 1/6 vs 6/6).
   ============================================================ */
window.APP_AI={
  key:'sk-5ciak88pxpsycrqizg2tpfdaxxie1zr3',
  base:'https://api.b.ai/v1',
  model:'mimo-v2.6-flash',
  reasoningEffort:'minimal',
  maxTokens:4000
};
