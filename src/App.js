import { useState, useEffect } from "react";

const reminders = [
  { text: "הדרך שלך לא נראית כמו של אף אחד אחר. זאת לא תקלה - זה הפיצ'ר.", sub: "יאלה - דבר טוב שקרה לך היום!", gratitude: false },
  { text: "את מביאה אור, כיף ושמחה לכל מקום שאת נכנסת אליו. גם כשאת לא שמה לב.", sub: "אנשים מרגישים את זה. גם אם לא תמיד אומרים.", gratitude: false },
  { text: "לא הכל בשליטתך. וזה, באופן מפתיע, חדשות טובות.", sub: "פחות אחריות. יותר אמון. הטוב בדרך.", gratitude: false },
  { text: "היי טובה לעצמך כמו שאת טובה לאנשים שאת אוהבת. למה הם מקבלים יחס עדיף?", sub: "שאלה לגיטימית שכדאי לשאול אותה.", gratitude: false },
  { text: "חמלה עצמית היא לא עצלות. זה הדלק שגורם לך להמשיך.", sub: "מי שלא ממלאת מיכל - לא נוסעת רחוק.", gratitude: false },
  { text: "את לא צריכה להרוויח את הזכות להיות. כבר שילמת. בלידה.", sub: "עכשיו נהנים, כפרה!", gratitude: false },
  { text: "בימים שהכל מרגיש מוזר ומפחיד - את עדיין כאן ועדיין מתקדמת. זה לא מובן מאליו.", sub: "יאלה - דבר טוב שקרה לך היום!", gratitude: false },
  { text: "להתבלט זה לא יוהרה. זה פשוט לדעת מה יש לך להציע.", sub: "ויש לך הרבה מה להציע.", gratitude: false },
  { text: "אהלן שחר מותק! 3 דברים שאת מוקירה עליהם - שוט!", sub: "", gratitude: true },
  { text: "אהלן שחר מותק! 3 דברים שאת מוקירה עליהם - שוט!", sub: "", gratitude: true },
  { text: "אהלן שחר מותק! 3 דברים שאת מוקירה עליהם - שוט!", sub: "", gratitude: true },
  { text: "אהלן שחר מותק! 3 דברים שאת מוקירה עליהם - שוט!", sub: "", gratitude: true },
];

const colors = {
  bg: "linear-gradient(135deg, #2d0036 0%, #1a0020 100%)",
  card: "linear-gradient(135deg, #6b1a7a 0%, #9b1a4a 100%)",
  cardBorder: "rgba(255,100,180,0.2)",
  text: "#fff",
  sub: "rgba(255,220,240,0.8)",
  label: "rgba(255,180,220,0.6)",
  btnPrimary: "linear-gradient(135deg, #c0186a, #7b1fa2)",
  btnSecondary: "rgba(255,255,255,0.1)",
  btnBorder: "rgba(255,150,200,0.3)",
  input: "rgba(255,255,255,0.08)",
  counter: "rgba(255,180,220,0.5)",
};

function App() {
  const [current, setCurrent] = useState(Math.floor(Math.random() * reminders.length));
  const [inputs, setInputs] = useState(["", "", ""]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
    if ('Notification' in window) {
      Notification.requestPermission();
    }
    const now = new Date();
    const msUntil16 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (now.getHours() >= 16 ? 1 : 0), 16, 0, 0) - now;
    const timeout = setTimeout(() => {
      new Notification('פפ טוק', { body: reminders[Math.floor(Math.random() * reminders.length)].text, dir: 'rtl' });
      setInterval(() => {
        new Notification('פפ טוק', { body: reminders[Math.floor(Math.random() * reminders.length)].text, dir: 'rtl' });
      }, 24 * 60 * 60 * 1000);
    }, msUntil16);
    return () => clearTimeout(timeout);
  }, []);

  const r = reminders[current];

  function navigate(dir) {
    setCurrent((current + dir + reminders.length) % reminders.length);
    setSaved(false);
    setInputs(["", "", ""]);
  }

  function shuffle() {
    let next;
    do { next = Math.floor(Math.random() * reminders.length); } while (next === current);
    setCurrent(next);
    setSaved(false);
    setInputs(["", "", ""]);
  }

  const now = new Date();
  const days = ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];
  const dateLabel = "יום " + days[now.getDay()] + " - " + now.toLocaleDateString("he-IL");

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ direction: "rtl", fontFamily: "sans-serif", maxWidth: 480, width: "100%" }}>
        <div style={{ fontSize: 13, color: colors.label, marginBottom: "1.5rem", textAlign: "center" }}>{dateLabel}</div>
        <div style={{ background: colors.card, borderRadius: 24, padding: "2.5rem", marginBottom: "1rem", border: `1px solid ${colors.cardBorder}`, boxShadow: "0 8px 40px rgba(150,0,100,0.3)" }}>
          <div style={{ fontSize: 11, color: colors.label, letterSpacing: "0.08em", marginBottom: "1rem" }}>תזכורת יומית - אל תדלגי על זה</div>
          <div style={{ fontSize: 20, lineHeight: 1.7, color: colors.text }}>{saved ? "רשמת. שמרת. יופי של שחר." : r.text}</div>
          {!saved && r.sub && <div style={{ fontSize: 14, color: colors.sub, marginTop: "1rem" }}>{r.sub}</div>}
          {saved && <div style={{ fontSize: 14, color: colors.sub, marginTop: "1rem" }}>{inputs.filter(Boolean).join(" / ")}</div>}
          {r.gratitude && !saved && (
            <div style={{ marginTop: "1.2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[0,1,2].map(i => (
                <input key={i} value={inputs[i]}
                  onChange={e => { const n=[...inputs]; n[i]=e.target.value; setInputs(n); }}
                  placeholder={["דבר טוב אחד...","דבר טוב שני...","דבר טוב שלישי..."][i]}
                  style={{ padding: "0.7rem 1rem", borderRadius: 10, border: "1px solid rgba(255,150,200,0.3)", fontSize: 14, direction: "rtl", background: colors.input, color: "#fff", outline: "none" }} />
              ))}
              <button onClick={() => setSaved(true)} style={{ background: colors.btnPrimary, color: "#fff", border: "none", borderRadius: 10, padding: "0.6rem 1rem", fontSize: 14, cursor: "pointer" }}>שמרתי בלב</button>
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <button onClick={() => navigate(-1)} style={{ background: colors.btnSecondary, border: `1px solid ${colors.btnBorder}`, borderRadius: 10, padding: "0.55rem 1.2rem", fontSize: 14, cursor: "pointer", color: "#fff" }}>הקודמת</button>
          <span style={{ fontSize: 13, color: colors.counter }}>{current + 1} / {reminders.length}</span>
          <button onClick={() => navigate(1)} style={{ background: colors.btnSecondary, border: `1px solid ${colors.btnBorder}`, borderRadius: 10, padding: "0.55rem 1.2rem", fontSize: 14, cursor: "pointer", color: "#fff" }}>הבאה</button>
        </div>
        <button onClick={shuffle} style={{ background: colors.btnPrimary, color: "#fff", border: "none", borderRadius: 12, padding: "0.8rem 1.4rem", fontSize: 15, cursor: "pointer", width: "100%", boxShadow: "0 4px 20px rgba(180,0,100,0.4)" }}>תזכורת אחרת, בבקשה</button>
      </div>
    </div>
  );
}

export default App;