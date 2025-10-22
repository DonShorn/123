import React, { useEffect, useState } from 'react'
import Welcome from './components/Welcome.jsx'
import FormScreen from './components/FormScreen.jsx'
import ThankYou from './components/ThankYou.jsx'

const SCREENS = { WELCOME: 'WELCOME', FORM: 'FORM', THANKS: 'THANKS' }

const topics = [
  { id: '2.1', title: 'We already have a poker room – want to scale it', blurb: `Great! We can help you scale your poker room.
What you get with GipsyTeam:
– Thousands of active players with high retention
– Direct access to our audience – Telegram, YouTube, forum, social media
– Unique promo campaigns: rake races, bonuses, series
– Growth through affiliates and influencers
– Expertise across CIS, LatAm, and the US` },
  { id: '2.2', title: 'We’re preparing to launch a poker room', blurb: `We’ll help you start effectively and avoid common mistakes.
What we do:
– Develop offers with strong FTD performance
– Help you avoid pitfalls during launch
– Create engaging mechanics: bonuses, missions, races
– Set up retention tools and promotions
– Optimize operations: design, support, anti-fraud` },
  { id: '2.3', title: 'We’re just exploring the poker market', blurb: `We’ll show you where to start – and whether it’s worth entering the poker market at all.
What you get:
– Analysis of poker room economics: revenues, risks, growth points
– Real data on costs and ROI
– Case studies: successes and mistakes of other projects
– Launch roadmap – from legal setup to marketing
– Verified contacts and trusted solutions` },
  { id: '2.4', title: 'Other / I just want to get some insights', blurb: `We’ve collected the best materials and data on the 2025 poker market.` },
]

const initialForm = { name: '', company: '', contact: '', description: '' }
const STORAGE_KEY = 'gt-leads'

export default function App() {
  const [screen, setScreen] = useState(SCREENS.WELCOME)
  const [topic, setTopic] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [idle, setIdle] = useState(0)
  const [cfg, setCfg] = useState({ webhook: '' })

  useEffect(() => { fetch('/config.json').then(r => r.json()).then(setCfg).catch(()=>{}) }, [])

  // reset after 60s idle
  useEffect(() => {
    const reset = () => setIdle(0)
    const inc = setInterval(() => setIdle(x => x + 1), 1000)
    window.addEventListener('click', reset)
    window.addEventListener('keydown', reset)
    return () => { clearInterval(inc); window.removeEventListener('click', reset); window.removeEventListener('keydown', reset) }
  }, [])

  useEffect(() => {
    if (idle >= 60) {
      setScreen(SCREENS.WELCOME); setTopic(null); setForm(initialForm); setIdle(0)
    }
  }, [idle])

  const chooseTopic = t => { setTopic(t); setScreen(SCREENS.FORM) }

  const submit = async () => {
    const payload = { timestamp: new Date().toISOString(), screen: topic?.id + ' – ' + topic?.title, ...form }
    try {
      // Save locally (fallback)
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); list.push(payload)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))

      // Send to Google Sheets via Apps Script Web App
      if (cfg.webhook) {
        try {
          await fetch(cfg.webhook, { method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
        } catch (e) { console.warn('Webhook error', e) }
      }
      setScreen(SCREENS.THANKS)
    } catch (e) {
      console.error(e); alert('Could not submit. Please try again.')
    }
  }

  const backHome = () => { setScreen(SCREENS.WELCOME); setTopic(null); setForm(initialForm) }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="flex items-center gap-3 mb-6">
        <img src="/gt-logo.jpg" alt="GipsyTeam" className="logo" />
        <div className="font-bold text-xl md:text-2xl">GipsyTeam – Conference Leads</div>
      </header>

      {screen === SCREENS.WELCOME && (<Welcome topics={topics} onChoose={chooseTopic} />)}
      {screen === SCREENS.FORM && topic && (<FormScreen topic={topic} form={form} setForm={setForm} onSubmit={submit} onBack={backHome} />)}
      {screen === SCREENS.THANKS && (<ThankYou onBack={backHome} />)}

      <footer>© {new Date().getFullYear()} GipsyTeam.</footer>
    </div>
  )
}